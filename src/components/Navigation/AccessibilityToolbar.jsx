import React, { useState } from 'react';
import { Eye, X, RotateCcw } from 'lucide-react';
import { useTranslation } from '../../utils/i18n';

export default function AccessibilityToolbar({
  fontSize,
  setFontSize,
  isDyslexic,
  setIsDyslexic,
  isColorblind,
  setIsColorblind,
  isHighContrast,
  setIsHighContrast,
  isReducedMotion,
  setIsReducedMotion,
  setTheme
}) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const resetSettings = () => {
    setFontSize(100);
    setIsDyslexic(false);
    setIsColorblind(false);
    setIsHighContrast(false);
    setIsReducedMotion(false);
    setTheme('light');
  };

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn btn-secondary btn-sm"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontWeight: 600,
          borderColor: (isDyslexic || isColorblind || isHighContrast) ? 'var(--accent-primary)' : 'var(--border-color)',
          background: (isDyslexic || isColorblind || isHighContrast) ? 'rgba(79, 70, 229, 0.1)' : 'var(--bg-tertiary)'
        }}
        title={t('a11y_button_title')}
        aria-label={t('a11y_menu_aria')}
      >
        <Eye size={18} style={{ color: 'var(--accent-primary)' }} />
        <span className="desktop-only">{t('a11y_button_label')}</span>
      </button>

      {isOpen && (
        <div
          className="glass-panel animate-fade-in"
          style={{
            position: 'absolute',
            top: 'calc(100% + 12px)',
            right: 0,
            width: '320px',
            maxWidth: '90vw',
            zIndex: 1000,
            padding: '20px',
            boxShadow: 'var(--shadow-card)',
            background: 'var(--bg-card)',
            border: '2px solid var(--accent-primary)'
          }}
          role="dialog"
          aria-label={t('a11y_menu_aria')}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
            <h3 style={{ fontSize: '1.1rem', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Eye size={20} style={{ color: 'var(--accent-primary)' }} />
              {t('a11y_heading')}
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
              aria-label={t('a11y_close')}
            >
              <X size={20} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* Font Size Scaling */}
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                {t('a11y_font_size')} ({fontSize}%)
              </label>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => setFontSize(Math.max(85, fontSize - 10))}
                  disabled={fontSize <= 85}
                  style={{ flex: 1 }}
                >
                  A-
                </button>

                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => setFontSize(100)}
                  style={{ flex: 1 }}
                >
                  100%
                </button>

                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => setFontSize(Math.min(140, fontSize + 10))}
                  disabled={fontSize >= 140}
                  style={{ flex: 1 }}
                >
                  A+
                </button>
              </div>
            </div>

            {/* Dyslexia Mode (Lese-Rechtschreib-Hilfe) */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ fontSize: '0.9rem', display: 'block' }}>{t('a11y_dyslexia_title')}</strong>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t('a11y_dyslexia_desc')}</span>
              </div>
              <input
                type="checkbox"
                checked={isDyslexic}
                onChange={(e) => setIsDyslexic(e.target.checked)}
                style={{ width: '20px', height: '20px', cursor: 'pointer', accentColor: 'var(--accent-primary)' }}
                id="dyslexia-toggle"
              />
            </div>

            {/* Colorblind Mode (Rot-Grün-Sehhilfe) */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ fontSize: '0.9rem', display: 'block' }}>{t('a11y_colorblind_title')}</strong>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t('a11y_colorblind_desc')}</span>
              </div>
              <input
                type="checkbox"
                checked={isColorblind}
                onChange={(e) => setIsColorblind(e.target.checked)}
                style={{ width: '20px', height: '20px', cursor: 'pointer', accentColor: 'var(--accent-primary)' }}
                id="colorblind-toggle"
              />
            </div>

            {/* High Contrast Mode */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ fontSize: '0.9rem', display: 'block' }}>{t('a11y_contrast_title')}</strong>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t('a11y_contrast_desc')}</span>
              </div>
              <input
                type="checkbox"
                checked={isHighContrast}
                onChange={(e) => setIsHighContrast(e.target.checked)}
                style={{ width: '20px', height: '20px', cursor: 'pointer', accentColor: 'var(--accent-primary)' }}
                id="high-contrast-toggle"
              />
            </div>

            {/* Reduced Motion Toggle */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ fontSize: '0.9rem', display: 'block' }}>{t('a11y_motion_title')}</strong>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t('a11y_motion_desc')}</span>
              </div>
              <input
                type="checkbox"
                checked={isReducedMotion}
                onChange={(e) => setIsReducedMotion(e.target.checked)}
                style={{ width: '20px', height: '20px', cursor: 'pointer', accentColor: 'var(--accent-primary)' }}
                id="reduced-motion-toggle"
              />
            </div>

            {/* Reset Button */}
            <button
              onClick={resetSettings}
              className="btn btn-secondary btn-sm"
              style={{ marginTop: '6px', width: '100%', gap: '6px' }}
            >
              <RotateCcw size={14} /> {t('a11y_reset')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
