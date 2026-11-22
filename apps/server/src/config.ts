// Server configuration, read from environment variables.
// Every variable is documented in .env.example at the repo root.

export interface ServerConfig {
  host: string;
  port: number;
  logLevel: string;
}

const LOG_LEVELS = ['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent'];

export function loadConfig(env: NodeJS.ProcessEnv = process.env): ServerConfig {
  const host = env.HOST?.trim() || '127.0.0.1';

  const rawPort = env.PORT?.trim() || '3000';
  const port = Number(rawPort);
  if (!Number.isInteger(port) || port < 0 || port > 65535) {
    throw new Error(`Invalid PORT "${rawPort}": expected an integer from 0 to 65535.`);
  }

  const logLevel = env.LOG_LEVEL?.trim() || 'info';
  if (!LOG_LEVELS.includes(logLevel)) {
    throw new Error(`Invalid LOG_LEVEL "${logLevel}": expected one of ${LOG_LEVELS.join(', ')}.`);
  }

  return { host, port, logLevel };
}
