import React, { useState, useEffect, useRef } from 'react';
import {
  Terminal, Folder, FileCode, CheckCircle, ShieldAlert,
  RotateCcw, HelpCircle
} from 'lucide-react';
import {
  createInitialVFS,
  createInitialServices,
  executeVfsPipeline,
  LINUX_CHALLENGES
} from '../../utils/linuxVfsEngine';
import { useStore } from '../../store/useStore';
import { triggerHaptic } from '../../utils/haptics';

export default function LinuxVfsTerminalLab({ onRewardXP }) {
  const { awardXP } = useStore();
  const [vfs, setVfs] = useState(createInitialVFS);
  const [services, setServices] = useState(createInitialServices);
  const [cwd, setCwd] = useState('/home/dev');
  const [history, setHistory] = useState([]);
  const [terminalLogs, setTerminalLogs] = useState([
    { type: 'system', text: 'Ubuntu 24.04 LTS (GNU/Linux 6.8.0-45-generic x86_64)' },
    { type: 'system', text: 'Willkommen in der interaktiven Linux POSIX VFS Sandbox.' },
    { type: 'system', text: 'Tippe "help", "ls -la" oder löse die SysAdmin-Challenges rechts.' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [completedChallenges, setCompletedChallenges] = useState([]);
  const [activeChallengeIdx, setActiveChallengeIdx] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const terminalEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView?.({ behavior: 'smooth' });
  }, [terminalLogs]);

  // Check Challenge Progress on VFS / Services change
  useEffect(() => {
    LINUX_CHALLENGES.forEach((challenge) => {
      if (!completedChallenges.includes(challenge.id)) {
        if (challenge.checkPassed(vfs, services)) {
          setCompletedChallenges((prev) => [...prev, challenge.id]);
          triggerHaptic('LEVEL_UP');
          if (onRewardXP) onRewardXP(challenge.rewardXP, challenge.id);
          else awardXP(challenge.rewardXP, challenge.id);
          setTerminalLogs((prev) => [
            ...prev,
            { type: 'success', text: `🎉 Challenge gemeistert: "${challenge.title}" (+${challenge.rewardXP} XP)` }
          ]);
        }
      }
    });
  }, [vfs, services, completedChallenges, onRewardXP, awardXP]);

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const cmd = inputVal.trim();
    setInputVal('');
    setHistoryIndex(-1);

    if (cmd === 'help') {
      setTerminalLogs((prev) => [
        ...prev,
        { type: 'input', text: `${cwd}$ ${cmd}` },
        { type: 'output', text: 'Verfügbare Befehle: ls [-la], cd <dir>, pwd, cat <file>, grep [-i] <pattern>, wc [-l], head, tail, touch, mkdir, rm, chmod <mode>, find <path> -name <p>, systemctl [status|restart|stop] <svc>, ps, df, free, history, clear, echo, whoami, hostname\nUnterstützt Pipes (cmd1 | cmd2) und Redirection (> file, >> file).' }
      ]);
      return;
    }

    const state = {
      vfs,
      services,
      cwd,
      currentUser: 'dev',
      env: { USER: 'dev', HOME: '/home/dev', SHELL: '/bin/bash' },
      history
    };

    const res = executeVfsPipeline(cmd, state);

    if (res.output === '__CLEAR__') {
      setTerminalLogs([]);
      setHistory(res.state.history);
      return;
    }

    setVfs(res.state.vfs);
    setServices(res.state.services);
    setCwd(res.state.cwd);
    setHistory(res.state.history);

    setTerminalLogs((prev) => [
      ...prev,
      { type: 'input', text: `${cwd}$ ${cmd}` },
      ...(res.output ? [{ type: 'output', text: res.output }] : [])
    ]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIdx = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIdx);
      setInputVal(history[nextIdx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIdx = historyIndex + 1;
      if (nextIdx >= history.length) {
        setHistoryIndex(-1);
        setInputVal('');
      } else {
        setHistoryIndex(nextIdx);
        setInputVal(history[nextIdx]);
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Simple autocomplete
      const parts = inputVal.split(' ');
      const lastToken = parts[parts.length - 1];
      if (!lastToken) return;

      const prefix = cwd === '/' ? '/' : `${cwd}/`;
      const candidates = Object.keys(vfs)
        .filter((k) => k.startsWith(prefix))
        .map((k) => k.slice(prefix.length).split('/')[0])
        .filter((name, i, arr) => arr.indexOf(name) === i);

      const match = candidates.find((c) => c.startsWith(lastToken));
      if (match) {
        parts[parts.length - 1] = match;
        setInputVal(parts.join(' '));
      }
    }
  };

  const resetVfs = () => {
    setVfs(createInitialVFS());
    setServices(createInitialServices());
    setCwd('/home/dev');
    setTerminalLogs([
      { type: 'system', text: 'VFS & System-Services erfolgreich auf Ausgangszustand zurückgesetzt.' }
    ]);
    triggerHaptic('LIGHT');
  };

  const activeChallenge = LINUX_CHALLENGES[activeChallengeIdx];

  // Prepare Explorer Tree entries
  const currentDirEntries = Object.keys(vfs)
    .filter((k) => {
      const prefix = cwd === '/' ? '/' : `${cwd}/`;
      return k.startsWith(prefix) && !k.slice(prefix.length).includes('/');
    })
    .map((k) => ({
      path: k,
      name: k.slice((cwd === '/' ? '/' : `${cwd}/`).length),
      ...vfs[k]
    }));

  return (
    <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ padding: '6px 12px', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 'bold' }}>
              IHK LF 7 / SysAdmin Power-Tool
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Echter In-Memory POSIX Parser mit Pipes & VFS
            </span>
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '800', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Terminal size={30} color="#10b981" />
            Linux POSIX Terminal & VFS Sandbox
          </h1>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={resetVfs}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              background: 'var(--bg-secondary)', border: '1px solid var(--border-color)',
              color: 'var(--text-main)', padding: '8px 14px', borderRadius: '8px', cursor: 'pointer'
            }}
          >
            <RotateCcw size={16} /> Sandbox Reset
          </button>
        </div>
      </div>

      {/* Main Grid: Terminal + Side Panels */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.8fr) minmax(320px, 1fr)', gap: '20px' }}>
        {/* Left Column: Interactive Terminal */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div
            style={{
              background: '#0d1117',
              borderRadius: '12px',
              border: '1px solid #30363d',
              overflow: 'hidden',
              boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
              display: 'flex',
              flexDirection: 'column',
              minHeight: '480px'
            }}
            onClick={() => inputRef.current?.focus()}
          >
            {/* Terminal Window Bar */}
            <div style={{ background: '#161b22', padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #30363d' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }} />
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }} />
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }} />
                <span style={{ marginLeft: '12px', color: '#8b949e', fontSize: '0.85rem', fontFamily: 'monospace' }}>
                  dev@prod-srv-01: {cwd} (bash)
                </span>
              </div>
              <span style={{ fontSize: '0.75rem', color: '#58a6ff', background: 'rgba(56, 139, 253, 0.1)', padding: '2px 8px', borderRadius: '4px', fontFamily: 'monospace' }}>
                Tab = Autocomplete | ↑/↓ = History
              </span>
            </div>

            {/* Terminal Output Area */}
            <div style={{ padding: '16px', flex: 1, overflowY: 'auto', maxHeight: '420px', fontFamily: 'monospace', fontSize: '0.9rem', color: '#c9d1d9', lineHeight: '1.5' }}>
              {terminalLogs.map((log, index) => (
                <div key={index} style={{ marginBottom: '6px', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                  {log.type === 'system' && (
                    <span style={{ color: '#8b949e' }}># {log.text}</span>
                  )}
                  {log.type === 'input' && (
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <span style={{ color: '#3fb950', fontWeight: 'bold' }}>dev@srv:{log.text.split('$')[0]}$</span>
                      <span style={{ color: '#f0f6fc' }}>{log.text.slice(log.text.indexOf('$') + 1)}</span>
                    </div>
                  )}
                  {log.type === 'output' && (
                    <div style={{ color: '#e6edf3' }}>{log.text}</div>
                  )}
                  {log.type === 'success' && (
                    <div style={{ color: '#3fb950', background: 'rgba(46, 160, 67, 0.15)', padding: '4px 8px', borderRadius: '4px', marginTop: '4px' }}>
                      {log.text}
                    </div>
                  )}
                </div>
              ))}

              {/* Live Command Prompt */}
              <form onSubmit={handleCommandSubmit} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
                <span style={{ color: '#3fb950', fontWeight: 'bold', whiteSpace: 'nowrap' }}>
                  dev@srv:{cwd}$
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={handleKeyDown}
                  autoFocus
                  style={{
                    flex: 1,
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: '#58a6ff',
                    fontFamily: 'monospace',
                    fontSize: '0.95rem'
                  }}
                  placeholder="Befehl eingeben..."
                />
              </form>
              <div ref={terminalEndRef} />
            </div>
          </div>

          {/* Quick Preset Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              Quick Commands:
            </span>
            {[
              'ls -la',
              'cat /var/log/syslog | grep error',
              'systemctl status api.service',
              'systemctl restart api.service',
              'chmod 600 /home/dev/.ssh/id_rsa',
              'find /var/log -name *.dump',
              'df -h',
              'free -m'
            ].map((qCmd) => (
              <button
                key={qCmd}
                onClick={() => setInputVal(qCmd)}
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--accent-primary, #6366f1)',
                  fontSize: '0.8rem',
                  fontFamily: 'monospace',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                {qCmd}
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Challenges & VFS Explorer */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Challenge Card */}
          <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldAlert size={20} color="#f59e0b" />
                SysAdmin Challenges ({completedChallenges.length}/{LINUX_CHALLENGES.length})
              </h3>
              <span style={{ fontSize: '0.85rem', background: 'rgba(99,102,241,0.15)', color: '#6366f1', padding: '3px 8px', borderRadius: '12px', fontWeight: 'bold' }}>
                +{LINUX_CHALLENGES.reduce((sum, c) => sum + c.rewardXP, 0)} Gesamt-XP
              </span>
            </div>

            {/* Challenge Selector Tabs */}
            <div style={{ display: 'flex', gap: '6px', marginBottom: '14px' }}>
              {LINUX_CHALLENGES.map((ch, idx) => {
                const isDone = completedChallenges.includes(ch.id);
                const isActive = activeChallengeIdx === idx;
                return (
                  <button
                    key={ch.id}
                    onClick={() => { setActiveChallengeIdx(idx); setShowHint(false); }}
                    style={{
                      flex: 1,
                      padding: '8px 4px',
                      fontSize: '0.78rem',
                      fontWeight: 'bold',
                      borderRadius: '6px',
                      border: 'none',
                      cursor: 'pointer',
                      background: isActive ? 'var(--accent-primary, #6366f1)' : isDone ? 'rgba(16, 185, 129, 0.2)' : 'var(--bg-primary)',
                      color: isActive ? '#fff' : isDone ? '#10b981' : 'var(--text-muted)'
                    }}
                  >
                    #{idx + 1} {isDone && '✓'}
                  </button>
                );
              })}
            </div>

            {/* Active Challenge Detail */}
            <div style={{ background: 'var(--bg-primary)', padding: '14px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 'bold', fontSize: '0.95rem', color: 'var(--text-main)' }}>
                  {activeChallenge.title}
                </span>
                <span style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 'bold' }}>
                  +{activeChallenge.rewardXP} XP
                </span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '8px', lineHeight: '1.4' }}>
                {activeChallenge.scenario}
              </p>

              {/* Status Indicator */}
              <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                {completedChallenges.includes(activeChallenge.id) ? (
                  <span style={{ color: '#10b981', fontSize: '0.85rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CheckCircle size={16} /> Gelöst & XP gutgeschrieben
                  </span>
                ) : (
                  <span style={{ color: '#f59e0b', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    ⏳ Ausstehend (im Terminal lösen)
                  </span>
                )}

                <button
                  onClick={() => setShowHint(!showHint)}
                  style={{
                    background: 'transparent',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-muted)',
                    fontSize: '0.78rem',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <HelpCircle size={14} /> {showHint ? 'Tipp verbergen' : 'Tipp anzeigen'}
                </button>
              </div>

              {showHint && (
                <div style={{ marginTop: '10px', padding: '10px', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '6px', fontSize: '0.8rem', color: 'var(--text-main)' }}>
                  <strong>Hinweise:</strong>
                  <ul style={{ margin: '4px 0 0 16px', padding: 0 }}>
                    {activeChallenge.hints.map((h, i) => (
                      <li key={i} style={{ fontFamily: 'monospace', marginTop: '2px' }}>{h}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* VFS File Explorer Directory Visualizer */}
          <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Folder size={18} color="#3b82f6" />
                VFS Verzeichnisinhalt ({cwd})
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '200px', overflowY: 'auto' }}>
              {currentDirEntries.length === 0 ? (
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>Verzeichnis ist leer</span>
              ) : (
                currentDirEntries.map((item) => (
                  <div
                    key={item.path}
                    onClick={() => {
                      if (item.type === 'dir') {
                        setInputVal(`cd ${item.name}`);
                      } else {
                        setInputVal(`cat ${item.name}`);
                      }
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '6px 10px',
                      background: 'var(--bg-primary)',
                      borderRadius: '6px',
                      border: '1px solid var(--border-color)',
                      cursor: 'pointer',
                      fontSize: '0.82rem',
                      fontFamily: 'monospace'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {item.type === 'dir' ? <Folder size={16} color="#3b82f6" /> : <FileCode size={16} color="#10b981" />}
                      <span style={{ color: item.type === 'dir' ? '#58a6ff' : 'var(--text-main)', fontWeight: item.type === 'dir' ? 'bold' : 'normal' }}>
                        {item.name}
                      </span>
                    </div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      {item.mode} ({item.size} B)
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
