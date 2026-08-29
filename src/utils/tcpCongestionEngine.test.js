import { describe, it, expect } from 'vitest';
import { simulateTcpCongestion } from './tcpCongestionEngine';

describe('TCP Congestion Control Engine', () => {
  it('simulates AIMD window halving for TCP Reno upon packet loss', () => {
    const res = simulateTcpCongestion('reno', 12, 6);
    expect(res.dataPoints.length).toBe(12);

    const lossPoint = res.dataPoints.find(d => d.rtt === 6);
    expect(lossPoint.phase).toBe('PACKET_LOSS');
    expect(lossPoint.cwnd).toBeLessThanOrEqual(16);
  });

  it('demonstrates cubic growth curve for TCP CUBIC', () => {
    const res = simulateTcpCongestion('cubic', 14, 6);
    expect(res.algorithm).toBe('cubic');
    expect(res.dataPoints[13].cwnd).toBeGreaterThanOrEqual(16);
  });

  it('maintains steady high throughput in TCP BBR during loss', () => {
    const res = simulateTcpCongestion('bbr', 10, 5);
    const postLoss = res.dataPoints[5];
    expect(postLoss.cwnd).toBeGreaterThan(20);
  });
});
