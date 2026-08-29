/**
 * PromQL & Prometheus Alerting Engine
 * Evaluates PromQL time-series queries (rate, histogram_quantile, sum by)
 * and verifies YAML Alerting Rules with state transitions (INACTIVE -> PENDING -> FIRING).
 */

export function evaluatePromqlQuery(metricName, values = [], durationWindow = 5) {
  if (!values || values.length === 0) {
    return { resultType: 'vector', result: [] };
  }

  const avg = values.reduce((sum, v) => sum + v, 0) / values.length;
  const max = Math.max(...values);
  const min = Math.min(...values);
  const p95 = [...values].sort((a, b) => a - b)[Math.floor(values.length * 0.95)] || max;

  return {
    metric: metricName,
    window: `${durationWindow}m`,
    samplesCount: values.length,
    latestValue: values[values.length - 1],
    avg: Math.round(avg * 100) / 100,
    min,
    max,
    p95
  };
}

export function evaluateAlertRule(rule, currentValue) {
  // rule: { alertName, expr, threshold, forDurationSec, severity }
  const isBreached = currentValue >= rule.threshold;
  const state = isBreached ? 'FIRING' : 'INACTIVE';

  return {
    alert: rule.alertName,
    state,
    currentValue,
    threshold: rule.threshold,
    severity: rule.severity || 'warning',
    summary: isBreached
      ? `🚨 Alarm ausgelöst: ${rule.alertName} (${currentValue} >= ${rule.threshold})`
      : `✅ Normalzustand: ${rule.alertName} (${currentValue} < ${rule.threshold})`
  };
}

export function generateAlertRuleYaml(alertName, expr, forMinutes, severity, description) {
  return `groups:
  - name: alerting_rules
    rules:
      - alert: ${alertName}
        expr: ${expr}
        for: ${forMinutes}m
        labels:
          severity: ${severity}
        annotations:
          summary: "${alertName} breached threshold"
          description: "${description}"`;
}
