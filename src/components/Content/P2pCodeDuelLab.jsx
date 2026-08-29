import React, { useState, useEffect, useRef } from 'react';
import {
  Swords, Play, CheckCircle2, XCircle, Users,
  RotateCcw, Terminal
} from 'lucide-react';
import {
  CODE_DUEL_CHALLENGES,
  runChallengeTests,
  simulateBotProgress
} from '../../utils/p2pCodeDuelEngine';
import { useStore } from '../../store/useStore';
import { triggerHaptic } from '../../utils/haptics';

export default function P2pCodeDuelLab({ onRewardXP }) {
  const { awardXP } = useStore();
  const [selectedChallengeIdx, setSelectedChallengeIdx] = useState(0);
  const challenge = CODE_DUEL_CHALLENGES[selectedChallengeIdx];

  const [userCode, setUserCode] = useState(challenge.starterCode);
  const [testResults, setTestResults] = useState(null);
  const [duelState, setDuelState] = useState('READY'); // 'READY' | 'RUNNING' | 'FINISHED'
  const [winner, setWinner] = useState(null); // 'USER' | 'BOT' | null
  const [botState, setBotState] = useState({ progress: 0, status: 'READY', testsPassed: 0 });

  const botIntervalRef = useRef(null);

  useEffect(() => {
    setUserCode(challenge.starterCode);
    setTestResults(null);
    setDuelState('READY');
    setWinner(null);
    setBotState({ progress: 0, status: 'READY', testsPassed: 0 });
    if (botIntervalRef.current) clearInterval(botIntervalRef.current);
  }, [challenge]);

  const handleStartDuel = () => {
    setDuelState('RUNNING');
    setWinner(null);
    setTestResults(null);
    setBotState({ progress: 0, status: 'CODING', testsPassed: 0 });
    triggerHaptic('SELECTION');

    if (botIntervalRef.current) clearInterval(botIntervalRef.current);
    botIntervalRef.current = setInterval(() => {
      setBotState((prev) => {
        const next = simulateBotProgress(prev, challenge);
        if (next.status === 'FINISHED' && duelState === 'RUNNING') {
          clearInterval(botIntervalRef.current);
          setWinner('BOT');
          setDuelState('FINISHED');
          triggerHaptic('WARNING');
        }
        return next;
      });
    }, 1200);
  };

  const handleRunTests = () => {
    const results = runChallengeTests(userCode, challenge);
    setTestResults(results);

    if (results.passed) {
      triggerHaptic('LEVEL_UP');
      if (botIntervalRef.current) clearInterval(botIntervalRef.current);
      setWinner('USER');
      setDuelState('FINISHED');
      if (onRewardXP) {
        onRewardXP(60);
      } else {
        awardXP(60, 'code_duel_winner');
      }
    } else {
      triggerHaptic('WARNING');
    }
  };

  const handleReset = () => {
    if (botIntervalRef.current) clearInterval(botIntervalRef.current);
    setDuelState('READY');
    setWinner(null);
    setUserCode(challenge.starterCode);
    setTestResults(null);
    setBotState({ progress: 0, status: 'READY', testsPassed: 0 });
  };

  return (
    <div style={{ background: 'var(--bg-card)', padding: '28px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-color)' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="badge badge-rose" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Swords size={14} /> Realtime Multiplayer Arena
            </span>
            <span className="badge badge-indigo" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Users size={14} /> P2P Coding Race
            </span>
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, color: 'var(--text-main)' }}>
            ⚔️ Live Coding-Duell &amp; Speedrun Arena
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginTop: '6px', maxWidth: '750px' }}>
            Tritt in Echtzeit-Programmierduellen gegen Azubis oder den intelligenten KI-Bot an. Wer besteht alle Testfälle als Erster?
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          {duelState === 'READY' ? (
            <button
              onClick={handleStartDuel}
              className="btn btn-primary"
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', fontWeight: 'bold' }}
            >
              <Play size={18} /> Duell Starten
            </button>
          ) : (
            <button
              onClick={handleReset}
              className="btn btn-secondary"
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px' }}
            >
              <RotateCcw size={16} /> Neustart
            </button>
          )}
        </div>
      </div>

      {/* Challenge Selector Tabs */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
        {CODE_DUEL_CHALLENGES.map((ch, idx) => (
          <button
            key={ch.id}
            onClick={() => setSelectedChallengeIdx(idx)}
            className={`btn ${selectedChallengeIdx === idx ? 'btn-primary' : 'btn-ghost'}`}
            style={{ fontSize: '0.84rem', padding: '8px 14px' }}
          >
            {ch.title} ({ch.difficulty})
          </button>
        ))}
      </div>

      {/* Duel Live Race Progress Bars */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
        {/* Player 1 (You) */}
        <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>🧑 Du (Kandidat)</span>
            <span style={{ fontSize: '0.8rem', color: testResults?.passed ? '#10b981' : 'var(--text-muted)' }}>
              {testResults ? `${testResults.passedCount}/${testResults.total} Tests bestanden` : 'Bereit'}
            </span>
          </div>
          <div style={{ height: '10px', background: 'var(--bg-primary)', borderRadius: '6px', overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                background: '#10b981',
                width: testResults ? `${(testResults.passedCount / testResults.total) * 100}%` : '0%',
                transition: 'width 0.3s ease'
              }}
            />
          </div>
        </div>

        {/* Player 2 (Bot Opponent) */}
        <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>🤖 Azubi-Bot Max</span>
            <span style={{ fontSize: '0.8rem', color: botState.progress >= 100 ? '#ef4444' : 'var(--text-muted)' }}>
              {botState.progress}% Fortschritt ({botState.testsPassed}/{challenge.tests.length} Tests)
            </span>
          </div>
          <div style={{ height: '10px', background: 'var(--bg-primary)', borderRadius: '6px', overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                background: '#ef4444',
                width: `${botState.progress}%`,
                transition: 'width 0.5s ease'
              }}
            />
          </div>
        </div>
      </div>

      {/* Winner Banner */}
      {winner && (
        <div style={{
          background: winner === 'USER' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
          border: `2px solid ${winner === 'USER' ? '#10b981' : '#ef4444'}`,
          borderRadius: '12px',
          padding: '18px',
          marginBottom: '24px',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', margin: '0 0 6px 0', color: winner === 'USER' ? '#10b981' : '#ef4444' }}>
            {winner === 'USER' ? '🏆 Sieg! Du hast das Duell gewonnen (+60 XP)' : '💀 Niederlage! Azubi-Bot Max war schneller.'}
          </h2>
          <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            {winner === 'USER' ? 'Alle Testfälle erfolgreich vor dem Gegner gelöst!' : 'Probiere es erneut oder optimiere deinen Code.'}
          </p>
        </div>
      )}

      {/* Editor & Task Description Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '24px' }}>
        {/* Code Editor */}
        <div style={{ background: 'var(--bg-secondary)', padding: '18px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-muted)' }}>JavaScript Editor</span>
            <button
              onClick={handleRunTests}
              className="btn btn-primary"
              style={{ padding: '6px 14px', fontSize: '0.82rem', gap: '6px' }}
            >
              <Terminal size={14} /> Tests Ausführen &amp; Abgeben
            </button>
          </div>
          <textarea
            value={userCode}
            onChange={(e) => setUserCode(e.target.value)}
            rows={12}
            style={{
              width: '100%',
              padding: '12px',
              fontFamily: 'monospace',
              fontSize: '0.88rem',
              background: 'var(--bg-primary)',
              color: '#10b981',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              resize: 'vertical'
            }}
          />
        </div>

        {/* Task Details & Tests */}
        <div style={{ background: 'var(--bg-secondary)', padding: '18px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 'bold', margin: '0 0 8px 0' }}>{challenge.title}</h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: 1.5 }}>
            {challenge.desc}
          </p>

          <h4 style={{ fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '8px' }}>Testfälle:</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {challenge.tests.map((test, idx) => {
              const res = testResults?.results?.find(r => r.testIndex === idx + 1);
              return (
                <div
                  key={idx}
                  style={{
                    background: 'var(--bg-primary)',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    fontSize: '0.82rem',
                    fontFamily: 'monospace',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    Input: {JSON.stringify(test.input)} <br />
                    Expected: {JSON.stringify(test.expected)}
                  </div>
                  {res && (
                    <div>
                      {res.passed ? (
                        <CheckCircle2 size={18} color="#10b981" />
                      ) : (
                        <XCircle size={18} color="#ef4444" />
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
