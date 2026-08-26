import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { LAB_MODULES } from './LabsDashboard';

// Regression test: several LAB_MODULES cards used an `id` that didn't match any
// `activeTab === '...'` branch in App.jsx (e.g. 'bigo' instead of 'bigo_benchmark',
// 'pkce' instead of 'oauth_pkce_studio'). Clicking such a card calls
// `onSelectLab(id)` → `setActiveTab(id)`, but since no render branch matches that
// tab id, the user lands on a blank page. This test makes sure every card in the
// "Alle Labs Hub" actually navigates somewhere real.
describe('LabsDashboard lab catalog', () => {
  const appJsxSource = fs.readFileSync(
    path.resolve(__dirname, '../../App.jsx'),
    'utf-8'
  );

  const reachableTabIds = new Set(
    [...appJsxSource.matchAll(/activeTab === '([a-zA-Z0-9_-]+)'/g)].map((m) => m[1])
  );

  it('has at least one lab module defined', () => {
    expect(LAB_MODULES.length).toBeGreaterThan(0);
  });

  it('every lab card id resolves to an actual tab rendered in App.jsx', () => {
    const brokenIds = LAB_MODULES
      .map((lab) => lab.id)
      .filter((id) => !reachableTabIds.has(id));

    expect(brokenIds).toEqual([]);
  });

  it('has no duplicate ids (used as React keys)', () => {
    const ids = LAB_MODULES.map((lab) => lab.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });
});
