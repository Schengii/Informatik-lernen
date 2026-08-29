import React, { useState } from 'react';
import {
  GitMerge, Play, Terminal,
  Layers, Copy, Server
} from 'lucide-react';
import {
  DEFAULT_PIPELINE_JOBS,
  computePipelineStages
} from '../../utils/cicdPipelineBuilderEngine';
import { useStore } from '../../store/useStore';
import { triggerHaptic } from '../../utils/haptics';

export default function CiCdPipelineBuilderLab({ onRewardXP }) {
  const { awardXP } = useStore();
  const [jobs] = useState(DEFAULT_PIPELINE_JOBS);
  const [selectedJobId, setSelectedJobId] = useState('oxlint_job');
  const [isRunning, setIsRunning] = useState(false);
  const [activeStageLevel, setActiveStageLevel] = useState(-1);
  const [jobStatuses, setJobStatuses] = useState({}); // { [jobId]: 'pending' | 'running' | 'success' | 'failed' }
  const [liveLogs, setLiveLogs] = useState([]);
  const [hasClaimedXP, setHasClaimedXP] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);

  const stageData = computePipelineStages(jobs);
  const selectedJob = jobs.find((j) => j.id === selectedJobId) || jobs[0];

  const runPipeline = async () => {
    if (isRunning || !stageData.isValid) return;
    setIsRunning(true);
    setActiveStageLevel(0);
    setLiveLogs(['🚀 CI/CD Pipeline gestartet auf Runner "github-runner-linux-x64"...']);
    triggerHaptic('MEDIUM');

    const initialStatuses = {};
    jobs.forEach((j) => { initialStatuses[j.id] = 'pending'; });
    setJobStatuses(initialStatuses);

    for (let lvl = 0; lvl < stageData.stages.length; lvl++) {
      setActiveStageLevel(lvl);
      const currentStage = stageData.stages[lvl];

      // Set running
      setJobStatuses((prev) => {
        const next = { ...prev };
        currentStage.jobs.forEach((j) => { next[j.id] = 'running'; });
        return next;
      });

      // Stream logs
      for (const j of currentStage.jobs) {
        setLiveLogs((prev) => [...prev, `[${j.name}] Ausführen: ${j.commands.join(' && ')}`]);
      }

      await new Promise((resolve) => setTimeout(resolve, 1400));

      // Mark success
      setJobStatuses((prev) => {
        const next = { ...prev };
        currentStage.jobs.forEach((j) => { next[j.id] = 'success'; });
        return next;
      });

      for (const j of currentStage.jobs) {
        setLiveLogs((prev) => [
          ...prev,
          `✓ [${j.name}] Erfolgreich (Artefakt gesichert: ${j.artifacts.join(', ')})`
        ]);
      }
    }

    setLiveLogs((prev) => [...prev, '🎉 Pipeline erfolgreich abgeschlossen: Alle Stages PASS (Exit Code: 0)']);
    setIsRunning(false);
    triggerHaptic('LEVEL_UP');

    if (!hasClaimedXP) {
      setHasClaimedXP(true);
      if (onRewardXP) onRewardXP(150, 'cicd_dag_builder');
      else awardXP(150, 'cicd_dag_builder');
    }
  };

  const yamlWorkflow = `name: Production CI/CD Workflow
on:
  push:
    branches: [ main, release/* ]

jobs:
${jobs.map((j) => `  ${j.id}:
    name: ${j.name}
    runs-on: ubuntu-latest${j.needs.length > 0 ? `\n    needs: [${j.needs.join(', ')}]` : ''}
    steps:
      - uses: actions/checkout@v4
      - name: Run Commands
        run: |
