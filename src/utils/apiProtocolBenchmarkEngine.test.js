import { describe, it, expect } from 'vitest';
import { benchmarkProtocols } from './apiProtocolBenchmarkEngine';

describe('API Protocol Benchmark Engine', () => {
  it('measures gRPC, REST, and GraphQL throughput and payload metrics', () => {
    const res = benchmarkProtocols({ requestCount: 1000, networkLatencyMs: 15 });

    expect(res.protocols.grpc.payloadBytes).toBeLessThan(res.protocols.rest.payloadBytes);
    expect(res.protocols.grpc.throughputReqSec).toBeGreaterThan(res.protocols.rest.throughputReqSec);
    expect(res.protocols.graphql.payloadBytes).toBeLessThan(res.protocols.rest.payloadBytes);
  });
});
