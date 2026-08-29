import { describe, it, expect } from 'vitest';
import {
  lintDockerfile,
  generateMultiStageOptimized,
  SAMPLE_DOCKERFILES
} from './dockerfileOptimizerEngine';

describe('Dockerfile Optimizer & Linter Engine', () => {
  it('detects unoptimized layer caching when COPY . . precedes npm install', () => {
    const nodeDoc = SAMPLE_DOCKERFILES[0].raw;
    const lint = lintDockerfile(nodeDoc);

    expect(lint.copyAllBeforeInstall).toBe(true);
    expect(lint.issues.some(i => i.code === 'INEFFICIENT_LAYER_CACHE')).toBe(true);
    expect(lint.score).toBeLessThan(70);
  });

  it('detects missing USER instruction (root user)', () => {
    const pyDoc = SAMPLE_DOCKERFILES[2].raw;
    const lint = lintDockerfile(pyDoc);

    expect(lint.hasNonRootUser).toBe(false);
    expect(lint.issues.some(i => i.code === 'ROOT_USER')).toBe(true);
  });

  it('generates multi-stage optimized builds with high storage savings', () => {
    const goOpt = generateMultiStageOptimized('golang');
    expect(goOpt.optimizedDockerfile).toContain('AS builder');
    expect(goOpt.optimizedDockerfile).toContain('USER nonroot:nonroot');
    expect(goOpt.savingsPercent).toBeGreaterThan(90);

    const nodeOpt = generateMultiStageOptimized('nodejs');
    expect(nodeOpt.optimizedDockerfile).toContain('FROM node:20-alpine AS builder');
    expect(nodeOpt.optimizedSizeMb).toBeLessThan(100);
  });
});
