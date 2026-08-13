import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from './store/useStore';
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
import SkillTreeWidget from './components/Gamification/SkillTreeWidget';

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
import WebComponentsHub from './components/Content/WebComponentsHub';
import FisiLernfelderHub from './components/Content/FisiLernfelderHub';
import AiBusinessMasterclass from './components/Content/AiBusinessMasterclass';
import ItPodcastHub from './components/Content/ItPodcastHub';

import DockerLab from './components/Content/DockerLab';
import CloudDevOpsLab from './components/Content/CloudDevOpsLab';
import RedBlueTeamLab from './components/Content/RedBlueTeamLab';
import ApiBenchStudio from './components/Content/ApiBenchStudio';

import KubernetesLab from './components/Content/KubernetesLab';
import RagAiSimulator from './components/Content/RagAiSimulator';
import WasmRustLab from './components/Content/WasmRustLab';
import KafkaEventLab from './components/Content/KafkaEventLab';

import OauthOidcLab from './components/Content/OauthOidcLab';
import WebSocketsLab from './components/Content/WebSocketsLab';
import PerformanceProfilingLab from './components/Content/PerformanceProfilingLab';
import AnfaengerGuideHub from './components/Content/AnfaengerGuideHub';
import SubnettingLab from './components/Content/SubnettingLab';
import GitLab from './components/Content/GitLab';
import AlgoPlaygroundLab from './components/Content/AlgoPlaygroundLab';
import PythonWasmLab from './components/Content/PythonWasmLab';
import PacketTracerLab from './components/Content/PacketTracerLab';
import LeitnerFlashcardLab from './components/Content/LeitnerFlashcardLab';
import MonacoStudioLab from './components/Content/MonacoStudioLab';
import CloudDesignerLab from './components/Content/CloudDesignerLab';
import ApiMockStudioLab from './components/Content/ApiMockStudioLab';
import CtfChallengeLab from './components/Content/CtfChallengeLab';

import { loadUserState, saveUserState, calculateLevel } from './utils/storage';
import { USER_ROLES } from './data/userProfiles';
import { TOPICS } from './data/topicsData';

import { BookOpen, Sparkles, ArrowRight, CheckCircle, Sprout } from 'lucide-react';

