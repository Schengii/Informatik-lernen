import React, { Suspense } from 'react';
import RoleSelectionModal from '../Onboarding/RoleSelectionModal';
import BadgesModal from '../Gamification/BadgesModal';
import GlossaryModal from '../Content/GlossaryModal';
import CertificateModal from '../Gamification/CertificateModal';
import FlashcardsModal from '../Gamification/FlashcardsModal';
import BackupModal from '../Gamification/BackupModal';
import VocabularyTrainerModal from '../Content/VocabularyTrainerModal';
import DeploymentGuideModal from '../Content/DeploymentGuideModal';
import CommandPaletteModal from './CommandPaletteModal';
import AudioSettingsModal from './AudioSettingsModal';

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
        <RoleSelectionModal
          isOpen={isRoleModalOpen}
          currentRole={userState.role}
          onSelectRole={(roleId) => {
            handleSelectRole(roleId);
            setIsRoleModalOpen(false);
          }}
          onClose={() => setIsRoleModalOpen(false)}
        />
      )}

      {/* Badges Modal */}
      {isBadgesModalOpen && (
        <BadgesModal
          isOpen={isBadgesModalOpen}
          unlockedBadges={userState.unlockedBadges}
          onClose={() => setIsBadgesModalOpen(false)}
        />
      )}

      {/* Glossary Modal */}
      {isGlossaryModalOpen && (
        <GlossaryModal
          isOpen={isGlossaryModalOpen}
          onClose={() => setIsGlossaryModalOpen(false)}
        />
      )}

      {/* Certificate Modal */}
      {isCertificateModalOpen && (
        <CertificateModal
          isOpen={isCertificateModalOpen}
          userState={userState}
          onClose={() => setIsCertificateModalOpen(false)}
        />
      )}

      {/* Flashcards Modal */}
      {isFlashcardsModalOpen && (
        <FlashcardsModal
          isOpen={isFlashcardsModalOpen}
          onClose={() => setIsFlashcardsModalOpen(false)}
        />
      )}

      {/* Backup & Restore Modal */}
      {isBackupModalOpen && (
        <BackupModal
          isOpen={isBackupModalOpen}
          onClose={() => setIsBackupModalOpen(false)}
          onDataImported={refreshStateFromStorage}
        />
      )}

      {/* Vocabulary Modal */}
      {isVocabularyModalOpen && (
        <Suspense fallback={null}>
          <VocabularyTrainerModal
            isOpen={isVocabularyModalOpen}
            onClose={() => setIsVocabularyModalOpen(false)}
          />
        </Suspense>
      )}

      {/* Deployment Guide Modal */}
      {isDeploymentModalOpen && (
        <Suspense fallback={null}>
          <DeploymentGuideModal
            isOpen={isDeploymentModalOpen}
            onClose={() => setIsDeploymentModalOpen(false)}
          />
        </Suspense>
      )}

      {/* Command Palette (Ctrl+K) */}
      <CommandPaletteModal
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigate={(tab) => {
          setActiveTab(tab);
          setIsCommandPaletteOpen(false);
        }}
      />

      {/* Audio Settings Modal */}
      <AudioSettingsModal
        isOpen={isAudioModalOpen}
        onClose={() => setIsAudioModalOpen(false)}
      />
    </>
  );
}
