import React, { useState, useMemo } from 'react';
import {
  Cloud, Copy, Check, Sparkles, FileText
} from 'lucide-react';
import {
  generateHelmChart,
  generateKustomizeOverlays
} from '../../utils/k8sHelmKustomizeEngine';
import { useStore } from '../../store/useStore';
import { triggerHaptic } from '../../utils/haptics';

export default function K8sHelmKustomizeLab({ onRewardXP }) {
  const { awardXP } = useStore();
  const [mode, setMode] = useState('helm'); // 'helm' | 'kustomize'
  const [appName, setAppName] = useState('shop-backend');
  const [replicas, setReplicas] = useState(3);
  const [servicePort, setServicePort] = useState(8080);
  const [selectedFile, setSelectedFile] = useState('values.yaml');
  const [copied, setCopied] = useState(false);
  const [solved, setSolved] = useState(false);

  const helmData = useMemo(() => {
    return generateHelmChart({ appName, replicas, servicePort });
  }, [appName, replicas, servicePort]);

  const kustomizeData = useMemo(() => {
    return generateKustomizeOverlays({ appName, prodReplicas: replicas * 2 });
  }, [appName, replicas]);

  const currentFileContent = useMemo(() => {
    if (mode === 'helm') {
      if (selectedFile === 'Chart.yaml') return helmData.chartYaml;
      if (selectedFile === 'deployment.yaml') return helmData.deploymentYaml;
      return helmData.valuesYaml;
    } else {
      if (selectedFile === 'base/kustomization.yaml') return kustomizeData.baseKustomization;
      return kustomizeData.prodKustomization;
    }
  }, [mode, selectedFile, helmData, kustomizeData]);

  const handleCopy = () => {
    navigator.clipboard.writeText(currentFileContent);
    setCopied(true);
    triggerHaptic('SUCCESS');
    setTimeout(() => setCopied(false), 2000);

    if (!solved) {
      setSolved(true);
      if (onRewardXP) {
        onRewardXP(45);
      } else {
        awardXP(45, 'helm_kustomize_master');
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
              <Cloud size={14} /> Kubernetes &amp; Cloud Native
            </span>
            <span className="badge badge-teal" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={14} /> Helm &amp; Kustomize Studio
            </span>
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, color: 'var(--text-main)' }}>
            ☸️ Kubernetes Helm Chart &amp; Kustomize Overlay Generator
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginTop: '6px', maxWidth: '750px' }}>
            Erstelle produktionsreife Helm Charts (`Chart.yaml`, `values.yaml`, `templates/`) und Kustomize Overlays (`base/`, `overlays/prod/`) für GitOps &amp; CI/CD.
          </p>
        </div>

        <button
          onClick={handleCopy}
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px', fontWeight: 'bold' }}
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied ? 'Kopiert!' : 'YAML Kopieren (+45 XP)'}
        </button>
      </div>

      {/* Mode Switcher */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button
          onClick={() => { setMode('helm'); setSelectedFile('values.yaml'); triggerHaptic('SELECTION'); }}
          className={`btn ${mode === 'helm' ? 'btn-primary' : 'btn-ghost'}`}
          style={{ fontSize: '0.88rem', padding: '8px 16px' }}
        >
          ⛵ Helm Chart Generator
        </button>
        <button
          onClick={() => { setMode('kustomize'); setSelectedFile('overlays/prod/kustomization.yaml'); triggerHaptic('SELECTION'); }}
          className={`btn ${mode === 'kustomize' ? 'btn-primary' : 'btn-ghost'}`}
          style={{ fontSize: '0.88rem', padding: '8px 16px' }}
        >
          🧩 Kustomize Overlays
        </button>
      </div>

      {/* Configuration Inputs & Preview Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '24px' }}>
        {/* Left: Param Controls */}
        <div style={{ background: 'var(--bg-secondary)', padding: '18px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-muted)', display: 'block', marginBottom: '14px' }}>
            Parameter konfigurieren:
          </span>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Service Name:</label>
              <input
                type="text"
                value={appName}
                onChange={(e) => setAppName(e.target.value)}
                style={{ width: '100%', padding: '8px 12px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-main)', fontFamily: 'monospace' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Replica Count: {replicas}</label>
              <input
                type="range"
                min="1"
                max="10"
                value={replicas}
                onChange={(e) => setReplicas(parseInt(e.target.value, 10))}
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Service Port:</label>
              <input
                type="number"
                value={servicePort}
                onChange={(e) => setServicePort(parseInt(e.target.value, 10) || 8080)}
                style={{ width: '100%', padding: '8px 12px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-main)', fontFamily: 'monospace' }}
              />
            </div>
          </div>
        </div>

        {/* Right: File Tree & Content */}
        <div style={{ background: 'var(--bg-secondary)', padding: '18px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
          {/* File Selector Tabs */}
          <div style={{ display: 'flex', gap: '6px', marginBottom: '12px', flexWrap: 'wrap' }}>
            {mode === 'helm' ? (
              ['values.yaml', 'Chart.yaml', 'deployment.yaml'].map(file => (
                <button
                  key={file}
                  onClick={() => setSelectedFile(file)}
                  className={`btn ${selectedFile === file ? 'btn-primary' : 'btn-ghost'}`}
                  style={{ fontSize: '0.75rem', padding: '4px 10px', fontFamily: 'monospace' }}
                >
                  <FileText size={12} style={{ display: 'inline', marginRight: '4px' }} /> {file}
                </button>
              ))
            ) : (
              ['overlays/prod/kustomization.yaml', 'base/kustomization.yaml'].map(file => (
                <button
                  key={file}
                  onClick={() => setSelectedFile(file)}
                  className={`btn ${selectedFile === file ? 'btn-primary' : 'btn-ghost'}`}
                  style={{ fontSize: '0.75rem', padding: '4px 10px', fontFamily: 'monospace' }}
                >
                  <FileText size={12} style={{ display: 'inline', marginRight: '4px' }} /> {file}
                </button>
              ))
            )}
          </div>

          <pre
            style={{
              margin: 0,
              padding: '14px',
              background: 'var(--bg-primary)',
              color: '#38bdf8',
              borderRadius: '8px',
              fontFamily: 'monospace',
              fontSize: '0.82rem',
              maxHeight: '270px',
              overflowY: 'auto'
            }}
          >
            {currentFileContent}
          </pre>
        </div>
      </div>
    </div>
  );
}
