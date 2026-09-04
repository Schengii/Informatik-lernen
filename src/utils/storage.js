// @ts-check
// Storage utility to manage user state, progress, XP, activity history and badges
import { syncUserStateToIndexedDb } from './indexedDbStoreMiddleware';

/**
 * @typedef {object} ActivityDay
 * @property {number} count
 * @property {number} xp
 *
 * @typedef {object} SoundSettings
 * @property {number} volume
 * @property {boolean} isMuted
 *
 * @typedef {object} UserState
 * @property {string} role
 * @property {string} userName
 * @property {number} xp
 * @property {number} level
 * @property {number} streak
 * @property {number} streakFreezes
 * @property {Record<string, unknown>} srsFlashcards
 * @property {string[]} completedTopics
 * @property {string[]} completedGames
 * @property {string[]} completedCloze
 * @property {string[]} completedProjects
 * @property {string[]} unlockedBadges
 * @property {Record<string, unknown>} savedCodeSnippets
 * @property {Record<string, ActivityDay>} activityHistory
 * @property {SoundSettings} soundSettings
 */

const STORAGE_KEY = 'informatik_game_state_v1';

/** @type {UserState} */
export const initialProfileState = {
  role: 'anfaenger', // 'anfaenger' | 'azubi' | 'junior' | 'pro'
  userName: 'Dev Explorer',
  xp: 0,
  level: 1,
  streak: 1,
  streakFreezes: 0,
  srsFlashcards: {}, // { [cardId]: { repetitions, interval, easeFactor, dueDate } }
  completedTopics: [],
  completedGames: [],
  completedCloze: [],
  completedProjects: [],
  unlockedBadges: [],
  savedCodeSnippets: {},
  activityHistory: {}, // { '2026-08-22': { count: 3, xp: 150 } }
  soundSettings: { volume: 0.5, isMuted: false }
};

export const getTodayDateKey = () => {
  return new Date().toISOString().slice(0, 10);
};

/**
 * @param {UserState} state
 * @param {number} [xpGained]
 * @returns {UserState}
 */
export const recordDailyActivity = (state, xpGained = 0) => {
  const dateKey = getTodayDateKey();
  const history = { ...(state.activityHistory || {}) };
  const current = history[dateKey] || { count: 0, xp: 0 };
  
  history[dateKey] = {
    count: current.count + 1,
    xp: current.xp + xpGained
  };

  return {
    ...state,
    activityHistory: history
  };
};

/** @returns {UserState} */
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

/** @param {UserState} state */
const persistStateNow = (state) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save storage:', e);
  }
  try {
    syncUserStateToIndexedDb(state);
  } catch {
    // Ignoriere Fehler im synchronen Pfad
  }
};

// Debounced Persistenz: Der Zustand im Zustand-Store (Zustand/zustand) wird
// bei JEDER Mikro-Aktion (XP-Vergabe, SRS-Update, Sound-Toggle, ...) neu
// gesetzt. Würde jede dieser Aktionen sofort einen kompletten
// `JSON.stringify` + `localStorage.setItem` auslösen, würde ein häufiges
// Trigger-Muster (z. B. mehrere XP-Events in schneller Folge) unnötig oft
// den kompletten, mit der Zeit wachsenden State (Notizen, SRS-Karten,
// Activity-Verlauf) neu serialisieren. Stattdessen wird nur der jeweils
// letzte Zustand innerhalb eines kurzen Zeitfensters tatsächlich geschrieben
// ("trailing debounce"). Der In-Memory-Zustand im Store ist davon nicht
// betroffen - die UI bleibt sofort reaktiv, nur das Schreiben auf die Platte
// wird gebündelt.
const PERSIST_DEBOUNCE_MS = 400;
/** @type {UserState | null} */
let pendingState = null;
/** @type {ReturnType<typeof setTimeout> | null} */
let debounceTimer = null;

const flushPendingWrite = () => {
  if (debounceTimer !== null) {
    clearTimeout(debounceTimer);
    debounceTimer = null;
  }
  if (pendingState !== null) {
    persistStateNow(pendingState);
    pendingState = null;
  }
};

// Sicherheitsnetz: Falls der Tab geschlossen oder in den Hintergrund gelegt
// wird, während noch ein gebündeltes Schreiben aussteht, wird sofort
// synchron persistiert - so geht trotz Debounce kein Fortschritt verloren.
if (typeof window !== 'undefined') {
  window.addEventListener('pagehide', flushPendingWrite);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      flushPendingWrite();
    }
  });
}

