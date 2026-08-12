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

import { loadUserState, saveUserState, calculateLevel } from './utils/storage';
import { USER_ROLES } from './data/userProfiles';
import { TOPICS } from './data/topicsData';

import { BookOpen, Gamepad2, FileText, Video, FolderGit2, Sparkles, ArrowRight, Trophy, CheckCircle } from 'lucide-react';

export default function App() {
  const [userState, setUserState] = useState(loadUserState());
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(!userState.role);
  const [isBadgesModalOpen, setIsBadgesModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Topic Reader state
  const [selectedTopicId, setSelectedTopicId] = useState(null);

  // Active Mini-Game Selector ('sql' | 'security' | 'puzzle' | 'logic' | 'sandbox')
  const [activeGameId, setActiveGameId] = useState('sql');

  // Save state on change
  useEffect(() => {
    saveUserState(userState);
  }, [userState]);

  // Handle Role Select
  const handleSelectRole = (roleId) => {
    setUserState(prev => ({
      ...prev,
      role: roleId
    }));
  };

  // Award XP and trigger Confetti
  const awardXP = (amount, achievementId = null) => {
    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    } catch (e) {}

    setUserState(prev => {
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
      setUserState(prev => ({ ...prev, completedTopics: [...prev.completedTopics, topicId] }));
      awardXP(xp, 'first_steps');
    }
  };

  const currentRole = USER_ROLES[userState.role] || USER_ROLES.anfaenger;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-primary)' }}>
      
      {/* Top Navbar */}
      <Navbar
        userState={userState}
        onOpenProfileModal={() => setIsRoleModalOpen(true)}
        onOpenBadgesModal={() => setIsBadgesModalOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content Area */}
      <main style={{ flex: 1, maxWidth: '1280px', width: '100%', margin: '0 auto', padding: '24px 20px 80px 20px' }}>
        
        {/* DASHBOARD TAB */}
        {activeTab === 'dashboard' && (
          <div>
            {/* Hero Welcome Banner */}
            <div className="glass-panel" style={{
              padding: '36px',
              borderRadius: 'var(--radius-xl)',
              background: `linear-gradient(135deg, rgba(20, 28, 45, 0.95), ${currentRole.color}25)`,
              border: `1px solid ${currentRole.color}50`,
              marginBottom: '32px',
              boxShadow: 'var(--shadow-card)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
                <div>
                  <span className="badge badge-cyan" style={{ marginBottom: '12px' }}>
                    <Sparkles size={14} /> Aktuelles Profil: {currentRole.title}
                  </span>
                  <h1 style={{ fontSize: '2.2rem', fontWeight: '800', margin: '8px 0' }}>
                    Willkommen zurück, <span className="text-gradient">Developer</span>!
                  </h1>
                  <p style={{ color: 'var(--text-muted)', maxWidth: '650px', fontSize: '1rem', lineHeight: '1.5' }}>
                    {currentRole.description}
                  </p>
                </div>

                <button
                  className="btn btn-primary"
                  onClick={() => setIsRoleModalOpen(true)}
                  style={{ background: currentRole.color }}
                >
                  Profil / Level Anpassen
                </button>
              </div>
            </div>

            {/* Feature Modules Quick Access */}
            <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '16px' }}>
              Empfohlene Lernbereiche für dich
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '40px' }}>
              
              {/* Fachkunde Card */}
              <div 
                className="glass-panel glass-panel-hover" 
                onClick={() => setActiveTab('wissen')}
                style={{ padding: '24px', cursor: 'pointer' }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>📚</div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '6px' }}>Fachkunde & Wissen</h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                  W3schools-stil Texte, Codebeispiele & Express-Quizzes für IT-Themen.
                </p>
                <span style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  Themen Erkunden <ArrowRight size={16} />
                </span>
              </div>

              {/* Games Card */}
              <div 
                className="glass-panel glass-panel-hover" 
                onClick={() => setActiveTab('games')}
                style={{ padding: '24px', cursor: 'pointer' }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🎮</div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '6px' }}>Mini-Games Arcade</h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                  SQL Dungeon, Cyber Defense Lab, Code Bug Hunter & Logik-Schaltungen.
                </p>
                <span style={{ fontSize: '0.85rem', color: 'var(--accent-green)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  Spiele Starten <ArrowRight size={16} />
                </span>
              </div>

              {/* Lückentexte Card */}
              <div 
                className="glass-panel glass-panel-hover" 
                onClick={() => setActiveTab('lueckentext')}
                style={{ padding: '24px', cursor: 'pointer' }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>📜</div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '6px' }}>Interaktive Lückentexte</h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                  Prüfungswissen & Fachbegriffe durch Ausfüllen testen.
                </p>
                <span style={{ fontSize: '0.85rem', color: 'var(--accent-purple)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  Lückentext Wählen <ArrowRight size={16} />
                </span>
              </div>

              {/* Praxis Projekte Card */}
              <div 
                className="glass-panel glass-panel-hover" 
                onClick={() => setActiveTab('projekte')}
                style={{ padding: '24px', cursor: 'pointer' }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🚀</div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '6px' }}>Praxis-Mikroprojekte</h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                  Schritt-für-Schritt Anleitungen für echte Entwickler-Projekte.
                </p>
                <span style={{ fontSize: '0.85rem', color: 'var(--accent-amber)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
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
                <h2 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <BookOpen size={28} color="var(--accent-cyan)" /> Fachkunde & Wissensmodule
                </h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
                  Interaktive Artikel und w3schools-inspirierte Erklärungen.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                  {TOPICS.map(topic => {
                    const isDone = userState.completedTopics.includes(topic.id);
                    return (
                      <div
                        key={topic.id}
                        className="glass-panel glass-panel-hover"
                        onClick={() => setSelectedTopicId(topic.id)}
                        style={{ padding: '24px', cursor: 'pointer' }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                          <span className="badge badge-cyan">{topic.category}</span>
                          {isDone && <CheckCircle size={18} color="var(--accent-green)" />}
                        </div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px' }}>
                          {topic.icon} {topic.title}
                        </h3>
                        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                          {topic.summary}
                        </p>
                        <span style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
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
            <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', overflowX: 'auto', paddingBottom: '4px' }}>
              {[
                { id: 'sql', label: '🗄️ SQL Dungeon' },
                { id: 'security', label: '🛡️ Cyber Defense Lab' },
                { id: 'puzzle', label: '🧩 Code Bug Hunter' },
                { id: 'logic', label: '⚡ Logikgatter Simulator' },
                { id: 'sandbox', label: '🌐 Live Web Sandbox' }
              ].map(g => (
                <button
                  key={g.id}
                  onClick={() => setActiveGameId(g.id)}
                  style={{
                    padding: '10px 18px',
                    borderRadius: 'var(--radius-md)',
                    fontWeight: '700',
                    fontSize: '0.9rem',
                    background: activeGameId === g.id ? 'var(--gradient-cyber)' : 'var(--bg-card)',
                    color: '#fff',
                    border: activeGameId === g.id ? 'none' : '1px solid var(--border-color)',
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
