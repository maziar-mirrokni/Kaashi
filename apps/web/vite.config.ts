import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { defaultClientConditions, loadEnv } from 'vite';
import { defineConfig } from 'vitest/config';

const repoRoot = fileURLToPath(new URL('../..', import.meta.url));

export default defineConfig(({ mode }) => {
  // Read the backend's PORT from the repo-root .env, so the proxy follows it.
  const env = loadEnv(mode, repoRoot, '');
  const apiPort = env.PORT || '3000';

  return {
    plugins: [react()],
    // Resolve @kaashi/shared to its TypeScript source, not its build output.
    resolve: { conditions: ['@kaashi/source', ...defaultClientConditions] },
    server: {
      port: 5173,
      strictPort: true,
      proxy: {
        // Target IPv4 explicitly: the backend listens on 127.0.0.1.
        '/api': `http://127.0.0.1:${apiPort}`,
      },
    },
    test: {
      name: 'web',
      environment: 'jsdom',
      include: ['test/**/*.test.{ts,tsx}'],
      setupFiles: ['./test/setup.ts'],
    },
  };
});
