import { describe, expect, it } from 'vitest';
import { type SchemaIssue, validateObjectSchema } from '../src/index.js';

/** A minimal valid schema, to be changed by each test. */
function validSchema(): Record<string, unknown> {
  return {
    formatVersion: 1,
    name: 'vendor',
    fields: [{ name: 'name', type: 'text', required: true }],
  };
}

function issuesOf(data: unknown): SchemaIssue[] {
  const result = validateObjectSchema(data);
  if (result.ok) throw new Error('expected the schema to be invalid');
  return result.issues;
}

describe('validateObjectSchema: valid schemas', () => {
  it('accepts a minimal schema and applies defaults', () => {
    const result = validateObjectSchema({
      formatVersion: 1,
      name: 'purchase_category',
      fields: [{ name: 'contact_email', type: 'text' }],
    });

    expect(result).toEqual({
      ok: true,
      schema: {
        formatVersion: 1,
        name: 'purchase_category',
        label: 'Purchase category',
        fields: [{ name: 'contact_email', label: 'Contact email', type: 'text', required: false }],
      },
    });
  });

  it('keeps explicit labels and required flags', () => {
    const result = validateObjectSchema({
      formatVersion: 1,
      name: 'person',
      label: 'Person',
      fields: [{ name: 'name', label: 'Full name', type: 'text', required: true }],
    });

    expect(result.ok && result.schema).toMatchObject({
      label: 'Person',
      fields: [{ name: 'name', label: 'Full name', type: 'text', required: true }],
    });
  });

  it('accepts every field type and keeps field order', () => {
    const result = validateObjectSchema({
      ...validSchema(),
      fields: [
        { name: 'd', type: 'date' },
        { name: 'c', type: 'boolean' },
        { name: 'b', type: 'number' },
        { name: 'a', type: 'text' },
      ],
    });

    expect(result.ok && result.schema.fields.map((field) => field.type)).toEqual([
      'date',
      'boolean',
      'number',
      'text',
    ]);
  });

  it('trims labels', () => {
    const result = validateObjectSchema({ ...validSchema(), label: '  Supplier  ' });

    expect(result.ok && result.schema.label).toBe('Supplier');
  });

  it('accepts a name of exactly 63 characters', () => {
    const result = validateObjectSchema({ ...validSchema(), name: `a${'b'.repeat(62)}` });

    expect(result.ok).toBe(true);
  });
});

describe('validateObjectSchema: invalid schemas', () => {
  it('rejects a document that is not an object', () => {
    expect(issuesOf([1, 2])).toEqual([
      { path: '', message: 'expected a JSON object, got an array' },
    ]);
    expect(issuesOf(null)).toEqual([{ path: '', message: 'expected a JSON object, got null' }]);
  });

  it('reports every missing required property', () => {
    expect(issuesOf({})).toEqual([
      { path: 'formatVersion', message: 'is required' },
      { path: 'name', message: 'is required' },
      { path: 'fields', message: 'is required' },
    ]);
  });

  it('rejects an unsupported format version', () => {
    expect(issuesOf({ ...validSchema(), formatVersion: 2 })).toEqual([
      { path: 'formatVersion', message: 'unsupported format version 2; expected 1' },
    ]);
  });

  it.each([['Vendor'], ['1vendor'], ['_vendor'], ['vendor-name'], ['vendor name'], ['']])(
    'rejects the object name %j',
    (name) => {
      expect(issuesOf({ ...validSchema(), name })).toEqual([
        {
          path: 'name',
          message: `${JSON.stringify(name)} is not a valid name: use lowercase letters, digits and underscores, starting with a letter`,
        },
      ]);
    },
  );

  it('rejects a name longer than 63 characters', () => {
    expect(issuesOf({ ...validSchema(), name: `a${'b'.repeat(63)}` })).toEqual([
      { path: 'name', message: 'must be at most 63 characters' },
    ]);
  });

  it('rejects a name of the wrong type', () => {
    expect(issuesOf({ ...validSchema(), name: 42 })).toEqual([
      { path: 'name', message: 'expected a string, got the number 42' },
    ]);
  });

  it('rejects empty labels', () => {
    expect(issuesOf({ ...validSchema(), label: '   ' })).toEqual([
      { path: 'label', message: 'must not be empty' },
    ]);
  });

  it('rejects unknown properties on the object and on fields', () => {
    expect(
      issuesOf({
        ...validSchema(),
        title: 'Vendor',
        fields: [{ name: 'name', type: 'text', requird: true, hint: 'x' }],
      }),
    ).toEqual([
      { path: '', message: 'unknown property "title"' },
      { path: 'fields[0]', message: 'unknown properties "requird", "hint"' },
    ]);
  });

  it('rejects fields that are missing or empty', () => {
    expect(issuesOf({ ...validSchema(), fields: [] })).toEqual([
      { path: 'fields', message: 'must contain at least one field' },
    ]);
    expect(issuesOf({ ...validSchema(), fields: {} })).toEqual([
      { path: 'fields', message: 'expected an array of fields, got an object' },
    ]);
  });

  it('rejects a field that is not an object', () => {
    expect(issuesOf({ ...validSchema(), fields: ['name'] })).toEqual([
      { path: 'fields[0]', message: 'expected a field object, got the string "name"' },
    ]);
  });

  it('rejects a missing or unknown field type', () => {
    expect(
      issuesOf({
        ...validSchema(),
        fields: [{ name: 'a' }, { name: 'b', type: 'txt' }],
      }),
    ).toEqual([
      { path: 'fields[0].type', message: 'is required' },
      {
        path: 'fields[1].type',
        message: 'unknown field type "txt"; expected one of text, number, boolean, date',
      },
    ]);
  });

  it('rejects a required flag that is not true or false', () => {
    expect(
      issuesOf({ ...validSchema(), fields: [{ name: 'a', type: 'text', required: 'yes' }] }),
    ).toEqual([
      { path: 'fields[0].required', message: 'expected true or false, got the string "yes"' },
    ]);
  });

  it('rejects an invalid field name', () => {
    expect(issuesOf({ ...validSchema(), fields: [{ name: 'eMail', type: 'text' }] })).toEqual([
      {
        path: 'fields[0].name',
        message:
          '"eMail" is not a valid name: use lowercase letters, digits and underscores, starting with a letter',
      },
    ]);
  });

  it('rejects duplicate field names', () => {
    expect(
      issuesOf({
        ...validSchema(),
        fields: [
          { name: 'name', type: 'text' },
          { name: 'email', type: 'text' },
          { name: 'name', type: 'number' },
        ],
      }),
    ).toEqual([
      {
        path: 'fields[2].name',
        message: 'duplicate field name "name" (already used by fields[0])',
      },
    ]);
  });

  it.each(['id', 'created_at', 'updated_at'])('rejects the reserved field name %s', (name) => {
    expect(issuesOf({ ...validSchema(), fields: [{ name, type: 'text' }] })).toEqual([
      {
        path: 'fields[0].name',
        message: `"${name}" is reserved: the platform adds this field to every object`,
      },
    ]);
  });

  it('reports all problems at once, in document order', () => {
    const issues = issuesOf({
      fields: [
        { name: 'name', type: 'text' },
        { name: 'name', type: 'txt' },
      ],
      name: 'Vendor',
      formatVersion: 2,
    });

    expect(issues.map((issue) => issue.path)).toEqual([
      'formatVersion',
      'name',
      'fields[1].name',
      'fields[1].type',
    ]);
  });
});
