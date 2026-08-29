import React, { useState, useRef, useEffect } from 'react';
import {
  Cloud, RefreshCw, Copy, Check, ShieldAlert, Cpu
} from 'lucide-react';
import { K8sOperatorSimulator } from '../../utils/k8sOperatorEngine';
import { useStore } from '../../store/useStore';
import { triggerHaptic } from '../../utils/haptics';

export default function K8sOperatorLab({ onRewardXP }) {
  const { awardXP } = useStore();
  const [replicas, setReplicas] = useState(3);
  const [copied, setCopied] = useState(false);
  const [solved, setSolved] = useState(false);

  const opRef = useRef(null);
  const [, setTick] = useState(0);

  useEffect(() => {
    opRef.current = new K8sOperatorSimulator('PostgresCluster');
    setTick(t => t + 1);
  }, []);

  const handleUpdateReplicas = (count) => {
    setReplicas(count);
    if (!opRef.current) return;
    opRef.current.setDesiredReplicas(count);
    triggerHaptic('SELECTION');
    setTick(t => t + 1);
    checkXP();
  };

  const handleCrash = () => {
    if (!opRef.current) return;
    opRef.current.simulateNodeCrash();
    triggerHaptic('WARNING');
    setTick(t => t + 1);
    checkXP();
  };

  const handleCopy = () => {
    if (!opRef.current) return;
    navigator.clipboard.writeText(opRef.current.generateCrdManifest());
    setCopied(true);
    triggerHaptic('SUCCESS');
    setTimeout(() => setCopied(false), 2000);
    checkXP();
  };

  const checkXP = () => {
    if (!solved) {
      setSolved(true);
      if (onRewardXP) {
        onRewardXP(45);
      } else {
        awardXP(45, 'k8s_operator_master');
      }
    }
  };

  const observed = opRef.current ? opRef.current.observedState : { actualPods: 0, phase: 'Unknown' };
  const history = opRef.current ? opRef.current.reconcileHistory : [];
  const yaml = opRef.current ? opRef.current.generateCrdManifest() : '';

  return (
    <div style={{ background: 'var(--bg-card)', padding: '28px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-color)' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="badge badge-indigo" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Cloud size={14} /> Kubernetes Ecosystem
            </span>
            <span className="badge badge-emerald" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Cpu size={14} /> Custom Resource Definition (CRD) &amp; Controller
            </span>
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, color: 'var(--text-main)' }}>
            ☸️ Kubernetes Operator &amp; CRD Controller Studio
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginTop: '6px', maxWidth: '750px' }}>
            Simuliere den K8s Reconcile-Loop (`Reconcile(ctx, req)`), beobachte automatisches Self-Healing bei Pod-Crashes und generiere CRD &amp; Custom Resource Manifeste.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handleCrash}
            className="btn btn-secondary"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#ef4444' }}
          >
            <ShieldAlert size={16} /> Node-Crash Simulieren
          </button>
          <button
            onClick={handleCopy}
            className="btn btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold' }}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? 'Kopiert!' : 'CRD YAML Kopieren (+45 XP)'}
          </button>
        </div>
      </div>

      {/* Controller Reconcile Loop Status Card */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '24px' }}>
        <div style={{ background: 'var(--bg-primary)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Sollzustand (Desired Spec):</span>
          <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: 'var(--accent-primary)', marginTop: '4px' }}>
            {replicas} Replicas
          </div>
        </div>

        <div style={{ background: 'var(--bg-primary)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Istzustand (Observed Status):</span>
          <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: observed.phase === 'Running' ? '#10b981' : '#ef4444', marginTop: '4px' }}>
            {observed.actualPods} Pods ({observed.phase})
          </div>
        </div>

        <div style={{ background: 'var(--bg-primary)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Controller Status:</span>
          <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#10b981', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <RefreshCw size={16} className="animate-spin" /> Reconciling Active
          </div>
        </div>
      </div>

      {/* Pod Controls & Manifest Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {/* Spec Controls & Reconcile History */}
        <div style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-muted)', display: 'block', marginBottom: '12px' }}>
            Operator Spec &amp; Skalierung:
          </span>

          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
              spec.replicas: {replicas}
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              {[1, 2, 3, 5, 8].map(num => (
                <button
                  key={num}
                  onClick={() => handleUpdateReplicas(num)}
                  className={`btn ${replicas === num ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ padding: '6px 14px', fontSize: '0.85rem' }}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
            Reconcile Event Log:
          </span>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '200px', overflowY: 'auto' }}>
            {history.map((h, idx) => (
              <div key={idx} style={{ background: 'var(--bg-primary)', padding: '8px 12px', borderRadius: '6px', fontSize: '0.78rem', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--accent-primary)', fontWeight: 'bold' }}>
                  <span>{h.triggerReason}</span>
                  <span style={{ color: 'var(--text-muted)' }}>{h.timestamp.split('T')[1].slice(0, 8)}</span>
                </div>
                <div style={{ color: 'var(--text-main)', marginTop: '2px' }}>{h.actionTaken}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Generated CRD & Custom Resource YAML */}
        <div style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-muted)', display: 'block', marginBottom: '12px' }}>
            Kubernetes CRD &amp; Custom Resource (YAML):
          </span>

          <pre
            style={{
              margin: 0,
              padding: '14px',
              background: '#090d16',
              color: '#38bdf8',
              borderRadius: '8px',
              fontFamily: 'monospace',
              fontSize: '0.8rem',
              lineHeight: '1.4',
              maxHeight: '300px',
              overflowY: 'auto'
            }}
          >
            {yaml}
          </pre>
        </div>
      </div>
    </div>
  );
}
