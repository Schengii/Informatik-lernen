import { describe, it, expect } from 'vitest';
import {
  evaluatePromqlQuery,
  evaluateAlertRule,
  generateAlertRuleYaml
} from './promqlAlertEngine';

describe('PromQL Alerting Engine', () => {
  it('evaluates time-series metrics including avg, max, and p95', () => {
    const samples = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    const res = evaluatePromqlQuery('http_requests_per_sec', samples, 5);

    expect(res.samplesCount).toBe(10);
    expect(res.avg).toBe(55);
    expect(res.max).toBe(100);
    expect(res.p95).toBe(100);
  });

  it('triggers FIRING state when threshold is breached', () => {
    const rule = { alertName: 'HighCpuUsage', threshold: 85, severity: 'critical' };
    const res = evaluateAlertRule(rule, 92);

    expect(res.state).toBe('FIRING');
    expect(res.summary).toContain('Alarm ausgelöst');
  });

  it('generates compliant Prometheus Alert Rule YAML', () => {
    const yaml = generateAlertRuleYaml('HighLatency', 'rate(http_duration_seconds[5m]) > 0.5', 2, 'critical', 'Latenz über 500ms');
    expect(yaml).toContain('alert: HighLatency');
    expect(yaml).toContain('for: 2m');
    expect(yaml).toContain('severity: critical');
  });
});
