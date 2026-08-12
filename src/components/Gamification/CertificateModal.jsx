import React from 'react';
import { Award, ShieldCheck, Download, X, CheckCircle2, Sparkles } from 'lucide-react';

export default function CertificateModal({ isOpen, onClose, userState }) {
  if (!isOpen) return null;

  const today = new Date().toLocaleDateString('de-DE', { year: 'numeric', month: 'long', day: 'numeric' });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(15, 23, 42, 0.85)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000,
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div
        className="glass-panel animate-fade-in"
        style={{
          maxWidth: '750px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          background: '#ffffff',
          color: '#0f172a',
          border: '4px double var(--accent-primary)',
          borderRadius: 'var(--radius-xl)',
          padding: '40px',
          boxShadow: 'var(--shadow-card)',
          position: 'relative',
          textAlign: 'center'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
          aria-label="Schließen"
        >
          <X size={24} />
        </button>

        {/* Certificate Watermark & Header */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, #4f46e5, #0d9488)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', boxShadow: '0 4px 15px rgba(79, 70, 229, 0.3)' }}>
            <Award size={36} />
          </div>
          <span style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', color: '#4f46e5' }}>
            Zertifikat über Informatik-Qualifikation
          </span>
          <h2 style={{ fontSize: '2.4rem', fontWeight: '900', color: '#0f172a', margin: '8px 0 0' }}>
            INFORMATIK-ZERTIFIKAT
          </h2>
          <div style={{ width: '120px', height: '3px', background: 'linear-gradient(135deg, #4f46e5, #0d9488)', margin: '12px auto' }}></div>
        </div>

        <p style={{ fontSize: '1.05rem', color: '#475569', margin: '20px 0' }}>
          Hiermit wird offiziell bescheinigt, dass
        </p>

        <h3 style={{ fontSize: '2rem', fontWeight: '800', color: '#0f172a', textDecoration: 'underline decoration-color #4f46e5', margin: '0 0 20px' }}>
          Developer (Nutzer ID #{userState.xp * 7})
        </h3>

        <p style={{ fontSize: '1rem', color: '#475569', maxWidth: '580px', margin: '0 auto 24px', lineHeight: '1.6' }}>
          erfolgreich die praxisnahen Module, Mini-Games und Wissensprüfungen im Rahmen des <strong>IT-DevGame Lern-Frameworks</strong> absolviert hat.
        </p>

        {/* Achievements Badge Grid */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '32px' }}>
          <div style={{ background: '#f1f5f9', padding: '10px 16px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem', fontWeight: 700 }}>
            🔥 Gesamte XP: {userState.xp} XP
          </div>
          <div style={{ background: '#f1f5f9', padding: '10px 16px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem', fontWeight: 700 }}>
            🏆 Erreichtes Level: Level {userState.level}
          </div>
          <div style={{ background: '#f1f5f9', padding: '10px 16px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem', fontWeight: 700 }}>
            📜 Absolvierte Lektionen: {userState.completedTopics.length}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '2px solid #e2e8f0', paddingTop: '20px', marginTop: '20px' }}>
          <div style={{ textAlign: 'left', fontSize: '0.85rem', color: '#64748b' }}>
            <strong>Datum:</strong> {today}<br />
            <strong>Verifikation:</strong> Validated by IT-DevGame Engine
          </div>

          <button
            className="btn btn-primary"
            onClick={handlePrint}
            style={{ gap: '8px' }}
          >
            <Download size={18} /> Zertifikat Drucken / Als PDF Speichern
          </button>
        </div>
      </div>
    </div>
  );
}
