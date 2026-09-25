---
tags:
  - project/informatik-lernen
  - type/software
  - tech/react
  - domain/ihk-ausbildung
  - status/active
version: v3.46.0
date: 2026-09-25
---

# 💻 Informatik-lernen (IT-DevGame) - Projektübersicht

> Interaktive IHK-Prüfungsvorbereitung, Gamification & IT-Simulatoren-Hub für Fachinformatiker (FIAE, FISI, FIDP, FIDV, IT-SE).

## 📂 Verlinkte Hauptdateien im Vault
- [[README|📖 Projektdokumentation & Feature-Guide]]
- [[CLAUDE|🛠️ Entwickler- & KI-Leitfaden (CLAUDE.md)]]
- `.gitignore` & `.claudeignore`

---

## 🎯 Wichtige Meilensteine (Version 3.46.0)
1. **Linux Capabilities & Seccomp BPF Sandbox (`LinuxCapSeccompLab.jsx` & `linuxCapSeccompEngine.js`)**: Principle of Least Privilege in Container- und Linux-Systemen. Granulare Capabilities (`CAP_NET_BIND_SERVICE`, `CAP_SYS_ADMIN`, `CAP_DAC_OVERRIDE`), Rootless Container Isolation und Kernel-Syscall-Filterung via Seccomp BPF (`SECCOMP_RET_ALLOW`, `SECCOMP_RET_ERRNO`, `SECCOMP_RET_KILL_PROCESS`).
2. **BGP Path Selection & Decision Studio (`BgpPathSelectionLab.jsx` & `bgpPathSelectionEngine.js`)**: RFC 4271 8-Stufen-Entscheidungsalgorithmus (Weight, Local Preference, Locally Originated, AS-Path Länge, Origin Code, MED, eBGP/iBGP, Router-ID Tie-Breaker) mit Live-Eliminierungsprotokoll.
3. **IHK Maschinenstundensatz-Rechner (MSS) (`WisoMaschinenstundensatzLab.jsx` & `wisoMaschinenstundensatzEngine.js`)**: IHK KLR Standardberechnung für AP2 und WISO. Kalkulatorische Abschreibung, Zinsen nach Durchschnittsmethode, Raum-, Energie-, Instandhaltungs- und Werkzeugkosten pro Stunde.
4. **LLM RAG Chunking & Cross-Encoder Re-Ranking Studio (`LlmRagChunkingLab.jsx` & `llmRagChunkingEngine.js`)**: Two-Stage Retrieval Pipeline gegen Halluzinationen. Dokumenten-Chunking (Fixed, Sliding Window, Paragraphs) und Cross-Attention Re-Ranking.
5. **OAuth 2.0 Token Revocation & Introspection Studio (`OauthRevocationIntrospectionLab.jsx` & `oauthRevocationIntrospectionEngine.js`)**: RFC 7662 Token Introspection am API Gateway und RFC 7009 Token Revocation mit automatischer Kaskadierung.
6. **RAID 6 Dual-Parity & Galois Field GF(2^8) Studio (`Raid6GaloisLab.jsx` & `raid6GaloisEngine.js`)**: P (XOR) & Q (Reed-Solomon Galois-Feld) Paritätsberechnung und simultane Rekonstruktion zweier Festplattenausfälle.
7. **SQLite Web Worker Sandbox (`SqliteWorkerStudioLab.jsx` & `sqliteWorkerBridge.js`)**: Asynchrone Auslagerung rechenintensiver SQL-Abfragen in einen Dedicated Web Worker zur Vermeidung von UI-Jank bei 60 FPS.
8. **IHK Fertigungs- & Zuschlagskalkulation Studio (`WisoZuschlagskalkulationLab.jsx` & `wisoZuschlagskalkulationEngine.js`)**: Vollständiges KLR-Kalkulationsschema von Material- und Fertigungsgemeinkosten bis zum Bar- und Bruttoverkaufspreis.

---

## 📊 Aktuelle Test- & Qualitätsmetriken (v3.46.0)
- **Unit- & Integrationstests**: 930 bestandene Tests in 126 Test-Dateien (100% Erfolgsquote, +32 Tests)
- **Code-Qualität**: 0 Oxlint Fehler / 0 Warnungen über 497 Quelldateien, `tsc --noEmit` fehlerfrei
- **Build**: Vite 8 & PWA Offline Service Worker (211 Precache-Einträge)
- **Performance & Limits**: Alle Chunks innerhalb der Size-Limits (App-Shell < 103 KB gzipped)
- **Vercel-Deployment**: Produktionsreife `vercel.json` mit SPA-Rewrites, Asset-Caching & Security-Headern
- **A11y**: WCAG 2.1 Konformität (Reduced Motion Support, barrierefreie Labels)
