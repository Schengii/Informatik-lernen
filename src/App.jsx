import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import Navbar from './components/Navigation/Navbar';
import MobileNav from './components/Navigation/MobileNav';
import RoleSelectionModal from './components/Onboarding/RoleSelectionModal';
import TopicReader from './components/Content/TopicReader';
import ClozeTester from './components/Content/ClozeTester';
import VideoHub from './components/Content/VideoHub';
import SqlDungeon from './components/Games/SqlDungeon';
import SecurityLab from './components/Games/SecurityLab';
import CodePuzzle from './components/Games/CodePuzzle';
import LogicGatesGame from './components/Games/LogicGatesGame';
import WebSandbox from './components/Games/WebSandbox';
import RegexLab from './components/Games/RegexLab';
import CliTerminalLab from './components/Games/CliTerminalLab';
import BossBattleGame from './components/Games/BossBattleGame';
import CodeTypingSpeedrun from './components/Games/CodeTypingSpeedrun';
import ProjectViewer from './components/Projects/ProjectViewer';
import BadgesModal from './components/Gamification/BadgesModal';
import DsgvoFooterModal from './components/Footer/DsgvoFooterModal';
import DifficultyFilterBar from './components/Navigation/DifficultyFilterBar';
import GlossaryModal from './components/Content/GlossaryModal';
import ExamSimulator from './components/Content/ExamSimulator';
import SkillMatrixWidget from './components/Gamification/SkillMatrixWidget';
import CertificateModal from './components/Gamification/CertificateModal';
import DailyChallengeWidget from './components/Gamification/DailyChallengeWidget';
import FlashcardsModal from './components/Gamification/FlashcardsModal';
import BackupModal from './components/Gamification/BackupModal';

import LanguageAcademy from './components/Content/LanguageAcademy';
import AiPromptLab from './components/Content/AiPromptLab';
import ToolingSetupGuide from './components/Content/ToolingSetupGuide';
import AppWorkshop from './components/Content/AppWorkshop';
import VocabularyTrainerModal from './components/Content/VocabularyTrainerModal';
import KnowledgeQuizArena from './components/Content/KnowledgeQuizArena';
import CareerRoadmap from './components/Content/CareerRoadmap';
import BigOVisualizer from './components/Content/BigOVisualizer';
import ArchitectureVisualizer from './components/Content/ArchitectureVisualizer';
import DesignPatternsLab from './components/Content/DesignPatternsLab';
import TddUnitTestLab from './components/Content/TddUnitTestLab';
import DeploymentGuideModal from './components/Content/DeploymentGuideModal';

import { loadUserState, saveUserState, calculateLevel } from './utils/storage';
import { USER_ROLES } from './data/userProfiles';
import { TOPICS } from './data/topicsData';

import { BookOpen, Sparkles, ArrowRight, CheckCircle, BookMarked, Compass, Activity, Network, Layers, Keyboard, Rocket } from 'lucide-react';

