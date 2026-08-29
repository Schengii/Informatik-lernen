import { describe, it, expect } from 'vitest';
import {
  INITIAL_SERVICES,
  evaluateSystemResilience
} from './chaosEngineeringEngine';

describe('Chaos Engineering & Resilience Engine', () => {
  it('evaluates baseline system in healthy state without faults', () => {
    const res = evaluateSystemResilience({
      services: INITIAL_SERVICES,
      activeExperiments: [],
      enabledPatterns: { circuitBreaker: false, rateLimiter: false, retryBackoff: false, fallbackCache: false, bulkhead: false }
    });

    expect(res.metrics.overallErrorRate).toBe(0);
    expect(res.metrics.resilienceScore).toBe(100);
    expect(res.metrics.survived).toBe(true);
  });

  it('detects high failure and latency during payment latency spike without resilience patterns', () => {
    const res = evaluateSystemResilience({
      services: INITIAL_SERVICES,
      activeExperiments: ['exp_payment_latency'],
      enabledPatterns: { circuitBreaker: false, rateLimiter: false, retryBackoff: false, fallbackCache: false, bulkhead: false }
    });

    const payment = res.services.find((s) => s.id === 'payment');
    expect(payment.currentLatency).toBeGreaterThan(1500);
  });

  it('demonstrates fast-fail and fallback caching with Circuit Breaker and Fallback Cache enabled', () => {
    const res = evaluateSystemResilience({
      services: INITIAL_SERVICES,
      activeExperiments: ['exp_order_crash_500'],
      enabledPatterns: { circuitBreaker: true, rateLimiter: false, retryBackoff: false, fallbackCache: true, bulkhead: true }
    });

    const order = res.services.find((s) => s.id === 'order');
    expect(order.circuitState).toBe('OPEN');
    expect(order.fallbackTriggered).toBe(true);
    expect(order.currentLatency).toBeLessThan(50); // fast-failed
    expect(res.metrics.survived).toBe(true);
  });
});
