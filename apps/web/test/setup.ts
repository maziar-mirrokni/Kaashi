import * as matchers from '@testing-library/jest-dom/matchers';
// Type-only import: adds the jest-dom matchers to Vitest's `expect` types.
import type {} from '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, expect, vi } from 'vitest';

// Registered explicitly: the side-effect entry '@testing-library/jest-dom/vitest'
// (jest-dom 8) does not attach its matchers to Vitest 5's `expect`.
expect.extend(matchers);

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});
