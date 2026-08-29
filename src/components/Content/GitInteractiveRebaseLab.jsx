import React, { useState, useMemo } from 'react';
import {
  GitBranch, ArrowUp, ArrowDown, Play,
  AlertCircle, Sparkles, RotateCcw
} from 'lucide-react';
import {
  INITIAL_REBASE_COMMITS,
  REBASE_COMMANDS,
  executeRebase,
  generateRebaseTodoFile
} from '../../utils/gitInteractiveRebaseEngine';
import { useStore } from '../../store/useStore';
import { triggerHaptic } from '../../utils/haptics';

export default function GitInteractiveRebaseLab({ onRewardXP }) {
  const { awardXP } = useStore();
  const [commits, setCommits] = useState(INITIAL_REBASE_COMMITS);
  const [solved, setSolved] = useState(false);

  const rebaseResult = useMemo(() => {
    return executeRebase(commits);
  }, [commits]);

  const handleCommandChange = (commitId, newCommand) => {
    setCommits(prev => prev.map(c => c.id === commitId ? { ...c, command: newCommand } : c));
    triggerHaptic('SELECTION');
  };

  const handleMove = (index, direction) => {
    const newIdx = index + direction;
    if (newIdx < 0 || newIdx >= commits.length) return;
    const next = [...commits];
    const [moved] = next.splice(index, 1);
    next.splice(newIdx, 0, moved);
    setCommits(next);
    triggerHaptic('SELECTION');
  };

  const handleExecuteRebase = () => {
    if (rebaseResult.success) {
      triggerHaptic('SUCCESS');
      if (!solved) {
        setSolved(true);
        if (onRewardXP) {
          onRewardXP(45);
        } else {
          awardXP(45, 'git_rebase_master');
        }
      }
    } else {
      triggerHaptic('WARNING');
    }
  };

  const handleReset = () => {
    setCommits(INITIAL_REBASE_COMMITS);
    triggerHaptic('SELECTION');
  };

  return (
    <div style={{ background: 'var(--bg-card)', padding: '28px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-color)' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="badge badge-indigo" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <GitBranch size={14} /> Version Control &amp; Git
            </span>
            <span className="badge badge-emerald" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={14} /> Interactive Rebase Studio
            </span>
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, color: 'var(--text-main)' }}>
            🌿 Git Interactive Rebase Studio (`git rebase -i`)
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginTop: '6px', maxWidth: '750px' }}>
            Ordne Commits per Drag &amp; Drop um, verschmelze Work-in-Progress Commits (`squash` / `fixup`), bereinige Messages (`reword`) und entferne Debug-Commits (`drop`).
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handleReset}
            className="btn btn-secondary"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 16px' }}
          >
            <RotateCcw size={16} /> Zurücksetzen
          </button>
          <button
            onClick={handleExecuteRebase}
            className="btn btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', fontWeight: 'bold' }}
          >
            <Play size={18} /> Rebase Ausführen (+45 XP)
          </button>
        </div>
      </div>

      {/* Rebase Todo Editor List */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '24px' }}>
        {/* Left: Commit Action Sequence */}
        <div style={{ background: 'var(--bg-secondary)', padding: '18px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-muted)', display: 'block', marginBottom: '12px' }}>
            Git-Rebase-Todo Commit-Reihenfolge:
          </span>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {commits.map((c, idx) => (
              <div
                key={c.id}
                style={{
                  background: 'var(--bg-primary)',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  flexWrap: 'wrap'
                }}
              >
                {/* Reorder Buttons */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <button
                    onClick={() => handleMove(idx, -1)}
                    disabled={idx === 0}
                    style={{ background: 'transparent', border: 'none', cursor: idx === 0 ? 'not-allowed' : 'pointer', padding: '2px', color: 'var(--text-muted)' }}
                  >
                    <ArrowUp size={14} />
                  </button>
                  <button
                    onClick={() => handleMove(idx, 1)}
                    disabled={idx === commits.length - 1}
                    style={{ background: 'transparent', border: 'none', cursor: idx === commits.length - 1 ? 'not-allowed' : 'pointer', padding: '2px', color: 'var(--text-muted)' }}
                  >
                    <ArrowDown size={14} />
                  </button>
                </div>

                {/* Command Dropdown */}
                <select
                  value={c.command}
                  onChange={(e) => handleCommandChange(c.id, e.target.value)}
                  style={{
                    background: 'var(--bg-secondary)',
                    color: c.command === 'drop' ? '#ef4444' : c.command === 'squash' || c.command === 'fixup' ? '#f59e0b' : '#10b981',
                    fontWeight: 'bold',
                    padding: '6px 10px',
                    borderRadius: '6px',
                    border: '1px solid var(--border-color)',
                    fontSize: '0.82rem',
                    fontFamily: 'monospace'
                  }}
                >
                  {REBASE_COMMANDS.map(cmd => (
                    <option key={cmd.id} value={cmd.id}>{cmd.label}</option>
                  ))}
                </select>

                {/* Commit Details */}
                <div style={{ flex: 1, minWidth: '160px' }}>
                  <div style={{ fontSize: '0.84rem', fontWeight: 'bold', color: c.command === 'drop' ? 'var(--text-muted)' : 'var(--text-main)', textDecoration: c.command === 'drop' ? 'line-through' : 'none' }}>
                    <span style={{ fontFamily: 'monospace', color: 'var(--accent-primary)', marginRight: '6px' }}>{c.hash}</span>
                    {c.message}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Git CLI Preview & Result Tree */}
        <div style={{ background: 'var(--bg-secondary)', padding: '18px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
            Resultierender Git Branch-Verlauf:
          </span>

          {rebaseResult.success ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {rebaseResult.commits.map((c, i) => (
                <div
                  key={i}
                  style={{
                    background: 'var(--bg-primary)',
                    padding: '12px',
                    borderRadius: '8px',
                    borderLeft: '4px solid #10b981',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontFamily: 'monospace', fontWeight: 'bold', color: '#10b981' }}>{c.hash}</span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>{c.message.split('\n')[0]}</span>
                    {c.squashedCount > 0 && (
                      <span className="badge badge-amber" style={{ fontSize: '0.72rem' }}>
                        +{c.squashedCount} squashed
                      </span>
                    )}
                  </div>
                  {c.message.includes('\n') && (
                    <pre style={{ margin: '6px 0 0 0', fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                      {c.message}
                    </pre>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--accent-rose)', padding: '14px', borderRadius: '8px', color: 'var(--accent-rose)', fontSize: '0.88rem' }}>
              <AlertCircle size={16} style={{ display: 'inline', marginRight: '6px' }} />
              {rebaseResult.error}
            </div>
          )}

          <div style={{ marginTop: '16px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>CLI git-rebase-todo:</span>
            <pre style={{ margin: 0, padding: '10px', background: 'var(--bg-primary)', borderRadius: '6px', fontSize: '0.78rem', fontFamily: 'monospace', color: '#38bdf8' }}>
              {generateRebaseTodoFile(commits)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