export default function App() {
  const { 
    userState, setUserState, handleSelectRole, awardXP, handleCompleteTopic, refreshStateFromStorage,
    lang, setLang, theme, setTheme, fontSize, setFontSize,
    isDyslexic, setIsDyslexic, isColorblind, setIsColorblind,
    isHighContrast, setIsHighContrast, isReducedMotion, setIsReducedMotion,
    difficultyFilter, setDifficultyFilter
  } = useStore();

  const [isRoleModalOpen, setIsRoleModalOpen] = useState(!userState.role);
  const [isBadgesModalOpen, setIsBadgesModalOpen] = useState(false);
  const [isGlossaryModalOpen, setIsGlossaryModalOpen] = useState(false);
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);
  const [isFlashcardsModalOpen, setIsFlashcardsModalOpen] = useState(false);
  const [isBackupModalOpen, setIsBackupModalOpen] = useState(false);
  const [isVocabularyModalOpen, setIsVocabularyModalOpen] = useState(false);
  const [isDeploymentModalOpen, setIsDeploymentModalOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const activeTab = location.pathname === '/' ? 'dashboard' : location.pathname.substring(1);
  const setActiveTab = (tab) => navigate(`/${tab}`);

  // Topic Reader state
  const [selectedTopicId, setSelectedTopicId] = useState(null);

  // Active Mini-Game Selector
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
      <main style={{ flex: 1, maxWidth: '1280px', width: '100%', margin: '0 auto', padding: '24px 20px 40px 20px', position: 'relative' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            style={{ width: '100%' }}
          >
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
                    onClick={() => setActiveTab('anfaenger_guide')}
                    style={{ minHeight: '48px', fontSize: '0.95rem', borderColor: 'var(--accent-emerald)', color: 'var(--accent-emerald)' }}
                  >
                    <Sprout size={18} /> Einsteiger Kurs
                  </button>
                </div>
              </div>
            </div>

            {/* Daily Challenge Widget */}
            <DailyChallengeWidget onCompleteChallenge={(xp) => awardXP(xp, 'daily_master')} />

            {/* RPG Skill Tree Widget */}
            <SkillTreeWidget userState={userState} onRewardXP={(xp) => awardXP(xp)} />

            {/* Skill Matrix Visualizer */}
            <SkillMatrixWidget userState={userState} />

            {/* Feature Modules Quick Access Grid */}
            <h2 style={{ fontSize: '1.6rem', fontWeight: '800', marginBottom: '20px', color: 'var(--text-main)' }}>
              Empfohlene Lernbereiche für dich
            </h2>

            <div className="grid-responsive" style={{ marginBottom: '40px' }}>
              {/* Anfänger Guide Card */}
              <div
                className="glass-panel glass-panel-hover"
                onClick={() => setActiveTab('anfaenger_guide')}
                style={{ padding: '24px', cursor: 'pointer', border: '1px solid var(--border-color)' }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🌱</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px', color: 'var(--text-main)' }}>Einsteiger Kurs ohne Vorkenntnisse</h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: '1.5' }}>
                  EVA-Prinzip, CPU, Binärlogik & Netzwerke leicht erklärt.
                </p>
                <span style={{ fontSize: '0.9rem', color: 'var(--accent-emerald)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  Kurs Öffnen <ArrowRight size={16} />
                </span>
              </div>

              {/* Subnetting Card */}
              <div
                className="glass-panel glass-panel-hover"
                onClick={() => setActiveTab('subnetting')}
                style={{ padding: '24px', cursor: 'pointer', border: '1px solid var(--border-color)' }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🌐</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px', color: 'var(--text-main)' }}>CIDR & Subnetting Lab</h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: '1.5' }}>
                  IP-Rechner, Host-Range Analyse & IHK-Prüfungsfragen.
                </p>
                <span style={{ fontSize: '0.9rem', color: 'var(--accent-indigo)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  Subnetting Öffnen <ArrowRight size={16} />
                </span>
              </div>

              {/* Git Branching Card */}
              <div
                className="glass-panel glass-panel-hover"
                onClick={() => setActiveTab('git_lab')}
                style={{ padding: '24px', cursor: 'pointer', border: '1px solid var(--border-color)' }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🌿</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px', color: 'var(--text-main)' }}>Visual Git Branching Lab</h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: '1.5' }}>
                  Commits, Branching, Merging & Rebase interaktiv lernen.
                </p>
                <span style={{ fontSize: '0.9rem', color: 'var(--accent-emerald)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  Git Lab Öffnen <ArrowRight size={16} />
                </span>
              </div>

              {/* Algorithmen Playground Card */}
              <div
                className="glass-panel glass-panel-hover"
                onClick={() => setActiveTab('algo_lab')}
                style={{ padding: '24px', cursor: 'pointer', border: '1px solid var(--border-color)' }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>⚡</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px', color: 'var(--text-main)' }}>Algorithmen & Sortier-Lab</h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: '1.5' }}>
                  QuickSort, MergeSort & Suchen Schritt-für-Schritt animieren.
                </p>
                <span style={{ fontSize: '0.9rem', color: 'var(--accent-indigo)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  Visualisierer Öffnen <ArrowRight size={16} />
                </span>
              </div>

              {/* Python WASM Sandbox Card */}
              <div
                className="glass-panel glass-panel-hover"
                onClick={() => setActiveTab('python_wasm')}
                style={{ padding: '24px', cursor: 'pointer', border: '1px solid var(--border-color)' }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🐍</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px', color: 'var(--text-main)' }}>Python 3 WASM Sandbox</h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: '1.5' }}>
                  Schreibe & führe echten Python Code im Browser aus.
                </p>
                <span style={{ fontSize: '0.9rem', color: 'var(--accent-indigo)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  Python Sandbox <ArrowRight size={16} />
                </span>
              </div>

              {/* Network Packet Tracer Card */}
              <div
                className="glass-panel glass-panel-hover"
                onClick={() => setActiveTab('packet_tracer')}
                style={{ padding: '24px', cursor: 'pointer', border: '1px solid var(--border-color)' }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>📡</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px', color: 'var(--text-main)' }}>Packet Tracer & Routing</h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: '1.5' }}>
                  ICMP Pings, Gateway-Hops & Paketverläufe simulieren.
                </p>
                <span style={{ fontSize: '0.9rem', color: 'var(--accent-emerald)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  Tracer Öffnen <ArrowRight size={16} />
                </span>
              </div>

              {/* Leitner Spaced Repetition Card */}
              <div
                className="glass-panel glass-panel-hover"
                onClick={() => setActiveTab('leitner')}
                style={{ padding: '24px', cursor: 'pointer', border: '1px solid var(--border-color)' }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🧠</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px', color: 'var(--text-main)' }}>Leitner Spaced Repetition</h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: '1.5' }}>
                  Effektives IHK Karteikasten-Lernen (Box 1 - 5).
                </p>
                <span style={{ fontSize: '0.9rem', color: 'var(--accent-indigo)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  Karteikasten Öffnen <ArrowRight size={16} />
                </span>
              </div>

              {/* Monaco VS Code Studio Card */}
              <div
                className="glass-panel glass-panel-hover"
                onClick={() => setActiveTab('monaco_studio')}
                style={{ padding: '24px', cursor: 'pointer', border: '1px solid var(--border-color)' }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>💻</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px', color: 'var(--text-main)' }}>Monaco VS Code Studio</h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: '1.5' }}>
                  Echter VS Code Editor im Browser mit IntelliSense.
                </p>
                <span style={{ fontSize: '0.9rem', color: 'var(--accent-indigo)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  Studio Öffnen <ArrowRight size={16} />
                </span>
              </div>

              {/* Cloud IaC Designer Card */}
              <div
                className="glass-panel glass-panel-hover"
                onClick={() => setActiveTab('cloud_designer')}
                style={{ padding: '24px', cursor: 'pointer', border: '1px solid var(--border-color)' }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>☁️</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px', color: 'var(--text-main)' }}>Cloud IaC & Terraform</h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: '1.5' }}>
                  Designe AWS Architekturen & generiere Terraform Code.
                </p>
                <span style={{ fontSize: '0.9rem', color: 'var(--accent-emerald)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  Designer Öffnen <ArrowRight size={16} />
                </span>
              </div>

              {/* REST API Testing Studio Card */}
              <div
                className="glass-panel glass-panel-hover"
                onClick={() => setActiveTab('api_mock_studio')}
                style={{ padding: '24px', cursor: 'pointer', border: '1px solid var(--border-color)' }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🌐</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px', color: 'var(--text-main)' }}>API Tester Studio</h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: '1.5' }}>
                  Postman Lite API-Testing mit JSON Headers & Body.
                </p>
                <span style={{ fontSize: '0.9rem', color: 'var(--accent-indigo)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  API Studio Öffnen <ArrowRight size={16} />
                </span>
              </div>

              {/* Cybersecurity CTF Lab Card */}
              <div
                className="glass-panel glass-panel-hover"
                onClick={() => setActiveTab('ctf_lab')}
                style={{ padding: '24px', cursor: 'pointer', border: '1px solid var(--border-color)' }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🚩</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px', color: 'var(--text-main)' }}>Cybersecurity CTF Lab</h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: '1.5' }}>
                  Ethical Hacking Quests (XSS, SQLi & Buffer Overflow).
                </p>
                <span style={{ fontSize: '0.9rem', color: 'var(--accent-rose)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  CTF Quests Starten <ArrowRight size={16} />
                </span>
              </div>

              {/* OAuth2 Card */}
              <div
                className="glass-panel glass-panel-hover"
                onClick={() => setActiveTab('oauth_oidc')}
                style={{ padding: '24px', cursor: 'pointer', border: '1px solid var(--border-color)' }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🔐</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px', color: 'var(--text-main)' }}>OAuth2 & JWT Security</h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: '1.5' }}>
                  PKCE Flow, Access Tokens & JWT Claims Decoding.
                </p>
                <span style={{ fontSize: '0.9rem', color: 'var(--accent-indigo)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  OAuth2 Öffnen <ArrowRight size={16} />
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ANFAENGER GUIDE TAB */}
        {activeTab === 'anfaenger_guide' && <AnfaengerGuideHub />}

        {/* SUBNETTING LAB TAB */}
        {activeTab === 'subnetting' && <SubnettingLab onRewardXP={(xp) => awardXP(xp, 'subnetting_master')} />}

        {/* GIT BRANCHING LAB TAB */}
        {activeTab === 'git_lab' && <GitLab onRewardXP={(xp) => awardXP(xp, 'git_master')} />}

        {/* ALGORITHMS PLAYGROUND LAB TAB */}
        {activeTab === 'algo_lab' && <AlgoPlaygroundLab onRewardXP={(xp) => awardXP(xp, 'algo_master')} />}

        {/* PYTHON WASM LAB TAB */}
        {activeTab === 'python_wasm' && <PythonWasmLab onRewardXP={(xp) => awardXP(xp, 'python_wasm_master')} />}

        {/* PACKET TRACER LAB TAB */}
        {activeTab === 'packet_tracer' && <PacketTracerLab onRewardXP={(xp) => awardXP(xp, 'packet_tracer_master')} />}

        {/* LEITNER FLASHCARDS TAB */}
        {activeTab === 'leitner' && <LeitnerFlashcardLab onRewardXP={(xp) => awardXP(xp, 'leitner_master')} />}

        {/* MONACO STUDIO TAB */}
        {activeTab === 'monaco_studio' && <MonacoStudioLab onRewardXP={(xp) => awardXP(xp, 'monaco_master')} />}

        {/* CLOUD DESIGNER TAB */}
        {activeTab === 'cloud_designer' && <CloudDesignerLab onRewardXP={(xp) => awardXP(xp, 'cloud_designer_master')} />}

        {/* API MOCK STUDIO TAB */}
        {activeTab === 'api_mock_studio' && <ApiMockStudioLab onRewardXP={(xp) => awardXP(xp, 'api_mock_master')} />}

        {/* CYBERSECURITY CTF TAB */}
        {activeTab === 'ctf_lab' && <CtfChallengeLab onRewardXP={(xp) => awardXP(xp, 'ctf_master')} />}

        {/* OAUTH2 & OIDC LAB TAB */}
        {activeTab === 'oauth_oidc' && <OauthOidcLab />}

        {/* WEBSOCKETS REALTIME LAB TAB */}
        {activeTab === 'websockets' && <WebSocketsLab />}

        {/* PERFORMANCE PROFILING LAB TAB */}
        {activeTab === 'perf_lab' && <PerformanceProfilingLab />}

        {/* KUBERNETES LAB TAB */}
        {activeTab === 'kubernetes' && <KubernetesLab />}

        {/* RAG VECTOR AI SIMULATOR TAB */}
        {activeTab === 'rag_ai' && <RagAiSimulator />}

        {/* WEBASSEMBLY RUST LAB TAB */}
        {activeTab === 'wasm_rust' && <WasmRustLab />}

        {/* KAFKA EVENT-DRIVEN LAB TAB */}
        {activeTab === 'kafka' && <KafkaEventLab />}

        {/* DOCKER LAB TAB */}
        {activeTab === 'docker' && <DockerLab />}

        {/* CLOUD DEVOPS TAB */}
        {activeTab === 'cloud_devops' && <CloudDevOpsLab />}

        {/* RED / BLUE TEAM SECURITY TAB */}
        {activeTab === 'security_lab_v2' && <RedBlueTeamLab />}

        {/* API BENCH STUDIO TAB */}
        {activeTab === 'api_studio' && <ApiBenchStudio />}

        {/* AI BUSINESS MASTERCLASS TAB */}
        {activeTab === 'ai_business' && <AiBusinessMasterclass />}

        {/* PODCAST HUB TAB */}
        {activeTab === 'podcast' && <ItPodcastHub />}

        {/* IHK LERNFELDER TAB */}
        {activeTab === 'lernfelder' && <FisiLernfelderHub />}

        {/* WEB COMPONENTS TAB */}
        {activeTab === 'web_components' && <WebComponentsHub />}

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
          <ExamSimulator onCompleteExam={(_score, xp) => awardXP(xp, 'exam_passed')} />
        )}

        {/* LÜCKENTEXT TAB */}
        {activeTab === 'lueckentext' && (
          <ClozeTester userState={userState} onCompleteCloze={(_id, xp) => awardXP(xp, 'cloze_wizard')} />
        )}

        {/* VIDEOS TAB */}
        {activeTab === 'videos' && (
          <VideoHub onCompleteVideo={(_id, xp) => awardXP(xp)} />
        )}

        {/* PROJEKTE TAB */}
        {activeTab === 'projekte' && (
          <ProjectViewer onCompleteProject={(_id, xp) => awardXP(xp)} />
        )}
                </motion.div>
        </AnimatePresence>
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
