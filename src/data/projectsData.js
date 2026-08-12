// Step-by-step micro-projects dataset for hands-on experience

export const MICRO_PROJECTS = [
  {
    id: 'proj_portfolio',
    title: 'Projekt 1: Erstelle deine Entwickler-Visitenkarte',
    category: 'Webentwicklung',
    difficulty: 'Anfänger',
    targetRoles: ['anfaenger'],
    estimatedTime: '20 Min',
    icon: '🚀',
    description: 'Baue deine eigene responsive Profilseite mit HTML & CSS. Zeige deine Skills, dein Bild und Social-Links.',
    steps: [
      {
        title: 'Schritt 1: HTML-Gerüst aufbauen',
        detail: 'Erstelle die semantische Struktur mit <header>, <main> und <footer>.',
        codeSnippet: `<div class="profile-card">
  <img src="https://via.placeholder.com/100" alt="Avatar">
  <h1>Dein Name</h1>
  <p>Angehender Informatiker & Code Explorer</p>
</div>`
      },
      {
        title: 'Schritt 2: CSS Styling hinzufügen',
        detail: 'Nutze CSS Flexbox für ein elegantes Kartendesign mit abgerundeten Ecken und Schatten.',
        codeSnippet: `.profile-card {
  background: #1e293b;
  border-radius: 16px;
  padding: 24px;
  text-align: center;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}`
      }
    ],
    xpReward: 100
  },
  {
    id: 'proj_password_checker',
    title: 'Projekt 2: Passwort-Stärke-Checker',
    category: 'IT-Sicherheit & JS',
    difficulty: 'Azubi / Mittel',
    targetRoles: ['azubi', 'pro'],
    estimatedTime: '30 Min',
    icon: '🔐',
    description: 'Schreibe ein JavaScript-Skript, das Passwörter auf Länge, Sonderzeichen, Zahlen und Entropie überprüft.',
    steps: [
      {
        title: 'Schritt 1: Prüffunktion mit RegEx schreiben',
        detail: 'Erstelle eine Funktion `checkPasswordScore(password)`, die Punkte vergibt.',
        codeSnippet: `function checkPasswordScore(pass) {
  let score = 0;
  if (pass.length >= 8) score += 25;
  if (pass.length >= 12) score += 25;
  if (/[A-Z]/.test(pass)) score += 15;
  if (/[0-9]/.test(pass)) score += 15;
  if (/[^A-Za-z0-9]/.test(pass)) score += 20;
  return score;
}`
      },
      {
        title: 'Schritt 2: Visuelle Feedback-Leiste aktualisieren',
        detail: 'Färbe die Fortschrittsleiste je nach Score grün, gelb oder rot.',
        codeSnippet: `const score = checkPasswordScore(userPass);
if (score > 75) statusBadge.className = 'badge-green';`
      }
    ],
    xpReward: 150
  },
  {
    id: 'proj_db_schema',
    title: 'Projekt 3: Datenbank-Schema für ein Ticket-System',
    category: 'Datenbanken',
    difficulty: 'Azubi / Pro',
    targetRoles: ['azubi', 'pro'],
    estimatedTime: '35 Min',
    icon: '🗄️',
    description: 'Entwirf das relationale Datenbank-Schema für ein IT-Support-Ticket-System inklusive Fremdschlüsseln.',
    steps: [
      {
        title: 'Schritt 1: Tabellen kunden & tickets anlegen',
        detail: 'Definiere Primärschlüssel (PRIMARY KEY) und Fremdschlüssel (FOREIGN KEY).',
        codeSnippet: `CREATE TABLE tickets (
  ticket_id INT PRIMARY KEY AUTO_INCREMENT,
  kunde_id INT NOT NULL,
  titel VARCHAR(150) NOT NULL,
  status ENUM('offen', 'in_bearbeitung', 'geloest') DEFAULT 'offen',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (kunde_id) REFERENCES kunden(id)
);`
      }
    ],
    xpReward: 180
  }
];
