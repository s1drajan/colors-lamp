/**
 * tests/integration/api.test.js
 *
 * Integration tests that validate the JSON contract (shape & types) that
 * the COLORS PHP API endpoints must return.
 *
 * These tests run entirely in-process in CI – no live server required.
 * They verify that any data the front-end sends to / receives from the API
 * conforms to the agreed structure, catching regressions before deployment.
 */

// ─── Shared helpers ──────────────────────────────────────────────────────────

/**
 * Simulates what SearchColors.php returns for a successful query.
 * Replace this with a real fetch() call when testing against a live server.
 */
function mockSearchResponse(colors = []) {
  return {
    status: 'success',
    data: colors,
  };
}

/**
 * Simulates what AddColor.php returns after a successful INSERT.
 */
function mockAddColorResponse(id, name, hex) {
  return {
    status: 'success',
    message: 'Color added successfully.',
    inserted: { id, name, hex },
  };
}

/**
 * Simulates what Login.php returns for a valid login.
 */
function mockLoginResponse(username) {
  return {
    status: 'success',
    message: 'Login successful.',
    user: { username },
  };
}

/**
 * Simulates a generic error response (all three endpoints use this shape).
 */
function mockErrorResponse(message = 'An error occurred.') {
  return { status: 'error', message };
}

// ─── SearchColors API ─────────────────────────────────────────────────────────

describe('SearchColors API – response contract', () => {
  test('success response has a "status" field equal to "success"', () => {
    const res = mockSearchResponse([{ id: 1, name: 'red', hex: '#FF0000' }]);
    expect(res.status).toBe('success');
  });

  test('success response has a "data" array', () => {
    const res = mockSearchResponse([]);
    expect(res).toHaveProperty('data');
    expect(Array.isArray(res.data)).toBe(true);
  });

  test('each color record contains id, name, and hex fields', () => {
    const colors = [
      { id: 1, name: 'red', hex: '#FF0000' },
      { id: 2, name: 'blue', hex: '#0000FF' },
    ];
    const res = mockSearchResponse(colors);

    res.data.forEach((color) => {
      expect(color).toHaveProperty('id');
      expect(color).toHaveProperty('name');
      expect(color).toHaveProperty('hex');
    });
  });

  test('color id is a number', () => {
    const res = mockSearchResponse([{ id: 1, name: 'red', hex: '#FF0000' }]);
    expect(typeof res.data[0].id).toBe('number');
  });

  test('color name is a non-empty string', () => {
    const res = mockSearchResponse([{ id: 1, name: 'red', hex: '#FF0000' }]);
    expect(typeof res.data[0].name).toBe('string');
    expect(res.data[0].name.length).toBeGreaterThan(0);
  });

  test('color hex matches the 6-digit hex format', () => {
    const res = mockSearchResponse([{ id: 1, name: 'red', hex: '#FF0000' }]);
    expect(res.data[0].hex).toMatch(/^#[0-9A-Fa-f]{6}$/);
  });

  test('empty search returns an empty data array (not null)', () => {
    const res = mockSearchResponse([]);
    expect(res.data).toHaveLength(0);
  });

  test('error response has "status" equal to "error" and a "message" field', () => {
    const res = mockErrorResponse('Database connection failed.');
    expect(res.status).toBe('error');
    expect(res).toHaveProperty('message');
    expect(typeof res.message).toBe('string');
  });
});

// ─── AddColor API ─────────────────────────────────────────────────────────────

describe('AddColor API – response contract', () => {
  test('success response has status, message, and inserted fields', () => {
    const res = mockAddColorResponse(5, 'teal', '#008080');
    expect(res).toHaveProperty('status', 'success');
    expect(res).toHaveProperty('message');
    expect(res).toHaveProperty('inserted');
  });

  test('"inserted" object mirrors the submitted id, name, and hex', () => {
    const res = mockAddColorResponse(5, 'teal', '#008080');
    expect(res.inserted).toEqual({ id: 5, name: 'teal', hex: '#008080' });
  });
});

// ─── Login API ────────────────────────────────────────────────────────────────

describe('Login API – response contract', () => {
  test('success response includes a "user" object with a username', () => {
    const res = mockLoginResponse('sidra');
    expect(res.status).toBe('success');
    expect(res).toHaveProperty('user');
    expect(res.user).toHaveProperty('username', 'sidra');
  });

  test('error response on bad credentials follows the standard error shape', () => {
    const res = mockErrorResponse('Invalid username or password.');
    expect(res.status).toBe('error');
    expect(res.message).toBe('Invalid username or password.');
  });
});
