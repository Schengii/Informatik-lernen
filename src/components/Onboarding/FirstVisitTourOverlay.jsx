import React, { useState } from 'react';
import { Search, FlaskConical, Target, X, ArrowRight, Sparkles } from 'lucide-react';
import { useTranslation } from '../../utils/i18n';

// Leichte, einmalige Onboarding-Tour nach der Rollenauswahl (siehe App.jsx: gerendert wenn
// `userState.role && !userState.hasSeenTour`). Bewusst als einfacher Karussell-Dialog statt
// als DOM-verankertes Spotlight umgesetzt: ein echtes Spotlight müsste Refs quer durch
// Navbar/Dashboard koordinieren und wäre für den Nutzen unverhältnismäßig fragil. Kein neues
// Paket nötig - reines CSS/React, analog zu RoleSelectionModal.
const TOUR_STEPS = [
  {
    icon: Search,
    titleKey: 'tour_step1_title',
    descKey: 'tour_step1_desc'
  },
  {
    icon: FlaskConical,
    titleKey: 'tour_step2_title',
    descKey: 'tour_step2_desc'
  },
  {
    icon: Target,
    titleKey: 'tour_step3_title',
    descKey: 'tour_step3_desc'
  }
];

export default function FirstVisitTourOverlay({ onComplete }) {
  const { t } = useTranslation();
  const [stepIndex, setStepIndex] = useState(0);

  const step = TOUR_STEPS[stepIndex];
  const Icon = step.icon;
  const isLastStep = stepIndex === TOUR_STEPS.length - 1;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2100,
        padding: '20px'
      }}
    >
      <div
        className="glass-panel animate-fade-in"
        style={{
          maxWidth: '460px',
          width: '100%',
          background: 'var(--bg-card)',
          border: '2px solid var(--accent-primary)',
          borderRadius: 'var(--radius-xl)',
          padding: '32px',
          boxShadow: 'var(--shadow-card)',
          position: 'relative',
          textAlign: 'center'
        }}
      >
        <button
          onClick={onComplete}
          aria-label={t('a11y_close')}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'var(--bg-tertiary)',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-muted)',
            cursor: 'pointer'
          }}
        >
          <X size={18} />
        </button>

        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'var(--gradient-cyber)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px'
          }}
        >
          <Icon size={30} color="#ffffff" />
        </div>

        <span className="badge badge-indigo" style={{ marginBottom: '10px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
          <Sparkles size={13} /> {t('tour_progress').replace('{current}', stepIndex + 1).replace('{total}', TOUR_STEPS.length)}
        </span>

        <h2 style={{ fontSize: '1.4rem', fontWeight: '800', margin: '4px 0 10px', color: 'var(--text-main)' }}>
          {t(step.titleKey)}
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: '1.6', marginBottom: '24px' }}>
          {t(step.descKey)}
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginBottom: '20px' }}>
          {TOUR_STEPS.map((_, idx) => (
            <span
              key={idx}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: idx === stepIndex ? 'var(--accent-primary)' : 'var(--border-color)'
              }}
            />
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <button className="btn btn-secondary" onClick={onComplete} style={{ minHeight: '44px' }}>
            {t('tour_skip')}
          </button>
          <button
            className="btn btn-primary"
            onClick={() => (isLastStep ? onComplete() : setStepIndex((i) => i + 1))}
            style={{ minHeight: '44px', gap: '6px' }}
          >
            {isLastStep ? t('tour_finish') : t('tour_next')} <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
