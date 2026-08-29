import React, { useState, useMemo } from 'react';
import {
  Terminal, Shield, Play
} from 'lucide-react';
import {
  verifyEbpfCode,
  evaluateXdpPacket
} from '../../utils/ebpfXdpEngine';
import { useStore } from '../../store/useStore';
import { triggerHaptic } from '../../utils/haptics';

const SAMPLE_EBPF_PROGRAM = `SEC("xdp")
int xdp_firewall(struct xdp_md *ctx) {
    void *data = (void *)(long)ctx->data;
    void *data_end = (void *)(long)ctx->data_end;
    
    // Bounds check für den eBPF Kernel Verifier
    if (data + sizeof(struct ethhdr) > data_end)
        return XDP_DROP;

    struct ethhdr *eth = data;
    if (eth->h_proto != bpf_htons(ETH_P_IP))
        return XDP_PASS;

    // Filterregel: Bestimmte Angreifer-IPs direkt an der NIC verwerfen
    // return XDP_DROP;
    return XDP_PASS;
}`;

export default function EbpfXdpLab({ onRewardXP }) {
  const { awardXP } = useStore();
  const [code, setCode] = useState(SAMPLE_EBPF_PROGRAM);
  const [blockIp] = useState('198.51.100.42');
  const [blockPort] = useState(80);
  const [solved, setSolved] = useState(false);

  const verification = useMemo(() => {
    return verifyEbpfCode(code);
  }, [code]);

  const testPackets = [
    { id: 1, srcIp: '198.51.100.42', dstPort: 80, protocol: 'TCP SYN', size: '64B' },
    { id: 2, srcIp: '203.0.113.10', dstPort: 443, protocol: 'HTTPS', size: '512B' },
    { id: 3, srcIp: '198.51.100.99', dstPort: 80, protocol: 'HTTP GET', size: '256B' }
  ];

  const handleTestPacket = () => {
    triggerHaptic('LEVEL_UP');
    if (!solved) {
      setSolved(true);
      if (onRewardXP) {
        onRewardXP(45);
      } else {
        awardXP(45, 'ebpf_xdp_expert');
      }
    }
  };

  return (
    <div style={{ background: 'var(--bg-card)', padding: '28px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-color)' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="badge badge-indigo" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Terminal size={14} /> Linux Kernel &amp; Networking
            </span>
            <span className="badge badge-emerald" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Shield size={14} /> eBPF &amp; XDP Filter
            </span>
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, color: 'var(--text-main)' }}>
            🛡️ Linux eBPF &amp; XDP (eXpress Data Path) Sandbox
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginTop: '6px', maxWidth: '750px' }}>
            Erforsche Paketverarbeitung direkt auf Netzwerk-Treiber-Ebene (`XDP_DROP`, `XDP_PASS`). Verifiziere C-Code im virtuellen eBPF Kernel-Verifier.
          </p>
        </div>

        <button
          onClick={handleTestPacket}
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px', fontWeight: 'bold' }}
        >
          <Play size={16} /> eBPF Filter Testen (+45 XP)
        </button>
      </div>

      {/* Verifier Status Alert */}
      <div
        style={{
          background: verification.isVerified ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
          border: `1px solid ${verification.isVerified ? '#10b981' : '#ef4444'}`,
          borderRadius: '12px',
          padding: '14px 18px',
          marginBottom: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <div>
          <div style={{ fontWeight: 'bold', color: verification.isVerified ? '#10b981' : '#ef4444' }}>
            {verification.isVerified ? '✅ eBPF Kernel Verifier: PASS (Sicher & Bounded)' : '❌ eBPF Kernel Verifier: REJECTED'}
          </div>
          {verification.issues.map((iss, i) => (
            <div key={i} style={{ fontSize: '0.8rem', color: '#ef4444', marginTop: '4px' }}>
              {iss}
            </div>
          ))}
        </div>
        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          ~{verification.instructionCount} BPF Instruktionen
        </span>
      </div>

      {/* Code Editor & Packet Simulation Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {/* C eBPF Source Code */}
        <div style={{ background: 'var(--bg-secondary)', padding: '18px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-muted)', display: 'block', marginBottom: '10px' }}>
            eBPF C-Quellcode (Kernel Hook):
          </span>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows={14}
            style={{
              width: '100%',
              background: '#090d16',
              color: '#38bdf8',
              fontFamily: 'monospace',
              fontSize: '0.82rem',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              padding: '12px',
              outline: 'none',
              resize: 'vertical'
            }}
          />
        </div>

        {/* Live Packet Ingestion Simulation */}
        <div style={{ background: 'var(--bg-secondary)', padding: '18px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-muted)', display: 'block', marginBottom: '14px' }}>
            Eingehende Netzwerk-Pakete (NIC Treiber-Ebene):
          </span>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {testPackets.map((pkt) => {
              const res = evaluateXdpPacket(pkt, { blockIp, blockPort });
              const isDrop = res.action === 'XDP_DROP';
              return (
                <div
                  key={pkt.id}
                  style={{
                    background: 'var(--bg-primary)',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    borderLeft: `4px solid ${isDrop ? '#ef4444' : '#10b981'}`
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 'bold', fontSize: '0.88rem', fontFamily: 'monospace' }}>
                      {pkt.srcIp} ➔ Port {pkt.dstPort} ({pkt.protocol})
                    </span>
                    <span className={`badge ${isDrop ? 'badge-rose' : 'badge-emerald'}`} style={{ fontSize: '0.72rem' }}>
                      {res.action} ({res.kernelCpuCycles} Cycles)
                    </span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    {res.reason}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
