# 💻 IT-DevGame | Interaktives Informatik-Spiel & Lernplattform für alle Altersgruppen

Ein modernes, gamifiziertes Web-Anwendungs-Framework zum Erlernen von Informatik-Grundlagen, Softwareentwicklung, Datenbanken, IT-Sicherheit, Logikschaltungen, Netzwerken und RegEx – **geeignet für Menschen jeden Alters (ohne Vorwissen) bis hin zu IT-Auszubildenden und erfahrenen Senior-Programmierern**.

---

## 📋 Inhaltsverzeichnis
- [Übersicht & Zielgruppen](#-übersicht--zielgruppen)
- [Hauptfunktionen & Neue Features](#-hauptfunktionen--neue-features)
- [Barrierefreiheit & Inklusion](#-barrierefreiheit--inklusion)
- [Ordnerstruktur](#-ordnerstruktur)
- [Dateiinhalt & Komponentenübersicht](#-dateiinhalt--komponentenübersicht)
- [Funktionsweise](#-funktionsweise)
- [DSGVO & Datenschutz](#-dsgvo--datenschutz)
- [Anleitung (Installation & Ausführung)](#-anleitung-installation--ausführung)
- [Änderungshistorie & Entwicklungsdokumentation](#-änderungshistorie--entwicklungsdokumentation)

---

## 🎯 Übersicht & Zielgruppen

**IT-DevGame** ist so konzipiert, dass **jeder Mensch – unabhängig von Alter oder Vorkenntnissen** – spielerisch in die Welt der Informatik einsteigen oder bestehendes Wissen gezielt vertiefen kann:

1. **🌱 Einsteiger & Neugierige (Kinder, Senioren, Quereinsteiger)**:
   - Lernen ohne jegliche Vorkenntnisse.
   - Grundlagen spielerisch erklärt: Wie denkt ein PC? Was sind Bits/Bytes? Erste Schritte in HTML/CSS & Binärlogik.
2. **⚡ IT-Auszubildende (Fachinformatiker AE/SI, IT-Systemelektroniker)**:
   - Gezieltes IHK-Prüfungswissen, Berufsschul-Themen (SQL JOINs, Netzwerke/OSI, OOP, Pseudocode, Lückentexte).
3. **🚀 Junior Developer**:
   - Clean Code Prinzipien, REST-APIs, RegEx, Git-Workflows und praxisnahe Mikroprojekte.
4. **🔥 Erfahrene Senior Developer & IT-Architekten**:
   - Fortgeschrittene Cybersecurity (OWASP Top 10, SQLi, XSS), Datenbank-Performance & Indexing, RegEx & System-Architektur.

---

## 🔥 Hauptfunktionen & Neue Features

* **🔍 RegEx Lab & Pattern Tester (`RegexLab.jsx`)**:
  * Interaktiver Simulator zum Ausprobieren und Testen regulärer Ausdrücke mit sofortiger Treffer-Visualisierung & Level-Aufgaben.
* **🎴 Spaced Repetition Karteikarten-Trainer (`FlashcardsModal.jsx`)**:
  * Anki-inspirierte IT-Karteikarten mit Umklapp-Animation zur Vorbereitung auf Prüfungen.
* **💾 Daten Backup & Wiederherstellungs-Manager (`BackupModal.jsx`)**:
  * Exportiere den gesamten Lernfortschritt (XP, Level, Badges) als JSON-Datei und importiere ihn geräteübergreifend.
* **📖 Interaktives IT-Lexikon & Fachbegriffe (`GlossaryModal.jsx`)**:
  * Durchsuchbares Glossar mit einfachen Erklärungen für Einsteiger und technischen Details für Azubis & Devs inklusive Audio-Vorlesefunktion.
* **🎓 IHK-Prüfungssimulator (`ExamSimulator.jsx`)**:
  * Realistische Prüfungssimulation für Fachinformatiker (GAP 1 / GAP 2) mit automatischer Auswertung, Erklärungen & XP.
* **📊 Skill-Matrix Visualizer (`SkillMatrixWidget.jsx`)**:
  * Visueller Fortschrittsbalken für 6 Kernkompetenzen (Hardware, Web, Code, Datenbanken, Netzwerke, Security).
* **⚡ Tages-Challenge & Streak-Bonus (`DailyChallengeWidget.jsx`)**:
  * Tägliche Quests zur Wissensüberprüfung und Bonus-XP Belohnung.
* **📜 Zertifikat-Generator (`CertificateModal.jsx`)**:
  * Generierung und Export/Druck von Qualifikations-Zertifikaten für erreichte Lernfortschritte.

---

## ♿ Barrierefreiheit & Inklusion

* **Lese-Rechtschreib-Hilfe (Dyslexie-Modus)**: Spezialschriftart (*Atkinson Hyperlegible*), erweiterter Zeichen- & Zeilenabstand.
* **Rot-Grün-Sehhilfe (Farbenblindheits-Modus)**: Zusätzliche Icon-Indikatoren (✓ / ✗) und barrierefreie Farbwelten.
* **Vorlesefunktion (Text-to-Speech)**: Audio-Steuerung (Play/Pause/Stopp) zum Vorlesen aller Lerneinheiten.
* **Schriftgrößen-Skalierung**: Stufenlose Anpassung (A- / 100% / A+).
* **100% DSGVO-konform**: Keine Tracking-Cookies, alle Daten verbleiben rein lokal im `localStorage`.

---

## 📁 Ordnerstruktur

```
Informatik-lernen/
├── .agents/
│   └── AGENTS.md
├── .gitignore
├── .oxlintrc.json
├── index.html
├── package.json
├── package-lock.json
├── README.md
├── vite.config.js
├── public/
└── src/
    ├── App.css
    ├── App.jsx
    ├── index.css
    ├── main.jsx
    ├── components/
    │   ├── Content/
    │   │   ├── ClozeTester.jsx
    │   │   ├── ExamSimulator.jsx
    │   │   ├── GlossaryModal.jsx
    │   │   ├── TopicReader.jsx
    │   │   └── VideoHub.jsx
    │   ├── Footer/
    │   │   └── DsgvoFooterModal.jsx
    │   ├── Games/
    │   │   ├── CodePuzzle.jsx
    │   │   ├── LogicGatesGame.jsx
    │   │   ├── RegexLab.jsx
    │   │   ├── SecurityLab.jsx
    │   │   ├── SqlDungeon.jsx
    │   │   └── WebSandbox.jsx
    │   ├── Gamification/
    │   │   ├── BadgesModal.jsx
    │   │   ├── BackupModal.jsx
    │   │   ├── CertificateModal.jsx
    │   │   ├── DailyChallengeWidget.jsx
    │   │   ├── FlashcardsModal.jsx
    │   │   └── SkillMatrixWidget.jsx
    │   ├── Navigation/
    │   │   ├── AccessibilityToolbar.jsx
    │   │   ├── DifficultyFilterBar.jsx
    │   │   ├── MobileNav.jsx
    │   │   └── Navbar.jsx
    │   ├── Onboarding/
    │   │   └── RoleSelectionModal.jsx
    │   └── Projects/
    │       └── ProjectViewer.jsx
    ├── data/
    │   ├── clozeData.js
    │   ├── examData.js
    │   ├── flashcardsData.js
    │   ├── gamesData.js
    │   ├── glossaryData.js
    │   ├── projectsData.js
    │   ├── topicsData.js
    │   ├── userProfiles.js
    │   └── videosData.js
    ├── styles/
    │   └── global.css
    └── utils/
        └── storage.js
```

---

## 🛠️ Anleitung (Installation & Ausführung)

```bash
# 1. Klonen des Repositories
git clone https://github.com/Schengii/Informatik-lernen.git
cd Informatik-lernen

# 2. Abhängigkeiten installieren
npm install

# 3. Entwicklungsserver starten
npm run dev

# 4. Produktions-Build erstellen & testen
npm run build
npm run lint
```

---

## 📝 Änderungshistorie & Entwicklungsdokumentation

### Versionsverlauf

#### [v1.4.0] - RegEx Lab, IT-Karteikarten Trainer & Backup Manager
* **RegEx Lab (`RegexLab.jsx`)**: Interaktive RegEx-Umgebung mit Suchmuster-Aufgaben.
* **Karteikarten-Trainer (`FlashcardsModal.jsx`)**: Spaced Repetition Karteikarten für IHK-Fachbegriffe.
* **Backup Manager (`BackupModal.jsx`)**: JSON Export & Import des Lernfortschritts.

#### [v1.3.0] - IT-Lexikon, IHK Prüfungssimulator, Skill-Matrix, Tages-Challenge & Zertifikate
* IT-Lexikon, IHK Prüfungssimulator, Skill-Matrix, Tages-Challenge & Zertifikat-Generator.

#### [v1.2.0] - Zielgruppen-Erweiterung für jedes Alter & Vorwissen
* Erweiterung des Nutzerprofil-Systems & Einführung von `DifficultyFilterBar.jsx`.

#### [v1.1.0] - Helles High-Contrast Design, Barrierefreiheit & DSGVO
* UI-Redesign, Barrierefreiheit, Vorlesefunktion & DSGVO-Modal.

#### [v1.0.0] - Initiales Release
* Initiales Setup des IT-DevGame Repositories.
