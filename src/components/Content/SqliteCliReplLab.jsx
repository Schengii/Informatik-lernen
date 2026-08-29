import React, { useState, useRef, useEffect } from 'react';
import {
  Terminal, Database, Play, RotateCcw
} from 'lucide-react';
import { SqliteCliSession } from '../../utils/sqliteCliEngine';
import { useStore } from '../../store/useStore';
import { triggerHaptic } from '../../utils/haptics';

export default function SqliteCliReplLab({ onRewardXP }) {
  const { awardXP } = useStore();
  const sessionRef = useRef(null);
  const [outputLogs, setOutputLogs] = useState([]);
  const [inputVal, setInputVal] = useState('');
  const [solved, setSolved] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    sessionRef.current = new SqliteCliSession();
    setOutputLogs([
      { type: 'SYSTEM', text: 'SQLite Version 3.45.0 In-Browser REPL Initialisiert.' },
      { type: 'SYSTEM', text: "Tippe SQL-Befehle oder '.help' / '.tables' / '.schema' ein.\n" }
    ]);
  }, []);

  useEffect(() => {
    if (typeof bottomRef.current?.scrollIntoView === 'function') {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [outputLogs]);

  const handleSubmit = (e) => {
    e?.preventDefault();
    const query = inputVal.trim();
    if (!query || !sessionRef.current) return;

    triggerHaptic('SELECTION');
    const result = sessionRef.current.executeCommand(query);

    setOutputLogs(prev => [
      ...prev,
      { type: 'PROMPT', text: `sqlite> ${query}` },
      result
    ]);

    setInputVal('');

    if (result.type === 'RESULT' || result.type === 'SUCCESS') {
      triggerHaptic('SUCCESS');
      if (!solved) {
        setSolved(true);
        if (onRewardXP) {
          onRewardXP(45);
        } else {
          awardXP(45, 'sqlite_cli_master');
        }
      }
    } else if (result.type === 'ERROR') {
      triggerHaptic('WARNING');
    }
  };

  const handleReset = () => {
    if (sessionRef.current) {
      sessionRef.current.executeCommand('.clear');
    }
    setOutputLogs([
      { type: 'SYSTEM', text: 'Datenbank zurückgesetzt auf Ausgangszustand.' }
    ]);
    triggerHaptic('SELECTION');
  };

  return (
    <div style={{ background: 'var(--bg-card)', padding: '28px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-color)' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="badge badge-indigo" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Database size={14} /> Relationale Datenbanken
            </span>
            <span className="badge badge-emerald" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Terminal size={14} /> In-Browser SQLite CLI
            </span>
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, color: 'var(--text-main)' }}>
            💻 SQLite CLI Terminal &amp; Virtual Tables REPL
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginTop: '6px', maxWidth: '750px' }}>
            Interaktive SQLite-Konsole im Browser. Führe SQL-Abfragen, DDL-Operationen und Dot-Commands (`.tables`, `.schema`, `.help`) in Echtzeit aus.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="btn btn-secondary"
          style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 16px' }}
        >
          <RotateCcw size={16} /> REPL Reset
        </button>
      </div>

      {/* Preset Command Shortcuts */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
        {[
          '.tables',
          '.schema articles',
          'SELECT id, title, tags FROM articles;',
          "SELECT * FROM articles WHERE tags LIKE '%k8s%';",
          '.help'
        ].map((cmd, i) => (
          <button
            key={i}
            onClick={() => {
              setInputVal(cmd);
              triggerHaptic('SELECTION');
            }}
            className="btn btn-ghost"
            style={{ fontSize: '0.8rem', padding: '6px 12px', fontFamily: 'monospace' }}
          >
            {cmd}
          </button>
        ))}
      </div>

      {/* Terminal Output Area */}
      <div
        style={{
          background: '#090d16',
          border: '1px solid var(--border-color)',
          borderRadius: '12px',
          padding: '18px',
          fontFamily: 'monospace',
          fontSize: '0.88rem',
          minHeight: '360px',
          maxHeight: '480px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          marginBottom: '16px'
        }}
      >
        {outputLogs.map((log, idx) => {
          if (log.type === 'PROMPT') {
            return (
              <div key={idx} style={{ color: '#38bdf8', fontWeight: 'bold' }}>
                {log.text}
              </div>
            );
          }
          if (log.type === 'SYSTEM') {
            return (
              <div key={idx} style={{ color: '#94a3b8', fontStyle: 'italic' }}>
                {log.text}
              </div>
            );
          }
          if (log.type === 'ERROR') {
            return (
              <div key={idx} style={{ color: '#ef4444' }}>
                {log.text}
              </div>
            );
          }
          if (log.type === 'META') {
            return (
              <pre key={idx} style={{ margin: 0, color: '#f59e0b', whiteSpace: 'pre-wrap' }}>
                {log.text}
              </pre>
            );
          }
          if (log.type === 'RESULT') {
            if (log.rows.length === 0) {
              return <div key={idx} style={{ color: '#94a3b8' }}>(0 Ergebniszeilen)</div>;
            }
            return (
              <div key={idx} style={{ overflowX: 'auto', margin: '4px 0' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', color: '#10b981' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #334155', color: '#94a3b8' }}>
                      {log.columns.map(col => (
                        <th key={col} style={{ textAlign: 'left', padding: '6px 10px' }}>{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {log.rows.map((r, rIdx) => (
                      <tr key={rIdx} style={{ borderBottom: '1px solid #1e293b' }}>
                        {log.columns.map(col => (
                          <td key={col} style={{ padding: '6px 10px' }}>{String(r[col])}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div style={{ color: '#64748b', fontSize: '0.75rem', marginTop: '4px' }}>
                  {log.rowCount} Zeilen in {log.durationMs} ms
                </div>
              </div>
            );
          }
          return null;
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input Prompt Form */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, background: 'var(--bg-secondary)', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
          <span style={{ color: '#38bdf8', fontFamily: 'monospace', fontWeight: 'bold' }}>sqlite&gt;</span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="SQL-Query oder .tables eingeben..."
            style={{ flex: 1, background: 'transparent', border: 'none', color: 'var(--text-main)', fontFamily: 'monospace', outline: 'none', fontSize: '0.9rem' }}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '0 20px', fontWeight: 'bold' }}
        >
          <Play size={16} /> Ausführen
        </button>
      </form>
    </div>
  );
}
