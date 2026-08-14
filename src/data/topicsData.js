export const TOPICS = [
  {
    id: 'it_basics',
    title: 'Computer-Grundlagen & Binärsystem',
    category: 'Grundlagen',
    difficultyLevel: 'Einsteiger',
    targetRoles: ['anfaenger', 'azubi', 'junior', 'pro'],
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
| **0101** | 0 | 1 | 0 | 1 | 4 + 1 = 5 |
| **1100** | 1 | 1 | 0 | 0 | 8 + 4 = 12 |
| **1111** | 1 | 1 | 1 | 1 | 8 + 4 + 2 + 1 = 15 |

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
    id: 'text_markup_encodings',
    title: 'Datenschutz, Datensicherheit, Zeichensätze & Plain-Text Formate',
    category: 'Grundlagen & IHK',
    difficultyLevel: 'Azubi / IHK',
    targetRoles: ['azubi', 'junior', 'pro'],
    icon: '📄',
    readTime: '12 Min',
    summary: 'Stefan Macke Podcast-Special: Unterscheidung Datenschutz vs. Datensicherheit vs. Datensicherung, ASCII vs. UTF-8 & Markdown/Asciidoc.',
    content: `
### 1. Datenschutz vs. Datensicherheit vs. Datensicherung (IHK-Klassiker)
- **Datenschutz:** Schutz von **personenbezogenen Daten** vor Missbrauch (DSGVO, Schutz des Anwenders).
- **Datensicherheit:** Schutz **jeglicher Daten** vor Verlust, Fälschung und unbefugtem Zugriff (CIA-Triade: Vertraulichkeit, Integrität, Verfügbarkeit).
- **Datensicherung (Backup):** Technische Maße (z.B. Grandfather-Father-Son Strategie) zur physischen Wiederherstellung von Daten im Katastrophenfall.

### 2. Zeichensätze & Encodings (ASCII vs. UTF-8)
- **ASCII (7-Bit):** 128 Standardzeichen (englische Buchstaben, Zahlen, Steuerzeichen).
- **ISO-8859-1 (Latin-1, 8-Bit):** 256 Zeichen inkl. deutscher Umlaute (ä, ö, ü, ß).
- **UTF-8 (Variable 1-4 Bytes):** Abwärtskompatibel zu ASCII, unterstützt über 1,1 Millionen Zeichen (inkl. Emojis und chinesische Schriftzeichen).

### 3. Plain-Text-Markup Formate (Markdown vs. Asciidoc)
- **Markdown:** Schnelle Formatierung für Dokumentationen (\`# Ueberschrift\`, \`**fett**\`).
- **Asciidoc:** Leistungsfähiges Markup-Format für technische Bücher, Handbücher und Spezifikationen.
`,
    codeSnippet: `<!-- UTF-8 Deklaration in HTML5 -->
<meta charset="UTF-8">`,
    quiz: [
      {
        question: 'Was beschreibt das Ziel des Datenschutzes (DSGVO)?',
        options: [
          'Schutz von Server-Festplatten vor Absturz',
          'Schutz der Persönlichkeitsrechte von Personen bei der Verarbeitung personenbezogener Daten',
          'Verschlüsselung der IP-Pakete im Router',
          'Regelmäßiges Erstellen von Backups'
        ],
        correct: 1,
        explanation: 'Datenschutz schützt die Rechte von betroffenen Personen bei der Verarbeitung ihrer personenbezogenen Daten.'
      }
    ]
  },
  {
    id: 'deep_learning_coursera',
    title: 'Coursera AI Masterclass: CNNs, RNNs & Transformers',
    category: 'Artificial Intelligence',
    difficultyLevel: 'Senior / Expert',
    targetRoles: ['junior', 'pro'],
    icon: '🤖',
    readTime: '15 Min',
    summary: 'Deep Learning Grundlagen inspiriert von Coursera: Convolutional Neural Networks (Bildverarbeitung), Recurrent Neural Networks & Transformer-Architekturen.',
    content: `
### 1. Neuronale Netzwerke & Layer
- **Input Layer:** Nimmt Rohdaten auf (z. B. Pixelwerte 28x28 bei Bildern).
- **Hidden Layers:** Führen mathematische Gewichtungen (W * x + b) aus.
- **Activation Functions:** ReLU ($max(0, x)$), Sigmoid, Softmax (Wahrscheinlichkeiten).

### 2. Spezialisierte KI-Architekturen
- **CNN (Convolutional Neural Networks):** Für Bild- & Videoerkennung (Convolution & Pooling Layers).
- **RNN / LSTM:** Für sequenzielle Daten und Zeitreihen.
- **Transformers (Self-Attention Mechanism):** Die Grundlage aller modernen Large Language Models (GPT-4, Gemini, Claude).
`,
    codeSnippet: `# PyTorch Multi-Layer Perceptron (MLP)
import torch.nn as nn

model = nn.Sequential(
    nn.Linear(784, 128),
    nn.ReLU(),
    nn.Linear(128, 10),
    nn.Softmax(dim=1)
)`,
    quiz: [
      {
        question: 'Welche Architektur bildet das Fundament moderner Large Language Models (LLMs)?',
        options: ['CNN', 'RNN', 'Transformer (Self-Attention)', 'Decision Trees'],
        correct: 2,
        explanation: 'Transformers mit Self-Attention ermöglichen die parallele Verarbeitung großer Textmengen.'
      }
    ]
  },
  {
    id: 'python_master_course',
    title: 'Python Complete Guide (W3Schools-Style)',
    category: 'Programmierung',
    difficultyLevel: 'Einsteiger',
    targetRoles: ['anfaenger', 'azubi', 'junior', 'pro'],
    icon: '🐍',
    readTime: '15 Min',
    summary: 'Der umfassende Python-Kurs von Variablen, Kontrollstrukturen, Listen, Dictionaries bis hin zu Objektorientierung & Exception Handling.',
    content: `
### 1. Warum Python lernen?
Python ist eine der weltweit beliebtesten Programmiersprachen. Sie zeichnet sich durch eine extrem einfache, englisch-ähnliche Syntax aus.

### 2. Variablen & Datentypen
\`\`\`python
name = "DevGame"    # String (Text)
alter = 25          # Integer (Ganzzahl)
preis = 19.99       # Float (Fließkommazahl)
is_active = True    # Boolean (Wahrheitswert)
\`\`\`

### 3. Datenstrukturen in Python
- **Lists (Listen):** Geordnet und veränderbar (\`[1, 2, 3]\`)
- **Tuples:** Geordnet und unveränderbar (\`(1, 2, 3)\`)
- **Dictionaries:** Schlüssel-Wert Paare (\`{"name": "Alex", "age": 30}\`)

### 4. Kontrollstrukturen & Schleifen
\`\`\`python
score = 85

if score >= 90:
    print("Grade A")
elif score >= 75:
    print("Grade B")
else:
    print("Grade C")

# For-Schleife über eine Liste
fruits = ["Apfel", "Banane", "Kirsche"]
for fruit in fruits:
    print(f"Frucht: {fruit}")
\`\`\`

### 5. Funktionen & OOP
\`\`\`python
def greet(user_name):
    return f"Hallo {user_name}!"

class Player:
    def __init__(self, name, score):
        self.name = name
        self.score = score

player1 = Player("Alex", 100)
\`\`\`
`,
    codeSnippet: `# Python Komplett-Beispiel
def calculate_average(numbers_list):
    if not numbers_list:
        return 0
    return sum(numbers_list) / len(numbers_list)

scores = [80, 95, 70, 100, 85]
avg = calculate_average(scores)
print(f"Durchschnitt: {avg:.2f}")`,
    quiz: [
      {
        question: 'Welches Schlüsselwort definiert eine eigene Funktion in Python?',
        options: ['function', 'def', 'fn', 'void'],
        correct: 1,
        explanation: 'In Python werden eigene Funktionen mit dem Schlüsselwort `def` definiert.'
      }
    ]
  },
  {
    id: 'web_html_css',
    title: 'Webentwicklung: HTML5 & CSS3',
    category: 'Webentwicklung',
    difficultyLevel: 'Einsteiger',
    targetRoles: ['anfaenger', 'azubi', 'junior', 'pro'],
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
  background-color: #f8fafc;
  color: #0f172a;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

button {
  background: linear-gradient(135deg, #4f46e5, #0d9488);
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
        question: 'Wofür steht die Abkürzung HTML?',
        options: [
          'HyperText Markup Language',
          'High Tech Modern Language',
          'Home Tool Markup List',
          'Hyperlink Test Mode Logic'
        ],
        correct: 0,
        explanation: 'HTML steht für HyperText Markup Language und bildet die Struktur von Webseiten.'
      }
    ]
  },
  {
    id: 'js_programming',
    title: 'Programmierung mit JavaScript (ES6+)',
    category: 'Programmierung',
    difficultyLevel: 'Azubi / IHK',
    targetRoles: ['azubi', 'junior', 'pro'],
    icon: '⚡',
    readTime: '12 Min',
    summary: 'Verstehe Variablen, Datentypen, Schleifen, Funktionen, ES6 Arrows & Arrow Functions und DOM-Manipulation.',
    content: `
### 1. Grundlagen der Softwareentwicklung
Variablen speichern Daten im Speicher:
- \`let\`: Verändere Variablenwert.
- \`const\`: Unveränderliche Konstante (Standard).

\`\`\`javascript
const spielerName = "Alex";
let xp = 150;
let hatSchluessel = true;

// Kontrollstruktur
if (xp >= 100 && hatSchluessel) {
  console.log("Tür zum nächsten Level geöffnet!");
} else {
  console.log("Sammle mehr XP oder suche den Schlüssel.");
}
\`\`\`

### 2. Arrays & Objekte
\`\`\`javascript
// Array (Liste)
const inventar = ["Schwert", "Trank", "Schild"];

// Objekt (Schlüssel-Wert Paar)
const spieler = {
  name: "Alex",
  level: 5,
  skills: ["JavaScript", "SQL"]
};
\`\`\`
`,
    codeSnippet: `// Array-Methoden
const zahlen = [1, 2, 3, 4, 5];
const verdoppelt = zahlen.map(n => n * 2);
console.log(verdoppelt); // [2, 4, 6, 8, 10]`,
    quiz: [
      {
        question: 'Welches Schlüsselwort deklariert eine unveränderliche Konstante in JavaScript?',
        options: ['let', 'var', 'const', 'static'],
        correct: 2,
        explanation: 'Mit `const` deklarierte Variablen können nach der Zuweisung nicht mehr neu zugewiesen werden.'
      }
    ]
  },
  {
    id: 'sql_databases',
    title: 'Relationales Datenbank-Design & SQL Querying',
    category: 'Datenbanken',
    difficultyLevel: 'Azubi / IHK',
    targetRoles: ['azubi', 'junior', 'pro'],
    icon: '🗄️',
    readTime: '12 Min',
    summary: 'Master SQL SELECT, WHERE, JOINs (INNER, LEFT), GROUP BY und Tabellen-Relationalität (1:N, M:N).',
    content: `
### 1. Warum relationale Datenbanken?
Datenbanken speichern Daten strukturiert in Tabellen mit Zeilen (Datensätze) und Spalten (Attribute).

### 2. Die wichtigsten SQL-Befehle
- **SELECT:** Daten abfragen.
- **INSERT:** Neue Daten einfügen.
- **UPDATE:** Bestehende Daten ändern.
- **DELETE:** Daten löschen.

\`\`\`sql
-- Abfrage von Benutzern aus Berlin
SELECT name, email, level 
FROM user_profiles 
WHERE stadt = 'Berlin' 
ORDER BY level DESC;
\`\`\`

### 3. Verknüpfung von Tabellen (JOIN)
\`\`\`sql
SELECT k.kunden_name, b.bestell_datum, b.betrag
FROM kunden k
JOIN bestellungen b ON k.id = b.kunden_id;
\`\`\`
`,
    codeSnippet: `SELECT department, COUNT(*) as anzahl, AVG(gehalt) as avg_gehalt
FROM mitarbeiter
GROUP BY department
HAVING AVG(gehalt) > 50000;`,
    quiz: [
      {
        question: 'Welcher SQL-Befehl verknüpft Datensätze zweier Tabellen über ein gemeinsames Attribut?',
        options: ['MERGE', 'JOIN', 'CONNECT', 'UNION'],
        correct: 1,
        explanation: 'Der JOIN-Befehl verbindet Zeilen aus zwei oder mehr Tabellen basierend auf einer verknüpften Spalte.'
      }
    ]
  },
  {
    id: 'networking_osi',
    title: 'Netzwerke & das OSI 7-Schichten Modell',
    category: 'Netzwerke',
    difficultyLevel: 'Azubi / IHK',
    targetRoles: ['azubi', 'junior', 'pro'],
    icon: '📡',
    readTime: '15 Min',
    summary: 'Das Fundament der IT-Infrastruktur: IP-Adressen (IPv4/IPv6), Subnetting, TCP/UDP, DNS, HTTP/HTTPS.',
    content: `
### 1. Das OSI-Referenzmodell
Das OSI-Modell unterteilt die Netzwerkkommunikation in 7 Schichten:

1. **Physical Layer (Bitübertragung):** Kabel, Glasfaser, WLAN-Frequenzen.
2. **Data Link Layer (Sicherung):** MAC-Adressen, Switches, Ethernet.
3. **Network Layer (Vermittlung):** IP-Adressen, Router, ICMP.
4. **Transport Layer (Transport):** TCP (zuverlässig), UDP (schnell).
5. **Session Layer (Sitzung):** Verbindungssteuerung.
6. **Presentation Layer (Darstellung):** Verschlüsselung (TLS/SSL), Formate.
7. **Application Layer (Anwendung):** HTTP, HTTPS, FTP, SSH, DNS.

### 2. IP-Adressen & Subnetting
Eine IPv4-Adresse besteht aus 32 Bit (4 Oktette à 8 Bit), z. B. \`192.168.1.1\`.
Die Subnetzmaske \`255.255.255.0\` (oder \`/24\`) trennt Netz-ID von Host-ID.
`,
    codeSnippet: `# Ping-Test zur Erreichbarkeit
ping 8.8.8.8

# Traceroute zur IP-Routenverfolgung
traceroute google.com`,
    quiz: [
      {
        question: 'Auf welcher OSI-Schicht arbeitet das IP-Protokoll?',
        options: ['Schicht 2 (Sicherung)', 'Schicht 3 (Vermittlung)', 'Schicht 4 (Transport)', 'Schicht 7 (Anwendung)'],
        correct: 1,
        explanation: 'Das IP-Protokoll gehört zur Schicht 3 (Network Layer / Vermittlungsschicht).'
      }
    ]
  },
  {
    id: 'it_security_advanced',
    title: 'Cyber-Security, OWASP & Hashing',
    category: 'Security',
    difficultyLevel: 'Senior / Expert',
    targetRoles: ['azubi', 'junior', 'pro'],
    icon: '🛡️',
    readTime: '15 Min',
    summary: 'OWASP Top 10, SQL Injections, Cross-Site Scripting (XSS), Kryptographie, Hashes (bcrypt) & JWT Tokens.',
    content: `
### 1. OWASP Top 10 Schwachstellen
1. **Broken Access Control:** Mangelhafte Rechteprüfung.
2. **Cryptographic Failures:** Unverschlüsselte sensible Daten.
3. **Injection (z. B. SQLi):** Schadcode in Benutzereingaben.
4. **Insecure Design:** Sicherheitsmängel im Softwarearchitektur-Plan.

### 2. SQL Injection Schutz (Prepared Statements)
🔴 **Unsicher (Vulnerabel):**
\`\`\`javascript
// GEFÄHRLICH: Zeichenketten-Konkatenation!
const query = "SELECT * FROM users WHERE name = '" + userInput + "'";
\`\`\`

🟢 **Sicher (Prepared Statement):**
\`\`\`javascript
// SICHER: Parameterbindung verhindert SQLi!
const query = "SELECT * FROM users WHERE name = ?";
db.execute(query, [userInput]);
\`\`\`

### 3. Passwort-Hashing (bcrypt / Argon2)
Passwörter dürfen **niemals** im Klartext gespeichert werden. Verwende Kryptographische Hashing-Algorithmen mit Salt.
`,
    codeSnippet: `import bcrypt from 'bcrypt';

// Passwort hashen (10 Salt Rounds)
const hash = await bcrypt.hash("MeinPasswort123!", 10);

// Passwort überprüfen
const match = await bcrypt.compare("MeinPasswort123!", hash);
console.log(match); // true`,
    quiz: [
      {
        question: 'Wie schützt man eine Anwendung effektiv vor SQL-Injection Angriffsvektoren?',
        options: [
          'Durch Deaktivieren von JavaScript',
          'Durch die Verwendung von Prepared Statements / Parameterisierten Abfragen',
          'Durch Ausblenden der Eingabefelder',
          'Durch Neustart des Datenbankservers'
        ],
        correct: 1,
        explanation: 'Prepared Statements trennen den SQL-Befehl von den Nutzereingaben und verhindern das Einschleusen von Schadcode.'
      }
    ]
  }
];
