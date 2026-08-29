/**
 * REST vs. gRPC vs. GraphQL Protocol Benchmark Engine
 * Simulates payload serialization, header overhead, and network throughput across 1,000 requests.
 */

export const SAMPLE_USER_DATASET = [
  { id: 1, name: 'Alice Schmidt', email: 'alice@example.com', role: 'DevOps Engineer', permissions: ['k8s:admin', 'git:push'], bio: 'Passionate cloud architect with 8 years of Kubernetes experience.' },
  { id: 2, name: 'Bob Mueller', email: 'bob@example.com', role: 'Backend Lead', permissions: ['db:read', 'db:write'], bio: 'PostgreSQL optimization and Go microservices enthusiast.' },
  { id: 3, name: 'Clara Weber', email: 'clara@example.com', role: 'Security Specialist', permissions: ['sec:audit', 'siem:read'], bio: 'Certified ethical hacker and zero-trust evangelist.' }
];

export function benchmarkProtocols({ requestCount = 1000, networkLatencyMs = 20 }) {
  // 1. REST (JSON HTTP/1.1)
  const restPayload = JSON.stringify({ data: SAMPLE_USER_DATASET });
  const restPayloadBytes = new TextEncoder().encode(restPayload).length + 320; // 320 bytes HTTP/1.1 headers
  const restReqLatency = networkLatencyMs + (restPayloadBytes / 1024) * 0.4 + 1.2;
  const restTotalDurationMs = Math.round((restReqLatency * requestCount * 0.4) * 10) / 10;
  const restThroughput = Math.round((requestCount / (restTotalDurationMs / 1000)));

  // 2. gRPC (Protobuf Binary HTTP/2)
  // Protobuf is binary encoded: ~35% of JSON payload size + HPACK compressed header
  const grpcPayloadBytes = Math.round(restPayloadBytes * 0.32);
  const grpcReqLatency = networkLatencyMs * 0.7 + (grpcPayloadBytes / 1024) * 0.1 + 0.3; // HTTP/2 Multiplexing
  const grpcTotalDurationMs = Math.round((grpcReqLatency * requestCount * 0.25) * 10) / 10;
  const grpcThroughput = Math.round((requestCount / (grpcTotalDurationMs / 1000)));

  // 3. GraphQL (Field Selection: only id & name, HTTP/1.1)
  const gqlSubset = SAMPLE_USER_DATASET.map(u => ({ id: u.id, name: u.name }));
  const gqlPayload = JSON.stringify({ data: gqlSubset });
  const gqlPayloadBytes = new TextEncoder().encode(gqlPayload).length + 280;
  const gqlReqLatency = networkLatencyMs + (gqlPayloadBytes / 1024) * 0.3 + 0.8;
  const gqlTotalDurationMs = Math.round((gqlReqLatency * requestCount * 0.35) * 10) / 10;
  const gqlThroughput = Math.round((requestCount / (gqlTotalDurationMs / 1000)));

  return {
    requestCount,
    networkLatencyMs,
    protocols: {
      rest: {
        name: 'REST (JSON / HTTP/1.1)',
        payloadBytes: restPayloadBytes,
        avgLatencyMs: Math.round(restReqLatency * 10) / 10,
        totalDurationMs: restTotalDurationMs,
        throughputReqSec: restThroughput,
        badge: 'Standard'
      },
      grpc: {
        name: 'gRPC (Protobuf / HTTP/2)',
        payloadBytes: grpcPayloadBytes,
        avgLatencyMs: Math.round(grpcReqLatency * 10) / 10,
        totalDurationMs: grpcTotalDurationMs,
        throughputReqSec: grpcThroughput,
        badge: 'Fastest'
      },
      graphql: {
        name: 'GraphQL (Field Selective)',
        payloadBytes: gqlPayloadBytes,
        avgLatencyMs: Math.round(gqlReqLatency * 10) / 10,
        totalDurationMs: gqlTotalDurationMs,
        throughputReqSec: gqlThroughput,
        badge: 'Flexible'
      }
    }
  };
}
