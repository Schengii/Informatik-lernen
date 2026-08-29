import { describe, it, expect } from 'vitest';
import { generateW3CTraceparent, simulateDistributedTrace } from './otelTracingEngine';

describe('OpenTelemetry Tracing Engine', () => {
  it('formats W3C traceparent headers according to specification', () => {
    const header = generateW3CTraceparent('4bf92f3577b34da6a3ce929d0e0e4736', '00f067aa0ba902b7', true);
    expect(header).toBe('00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01');
  });

  it('simulates a complete microservice checkout trace with root and child spans', () => {
    const trace = simulateDistributedTrace('checkout');
    expect(trace.spansCount).toBe(5);
    expect(trace.totalDurationMs).toBe(320);

    const rootSpan = trace.spans.find(s => !s.parentSpanId);
    expect(rootSpan).toBeDefined();
    expect(rootSpan.service).toBe('api-gateway');

    const dbSpan = trace.spans.find(s => s.service === 'postgres-order-db');
    expect(dbSpan.parentSpanId).toBe('span-003');
  });

  it('handles error scenario trace with status ERROR', () => {
    const trace = simulateDistributedTrace('error');
    expect(trace.spans[0].status).toBe('ERROR');
    expect(trace.spans[1].attributes['error.message']).toContain('Redis Connection Timeout');
  });
});
