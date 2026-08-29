/**
 * WireGuard VPN & Zero-Trust Network Access (ZTNA) Engine
 * Simulates Cryptokey Routing (NoiseIK Handshake, AllowedIPs lookup)
 * and dynamic Zero-Trust context-aware microsegmentation policies.
 */

export class WireGuardTunnelSimulator {
  constructor(interfaceIp = '10.8.0.1/24', port = 51820) {
    this.interfaceIp = interfaceIp;
    this.port = port;
    this.serverPublicKey = 'iK98bF3V8gDqR5L2vN7P4sW1xY0zC6mA=';
    this.peers = [];
  }

  addPeer({ id, name, publicKey, endpoint, allowedIPs = [], trustScore = 100, role = 'developer' }) {
    const peer = {
      id,
      name,
      publicKey,
      endpoint,
      allowedIPs,
      trustScore,
      role,
      handshakeCompleted: false,
      lastHandshakeTimestamp: null,
      transmittedBytes: 0
    };
    this.peers.push(peer);
    return peer;
  }

  performNoiseHandshake(peerId) {
    const peer = this.peers.find(p => p.id === peerId);
    if (!peer) return { success: false, reason: 'Peer nicht gefunden' };

    // Zero-Trust Security Posture check (Device Health & Trust Score)
    if (peer.trustScore < 60) {
      return {
        success: false,
        reason: `ZTNA Ablehnung: Trust Score ${peer.trustScore} < 60 (Gerät möglicherweise kompromittiert)`,
        peer
      };
    }

    peer.handshakeCompleted = true;
    peer.lastHandshakeTimestamp = new Date().toISOString();
    return {
      success: true,
      reason: '1-RTT Noise_IK Handshake erfolgreich verifiziert (ECDH Curve25519 + ChaCha20-Poly1305)',
      peer
    };
  }

  routePacket(srcPeerId, destinationIp) {
    const peer = this.peers.find(p => p.id === srcPeerId);
    if (!peer) return { allowed: false, reason: 'Unbekannter Peer' };

    if (!peer.handshakeCompleted) {
      return { allowed: false, reason: 'Kein aktiver WireGuard Tunnel-Handshake' };
    }

    // Cryptokey routing: check AllowedIPs
    const isAllowedIp = peer.allowedIPs.some(cidr => destinationIp.startsWith(cidr.replace('/32', '').replace('/24', '')));
    if (!isAllowedIp) {
      return { allowed: false, reason: `Cryptokey Routing Drop: IP ${destinationIp} nicht in AllowedIPs autorisiert` };
    }

    // ZTNA Role Microsegmentation
    if (destinationIp.startsWith('10.8.0.99') && peer.role !== 'admin') {
      return { allowed: false, reason: 'ZTNA Policy Drop: Zugriff auf Prod-DB nur für Rolle Admin erlaubt' };
    }

    peer.transmittedBytes += 128;
    return {
      allowed: true,
      reason: `Paket sicher geroutet via WireGuard Cryptokey zu ${destinationIp}`,
      bytesTransmitted: peer.transmittedBytes
    };
  }
}
