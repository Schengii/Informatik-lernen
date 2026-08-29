import { describe, it, expect } from 'vitest';
import { verifyEbpfCode, evaluateXdpPacket } from './ebpfXdpEngine';

describe('Linux eBPF & XDP Engine', () => {
  it('verifies safe bounded eBPF code', () => {
    const safeCode = `
      void *data = (void *)(long)ctx->data;
      void *data_end = (void *)(long)ctx->data_end;
      if (data + sizeof(struct ethhdr) > data_end) return XDP_DROP;
    `;
    const res = verifyEbpfCode(safeCode);
    expect(res.isVerified).toBe(true);
    expect(res.issues.length).toBe(0);
  });

  it('rejects unbounded loops and missing bounds checks in eBPF verifier', () => {
    const badCode = `
      while(1) { int x = 0; }
    `;
    const res = verifyEbpfCode(badCode);
    expect(res.isVerified).toBe(false);
    expect(res.issues.length).toBeGreaterThan(0);
  });

  it('drops packets on NIC layer when block rule matches', () => {
    const packet = { srcIp: '198.51.100.42', dstPort: 80, protocol: 'TCP' };
    const res = evaluateXdpPacket(packet, { blockIp: '198.51.100.42' });

    expect(res.action).toBe('XDP_DROP');
    expect(res.kernelCpuCycles).toBeLessThan(50);
  });
});
