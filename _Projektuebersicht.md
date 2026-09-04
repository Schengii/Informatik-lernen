---
tags:
  - project/informatik-lernen
  - type/software
  - tech/react
  - domain/ihk-ausbildung
  - status/active
version: v3.33.0
date: 2026-09-04
---

# 💻 Informatik-lernen (IT-DevGame) - Projektübersicht

> Interaktive IHK-Prüfungsvorbereitung, Gamification & IT-Simulatoren-Hub für Fachinformatiker (FIAE, FISI, FIDP, FIDV, IT-SE).

## 📂 Verlinkte Hauptdateien im Vault
- [[README|📄 Projektdokumentation & Feature-Guide]]
- [[CLAUDE|🛠️ Entwickler- & KI-Leitfaden (CLAUDE.md)]]
- `.gitignore` & `.claudeignore`

---

## 🚀 Wichtige Meilensteine (Version 3.33.0)
1. **IHK Projekt-Gantt & Meilenstein-Editor**: Offizielles Zeitplanungs- und Phasen-Tool für den IHK-Abschlussbericht und Projektantrag (FIAE 80h / FISI 40h), Kalender-Gantt ohne Wochenenden, Realisierungs-/Dokumentations-Grenzwertprüfung und Markdown-Export.
2. **WebAssembly 128-Bit SIMD & Vector Studio**: 128-Bit Vektor-Register (`v128`, `f32x4`, `i32x4`, `u8x16`), Parallelisierung von 4 Floats in einem CPU-Takt, MFLOPS-Durchsatzmessung gegen skalaren JS-Code (~3.8x Hardware-Speedup) und WAT Bytecode-Generierung.
3. **HTTP/3 & QUIC Protocol Inspector**: Multi-Stream UDP-Multiplexing Simulator, Head-of-Line Blocking Eliminierung bei Paketverlust (0-35%), 0-RTT TLS 1.3 Handshake & Connection-ID (CID) Migration bei Netzwerkwechsel (WLAN zu 5G).
4. **Zustand Store IndexedDB Hydration & Redundanter Persistenz-Layer**: Asynchrone Dual-Persistence Spiegelung aller Benutzer- und Lernzustände in IndexedDB, Notfall-Hydration bei gelöschtem LocalStorage und Checkpoint-Snapshotting.
5. **IHK Präsentations-Stoppuhr & Folien-Gliederung**: 15-Minuten Countdown für AP2 Teil A, 4 Phasen-Gliederung mit Zeitbudgets, Web Audio Gong-Signale & Rubriken-Bewertung (1-6).
6. **Docker Compose Multi-Container Orchestrator**: Topologische DAG-Startreihenfolge (`depends_on`), Bridge-Netzwerk-Isolation mit Ping-Simulator, persistente Docker-Volumes & Compose 3.8 YAML Export.
7. **Dynamic CI/CD GitHub Actions Workflow Simulator**: Mehrstufige Pipelines (`needs`), Dependency Caching (`actions/cache@v4`), Secrets-Maskierung (`***`) & Live ANSI Runner-Logs.
8. **Offline IndexedDB Storage Synchronizer**: Asynchrone NoSQL-Persistenz über das 5-MB-LocalStorage-Limit hinaus, Dual-Save-Architektur im Notizbuch (`PersonalNotebookLab.jsx`).
9. **IHK Fachgespräch & Audio-Prüfungssimulator**: 15-Minuten Fachgespräch mit Web Speech API (TTS-Fragen & STT-Einsprechen), 3 Persona-Prüfer & Notenschlüssel (1-6).
10. **Ansible Playbook & Idempotenz Studio**: Deklarative Server-Provisionierung (`inventory.ini`, `playbook.yml`) mit interaktivem Beweis der Idempotenz.
11. **Web Worker & Concurrency Studio**: Benchmark rechenintensiver CPU-Tasks (Eratosthenes Primzahl-Sieb & Monte-Carlo RAID URE Simulation) mit 60 FPS Herzschlag-Anzeige.
12. **IHK Netzplan Studio (CPM / DIN 69900)**: Vorwärts- & Rückwärtsrechnung (FAZ, FEZ, SAZ, SEZ), Gesamt- & Freier Puffer (GP, FP) und Kritischer Pfad.
13. **UML Studio (Sequenz- & Aktivitätsdiagramme)**: Interaktive OMG UML 2.5 Modellierung mit IHK-Linter und 1-Klick Mermaid.js Export.
14. **Terraform & OpenTofu IaC Studio**: DAG-Ressourcenbaum, Execution Plan Terminal-Diff (`terraform plan`) & Cloud State Drift-Erkennung.
15. **IHK Nutzwertanalyse Studio (NWA)**: Kriterienmatrix nach DIN/VDI 2225, K.O.-Filter, Sensitivitätsanalyse.
16. **RAID Storage & Paritäts-Rechner**: RAID 0/1/5/6/10/50, Write-Penalty (4x/6x), Rebuild-Dauer & URE-Risiko.
17. **VLSM Subnet Splitter**: Absteigende Host-Sortierung, Netzmasken-, Wildcard-, Broadcast- und Binärdarstellung.
18. **IHK Projektantrags-Prüfer**: Zeitbudgets (FIAE 80h, FISI 40h), Phasen-Validierung & Anti-Pattern-Erkennung.
19. **Qualitätssicherung**: 290 Unit-Tests in 89 Test-Suiten mit 100% Erfolgsquote, 0 Oxlint-Fehler, optimierter PWA Produktions-Build.

---

## 🛠️ Schnellstart
- Lokaler Server: `npm run dev`
- 290 Vitest-Tests: `npm test`
- Oxlint Codeanalyse: `npm run lint`
- PWA Produktions-Build: `npm run build`
