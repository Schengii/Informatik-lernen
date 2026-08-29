import React, { useState, useRef, useEffect } from 'react';
import {
  ShieldCheck, Network, Play, RefreshCw, CheckCircle2, ShieldAlert
} from 'lucide-react';
import { WireGuardTunnelSimulator } from '../../utils/wireguardZtnaEngine';
import { useStore } from '../../store/useStore';
import { triggerHaptic } from '../../utils/haptics';

export default function WireguardZtnaLab({ onRewardXP }) {
  const { awardXP } = useStore();
  const [selectedPeerId, setSelectedPeerId] = useState('dev_macbook');
  const [destIp, setDestIp] = useState('10.8.0.2');
  const [routeResult, setRouteResult] = useState(null);
  const [solved, setSolved] = useState(false);

  const wgRef = useRef(null);
  const [, setTick] = useState(0);

  useEffect(() => {
    wgRef.current = new WireGuardTunnelSimulator();
    wgRef.current.addPeer({
      id: 'dev_macbook',
      name: 'Alice MacBook Pro',
      publicKey: '3mK9+sF8L2vN7P4sW1xY0zC6mA=Alice',
      endpoint: '198.51.100.22:51820',
      allowedIPs: ['10.8.0.2/32'],
      trustScore: 92,
      role: 'developer'
    });
    wgRef.current.addPeer({
      id: 'sec_admin',
      name: 'SecOps Workstation',
      publicKey: '9pL4+vB8F3V8gDqR5L2vN7P4sW1=Admin',
      endpoint: '198.51.100.44:51820',
      allowedIPs: ['10.8.0.3/32', '10.8.0.99/32'],
      trustScore: 98,
      role: 'admin'
    });
    wgRef.current.addPeer({
      id: 'guest_device',
      name: 'Unmanaged Guest Phone',
      publicKey: '0zX1+vN7P4sW1xY0zC6mAiK98bF=Guest',
      endpoint: '203.0.113.55:51820',
      allowedIPs: ['10.8.0.5/32'],
      trustScore: 45,
      role: 'guest'
    });
    setTick(t => t + 1);
  }, []);

  const handleHandshake = (peerId) => {
    if (!wgRef.current) return;
    const res = wgRef.current.performNoiseHandshake(peerId);
    if (res.success) {
      triggerHaptic('SUCCESS');
    } else {
      triggerHaptic('ERROR');
    }
    setTick(t => t + 1);
    checkXP();
  };

  const handleRoute = () => {
    if (!wgRef.current) return;
    const res = wgRef.current.routePacket(selectedPeerId, destIp);
    setRouteResult(res);
    if (res.allowed) {
      triggerHaptic('LEVEL_UP');
    } else {
      triggerHaptic('WARNING');
    }
    setTick(t => t + 1);
    checkXP();
  };

  const checkXP = () => {
    if (!solved) {
      setSolved(true);
      if (onRewardXP) {
        onRewardXP(45);
      } else {
        awardXP(45, 'wireguard_ztna_master');
      }
    }
  };

  const peers = wgRef.current ? wgRef.current.peers : [];

  return (
    <div style={{ background: 'var(--bg-card)', padding: '28px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-color)' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="badge badge-indigo" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Network size={14} /> VPN &amp; Zero-Trust
            </span>
            <span className="badge badge-emerald" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={14} /> WireGuard Cryptokey Routing
            </span>
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, color: 'var(--text-main)' }}>
            🔒 WireGuard VPN &amp; Zero-Trust Network Access (ZTNA) Studio
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginTop: '6px', maxWidth: '750px' }}>
            Erforsche 1-RTT NoiseIK Handshakes, AllowedIPs Cryptokey Routing und kontextbasierte ZTNA-Sicherheitsprüfungen (Device Trust Score &amp; Rollen-Segmentierung).
          </p>
        </div>

        <button
          onClick={handleRoute}
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px', fontWeight: 'bold' }}
        >
          <Play size={16} /> Paket Routen (+45 XP)
        </button>
      </div>

      {/* Packet Test Output Banner */}
      {routeResult && (
        <div
          style={{
            background: routeResult.allowed ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)',
            border: `1px solid ${routeResult.allowed ? '#10b981' : '#ef4444'}`,
            borderRadius: '12px',
            padding: '14px 18px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}
        >
          {routeResult.allowed ? <CheckCircle2 size={20} color="#10b981" /> : <ShieldAlert size={20} color="#ef4444" />}
          <div>
            <div style={{ fontWeight: 'bold', color: routeResult.allowed ? '#10b981' : '#ef4444' }}>
              {routeResult.allowed ? '✅ Paket erfolgreich über WireGuard Tunnel geroutet' : '❌ Paket verworfen'}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              {routeResult.reason}
            </div>
          </div>
        </div>
      )}

      {/* Peer Configuration Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {peers.map((p) => {
          const isTrustCompromised = p.trustScore < 60;
          return (
            <div
              key={p.id}
              style={{
                background: 'var(--bg-secondary)',
                padding: '18px',
                borderRadius: '12px',
                border: '1px solid var(--border-color)',
                borderLeft: `4px solid ${p.handshakeCompleted ? '#10b981' : isTrustCompromised ? '#ef4444' : 'var(--accent-primary)'}`
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 'bold', fontSize: '0.95rem' }}>{p.name}</span>
                <span className={`badge ${p.handshakeCompleted ? 'badge-emerald' : isTrustCompromised ? 'badge-rose' : 'badge-indigo'}`} style={{ fontSize: '0.72rem' }}>
                  {p.handshakeCompleted ? 'Connected' : isTrustCompromised ? 'Blocked' : 'Idle'}
                </span>
              </div>

              <div style={{ marginTop: '10px', fontSize: '0.78rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div><span style={{ color: 'var(--text-muted)' }}>Public Key:</span> <code style={{ color: '#38bdf8' }}>{p.publicKey.slice(0, 16)}...</code></div>
                <div><span style={{ color: 'var(--text-muted)' }}>AllowedIPs:</span> <code style={{ color: '#10b981' }}>{p.allowedIPs.join(', ')}</code></div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>ZTNA Trust Score:</span>{' '}
                  <strong style={{ color: isTrustCompromised ? '#ef4444' : '#10b981' }}>{p.trustScore}/100</strong>
                </div>
              </div>

              <button
                onClick={() => handleHandshake(p.id)}
                className="btn btn-secondary"
                style={{ width: '100%', marginTop: '12px', padding: '6px', fontSize: '0.78rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
              >
                <RefreshCw size={13} /> {p.handshakeCompleted ? 'Re-Handshake (Noise)' : 'Tunnel Aufbauen'}
              </button>
            </div>
          );
        })}
      </div>

      {/* Route Packet Simulator Bar */}
      <div style={{ background: 'var(--bg-secondary)', padding: '18px', borderRadius: '12px', border: '1px solid var(--border-color)', display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Absender Peer:</label>
          <select
            value={selectedPeerId}
            onChange={(e) => setSelectedPeerId(e.target.value)}
            style={{ padding: '8px 12px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-main)' }}
          >
            {peers.map(p => (
              <option key={p.id} value={p.id}>{p.name} ({p.role})</option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Ziel-IP (im VPN-Netz):</label>
          <input
            type="text"
            value={destIp}
            onChange={(e) => setDestIp(e.target.value)}
            style={{ padding: '8px 12px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-main)' }}
          />
        </div>
      </div>
    </div>
  );
}
