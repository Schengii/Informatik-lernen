---
tags:
  - project/informatik-lernen
  - type/software
  - tech/react
  - domain/ihk-ausbildung
  - status/active
version: v3.34.0
date: 2026-09-04
---

# 💻 Informatik-lernen (IT-DevGame) - Projektübersicht

> Interaktive IHK-Prüfungsvorbereitung, Gamification & IT-Simulatoren-Hub für Fachinformatiker (FIAE, FISI, FIDP, FIDV, IT-SE).

## 📂 Verlinkte Hauptdateien im Vault
- [[README|📖 Projektdokumentation & Feature-Guide]]
- [[CLAUDE|🛠️ Entwickler- & KI-Leitfaden (CLAUDE.md)]]
- `.gitignore` & `.claudeignore`

---

## 🎯 Wichtige Meilensteine (Version 3.34.0)
1. **IHK Wirtschaftlichkeits-, Amortisations- & Make-or-Buy Rechner (`IhkWirtschaftlichkeitLab.jsx` & `ihkWirtschaftlichkeitEngine.js`)**: Praxisorientiertes Pflicht-Kalkulationsmodul für die IHK-Projektdokumentation (AP2 Teil A) mit statischer & dynamischer Amortisationsrechnung (Break-Even in Monaten), vollständiger Make-or-Buy Gegenüberstellung (interne Entwicklungskosten vs. SaaS-Lizenzierung über $N$ Jahre mit Handlungsempfehlung), Kostenvergleichs-Matrix (Alt vs. Neu) und 1-Klick IHK-Dokumentations-Markdown-Export.
2. **Web Crypto API & Hardware Token Studio (FIDO2 / WebAuthn & Passkeys) (`WebAuthnPasskeyLab.jsx` & `webAuthnEngine.js`)**: Passwortlose Authentifizierung nach W3C WebAuthn Level 3 und FIDO2 Standard mit Hardware-Sicherheitsschlüsseln (YubiKey / Touch ID / Windows Hello), Public-Key Kryptographie (ES256 / RS256), Authenticator Data Flag-Dekodierung (UP, UV, BE, BS) und Replay-Schutz via kryptografischen Challenges.
3. **Linux Systemd Unit Lifecycle & Cgroups v2 Service Sandbox (`SystemdServiceLab.jsx` & `systemdServiceEngine.js`)**: Vollständiger Linux Service Daemon Simulator mit Unit-Lifecycle (`active`, `activating`, `deactivating`, `failed`), Restart-Policies (`always`, `on-failure`), Cgroups v2 Ressourcen-Limitierung (`CPUQuota=50%`, `MemoryMax=512M`), OOM-Killer Trigger und interaktivem `systemctl` & `journalctl` Terminal-Log-Viewer.
4. **WebAssembly SIMD 3x3 Faltungsmatrix & Sobel-Filter Upgrade (`WasmSimdStudioLab.jsx` & `wasmSimdEngine.js`)**: Parallele 2D-Bildfaltungsberechnungen mit 128-Bit Vektor-Registern (`v128`). Vordefinierte 3x3 Faltungskerne (Sobel X/Y Kantenerkennung, Gaußscher Weichzeichner, Scharfzeichnen), Vektorisierung von 4 Float-Nachbarpixeln in einem CPU-Takt via FMA und Live-Faltungsmatrix-Inspektor mit direkter Auswertung über `applySimdConvolutionFilter`.
5. **IHK Projekt-Gantt & Meilenstein-Editor**: Offizielles Zeitplanungs- und Phasen-Tool für den IHK-Abschlussbericht und Projektantrag (FIAE 80h / FISI 40h), Kalender-Gantt ohne Wochenenden, Realisierungs-/Dokumentations-Grenzwertprüfung und Markdown-Export.
6. **WebAssembly 128-Bit SIMD & Vector Studio**: 128-Bit Vektor-Register (`v128`, `f32x4`, `i32x4`, `u8x16`), Parallelisierung von 4 Floats in einem CPU-Takt, MFLOPS-Durchsatzmessung gegen skalaren JS-Code (~3.8x Hardware-Speedup) und WAT Bytecode-Generierung.
7. **HTTP/3 & QUIC Protocol Inspector**: Multi-Stream UDP-Multiplexing Simulator, Head-of-Line Blocking Eliminierung bei Paketverlust (0-35%), 0-RTT TLS 1.3 Handshake & Connection-ID (CID) Migration bei Netzwerkwechsel (WLAN zu 5G).
8. **Zustand Store IndexedDB Hydration & Redundanter Persistenz-Layer**: Asynchrone Dual-Persistence Spiegelung aller Benutzer- und Lernzustände in IndexedDB, Notfall-Hydration bei gelöschtem LocalStorage und Checkpoint-Snapshotting.
9. **IHK Präsentations-Stoppuhr & Folien-Gliederung**: 15-Minuten Countdown für AP2 Teil A, 4 Phasen-Gliederung mit Zeitbudgets, Web Audio Gong-Signale & Rubriken-Bewertung (1-6).
10. **Docker Compose Multi-Container Orchestrator**: Topologische DAG-Startreihenfolge (`depends_on`), Bridge-Netzwerk-Isolation mit Ping-Simulator, persistente Docker-Volumes & Compose 3.8 YAML Export.
11. **Dynamic CI/CD GitHub Actions Workflow Simulator**: Mehrstufige Pipelines (`needs`), Dependency Caching (`actions/cache@v4`), Secrets-Maskierung (`***`) & Live ANSI Runner-Logs.
12. **Offline IndexedDB Storage Synchronizer**: Asynchrone NoSQL-Persistenz über das 5-MB-LocalStorage-Limit hinaus, Dual-Save-Architektur im Notizbuch (`PersonalNotebookLab.jsx`).
13. **IHK Fachgespräch & Audio-Prüfungssimulator**: 15-Minuten Fachgespräch mit Web Speech API (TTS-Fragen & STT-Einsprechen), 3 Persona-Prüfer & Notenschlüssel (1-6).
14. **Ansible Playbook & Idempotenz Studio**: Deklarative Server-Provisionierung (`inventory.ini`, `playbook.yml`) mit interaktivem Beweis der Idempotenz.
15. **Web Worker & Concurrency Studio**: Benchmark rechenintensiver CPU-Tasks (Eratosthenes Primzahl-Sieb & Monte-Carlo RAID URE Simulation) mit 60 FPS Herzschlag-Anzeige.
16. **IHK Netzplan Studio (CPM / DIN 69900)**: Vorwärts- & Rückwärtsrechnung (FAZ, FEZ, SAZ, SEZ), Gesamt- & Freier Puffer (GP, FP) und Kritischer Pfad.
17. **UML Studio (Sequenz- & Aktivitätsdiagramme)**: Interaktive OMG UML 2.5 Modellierung mit IHK-Linter und 1-Klick Mermaid.js Export.
18. **Terraform & OpenTofu IaC Studio**: DAG-Ressourcenbaum, Execution Plan Terminal-Diff (`terraform plan`) & Cloud State Drift-Erkennung.
19. **IHK Nutzwertanalyse Studio (NWA)**: Kriterienmatrix nach DIN/VDI 2225, K.O.-Filter, Sensitivitätsanalyse.
20. **RAID Storage & Paritäts-Rechner**: RAID 0/1/5/6/10/50, Write-Penalty (4x/6x), Rebuild-Dauer & URE-Risiko.
21. **VLSM Subnet Splitter**: Absteigende Host-Sortierung, Netzmasken-, Wildcard-, Broadcast- und Binärdarstellung.

---

## 📊 Aktuelle Test- & Qualitätsmetriken (v3.34.0)
- **Unit-Tests**: 309 bestandene Tests in 92 Test-Dateien (100% Erfolgsquote)
- **Code-Qualität**: 0 Oxlint Fehler / 0 Warnungen über 404 Quelldateien
- **Build**: Vite 7 / PWA Offline Service Worker (~680ms Build-Dauer)
- **A11y**: WCAG 2.1 Konformität (Reduced Motion Support, keine Zoom-Blocker)
