import { describe, expect, it } from 'vitest';
import { labelFromName, pluralize } from '../src/index.js';

describe('labelFromName', () => {
  it.each([
    ['vendor', 'Vendor'],
    ['contact_email', 'Contact email'],
    ['purchase_requisition', 'Purchase requisition'],
    ['line_item_2', 'Line item 2'],
    ['a__b', 'A b'],
  ])('turns %s into %s', (name, label) => {
    expect(labelFromName(name)).toBe(label);
  });
});

describe('pluralize', () => {
  it.each([
    ['Vendor', 'Vendors'],
    ['Category', 'Categories'],
    ['Address', 'Addresses'],
    ['Box', 'Boxes'],
    ['Batch', 'Batches'],
    ['Day', 'Days'],
    ['Purchase requisition', 'Purchase requisitions'],
  ])('turns %s into %s', (label, plural) => {
    expect(pluralize(label)).toBe(plural);
  });
});
