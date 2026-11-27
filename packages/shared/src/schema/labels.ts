/**
 * Derives a display label from a name: underscores become spaces and the
 * first letter is capitalised. `contact_email` becomes "Contact email".
 */
export function labelFromName(name: string): string {
  const words = name.split('_').filter((word) => word.length > 0);
  const text = words.join(' ');
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Derives a plural label with simple English rules: "Vendor" becomes
 * "Vendors", "Category" becomes "Categories", "Address" becomes "Addresses".
 * Irregular plurals need an explicit `pluralLabel` in the schema.
 */
export function pluralize(label: string): string {
  if (/[^aeiou]y$/i.test(label)) {
    return `${label.slice(0, -1)}ies`;
  }
  if (/(s|x|z|ch|sh)$/i.test(label)) {
    return `${label}es`;
  }
  return `${label}s`;
}
