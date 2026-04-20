/**
 * jest.config.js
 *
 * Because package.json sets "type": "module", Node runs everything as ESM.
 * We must tell Jest to use the experimental VM modules runner instead of
 * the default CommonJS transformer.
 *
 * Run tests with:
 *   NODE_OPTIONS=--experimental-vm-modules jest
 * (already wired up in package.json "test" script)
 */

/** @type {import('jest').Config} */
const config = {
  // Use Node environment (no browser DOM needed – front-end utils are pure JS)
  testEnvironment: 'node',

  // Tell Jest not to transform .js files; Node handles ESM natively
  transform: {},

  // Where to look for test files
  testMatch: [
    '**/tests/unit/**/*.test.js',
    '**/tests/integration/**/*.test.js',
  ],

  // Collect coverage from source files
  collectCoverageFrom: [
    'public/js/**/*.js',
  ],
};

export default config;
