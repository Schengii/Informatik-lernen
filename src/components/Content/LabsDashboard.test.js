import { describe, it, expect } from 'vitest';
import { LAB_MODULES } from './LabsDashboard';

// Regression test: several LAB_MODULES cards used to reference an `id` that didn't match
// any `activeTab === '...'` branch in App.jsx (e.g. 'bigo' instead of 'bigo_benchmark'),
// which made a click on that card land on a blank page. Since LAB_MODULES is now just an
// alias for LAB_REGISTRY (src/data/labRegistry.js) and App.jsx renders labs generically by
// looking up that same registry (see App.jsx's `findLabEntry` usage), id/component mismatches
// are structurally impossible - what's left to check is that the registry itself is well-formed.
describe('LabsDashboard lab catalog', () => {
  it('has at least one lab module defined', () => {
    expect(LAB_MODULES.length).toBeGreaterThan(0);
  });

  it('every entry has a component to render (no forgotten import)', () => {
    const withoutComponent = LAB_MODULES.filter((lab) => typeof lab.component !== 'object' && typeof lab.component !== 'function');
    expect(withoutComponent.map((l) => l.id)).toEqual([]);
  });

  it('has no duplicate ids (used as React keys, and as App.jsx lookup keys)', () => {
    const ids = LAB_MODULES.map((lab) => lab.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('has no id that is also used as an alias (would make lookups ambiguous)', () => {
    const ids = new Set(LAB_MODULES.map((lab) => lab.id));
    const aliases = LAB_MODULES.flatMap((lab) => lab.aliases || []);
    const clashing = aliases.filter((alias) => ids.has(alias));
    expect(clashing).toEqual([]);
  });

  it('has no duplicate aliases across entries', () => {
    const aliases = LAB_MODULES.flatMap((lab) => lab.aliases || []);
    const uniqueAliases = new Set(aliases);
    expect(uniqueAliases.size).toBe(aliases.length);
  });
});
