# 💻 IT-DevGame | Interaktives Informatik-Spiel & Lernplattform für alle Altersgruppen

Ein modernes, gamifiziertes Web-Anwendungs-Framework zum Erlernen von Informatik-Grundlagen, Softwareentwicklung, Datenbanken, IT-Sicherheit, Logikschaltungen und Netzwerken – **geeignet für Menschen jeden Alters (ohne Vorwissen) bis hin zu IT-Auszubildenden und erfahrenen Senior-Programmierern**.

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
   - Clean Code Prinzipien, REST-APIs, Git-Workflows und praxisnahe Mikroprojekte.
4. **🔥 Erfahrene Senior Developer & IT-Architekten**:
   - Fortgeschrittene Cybersecurity (OWASP Top 10, SQLi, XSS), Datenbank-Performance & Indexing, RegEx & System-Architektur.

---

## 🔥 Hauptfunktionen & Neue Features

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
* **🎚️ Interaktiver Schwierigkeitsgrad-Filter**:
  * Umschaltung zwischen `🟢 Einsteiger`, `🔵 Azubi / IHK`, `🟣 Senior / Expert` und `Alle Levels`.

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
    │   │   ├── SecurityLab.jsx
    │   │   ├── SqlDungeon.jsx
    │   │   └── WebSandbox.jsx
    │   ├── Gamification/
    │   │   ├── BadgesModal.jsx
    │   │   ├── CertificateModal.jsx
    │   │   ├── DailyChallengeWidget.jsx
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

## 📄 Dateiinhalt & Komponentenübersicht

### Neue Module
* **`src/components/Content/GlossaryModal.jsx`**: Interaktives IT-Lexikon mit Suchfunktion, Kategorien & Vorleser.
* **`src/components/Content/ExamSimulator.jsx`**: IHK Prüfungssimulation mit auswertbaren Prüfungsfragen.
* **`src/components/Gamification/SkillMatrixWidget.jsx`**: Visuelle Kompetenzverteilung.
* **`src/components/Gamification/DailyChallengeWidget.jsx`**: Tägliche Aufgaben mit Bonus XP.
* **`src/components/Gamification/CertificateModal.jsx`**: Qualifikations-Zertifikat mit Druck- / PDF-Funktion.

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

#### [v1.3.0] - IT-Lexikon, IHK Prüfungssimulator, Skill-Matrix, Tages-Challenge & Zertifikate
* **Interaktives IT-Lexikon (`GlossaryModal.jsx`)**: Suchbares Glossar mit einfachen Erklärungen für Einsteiger und Experten-Details.
* **IHK Prüfungssimulator (`ExamSimulator.jsx`)**: Realistische Prüfungsfragen mit Auswertung, Erklärung und Fortschritt.
* **Skill-Matrix (`SkillMatrixWidget.jsx`)**: Kompetenzübersicht in 6 IT-Bereichen.
* **Tages-Challenge (`DailyChallengeWidget.jsx`)**: Tägliche Wechsel-Quests & Streak-Vorteile.
* **Zertifikat-Generator (`CertificateModal.jsx`)**: Ausstellbare Zertifikate mit Druck- & PDF-Funktion.

#### [v1.2.0] - Zielgruppen-Erweiterung für jedes Alter & Vorwissen (Einsteiger bis Senior Dev)
* Erweiterung des Nutzerprofil-Systems & Einführung von `DifficultyFilterBar.jsx`.

#### [v1.1.0] - Helles High-Contrast Design, Barrierefreiheit (WCAG/Dyslexie/Sehhilfe), TTS & DSGVO
* UI-Redesign, Barrierefreiheit, Vorlesefunktion & DSGVO-Modal.

#### [v1.0.0] - initiales Release & Git Repository Push
* Initiales Setup des IT-DevGame Repositories.
