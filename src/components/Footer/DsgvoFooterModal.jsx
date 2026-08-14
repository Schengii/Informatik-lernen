import React, { useState } from 'react';
import { Shield, FileText, ExternalLink, X } from 'lucide-react';

export default function DsgvoFooterModal() {
  const [activeModal, setActiveModal] = useState(null); // 'datenschutz' | 'impressum' | 'dsgvo' | null

  return (
    <footer
      style={{
        marginTop: '60px',
        borderTop: '1px solid var(--border-color)',
        padding: '30px 20px 40px',
        background: 'var(--bg-secondary)',
        color: 'var(--text-muted)',
        fontSize: '0.88rem'
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '24px',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, color: 'var(--text-main)', fontSize: '1rem', marginBottom: '6px' }}>
            <Shield size={20} style={{ color: 'var(--accent-teal)' }} />
            IT-DevGame | Informatik Lernplattform
          </div>
          <p style={{ margin: 0, fontSize: '0.82rem' }}>
            100% DSGVO-konform • Keine Tracking-Cookies • Alle Daten bleiben lokal auf deinem Gerät
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
          <button
            onClick={() => setActiveModal('dsgvo')}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.88rem', textDecoration: 'underline' }}
          >
            DSGVO & Datenschutz
          </button>
          <span>•</span>
          <button
            onClick={() => setActiveModal('impressum')}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.88rem', textDecoration: 'underline' }}
          >
            Impressum
          </button>
          <span>•</span>
          <a
            href="https://github.com/Schengii/Informatik-lernen"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--accent-primary)', display: 'inline-flex', alignItems: 'center', gap: '4px', textDecoration: 'none', fontWeight: 600 }}
          >
            GitHub Repository <ExternalLink size={14} />
          </a>
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
            backdropFilter: 'blur(4px)',
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
              maxWidth: '650px',
              width: '100%',
              maxHeight: '85vh',
              overflowY: 'auto',
              padding: '28px',
              position: 'relative',
              boxShadow: 'var(--shadow-card)',
              border: '2px solid var(--accent-primary)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveModal(null)}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
              aria-label="Schließen"
            >
              <X size={24} />
            </button>

            {activeModal === 'dsgvo' && (
              <div>
                <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', color: 'var(--text-main)' }}>
                  <Shield style={{ color: 'var(--accent-teal)' }} /> DSGVO & Datenschutzerklärung
                </h2>
                <div style={{ lineHeight: '1.7', fontSize: '0.92rem' }}>
                  <p style={{ marginBottom: '12px' }}>
                    <strong>1. Datenschutz auf einen Blick:</strong> Diese Anwendung speichert keinerlei personenbezogene Daten auf externen Servern. All deine Lernfortschritte, Erfahrungspunkte (XP) und Badges werden ausschließlich lokal im <code>localStorage</code> deines Browsers gespeichert.
                  </p>
                  <p style={{ marginBottom: '12px' }}>
                    <strong>2. Keine Tracking-Cookies:</strong> Wir verwenden keine Analyse-Tools (wie Google Analytics), keine Marketing-Cookies und keine Drittanbieter-Tracker.
                  </p>
                  <p style={{ marginBottom: '12px' }}>
                    <strong>3. Rechte der betroffenen Personen:</strong> Da sämtliche Daten lokal in deinem Browser verbleiben, hast du jederzeit die vollständige Kontrolle über deine Daten und kannst diese jederzeit über deine Browsereinstellungen (Lokale Speicherdaten löschen) entfernen.
                  </p>
                  <p style={{ marginBottom: '12px' }}>
                    <strong>4. Barrierefreiheit & WCAG compliance:</strong> Diese Plattform hält sich an die Richtlinien für barrierefreie Webinhalte (WCAG 2.1 Level AA/AAA) und bietet Spezialfunktionen für Nutzer mit Lese-Rechtschreib-Schwäche (Dyslexie) sowie Rot-Grün-Sehhilfe.
                  </p>
                </div>
              </div>
            )}

            {activeModal === 'impressum' && (
              <div>
                <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', color: 'var(--text-main)' }}>
                  <FileText style={{ color: 'var(--accent-primary)' }} /> Impressum
                </h2>
                <div style={{ lineHeight: '1.7', fontSize: '0.92rem' }}>
                  <p style={{ marginBottom: '12px' }}>
                    <strong>Angaben gemäß § 5 TMG:</strong>
                  </p>
                  <p style={{ marginBottom: '12px' }}>
                    IT-DevGame | Interaktive Informatik-Lernplattform<br />
                    Entwickelt als Open-Source Lernprojekt für angehende Fachinformatiker.
                  </p>
                  <p style={{ marginBottom: '12px' }}>
                    <strong>Projekt-Verantwortlicher:</strong> Schengii<br />
                    <strong>GitHub Repository:</strong> <a href="https://github.com/Schengii/Informatik-lernen" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-primary)' }}>https://github.com/Schengii/Informatik-lernen</a>
                  </p>
                  <p style={{ marginBottom: '12px' }}>
                    <strong>Haftungsausschluss:</strong> Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.
                  </p>
                </div>
              </div>
            )}

            <div style={{ marginTop: '24px', textAlign: 'right' }}>
              <button className="btn btn-primary btn-sm" onClick={() => setActiveModal(null)}>
                Schließen
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
