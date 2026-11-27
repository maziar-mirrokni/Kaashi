# Object schema format

An **object schema** describes one kind of business object, such as a vendor
or a purchase requisition: its name, how it is labelled in the UI, and its
fields. Kaashi generates the API and the UI for an object from its schema.

This document specifies **format version 1**.

## Files

- Each object is defined in its own JSON file in the `schemas/` folder at the
  repository root.
- The file name is the object's name followed by `.json`: the object `vendor`
  lives in `schemas/vendor.json`.
- Files are UTF-8. A byte-order mark at the start of the file is ignored.

## Example

```json
{
  "formatVersion": 1,
  "name": "vendor",
  "label": "Vendor",
  "fields": [
    { "name": "name", "label": "Name", "type": "text", "required": true },
    { "name": "contact_email", "label": "Contact email", "type": "text" },
    { "name": "rating", "label": "Rating", "type": "number" },
    { "name": "is_active", "label": "Active", "type": "boolean", "required": true },
    { "name": "since", "label": "Vendor since", "type": "date" }
  ]
}
```

This is the example schema in [`schemas/vendor.json`](../schemas/vendor.json).

## Object properties

| Property | Required | Type | Description |
|---|---|---|---|
| `formatVersion` | Yes | number | The schema format version. Must be `1`. |
| `name` | Yes | string | The object's name, used by the API and the database. See [Names](#names). |
| `label` | No | string | The name shown in the UI, such as "Vendor". Defaults to a label derived from `name`. |
| `fields` | Yes | array | The object's fields, in the order the UI shows them. At least one field. |

## Field properties

| Property | Required | Type | Description |
|---|---|---|---|
| `name` | Yes | string | The field's name, used by the API and the database. See [Names](#names). Unique within the object. |
| `label` | No | string | The name shown in the UI. Defaults to a label derived from `name`. |
| `type` | Yes | string | The field type. See [Field types](#field-types). |
| `required` | No | `true` or `false` | Whether every record must have a value. Defaults to `false`. |

## Field types

| Type | Values |
|---|---|
| `text` | A string. |
| `number` | A number. |
| `boolean` | `true` or `false`. |
| `date` | A calendar date. |

How values of each type are validated and stored is defined by the API
(V1-04) and the database (V1-05). Later versions add more types, such as
`status`, `reference` and `calculated`, and type-specific options such as
minimum and maximum values.

## Names

Object and field names:

- use only lowercase letters `a`–`z`, digits and underscores (`_`)
- start with a letter
- are at most 63 characters long

Names are lowercase only, so two names can never differ just by letter case.
Some databases and file systems ignore case and would treat them as the same.

The field names `id`, `created_at` and `updated_at` are **reserved**: the
platform adds these fields to every object itself.

## Labels

Labels are what the UI shows. When a label is missing it is derived from the
name: underscores become spaces and the first letter is capitalised, so
`contact_email` becomes "Contact email".

Labels may contain any text but must not be empty. Leading and trailing spaces
are removed.

## Validation

A schema is rejected when it breaks any rule above, including when it contains
a property this document does not define (for example a misspelt
`"requird"`). Every problem is reported at once, with its path in the
document:

```
Invalid schema in schemas/vendor.json:
  - fields[1].type: unknown field type "txt"; expected one of text, number, boolean, date
  - fields[2]: unknown property "requird"
  - fields[2].name: duplicate field name "name" (already used by fields[0])
```

## Versioning

`formatVersion` changes only when a change would break existing schema files.
Additions that existing files can ignore, such as new field types or new
optional properties, keep version 1.

## Implementation

- [`packages/shared/src/schema/`](../packages/shared/src/schema/): the format's
  rules, its TypeScript types and `validateObjectSchema()`, which also runs in
  the browser.
- [`apps/server/src/schema/loader.ts`](../apps/server/src/schema/loader.ts):
  `loadObjectSchema()`, which reads a schema file and validates it.
