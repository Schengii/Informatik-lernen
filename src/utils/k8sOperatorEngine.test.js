import { describe, it, expect } from 'vitest';
import { K8sOperatorSimulator } from './k8sOperatorEngine';

describe('Kubernetes Operator & CRD Engine', () => {
  it('reconciles state drift when desired replicas increase', () => {
    const operator = new K8sOperatorSimulator('PostgresCluster');
    const log = operator.setDesiredReplicas(5);

    expect(log.desiredReplicas).toBe(5);
    expect(log.actionTaken).toContain('Provisioning');
    expect(operator.observedState.phase).toBe('Running');
    expect(operator.observedState.actualPods).toBe(5);
  });

  it('heals cluster when a pod/node crash is detected', () => {
    const operator = new K8sOperatorSimulator('PostgresCluster');
    operator.setDesiredReplicas(3);
    const log = operator.simulateNodeCrash();

    expect(log.triggerReason).toBe('EVENT_NODE_FAILURE');
    expect(operator.observedState.phase).toBe('Running');
    expect(operator.observedState.actualPods).toBe(3);
  });

  it('generates valid CRD and Custom Resource YAML manifests', () => {
    const operator = new K8sOperatorSimulator('PostgresCluster');
    const yaml = operator.generateCrdManifest();

    expect(yaml).toContain('kind: CustomResourceDefinition');
    expect(yaml).toContain('kind: PostgresCluster');
    expect(yaml).toContain('replicas: 3');
  });
});
