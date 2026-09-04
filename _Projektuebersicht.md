---
tags:
  - project/informatik-lernen
  - type/software
  - tech/react
  - domain/ihk-ausbildung
  - status/active
version: v3.35.0
date: 2026-09-04
---

# 💻 Informatik-lernen (IT-DevGame) - Projektübersicht

> Interaktive IHK-Prüfungsvorbereitung, Gamification & IT-Simulatoren-Hub für Fachinformatiker (FIAE, FISI, FIDP, FIDV, IT-SE).

## 📂 Verlinkte Hauptdateien im Vault
- [[README|📖 Projektdokumentation & Feature-Guide]]
- [[CLAUDE|🛠️ Entwickler- & KI-Leitfaden (CLAUDE.md)]]
- `.gitignore` & `.claudeignore`

---

## 🎯 Wichtige Meilensteine (Version 3.35.0)
1. **TLS 1.3 0-RTT Early Data Replay Attack & Anti-Replay Defense Studio (`TlsReplayLab.jsx` & `tlsReplayEngine.js`)**: Simulation des TLS 1.3 Handshake-Ablaufs (1-RTT vs. 0-RTT PSK Early Data), Replay-Angriffe auf nicht-idempotente Zahlungs- und Transfer-Requests (`POST /api/transfer`) bei Session-Ticket-Wiederverwendung und Verteidigungsmechanismen (Single-Use Ticket Cache, Freshness-Checks, Idempotency-Filter).
2. **IHK Risikoanalyse & 5x5 Risikomatrix Studio (DIN EN 31010 / FMEA für AP2 Teil A & B) (`IhkRiskAnalysisLab.jsx` & `ihkRiskAnalysisEngine.js`)**: Praxisorientiertes Risikomanagement für IT-Projekte nach offiziellem IHK-Standard mit 5x5 Risikomatrix ($RPZ = A \times E$ bzw. FMEA $RPZ = A \times E \times D$), farbcodierten Risikoklassen, 4 Standard-Strategien (Vermeiden, Vermindern, Übertragen, Akzeptieren), Restrisiko-Neuberechnung und 1-Klick IHK-Dokumentations-Markdown-Export.
3. **eBPF Cilium Service Mesh & L7 Tracing Sandbox (`EbpfCiliumLab.jsx` & `ebpfCiliumEngine.js`)**: Kernel-basierte Netzwerk- und Security-Beobachtbarkeit für Kubernetes-Cluster mit eBPF TC & XDP Hooks, Cilium L3/L4 & L7 Network Policies, Kernel-Map-Inspektor (`BPF_MAP_TYPE_HASH`), Hubble L7 Live-Flow-Stream und interaktivem XDP SYN-Flood-Drop-Filter.
4. **PostgreSQL Index Types Deep Dive Studio (B-Tree, GIN, GiST, BRIN) (`PostgresIndexTypesLab.jsx` & `postgresIndexTypesEngine.js`)**: Datenbank-Performance-Analyse und Index-Auswahl für relationale SQL-Workloads mit Laufzeit- und Kostenvergleich (`EXPLAIN ANALYZE`) zwischen Sequential Scan, B-Tree, GIN (JSONB / Volltext), GiST (2D Geodaten) und BRIN (zeitlich sortierte Zeitreihen) sowie automatischem Index-Empfehlungs-Assistenten.
5. **IHK Wirtschaftlichkeits-, Amortisations- & Make-or-Buy Rechner (`IhkWirtschaftlichkeitLab.jsx` & `ihkWirtschaftlichkeitEngine.js`)**: Praxisorientiertes Pflicht-Kalkulationsmodul für die IHK-Projektdokumentation (AP2 Teil A) mit statischer & dynamischer Amortisationsrechnung (Break-Even in Monaten), vollständiger Make-or-Buy Gegenüberstellung (interne Entwicklungskosten vs. SaaS-Lizenzierung über $N$ Jahre mit Handlungsempfehlung), Kostenvergleichs-Matrix (Alt vs. Neu) und 1-Klick IHK-Dokumentations-Markdown-Export.
6. **Web Crypto API & Hardware Token Studio (FIDO2 / WebAuthn & Passkeys) (`WebAuthnPasskeyLab.jsx` & `webAuthnEngine.js`)**: Passwortlose Authentifizierung nach W3C WebAuthn Level 3 und FIDO2 Standard mit Hardware-Sicherheitsschlüsseln (YubiKey / Touch ID / Windows Hello), Public-Key Kryptographie (ES256 / RS256), Authenticator Data Flag-Dekodierung (UP, UV, BE, BS) und Replay-Schutz via kryptografischen Challenges.
7. **Linux Systemd Unit Lifecycle & Cgroups v2 Service Sandbox (`SystemdServiceLab.jsx` & `systemdServiceEngine.js`)**: Vollständiger Linux Service Daemon Simulator mit Unit-Lifecycle (`active`, `activating`, `deactivating`, `failed`), Restart-Policies (`always`, `on-failure`), Cgroups v2 Ressourcen-Limitierung (`CPUQuota=50%`, `MemoryMax=512M`), OOM-Killer Trigger und interaktivem `systemctl` & `journalctl` Terminal-Log-Viewer.
8. **WebAssembly SIMD 3x3 Faltungsmatrix & Sobel-Filter Upgrade (`WasmSimdStudioLab.jsx` & `wasmSimdEngine.js`)**: Parallele 2D-Bildfaltungsberechnungen mit 128-Bit Vektor-Registern (`v128`). Vordefinierte 3x3 Faltungskerne (Sobel X/Y Kantenerkennung, Gaußscher Weichzeichner, Scharfzeichnen), Vektorisierung von 4 Float-Nachbarpixeln in einem CPU-Takt via FMA und Live-Faltungsmatrix-Inspektor mit direkter Auswertung über `applySimdConvolutionFilter`.
9. **IHK Projekt-Gantt & Meilenstein-Editor**: Offizielles Zeitplanungs- und Phasen-Tool für den IHK-Abschlussbericht und Projektantrag (FIAE 80h / FISI 40h), Kalender-Gantt ohne Wochenenden, Realisierungs-/Dokumentations-Grenzwertprüfung und Markdown-Export.
10. **WebAssembly 128-Bit SIMD & Vector Studio**: 128-Bit Vektor-Register (`v128`, `f32x4`, `i32x4`, `u8x16`), Parallelisierung von 4 Floats in einem CPU-Takt, MFLOPS-Durchsatzmessung gegen skalaren JS-Code (~3.8x Hardware-Speedup) und WAT Bytecode-Generierung.
11. **HTTP/3 & QUIC Protocol Inspector**: Multi-Stream UDP-Multiplexing Simulator, Head-of-Line Blocking Eliminierung bei Paketverlust (0-35%), 0-RTT TLS 1.3 Handshake & Connection-ID (CID) Migration bei Netzwerkwechsel (WLAN zu 5G).
12. **Zustand Store IndexedDB Hydration & Redundanter Persistenz-Layer**: Asynchrone Dual-Persistence Spiegelung aller Benutzer- und Lernzustände in IndexedDB, Notfall-Hydration bei gelöschtem LocalStorage und Checkpoint-Snapshotting.
13. **IHK Präsentations-Stoppuhr & Folien-Gliederung**: 15-Minuten Countdown für AP2 Teil A, 4 Phasen-Gliederung mit Zeitbudgets, Web Audio Gong-Signale & Rubriken-Bewertung (1-6).
14. **Docker Compose Multi-Container Orchestrator**: Topologische DAG-Startreihenfolge (`depends_on`), Bridge-Netzwerk-Isolation mit Ping-Simulator, persistente Docker-Volumes & Compose 3.8 YAML Export.
15. **Dynamic CI/CD GitHub Actions Workflow Simulator**: Mehrstufige Pipelines (`needs`), Dependency Caching (`actions/cache@v4`), Secrets-Maskierung (`***`) & Live ANSI Runner-Logs.
16. **Offline IndexedDB Storage Synchronizer**: Asynchrone NoSQL-Persistenz über das 5-MB-LocalStorage-Limit hinaus, Dual-Save-Architektur im Notizbuch (`PersonalNotebookLab.jsx`).
17. **IHK Fachgespräch & Audio-Prüfungssimulator**: 15-Minuten Fachgespräch mit Web Speech API (TTS-Fragen & STT-Einsprechen), 3 Persona-Prüfer & Notenschlüssel (1-6).
18. **Ansible Playbook & Idempotenz Studio**: Deklarative Server-Provisionierung (`inventory.ini`, `playbook.yml`) mit interaktivem Beweis der Idempotenz.
19. **Web Worker & Concurrency Studio**: Benchmark rechenintensiver CPU-Tasks (Eratosthenes Primzahl-Sieb & Monte-Carlo RAID URE Simulation) mit 60 FPS Herzschlag-Anzeige.
20. **IHK Netzplan Studio (CPM / DIN 69900)**: Vorwärts- & Rückwärtsrechnung (FAZ, FEZ, SAZ, SEZ), Gesamt- & Freier Puffer (GP, FP) und Kritischer Pfad.
21. **UML Studio (Sequenz- & Aktivitätsdiagramme)**: Interaktive OMG UML 2.5 Modellierung mit IHK-Linter und 1-Klick Mermaid.js Export.
22. **Terraform & OpenTofu IaC Studio**: DAG-Ressourcenbaum, Execution Plan Terminal-Diff (`terraform plan`) & Cloud State Drift-Erkennung.
23. **IHK Nutzwertanalyse Studio (NWA)**: Kriterienmatrix nach DIN/VDI 2225, K.O.-Filter, Sensitivitätsanalyse.
24. **RAID Storage & Paritäts-Rechner**: RAID 0/1/5/6/10/50, Write-Penalty (4x/6x), Rebuild-Dauer & URE-Risiko.
25. **VLSM Subnet Splitter**: Absteigende Host-Sortierung, Netzmasken-, Wildcard-, Broadcast- und Binärdarstellung.

---

## 📊 Aktuelle Test- & Qualitätsmetriken (v3.35.0)
- **Unit-Tests**: 328 bestandene Tests in 96 Test-Dateien (100% Erfolgsquote)
- **Code-Qualität**: 0 Oxlint Fehler / 0 Warnungen über 416 Quelldateien
- **Build**: Vite 7 / PWA Offline Service Worker (~1.01s Build-Dauer)
- **A11y**: WCAG 2.1 Konformität (Reduced Motion Support, keine Zoom-Blocker)
