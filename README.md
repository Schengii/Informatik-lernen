# 💻 IT-DevGame | Interaktives Informatik-Spiel & Lernplattform

Ein modernes, gamifiziertes Web-Anwendungs-Framework zum Erlernen von Informatik-Grundlagen, Softwareentwicklung, Datenbanken, IT-Sicherheit, Logikschaltungen und Netzwerken.

---

## 📋 Inhaltsverzeichnis
- [Übersicht & Beschreibung](#-übersicht--beschreibung)
- [Hauptfunktionen](#-hauptfunktionen)
- [Ordnerstruktur](#-ordnerstruktur)
- [Dateiinhalt & Komponentenübersicht](#-dateiinhalt--komponentenübersicht)
- [Funktionsweise](#-funktionsweise)
- [Anleitung (Installation & Ausführung)](#-anleitung-installation--ausführung)
- [Änderungshistorie & Entwicklungsdokumentation](#-änderungshistorie--entwicklungsdokumentation)

---

## 🎯 Übersicht & Beschreibung

**IT-DevGame** ist eine interaktive Lernplattform für angehende Informatiker (u. a. Fachinformatiker Anwendungsentwicklung, Systemintegration, IT-Systemelektroniker). Die Anwendung kombiniert theoretische Inhalte mit praxisnahen Mini-Games, Lückentext-Tests, Code-Sandboxes und Gamification-Elementen (XP, Level, Streaks, Badges), um Lernfortschritte spielerisch zu steigern.

---

## 🔥 Hauptfunktionen

* **🎮 Interaktive Mini-Games**:
  * **Logic Gates Simulator**: Digitale Logikgatter (AND, OR, NOT, XOR, NAND, NOR) testen & Schaltungen simulieren.
  * **SQL Dungeon**: Datenbankabfragen (SELECT, JOIN, WHERE, GROUP BY) lösen.
  * **Web Sandbox**: Live HTML/CSS/JS Code-Editor mit Echtzeit-Vorschau.
  * **Security Lab**: Cyber-Security Scenarios (Phishing, Passwort-Stärke, Hashing, Port-Scans).
  * **Code Puzzle**: Code-Blöcke per Drag/Click in die richtige Reihenfolge bringen.
* **📚 Theorie & Lückentext**:
  * **Themen-Reader**: Detaillierte Module zu Hardware, Netzwerken, Programmierung, Datenbanken & Security.
  * **Lückentext-Tester (Cloze Tester)**: Interaktive Wissensüberprüfung mit sofortiger Auswertung.
* **🎥 Video Hub**:
  * Strukturierte Sammlung von Lernvideos mit Filter nach Themen und Kategorien.
* **🏆 Gamification**:
  * XP (Erfahrungspunkte), Level-Aufstiege, tägliche Streaks, Münzen und freischaltbare Abzeichen (Badges).
* **👤 Rollen- & Profilauswahl**:
  * Anpassung der Lernpfade basierend auf Spezialisierungen (z. B. Anwendungsentwicklung vs. Systemintegration).
* **🌙 Modernes UI/UX**:
  * Dark-Mode Support, Glassmorphism-Design, responsive Steuerung für Desktop & Mobilgeräte.

---

## 📁 Ordnerstruktur

```
Informatik-lernen/
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
    ├── assets/
    │   ├── hero.png
    │   ├── react.svg
    │   └── vite.svg
    ├── components/
    │   ├── Content/
    │   │   ├── ClozeTester.jsx
    │   │   ├── TopicReader.jsx
    │   │   └── VideoHub.jsx
    │   ├── Games/
    │   │   ├── CodePuzzle.jsx
    │   │   ├── LogicGatesGame.jsx
    │   │   ├── SecurityLab.jsx
    │   │   ├── SqlDungeon.jsx
    │   │   └── WebSandbox.jsx
    │   ├── Gamification/
    │   │   └── BadgesModal.jsx
    │   ├── Navigation/
    │   │   ├── MobileNav.jsx
    │   │   └── Navbar.jsx
    │   ├── Onboarding/
    │   │   └── RoleSelectionModal.jsx
    │   └── Projects/
    │       └── ProjectViewer.jsx
    ├── data/
    │   ├── clozeData.js
    │   ├── gamesData.js
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

### Core-Dateien
* **`index.html`**: HTML5-Einstiegspunkt mit SEO-Meta-Tags und Google Fonts.
* **`vite.config.js`**: Vite-Bundler Konfiguration mit React Plugin.
* **`package.json`**: Projektabhängigkeiten (React 19, Lucide React, Canvas-Confetti, Vite, Oxlint) und Scripts.
* **`src/main.jsx`**: React-Render-Initialisierung.
* **`src/App.jsx`**: Hauptkomponente für Tab-Routing, globalen Gamification-State, Suche und Theme-Verwaltung.

### Komponenten (`src/components/`)
* **`Navigation/Navbar.jsx`**: Kopfzeile mit Suche, Level-/XP-Anzeige, Streak, Münzen, Profil-Button und Theme-Toggle.
* **`Navigation/MobileNav.jsx`**: Untere Navigationsleiste für mobile Geräte.
* **`Content/TopicReader.jsx`**: Darstellung der Theorie-Lektionen mit Fortschrittsbalken und Quizzes.
* **`Content/ClozeTester.jsx`**: Interaktives Ausfüllen von Lückentexten zur Überprüfung des Gelernten.
* **`Content/VideoHub.jsx`**: Übersicht und Abspielen von erklärenden Lehrvideos.
* **`Games/LogicGatesGame.jsx`**: Simulation logischer Gatter und Verknüpfungen.
* **`Games/SqlDungeon.jsx`**: Interaktiver SQL-Trainer mit sofortigem Abfrage-Feedback.
* **`Games/WebSandbox.jsx`**: Live-Editor für Webtechnologien (HTML/CSS/JS).
* **`Games/SecurityLab.jsx`**: Cyber-Security Labor für Passwörter, Hashes und Angriffsvektoren.
* **`Games/CodePuzzle.jsx`**: Logisches Ordnen von Programmcode-Segmenten.
* **`Gamification/BadgesModal.jsx`**: Übersicht aller Errungenschaften, Abzeichen und Freischaltungen.
* **`Onboarding/RoleSelectionModal.jsx`**: Dialog zur Auswahl der Informatik-Fachrichtung.
* **`Projects/ProjectViewer.jsx`**: Praxisnahe Musterprojekte und Code-Beispiele.

### Daten & Utilities (`src/data/` & `src/utils/`)
* **`topicsData.js`**: Lernmodule & Fachinhalte.
* **`clozeData.js`**: Aufgaben & Lösungen für Lückentexte.
* **`gamesData.js`**: Level-Szenarien und Herausforderungen der Mini-Games.
* **`projectsData.js`**: Projektbeschreibungen und Starter-Code.
* **`videosData.js`**: Videometadaten & Einbettungs-Links.
* **`userProfiles.js`**: Rollenprofile und Skill-Pfade.
* **`storage.js`**: Helferfunktionen zur Speicherung des Lernfortschritts im `localStorage`.

---

## ⚙️ Funktionsweise

1. **State & Speicherung**:
   * Der Lernfortschritt, gesammelte XP, erreichte Level, gelöste Aufgaben und freigeschaltete Badges werden automatisch über `src/utils/storage.js` im lokalen Speicher des Browsers (`localStorage`) persistent gehalten.
2. **Gamification-Engine**:
   * Das Lösen von Lerneinheiten, Quizzes und Games belohnt Nutzer mit XP. Bei Erreichen von XP-Schwellen steigt das Level. Besondere Meilensteine lösen Konfetti-Effekte (`canvas-confetti`) und Badge-Freischaltungen aus.
3. **Interaktives Feedback**:
   * Alle Mini-Games (z. B. SQL Dungeon oder Logic Gates) bewerten die Eingaben der Nutzer in Echtzeit und geben sofort visuelles und didaktisches Feedback.

---

## 🛠️ Anleitung (Installation & Ausführung)

### Voraussetzungen
* **Node.js** (Version 18.x oder höher empfohlen)
* **npm** (oder yarn/pnpm)

### Setup & Befehle

1. **Repository klonen**:
   ```bash
   git clone https://github.com/Schengii/Informatik-lernen.git
   cd Informatik-lernen
   ```

2. **Abhängigkeiten installieren**:
   ```bash
   npm install
   ```

3. **Entwicklungsserver starten**:
   ```bash
   npm run dev
   ```
   Die Anwendung ist anschließend im Browser unter `http://localhost:5173` erreichbar.

4. **Produktions-Build erstellen**:
   ```bash
   npm run build
   ```

5. **Linter ausführen**:
   ```bash
   npm run lint
   ```

---

## 📝 Änderungshistorie & Entwicklungsdokumentation

> **Hinweis für zukünftige Entwicklungen**:
> Die `README.md` wird bei allen zukünftigen Modifikationen, Erweiterungen, Fehlerbehebungen und neuen Features automatisch aktualisiert.

### Versionsverlauf

#### [v1.0.0] - initiales Release & Git Repository Push
* **Initiales Setup**: Einrichtung des Git-Repositories und Verknüpfung mit GitHub (`Schengii/Informatik-lernen`).
* **Lernplattform & UI**: Modernes React + Vite Setup mit responsivem Navigation-System, Dark Mode & Glassmorphism Design.
* **Mini-Games**: Integration von Logic Gates, SQL Dungeon, Web Sandbox, Security Lab und Code Puzzle.
* **Lernmodule**: Theorie-Reader, Lückentext-Tester, Video Hub und Projekt-Showcase.
* **Gamification System**: XP, Level-Up System, Streaks, Münzen und freischaltbare Auszeichnungen.
* **Dokumentation**: Erstellung der ausführlichen Projektdokumentation in der `README.md`.
