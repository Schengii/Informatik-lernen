import React from 'react';
import { Award, Sparkles, CheckCircle2, Lock } from 'lucide-react';
import { SKILL_TREE_DATA } from '../../data/roadmapData';

export default function SkillTreeWidget({ userState }) {
  const unlockedTopics = userState.completedTopics || [];

  return (
    <div style={{ background: 'var(--bg-card)', padding: '28px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-color)', marginBottom: '32px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <span className="badge badge-indigo" style={{ marginBottom: '8px' }}>
            <Award size={14} /> RPG Skill Tree & Lernpfad
          </span>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '800', margin: '4px 0', color: 'var(--text-main)' }}>
            🌳 Interaktiver Informatik Skill-Baum
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Schalte Stufe für Stufe neue Skills von den Grundlagen bis zu Cloud Native & AI frei.
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {SKILL_TREE_DATA.map((tier, tIdx) => (
          <div key={tIdx}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--accent-indigo)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              {tier.category}
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
              {tier.nodes.map((node) => {
                const isUnlocked = unlockedTopics.includes(node.id) || !node.req;
                const isCompleted = unlockedTopics.includes(node.id);

                return (
                  <div
                    key={node.id}
                    style={{
                      // Der gesperrte Zustand nutzte vorher `rgba(15, 23, 42, 0.4)` (ein
                      // dunkler Slate-Ton mit niedriger Deckkraft) kombiniert mit
                      // `opacity: 0.6` auf der ganzen Karte - beides zusammen verwässerte
                      // den enthaltenen --text-muted-Text auf 1.69:1 Kontrast statt der
                      // WCAG-AA-Mindestanforderung von 4.5:1 (gefunden von
                      // e2e/accessibility.spec.js). --bg-tertiary ist hell genug, dass
                      // --text-muted darauf komfortabel besteht, ganz ohne Opacity-Trick;
                      // gestrichelter Rahmen + Schloss-Icon signalisieren "gesperrt" bereits eindeutig.
                      background: isCompleted ? 'rgba(16, 185, 129, 0.08)' : isUnlocked ? 'var(--bg-primary)' : 'var(--bg-tertiary)',
                      border: isCompleted ? '2px solid var(--accent-emerald)' : isUnlocked ? '1px solid var(--border-color)' : '1px dashed var(--border-color)',
                      padding: '20px',
                      borderRadius: 'var(--radius-lg)',
                      position: 'relative'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span className="badge badge-indigo" style={{ fontSize: '0.75rem' }}>+{node.xp} XP</span>
                      {isCompleted ? (
                        <CheckCircle2 size={20} color="var(--accent-emerald)" />
                      ) : isUnlocked ? (
                        <Sparkles size={18} color="var(--accent-indigo)" />
                      ) : (
                        <Lock size={18} color="var(--text-muted)" />
                      )}
                    </div>

                    <h4 style={{ fontSize: '1.05rem', fontWeight: '700', margin: '4px 0', color: isUnlocked ? 'var(--text-main)' : 'var(--text-muted)' }}>
                      {node.title}
                    </h4>

                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0, lineHeight: '1.4' }}>
                      {node.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
