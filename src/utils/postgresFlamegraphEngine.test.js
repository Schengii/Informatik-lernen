import { describe, it, expect } from 'vitest';
import {
  analyzePlanMetrics,
  SAMPLE_POSTGRES_PLANS
} from './postgresFlamegraphEngine';

describe('PostgreSQL Flamegraph Engine', () => {
  it('computes cache hit ratio and traverses execution plan tree', () => {
    const plan = SAMPLE_POSTGRES_PLANS[0];
    const metrics = analyzePlanMetrics(plan.rootNode);

    expect(metrics.totalTimeMs).toBe(142.5);
    expect(metrics.totalHitBlocks).toBeGreaterThan(1000);
    expect(metrics.cacheHitRatio).toBeGreaterThan(90);
    expect(metrics.flatNodes.length).toBeGreaterThan(2);
  });

  it('handles null node gracefully', () => {
    const metrics = analyzePlanMetrics(null);
    expect(metrics.totalTimeMs).toBe(0);
    expect(metrics.cacheHitRatio).toBe(100);
    expect(metrics.flatNodes.length).toBe(0);
  });
});
