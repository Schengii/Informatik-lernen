import { describe, it, expect } from 'vitest';
import { calculateWebRtcMetrics } from './webrtcSfuEngine';

describe('WebRTC Mesh vs MCU vs SFU Engine', () => {
  it('calculates quadratic stream explosion for Full Mesh', () => {
    const res = calculateWebRtcMetrics(6, 1000, 'mesh');
    expect(res.totalStreamsInNetwork).toBe(30); // 6 * 5
    expect(res.clientUplinkKbps).toBe(5000);
    expect(res.serverCpuLoadPercent).toBe(0);
  });

  it('shows heavy server CPU load for MCU transcoding', () => {
    const res = calculateWebRtcMetrics(6, 1000, 'mcu');
    expect(res.clientUplinkKbps).toBe(1000);
    expect(res.clientDownlinkKbps).toBe(1000);
    expect(res.serverCpuLoadPercent).toBeGreaterThan(80);
  });

  it('proves SFU is scalable with low server CPU and manageable bandwidth', () => {
    const res = calculateWebRtcMetrics(10, 1000, 'sfu');
    expect(res.clientUplinkKbps).toBe(1350);
    expect(res.serverCpuLoadPercent).toBeLessThan(30);
  });
});
