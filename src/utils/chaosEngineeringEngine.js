// Chaos Engineering & Resilience Engine for Distributed Microservices
// Simulates fault injections, cascading failures, circuit breakers, rate limiters & fallbacks.

export const INITIAL_SERVICES = [
  { id: 'gateway', name: 'API Gateway', baseLatency: 15, errorRate: 0, status: 'healthy', rps: 1200 },
  { id: 'auth', name: 'Auth Service (OAuth/JWT)', baseLatency: 35, errorRate: 0, status: 'healthy', rps: 950 },
  { id: 'order', name: 'Order Processing Service', baseLatency: 60, errorRate: 0, status: 'healthy', rps: 600 },
  { id: 'payment', name: 'Third-Party Payment API', baseLatency: 120, errorRate: 0, status: 'healthy', rps: 450 },
  { id: 'inventory_db', name: 'PostgreSQL Inventory DB', baseLatency: 20, errorRate: 0, status: 'healthy', rps: 800 },
  { id: 'redis_cache', name: 'Redis Fallback Cache', baseLatency: 5, errorRate: 0, status: 'healthy', rps: 1100 }
];

export const CHAOS_EXPERIMENTS = [
  {
    id: 'exp_payment_latency',
    title: 'Experiment 1: Payment Gateway Latenz-Spike (+1500ms)',
    desc: 'Simuliert extreme Netzwerklatenz des externen Zahlungsdienstleisters.',
    target: 'payment',
    fault: 'latency_spike',
    latencyAdd: 1500,
    errorProb: 0.1
  },
  {
    id: 'exp_order_crash_500',
    title: 'Experiment 2: Order Service Crash & HTTP 500 Fehler',
    desc: 'Simuliert interne NullPointerException & unhandled Exceptions.',
    target: 'order',
    fault: 'error_500',
    latencyAdd: 200,
    errorProb: 0.85
  },
  {
    id: 'exp_db_pool_exhaustion',
    title: 'Experiment 3: DB Connection Pool Exhaustion (Deadlock)',
    desc: 'Alle Datenbankverbindungen sind blockiert, Anfragen stauen sich an.',
    target: 'inventory_db',
    fault: 'db_exhaustion',
    latencyAdd: 3000,
    errorProb: 0.9
  },
  {
    id: 'exp_cascading_failure',
    title: 'Experiment 4: Kaskadierender Gesamtausfall (Cascading Failure)',
    desc: 'Ausfall von Payment reißt Order Service und API Gateway durch blockierende Threads in den Abgrund.',
    target: 'payment',
    fault: 'cascading',
    latencyAdd: 2500,
    errorProb: 0.7
  }
];

export function evaluateSystemResilience({ services, activeExperiments, enabledPatterns }) {
  // enabledPatterns: { circuitBreaker, rateLimiter, retryBackoff, fallbackCache, bulkhead }
  let totalErrors = 0;
  let totalLatency = 0;
  let totalRequests = 1000;

  const evaluatedServices = services.map((svc) => {
    let latency = svc.baseLatency;
    let failureRate = svc.errorRate;
    let circuitState = 'CLOSED';
    let fallbackTriggered = false;

    // Apply Active Fault Injections
    activeExperiments.forEach((expId) => {
      const exp = CHAOS_EXPERIMENTS.find((e) => e.id === expId);
      if (!exp) return;

      if (exp.target === svc.id || (exp.fault === 'cascading' && (svc.id === 'order' || svc.id === 'gateway'))) {
        latency += exp.latencyAdd;
        failureRate = Math.max(failureRate, exp.errorProb);
      }
    });

    // Apply Resilience Patterns
    if (failureRate > 0.3) {
      if (enabledPatterns.circuitBreaker) {
        circuitState = 'OPEN';
        // Circuit breaker fails fast! Latency drops to 5ms instead of waiting
        latency = 5;
        if (enabledPatterns.fallbackCache) {
          fallbackTriggered = true;
          failureRate = 0.02; // Cache served with 98% success!
        }
      } else if (enabledPatterns.retryBackoff) {
        // Without circuit breaker, retries amplify latency
        latency *= 2.5;
        failureRate *= 0.6; // some succeed on retry
      }
    }

    if (enabledPatterns.rateLimiter && svc.id === 'gateway') {
      // Prevents gateway exhaustion
      failureRate = Math.min(failureRate, 0.05);
    }

    if (enabledPatterns.bulkhead && svc.id === 'order') {
      // Bulkhead keeps order service alive even if payment is failing
      failureRate = Math.min(failureRate, 0.1);
    }

    const isHealthy = failureRate < 0.15 && latency < 300;
    const isDegraded = !isHealthy && (failureRate < 0.6 || latency < 1000);
    const status = isHealthy ? 'healthy' : isDegraded ? 'degraded' : 'down';

    totalErrors += Math.round(totalRequests * failureRate);
    totalLatency += latency;

    return {
      ...svc,
      currentLatency: latency,
      currentErrorRate: Number((failureRate * 100).toFixed(1)),
      status,
      circuitState,
      fallbackTriggered
    };
  });

  const avgLatency = Math.round(totalLatency / services.length);
  const overallErrorRate = Number(((totalErrors / (totalRequests * services.length)) * 100).toFixed(1));
  const resilienceScore = Math.max(0, Math.min(100, Math.round(100 - overallErrorRate * 0.8 - (avgLatency > 200 ? (avgLatency - 200) / 20 : 0))));

  return {
    services: evaluatedServices,
    metrics: {
      avgLatency,
      overallErrorRate,
      resilienceScore,
      survived: overallErrorRate < 10 && avgLatency < 250
    }
  };
}
