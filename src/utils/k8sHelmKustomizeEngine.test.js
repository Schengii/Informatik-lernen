import { describe, it, expect } from 'vitest';
import {
  generateHelmChart,
  generateKustomizeOverlays
} from './k8sHelmKustomizeEngine';

describe('Kubernetes Helm & Kustomize Engine', () => {
  it('generates valid Helm Chart yaml structures', () => {
    const chart = generateHelmChart({ appName: 'order-api', replicas: 4 });
    expect(chart.chartYaml).toContain('name: order-api');
    expect(chart.valuesYaml).toContain('replicaCount: 4');
    expect(chart.deploymentYaml).toContain('{{ .Values.replicaCount }}');
  });

  it('generates production Kustomize overlays with patches', () => {
    const overlays = generateKustomizeOverlays({ appName: 'order-api', prodReplicas: 8 });
    expect(overlays.baseKustomization).toContain('commonLabels:');
    expect(overlays.prodKustomization).toContain('namespace: production');
    expect(overlays.prodKustomization).toContain('count: 8');
  });
});
