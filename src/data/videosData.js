// Curated educational video tutorials dataset

export const TUTORIAL_VIDEOS = [
  {
    id: 'vid_basics',
    title: 'Grundlagen der Informatik & Programmierung (Crashkurs)',
    category: 'Grundlagen',
    targetRoles: ['anfaenger'],
    embedUrl: 'https://www.youtube-nocookie.com/embed/zOjov-2OZ0E',
    duration: '15 Min',
    author: 'Dev Education Media',
    summary: 'Ein kompakter Überblick darüber, wie Software entwickelt wird, was Compiler machen und wie man das Programmieren am besten lernt.',
    timestamps: [
      { time: '00:00', label: 'Einführung in die IT' },
      { time: '03:20', label: 'Wie Computer Programmcode verstehen' },
      { time: '08:45', label: 'Variablen, Schleifen & Bedingungen' },
      { time: '12:30', label: 'Der beste Einstieg für Anfänger' }
    ]
  },
  {
    id: 'vid_sql',
    title: 'SQL Datenbanken in 30 Minuten verstehen & anwenden',
    category: 'Datenbanken',
    targetRoles: ['azubi', 'pro'],
    embedUrl: 'https://www.youtube-nocookie.com/embed/HXV3zeQKqGY',
    duration: '28 Min',
    author: 'Database Academy',
    summary: 'Lerne alle relativen Datenbank-Grundlagen: SELECT, WHERE, JOINs, Primär- und Fremdschlüssel an praktischen Beispielen.',
    timestamps: [
      { time: '00:00', label: 'Was ist eine RDBMS?' },
      { time: '05:10', label: 'Tabellenstruktur & Datentypen' },
      { time: '12:00', label: 'SELECT Abfragen & Filter' },
      { time: '20:15', label: 'INNER & LEFT JOIN anschaulich' }
    ]
  },
  {
    id: 'vid_security',
    title: 'Cyber Security Essentials: OWASP Top 10 einfach erklärt',
    category: 'IT-Sicherheit',
    targetRoles: ['azubi', 'pro'],
    embedUrl: 'https://www.youtube-nocookie.com/embed/WbV3ur1rceU',
    duration: '22 Min',
    author: 'CyberLab Tutorials',
    summary: 'Schütze deine Webanwendungen gegen Hackerangriffe. Erklärung von SQL Injection, XSS, CSRF und sicherer Authentifizierung.',
    timestamps: [
      { time: '00:00', label: 'Warum Security ab Tag 1 wichtig ist' },
      { time: '04:30', label: 'SQL Injection Live Demo & Fix' },
      { time: '11:15', label: 'Cross-Site Scripting (XSS)' },
      { time: '17:40', label: 'Sichere Passwörter & Hashing' }
    ]
  }
];
