import React, { useState, useMemo } from 'react';
import {
  Flame, Database, Play
} from 'lucide-react';
import {
  SAMPLE_POSTGRES_PLANS,
  analyzePlanMetrics
} from '../../utils/postgresFlamegraphEngine';
import { useStore } from '../../store/useStore';
import { triggerHaptic } from '../../utils/haptics';

export default function PostgresFlamegraphLab({ onRewardXP }) {
  const { awardXP } = useStore();
  const [selectedPlanIdx, setSelectedPlanIdx] = useState(0);
  const plan = SAMPLE_POSTGRES_PLANS[selectedPlanIdx];

  const metrics = useMemo(() => {
    return analyzePlanMetrics(plan.rootNode);
  }, [plan]);

  const [solved, setSolved] = useState(false);

  const handleSelectPlan = (idx) => {
    setSelectedPlanIdx(idx);
    triggerHaptic('SELECTION');
  };

  const handleAnalyze = () => {
    triggerHaptic('SUCCESS');
    if (!solved) {
      setSolved(true);
      if (onRewardXP) {
        onRewardXP(45);
      } else {
        awardXP(45, 'postgres_flamegraph_master');
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
              <Database size={14} /> PostgreSQL Internals
            </span>
            <span className="badge badge-rose" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Flame size={14} /> EXPLAIN ANALYZE FlameGraph
            </span>
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, color: 'var(--text-main)' }}>
            🔥 PostgreSQL EXPLAIN &amp; Window Functions FlameGraph Studio
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginTop: '6px', maxWidth: '750px' }}>
            Visualisiere die genaue Zeitverteilung (Execution FlameGraph), Window Functions (`PARTITION BY`) und Shared Buffer Hit Ratios komplexer PostgreSQL Abfragen.
          </p>
        </div>

        <button
          onClick={handleAnalyze}
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', fontWeight: 'bold' }}
        >
          <Play size={18} /> FlameGraph Analysieren (+45 XP)
        </button>
      </div>

      {/* Preset Plan Selector */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
        {SAMPLE_POSTGRES_PLANS.map((p, idx) => (
          <button
            key={p.id}
            onClick={() => handleSelectPlan(idx)}
            className={`btn ${selectedPlanIdx === idx ? 'btn-primary' : 'btn-ghost'}`}
            style={{ fontSize: '0.84rem', padding: '8px 14px' }}
          >
            {p.title}
          </button>
        ))}
      </div>

      {/* Metrics Bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '24px' }}>
        <div style={{ background: 'var(--bg-primary)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block' }}>Gesamtlaufzeit</span>
          <div style={{ fontSize: '1.4rem', fontWeight: '800', marginTop: '4px', color: 'var(--accent-primary)' }}>
            {metrics.totalTimeMs} ms
          </div>
        </div>

        <div style={{ background: 'var(--bg-primary)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block' }}>Shared Buffer Cache Hit Ratio</span>
          <div style={{ fontSize: '1.4rem', fontWeight: '800', marginTop: '4px', color: '#10b981' }}>
            {metrics.cacheHitRatio}%
          </div>
        </div>

        <div style={{ background: 'var(--bg-primary)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block' }}>Shared Hit Blocks</span>
          <div style={{ fontSize: '1.4rem', fontWeight: '800', marginTop: '4px', color: '#06b6d4' }}>
            {metrics.totalHitBlocks.toLocaleString()} Blöcke
          </div>
        </div>

        <div style={{ background: 'var(--bg-primary)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block' }}>Disk Read Blocks</span>
          <div style={{ fontSize: '1.4rem', fontWeight: '800', marginTop: '4px', color: metrics.totalReadBlocks > 0 ? '#f59e0b' : '#10b981' }}>
            {metrics.totalReadBlocks.toLocaleString()} Blöcke
          </div>
        </div>
      </div>

      {/* SQL View */}
      <div style={{ background: 'var(--bg-secondary)', padding: '18px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', marginBottom: '24px' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
          SQL Abfrage &amp; Window Function:
        </span>
        <pre style={{ margin: 0, padding: '12px', background: 'var(--bg-primary)', color: '#38bdf8', borderRadius: '8px', fontSize: '0.86rem', fontFamily: 'monospace' }}>
          {plan.sql}
        </pre>
      </div>

      {/* FlameGraph Visualizer */}
      <div style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Flame size={18} color="#e11d48" /> Hierarchischer FlameGraph &amp; Zeitbalken
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {metrics.flatNodes.map((node, i) => {
            const widthPct = Math.max(15, Math.min(100, (node.timeMs / metrics.totalTimeMs) * 100));
            const marginLeft = node.depth * 28;

            return (
              <div key={i} style={{ marginLeft: `${marginLeft}px` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 'bold', color: 'var(--text-main)' }}>{node.nodeType}</span>
                  <span style={{ color: 'var(--text-muted)' }}>{node.timeMs} ms ({Math.round(widthPct)}%) | {node.rows.toLocaleString()} Zeilen</span>
                </div>
                <div style={{ height: '24px', background: 'var(--bg-primary)', borderRadius: '6px', overflow: 'hidden', position: 'relative' }}>
                  <div
                    style={{
                      height: '100%',
                      width: `${widthPct}%`,
                      background: node.depth === 0 ? '#e11d48' : node.depth === 1 ? '#f59e0b' : node.depth === 2 ? '#3b82f6' : '#10b981',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      paddingLeft: '8px',
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                      color: '#ffffff'
                    }}
                  >
                    {node.timeMs} ms
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
