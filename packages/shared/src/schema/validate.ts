import { z } from 'zod';
import {
  FIELD_TYPES,
  FORMAT_VERSION,
  MAX_NAME_LENGTH,
  NAME_PATTERN,
  type ObjectSchema,
  RESERVED_FIELD_NAMES,
} from './format.js';
import { labelFromName } from './labels.js';

/** One problem found in a schema, located by its path in the document. */
export interface SchemaIssue {
  /** Path in the document, such as `fields[2].type`; empty for the whole document. */
  path: string;
  message: string;
}

export type ValidationResult =
  | { ok: true; schema: ObjectSchema }
  | { ok: false; issues: SchemaIssue[] };

type PathSegment = string | number;

// --- Messages --------------------------------------------------------------

function describe(value: unknown): string {
  if (value === null) return 'null';
  if (Array.isArray(value)) return 'an array';
  switch (typeof value) {
    case 'string':
      return `the string ${JSON.stringify(value)}`;
    case 'number':
      return `the number ${value}`;
    case 'boolean':
      return `${value}`;
    case 'object':
      return 'an object';
    default:
      return typeof value;
  }
}

/** Error message for a missing value or a value of the wrong JSON type. */
function typeError(expected: string) {
  return (issue: { input?: unknown }) =>
    issue.input === undefined
      ? 'is required'
      : `expected ${expected}, got ${describe(issue.input)}`;
}

function quoteList(values: readonly string[]): string {
  return values.map((value) => `"${value}"`).join(', ');
}

/** Error message for a non-object value or for properties the format does not define. */
function objectError(expected: string) {
  const fallback = typeError(expected);
  return (issue: { code?: string; input?: unknown; keys?: string[] }) => {
    if (issue.code === 'unrecognized_keys' && issue.keys) {
      const noun = issue.keys.length === 1 ? 'property' : 'properties';
      return `unknown ${noun} ${quoteList(issue.keys)}`;
    }
    return fallback(issue);
  };
}

// --- Zod definition of the format -----------------------------------------

const nameSchema = z
  .string({ error: typeError('a string') })
  .regex(NAME_PATTERN, {
    error: (issue) =>
      `${JSON.stringify(issue.input)} is not a valid name: use lowercase letters, digits and underscores, starting with a letter`,
  })
  .max(MAX_NAME_LENGTH, { error: `must be at most ${MAX_NAME_LENGTH} characters` });

const labelSchema = z
  .string({ error: typeError('a string') })
  .trim()
  .min(1, { error: 'must not be empty' });

const fieldSchema = z.strictObject(
  {
    name: nameSchema,
    label: labelSchema.optional(),
    type: z.enum(FIELD_TYPES, {
      error: (issue) =>
        issue.input === undefined
          ? 'is required'
          : `unknown field type ${JSON.stringify(issue.input)}; expected one of ${FIELD_TYPES.join(', ')}`,
    }),
    required: z.boolean({ error: typeError('true or false') }).optional(),
  },
  { error: objectError('a field object') },
);

const objectSchema = z.strictObject(
  {
    formatVersion: z.literal(FORMAT_VERSION, {
      error: (issue) =>
        issue.input === undefined
          ? 'is required'
          : `unsupported format version ${JSON.stringify(issue.input)}; expected ${FORMAT_VERSION}`,
    }),
    name: nameSchema,
    label: labelSchema.optional(),
    fields: z
      .array(fieldSchema, { error: typeError('an array of fields') })
      .min(1, { error: 'must contain at least one field' }),
  },
  { error: objectError('a JSON object') },
);

// --- Rules across fields ---------------------------------------------------

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/** Duplicate and reserved field names. Runs even when other parts are invalid. */
function checkFieldNames(data: unknown): { path: PathSegment[]; message: string }[] {
  if (!isRecord(data) || !Array.isArray(data.fields)) return [];

  const issues: { path: PathSegment[]; message: string }[] = [];
  const firstIndexByName = new Map<string, number>();
  const reserved: readonly string[] = RESERVED_FIELD_NAMES;

  data.fields.forEach((field: unknown, index) => {
    if (!isRecord(field) || typeof field.name !== 'string') return;
    const name = field.name;
    const path = ['fields', index, 'name'];

    if (reserved.includes(name)) {
      issues.push({
        path,
        message: `"${name}" is reserved: the platform adds this field to every object`,
      });
      return;
    }

    const firstIndex = firstIndexByName.get(name);
    if (firstIndex === undefined) {
      firstIndexByName.set(name, index);
    } else {
      issues.push({
        path,
        message: `duplicate field name "${name}" (already used by fields[${firstIndex}])`,
      });
    }
  });

  return issues;
}

// --- Paths -----------------------------------------------------------------

/** Formats a path as `fields[2].type`. */
export function formatPath(path: readonly PropertyKey[]): string {
  let text = '';
  for (const segment of path) {
    if (typeof segment === 'number') {
      text += `[${segment}]`;
    } else {
      text += text === '' ? String(segment) : `.${String(segment)}`;
    }
  }
  return text;
}

// Issues are listed in the order properties appear in a schema document.
const PROPERTY_ORDER = ['formatVersion', 'name', 'label', 'type', 'required', 'fields'];

function segmentRank(segment: PropertyKey): number {
  const rank = PROPERTY_ORDER.indexOf(String(segment));
  return rank === -1 ? PROPERTY_ORDER.length : rank;
}

function comparePaths(a: readonly PropertyKey[], b: readonly PropertyKey[]): number {
  const length = Math.min(a.length, b.length);
  for (let i = 0; i < length; i++) {
    const x = a[i];
    const y = b[i];
    if (x === y || x === undefined || y === undefined) continue;
    if (typeof x === 'number' && typeof y === 'number') return x - y;
    const byRank = segmentRank(x) - segmentRank(y);
    if (byRank !== 0) return byRank;
    return String(x).localeCompare(String(y));
  }
  return a.length - b.length;
}

// --- Public API --------------------------------------------------------------

/**
 * Validates parsed JSON against the object schema format and applies
 * defaults (labels, `required: false`). Reports every problem found, not just
 * the first. Does not touch the file system, so it runs in the browser too.
 */
export function validateObjectSchema(data: unknown): ValidationResult {
  const parsed = objectSchema.safeParse(data);

  const found: { path: readonly PropertyKey[]; message: string }[] = [
    ...(parsed.success ? [] : parsed.error.issues),
    ...checkFieldNames(data),
  ];

  if (!parsed.success || found.length > 0) {
    const issues = found
      .sort((a, b) => comparePaths(a.path, b.path))
      .map((issue) => ({ path: formatPath(issue.path), message: issue.message }));
    return { ok: false, issues };
  }

  const input = parsed.data;

  return {
    ok: true,
    schema: {
      formatVersion: input.formatVersion,
      name: input.name,
      label: input.label ?? labelFromName(input.name),
      fields: input.fields.map((field) => ({
        name: field.name,
        label: field.label ?? labelFromName(field.name),
        type: field.type,
        required: field.required ?? false,
      })),
    },
  };
}