export default function App() {
  const [userState, setUserState] = useState(loadUserState());
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(!userState.role);
  const [isBadgesModalOpen, setIsBadgesModalOpen] = useState(false);
  const [isGlossaryModalOpen, setIsGlossaryModalOpen] = useState(false);
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);
  const [isFlashcardsModalOpen, setIsFlashcardsModalOpen] = useState(false);
  const [isBackupModalOpen, setIsBackupModalOpen] = useState(false);
  const [isVocabularyModalOpen, setIsVocabularyModalOpen] = useState(false);
  const [isDeploymentModalOpen, setIsDeploymentModalOpen] = useState(false);

  const [lang, setLang] = useState('de');
  const [activeTab, setActiveTab] = useState('dashboard');

  // Accessibility State & Theme (Light / Dark)
  const [theme, setTheme] = useState('light');
  const [fontSize, setFontSize] = useState(100);
  const [isDyslexic, setIsDyslexic] = useState(false);
  const [isColorblind, setIsColorblind] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Difficulty Filter State ('all' | 'Einsteiger' | 'Azubi / IHK' | 'Senior / Expert')
  const [difficultyFilter, setDifficultyFilter] = useState('all');

  // Topic Reader state
  const [selectedTopicId, setSelectedTopicId] = useState(null);

  // Active Mini-Game Selector ('sql' | 'security' | 'boss' | 'typing_speedrun' | 'cli' | 'regex' | 'puzzle' | 'logic' | 'sandbox')
  const [activeGameId, setActiveGameId] = useState('sql');

  // Apply Theme & Accessibility Classes to <body>
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.fontSize = `${fontSize}%`;

    if (isDyslexic) {
      document.body.classList.add('dyslexia-mode');
    } else {
      document.body.classList.remove('dyslexia-mode');
    }

    if (isColorblind) {
      document.body.classList.add('colorblind-mode');
    } else {
      document.body.classList.remove('colorblind-mode');
    }

    if (isHighContrast) {
      document.body.classList.add('high-contrast-mode');
    } else {
      document.body.classList.remove('high-contrast-mode');
    }
  }, [theme, fontSize, isDyslexic, isColorblind, isHighContrast]);

  // Save user state on change
  useEffect(() => {
    saveUserState(userState);
  }, [userState]);

  const refreshStateFromStorage = () => {
    setUserState(loadUserState());
  };

  // Handle Role Select
  const handleSelectRole = (roleId) => {
    setUserState((prev) => ({
      ...prev,
      role: roleId
    }));
  };

  // Award XP and trigger Confetti
  const awardXP = (amount, achievementId = null) => {
    if (!isReducedMotion) {
      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      } catch (e) {}
    }

    setUserState((prev) => {
      const newXP = prev.xp + amount;
      const newLevel = calculateLevel(newXP);
      const unlocked = [...prev.unlockedBadges];
      if (achievementId && !unlocked.includes(achievementId)) {
        unlocked.push(achievementId);
      }
      return {
        ...prev,
        xp: newXP,
        level: newLevel,
        unlockedBadges: unlocked
      };
    });
  };

  const handleCompleteTopic = (topicId, xp) => {
    if (!userState.completedTopics.includes(topicId)) {
      setUserState((prev) => ({ ...prev, completedTopics: [...prev.completedTopics, topicId] }));
      awardXP(xp, 'first_steps');
    }
  };

  const currentRole = USER_ROLES[userState.role] || USER_ROLES.anfaenger;

  // Filter Topics by Difficulty
  const filteredTopics = TOPICS.filter((t) => {
    if (difficultyFilter === 'all') return true;
    return t.difficultyLevel === difficultyFilter;
  });

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-primary)', color: 'var(--text-main)' }}>
      {/* Top Navbar */}
      <Navbar
        userState={userState}
        onOpenProfileModal={() => setIsRoleModalOpen(true)}
        onOpenBadgesModal={() => setIsBadgesModalOpen(true)}
        onOpenGlossaryModal={() => setIsGlossaryModalOpen(true)}
        onOpenCertificateModal={() => setIsCertificateModalOpen(true)}
        onOpenFlashcardsModal={() => setIsFlashcardsModalOpen(true)}
        onOpenVocabularyModal={() => setIsVocabularyModalOpen(true)}
        onOpenBackupModal={() => setIsBackupModalOpen(true)}
        onOpenDeploymentModal={() => setIsDeploymentModalOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        lang={lang}
        setLang={setLang}
        fontSize={fontSize}
        setFontSize={setFontSize}
        isDyslexic={isDyslexic}
        setIsDyslexic={setIsDyslexic}
        isColorblind={isColorblind}
        setIsColorblind={setIsColorblind}
        isHighContrast={isHighContrast}
        setIsHighContrast={setIsHighContrast}
        isReducedMotion={isReducedMotion}
        setIsReducedMotion={setIsReducedMotion}
        theme={theme}
        setTheme={setTheme}
      />

      {/* Main Content Area */}
      <main style={{ flex: 1, maxWidth: '1280px', width: '100%', margin: '0 auto', padding: '24px 20px 40px 20px' }}>
        {/* DASHBOARD TAB */}
        {activeTab === 'dashboard' && (
          <div>
            {/* Hero Welcome Banner */}
            <div
              className="glass-panel"
              style={{
                padding: '36px',
                borderRadius: 'var(--radius-xl)',
                background: 'var(--bg-card)',
                border: '2px solid var(--accent-primary)',
                marginBottom: '32px',
                boxShadow: 'var(--shadow-card)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
                <div>
                  <span className="badge badge-indigo" style={{ marginBottom: '12px' }}>
                    <Sparkles size={14} /> Aktuelles Level & Zielgruppe: {currentRole.title}
                  </span>
                  <h1 style={{ fontSize: '2.4rem', fontWeight: '800', margin: '8px 0', color: 'var(--text-main)' }}>
                    Willkommen zurück, <span className="text-gradient">Developer</span>!
                  </h1>
                  <p style={{ color: 'var(--text-muted)', maxWidth: '680px', fontSize: '1.05rem', lineHeight: '1.6' }}>
                    {currentRole.description}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <button
                    className="btn btn-primary"
                    onClick={() => setIsRoleModalOpen(true)}
                    style={{ minHeight: '48px', fontSize: '0.95rem' }}
                  >
                    Profil / Level Anpassen
                  </button>

                  <button
                    className="btn btn-secondary"
                    onClick={() => setIsDeploymentModalOpen(true)}
                    style={{ minHeight: '48px', fontSize: '0.95rem', borderColor: 'var(--accent-amber)', color: 'var(--accent-amber)' }}
                  >
                    <Rocket size={18} /> Live Deployment Guide
                  </button>
                </div>
              </div>
            </div>

            {/* Daily Challenge Widget */}
            <DailyChallengeWidget onCompleteChallenge={(xp) => awardXP(xp, 'daily_master')} />

            {/* Skill Matrix Visualizer */}
            <SkillMatrixWidget userState={userState} />

            {/* Feature Modules Quick Access Grid */}
            <h2 style={{ fontSize: '1.6rem', fontWeight: '800', marginBottom: '20px', color: 'var(--text-main)' }}>
              Empfohlene Lernbereiche für dich
            </h2>

            <div className="grid-responsive" style={{ marginBottom: '40px' }}>
              {/* TDD Card */}
              <div
                className="glass-panel glass-panel-hover"
                onClick={() => setActiveTab('tdd')}
                style={{ padding: '24px', cursor: 'pointer', border: '1px solid var(--border-color)' }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🧪</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px', color: 'var(--text-main)' }}>Unit-Tests & TDD Lab</h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: '1.5' }}>
                  Schreibe und repariere automatizierte Jest Unit Tests.
                </p>
                <span style={{ fontSize: '0.9rem', color: 'var(--accent-indigo)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  TDD Starten <ArrowRight size={16} />
                </span>
              </div>

              {/* Architecture Card */}
              <div
                className="glass-panel glass-panel-hover"
                onClick={() => setActiveTab('architecture')}
                style={{ padding: '24px', cursor: 'pointer', border: '1px solid var(--border-color)' }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🌐</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px', color: 'var(--text-main)' }}>Systemarchitektur</h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: '1.5' }}>
                  Microservices, API Gateways, Redis Cache & Caching interaktiv verstehen.
                </p>
                <span style={{ fontSize: '0.9rem', color: 'var(--accent-primary)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  Architektur Starten <ArrowRight size={16} />
                </span>
              </div>
            </div>
          </div>
        )}

        {/* TDD UNIT TESTING TAB */}
        {activeTab === 'tdd' && <TddUnitTestLab onRewardXP={(xp) => awardXP(xp, 'tdd_master')} />}

        {/* SYSTEM ARCHITECTURE TAB */}
        {activeTab === 'architecture' && <ArchitectureVisualizer />}

        {/* DESIGN PATTERNS TAB */}
        {activeTab === 'design_patterns' && <DesignPatternsLab />}

        {/* CAREER ROADMAPS TAB */}
        {activeTab === 'roadmaps' && <CareerRoadmap userState={userState} />}

        {/* BIG-O VISUALIZER TAB */}
        {activeTab === 'big_o' && <BigOVisualizer />}

        {/* WISSENS QUIZ ARENA TAB */}
        {activeTab === 'quiz_arena' && (
          <KnowledgeQuizArena onRewardXP={(xp) => awardXP(xp, 'quiz_master')} />
        )}

        {/* SPRACHEN ACADEMY TAB */}
        {activeTab === 'languages' && <LanguageAcademy />}

        {/* KI-LAB TAB */}
        {activeTab === 'ai' && <AiPromptLab />}

        {/* IDE & TOOLS SETUP TAB */}
        {activeTab === 'tooling' && <ToolingSetupGuide />}

        {/* APP-WORKSHOP TAB */}
        {activeTab === 'app_workshop' && (
          <AppWorkshop onCompleteWorkshop={(xp) => awardXP(xp, 'app_builder')} />
        )}

        {/* WISSEN & FACHKUNDE TAB */}
        {activeTab === 'wissen' && (
          <div>
            {selectedTopicId ? (
              <TopicReader
                topicId={selectedTopicId}
                onBack={() => setSelectedTopicId(null)}
                onCompleteTopic={handleCompleteTopic}
                isCompleted={userState.completedTopics.includes(selectedTopicId)}
              />
            ) : (
              <div>
                <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-main)' }}>
                  <BookOpen size={30} style={{ color: 'var(--accent-primary)' }} /> Fachkunde & Wissensmodule
                </h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '20px', fontSize: '1.05rem' }}>
                  Gefiltert nach Vorwissen, Alter und Erfahrung.
                </p>

                <DifficultyFilterBar
                  activeFilter={difficultyFilter}
                  onSelectFilter={(filterId) => setDifficultyFilter(filterId)}
                />

                <div className="grid-responsive">
                  {filteredTopics.map((topic) => {
                    const isDone = userState.completedTopics.includes(topic.id);
                    return (
                      <div
                        key={topic.id}
                        className="glass-panel glass-panel-hover"
                        onClick={() => setSelectedTopicId(topic.id)}
                        style={{ padding: '24px', cursor: 'pointer', border: '1px solid var(--border-color)' }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                          <span className="badge badge-indigo">{topic.difficultyLevel || topic.category}</span>
                          {isDone && <CheckCircle size={20} style={{ color: 'var(--accent-emerald)' }} />}
                        </div>
                        <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '8px', color: 'var(--text-main)' }}>
                          {topic.icon} {topic.title}
                        </h3>
                        <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: '1.5' }}>
                          {topic.summary}
                        </p>
                        <span style={{ fontSize: '0.9rem', color: 'var(--accent-primary)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          Artikel Lesen <ArrowRight size={16} />
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* GAMES TAB */}
        {activeTab === 'games' && (
          <div>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', overflowX: 'auto', paddingBottom: '6px' }}>
              {[
                { id: 'sql', label: '🗄️ SQL Dungeon' },
                { id: 'security', label: '🛡️ Cyber Defense Lab' },
                { id: 'boss', label: '⚔️ Code Duel Boss Battle' },
                { id: 'typing_speedrun', label: '⌨️ Code Speedrun WPM' },
                { id: 'cli', label: '💻 Terminal CLI Lab' },
                { id: 'regex', label: '🔍 RegEx Lab' },
                { id: 'puzzle', label: '🧩 Code Bug Hunter' },
                { id: 'logic', label: '⚡ Logikgatter Simulator' },
                { id: 'sandbox', label: '🌐 Live Web Sandbox' }
              ].map((g) => (
                <button
                  key={g.id}
                  onClick={() => setActiveGameId(g.id)}
                  style={{
                    minHeight: '44px',
                    padding: '10px 20px',
                    borderRadius: 'var(--radius-md)',
                    fontWeight: '700',
                    fontSize: '0.92rem',
                    background: activeGameId === g.id ? 'var(--accent-primary)' : 'var(--bg-card)',
                    color: activeGameId === g.id ? '#ffffff' : 'var(--text-main)',
                    border: activeGameId === g.id ? '2px solid var(--accent-primary)' : '2px solid var(--border-color)',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {g.label}
                </button>
              ))}
            </div>

            {activeGameId === 'sql' && <SqlDungeon onCompleteGame={(id, xp) => awardXP(xp, 'sql_master')} />}
            {activeGameId === 'security' && <SecurityLab onCompleteGame={(id, xp) => awardXP(xp, 'security_expert')} />}
            {activeGameId === 'boss' && <BossBattleGame onCompleteGame={(id, xp) => awardXP(xp, 'boss_slayer')} />}
            {activeGameId === 'typing_speedrun' && <CodeTypingSpeedrun onCompleteGame={(id, xp) => awardXP(xp, 'typing_god')} />}
            {activeGameId === 'cli' && <CliTerminalLab onCompleteGame={(id, xp) => awardXP(xp, 'cli_master')} />}
            {activeGameId === 'regex' && <RegexLab onCompleteGame={(id, xp) => awardXP(xp, 'regex_master')} />}
            {activeGameId === 'puzzle' && <CodePuzzle onCompleteGame={(id, xp) => awardXP(xp)} />}
            {activeGameId === 'logic' && <LogicGatesGame onCompleteGame={(id, xp) => awardXP(xp, 'logic_genius')} />}
            {activeGameId === 'sandbox' && <WebSandbox onCompleteGame={(id, xp) => awardXP(xp, 'web_builder')} />}
          </div>
        )}

        {/* IHK EXAM TAB */}
        {activeTab === 'exam' && (
          <ExamSimulator onCompleteExam={(score, xp) => awardXP(xp, 'exam_passed')} />
        )}

        {/* LÜCKENTEXT TAB */}
        {activeTab === 'lueckentext' && (
          <ClozeTester userState={userState} onCompleteCloze={(id, xp) => awardXP(xp, 'cloze_wizard')} />
        )}

        {/* VIDEOS TAB */}
        {activeTab === 'videos' && (
          <VideoHub onCompleteVideo={(id, xp) => awardXP(xp)} />
        )}

        {/* PROJEKTE TAB */}
        {activeTab === 'projekte' && (
          <ProjectViewer onCompleteProject={(id, xp) => awardXP(xp)} />
        )}
      </main>

      {/* Footer with DSGVO Privacy & Impressum Modal */}
      <DsgvoFooterModal />

      {/* Mobile Bottom Navigation */}
      <MobileNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Role Selection Modal */}
      <RoleSelectionModal
        isOpen={isRoleModalOpen}
        onClose={() => setIsRoleModalOpen(false)}
        currentRole={userState.role}
        onSelectRole={handleSelectRole}
      />

      {/* Badges & XP Stats Modal */}
      <BadgesModal
        isOpen={isBadgesModalOpen}
        onClose={() => setIsBadgesModalOpen(false)}
        userState={userState}
      />

      {/* IT Glossary Modal */}
      <GlossaryModal
        isOpen={isGlossaryModalOpen}
        onClose={() => setIsGlossaryModalOpen(false)}
      />

      {/* Certificate Modal */}
      <CertificateModal
        isOpen={isCertificateModalOpen}
        onClose={() => setIsCertificateModalOpen(false)}
        userState={userState}
      />

      {/* Flashcards Modal */}
      <FlashcardsModal
        isOpen={isFlashcardsModalOpen}
        onClose={() => setIsFlashcardsModalOpen(false)}
        onRewardXP={(xp) => awardXP(xp)}
      />

      {/* Vocabulary Trainer Modal */}
      <VocabularyTrainerModal
        isOpen={isVocabularyModalOpen}
        onClose={() => setIsVocabularyModalOpen(false)}
        onRewardXP={(xp) => awardXP(xp)}
      />

      {/* Live Deployment Guide Modal */}
      <DeploymentGuideModal
        isOpen={isDeploymentModalOpen}
        onClose={() => setIsDeploymentModalOpen(false)}
      />

      {/* Backup & Restore Modal */}
      <BackupModal
        isOpen={isBackupModalOpen}
        onClose={() => setIsBackupModalOpen(false)}
        onStateRestored={refreshStateFromStorage}
      />
    </div>
  );
}
