// Storage utility to manage user state, progress, XP, and badges

const STORAGE_KEY = 'informatik_game_state_v1';

export const initialProfileState = {
  role: null, // 'anfaenger' | 'azubi' | 'pro'
  userName: 'Dev Explorer',
  xp: 0,
  level: 1,
  streak: 1,
  completedTopics: [],
  completedGames: [],
  completedCloze: [],
  completedProjects: [],
  unlockedBadges: [],
  savedCodeSnippets: {}
};

export const loadUserState = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return initialProfileState;
    return { ...initialProfileState, ...JSON.parse(data) };
  } catch (e) {
    console.error('Failed to load storage:', e);
    return initialProfileState;
  }
};

export const saveUserState = (state) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save storage:', e);
  }
};

export const calculateLevel = (xp) => {
  // Level threshold: Level 1 = 0-100 XP, Level 2 = 100-300 XP, etc.
  return Math.floor(Math.sqrt(xp / 50)) + 1;
};

export const BADGES = [
  { id: 'first_steps', title: 'Erste Schritte', desc: 'Wähle dein Profil und schließe dein erstes Modul ab.', icon: '🚀' },
  { id: 'sql_master', title: 'SQL Commander', desc: 'Meistere das SQL Dungeon und führe komplexe Queries aus.', icon: '⚡' },
  { id: 'security_expert', title: 'Cyber Defender', desc: 'Behebe alle Sicherheitslücken im Security Lab.', icon: '🛡️' },
  { id: 'cloze_wizard', title: 'Lückentext-Meister', desc: 'Absolviere 5 Lückentexte fehlerfrei.', icon: '📜' },
  { id: 'web_builder', title: 'Fullstack Explorer', desc: 'Erstelle dein erstes Web-Projekt in der Live Sandbox.', icon: '🌐' },
  { id: 'logic_genius', title: 'Gatter-Genie', desc: 'Löse alle Logikschaltungen im Logic Game.', icon: '💡' }
];
