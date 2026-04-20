/**
 * colorUtils.js
 * Utility functions for color validation and formatting.
 * Used by the COLORS front-end and unit-tested by Jest.
 */

/**
 * Returns true if `hex` is a valid 6-digit hex color (e.g. "#FF5733").
 * @param {string} hex
 * @returns {boolean}
 */
export function isValidHexColor(hex) {
  return /^#[0-9A-Fa-f]{6}$/.test(hex);
}

/**
 * Normalises a color name: trims whitespace and converts to lowercase.
 * @param {string} name
 * @returns {string}
 */
export function formatColorName(name) {
  if (typeof name !== 'string') return '';
  return name.trim().toLowerCase();
}

/**
 * Builds the query-string payload sent to SearchColors.php.
 * Returns null if either field is missing/invalid.
 * @param {string} name
 * @param {string} hex
 * @returns {{ name: string, hex: string } | null}
 */
export function buildColorPayload(name, hex) {
  const formatted = formatColorName(name);
  if (!formatted || !isValidHexColor(hex)) return null;
  return { name: formatted, hex };
}
