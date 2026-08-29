import React, { useState, useMemo } from 'react';
import {
  Network, Globe, Play
} from 'lucide-react';
import {
  INITIAL_BGP_TOPOLOGY,
  selectBestBgpPath,
  applyAsPathPrepending
} from '../../utils/bgpRoutingEngine';
import { useStore } from '../../store/useStore';
import { triggerHaptic } from '../../utils/haptics';

export default function BgpRoutingLab({ onRewardXP }) {
  const { awardXP } = useStore();
  const [prepends, setPrepends] = useState(0);
  const [localPrefPrimary, setLocalPrefPrimary] = useState(100);
  const [solved, setSolved] = useState(false);

  const activeRoutes = useMemo(() => {
    const primary = {
      ...INITIAL_BGP_TOPOLOGY.availableRoutesToPrefix[0],
      localPref: localPrefPrimary
    };
    const modPrimary = prepends > 0 ? applyAsPathPrepending(primary, prepends) : primary;
    return [modPrimary, INITIAL_BGP_TOPOLOGY.availableRoutesToPrefix[1]];
  }, [prepends, localPrefPrimary]);

  const bestPath = useMemo(() => {
    return selectBestBgpPath(activeRoutes);
  }, [activeRoutes]);

  const handleClaim = () => {
    triggerHaptic('LEVEL_UP');
    if (!solved) {
      setSolved(true);
      if (onRewardXP) {
        onRewardXP(45);
      } else {
        awardXP(45, 'bgp_routing_expert');
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
              <Network size={14} /> Internet Routing &amp; ISPs
            </span>
            <span className="badge badge-teal" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Globe size={14} /> Border Gateway Protocol (BGP)
            </span>
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, color: 'var(--text-main)' }}>
            🌐 BGP Routing &amp; Autonomous System (AS) Path Studio
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginTop: '6px', maxWidth: '750px' }}>
            Simuliere den BGP Best Path Algorithmus. Erforsche AS-Path Längen, Local Preference, AS-Path Prepending und Traffic-Engineering im Internet-Backbone.
          </p>
        </div>

        <button
          onClick={handleClaim}
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px', fontWeight: 'bold' }}
        >
          <Play size={16} /> BGP Routing Bestätigen (+45 XP)
        </button>
      </div>

      {/* Control Configuration Bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', background: 'var(--bg-secondary)', padding: '18px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', marginBottom: '24px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
            AS-Path Prepending auf Primär-Route: +{prepends} AS-Hops
          </label>
          <input
            type="range"
            min="0"
            max="4"
            value={prepends}
            onChange={(e) => { setPrepends(parseInt(e.target.value, 10)); triggerHaptic('SELECTION'); }}
            style={{ width: '100%' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
            Local Preference (Primär-Route): {localPrefPrimary}
          </label>
          <input
            type="range"
            min="50"
            max="200"
            step="10"
            value={localPrefPrimary}
            onChange={(e) => { setLocalPrefPrimary(parseInt(e.target.value, 10)); triggerHaptic('SELECTION'); }}
            style={{ width: '100%' }}
          />
        </div>
      </div>

      {/* Best Selected Path Banner */}
      {bestPath && (
        <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10b981', borderRadius: '12px', padding: '16px 20px', marginBottom: '24px' }}>
          <span style={{ fontSize: '0.78rem', color: '#10b981', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Aktiver BGP Best-Path (Gewählter Pfad):
          </span>
          <div style={{ fontSize: '1.2rem', fontWeight: 'bold', marginTop: '4px', color: 'var(--text-main)' }}>
            🎯 {bestPath.description}
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px', fontFamily: 'monospace' }}>
            AS-PATH: [{bestPath.asPath.join(' -> ')}] | LocalPref: {bestPath.localPref} | Next-Hop: {bestPath.nextHop}
          </div>
        </div>
      )}

      {/* Available Routes Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        {activeRoutes.map((r) => {
          const isSelected = bestPath && bestPath.id === r.id;
          return (
            <div
              key={r.id}
              style={{
                background: 'var(--bg-secondary)',
                padding: '20px',
                borderRadius: 'var(--radius-lg)',
                border: isSelected ? '2px solid #10b981' : '1px solid var(--border-color)',
                position: 'relative'
              }}
            >
              {isSelected && (
                <span className="badge badge-emerald" style={{ position: 'absolute', top: '16px', right: '16px' }}>
                  BEST PATH
                </span>
              )}

              <div style={{ fontWeight: 'bold', fontSize: '1rem', color: 'var(--text-main)', marginBottom: '8px' }}>
                {r.description}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.82rem', marginTop: '12px' }}>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Ziel-Präfix:</span> <strong>{r.prefix}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>AS-PATH Pfadlänge:</span> <strong>{r.asPath.length} Hops</strong> [{r.asPath.join(' ➔ ')}]
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Local Preference:</span> <strong>{r.localPref}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>MED (Metric):</span> <strong>{r.med}</strong>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
