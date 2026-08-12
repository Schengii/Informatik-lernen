export const EXAM_QUESTIONS = [
  {
    id: 1,
    category: 'Netzwerke & Subnetting',
    difficulty: 'Azubi / IHK',
    question: 'Ein Unternehmen nutzt das IPv4-Subnetz 192.168.10.0/26. Wie viele nutzbare Host-IP-Adressen stehen in diesem Subnetz zur Verfügung?',
    options: [
      '30 Nutzbare Adressen',
      '62 Nutzbare Adressen',
      '126 Nutzbare Adressen',
      '254 Nutzbare Adressen'
    ],
    correct: 1,
    explanation: 'Ein /26 Subnetz hat 32 - 26 = 6 Host-Bits. 2^6 = 64 Adressen. Abzüglich Netz-ID (192.168.10.0) und Broadcast-Adresse (192.168.10.63) verbleiben 62 nutzbare IP-Adressen.'
  },
  {
    id: 2,
    category: 'Datenbanken & SQL',
    difficulty: 'Azubi / IHK',
    question: 'Welche Aussage beschreibt das Prinzip der 1. Normalform (1NF) einer Datenbanktabelle korrekt?',
    options: [
      'Jede Tabelle muss einen Fremdschlüssel enthalten.',
      'Alle Attributwerte müssen atomar (nicht weiter zerlegbar) sein.',
      'Jedes Nichtschlüsselattribut muss voll funktional vom Primärschlüssel abhängen.',
      'Es dürfen keine transitiven Abhängigkeiten existieren.'
    ],
    correct: 1,
    explanation: 'Die 1. Normalform fordert, dass alle Attribute atomar sind (z. B. Vorname und Nachname in getrennten Spalten statt in einer gemeinsamen).'
  },
  {
    id: 3,
    category: 'IT-Security & OWASP',
    difficulty: 'Senior / Expert',
    question: 'Ein Angreifer fügt bösartigen JavaScript-Code in ein Forenkommentar-Feld ein. Wann immer ein Nutzer die Seite öffnet, wird das Skript im Browser des Nutzers ausgeführt. Um welche Art von Angriff handelt es sich?',
    options: [
      'Reflected Cross-Site Scripting (XSS)',
      'Stored (Persistent) Cross-Site Scripting (XSS)',
      'SQL Injection (SQLi)',
      'Cross-Site Request Forgery (CSRF)'
    ],
    correct: 1,
    explanation: 'Da der Angriffscode dauerhaft in der Datenbank gespeichert wird und bei jedem Aufruf für andere Nutzer ausgeführt wird, handelt es sich um Stored/Persistent XSS.'
  },
  {
    id: 4,
    category: 'Computer-Grundlagen',
    difficulty: 'Einsteiger',
    question: 'Wie lautet der Dezimalwert der binären Zahl 1101?',
    options: ['11', '13', '15', '9'],
    correct: 1,
    explanation: '1*8 + 1*4 + 0*2 + 1*1 = 8 + 4 + 0 + 1 = 13.'
  },
  {
    id: 5,
    category: 'Programmierung & Algorithmen',
    difficulty: 'Azubi / IHK',
    question: 'Was versteht man unter dem Begriff "Rekursion" in der Softwareentwicklung?',
    options: [
      'Das Speichern von Daten in einer SQL-Datenbank.',
      'Eine Funktion, die sich selbst aufruft, bis eine Abbruchbedingung erreicht ist.',
      'Das Kompilieren von Quellcode in Maschinencode.',
      'Das Verschlüsseln von Passwörtern mit bcrypt.'
    ],
    correct: 1,
    explanation: 'Rekursion liegt vor, wenn eine Funktion sich im eigenen Funktionskörper selbst aufruft. Eine Basisfall-Abbruchbedingung verhindert Endlosschleifen.'
  }
];
