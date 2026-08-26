import React, { useState } from 'react';
import { Shield, FileText, ExternalLink, X, Heart, Code2, GitBranch, HelpCircle } from 'lucide-react';
import { useTranslation } from '../../utils/i18n';

export default function DsgvoFooterModal() {
  const { t } = useTranslation();
  const [activeModal, setActiveModal] = useState(null); // 'datenschutz' | 'impressum' | 'dsgvo' | 'faq' | null

  return (
    <footer
      style={{
        marginTop: '80px',
        borderTop: '1px solid var(--border-color)',
        background: 'var(--bg-secondary)',
        color: 'var(--text-muted)',
        fontSize: '0.88rem',
        padding: '50px 20px 30px'
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Main Footer Grid */}
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
            gap: '36px',
            marginBottom: '40px'
          }}
        >
          {/* Column 1: Brand & Mission */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '8px',
                  background: 'var(--gradient-cyber)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff'
                }}
              >
                <Code2 size={18} />
              </div>
              <span style={{ fontWeight: 800, fontSize: '1.15rem', color: 'var(--text-main)' }}>
                IT-DEVGAME
              </span>
            </div>
            <p style={{ lineHeight: '1.6', fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              {t('footer_tagline')}
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 10px', borderRadius: '6px', background: 'rgba(13, 148, 136, 0.1)', color: 'var(--accent-teal)', fontSize: '0.78rem', fontWeight: 700 }}>
              <Shield size={14} /> {t('footer_gdpr_badge')}
            </div>
          </div>

          {/* Column 2: Schnelleinstieg & Kurse */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              {t('footer_col2_heading')}
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.84rem' }}>
              <li>
                <a href="#dashboard" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.15s ease' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-primary)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                  {t('footer_link_beginner')}
                </a>
              </li>
              <li>
                <a href="#campaign" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.15s ease' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-primary)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                  {t('footer_link_campaign')}
                </a>
              </li>
              <li>
                <a href="#exam" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.15s ease' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-primary)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                  {t('footer_link_exam')}
                </a>
              </li>
              <li>
                <a href="#languages" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.15s ease' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-primary)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                  {t('footer_link_languages')}
                </a>
              </li>
              <li>
                <a href="#ai_business" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.15s ease' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-primary)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                  {t('footer_link_ai')}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Interaktive Simulatoren */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              {t('footer_col3_heading')}
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.84rem' }}>
              <li>
                <a href="#cpu_architecture_lab" style={{ color: 'var(--text-muted)', textDecoration: 'none' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-primary)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                  {t('footer_link_cpu')}
                </a>
              </li>
              <li>
                <a href="#sql_optimizer_lab" style={{ color: 'var(--text-muted)', textDecoration: 'none' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-primary)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                  {t('footer_link_sql_optimizer')}
                </a>
              </li>
              <li>
                <a href="#git_graph_lab" style={{ color: 'var(--text-muted)', textDecoration: 'none' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-primary)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                  {t('footer_link_git')}
                </a>
              </li>
              <li>
                <a href="#docker" style={{ color: 'var(--text-muted)', textDecoration: 'none' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-primary)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                  {t('footer_link_docker')}
                </a>
              </li>
              <li>
                <a href="#oral_exam" style={{ color: 'var(--text-muted)', textDecoration: 'none' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-primary)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                  {t('footer_link_oral_exam')}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Externe Quellen & Community */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              {t('footer_col4_heading')}
            </h4>
            <p style={{ fontSize: '0.82rem', lineHeight: '1.6', marginBottom: '14px' }}>
              {t('footer_col4_text')}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.84rem' }}>
              <a
                href="https://github.com/Schengii/Informatik-lernen"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--accent-primary)', display: 'inline-flex', alignItems: 'center', gap: '6px', textDecoration: 'none', fontWeight: 700 }}
              >
                <GitBranch size={16} /> {t('footer_github')} <ExternalLink size={13} />
              </a>
              <button
                onClick={() => setActiveModal('faq')}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', textAlign: 'left', padding: 0, fontSize: '0.84rem' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--text-main)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
              >
                {t('footer_faq_link')}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Rechtliches */}
        <div
          style={{
            borderTop: '1px solid var(--border-color)',
            paddingTop: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            fontSize: '0.82rem'
          }}
        >
          <div>
            © {new Date().getFullYear()} <strong>IT-DevGame</strong> • {t('footer_copyright_prefix')} <Heart size={13} style={{ color: 'var(--accent-rose)', display: 'inline', verticalAlign: 'middle' }} /> {t('footer_copyright_suffix')}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setActiveModal('dsgvo')}
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.82rem', textDecoration: 'underline' }}
            >
              {t('footer_gdpr_link')}
            </button>
            <span>•</span>
            <button
              onClick={() => setActiveModal('impressum')}
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.82rem', textDecoration: 'underline' }}
            >
              {t('footer_impressum_link')}
            </button>
            <span>•</span>
            <button
              onClick={() => setActiveModal('faq')}
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.82rem', textDecoration: 'underline' }}
            >
              {t('footer_faq_bottom')}
            </button>
          </div>
        </div>
      </div>

      {/* Modal Dialogs */}
      {activeModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(6px)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => setActiveModal(null)}
        >
          <div
            className="glass-panel animate-fade-in"
            style={{
              background: 'var(--bg-card)',
              color: 'var(--text-main)',
              maxWidth: '680px',
              width: '100%',
              maxHeight: '85vh',
              overflowY: 'auto',
              padding: '30px',
              position: 'relative',
              boxShadow: 'var(--shadow-card)',
              border: '2px solid var(--accent-primary)',
              borderRadius: 'var(--radius-xl)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveModal(null)}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
              aria-label={t('a11y_close')}
            >
              <X size={22} />
            </button>

            {activeModal === 'dsgvo' && (
              <div>
                <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', color: 'var(--text-main)', fontSize: '1.4rem' }}>
                  <Shield style={{ color: 'var(--accent-teal)' }} /> {t('footer_dsgvo_title')}
                </h2>
                <div style={{ lineHeight: '1.7', fontSize: '0.9rem' }}>
                  <p style={{ marginBottom: '12px' }}>
                    <strong>{t('footer_dsgvo_p1_label')}</strong> {t('footer_dsgvo_p1_text')}
                  </p>
                  <p style={{ marginBottom: '12px' }}>
                    <strong>{t('footer_dsgvo_p2_label')}</strong> {t('footer_dsgvo_p2_text')}
                  </p>
                  <p style={{ marginBottom: '12px' }}>
                    <strong>{t('footer_dsgvo_p3_label')}</strong> {t('footer_dsgvo_p3_text')}
                  </p>
                  <p style={{ marginBottom: '12px' }}>
                    <strong>{t('footer_dsgvo_p4_label')}</strong> {t('footer_dsgvo_p4_text')}
                  </p>
                </div>
              </div>
            )}

            {activeModal === 'impressum' && (
              <div>
                <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', color: 'var(--text-main)', fontSize: '1.4rem' }}>
                  <FileText style={{ color: 'var(--accent-primary)' }} /> {t('footer_impressum_title')}
                </h2>
                <div style={{ lineHeight: '1.7', fontSize: '0.9rem' }}>
                  <p style={{ marginBottom: '12px' }}>
                    <strong>{t('footer_impressum_intro')}</strong>
                  </p>
                  <p style={{ marginBottom: '12px' }}>
                    <strong>{t('footer_impressum_project_label')}</strong> {t('footer_impressum_project_value')}<br />
                    <strong>{t('footer_impressum_operator_label')}</strong> Schengii<br />
                    <strong>{t('footer_impressum_repo_label')}</strong> <a href="https://github.com/Schengii/Informatik-lernen" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-primary)' }}>https://github.com/Schengii/Informatik-lernen</a>
                  </p>
                  <p style={{ marginBottom: '12px' }}>
                    <strong>{t('footer_impressum_liability_label')}</strong> {t('footer_impressum_liability_text')}
                  </p>
                </div>
              </div>
            )}

            {activeModal === 'faq' && (
              <div>
                <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', color: 'var(--text-main)', fontSize: '1.4rem' }}>
                  <HelpCircle style={{ color: 'var(--accent-amber)' }} /> {t('footer_faq_title')}
                </h2>
                <div style={{ lineHeight: '1.7', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div>
                    <strong>{t('footer_faq_q1')}</strong>
                    <p style={{ color: 'var(--text-muted)', marginTop: '2px' }}>
                      {t('footer_faq_a1')}
                    </p>
                  </div>
                  <div>
                    <strong>{t('footer_faq_q2')}</strong>
                    <p style={{ color: 'var(--text-muted)', marginTop: '2px' }}>
                      {t('footer_faq_a2')}
                    </p>
                  </div>
                  <div>
                    <strong>{t('footer_faq_q3')}</strong>
                    <p style={{ color: 'var(--text-muted)', marginTop: '2px' }}>
                      {t('footer_faq_a3')}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div style={{ marginTop: '24px', textAlign: 'right' }}>
              <button className="btn btn-primary btn-sm" onClick={() => setActiveModal(null)}>
                {t('footer_close')}
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
