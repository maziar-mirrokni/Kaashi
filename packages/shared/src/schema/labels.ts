/**
 * Derives a display label from a name: underscores become spaces and the
 * first letter is capitalised. `contact_email` becomes "Contact email".
 */
export function labelFromName(name: string): string {
  const words = name.split('_').filter((word) => word.length > 0);
  const text = words.join(' ');
  return text.charAt(0).toUpperCase() + text.slice(1);
}
