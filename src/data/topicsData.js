export const TOPICS = [
  {
    id: 'it_basics',
    title: 'Computer-Grundlagen & Binärsystem',
    category: 'Grundlagen',
    targetRoles: ['anfaenger', 'azubi'],
    icon: '💻',
    readTime: '8 Min',
    summary: 'Wie verarbeiten Computer Daten? Verstehe Bits, Bytes, Binärcode, Hexadezimal und das Zusammenspiel von CPU und RAM.',
    content: `
### 1. Wie denkt ein Computer?
Ein Computer versteht im Inneren nur zwei Zustände: **0 (Spannung aus)** und **1 (Spannung an)**. 
Eine einzelne 0 oder 1 nennt man ein **Bit** (Binary Digit). 

8 Bits zusammen ergeben ein **Byte**. 
Ein Byte kann $2^8 = 256$ verschiedene Zustände darstellen (Zahlen von 0 bis 255).

### 2. Das Binärsystem (Zweiersystem)
Im normalen Dezimalsystem rechnen wir mit den Ziffern 0-9 (Basis 10). Im Binärsystem nutzen wir die Basis 2:

| Stelle | $2^3 = 8$ | $2^2 = 4$ | $2^1 = 2$ | $2^0 = 1$ | Dezimalwert |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **0101** | 0 | 1 | 0 | 1 | $4 + 1 = \mathbf{5}$ |
| **1100** | 1 | 1 | 0 | 0 | $8 + 4 = \mathbf{12}$ |
| **1111** | 1 | 1 | 0 | 1 | $8 + 4 + 2 + 1 = \mathbf{15}$ |

### 3. Hexadezimalsystem (Basis 16)
Um lange Binärketten für Menschen lesbarer zu machen (z. B. Farb-Codes wie \`#FF0000\` oder MAC-Adressen), nutzt man Hexadezimal (0-9 und A-F):
- A = 10, B = 11, C = 12, D = 13, E = 14, F = 15

### 4. Hauptkomponenten eines PCs
- **CPU (Prozessor):** Das Gehirn des Computers. Führt Befehle im Gigahertz-Takt aus.
- **RAM (Arbeitsspeicher):** Schneller, flüchtiger Speicher für aktive Programme.
- **SSD / Festplatte:** Dauerhafter Speicher für Dateien und das Betriebssystem.
- **GPU (Grafikkarte):** Spezialisiert auf parallele Berechnungen (Grafik & KI).
`,
    codeSnippet: `// Beispiel: Binär-Umrechnung in JavaScript
function bin2dec(binaryString) {
  return parseInt(binaryString, 2);
}

console.log(bin2dec("1010")); // Output: 10
console.log(bin2dec("1111")); // Output: 15`,
    quiz: [
      {
        question: 'Wie viele verschiedene Werte kann 1 Byte (8 Bits) darstellen?',
        options: ['100', '128', '256', '512'],
        correct: 2,
        explanation: 'Da jedes Bit 2 Zustände hat, ergibt 2^8 = 256 Möglichkeiten (0 bis 255).'
      },
      {
        question: 'Welchem Dezimalwert entspricht die Binärzahl 1010?',
        options: ['8', '10', '12', '14'],
        correct: 1,
        explanation: '8 (Stelle 4) + 0 (Stelle 3) + 2 (Stelle 2) + 0 (Stelle 1) = 10.'
      }
    ]
  },
  {
    id: 'web_html_css',
    title: 'Webentwicklung: HTML5 & CSS3',
    category: 'Webentwicklung',
    targetRoles: ['anfaenger', 'azubi'],
    icon: '🌐',
    readTime: '10 Min',
    summary: 'Erstelle das Gerüst und das Aussehen moderner Webseiten. Lerne Semantic HTML, CSS Flexbox & Responsive Webdesign.',
    content: `
### 1. Was ist HTML5?
**HTML** (HyperText Markup Language) beschreibt die **Struktur** einer Webseite mithilfe von Tags.

\`\`\`html
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <title>Mein erstes Spiel</title>
</head>
<body>
  <h1>Willkommen zum IT-Game!</h1>
  <p>Lerne spielerisch zu programmieren.</p>
  <button id="startBtn">Spiel Starten</button>
</body>
</html>
\`\`\`

### 2. Was ist CSS3?
**CSS** (Cascading Style Sheets) kümmert sich um das **Design, Layout und Farben**.

\`\`\`css
/* Flexbox Zentrierung */
body {
  background-color: #0a0d14;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

button {
  background: linear-gradient(135deg, #06b6d4, #3b82f6);
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  color: white;
  cursor: pointer;
}
\`\`\`

### 3. Das CSS Box-Modell
Jedes Element in HTML besteht aus:
1. **Content:** Der eigentliche Inhalt (Text/Bild).
2. **Padding:** Innenabstand zwischen Inhalt und Rahmen.
3. **Border:** Der äußere Rahmen.
4. **Margin:** Außenabstand zu Nachbarelementen.
`,
    codeSnippet: `<div class="card">
  <h2>Web Development Rocks!</h2>
  <p>Mit HTML, CSS & JavaScript erstellst du interaktive Webapps.</p>
</div>`,
    quiz: [
      {
        question: 'Welches HTML-Tag definiert die Hauptüberschrift ersten Grades?',
        options: ['<head>', '<h6>', '<h1>', '<header>'],
        correct: 2,
        explanation: '<h1> definiert die primäre Überschrift einer HTML-Seite.'
      },
      {
        question: 'Welche CSS-Eigenschaft richtet Elemente flexibel in einer Reihe oder Spalte aus?',
        options: ['display: flex', 'position: absolute', 'float: left', 'margin: auto'],
        correct: 0,
        explanation: 'display: flex aktiviert das moderne Flexbox-Layout-Modell.'
      }
    ]
  },
  {
    id: 'sql_databases',
    title: 'Datenbanken & SQL (Relational DBs)',
    category: 'Datenbanken',
    targetRoles: ['azubi', 'pro'],
    icon: '🗄️',
    readTime: '12 Min',
    summary: 'Lerne wie relationale Datenbanken strukturiert sind. Schreibe Queries mit SELECT, WHERE, JOIN, INSERT und GROUP BY.',
    content: `
### 1. Was sind Relationale Datenbanken?
Datenbanken wie MySQL, PostgreSQL oder SQLite speichern Daten in strukturierten **Tabellen** mit Zeilen (Datensätze) und Spalten (Attribute).

### 2. Die wichtigsten SQL-Befehle (w3schools Standard)

#### 🔹 Daten abfragen: SELECT & WHERE
\`\`\`sql
SELECT name, rolle, gehalt 
FROM mitarbeiter 
WHERE gehalt > 50000 
ORDER BY gehalt DESC;
\`\`\`

#### 🔹 Tabellen verknüpfen: INNER JOIN
\`\`\`sql
SELECT mitarbeiter.name, abteilungen.abteilungs_name 
FROM mitarbeiter
INNER JOIN abteilungen ON mitarbeiter.abteilung_id = abteilungen.id;
\`\`\`

#### 🔹 Aggregationen & Gruppierung: GROUP BY
\`\`\`sql
SELECT abteilung_id, COUNT(*) AS anzahl, AVG(gehalt) AS durchschnitt_gehalt
FROM mitarbeiter
GROUP BY abteilung_id;
\`\`\`

#### 🔹 Daten einfügen & aktualisieren: INSERT & UPDATE
\`\`\`sql
INSERT INTO mitarbeiter (name, rolle, gehalt) 
VALUES ('Alex Dev', 'Frontend Engineer', 55000);

UPDATE mitarbeiter 
SET gehalt = 60000 
WHERE name = 'Alex Dev';
\`\`\`
`,
    codeSnippet: `-- Beispiel: Erstellung einer Tabelle mit Primär- & Fremdschlüssel
CREATE TABLE kunden (
  kunden_id INT PRIMARY KEY AUTO_INCREMENT,
  vorname VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE
);`,
    quiz: [
      {
        question: 'Mit welchem SQL-Befehl verknüpft man zwei Tabellen anhand einer Schlüsselbeziehung?',
        options: ['CONNECT', 'INNER JOIN', 'MERGE', 'GROUP BY'],
        correct: 1,
        explanation: 'INNER JOIN verbindet Zeilen aus zwei Tabellen, bei denen die Verknüpfungsbedingung erfüllt ist.'
      },
      {
        question: 'Welcher Befehl filtert Aggregat-Ergebnisse nach einem GROUP BY?',
        options: ['WHERE', 'HAVING', 'FILTER', 'LIMIT'],
        correct: 1,
        explanation: 'HAVING filtert nach einer Aggregation (z. B. HAVING COUNT(*) > 5), während WHERE vor der Gruppierung filtert.'
      }
    ]
  },
  {
    id: 'it_security_advanced',
    title: 'IT-Sicherheit & OWASP Cybersecurity',
    category: 'IT-Sicherheit',
    targetRoles: ['azubi', 'pro'],
    icon: '🛡️',
    readTime: '15 Min',
    summary: 'Schütze deine Anwendungen vor Hacks. Verstehe SQL Injection, Cross-Site Scripting (XSS), Hashing, Salting & Phishing.',
    content: `
### 1. Die Dreifaltigkeit der IT-Sicherheit (CIA-Triade)
1. **Vertraulichkeit (Confidentiality):** Nur autorisierte Personen dürfen Daten lesen.
2. **Integrität (Integrity):** Daten dürfen nicht unbemerkt verändert werden.
3. **Verfügbarkeit (Availability):** Systeme müssen erreichbar bleiben (Schutz vor DoS/DDoS).

### 2. OWASP Top 10 Sicherheitslücken

#### ⚠️ A) SQL Injection (SQLi)
Passiert, wenn Benutzereingaben ungesichert direkt in SQL-Strings zusammengebaut werden.

**Unsicherer Code:**
\`\`\`javascript
// GEFÄHRLICH! Angreifer gibt als passwort " ' OR '1'='1 " ein
const query = "SELECT * FROM user WHERE username = '" + inputUser + "' AND password = '" + inputPass + "'";
\`\`\`

**Sicherer Code (Parameterized Queries):**
\`\`\`javascript
// SICHER! Nutzung von PreparedStatement / Prepared Parameters
const query = "SELECT * FROM user WHERE username = ? AND password = ?";
db.execute(query, [inputUser, inputPass]);
\`\`\`

#### ⚠️ B) Cross-Site Scripting (XSS)
Angreifer schleusen bösartigen JavaScript-Code in die Webseite ein, der bei anderen Nutzern ausgeführt wird.

**Schutz:**
- Alle Benutzereingaben vor der HTML-Ausgabe **escapen / sanitizen** (z. B. \`<script>\` zu \`&lt;script&gt;\`).
- Content Security Policy (CSP) Header setzen.

### 3. Sicheres Passwort-Management
Speicher Passwörter **NIEMALS im Klartext**!
Nutze moderne Hashing-Algorithmen wie **bcrypt** oder **Argon2** mit einem eindeutigen zufälligen **Salt** für jeden Nutzer.
`,
    codeSnippet: `// Passwort-Hashing in Node.js mit bcrypt
import bcrypt from 'bcrypt';

const saltRounds = 12;
const myPlainPassword = 'Geheim123!';

// Erstelle einen sicheren Hash
const hash = await bcrypt.hash(myPlainPassword, saltRounds);

// Überprüfe das Passwort beim Login
const match = await bcrypt.compare('Geheim123!', hash); // returns true`,
    quiz: [
      {
        question: 'Wie schützt man eine Anwendung am besten gegen SQL Injection?',
        options: [
          'Passwörter in Großbuchstaben umwandeln',
          'Prepared Statements / Parametrisierte Abfragen verwenden',
          'Die Datenbank verbergen',
          'Nur GET-Requests erlauben'
        ],
        correct: 1,
        explanation: 'Parametrisierte Abfragen trennen SQL-Code strikt von den eingegebenen Daten des Nutzers.'
      },
      {
        question: 'Was unterscheidet Hashing von Verschlüsselung?',
        options: [
          'Verschlüsselung ist eine Einwegfunktion, Hashing ist umkehrbar.',
          'Hashing ist eine Einwegfunktion, Verschlüsselung ist mit einem Schlüssel umkehrbar.',
          'Es gibt keinen Unterschied.',
          'Hashing funktioniert nur bei Zahlen.'
        ],
        correct: 1,
        explanation: 'Ein Hash kann nicht rückentschlüsselt werden. Verschlüsselung kann mit dem richtigen Schlüssel wieder entschlüsselt werden.'
      }
    ]
  },
  {
    id: 'networking_osi',
    title: 'Netzwerke & OSI-Modell',
    category: 'Netzwerk & Hardware',
    targetRoles: ['azubi', 'pro'],
    icon: '📡',
    readTime: '10 Min',
    summary: 'Wie wandern Pakete durch das Internet? Verstehe das 7-Schichten OSI-Modell, IP-Adressen (IPv4/IPv6), TCP/UDP und DNS.',
    content: `
### Das 7-Schichten OSI-Modell
Das OSI-Modell beschreibt wie Daten über ein Netzwerk von einer Anwendung zum Empfänger übertragen werden:

1. **Layer 7 - Anwendung (Application):** HTTP, HTTPS, FTP, SMTP, DNS
2. **Layer 6 - Darstellung (Presentation):** Verschlüsselung (TLS/SSL), JSON, PNG
3. **Layer 5 - Sitzung (Session):** Verbindungssteuerung
4. **Layer 4 - Transport (Transport):** TCP (zuverlässig) & UDP (schnell, paketlos)
5. **Layer 3 - Netzwerk (Network):** IP-Routing (IPv4, IPv6), Router
6. **Layer 2 - Sicherung (Data Link):** MAC-Adressen, Switches, Ethernet
7. **Layer 1 - Bitübertragung (Physical):** Kabel, Glasfaser, WLAN-Frequenzen

### TCP vs. UDP
- **TCP (Transmission Control Protocol):** Handshake (SYN, SYN-ACK, ACK), garantiert korrekte Reihenfolge und Fehlerfreiheit (z. B. Webseiten, E-Mails).
- **UDP (User Datagram Protocol):** Paketversand ohne Verbindungsgarantie, extrem schnell (z. B. Video-Streaming, Online-Gaming, VoIP).
`,
    codeSnippet: `// HTTP GET Abfrage Beispiel (Layer 7)
fetch('https://api.github.com/users/octocat')
  .then(response => response.json())
  .then(data => console.log('Empfangene Daten:', data.name));`,
    quiz: [
      {
        question: 'Auf welcher OSI-Schicht arbeitet das IP-Protokoll und Router?',
        options: ['Schicht 1 (Physical)', 'Schicht 2 (Data Link)', 'Schicht 3 (Network)', 'Schicht 4 (Transport)'],
        correct: 2,
        explanation: 'Layer 3 (Netzwerkschicht) kümmert sich um logische Adressierung (IP) und Routing.'
      }
    ]
  }
];
