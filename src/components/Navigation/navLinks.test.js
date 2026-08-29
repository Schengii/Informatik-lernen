import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { LAB_REGISTRY, NON_REGISTRY_SECTION_IDS } from '../../data/labRegistry';

// Navbar's dropdown menus and the Command Palette each maintain their own list of
// {id, label, desc} entries with wording tailored to their context (short dropdown labels
// vs. searchable command titles) - deliberately NOT auto-generated from LAB_REGISTRY (see
// src/data/labRegistry.js header comment). That's fine for the *text*, but every `id` they
// navigate to still has to resolve to something real, or the user lands on a blank page -
// exactly the "toter Link" bug class from the changelog. This test reads both files as
// source text (same approach as the pre-existing LabsDashboard catalog test) and checks
// every referenced id against the registry + the small set of hand-rendered app sections.
describe('Navbar & Command Palette dead-link check', () => {
  const validIds = new Set(NON_REGISTRY_SECTION_IDS);
  for (const entry of LAB_REGISTRY) {
    validIds.add(entry.id);
    (entry.aliases || []).forEach((alias) => validIds.add(alias));
  }

  function idsReferencedIn(filePath, pattern) {
    const source = fs.readFileSync(path.resolve(__dirname, filePath), 'utf-8');
    return [...source.matchAll(pattern)].map((m) => m[1]);
  }

  it('every Navbar dropdown/mobile-drawer target resolves to a real lab or app section', () => {
    const ids = idsReferencedIn('./Navbar.jsx', /(?:id: '|navigateTo\(')([a-zA-Z0-9_-]+)'/g);
    expect(ids.length).toBeGreaterThan(0);
    const broken = [...new Set(ids)].filter((id) => !validIds.has(id));
    expect(broken).toEqual([]);
  });

  it('every Command Palette action target resolves to a real lab or app section', () => {
    const ids = idsReferencedIn('./CommandPaletteModal.jsx', /onNavigate\('([a-zA-Z0-9_-]+)'\)/g);
    expect(ids.length).toBeGreaterThan(0);
    const broken = [...new Set(ids)].filter((id) => !validIds.has(id));
    expect(broken).toEqual([]);
  });
});
