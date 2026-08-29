import React, { useState, useRef, useEffect } from 'react';
import {
  Database, Plus, History, Camera
} from 'lucide-react';
import { EventStoreSimulator } from '../../utils/eventSourcingEngine';
import { useStore } from '../../store/useStore';
import { triggerHaptic } from '../../utils/haptics';

export default function EventSourcingLab({ onRewardXP }) {
  const { awardXP } = useStore();
  const [depositAmount, setDepositAmount] = useState(150);
  const [withdrawAmount, setWithdrawAmount] = useState(50);
  const [solved, setSolved] = useState(false);

  const storeRef = useRef(null);
  const [, setTick] = useState(0);

  useEffect(() => {
    storeRef.current = new EventStoreSimulator();
    storeRef.current.appendEvent('acc_42', 'ACCOUNT_OPENED', { owner: 'Max Mustermann', initialDeposit: 500 });
    storeRef.current.appendEvent('acc_42', 'MONEY_DEPOSITED', { amount: 200 });
    setTick(t => t + 1);
  }, []);

  const handleDeposit = () => {
    if (!storeRef.current) return;
    storeRef.current.appendEvent('acc_42', 'MONEY_DEPOSITED', { amount: depositAmount });
    triggerHaptic('SUCCESS');
    setTick(t => t + 1);
    checkXP();
  };

  const handleWithdraw = () => {
    if (!storeRef.current) return;
    storeRef.current.appendEvent('acc_42', 'MONEY_WITHDRAWN', { amount: withdrawAmount });
    triggerHaptic('WARNING');
    setTick(t => t + 1);
    checkXP();
  };

  const handleSnapshot = () => {
    if (!storeRef.current) return;
    storeRef.current.createSnapshot('acc_42');
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
        awardXP(45, 'event_sourcing_master');
      }
    }
  };

  const events = storeRef.current ? storeRef.current.getEvents('acc_42') : [];
  const readModel = storeRef.current ? storeRef.current.projectBankAccount('acc_42') : { balance: 0, version: 0, transactionCount: 0 };
  const snapshot = storeRef.current && storeRef.current.snapshots['acc_42'];

  return (
    <div style={{ background: 'var(--bg-card)', padding: '28px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-color)' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="badge badge-indigo" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Database size={14} /> Software Architecture
            </span>
            <span className="badge badge-emerald" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <History size={14} /> Event Sourcing &amp; CQRS
            </span>
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, color: 'var(--text-main)' }}>
            📜 Event-Sourcing &amp; CQRS Event Store Simulator
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginTop: '6px', maxWidth: '750px' }}>
            Erlebe die Trennung von unveränderlichem Event-Log (Write-Side) und materialisierten Projektionen (Read-Side). Erzeuge Snapshots zur schnellen Zustandswiederherstellung.
          </p>
        </div>

        <button
          onClick={handleSnapshot}
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px', fontWeight: 'bold' }}
        >
          <Camera size={16} /> Snapshot Erstellen (+45 XP)
        </button>
      </div>

      {/* Read Model Projected Balance Hero Banner */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '24px' }}>
        <div style={{ background: 'var(--bg-primary)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Read Model Kontostand:</span>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10b981', marginTop: '4px' }}>
            {readModel.balance.toLocaleString('de-DE')} €
          </div>
        </div>

        <div style={{ background: 'var(--bg-primary)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Event Stream Version:</span>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent-primary)', marginTop: '4px' }}>
            v{readModel.version}
          </div>
        </div>

        <div style={{ background: 'var(--bg-primary)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Transaktions-Anzahl:</span>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-main)', marginTop: '4px' }}>
            {readModel.transactionCount} Events
          </div>
        </div>
      </div>

      {/* Action Command Dispatcher */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '24px', background: 'var(--bg-secondary)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(parseFloat(e.target.value) || 0)}
            style={{ width: '90px', padding: '8px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-main)' }}
          />
          <button
            onClick={handleDeposit}
            className="btn btn-secondary"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10b981', fontWeight: 'bold' }}
          >
            <Plus size={16} /> Einzahlen
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input
            type="number"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(parseFloat(e.target.value) || 0)}
            style={{ width: '90px', padding: '8px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-main)' }}
          />
          <button
            onClick={handleWithdraw}
            className="btn btn-secondary"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#ef4444', fontWeight: 'bold' }}
          >
            Auszahlen
          </button>
        </div>
      </div>

      {/* Event Stream Log vs Snapshot Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {/* Immutable Event Store Log */}
        <div style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-muted)', display: 'block', marginBottom: '12px' }}>
            Unveränderlicher Event Store (Append-Only Log):
          </span>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '280px', overflowY: 'auto' }}>
            {events.map((evt) => (
              <div
                key={evt.eventId}
                style={{
                  background: 'var(--bg-primary)',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)',
                  borderLeft: '4px solid var(--accent-primary)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 'bold', fontSize: '0.82rem' }}>
                    v{evt.version}: {evt.type}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    {evt.timestamp.split('T')[1].slice(0, 8)}
                  </span>
                </div>
                <code style={{ fontSize: '0.75rem', color: '#38bdf8', marginTop: '4px', display: 'block' }}>
                  {JSON.stringify(evt.payload)}
                </code>
              </div>
            ))}
          </div>
        </div>

        {/* Snapshot & Read Model Status */}
        <div style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-muted)', display: 'block', marginBottom: '12px' }}>
            Letzter gespeicherter State-Snapshot:
          </span>

          {snapshot ? (
            <pre
              style={{
                margin: 0,
                padding: '14px',
                background: '#090d16',
                color: '#10b981',
                borderRadius: '8px',
                fontFamily: 'monospace',
                fontSize: '0.82rem',
                lineHeight: '1.4'
              }}
            >
              {JSON.stringify(snapshot, null, 2)}
            </pre>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '180px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              (Noch kein Snapshot erstellt)
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
