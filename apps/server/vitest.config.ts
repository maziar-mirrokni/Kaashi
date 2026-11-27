import { defaultServerConditions } from 'vite';
import { defineProject } from 'vitest/config';

export default defineProject({
  // Resolve @kaashi/shared to its TypeScript source, not its build output.
  resolve: { conditions: ['@kaashi/source', ...defaultServerConditions] },
  ssr: { resolve: { conditions: ['@kaashi/source', ...defaultServerConditions] } },
  test: {
    name: 'server',
    environment: 'node',
    include: ['test/**/*.test.ts'],
  },
});
