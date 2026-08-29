import { describe, it, expect } from 'vitest';
import { WireGuardTunnelSimulator } from './wireguardZtnaEngine';

describe('WireGuard & ZTNA Engine', () => {
  it('performs 1-RTT NoiseIK handshake for trusted peers', () => {
    const wg = new WireGuardTunnelSimulator();
    wg.addPeer({
      id: 'dev_laptop',
      name: 'Alice MacBook',
      publicKey: 'pub_alice_key_123',
      endpoint: '198.51.100.22:51820',
      allowedIPs: ['10.8.0.2/32'],
      trustScore: 95
    });

    const res = wg.performNoiseHandshake('dev_laptop');
    expect(res.success).toBe(true);
    expect(res.peer.handshakeCompleted).toBe(true);
  });

  it('rejects handshake when device trust score is compromised', () => {
    const wg = new WireGuardTunnelSimulator();
    wg.addPeer({
      id: 'compromised_phone',
      name: 'Infected Phone',
      publicKey: 'pub_bad_key_456',
      endpoint: '203.0.113.88:51820',
      allowedIPs: ['10.8.0.3/32'],
      trustScore: 40
    });

    const res = wg.performNoiseHandshake('compromised_phone');
    expect(res.success).toBe(false);
    expect(res.reason).toContain('ZTNA Ablehnung');
  });

  it('enforces Cryptokey Routing and microsegmentation rules', () => {
    const wg = new WireGuardTunnelSimulator();
    wg.addPeer({
      id: 'junior_dev',
      name: 'Bob Intern',
      publicKey: 'pub_bob_key_789',
      endpoint: '198.51.100.33:51820',
      allowedIPs: ['10.8.0.4/32'],
      trustScore: 90,
      role: 'developer'
    });

    wg.performNoiseHandshake('junior_dev');

    // Route to non-allowed IP
    const dropRes = wg.routePacket('junior_dev', '192.168.1.100');
    expect(dropRes.allowed).toBe(false);

    // Route to internal allowed IP
    const passRes = wg.routePacket('junior_dev', '10.8.0.4');
    expect(passRes.allowed).toBe(true);
  });
});
