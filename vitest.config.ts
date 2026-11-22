import { defineConfig } from 'vitest/config';

// Runs every workspace's tests from the repo root with `npm test`.
// Each app has its own Vitest config (environment, setup files). Add
// 'packages/*' here once a package has tests.
export default defineConfig({
  test: {
    projects: ['apps/*'],
  },
});
