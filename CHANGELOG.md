# Changelog

Alle nennenswerten Änderungen an diesem Projekt werden in dieser Datei dokumentiert.

Das Format basiert auf [Keep a Changelog](https://keepachangelog.com/de/1.1.0/)
und dieses Projekt hält sich an [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unveröffentlicht]

### Hinzugefügt (Added)
- **Interaktionstests für die vier größten IHK-Rechenlabs** (44 Tests): `WisoAngebotsvergleichLab`, `WisoKalkulationLab`, `TestverfahrenLab` und `DhcpDoraLab` prüfen jetzt Bedienung, angezeigte Rechenergebnisse (Skonto-Effektivzins, Kalkulationsschema, Nutzwert, Netzplan, Äquivalenzklassen, McCabe, DORA-Zustände) und einmalige XP-Vergabe. Bisher wurden diese Labs nur gerendert (Smoke/axe).
- **`src/components/Shared/IhkDrillPanel.jsx`**: gemeinsamer IHK-Prüfungsdrill (Multiple Choice, Auswertung, Wiederholen) für DHCP-, Testverfahren- und Angebotsvergleich-Lab; ersetzt drei identische Kopien.

### Geändert (Changed)
- **Lab-Routing vollständig auf `src/data/labRegistry.js` umgestellt**: 210 Labs aus der `activeLabElement`-Switch-Tabelle in die Registry migriert; `App.jsx` schrumpft von 1222 auf 592 Zeilen (210 `lazy`-Imports entfallen). In `App.jsx` bleiben nur Tabs, die App-Zustand brauchen (Labs-Übersicht, Kampagne, Lernplan, Schwachstellen-Audit, Roadmap, Prüfungssimulator).
- `App.routing.test.jsx` rendert jetzt zusätzlich alle Registry-Tab-IDs (vorher waren die Registry-Labs von diesem Test nicht abgedeckt); der Registry-Ladetest lädt die Module parallel.
- `WisoAngebotsvergleichLab`: doppelter Anbieter-Block als lokale Komponente `AngebotKalkulation` zusammengefasst.
- Dev-Abhängigkeiten gemeinsam aktualisiert: `vitest` + `@vitest/coverage-v8` auf 5.0.2, `size-limit` + `@size-limit/file` auf 14.1.0. `engines.node` auf `>=22.19.0` angehoben (Anforderung von size-limit 14). Lint, Typecheck, 1634 Tests, Coverage, Build und Size-Check bestanden.

### Behoben (Fixed)
- **Sentry startete nie** (`src/utils/errorMonitoring.js`): Der Import über einen Variablen-Pfad mit `@vite-ignore` landete mit gesetzter `VITE_SENTRY_DSN` wörtlich als `import("@sentry/react")` im Bundle, den der Browser nicht auflösen kann. Jetzt statischer Pfad im dynamischen `import()` – Sentry wird als eigener Chunk geladen; ohne DSN bleibt der Code weiterhin komplett aus dem Build entfernt.
- **Toter Alias `dnssec_lab`**: war sowohl dem DNSSEC-Validation- als auch dem DNSSEC-Rollover-Lab zugeordnet; die Rollover-Zuordnung war nie erreichbar und wurde entfernt (`dnssec_lab` öffnet wie bisher das Validation-Lab).
- **Vercel-Preview-Deployments schlugen fehl** (`.github/dependabot.yml`): Dependabot bumpte `@vitest/coverage-v8` bzw. `size-limit` / `@size-limit/file` einzeln, wodurch `npm ci` an Peer-Dependency-Konflikten (`ERESOLVE`) scheiterte. Die Gruppe `lint-and-test` erfasst nun auch `@vitest/*`, neue Gruppe `size-limit` bündelt `size-limit` und `@size-limit/*`.

---

## [3.72.0] - 2026-10-03

### Hinzugefügt (Added)
- **RFC 2131 DHCP DORA & Relay-Agent Studio** (`DhcpDoraLab.jsx` & `src/utils/dhcpDoraEngine.js`):
  - Vollständiger Zustandsautomat für DHCP-Clients (`INIT`, `SELECTING`, `REQUESTING`, `BOUND`, `RENEWING`, `REBINDING`).
  - Interaktiver 4-Way DORA Handshake (Discover -> Offer -> Request -> Ack) mit Wireshark-ähnlicher Paket-Dissektion (XID, CIADDR, YIADDR, GIADDR, DHCP-Optionen 53, 1, 3, 6, 51, 58, 59).
  - Visuelle Timeline für Lease-Lifecycle: T1 (50% Renewal per Unicast an leasing Server), T2 (87.5% Rebind per Broadcast) und DHCP-Release.
  - Simulation von DHCP Relay Agents (`GIADDR`) zur Weiterleitung über Subnetzgrenzen hinweg (+55 XP).
  - 7 dedizierte Unit-Tests (`src/utils/dhcpDoraEngine.test.js`).
- **IHK Software-Testverfahren & Grenzwertanalyse Studio** (`TestverfahrenLab.jsx` & `src/utils/testverfahrenEngine.js`):
  - Black-Box-Äquivalenzklassenbildung (GÄK & UÄKs) mit Live-Eingabetester für typische IHK-Prüfungsszenarien (Altersgrenzen, Rabattstaffeln, Passwörter).
  - 6-Punkte Grenzwertanalyse ($min-1, min, min+1, max-1, max, max+1$) mit Status- und Fehlerfall-Erklärung.
  - McCabe Zyklomatische Komplexität ($M = E - N + 2P$) mit Risikoklassifizierung (Clean Code) und Kontrollfluss-Überdeckungsmetriken (C0, C1, C2) (+55 XP).
  - 6 dedizierte Unit-Tests (`src/utils/testverfahrenEngine.test.js`).
- **IHK WISO Angebotsvergleich & Skontorechner Studio** (`WisoAngebotsvergleichLab.jsx` & `src/utils/wisoAngebotsvergleichEngine.js`):
  - Quantitativer Angebotsvergleich mit vollständigem kaufmännischen Kalkulationsschema (Listeneinkaufspreis $\rightarrow$ Rabatt $\rightarrow$ Zieleinkaufspreis $\rightarrow$ Skonto $\rightarrow$ Bareinkaufspreis $\rightarrow$ Bezugskosten $\rightarrow$ Bezugspreis) mit interaktiver 2-Anbieter-Gegenüberstellung.
  - Skonto vs. Kontokorrentkredit: Exakte Berechnung des effektiven Jahreszinssatzes ($p_{\text{eff}} = \frac{\text{Skontosatz} \times 360}{\text{Zahlungsziel} - \text{Skontofrist}}$), Gegenüberstellung mit dem Bankkreditzins, Ersparnisberechnung in Euro und IHK-Musterentscheidungsbegründung.
  - Qualitativer Angebotsvergleich: Scoring-Matrix mit Gewichtung und Nutzwertanalyse (+55 XP).
  - 6 dedizierte Unit-Tests (`src/utils/wisoAngebotsvergleichEngine.test.js`).
- **404 Not Found View & Routing-Robustheit** (`src/components/NotFoundView.jsx`):
  - Dedizierte 404-Fehleransicht bei ungültigen Pfaden mit Direktnavigation zum Dashboard und Suchfunktion.
  - Trailing-Slash-Toleranz in allen Routen (z. B. `/nwa_scoring_lab/`).
- **Persistente UI-Präferenzen** (`src/utils/uiPreferences.js`):
  - Theme, Schriftgröße, Dyslexie-, Farbenblindheits-, Kontrast- und Reduced-Motion-Modus werden unter `informatik_game_ui_prefs_v1` gespeichert und überstehen Reloads.
- **Multi-Tab Synchronisation**:
  - BroadcastChannel (`it_devgame_sync`) und Storage Event Synchronisation in `src/store/useStore.js` für tab-übergreifende Synchronisierung von XP, Streaks und Badges.

### Sicherheit (Security)
- **Web Worker Code-Sandbox** (`src/utils/sandboxRunner.js`, `src/utils/sandbox.worker.js`, `src/utils/sandboxEvaluator.js`):
  - Nutzercode in Coding-Challenges wird nicht mehr im UI-Haupt-Thread ausgeführt, sondern in einem isolierten Web Worker mit 3s Timeout-Schutz.
  - Automatische Terminierung von Endlosschleifen via `worker.terminate()`.
  - Blockierung gefährlicher Browser-APIs (`fetch`, `XMLHttpRequest`, `WebSocket`, `localStorage`, `IndexedDB`).
  - Migration von `codingChallengesEngine.js` auf asynchrone Schnittstelle.

### Behoben (Fixed)
- **PWA Update Toast**: Verhindert irrtümliche "Update verfügbar"-Meldung beim allerersten Seitenaufruf; Meldung erscheint nur bei echtem Service-Worker-Update.
- **Sentry Integration**: Dynamischer Import in `src/utils/errorMonitoring.js` gegen Vite-Statik-Auflösung und TypeScript-Typkonflikte abgesichert.

---

## [3.71.0] - 2026-09-28

### Hinzugefügt (Added)
- **Fehlerjournal & Spaced-Repetition-Review** (`src/utils/mistakeJournalEngine.js`, `MistakeReviewWidget.jsx`):
  - Falsch beantwortete Prüfungsfragen wandern mit Intervallen (1, 3, 7, 14, 30 Tage) ins Journal.
  - Dashboard-Widget mit Mini-Quiz zur gezielten Wiederholung.
- **Zentrale Lab-Registry** (`src/data/labRegistry.js`):
  - Datengetriebene Registrierung und dynamisches Laden von Modulen ohne monolithischen Switch-Block.
- **Automatische Barrierefreiheits-Labels** (`src/utils/a11yAutoLabel.js`):
  - Kontextbasierte Benennung unbeschrifteter Steuerelemente zur Laufzeit.
  - Neuer Axe-Core-A11y-Test für alle Module (`allLabsA11y.test.jsx`).

### Behoben (Fixed)
- **Kritisch: Lade-Skeleton blockierte Klicks** (`index.html`):
  - Skript-Positionierung hinter `#root` korrigiert, sodass Skeleton zuverlässig entfernt wird.
- **Streak-Berechnung** (`src/utils/storage.js`):
  - Lokale Datumsschlüssel (`toLocalDateKey`) und DST-sichere Tagesdifferenz-Berechnung.
- **Tote Dashboard-Routen**:
  - Aliase für `bigo`, `gitvisual`, `k8s`, `pkce`, `pythonwasm`, `ragai`, `regexmaster`, `sqldungeon` nachgepflegt.

---

## [3.70.0] - 2026-09-15

### Hinzugefügt (Added)
- **RFC 793 TCP State Machine & 3-Way Handshake Studio** (`TcpStateMachineLab.jsx` & `src/utils/tcpStateMachineEngine.js`):
  - Vollständiger Zustandsautomat für Client & Server (`CLOSED`, `LISTEN`, `SYN_SENT`, `ESTABLISHED`, `FIN_WAIT`, `TIME_WAIT` etc.).
  - 3-Way Handshake und 4-Way Teardown mit manueller Paket-Injektion (SYN, ACK, PSH+ACK, RST).
- **Prometheus Alertmanager & PromQL Alert Rule Evaluator Studio** (`SreSloBurnLab.jsx` & `src/utils/sreSloBurnEngine.js`):
  - Alert State Machine (`INACTIVE` -> `PENDING` -> `FIRING`) mit `for`-Timer-Simulation und Template-Auflösung.
- **IHK WISO BAB II & Zuschlagskalkulation** (`WisoBabLab.jsx` & `src/utils/wisoBabEngine.js`):
  - Betriebsabrechnungsbogen II mit Kostenüberdeckung / Kostenunterdeckung pro Kostenstelle.

---

## [3.69.0] - 2026-09-01

### Hinzugefügt (Added)
- **IHK WISO Arbeitsrecht & Kündigungsfristen-Kalenderrechner** (`WisoLaborLawLab.jsx` & `src/utils/wisoLaborLawEngine.js`):
  - Kalendarische Fristenberechnung nach BGB § 622 und KSchG § 4 (3-Wochen-Klagefrist).
- **IPv6 Subnetting & Nibble-Boundary Studio** (`Ipv6RoutingLab.jsx` & `src/utils/ipv6Routing.js`):
  - Adressplanung nach RFC 4291, RFC 4862 (SLAAC) und RFC 6164.

---

## Frühere Versionen

Für eine detaillierte Auflistung aller Versionen vor Version 3.69.0 siehe den Abschnitt **Änderungshistorie & Entwicklungsdokumentation** in [README.md](README.md).
