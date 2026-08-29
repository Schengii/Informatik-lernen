/**
 * OpenTelemetry Distributed Tracing & W3C Trace Context Engine
 * Simulates microservice request traces, W3C traceparent header propagation,
 * and spans waterfall latency visualization.
 */

export function generateW3CTraceparent(traceId, parentSpanId, sampled = true) {
  const version = '00';
  const tid = traceId || Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
  const sid = parentSpanId || Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
  const flags = sampled ? '01' : '00';
  return `${version}-${tid}-${sid}-${flags}`;
}

export function simulateDistributedTrace(scenario = 'checkout') {
  const traceId = '4bf92f3577b34da6a3ce929d0e0e4736';

  let spans = [];
  if (scenario === 'checkout') {
    spans = [
      {
        id: 'span-001',
        name: 'HTTP POST /api/v1/checkout',
        service: 'api-gateway',
        parentSpanId: null,
        startTimeMs: 0,
        durationMs: 320,
        status: 'OK',
        attributes: { 'http.status_code': 200, 'http.method': 'POST', 'client.ip': '192.168.1.100' }
      },
      {
        id: 'span-002',
        name: 'gRPC AuthService.ValidateToken',
        service: 'auth-service',
        parentSpanId: 'span-001',
        startTimeMs: 15,
        durationMs: 45,
        status: 'OK',
        attributes: { 'rpc.system': 'grpc', 'rpc.service': 'AuthService', 'user.id': 'usr_9841' }
      },
      {
        id: 'span-003',
        name: 'gRPC OrderService.CreateOrder',
        service: 'order-service',
        parentSpanId: 'span-001',
        startTimeMs: 65,
        durationMs: 240,
        status: 'OK',
        attributes: { 'rpc.system': 'grpc', 'order.total_amount': '149.99 EUR' }
      },
      {
        id: 'span-004',
        name: 'SQL INSERT INTO orders',
        service: 'postgres-order-db',
        parentSpanId: 'span-003',
        startTimeMs: 80,
        durationMs: 60,
        status: 'OK',
        attributes: { 'db.system': 'postgresql', 'db.name': 'orders_prod', 'db.statement': 'INSERT INTO orders ...' }
      },
      {
        id: 'span-005',
        name: 'HTTP POST https://api.stripe.com/v1/charges',
        service: 'payment-service',
        parentSpanId: 'span-003',
        startTimeMs: 145,
        durationMs: 150,
        status: 'OK',
        attributes: { 'http.status_code': 200, 'payment.provider': 'stripe' }
      }
    ];
  } else {
    // Error Scenario
    spans = [
      {
        id: 'span-101',
        name: 'HTTP GET /api/v1/inventory/check',
        service: 'api-gateway',
        parentSpanId: null,
        startTimeMs: 0,
        durationMs: 180,
        status: 'ERROR',
        attributes: { 'http.status_code': 503, 'error': true }
      },
      {
        id: 'span-102',
        name: 'gRPC InventoryService.GetStock',
        service: 'inventory-service',
        parentSpanId: 'span-101',
        startTimeMs: 20,
        durationMs: 155,
        status: 'ERROR',
        attributes: { 'rpc.grpc.status_code': 14, 'error.message': 'Redis Connection Timeout' }
      }
    ];
  }

  const rootSpan = spans.find(s => !s.parentSpanId);
  const totalDurationMs = rootSpan ? rootSpan.durationMs : 0;
  const traceparent = generateW3CTraceparent(traceId, rootSpan ? rootSpan.id : null, true);

  return {
    traceId,
    traceparent,
    scenario,
    totalDurationMs,
    spansCount: spans.length,
    spans
  };
}
