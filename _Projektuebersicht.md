---
tags:
  - project/informatik-lernen
  - type/software
  - tech/react
  - domain/ihk-ausbildung
  - status/active
version: v3.58.0
date: 2026-09-26
---

# 💻 Informatik-lernen (IT-DevGame) - Projektübersicht

> Interaktive IHK-Prüfungsvorbereitung, Gamification & IT-Simulatoren-Hub für Fachinformatiker (FIAE, FISI, FIDP, FIDV, IT-SE).

## 📂 Verlinkte Hauptdateien im Vault
- [[README|📖 Projektdokumentation & Feature-Guide]]
- [[CLAUDE|🛠️ Entwickler- & KI-Leitfaden (CLAUDE.md)]]
- `.gitignore` & `.claudeignore`

---

## 🎯 Wichtige Meilensteine (Version 3.58.0)
1. **Cloud IAM Policy Evaluator & Least-Privilege Linter (`CloudIamPolicyLab.jsx` & `cloudIamEngine.js`)**: Didaktisches Cloud-Governance- und Security-Studio für AWS- und Cloud-Infrastrukturen. Hierarchische Entscheidungslogik über Organization SCPs, Identity- und Resource-Policies mit Explicit Deny Vorrang sowie automatischem Linter für überprivilegierte Wildcards und destruktive Operationen mit 65 XP Belohnung.
2. **Prometheus PromQL Alerting & SRE Error-Budget Burn Studio (`SreSloBurnLab.jsx` & `sreSloBurnEngine.js`)**: Didaktisches Site Reliability Engineering (SRE) Studio nach dem Google SRE Workbook. Exakte Berechnung von SLOs, verbrauchtem Fehlerbudget und Multi-Window Multi-Burn-Rate Alerting (Short- vs. Long-Lookback) zur Vermeidung von Pager-Müdigkeit mit produktionsfertigen YAML-Manifesten und 65 XP Belohnung.
3. **Kafka Consumer Lag & Partition Rebalance Protocol Studio (`KafkaConsumerLagLab.jsx` & `kafkaConsumerLagEngine.js`)**: Didaktisches Distributed Event Streaming Studio. Echtzeit-Überwachung von Log End Offset (LEO), Committed Offsets und Partitions-Lag sowie Gegenüberstellung von Eager (Stop-the-World) und Cooperative Sticky Rebalancing mit 65 XP Belohnung.
4. **Linux Auditd & eBPF Syscall Tracepoint Security Studio (`LinuxAuditdEbpfLab.jsx` & `linuxAuditdEbpfEngine.js`)**: Didaktisches Kernel-Security- und Threat-Hunting-Studio. Echtzeit-Inspektion sensitiver Systemaufrufe (`execve`, `connect`, `openat`, `setuid`), RCE-Reverse-Shell-Erkennung, `/etc/shadow` Überwachung und CIS-/BSI-konformes `/etc/audit/rules.d/audit.rules` Template mit 65 XP Belohnung.

---

## 📊 Aktuelle Test- & Qualitätsmetriken (v3.58.0)
- **Unit- & Integrationstests**: 1177 bestandene Tests in 159 Test-Dateien (100% Erfolgsquote, +15 neue Tests)
- **Code-Qualität**: 0 Oxlint Fehler / 0 Warnungen über 595 Quelldateien, `tsc --noEmit` fehlerfrei
- **Build**: Vite 8 & PWA Offline Service Worker (244 Precache-Einträge)
- **Performance & Limits**: Alle Chunks innerhalb der Size-Limits (App-Shell 111.45 KB gzipped < 115 KB Limit)
- **Vercel-Deployment**: Produktionsreife `vercel.json` mit SPA-Rewrites, Asset-Caching & Security-Headern
- **A11y**: WCAG 2.1 Konformität (Reduced Motion Support, barrierefreie Labels)
