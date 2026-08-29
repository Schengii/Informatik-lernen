import React, { useState, useMemo } from 'react';
import {
  Video, Award, Radio
} from 'lucide-react';
import { calculateWebRtcMetrics } from '../../utils/webrtcSfuEngine';
import { useStore } from '../../store/useStore';
import { triggerHaptic } from '../../utils/haptics';

export default function WebrtcSfuLab({ onRewardXP }) {
  const { awardXP } = useStore();
  const [participants, setParticipants] = useState(8);
  const [bitrate, setBitrate] = useState(1500);
  const [topology, setTopology] = useState('sfu'); // 'mesh' | 'mcu' | 'sfu'
  const [solved, setSolved] = useState(false);

  const metrics = useMemo(() => {
    return calculateWebRtcMetrics(participants, bitrate, topology);
  }, [participants, bitrate, topology]);

  const handleClaim = () => {
    triggerHaptic('LEVEL_UP');
    if (!solved) {
      setSolved(true);
      if (onRewardXP) {
        onRewardXP(45);
      } else {
        awardXP(45, 'webrtc_sfu_architect');
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
              <Radio size={14} /> Real-Time Communications
            </span>
            <span className="badge badge-emerald" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Video size={14} /> WebRTC Media Server Topology
            </span>
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, color: 'var(--text-main)' }}>
            📹 WebRTC Media Server Studio (Mesh vs. MCU vs. SFU)
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginTop: '6px', maxWidth: '750px' }}>
            Vergleiche die 3 großen WebRTC-Architekturen: P2P Full-Mesh ($N \times (N-1)$ Streams), MCU (Server-Transcoding) und SFU (Selective Forwarding mit Simulcast).
          </p>
        </div>

        <button
          onClick={handleClaim}
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px', fontWeight: 'bold' }}
        >
          <Award size={16} /> Topologie Bestätigen (+45 XP)
        </button>
      </div>

      {/* Architecture Switcher Tabs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '24px' }}>
        <button
          onClick={() => { setTopology('mesh'); triggerHaptic('SELECTION'); }}
          className={`btn ${topology === 'mesh' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ padding: '12px', textAlign: 'center' }}
        >
          <div style={{ fontWeight: 'bold' }}>1. Full Mesh (P2P)</div>
          <div style={{ fontSize: '0.72rem', opacity: 0.8 }}>Kein Server, Hoher Upload</div>
        </button>

        <button
          onClick={() => { setTopology('mcu'); triggerHaptic('SELECTION'); }}
          className={`btn ${topology === 'mcu' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ padding: '12px', textAlign: 'center' }}
        >
          <div style={{ fontWeight: 'bold' }}>2. MCU (Composite)</div>
          <div style={{ fontSize: '0.72rem', opacity: 0.8 }}>Server-Rendering, Hohe CPU</div>
        </button>

        <button
          onClick={() => { setTopology('sfu'); triggerHaptic('SELECTION'); }}
          className={`btn ${topology === 'sfu' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ padding: '12px', textAlign: 'center' }}
        >
          <div style={{ fontWeight: 'bold' }}>3. SFU (Simulcast)</div>
          <div style={{ fontSize: '0.72rem', opacity: 0.8 }}>Zoom/Discord Standard</div>
        </button>
      </div>

      {/* Metrics Banner */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '24px' }}>
        <div style={{ background: 'var(--bg-primary)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Client Uplink (Upload):</span>
          <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: metrics.clientUplinkKbps > 4000 ? '#ef4444' : '#10b981', marginTop: '4px' }}>
            {(metrics.clientUplinkKbps / 1000).toFixed(2)} Mbps
          </div>
        </div>

        <div style={{ background: 'var(--bg-primary)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Client Downlink (Download):</span>
          <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: 'var(--accent-primary)', marginTop: '4px' }}>
            {(metrics.clientDownlinkKbps / 1000).toFixed(2)} Mbps
          </div>
        </div>

        <div style={{ background: 'var(--bg-primary)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Server CPU Transcoding-Last:</span>
          <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: metrics.serverCpuLoadPercent > 70 ? '#ef4444' : '#10b981', marginTop: '4px' }}>
            {metrics.serverCpuLoadPercent}%
          </div>
        </div>

        <div style={{ background: 'var(--bg-primary)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Gesamte Medien-Streams:</span>
          <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: 'var(--text-main)', marginTop: '4px' }}>
            {metrics.totalStreamsInNetwork} Streams
          </div>
        </div>
      </div>

      {/* Sliders & Visual Simulation Card */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        {/* Controls */}
        <div style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-muted)', display: 'block', marginBottom: '14px' }}>
            Konferenz Parameter:
          </span>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                Teilnehmer-Anzahl: {participants} Peers
              </label>
              <input
                type="range"
                min="2"
                max="25"
                value={participants}
                onChange={(e) => setParticipants(parseInt(e.target.value, 10))}
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                Video Bitrate pro Stream: {bitrate} kbps
              </label>
              <input
                type="range"
                min="500"
                max="4000"
                step="250"
                value={bitrate}
                onChange={(e) => setBitrate(parseInt(e.target.value, 10))}
                style={{ width: '100%' }}
              />
            </div>
          </div>
        </div>

        {/* Didactic Analysis Card */}
        <div style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-muted)', display: 'block', marginBottom: '10px' }}>
            Architektur-Bewertung &amp; Flaschenhals-Analyse:
          </span>

          <div style={{ background: 'var(--bg-primary)', padding: '14px', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '0.85rem', lineHeight: '1.5' }}>
            <p style={{ margin: '0 0 10px 0', color: 'var(--text-main)' }}>
              {metrics.description}
            </p>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              <strong>Empfehlung:</strong> Für 1:1 Calls eignet sich P2P Mesh. Für Gruppenchats &gt; 4 Personen ist die SFU-Architektur (z. B. mediasoup / LiveKit / Janus) alternativlos.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
