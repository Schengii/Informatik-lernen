---
tags:
  - project/informatik-lernen
  - type/software
  - tech/react
  - domain/ihk-ausbildung
  - status/active
version: v3.47.0
date: 2026-09-25
---

# 💻 Informatik-lernen (IT-DevGame) - Projektübersicht

> Interaktive IHK-Prüfungsvorbereitung, Gamification & IT-Simulatoren-Hub für Fachinformatiker (FIAE, FISI, FIDP, FIDV, IT-SE).

## 📂 Verlinkte Hauptdateien im Vault
- [[README|📖 Projektdokumentation & Feature-Guide]]
- [[CLAUDE|🛠️ Entwickler- & KI-Leitfaden (CLAUDE.md)]]
- `.gitignore` & `.claudeignore`

---

## 🎯 Wichtige Meilensteine (Version 3.47.0)
1. **Linux Cgroups v2 & PSI (Pressure Stall Information) Studio (`LinuxPsiCgroupLab.jsx` & `linuxPsiCgroupEngine.js`)**: Kernel-Ressourcenüberwachung nach Linux 5.x. Unterscheidung von `some` vs. `full` Pressure Stalls für CPU, Memory und I/O, CFS Bandbreitendrosselung (`cpu.max`) und Vermeidung von OOM-Kills sowie K8s-Node-Evictions.
2. **IHK Nutzwertanalyse (NWA) Sensitivitäts- & Monte-Carlo Studio (`NwaSensitivityLab.jsx` & `nwaSensitivityEngine.js`)**: DIN/VDI 2225 Entscheidungsmatrix mit 500 probabilistischen Gewichtungs-Variationen zur Absicherung der Entscheidungssicherheit (>70%) gegen subjektive Verzerrungen.
3. **WebRTC STUN/TURN & ICE Candidate Gathering Studio (`WebrtcIceGatheringLab.jsx` & `webrtcIceGatheringEngine.js`)**: RFC 8445 ICE Agent Simulation mit Host, Server Reflexive (STUN) und Relay (TURN) Kandidaten sowie Fallback-Routing bei Symmetric NAT.
4. **WISO Rentabilitätskennzahlen & Leverage-Effekt Studio (`WisoRentabilitaetLeverageLab.jsx` & `wisoRentabilitaetLeverageEngine.js`)**: Bilanzanalyse für die IHK Abschlussprüfung (AP2 WISO). Eigenkapital-, Gesamtkapital- und Umsatzrendite sowie Hebelwirkung von Fremdkapital.
5. **Linux Capabilities & Seccomp BPF Sandbox (`LinuxCapSeccompLab.jsx` & `linuxCapSeccompEngine.js`)**: Principle of Least Privilege in Container- und Linux-Systemen (`CAP_NET_BIND_SERVICE`, `CAP_SYS_ADMIN`, `SECCOMP_RET_KILL_PROCESS`).
6. **BGP Path Selection & Decision Studio (`BgpPathSelectionLab.jsx` & `bgpPathSelectionEngine.js`)**: RFC 4271 8-Stufen-Entscheidungsalgorithmus (Weight, Local Preference, AS-Path Länge, Origin Code, MED, eBGP/iBGP, Router-ID Tie-Breaker).
7. **IHK Maschinenstundensatz-Rechner (MSS) (`WisoMaschinenstundensatzLab.jsx` & `wisoMaschinenstundensatzEngine.js`)**: IHK KLR Standardberechnung nach Durchschnittsmethode für AP2 und WISO.
8. **LLM RAG Chunking & Cross-Encoder Re-Ranking Studio (`LlmRagChunkingLab.jsx` & `llmRagChunkingEngine.js`)**: Two-Stage Retrieval Pipeline gegen Halluzinationen (Fixed, Sliding Window, Paragraphs).

---

## 📊 Aktuelle Test- & Qualitätsmetriken (v3.47.0)
- **Unit- & Integrationstests**: 941 bestandene Tests in 130 Test-Dateien (100% Erfolgsquote, +11 Tests)
- **Code-Qualität**: 0 Oxlint Fehler / 0 Warnungen über 509 Quelldateien, `tsc --noEmit` fehlerfrei
- **Build**: Vite 8 & PWA Offline Service Worker (215 Precache-Einträge)
- **Performance & Limits**: Alle Chunks innerhalb der Size-Limits (App-Shell < 104 KB gzipped)
- **Vercel-Deployment**: Produktionsreife `vercel.json` mit SPA-Rewrites, Asset-Caching & Security-Headern
- **A11y**: WCAG 2.1 Konformität (Reduced Motion Support, barrierefreie Labels)
