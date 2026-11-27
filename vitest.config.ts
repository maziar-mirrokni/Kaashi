import { defineConfig } from 'vitest/config';

// Runs every workspace's tests from the repo root with `npm test`.
// Each workspace has its own Vitest config (environment, setup files).
export default defineConfig({
  test: {
    projects: ['apps/*', 'packages/*'],
  },
});
