import { describe, it, expect } from 'vitest';
import { CAREER_ROADMAPS } from './roadmapData';
import { LAB_REGISTRY } from './labRegistry';

// Regression test for the guided-learning-path enhancement: every optional `labId` on a
// roadmap step must resolve to a real LAB_REGISTRY entry, or clicking "Lab öffnen" in
// CareerRoadmap.jsx would silently land on a blank page - the exact "toter Link" bug class
// documented in the README changelog, just from a different source this time.
describe('CAREER_ROADMAPS lab links', () => {
  const validLabIds = new Set(LAB_REGISTRY.flatMap((lab) => [lab.id, ...(lab.aliases || [])]));

  it('every step labId resolves to a real lab', () => {
    const broken = CAREER_ROADMAPS
      .flatMap((roadmap) => roadmap.steps)
      .filter((step) => step.labId && !validLabIds.has(step.labId))
      .map((step) => `${step.id} -> ${step.labId}`);
    expect(broken).toEqual([]);
  });

  it('has at least one roadmap step with a lab link (otherwise the feature is dead code)', () => {
    const withLabId = CAREER_ROADMAPS.flatMap((roadmap) => roadmap.steps).filter((step) => step.labId);
    expect(withLabId.length).toBeGreaterThan(0);
  });
});
