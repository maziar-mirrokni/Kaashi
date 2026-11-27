import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { loadObjectSchema, SchemaError } from '../src/schema/loader.js';

const exampleSchema = fileURLToPath(new URL('../../../schemas/vendor.json', import.meta.url));

let dir: string;

beforeAll(async () => {
  dir = await mkdtemp(path.join(tmpdir(), 'kaashi-schema-'));
});

afterAll(async () => {
  await rm(dir, { recursive: true, force: true });
});

async function writeSchema(fileName: string, content: string): Promise<string> {
  const file = path.join(dir, fileName);
  await writeFile(file, content, 'utf8');
  return file;
}

/** Runs the loader and returns the SchemaError it throws. */
async function loadError(file: string): Promise<SchemaError> {
  const error = await loadObjectSchema(file).then(
    () => undefined,
    (thrown: unknown) => thrown,
  );
  expect(error).toBeInstanceOf(SchemaError);
  return error as SchemaError;
}

const minimal = JSON.stringify({
  formatVersion: 1,
  name: 'item',
  fields: [{ name: 'name', type: 'text' }],
});

describe('loadObjectSchema', () => {
  it('loads the example vendor schema', async () => {
    const schema = await loadObjectSchema(exampleSchema);

    expect(schema).toEqual({
      formatVersion: 1,
      name: 'vendor',
      label: 'Vendor',
      pluralLabel: 'Vendors',
      fields: [
        { name: 'name', label: 'Name', type: 'text', required: true },
        { name: 'contact_email', label: 'Contact email', type: 'text', required: false },
        { name: 'rating', label: 'Rating', type: 'number', required: false },
        { name: 'is_active', label: 'Active', type: 'boolean', required: true },
        { name: 'since', label: 'Vendor since', type: 'date', required: false },
      ],
    });
  });

  it('tolerates a UTF-8 byte-order mark', async () => {
    const file = await writeSchema('item.json', `﻿${minimal}`);

    await expect(loadObjectSchema(file)).resolves.toMatchObject({ name: 'item' });
  });

  it('reports a missing file', async () => {
    const file = path.join(dir, 'missing.json');

    const error = await loadError(file);

    expect(error.message).toBe(`Cannot read schema file ${file}: file not found`);
    expect(error.file).toBe(file);
    expect(error.issues).toEqual([]);
  });

  it('reports invalid JSON', async () => {
    const file = await writeSchema('item.json', '{ "formatVersion": 1, ');

    const error = await loadError(file);

    expect(error.message).toMatch(
      new RegExp(`^Invalid JSON in schema file ${escapeRegExp(file)}: .+`),
    );
    expect(error.issues).toEqual([]);
  });

  it('reports every problem in an invalid schema', async () => {
    const file = await writeSchema(
      'item.json',
      JSON.stringify({
        formatVersion: 1,
        name: 'item',
        fields: [
          { name: 'name', type: 'txt' },
          { name: 'name', type: 'text', requird: true },
        ],
      }),
    );

    const error = await loadError(file);

    expect(error.issues).toEqual([
      {
        path: 'fields[0].type',
        message: 'unknown field type "txt"; expected one of text, number, boolean, date',
      },
      { path: 'fields[1]', message: 'unknown property "requird"' },
      {
        path: 'fields[1].name',
        message: 'duplicate field name "name" (already used by fields[0])',
      },
    ]);
    expect(error.message).toBe(
      [
        `Invalid schema in ${file}:`,
        '  - fields[0].type: unknown field type "txt"; expected one of text, number, boolean, date',
        '  - fields[1]: unknown property "requird"',
        '  - fields[1].name: duplicate field name "name" (already used by fields[0])',
      ].join('\n'),
    );
  });

  it('reports a document that is not an object', async () => {
    const file = await writeSchema('item.json', '[]');

    const error = await loadError(file);

    expect(error.message).toBe(
      `Invalid schema in ${file}:\n  - (root): expected a JSON object, got an array`,
    );
  });

  it('requires the file name to match the object name', async () => {
    const file = await writeSchema('items.json', minimal);

    const error = await loadError(file);

    expect(error.issues).toEqual([
      { path: 'name', message: 'object "item" must be in a file named item.json' },
    ]);
  });
});

function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
