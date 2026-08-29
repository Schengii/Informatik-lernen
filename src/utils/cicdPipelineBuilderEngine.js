// CI/CD Directed Acyclic Graph (DAG) Pipeline Engine
// Validates DAG topologies, topological sorting, parallel stage execution, and artifact flows.

export const DEFAULT_PIPELINE_JOBS = [
  {
    id: 'oxlint_job',
    name: '1. Oxlint & Code Quality',
    stage: 'lint',
    needs: [],
    durationMs: 1200,
    commands: ['npm run lint', 'oxlint src/ --deny-warnings'],
    artifacts: ['lint-report.json']
  },
  {
    id: 'unit_tests_job',
    name: '2. Vitest Unit & Integration Tests',
    stage: 'test',
    needs: [],
    durationMs: 2000,
    commands: ['vitest run --coverage', 'check coverage > 85%'],
    artifacts: ['coverage/lcov.info']
  },
  {
    id: 'security_snyk_job',
    name: '3. Snyk SAST & Dependency Audit',
    stage: 'security',
    needs: ['oxlint_job'],
    durationMs: 1500,
    commands: ['snyk test --severity-threshold=high', 'npm audit --audit-level=high'],
    artifacts: ['snyk-vulnerabilities.json']
  },
  {
    id: 'docker_build_job',
    name: '4. Docker Multi-Stage Build & Push',
    stage: 'build',
    needs: ['unit_tests_job', 'security_snyk_job'],
    durationMs: 3200,
    commands: ['docker build --target=production -t app:v3.9.0 .', 'docker push registry.company.internal/app:v3.9.0'],
    artifacts: ['docker-image-digest.sha256']
  },
  {
    id: 'deploy_staging_job',
    name: '5. Helm Deploy to Staging K8s',
    stage: 'deploy_staging',
    needs: ['docker_build_job'],
    durationMs: 2200,
    commands: ['helm upgrade --install api-staging ./helm --set image.tag=v3.9.0', 'kubectl rollout status deployment/api-staging'],
    artifacts: ['staging-health.log']
  },
  {
    id: 'deploy_prod_job',
    name: '6. Production Canary Rollout (10% -> 100%)',
    stage: 'deploy_prod',
    needs: ['deploy_staging_job'],
    durationMs: 3000,
    commands: ['helm upgrade --install api-prod ./helm --set canary.weight=10', 'kubectl rollout status deployment/api-prod'],
    artifacts: ['prod-metrics.log']
  }
];

export function validatePipelineDAG(jobs) {
  const jobMap = new Map(jobs.map((j) => [j.id, j]));
  const errors = [];

  // 1. Check missing dependencies
  jobs.forEach((job) => {
    (job.needs || []).forEach((depId) => {
      if (!jobMap.has(depId)) {
        errors.push(`Job "${job.name}" referenziert unbekannte Abhängigkeit "${depId}".`);
      }
    });
  });

  // 2. Cycle Detection via DFS
  const visited = new Set();
  const recStack = new Set();

  function hasCycle(jobId) {
    visited.add(jobId);
    recStack.add(jobId);

    const job = jobMap.get(jobId);
    if (job) {
      for (const depId of job.needs || []) {
        if (!visited.has(depId)) {
          if (hasCycle(depId)) return true;
        } else if (recStack.has(depId)) {
          return true;
        }
      }
    }

    recStack.delete(jobId);
    return false;
  }

  jobs.forEach((job) => {
    if (!visited.has(job.id)) {
      if (hasCycle(job.id)) {
        errors.push('Zyklische Abhängigkeit (Deadlock-Loop) im Pipeline-Graph entdeckt!');
      }
    }
  });

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function computePipelineStages(jobs) {
  const validation = validatePipelineDAG(jobs);
  if (!validation.isValid) return { stages: [], isValid: false, errors: validation.errors };

  // Compute levels (stages)
  const jobMap = new Map(jobs.map((j) => [j.id, j]));
  const levels = new Map();

  function getLevel(jobId) {
    if (levels.has(jobId)) return levels.get(jobId);
    const job = jobMap.get(jobId);
    if (!job || !job.needs || job.needs.length === 0) {
      levels.set(jobId, 0);
      return 0;
    }
    const maxDepLevel = Math.max(...job.needs.map((dep) => getLevel(dep)));
    const lvl = maxDepLevel + 1;
    levels.set(jobId, lvl);
    return lvl;
  }

  jobs.forEach((j) => getLevel(j.id));

  const maxLevel = Math.max(0, ...Array.from(levels.values()));
  const stageGroups = [];

  for (let l = 0; l <= maxLevel; l++) {
    const stageJobs = jobs.filter((j) => levels.get(j.id) === l);
    if (stageJobs.length > 0) {
      stageGroups.push({
        level: l,
        name: `Stage ${l + 1}`,
        jobs: stageJobs
      });
    }
  }

  return {
    stages: stageGroups,
    isValid: true,
    errors: []
  };
}
