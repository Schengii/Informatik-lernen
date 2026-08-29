import React, { useState, useMemo } from 'react';
import {
  Key, Shield, Fingerprint
} from 'lucide-react';
import {
  generateRegistrationChallenge,
  simulatePasskeyCreation,
  verifyPasskeyAssertion
} from '../../utils/webauthnPasskeyEngine';
import { useStore } from '../../store/useStore';
import { triggerHaptic } from '../../utils/haptics';

export default function WebauthnPasskeyLab({ onRewardXP }) {
  const { awardXP } = useStore();
  const [userName] = useState('it-azubi@firma.de');
  const [step, setStep] = useState(1); // 1: Challenge, 2: Created, 3: Verified
  const [createdCred, setCreatedCred] = useState(null);
  const [solved, setSolved] = useState(false);

  const challengeOpts = useMemo(() => {
    return generateRegistrationChallenge({ userName });
  }, [userName]);

  const handleCreatePasskey = () => {
    triggerHaptic('SELECTION');
    const cred = simulatePasskeyCreation(challengeOpts);
    setCreatedCred(cred);
    setStep(2);
  };

  const handleVerify = () => {
    triggerHaptic('LEVEL_UP');
    verifyPasskeyAssertion(createdCred, challengeOpts.challenge);
    setStep(3);
    if (!solved) {
      setSolved(true);
      if (onRewardXP) {
        onRewardXP(45);
      } else {
        awardXP(45, 'webauthn_passkey_master');
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
              <Key size={14} /> FIDO2 &amp; Passwordless Auth
            </span>
            <span className="badge badge-emerald" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Fingerprint size={14} /> WebAuthn Passkeys
            </span>
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, color: 'var(--text-main)' }}>
            🔑 WebAuthn / Passkeys &amp; FIDO2 Flow Visualizer
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginTop: '6px', maxWidth: '750px' }}>
            Erlebe die passwortlose Authentifizierung: Asymmetrische Schlüsselpaare (ES256), Authenticator Flags (UP, UV, BE, BS) und kryptografische Challenge-Signaturen.
          </p>
        </div>

        {step === 1 && (
          <button
            onClick={handleCreatePasskey}
            className="btn btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px', fontWeight: 'bold' }}
          >
            <Fingerprint size={16} /> Passkey Registrieren (Biometrie)
          </button>
        )}

        {step === 2 && (
          <button
            onClick={handleVerify}
            className="btn btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px', fontWeight: 'bold' }}
          >
            <Shield size={16} /> Login Verifizieren (+45 XP)
          </button>
        )}
      </div>

      {/* Flow Progress Step Bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '24px' }}>
        <div style={{ background: 'var(--bg-secondary)', padding: '14px', borderRadius: '10px', border: step >= 1 ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Schritt 1</span>
          <div style={{ fontWeight: 'bold', fontSize: '0.95rem', marginTop: '2px' }}>1. Challenge &amp; RP-Options</div>
        </div>

        <div style={{ background: 'var(--bg-secondary)', padding: '14px', borderRadius: '10px', border: step >= 2 ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Schritt 2</span>
          <div style={{ fontWeight: 'bold', fontSize: '0.95rem', marginTop: '2px' }}>2. Authenticator Key Pair</div>
        </div>

        <div style={{ background: 'var(--bg-secondary)', padding: '14px', borderRadius: '10px', border: step === 3 ? '1px solid #10b981' : '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Schritt 3</span>
          <div style={{ fontWeight: 'bold', fontSize: '0.95rem', marginTop: '2px', color: step === 3 ? '#10b981' : 'var(--text-main)' }}>
            3. Assertion Signatur &amp; Auth
          </div>
        </div>
      </div>

      {/* JSON Payload Inspection Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {/* Registration Options */}
        <div style={{ background: 'var(--bg-secondary)', padding: '18px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-muted)', display: 'block', marginBottom: '10px' }}>
            Relying Party (RP) Challenge Payload:
          </span>
          <pre
            style={{
              margin: 0,
              padding: '12px',
              background: 'var(--bg-primary)',
              color: '#38bdf8',
              borderRadius: '8px',
              fontFamily: 'monospace',
              fontSize: '0.8rem',
              maxHeight: '260px',
              overflowY: 'auto'
            }}
          >
            {JSON.stringify(challengeOpts, null, 2)}
          </pre>
        </div>

        {/* Authenticator Response */}
        <div style={{ background: 'var(--bg-secondary)', padding: '18px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-muted)', display: 'block', marginBottom: '10px' }}>
            Authenticator Response &amp; Flags:
          </span>

          {createdCred ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ background: 'var(--bg-primary)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Credential ID:</span>
                <code style={{ color: '#10b981', fontSize: '0.82rem' }}>{createdCred.id}</code>
              </div>

              <div style={{ background: 'var(--bg-primary)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>AuthData Flags:</span>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  <span className="badge badge-emerald">UP: User Present</span>
                  <span className="badge badge-emerald">UV: User Verified</span>
                  <span className="badge badge-indigo">BE: Backup Eligible</span>
                  <span className="badge badge-indigo">BS: Backup State</span>
                </div>
              </div>

              {step === 3 && (
                <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10b981', padding: '12px', borderRadius: '8px', color: '#10b981', fontSize: '0.85rem', fontWeight: 'bold' }}>
                  ✅ Login Erfolgreich: Signatur mit Public Key validiert. Kein Passwort übertragen!
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '180px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              (Klicke oben auf &apos;Passkey Registrieren&apos;)
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
