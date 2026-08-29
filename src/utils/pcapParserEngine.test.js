// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import {
  exportToPcapBlob,
  parsePcapBuffer,
  PCAP_MAGIC
} from './pcapParserEngine';

describe('PCAP Parser & Exporter Engine', () => {
  const samplePackets = [
    {
      id: 1,
      rawHex: '00 1A 2B 3C 4D 5E 00 11 22 33 44 55 08 00 45 00 00 28 00 01 00 00 40 06 00 00 C0 A8 01 01 C0 A8 01 02',
      protocol: 'TCP'
    },
    {
      id: 2,
      rawHex: '00 11 22 33 44 55 00 1A 2B 3C 4D 5E 08 00 45 00 00 28 00 02 00 00 40 11 00 00 C0 A8 01 02 C0 A8 01 01',
      protocol: 'UDP'
    }
  ];

  it('exports packets to a valid binary PCAP Blob', async () => {
    const blob = exportToPcapBlob(samplePackets);
    expect(blob).toBeDefined();
    expect(blob.size).toBeGreaterThan(24);

    const arrayBuffer = await blob.arrayBuffer();
    const view = new DataView(arrayBuffer);
    expect(view.getUint32(0, true)).toBe(PCAP_MAGIC);
  });

  it('parses a binary PCAP ArrayBuffer back into packet frames', async () => {
    const blob = exportToPcapBlob(samplePackets);
    const arrayBuffer = await blob.arrayBuffer();

    const parsed = parsePcapBuffer(arrayBuffer);
    expect(parsed.packetCount).toBe(2);
    expect(parsed.packets.length).toBe(2);
    expect(parsed.packets[0].protocol).toBe('TCP');
    expect(parsed.packets[1].protocol).toBe('UDP');
  });

  it('throws an error for corrupt or truncated PCAP files', () => {
    const emptyBuffer = new ArrayBuffer(10);
    expect(() => parsePcapBuffer(emptyBuffer)).toThrow();
  });
});
