import React, { useState, useMemo } from 'react';
import {
  Network, Award, Activity
} from 'lucide-react';
import { simulateTcpCongestion } from '../../utils/tcpCongestionEngine';
import { useStore } from '../../store/useStore';
import { triggerHaptic } from '../../utils/haptics';

export default function TcpCongestionLab({ onRewardXP }) {
  const { awardXP } = useStore();
  const [algo, setAlgo] = useState('reno'); // 'reno' | 'cubic' | 'bbr'
  const [rounds] = useState(16);
  const [lossRound, setLossRound] = useState(8);
  const [solved, setSolved] = useState(false);

  const simData = useMemo(() => {
    return simulateTcpCongestion(algo, rounds, lossRound);
  }, [algo, rounds, lossRound]);

  const handleClaim = () => {
    triggerHaptic('LEVEL_UP');
    if (!solved) {
      setSolved(true);
      if (onRewardXP) {
        onRewardXP(45);
      } else {
        awardXP(45, 'tcp_congestion_master');
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
              <Network size={14} /> Transport Layer Protocols
            </span>
            <span className="badge badge-emerald" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Activity size={14} /> TCP Congestion Control (CWND)
            </span>
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, color: 'var(--text-main)' }}>
            🌐 TCP Congestion Control Studio (Reno vs. CUBIC vs. BBR)
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginTop: '6px', maxWidth: '750px' }}>
            Vergleiche die Überlastkontroll-Algorithmen von TCP: Klassisches AIMD (Reno), modernes kubisches Fenster-Wachstum (CUBIC) und Googles modellbasiertes BBR gegen Bufferbloat.
          </p>
        </div>

        <button
          onClick={handleClaim}
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px', fontWeight: 'bold' }}
        >
          <Award size={16} /> Überlastkontrolle Bestätigen (+45 XP)
        </button>
      </div>

      {/* Algorithm Switcher Tabs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '24px' }}>
        <button
          onClick={() => { setAlgo('reno'); triggerHaptic('SELECTION'); }}
          className={`btn ${algo === 'reno' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ padding: '12px', textAlign: 'center' }}
        >
          <div style={{ fontWeight: 'bold' }}>1. TCP Reno (AIMD)</div>
          <div style={{ fontSize: '0.72rem', opacity: 0.8 }}>Klassische Fenster-Halbierung</div>
        </button>

        <button
          onClick={() => { setAlgo('cubic'); triggerHaptic('SELECTION'); }}
          className={`btn ${algo === 'cubic' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ padding: '12px', textAlign: 'center' }}
        >
          <div style={{ fontWeight: 'bold' }}>2. TCP CUBIC (Linux)</div>
          <div style={{ fontSize: '0.72rem', opacity: 0.8 }}>Kubische Wiederherstellung</div>
        </button>

        <button
          onClick={() => { setAlgo('bbr'); triggerHaptic('SELECTION'); }}
          className={`btn ${algo === 'bbr' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ padding: '12px', textAlign: 'center' }}
        >
          <div style={{ fontWeight: 'bold' }}>3. TCP BBR (Google)</div>
          <div style={{ fontSize: '0.72rem', opacity: 0.8 }}>Modellbasiert &amp; Kein Bufferbloat</div>
        </button>
      </div>

      {/* Visual CWND Chart (CSS Bar Chart) */}
      <div style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', marginBottom: '24px' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-muted)', display: 'block', marginBottom: '16px' }}>
          CWND Verlauf über {rounds} RTT Zyklen (Paketverlust bei RTT #{lossRound}):
        </span>

        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '180px', padding: '10px 0', borderBottom: '1px solid var(--border-color)' }}>
          {simData.dataPoints.map((point) => {
            const heightPercent = Math.min(100, (point.cwnd / 40) * 100);
            const isLoss = point.rtt === lossRound;

            return (
              <div key={point.rtt} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                <span style={{ fontSize: '0.7rem', color: isLoss ? '#ef4444' : 'var(--text-muted)', marginBottom: '4px', fontWeight: 'bold' }}>
                  {point.cwnd}
                </span>
                <div
                  style={{
                    width: '100%',
                    height: `${heightPercent}%`,
                    background: isLoss ? '#ef4444' : (algo === 'bbr' ? '#10b981' : 'var(--accent-primary)'),
                    borderRadius: '4px 4px 0 0',
                    transition: 'height 0.3s ease'
                  }}
                />
                <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '6px' }}>
                  #{point.rtt}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Controls & Didactic Explanation */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        <div style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-muted)', display: 'block', marginBottom: '12px' }}>
            Simulations-Parameter:
          </span>

          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
              Paketverlust-Zeitpunkt: RTT #{lossRound}
            </label>
            <input
              type="range"
              min="4"
              max="12"
              value={lossRound}
              onChange={(e) => setLossRound(parseInt(e.target.value, 10))}
              style={{ width: '100%' }}
            />
          </div>
        </div>

        <div style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
            Algorithmus-Verhalten:
          </span>

          <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--text-main)', lineHeight: '1.5' }}>
            {simData.description}
          </p>
        </div>
      </div>
    </div>
  );
}
