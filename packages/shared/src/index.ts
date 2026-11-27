// Code shared by the Kaashi server and web app.

export {
  FIELD_TYPES,
  type FieldSchema,
  type FieldType,
  FORMAT_VERSION,
  MAX_NAME_LENGTH,
  NAME_PATTERN,
  type ObjectSchema,
  RESERVED_FIELD_NAMES,
} from './schema/format.js';
export { labelFromName } from './schema/labels.js';
export {
  formatPath,
  type SchemaIssue,
  type ValidationResult,
  validateObjectSchema,
} from './schema/validate.js';
