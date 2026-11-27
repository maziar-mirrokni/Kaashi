// Rules of the Kaashi object schema format. See docs/schema-format.md for the
// full specification.

/** The schema format version this code reads and writes. */
export const FORMAT_VERSION = 1;

/** Field types available in schemas. */
export const FIELD_TYPES = ['text', 'number', 'boolean', 'date'] as const;
export type FieldType = (typeof FIELD_TYPES)[number];

/**
 * Object and field names: lowercase letters, digits and underscores, starting
 * with a letter. Lowercase only, so names cannot collide by letter case in
 * databases or file systems that ignore case.
 */
export const NAME_PATTERN = /^[a-z][a-z0-9_]*$/;

/** Longest allowed name: PostgreSQL's identifier limit. */
export const MAX_NAME_LENGTH = 63;

/** Field names the platform adds to every object itself. */
export const RESERVED_FIELD_NAMES = ['id', 'created_at', 'updated_at'] as const;

/** A field in a loaded schema, with defaults applied. */
export interface FieldSchema {
  name: string;
  label: string;
  type: FieldType;
  required: boolean;
}

/** An object schema after validation, with defaults applied. */
export interface ObjectSchema {
  formatVersion: typeof FORMAT_VERSION;
  name: string;
  label: string;
  pluralLabel: string;
  fields: FieldSchema[];
}
