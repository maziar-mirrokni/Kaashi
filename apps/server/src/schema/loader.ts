import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { type ObjectSchema, type SchemaIssue, validateObjectSchema } from '@kaashi/shared';

/** A schema file that cannot be read, is not valid JSON, or breaks the schema format. */
export class SchemaError extends Error {
  override readonly name = 'SchemaError';

  constructor(
    /** The schema file, as given to the loader. */
    readonly file: string,
    /** Every problem found; empty when the file could not be read or parsed. */
    readonly issues: readonly SchemaIssue[],
    summary: string,
  ) {
    const details = issues.map((issue) => `\n  - ${issue.path || '(root)'}: ${issue.message}`);
    super(`${summary}${details.join('')}`);
  }
}

const BYTE_ORDER_MARK = '﻿';

/**
 * Reads an object schema file (see docs/schema-format.md), validates it and
 * returns it with defaults applied. The file name must be the object's name
 * followed by `.json`, for example `vendor.json` for the object `vendor`.
 *
 * @throws {SchemaError} listing every problem found.
 */
export async function loadObjectSchema(file: string): Promise<ObjectSchema> {
  let text: string;
  try {
    text = await readFile(file, 'utf8');
  } catch (error) {
    const reason =
      (error as NodeJS.ErrnoException).code === 'ENOENT' ? 'file not found' : String(error);
    throw new SchemaError(file, [], `Cannot read schema file ${file}: ${reason}`);
  }

  // Some Windows editors save UTF-8 files with a byte-order mark.
  if (text.startsWith(BYTE_ORDER_MARK)) {
    text = text.slice(BYTE_ORDER_MARK.length);
  }

  let data: unknown;
  try {
    data = JSON.parse(text);
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    throw new SchemaError(file, [], `Invalid JSON in schema file ${file}: ${reason}`);
  }

  const result = validateObjectSchema(data);
  if (!result.ok) {
    throw new SchemaError(file, result.issues, `Invalid schema in ${file}:`);
  }

  const expectedFileName = `${result.schema.name}.json`;
  if (path.basename(file) !== expectedFileName) {
    throw new SchemaError(
      file,
      [
        {
          path: 'name',
          message: `object "${result.schema.name}" must be in a file named ${expectedFileName}`,
        },
      ],
      `Invalid schema in ${file}:`,
    );
  }

  return result.schema;
}
