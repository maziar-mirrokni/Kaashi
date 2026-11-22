import { describe, expect, it } from 'vitest';
import { loadConfig } from '../src/config.js';

describe('loadConfig', () => {
  it('uses defaults when no variables are set', () => {
    expect(loadConfig({})).toEqual({ host: '127.0.0.1', port: 3000, logLevel: 'info' });
  });

  it('reads HOST, PORT and LOG_LEVEL from the environment', () => {
    expect(loadConfig({ HOST: '0.0.0.0', PORT: '8080', LOG_LEVEL: 'debug' })).toEqual({
      host: '0.0.0.0',
      port: 8080,
      logLevel: 'debug',
    });
  });

  it.each(['abc', '70000', '-1', '3.5'])('rejects PORT=%s', (port) => {
    expect(() => loadConfig({ PORT: port })).toThrow(/Invalid PORT/);
  });

  it('rejects an unknown LOG_LEVEL', () => {
    expect(() => loadConfig({ LOG_LEVEL: 'loud' })).toThrow(/Invalid LOG_LEVEL/);
  });
});