${j.commands.map((c) => `          ${c}`).join('\n')}`).join('\n\n')}`;

  const copyYaml = () => {
    navigator.clipboard.writeText(yamlWorkflow);
    setHasCopied(true);
    triggerHaptic('SUCCESS');
    setTimeout(() => setHasCopied(false), 2500);
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ padding: '6px 12px', background: 'rgba(99, 102, 241, 0.15)', color: '#6366f1', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 'bold' }}>
              DevOps & Modern CI/CD
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Directed Acyclic Graph (DAG) • Parallele Stages • YAML Linter
            </span>
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '800', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <GitMerge size={30} color="#6366f1" />
            CI/CD Pipeline DAG Studio & Runner
          </h1>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button
            onClick={runPipeline}
            disabled={isRunning || !stageData.isValid}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              background: isRunning ? 'var(--bg-secondary)' : '#10b981',
              color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '8px',
              cursor: isRunning ? 'not-allowed' : 'pointer', fontWeight: 'bold'
            }}
          >
            <Play size={18} /> {isRunning ? 'Pipeline läuft...' : 'Pipeline Ausführen (Run)'}
          </button>
        </div>
      </div>

      {/* Main Grid: DAG Visualizer + Terminal Logs & YAML */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.8fr) minmax(340px, 1fr)', gap: '20px' }}>
        {/* Left Column: Visual Pipeline DAG Stages */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '20px' }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 'bold', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Layers size={20} color="#6366f1" />
              Pipeline DAG Stage Graph ({stageData.stages.length} Stages)
            </h2>

            {/* Stages Grid */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {stageData.stages.map((stage, sIdx) => {
                const isCurrentStageRunning = isRunning && activeStageLevel === stage.level;
                return (
                  <div key={stage.level} style={{ background: 'var(--bg-primary)', padding: '14px', borderRadius: '10px', border: isCurrentStageRunning ? '2px solid #6366f1' : '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <span style={{ fontSize: '0.82rem', fontWeight: 'bold', color: isCurrentStageRunning ? '#6366f1' : 'var(--text-muted)' }}>
                        STAGE {sIdx + 1}: {stage.jobs.length > 1 ? 'PARALLELE JOBS' : 'SEQUENZIELL'}
                      </span>
                      {isCurrentStageRunning && (
                        <span style={{ fontSize: '0.75rem', background: 'rgba(99, 102, 241, 0.2)', color: '#6366f1', padding: '2px 8px', borderRadius: '10px', fontWeight: 'bold' }}>
                          ⚡ Running...
                        </span>
                      )}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
                      {stage.jobs.map((job) => {
                        const status = jobStatuses[job.id] || 'pending';
                        const isSelected = selectedJobId === job.id;
                        let statusBadge = '⚪ Ausstehend';
                        let badgeColor = 'var(--text-muted)';
                        if (status === 'running') { statusBadge = '⚡ In Bearbeitung'; badgeColor = '#6366f1'; }
                        if (status === 'success') { statusBadge = '✓ Bestanden'; badgeColor = '#10b981'; }

                        return (
                          <div
                            key={job.id}
                            onClick={() => { setSelectedJobId(job.id); triggerHaptic('LIGHT'); }}
                            style={{
                              padding: '12px',
                              borderRadius: '8px',
                              background: isSelected ? 'rgba(99, 102, 241, 0.12)' : 'var(--bg-secondary)',
                              border: isSelected ? '1.5px solid #6366f1' : '1px solid var(--border-color)',
                              cursor: 'pointer',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '6px'
                            }}
                          >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <strong style={{ fontSize: '0.88rem', color: 'var(--text-main)' }}>{job.name}</strong>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                              <span style={{ color: badgeColor, fontWeight: 'bold' }}>{statusBadge}</span>
                              <span style={{ color: 'var(--text-muted)' }}>{job.artifacts.length} Artefakt(e)</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Live Runner Terminal */}
          <div style={{ background: '#0d1117', border: '1px solid #30363d', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ background: '#161b22', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #30363d' }}>
              <Terminal size={16} color="#58a6ff" />
              <span style={{ fontSize: '0.82rem', fontFamily: 'monospace', color: '#c9d1d9' }}>
                Runner Output Log (CI Runner v2.3)
              </span>
            </div>
            <div style={{ padding: '14px', maxHeight: '200px', overflowY: 'auto', fontFamily: 'monospace', fontSize: '0.82rem', color: '#e6edf3', lineHeight: '1.5' }}>
              {liveLogs.length === 0 ? (
                <span style={{ color: '#8b949e' }}>Klicke oben auf "Pipeline Ausführen", um die Ausführung live zu verfolgen.</span>
              ) : (
                liveLogs.map((log, i) => (
                  <div key={i} style={{ color: log.startsWith('✓') ? '#3fb950' : log.startsWith('🚀') ? '#58a6ff' : '#c9d1d9' }}>
                    {log}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Selected Job Details & YAML Export */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Job Details Card */}
          <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '18px' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 'bold', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Server size={18} color="#6366f1" />
              Job-Details: {selectedJob.name}
            </h3>

            <div style={{ fontSize: '0.82rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Abhängigkeiten (needs):</span>
                <strong style={{ marginLeft: '6px', color: 'var(--text-main)' }}>
                  {selectedJob.needs.length > 0 ? selectedJob.needs.join(', ') : 'Keine (Wird parallel gestartet)'}
                </strong>
              </div>

              <div>
                <span style={{ color: 'var(--text-muted)' }}>Ausgeführte Shell-Befehle:</span>
                <div style={{ marginTop: '4px', padding: '8px', background: '#0d1117', borderRadius: '6px', fontFamily: 'monospace', color: '#58a6ff' }}>
                  {selectedJob.commands.map((c, i) => <div key={i}>$ {c}</div>)}
                </div>
              </div>

              <div>
                <span style={{ color: 'var(--text-muted)' }}>Erzeugte Artefakte:</span>
                <div style={{ marginTop: '4px', padding: '6px 8px', background: 'var(--bg-primary)', borderRadius: '6px', fontFamily: 'monospace', color: '#10b981' }}>
                  {selectedJob.artifacts.join(', ')}
                </div>
              </div>
            </div>
          </div>

          {/* GitHub Actions YAML Preview */}
          <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 'bold' }}>.github/workflows/deploy.yml</h3>
              <button
                onClick={copyYaml}
                style={{
                  display: 'flex', alignItems: 'center', gap: '4px',
                  background: hasCopied ? '#10b981' : 'var(--bg-primary)',
                  color: hasCopied ? '#fff' : 'var(--text-main)',
                  border: '1px solid var(--border-color)', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', cursor: 'pointer'
                }}
              >
                <Copy size={14} /> {hasCopied ? 'Kopiert!' : 'Kopieren'}
              </button>
            </div>

            <textarea
              readOnly
              value={yamlWorkflow}
              rows={10}
              style={{
                width: '100%', padding: '10px', background: '#0d1117',
                border: '1px solid #30363d', color: '#e6edf3',
                borderRadius: '6px', fontFamily: 'monospace', fontSize: '0.75rem', lineHeight: '1.4'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
