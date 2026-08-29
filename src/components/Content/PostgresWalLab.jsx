import React, { useState, useRef, useEffect } from 'react';
import {
  Database, RefreshCw, Plus, HardDrive
} from 'lucide-react';
import { PostgresWalSimulator } from '../../utils/postgresWalEngine';
import { useStore } from '../../store/useStore';
import { triggerHaptic } from '../../utils/haptics';

export default function PostgresWalLab({ onRewardXP }) {
  const { awardXP } = useStore();
  const [repMode, setRepMode] = useState('async'); // 'async' | 'sync'
  const [queryInput, setQueryInput] = useState('INSERT INTO orders VALUES (101, 79.99)');
  const [checkpointMsg, setCheckpointMsg] = useState(null);
  const [solved, setSolved] = useState(false);

  const walRef = useRef(null);
  const [, setTick] = useState(0);

  useEffect(() => {
    walRef.current = new PostgresWalSimulator('async');
    walRef.current.commitTransaction('INSERT INTO users VALUES (1, "Alice")');
    walRef.current.commitTransaction('INSERT INTO users VALUES (2, "Bob")');
    setTick(t => t + 1);
  }, []);

  const handleModeChange = (mode) => {
    setRepMode(mode);
    if (walRef.current) walRef.current.replicationMode = mode;
    triggerHaptic('SELECTION');
    setTick(t => t + 1);
  };

  const handleCommit = () => {
    if (!walRef.current) return;
    walRef.current.commitTransaction(queryInput);
    triggerHaptic('SUCCESS');
    setCheckpointMsg(null);
    setTick(t => t + 1);
    checkXP();
  };

  const handleCheckpoint = () => {
    if (!walRef.current) return;
    const res = walRef.current.triggerCheckpoint();
    setCheckpointMsg(res.message);
    triggerHaptic('LEVEL_UP');
    setTick(t => t + 1);
    checkXP();
  };

  const checkXP = () => {
    if (!solved) {
      setSolved(true);
      if (onRewardXP) {
        onRewardXP(45);
      } else {
        awardXP(45, 'postgres_wal_master');
      }
    }
  };

  const primaryLsn = walRef.current ? walRef.current.flushedLsn : '0/0';
  const standbyLsn = walRef.current ? walRef.current.standbyLsn : '0/0';
  const redoLsn = walRef.current ? walRef.current.redoPointLsn : '0/0';
  const records = walRef.current ? walRef.current.walRecords : [];

  return (
    <div style={{ background: 'var(--bg-card)', padding: '28px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-color)' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="badge badge-indigo" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Database size={14} /> Database Storage Internals
            </span>
            <span className="badge badge-emerald" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <HardDrive size={14} /> Write-Ahead Logging &amp; Streaming Replication
            </span>
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, color: 'var(--text-main)' }}>
            💾 PostgreSQL WAL &amp; LSN Streaming Replication Studio
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginTop: '6px', maxWidth: '750px' }}>
            Untersuche Write-Ahead Logging (WAL), Log Sequence Numbers (LSN), synchrone vs. asynchrone Replikations-Lags und Checkpoint REDO-Punkte.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handleCheckpoint}
            className="btn btn-secondary"
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <RefreshCw size={16} /> CHECKPOINT Ausführen (+45 XP)
          </button>
        </div>
      </div>

      {/* Replication Mode Switcher & LSN Status */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '24px' }}>
        <div style={{ background: 'var(--bg-primary)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Replikations-Modus:</span>
          <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
            <button
              onClick={() => handleModeChange('async')}
              className={`btn ${repMode === 'async' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '4px 10px', fontSize: '0.78rem' }}
            >
              Asynchron (High Perf)
            </button>
            <button
              onClick={() => handleModeChange('sync')}
              className={`btn ${repMode === 'sync' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '4px 10px', fontSize: '0.78rem' }}
            >
              Synchron (Zero Data Loss)
            </button>
          </div>
        </div>

        <div style={{ background: 'var(--bg-primary)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Primary Flush LSN:</span>
          <div style={{ fontSize: '1.2rem', fontFamily: 'monospace', fontWeight: 'bold', color: '#10b981', marginTop: '4px' }}>
            {primaryLsn}
          </div>
        </div>

        <div style={{ background: 'var(--bg-primary)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Standby Replica LSN:</span>
          <div style={{ fontSize: '1.2rem', fontFamily: 'monospace', fontWeight: 'bold', color: primaryLsn === standbyLsn ? '#10b981' : '#f59e0b', marginTop: '4px' }}>
            {standbyLsn} {primaryLsn !== standbyLsn && '(Lag)'}
          </div>
        </div>

        <div style={{ background: 'var(--bg-primary)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Checkpoint REDO LSN:</span>
          <div style={{ fontSize: '1.2rem', fontFamily: 'monospace', fontWeight: 'bold', color: 'var(--accent-primary)', marginTop: '4px' }}>
            {redoLsn}
          </div>
        </div>
      </div>

      {/* Checkpoint Message */}
      {checkpointMsg && (
        <div style={{ background: 'rgba(16, 185, 129, 0.12)', border: '1px solid #10b981', borderRadius: '10px', padding: '12px 16px', marginBottom: '20px', fontSize: '0.85rem', color: 'var(--text-main)' }}>
          ✅ {checkpointMsg}
        </div>
      )}

      {/* Transaction Input Bar */}
      <div style={{ background: 'var(--bg-secondary)', padding: '18px', borderRadius: '12px', border: '1px solid var(--border-color)', display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '24px' }}>
        <input
          type="text"
          value={queryInput}
          onChange={(e) => setQueryInput(e.target.value)}
          placeholder="SQL Query..."
          style={{ flex: 1, minWidth: '240px', padding: '8px 12px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-main)', fontFamily: 'monospace', fontSize: '0.85rem' }}
        />
        <button
          onClick={handleCommit}
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', fontWeight: 'bold' }}
        >
          <Plus size={16} /> COMMIT Transaction (Write to WAL)
        </button>
      </div>

      {/* WAL Records Stream Table */}
      <div style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', overflowX: 'auto' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-muted)', display: 'block', marginBottom: '12px' }}>
          Append-Only WAL Record Log (`pg_wal`):
        </span>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.84rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', textAlign: 'left' }}>
              <th style={{ padding: '8px' }}>Log Sequence Number (LSN)</th>
              <th style={{ padding: '8px' }}>Operation / Query</th>
              <th style={{ padding: '8px' }}>Record Size</th>
              <th style={{ padding: '8px' }}>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '8px', fontFamily: 'monospace', color: '#10b981', fontWeight: 'bold' }}>{r.lsn}</td>
                <td style={{ padding: '8px', fontFamily: 'monospace' }}><code>{r.query}</code></td>
                <td style={{ padding: '8px', color: 'var(--text-muted)' }}>{r.bytes} Bytes</td>
                <td style={{ padding: '8px', color: 'var(--text-muted)', fontSize: '0.78rem' }}>{r.timestamp.split('T')[1].slice(0, 8)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
