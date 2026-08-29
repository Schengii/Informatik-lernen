import React, { useState, useMemo } from 'react';
import {
  ShieldAlert, Sparkles, Copy, Check, HardDrive
} from 'lucide-react';
import {
  SAMPLE_DOCKERFILES,
  lintDockerfile,
  generateMultiStageOptimized
} from '../../utils/dockerfileOptimizerEngine';
import { useStore } from '../../store/useStore';
import { triggerHaptic } from '../../utils/haptics';

export default function DockerfileOptimizerLab({ onRewardXP }) {
  const { awardXP } = useStore();
  const [selectedPresetId, setSelectedPresetId] = useState('node_monolith');
  const [customDockerfile, setCustomDockerfile] = useState(SAMPLE_DOCKERFILES[0].raw);
  const [selectedLang, setSelectedLang] = useState('nodejs');
  const [copied, setCopied] = useState(false);
  const [solved, setSolved] = useState(false);

  const lintResult = useMemo(() => {
    return lintDockerfile(customDockerfile);
  }, [customDockerfile]);

  const optimizedResult = useMemo(() => {
    return generateMultiStageOptimized(selectedLang);
  }, [selectedLang]);

  const handleSelectPreset = (p) => {
    setSelectedPresetId(p.id);
    setCustomDockerfile(p.raw);
    setSelectedLang(p.language);
    triggerHaptic('SELECTION');
  };

  const handleCopyOptimized = () => {
    navigator.clipboard.writeText(optimizedResult.optimizedDockerfile);
    setCopied(true);
    triggerHaptic('SUCCESS');
    setTimeout(() => setCopied(false), 2000);

    if (!solved) {
      setSolved(true);
      if (onRewardXP) {
        onRewardXP(45);
      } else {
        awardXP(45, 'docker_multistage_master');
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
              <HardDrive size={14} /> Container &amp; DevOps
            </span>
            <span className="badge badge-emerald" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={14} /> Multi-Stage Optimizer &amp; Linter
            </span>
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, color: 'var(--text-main)' }}>
            🐳 Dockerfile Multi-Stage Optimizer &amp; Security Linter
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginTop: '6px', maxWidth: '750px' }}>
            Analysiere Dockerfile-Layers, Caching-Antipatterns und Root-Rechte. Wandle Monolithen (1.3 GB) per Knopfdruck in schlanke, gehärtete Multi-Stage Builds um (z. B. 45 MB Distroless).
          </p>
        </div>
      </div>

      {/* Preset Selector */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
        {SAMPLE_DOCKERFILES.map(p => (
          <button
            key={p.id}
            onClick={() => handleSelectPreset(p)}
            className={`btn ${selectedPresetId === p.id ? 'btn-primary' : 'btn-ghost'}`}
            style={{ fontSize: '0.84rem', padding: '8px 14px' }}
          >
            {p.title}
          </button>
        ))}
      </div>

      {/* Metrics & Score Summary Bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '24px' }}>
        <div style={{ background: 'var(--bg-primary)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block' }}>Sicherheits- &amp; Cache-Score</span>
          <div style={{ fontSize: '1.5rem', fontWeight: '800', marginTop: '4px', color: lintResult.score >= 80 ? '#10b981' : lintResult.score >= 50 ? '#f59e0b' : '#ef4444' }}>
            {lintResult.score} / 100
          </div>
        </div>

        <div style={{ background: 'var(--bg-primary)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block' }}>Größen-Reduktion</span>
          <div style={{ fontSize: '1.5rem', fontWeight: '800', marginTop: '4px', color: '#10b981' }}>
            -{optimizedResult.savingsPercent}%
          </div>
        </div>

        <div style={{ background: 'var(--bg-primary)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block' }}>Vorher $\rightarrow$ Nachher</span>
          <div style={{ fontSize: '1.2rem', fontWeight: '800', marginTop: '4px', color: 'var(--text-main)' }}>
            {optimizedResult.originalSizeMb} MB $\rightarrow$ {optimizedResult.optimizedSizeMb} MB
          </div>
        </div>

        <div style={{ background: 'var(--bg-primary)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block' }}>Multi-Stage Status</span>
          <div style={{ fontSize: '1.2rem', fontWeight: '800', marginTop: '4px', color: lintResult.isMultiStage ? '#10b981' : '#f59e0b' }}>
            {lintResult.isMultiStage ? '✅ Multi-Stage' : '⚠️ Single-Stage'}
          </div>
        </div>
      </div>

      {/* Editor & Multi-Stage Optimized Output */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '24px' }}>
        {/* Left: Input Dockerfile */}
        <div style={{ background: 'var(--bg-secondary)', padding: '18px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-muted)' }}>Aktuelles Dockerfile (Editierbar)</span>
            <span className="badge badge-rose" style={{ fontSize: '0.75rem' }}>{lintResult.issues.length} Befunde</span>
          </div>
          <textarea
            value={customDockerfile}
            onChange={(e) => setCustomDockerfile(e.target.value)}
            rows={14}
            style={{
              width: '100%',
              padding: '12px',
              fontFamily: 'monospace',
              fontSize: '0.85rem',
              background: 'var(--bg-primary)',
              color: '#38bdf8',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              resize: 'vertical'
            }}
          />
        </div>

        {/* Right: Multi-Stage Optimized Output */}
        <div style={{ background: 'var(--bg-secondary)', padding: '18px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--accent-primary)' }}>✨ Gehärtetes Multi-Stage Dockerfile</span>
            <button
              onClick={handleCopyOptimized}
              className="btn btn-primary"
              style={{ padding: '6px 12px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 'Kopiert!' : 'Kopieren (+45 XP)'}
            </button>
          </div>
          <pre
            style={{
              margin: 0,
              padding: '12px',
              fontFamily: 'monospace',
              fontSize: '0.82rem',
              background: 'var(--bg-primary)',
              color: '#10b981',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              maxHeight: '265px',
              overflowY: 'auto'
            }}
          >
            {optimizedResult.optimizedDockerfile}
          </pre>
        </div>
      </div>

      {/* Linting Findings */}
      <div style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 'bold', margin: '0 0 14px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ShieldAlert size={18} color="var(--accent-rose)" /> Sicherheits- &amp; Performance-Audit
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {lintResult.issues.map((iss, i) => (
            <div
              key={i}
              style={{
                background: 'var(--bg-primary)',
                padding: '12px 16px',
                borderRadius: '8px',
                borderLeft: `4px solid ${iss.severity === 'CRITICAL' ? '#ef4444' : iss.severity === 'WARNING' ? '#f59e0b' : '#3b82f6'}`,
                border: '1px solid var(--border-color)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '8px'
              }}
            >
              <div>
                <span className={`badge ${iss.severity === 'CRITICAL' ? 'badge-rose' : iss.severity === 'WARNING' ? 'badge-amber' : 'badge-indigo'}`} style={{ fontSize: '0.72rem', marginRight: '8px' }}>
                  {iss.severity}
                </span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>{iss.message}</span>
              </div>
              {iss.line > 0 && (
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                  Zeile {iss.line}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