/**
 * Persistiert den User-State in localStorage & IndexedDB.
 *
 * @param {UserState} state - Der zu speichernde User-State.
 * @param {{ immediate?: boolean }} [options] - `immediate: true` erzwingt ein
 *   sofortiges, synchrones Schreiben (z. B. für Backup-Export/Import oder
 *   Rollenwahl, wo der Nutzer eine unmittelbare Bestätigung erwartet).
 *   Ohne diese Option wird das Schreiben um `PERSIST_DEBOUNCE_MS` gebündelt.
 */
export const saveUserState = (state, options = {}) => {
  if (options.immediate) {
    flushPendingWrite();
    persistStateNow(state);
    return;
  }

  pendingState = state;
  if (debounceTimer !== null) {
    clearTimeout(debounceTimer);
  }
  debounceTimer = setTimeout(flushPendingWrite, PERSIST_DEBOUNCE_MS);
};

/** Erzwingt das sofortige Schreiben eines eventuell noch ausstehenden, gebündelten Speichervorgangs. */
export const flushUserState = () => {
  flushPendingWrite();
};

export const exportUserDataJSON = () => {
  try {
    const state = loadUserState();
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(state, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `IT-DevGame-Backup-${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  } catch (e) {
    console.error('Failed to export user data:', e);
  }
};

/**
 * @param {string} jsonString
 * @returns {boolean}
 */
export const importUserDataJSON = (jsonString) => {
  try {
    const parsed = JSON.parse(jsonString);
    if (typeof parsed === 'object' && parsed !== null) {
      saveUserState({ ...initialProfileState, ...parsed }, { immediate: true });
      return true;
    }
    return false;
  } catch (e) {
    console.error('Failed to import user data:', e);
    return false;
  }
};

/**
 * @param {number} xp
 * @returns {number}
 */
export const calculateLevel = (xp) => {
  return Math.floor(Math.sqrt(xp / 50)) + 1;
};

export const BADGES = [
  { id: 'first_steps', title: 'Erste Schritte', desc: 'Wähle dein Profil und schließe dein erstes Modul ab.', icon: '🚀' },
  { id: 'sql_master', title: 'SQL Commander', desc: 'Meistere das SQL Dungeon und führe komplexe Queries aus.', icon: '⚡' },
  { id: 'security_expert', title: 'Cyber Defender', desc: 'Behebe alle Sicherheitslücken im Security Lab.', icon: '🛡️' },
  { id: 'cloze_wizard', title: 'Lückentext-Meister', desc: 'Absolviere 5 Lückentexte fehlerfrei.', icon: '📜' },
  { id: 'web_builder', title: 'Fullstack Explorer', desc: 'Erstelle dein erstes Web-Projekt in der Live Sandbox.', icon: '🌐' },
  { id: 'logic_genius', title: 'Gatter-Genie', desc: 'Löse alle Logikschaltungen im Logic Game.', icon: '💡' },
  { id: 'regex_master', title: 'RegEx Meister', desc: 'Löse RegEx-Suchmuster Aufgaben.', icon: '🔍' },
  { id: 'exam_passed', title: 'IHK Prüfung Zertifiziert', desc: 'Bestehe die IHK Prüfungssimulation mit über 60%.', icon: '🎓' },
  { id: 'wiso_master', title: 'WISO Kalkulator', desc: 'Schließe eine Handelskalkulation oder einen Netzplan fehlerfrei ab.', icon: '📊' },
  { id: 'ieee_architect', title: 'Hardware Architect', desc: 'Analysiere IEEE-754 Floats und KV-Diagramme.', icon: '🔬' },
  { id: 'ipv6_expert', title: 'IPv6 & Routing Pioneer', desc: 'Generiere EUI-64 Adressen und meistere LPM-Routing.', icon: '🌐' },
  { id: 'owasp_guardian', title: 'OWASP Guardian', desc: 'Identifiziere und neutralisiere Top-10 Schwachstellen.', icon: '🔒' },
  { id: 'ai_pioneer', title: 'Neural AI Pioneer', desc: 'Erkunde neuronale Schichten und BPE Tokenizer.', icon: '🧠' }
];
