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
import ProjectViewer from './components/Projects/ProjectViewer';
import BadgesModal from './components/Gamification/BadgesModal';
import DsgvoFooterModal from './components/Footer/DsgvoFooterModal';
import DifficultyFilterBar from './components/Navigation/DifficultyFilterBar';

import { loadUserState, saveUserState, calculateLevel } from './utils/storage';
import { USER_ROLES } from './data/userProfiles';
import { TOPICS } from './data/topicsData';

import { BookOpen, Sparkles, ArrowRight, CheckCircle } from 'lucide-react';

export default function App() {
  const [userState, setUserState] = useState(loadUserState());
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(!userState.role);
  const [isBadgesModalOpen, setIsBadgesModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Accessibility State & Theme (Light / Dark)
  const [theme, setTheme] = useState('light'); // 'light' | 'dark'
  const [fontSize, setFontSize] = useState(100);
  const [isDyslexic, setIsDyslexic] = useState(false);
  const [isColorblind, setIsColorblind] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Difficulty Filter State ('all' | 'Einsteiger' | 'Azubi / IHK' | 'Senior / Expert')
  const [difficultyFilter, setDifficultyFilter] = useState('all');

  // Topic Reader state
  const [selectedTopicId, setSelectedTopicId] = useState(null);

  // Active Mini-Game Selector ('sql' | 'security' | 'puzzle' | 'logic' | 'sandbox')
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
        activeTab={activeTab}
        setActiveTab={setActiveTab}
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

                <button
                  className="btn btn-primary"
                  onClick={() => setIsRoleModalOpen(true)}
                  style={{ minHeight: '48px', fontSize: '1rem' }}
                >
                  Profil / Level Anpassen
                </button>
              </div>
            </div>

            {/* Feature Modules Quick Access */}
            <h2 style={{ fontSize: '1.6rem', fontWeight: '800', marginBottom: '20px', color: 'var(--text-main)' }}>
              Empfohlene Lernbereiche für dich
            </h2>

            <div className="grid-responsive" style={{ marginBottom: '40px' }}>
              {/* Fachkunde Card */}
              <div
                className="glass-panel glass-panel-hover"
                onClick={() => setActiveTab('wissen')}
                style={{ padding: '24px', cursor: 'pointer', border: '1px solid var(--border-color)' }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>📚</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px', color: 'var(--text-main)' }}>Fachkunde & Wissen</h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: '1.5' }}>
                  Standard-Texte, Praxis-Codebeispiele, Audio-Vorlesefunktion & Level-Filter.
                </p>
                <span style={{ fontSize: '0.9rem', color: 'var(--accent-primary)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  Themen Erkunden <ArrowRight size={16} />
                </span>
              </div>

              {/* Games Card */}
              <div
                className="glass-panel glass-panel-hover"
                onClick={() => setActiveTab('games')}
                style={{ padding: '24px', cursor: 'pointer', border: '1px solid var(--border-color)' }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🎮</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px', color: 'var(--text-main)' }}>Mini-Games Arcade</h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: '1.5' }}>
                  SQL Dungeon, Cyber Defense Lab, Code Bug Hunter & Logik-Schaltungen.
                </p>
                <span style={{ fontSize: '0.9rem', color: 'var(--accent-emerald)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  Spiele Starten <ArrowRight size={16} />
                </span>
              </div>

              {/* Lückentexte Card */}
              <div
                className="glass-panel glass-panel-hover"
                onClick={() => setActiveTab('lueckentext')}
                style={{ padding: '24px', cursor: 'pointer', border: '1px solid var(--border-color)' }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>📜</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px', color: 'var(--text-main)' }}>Interaktive Lückentexte</h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: '1.5' }}>
                  Prüfungswissen & IHK-Fachbegriffe interaktiv ausfüllen.
                </p>
                <span style={{ fontSize: '0.9rem', color: 'var(--accent-purple)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  Lückentext Wählen <ArrowRight size={16} />
                </span>
              </div>

              {/* Praxis Projekte Card */}
              <div
                className="glass-panel glass-panel-hover"
                onClick={() => setActiveTab('projekte')}
                style={{ padding: '24px', cursor: 'pointer', border: '1px solid var(--border-color)' }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🚀</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px', color: 'var(--text-main)' }}>Praxis-Mikroprojekte</h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: '1.5' }}>
                  Schritt-für-Schritt Anleitungen für echte Entwickler-Projekte.
                </p>
                <span style={{ fontSize: '0.9rem', color: 'var(--accent-amber)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  Projekt Starten <ArrowRight size={16} />
                </span>
              </div>
            </div>
          </div>
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

                {/* Difficulty Level Filter Bar */}
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
            {/* Game Category Selector */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', overflowX: 'auto', paddingBottom: '6px' }}>
              {[
                { id: 'sql', label: '🗄️ SQL Dungeon' },
                { id: 'security', label: '🛡️ Cyber Defense Lab' },
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
            {activeGameId === 'puzzle' && <CodePuzzle onCompleteGame={(id, xp) => awardXP(xp)} />}
            {activeGameId === 'logic' && <LogicGatesGame onCompleteGame={(id, xp) => awardXP(xp, 'logic_genius')} />}
            {activeGameId === 'sandbox' && <WebSandbox onCompleteGame={(id, xp) => awardXP(xp, 'web_builder')} />}
          </div>
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
    </div>
  );
}
