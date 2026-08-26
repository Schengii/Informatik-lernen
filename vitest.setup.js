import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// This project runs Vitest without `test.globals: true` (tests explicitly import
// `describe`/`it`/`expect` from 'vitest' instead of relying on ambient globals).
// @testing-library/react's automatic afterEach-cleanup only self-registers when it detects
// a global `afterEach` - without `globals: true` that never happens, so every render() call
// across a test file piled up in the same jsdom `document` instead of being unmounted
// between tests. That silently made later tests in a file see stale DOM from earlier ones
// (a real bug hit three times while writing new component tests in this project - see git
// history around the labRegistry/CommandPalette/FirstVisitTourOverlay test files).
// This file is wired in via vite.config.js's `test.setupFiles` and runs before every test
// file, so no individual test file needs to do this anymore.
afterEach(() => {
  cleanup();
});
