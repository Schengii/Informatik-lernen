import { test, expect } from '@playwright/test';
import { completeOnboarding } from './helpers.js';

// Complements src/data/labRegistry.smoke.test.jsx (which mounts every lab in jsdom, not a
// real browser): jsdom has no WebGL/Canvas/real layout, so a handful of labs that rely on
// real browser behavior (charts measuring their container, monaco-editor, framer-motion
// layout animations) render fine in jsdom's stub but could still misbehave in an actual
// browser. This spec opens a small representative sample - one from each kind of subsystem
// - directly by URL and asserts there are no console/page errors.
const REPRESENTATIVE_LAB_PATHS = [
  '/subnetting', // plain calculator-style lab
  '/os_scheduler', // recharts-heavy (Gantt chart)
  '/sqlite_studio', // alasql-backed in-browser SQL
  '/roadmaps' // uses the new onNavigateTab lab-link wiring (Phase 2D)
];

for (const path of REPRESENTATIVE_LAB_PATHS) {
  test(`opens ${path} without console or page errors`, async ({ page }) => {
    const errors = [];
    page.on('pageerror', (err) => errors.push(err.message));
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });

    await completeOnboarding(page);
    await page.goto(path);

    // Give lazy-loaded chunks and any first-effect async work a moment to settle.
    await page.waitForLoadState('networkidle');

    expect(errors).toEqual([]);
  });
}
