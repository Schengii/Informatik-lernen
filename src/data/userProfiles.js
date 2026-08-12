export const USER_ROLES = {
  anfaenger: {
    id: 'anfaenger',
    title: 'Informatik-Einsteiger (Anfänger)',
    subtitle: 'Perfekt für alle, die IT & Programmierung von Null an verstehen wollen.',
    icon: '🌱',
    color: '#06b6d4',
    badge: 'Beginner Roadmap',
    description: 'Du lernst spielerisch wie Computer denken, schreibst deine ersten Codezeilen, verstehst das Internet und baust einfache HTML/CSS-Seiten.',
    recommendedModules: ['it_basics', 'web_html_css', 'binary_logic'],
    recommendedGames: ['logic_runner', 'web_sandbox', 'code_puzzle'],
    skills: ['Binärsystem & Logik', 'HTML5 & CSS3 Grundlagen', 'Algorithmen verstehen', 'Cyber-Sicherheit Hygiene']
  },
  azubi: {
    id: 'azubi',
    title: 'IT-Auszubildender (Fachinformatiker AE/SI)',
    subtitle: 'Optimal für Fachinformatiker Anwendungsentwicklung & Systemintegration.',
    icon: '⚡',
    color: '#3b82f6',
    badge: 'IHK Praxis & Prüfungs-Roadmap',
    description: 'Vertiefe dein Wissen für Berufsschule und IHK-Prüfung: SQL-Verknüpfungen, Objektorientierung, Netzwerke (OSI), Pseudocode & Lückentexte.',
    recommendedModules: ['sql_databases', 'js_programming', 'networking_osi', 'cloze_ihk'],
    recommendedGames: ['sql_dungeon', 'code_puzzle', 'cloze_lab'],
    skills: ['SQL Queries & Relationale DBs', 'JavaScript & OOP', 'OSI-Modell & IP-Subnetting', 'Pseudocode & Prüfungs-Lückentexte']
  },
  pro: {
    id: 'pro',
    title: 'Erfahrener Entwickler (Senior / Switcher)',
    subtitle: 'Für Devs, die neue Spezialbereiche wie Security, DB-Tuning & RegEx lernen wollen.',
    icon: '🔥',
    color: '#8b5cf6',
    badge: 'Advanced Lab Roadmap',
    description: 'Fokussiere dich auf fortgeschrittene Cybersecurity-Hacks (OWASP, SQLi, XSS), Datenbank-Performance, komplexe Algorithmen und Architektur-Patterns.',
    recommendedModules: ['it_security_advanced', 'sql_advanced', 'regex_mastery'],
    recommendedGames: ['cyber_security_lab', 'sql_dungeon', 'bug_hunter_pro'],
    skills: ['OWASP Top 10 Vulnerabilities', 'Complex SQL & Indexing', 'Regex & Parser Logic', 'Secure Code Architecture']
  }
};
