/**
 * tests/unit/colorUtils.test.js
 * Unit tests for the colorUtils helper module.
 * Covers: hex validation, name formatting, payload building.
 */

import {
  isValidHexColor,
  formatColorName,
  buildColorPayload,
} from '../../public/js/colorUtils.js';

// ─── isValidHexColor ────────────────────────────────────────────────────────

describe('isValidHexColor()', () => {
  test('accepts a valid 6-digit uppercase hex color', () => {
    expect(isValidHexColor('#FF5733')).toBe(true);
  });

  test('accepts a valid 6-digit lowercase hex color', () => {
    expect(isValidHexColor('#a3c2f0')).toBe(true);
  });

  test('accepts a valid mixed-case hex color', () => {
    expect(isValidHexColor('#AbCdEf')).toBe(true);
  });

  test('rejects a plain word (no hash)', () => {
    expect(isValidHexColor('red')).toBe(false);
  });

  test('rejects a 3-digit shorthand hex', () => {
    expect(isValidHexColor('#FFF')).toBe(false);
  });

  test('rejects an 8-digit hex (with alpha)', () => {
    expect(isValidHexColor('#FF573380')).toBe(false);
  });

  test('rejects an empty string', () => {
    expect(isValidHexColor('')).toBe(false);
  });

  test('rejects hex with invalid characters', () => {
    expect(isValidHexColor('#GGGGGG')).toBe(false);
  });
});

// ─── formatColorName ────────────────────────────────────────────────────────

describe('formatColorName()', () => {
  test('converts to lowercase', () => {
    expect(formatColorName('RED')).toBe('red');
  });

  test('trims leading and trailing whitespace', () => {
    expect(formatColorName('  blue  ')).toBe('blue');
  });

  test('trims AND lowercases together', () => {
    expect(formatColorName('  Coral Pink  ')).toBe('coral pink');
  });

  test('returns an empty string for a non-string input', () => {
    expect(formatColorName(42)).toBe('');
    expect(formatColorName(null)).toBe('');
  });

  test('returns an empty string when already empty', () => {
    expect(formatColorName('')).toBe('');
  });
});

// ─── buildColorPayload ──────────────────────────────────────────────────────

describe('buildColorPayload()', () => {
  test('returns a payload object when name and hex are valid', () => {
    const result = buildColorPayload('  Teal  ', '#008080');
    expect(result).toEqual({ name: 'teal', hex: '#008080' });
  });

  test('returns null when hex is invalid', () => {
    expect(buildColorPayload('blue', 'not-a-hex')).toBeNull();
  });

  test('returns null when name is empty after trimming', () => {
    expect(buildColorPayload('   ', '#123456')).toBeNull();
  });

  test('returns null when both fields are empty', () => {
    expect(buildColorPayload('', '')).toBeNull();
  });
});
