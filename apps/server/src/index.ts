import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { buildApp } from './app.js';
import { loadConfig } from './config.js';

// Load the repo-root .env file when present (from src/ in development and
// dist/ in production, the root is three levels up).
const envFile = fileURLToPath(new URL('../../../.env', import.meta.url));
if (existsSync(envFile)) {
  process.loadEnvFile(envFile);
}

const config = loadConfig();
const app = buildApp({ logger: { level: config.logLevel } });

try {
  await app.listen({ host: config.host, port: config.port });
} catch (error) {
  app.log.error(error);
  process.exit(1);
}

for (const signal of ['SIGINT', 'SIGTERM'] as const) {
  process.once(signal, () => {
    void app.close().then(() => process.exit(0));
  });
}
