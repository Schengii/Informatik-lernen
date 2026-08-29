import { describe, it, expect } from 'vitest';
import {
  DEFAULT_PIPELINE_JOBS,
  validatePipelineDAG,
  computePipelineStages
} from './cicdPipelineBuilderEngine';

describe('CI/CD Pipeline DAG Engine', () => {
  it('validates default pipeline DAG successfully without cycles', () => {
    const res = validatePipelineDAG(DEFAULT_PIPELINE_JOBS);
    expect(res.isValid).toBe(true);
    expect(res.errors.length).toBe(0);
  });

  it('detects cyclical deadlock dependencies in DAG', () => {
    const cyclicJobs = [
      { id: 'j1', name: 'Job 1', needs: ['j2'] },
      { id: 'j2', name: 'Job 2', needs: ['j1'] }
    ];
    const res = validatePipelineDAG(cyclicJobs);
    expect(res.isValid).toBe(false);
    expect(res.errors[0]).toContain('Zyklische Abhängigkeit');
  });

  it('computes topological parallel stage groups', () => {
    const res = computePipelineStages(DEFAULT_PIPELINE_JOBS);
    expect(res.isValid).toBe(true);
    expect(res.stages.length).toBeGreaterThanOrEqual(4);
    // Level 0 should contain oxlint and unit_tests (parallel root jobs)
    const stage0 = res.stages[0].jobs.map((j) => j.id);
    expect(stage0).toContain('oxlint_job');
    expect(stage0).toContain('unit_tests_job');
  });
});
