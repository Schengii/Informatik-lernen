---
tags:
  - project/informatik-lernen
  - type/software
  - tech/react
  - domain/ihk-ausbildung
  - status/active
version: v3.51.0
date: 2026-09-26
---

# 💻 Informatik-lernen (IT-DevGame) - Projektübersicht

> Interaktive IHK-Prüfungsvorbereitung, Gamification & IT-Simulatoren-Hub für Fachinformatiker (FIAE, FISI, FIDP, FIDV, IT-SE).

## 📂 Verlinkte Hauptdateien im Vault
- [[README|📖 Projektdokumentation & Feature-Guide]]
- [[CLAUDE|🛠️ Entwickler- & KI-Leitfaden (CLAUDE.md)]]
- `.gitignore` & `.claudeignore`

---

## 🎯 Wichtige Meilensteine (Version 3.51.0)
1. **SQL Transaction Isolation & ACID Studio (`SqlIsolationLab.jsx` & `sqlIsolationEngine.js`)**: Didaktisches Datenbank-Architektur- und Concurrency-Studio nach ANSI SQL-92 Standard. Gegenüberstellung der 4 ANSI-SQL Isolationslevel (Read Uncommitted, Read Committed, Repeatable Read, Serializable SSI) und dynamische Simulation von Dirty Reads, Non-Repeatable Reads, Phantom Reads und Write Skew inklusive technischer MVCC- und SIREAD-Erklärungen mit 50 XP Belohnung.
2. **DGUV Vorschrift 3 & VDE Elektro-Prüfstudio (`DguvV3ElektronikLab.jsx` & `dguvV3ElektronikEngine.js`)**: Prüfung elektrischer Schutzmaßnahmen für IT-System-Elektroniker (ITSE AP2) und Fachinformatiker (FISI LF 2). Schutzklassen I–III, Schutzleiterwiderstand $R_{PE}$ nach Leitungslänge ($0,3\,\Omega$ + $0,1\,\Omega$/7,5m), Isolationswiderstand $R_{ISO}$ ($1,0\,\text{M}\Omega$ / $2,0\,\text{M}\Omega$), RCD 30 mA Personenschutzprüfung ($t_a \le 400\,\text{ms}$ TN / $200\,\text{ms}$ TT) und USV-Batterieautonomie-Rechner mit 60 XP Belohnung.
3. **Volle IHK AP2-Berufsabdeckung im Prüfungssimulator (`ExamSimulator.jsx` & `examData.js`)**: Vollständige Prüfungsmodi für alle 5 IT-Berufe (FIAE, FISI, FIDP, FIDV, ITSE) mit erweiterten Fragenkatalogen zu ELT/ETL, Data Lineage, MQTT QoS, OPC UA, DGUV V3 und RCD-Schutz.
4. **SQL Window Functions & Analytics Studio (`SqlWindowFunctionsLab.jsx` & `sqlWindowFunctionsEngine.js`)**: Analytische Fensterfunktionen nach ANSI SQL:2003 (ROW_NUMBER, RANK, DENSE_RANK, NTILE, LEAD/LAG, Running Totals).
5. **ArgoCD GitOps & Cluster Sync Studio (`ArgoCdGitOpsLab.jsx` & `argoCdGitOpsEngine.js`)**: GitOps Continuous Delivery mit Drift-Erkennung, Auto-Pruning und Self-Healing Sync.
6. **Vektor-Mathematik & Embedding-Distanz Studio (`VectorMathEmbeddingLab.jsx` & `vectorMathEngine.js`)**: Fundament von Vektordatenbanken (Cosine Sim, L2 Euclidean, Manhattan L1, Dot Product).
7. **JWT Security & Algorithm Confusion Attack Studio (`JwtConfusionLab.jsx` & `jwtConfusionEngine.js`)**: RS256 vs. HS256 Key Confusion, None-Algorithm Bypass und Strict Whitelisting.
8. **IHK Kosten-Nutzen-Analyse & Kapitalwertmethode Studio (`WisoCapitalValueLab.jsx` & `wisoCapitalValueEngine.js`)**: Dynamische Diskontierung, Interner Zinsfuß (IRR), dynamische Amortisation und Markdown-Export.

---

## 📊 Aktuelle Test- & Qualitätsmetriken (v3.51.0)
- **Unit- & Integrationstests**: 1021 bestandene Tests in 140 Test-Dateien (100% Erfolgsquote, +28 Tests)
- **Code-Qualität**: 0 Oxlint Fehler / 0 Warnungen über 539 Quelldateien, `tsc --noEmit` fehlerfrei
- **Build**: Vite 8 & PWA Offline Service Worker (225 Precache-Einträge)
- **Performance & Limits**: Alle Chunks innerhalb der Size-Limits (App-Shell < 109 KB gzipped)
- **Vercel-Deployment**: Produktionsreife `vercel.json` mit SPA-Rewrites, Asset-Caching & Security-Headern
- **A11y**: WCAG 2.1 Konformität (Reduced Motion Support, barrierefreie Labels)
