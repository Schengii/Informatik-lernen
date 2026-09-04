import React, { Suspense, lazy } from 'react';
import RoleSelectionModal from '../Onboarding/RoleSelectionModal';
import BadgesModal from '../Gamification/BadgesModal';
import GlossaryModal from '../Content/GlossaryModal';
import FlashcardsModal from '../Gamification/FlashcardsModal';

// Lazy: pulls in jspdf + html2canvas, only needed once the user opens it
const CertificateModal = lazy(() => import('../Gamification/CertificateModal'));
import BackupModal from '../Gamification/BackupModal';
import VocabularyTrainerModal from '../Content/VocabularyTrainerModal';
import DeploymentGuideModal from '../Content/DeploymentGuideModal';
import CommandPaletteModal from './CommandPaletteModal';
import AudioSettingsModal from './AudioSettingsModal';
import ErrorBoundary from '../ErrorBoundary';

// Kompakter Fallback für Modal-Abstürze: eine kleine, schließbare Notiz statt
// der großen Ganzseiten-Fallback-UI, die für Haupt-Content-Module gedacht ist.
const ModalCrashFallback = ({ retry }) => (
  <div
    role="alert"
    style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 9999,
      maxWidth: '320px',
      padding: '16px 18px',
      borderRadius: 'var(--radius-lg)',
      background: 'var(--bg-card)',
      border: '2px solid var(--accent-danger, #ef4444)',
      boxShadow: 'var(--shadow-card)'
    }}
  >
    <p style={{ margin: '0 0 10px 0', fontSize: '0.9rem', color: 'var(--text-main)' }}>
      Dieses Fenster ist abgestürzt und wurde geschlossen.
    </p>
    <button className="btn btn-secondary" onClick={retry} style={{ fontSize: '0.85rem' }}>
      Schließen
    </button>
  </div>
);

export default function ModalContainer({
  isRoleModalOpen,
  setIsRoleModalOpen,
  isBadgesModalOpen,
  setIsBadgesModalOpen,
  isGlossaryModalOpen,
  setIsGlossaryModalOpen,
  isCertificateModalOpen,
  setIsCertificateModalOpen,
  isFlashcardsModalOpen,
  setIsFlashcardsModalOpen,
  isBackupModalOpen,
  setIsBackupModalOpen,
  isVocabularyModalOpen,
  setIsVocabularyModalOpen,
  isDeploymentModalOpen,
  setIsDeploymentModalOpen,
  isCommandPaletteOpen,
  setIsCommandPaletteOpen,
  isAudioModalOpen,
  setIsAudioModalOpen,
  userState,
  handleSelectRole,
  refreshStateFromStorage,
  setActiveTab
}) {
  return (
    <>
      {/* Role / Profil Modal */}
      {isRoleModalOpen && (
        <ErrorBoundary fallback={({ retry }) => <ModalCrashFallback retry={() => { setIsRoleModalOpen(false); retry(); }} />}>
          <RoleSelectionModal
            isOpen={isRoleModalOpen}
            currentRole={userState.role}
            onSelectRole={(roleId) => {
              handleSelectRole(roleId);
              setIsRoleModalOpen(false);
            }}
            onClose={() => setIsRoleModalOpen(false)}
          />
        </ErrorBoundary>
      )}

      {/* Badges Modal */}
      {isBadgesModalOpen && (
        <ErrorBoundary fallback={({ retry }) => <ModalCrashFallback retry={() => { setIsBadgesModalOpen(false); retry(); }} />}>
          <BadgesModal
            isOpen={isBadgesModalOpen}
            unlockedBadges={userState.unlockedBadges}
            onClose={() => setIsBadgesModalOpen(false)}
          />
        </ErrorBoundary>
      )}

      {/* Glossary Modal */}
      {isGlossaryModalOpen && (
        <ErrorBoundary fallback={({ retry }) => <ModalCrashFallback retry={() => { setIsGlossaryModalOpen(false); retry(); }} />}>
          <GlossaryModal
            isOpen={isGlossaryModalOpen}
            onClose={() => setIsGlossaryModalOpen(false)}
          />
        </ErrorBoundary>
      )}

      {/* Certificate Modal */}
      {isCertificateModalOpen && (
        <ErrorBoundary fallback={({ retry }) => <ModalCrashFallback retry={() => { setIsCertificateModalOpen(false); retry(); }} />}>
          <Suspense fallback={null}>
            <CertificateModal
              isOpen={isCertificateModalOpen}
              userState={userState}
              onClose={() => setIsCertificateModalOpen(false)}
            />
          </Suspense>
        </ErrorBoundary>
      )}

      {/* Flashcards Modal */}
      {isFlashcardsModalOpen && (
        <ErrorBoundary fallback={({ retry }) => <ModalCrashFallback retry={() => { setIsFlashcardsModalOpen(false); retry(); }} />}>
          <FlashcardsModal
            isOpen={isFlashcardsModalOpen}
            onClose={() => setIsFlashcardsModalOpen(false)}
          />
        </ErrorBoundary>
      )}

      {/* Backup & Restore Modal */}
      {isBackupModalOpen && (
        <ErrorBoundary fallback={({ retry }) => <ModalCrashFallback retry={() => { setIsBackupModalOpen(false); retry(); }} />}>
          <BackupModal
            isOpen={isBackupModalOpen}
            onClose={() => setIsBackupModalOpen(false)}
            onDataImported={refreshStateFromStorage}
          />
        </ErrorBoundary>
      )}

      {/* Vocabulary Modal */}
      {isVocabularyModalOpen && (
        <ErrorBoundary fallback={({ retry }) => <ModalCrashFallback retry={() => { setIsVocabularyModalOpen(false); retry(); }} />}>
          <Suspense fallback={null}>
            <VocabularyTrainerModal
              isOpen={isVocabularyModalOpen}
              onClose={() => setIsVocabularyModalOpen(false)}
            />
          </Suspense>
        </ErrorBoundary>
      )}

      {/* Deployment Guide Modal */}
      {isDeploymentModalOpen && (
        <ErrorBoundary fallback={({ retry }) => <ModalCrashFallback retry={() => { setIsDeploymentModalOpen(false); retry(); }} />}>
          <Suspense fallback={null}>
            <DeploymentGuideModal
              isOpen={isDeploymentModalOpen}
              onClose={() => setIsDeploymentModalOpen(false)}
            />
          </Suspense>
        </ErrorBoundary>
      )}

      {/* Command Palette (Ctrl+K) */}
      <ErrorBoundary fallback={({ retry }) => <ModalCrashFallback retry={() => { setIsCommandPaletteOpen(false); retry(); }} />}>
        <CommandPaletteModal
          isOpen={isCommandPaletteOpen}
          onClose={() => setIsCommandPaletteOpen(false)}
          onNavigate={(tab) => {
            setActiveTab(tab);
            setIsCommandPaletteOpen(false);
          }}
        />
      </ErrorBoundary>

      {/* Audio Settings Modal */}
      <ErrorBoundary fallback={({ retry }) => <ModalCrashFallback retry={() => { setIsAudioModalOpen(false); retry(); }} />}>
        <AudioSettingsModal
          isOpen={isAudioModalOpen}
          onClose={() => setIsAudioModalOpen(false)}
        />
      </ErrorBoundary>
    </>
  );
}
