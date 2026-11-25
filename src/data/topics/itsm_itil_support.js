/** @type {import('../topicsData').TopicContent} */
export default {
  learningGoals: [
    'Incident, Problem, Change und Service Request unterscheiden und richtig zuordnen',
    'Tickets nach Auswirkung und Dringlichkeit priorisieren und Eskalationswege nutzen',
    'SLA, OLA und Underpinning Contract sowie Kennzahlen wie MTTR, MTBF und Verfügbarkeit berechnen',
    'Support strukturiert und kundenorientiert durchführen und Wissen dokumentieren'
  ],
  content: `
## Warum IT-Service-Management?

IT-Abteilungen liefern **Services** (Dienste), keine einzelnen Geräte: E-Mail, Arbeitsplatz, ERP, Netzwerkzugang. **IT-Service-Management (ITSM)** organisiert, wie diese Services geplant, bereitgestellt, betrieben und verbessert werden. Das bekannteste Rahmenwerk ist **ITIL**, die Norm dazu ist **ISO/IEC 20000**.

ITIL 4 beschreibt ein **Service Value System**. Dessen Wertschöpfungskette hat sechs Aktivitäten: **Planen**, **Verbessern**, **Einbinden** (Engage), **Gestalten und Überführen** (Design & Transition), **Beschaffen/Bauen** (Obtain/Build) und **Liefern und Unterstützen** (Deliver & Support).

Die sieben **Leitprinzipien** von ITIL 4 sind: auf den Wert ausrichten, dort beginnen, wo man steht, iterativ mit Feedback voranschreiten, zusammenarbeiten und Transparenz fördern, ganzheitlich denken und arbeiten, einfach und praktikabel halten, optimieren und automatisieren.

## Die zentralen Prozesse und Begriffe

| Begriff | Bedeutung | Beispiel |
| :--- | :--- | :--- |
| **Incident** | ungeplante Störung oder Qualitätsminderung eines Services | Mailserver nicht erreichbar |
| **Service Request** | Anfrage nach etwas Standardisiertem | neuer Benutzer, Softwareinstallation |
| **Problem** | Ursache eines oder mehrerer Incidents | defekter Treiber, der Abstürze verursacht |
| **Known Error** | Problem mit bekannter Ursache und Workaround | Fehler mit dokumentierter Umgehung |
| **Change** | Hinzufügen, Ändern oder Entfernen von etwas mit Auswirkung auf Services | Firmware-Update der Firewall |

![Zusammenspiel von Incident, Workaround, Problem und Change](incident-problem-change.svg "Incident stellt den Dienst wieder her, Problem sucht die Ursache, Change führt die dauerhafte Lösung ein")

**Wichtig**: Das Ziel des **Incident Managements** ist die **schnelle Wiederherstellung** des Betriebs, auch mit einem **Workaround**. Das **Problem Management** sucht die **Ursache** und verhindert Wiederholungen. Eine Lösung, die das System verändert, läuft als **Change**.

## Incident Management

### Ablauf

1. **Erfassen**: Ticket mit allen relevanten Angaben (Wer? Was? Seit wann? Fehlermeldung? Auswirkung?).
2. **Kategorisieren und priorisieren**.
3. **Erstdiagnose und Lösung** durch den Service Desk (1st Level).
4. Bei Bedarf **Eskalation** (2nd/3rd Level, Hersteller).
5. **Lösen, Rückmeldung einholen, Ticket schließen** und Wissen dokumentieren.

### Priorität: Auswirkung und Dringlichkeit

Die **Priorität** ergibt sich aus der **Auswirkung** (Impact, wie viele Nutzer oder wie kritisch) und der **Dringlichkeit** (Urgency, wie schnell ist eine Lösung nötig).

| Auswirkung \\ Dringlichkeit | Hoch | Mittel | Niedrig |
| :--- | :---: | :---: | :---: |
| **Hoch** | P1 kritisch | P2 hoch | P3 mittel |
| **Mittel** | P2 hoch | P3 mittel | P4 niedrig |
| **Niedrig** | P3 mittel | P4 niedrig | P4 niedrig |

Die Priorität bestimmt Reaktions- und Lösungszeiten laut Servicevereinbarung. Ein einzelner Nutzer ohne Frist (niedrig/niedrig) wartet länger als ein Ausfall des Kassensystems (hoch/hoch).

### Support-Ebenen und Eskalation

- **1st Level (Service Desk)**: Annahme, Standardlösungen, Wissensdatenbank.
- **2nd Level**: Fachgruppen (Netzwerk, Server, Anwendungen), tiefere Analyse.
- **3rd Level**: Spezialisten, Entwickler, Hersteller.
- **Funktionale Eskalation** gibt an eine fachlich zuständige Gruppe weiter, **hierarchische Eskalation** informiert Vorgesetzte, wenn Fristen oder Prioritäten gefährdet sind.

## Problem Management

Das Problem Management geht Ursachen auf den Grund. Typische Werkzeuge:

- **5-Why-Methode**: Mehrfach "Warum?" fragen, bis die Ursache klar ist.
- **Ishikawa-Diagramm** (Ursache-Wirkung): Ursachen nach Kategorien wie Mensch, Methode, Maschine, Material, Umwelt ordnen.

Ist die Ursache bekannt, aber noch nicht behoben, wird ein **Known Error** mit **Workaround** in der **Wissensdatenbank** dokumentiert. So lösen künftige Incidents schneller.

## Change Enablement

Änderungen können Störungen auslösen. Deshalb werden sie geplant, bewertet und genehmigt:

| Typ | Beschreibung | Genehmigung |
| :--- | :--- | :--- |
| **Standard-Change** | wiederkehrend, risikoarm, vorab freigegeben | keine Einzelfreigabe |
| **Normaler Change** | Antrag (RFC) mit Risikobewertung und Plan | Change-Gremium (CAB) bzw. Genehmigungsstelle |
| **Notfall-Change** | dringend, um einen schweren Incident zu beheben | beschleunigte Freigabe, nachträgliche Prüfung |

Ein guter Change-Antrag enthält **Beschreibung, Grund, Risiko, Zeitplan, Test, Rückfallplan (Rollback)** und Verantwortliche. Änderungen werden außerhalb der Hauptnutzungszeit im **Wartungsfenster** durchgeführt.

## Konfigurationsmanagement

Eine **CMDB** (Configuration Management Database) speichert **Configuration Items (CI)**, zum Beispiel Server, Anwendungen, Switches, und ihre **Beziehungen**. Sie zeigt die Auswirkung einer Störung oder eines Changes: Welche Services hängen an diesem Switch?

## Servicevereinbarungen

| Vereinbarung | Partner | Inhalt |
| :--- | :--- | :--- |
| **SLA** (Service Level Agreement) | IT und Kunde | Leistungsumfang, Verfügbarkeit, Reaktions- und Lösungszeiten |
| **OLA** (Operational Level Agreement) | IT-intern | Zusammenarbeit zwischen Teams |
| **UC** (Underpinning Contract) | IT und externer Lieferant | Zusagen des Lieferanten, die das SLA stützen |

> [!example] Beispiel Verfügbarkeit im SLA
> Zugesagt sind 99,5 % pro Monat (30 Tage = 720 Stunden). Erlaubte Ausfallzeit: 0,5 % von 720 h = **3,6 Stunden**.

## Kennzahlen

- **MTTR** (Mean Time To Repair/Restore): mittlere Wiederherstellungszeit.
- **MTBF** (Mean Time Between Failures): mittlere Zeit zwischen Ausfällen.
- **Verfügbarkeit = MTBF : (MTBF + MTTR)**.
- Weitere Kennzahlen: Anteil der im Erstkontakt gelösten Tickets (**First-Level-Fix-Rate**), **Erfüllungsgrad der SLA-Zeiten**, **Kundenzufriedenheit** (zum Beispiel per Umfrage nach Ticketschluss).

> [!example] Beispiel
> MTBF = 720 h, MTTR = 2 h: Verfügbarkeit = 720 : 722 = 0,99723, also **99,72 %**.

## Gute Ticketbearbeitung und Kommunikation

- **Ticketbeschreibung**: sachlich und vollständig (Wer, Was, Wann, Fehlermeldung, Auswirkung, bisherige Schritte). Screenshots helfen.
- **Rückfragen** verständlich und ohne Fachjargon stellen, Erwartungen und nächste Schritte nennen.
- **Datenschutz**: Beim Fernzugriff auf Geräte die Zustimmung einholen und nur das für die Lösung Nötige einsehen.
- **Wissen dokumentieren**: Lösung kurz festhalten, damit der nächste Fall schneller geht.

> [!exam] Prüfungshinweis
> Häufig verlangt: Ticket als Incident, Problem, Change oder Service Request klassifizieren, Priorität aus Auswirkung und Dringlichkeit bestimmen, Verfügbarkeit aus MTBF und MTTR berechnen und die Rolle von SLA, OLA und UC erklären.
`,
  exercises: [
    {
      id: 'ticket-klassifizieren',
      title: 'Tickets zuordnen',
      prompt: 'Ordne die Fälle der passenden Kategorie zu (Incident, Service Request, Problem, Change) und begründe kurz: a) Ein Mitarbeiter möchte Zugriff auf ein neues Laufwerk. b) Der Drucker im Vertrieb druckt nicht. c) Zum dritten Mal in zwei Wochen fällt die VPN-Verbindung aus, die Ursache ist unbekannt. d) Die Firmware aller Switches soll aktualisiert werden.',
      hints: ['Incident = Störung, Request = Standardanfrage', 'Problem = Ursache mehrerer Incidents'],
      solution: 'a) Service Request: standardisierte Anfrage. b) Incident: ungeplante Störung. c) Problem: wiederkehrende Incidents mit unbekannter Ursache, Ursachenanalyse nötig (die einzelnen Ausfälle bleiben Incidents). d) Change: geplante Änderung mit möglicher Auswirkung auf den Betrieb, mit Risikobewertung, Test und Rückfallplan.'
    },
    {
      id: 'prioritaet-bestimmen',
      title: 'Priorität bestimmen',
      prompt: 'Bestimme mit der Matrix die Priorität und begründe: a) Das Warenwirtschaftssystem ist für alle 80 Mitarbeiter ausgefallen, die Auslieferung steht still. b) Bei einer Mitarbeiterin funktioniert das Mikrofon im Headset nicht, es gibt eine Ersatzlösung. c) Das Kantinen-Infosystem ist langsam, niemand ist blockiert.',
      hints: ['Auswirkung = wie viele und wie kritisch, Dringlichkeit = wie schnell nötig'],
      solution: 'a) Auswirkung hoch, Dringlichkeit hoch: P1 (kritisch), sofortige Bearbeitung und Eskalation. b) Auswirkung niedrig, Dringlichkeit niedrig: P4, Bearbeitung in regulärer Zeit. c) Auswirkung niedrig bis mittel (alle betroffen, aber nicht kritisch), Dringlichkeit niedrig: P4 (oder P3), geplante Bearbeitung.'
    },
    {
      id: 'verfuegbarkeit-mtbf',
      title: 'Verfügbarkeit berechnen',
      prompt: 'Ein Server fällt im Mittel alle 1.000 Stunden aus (MTBF) und ist im Mittel 4 Stunden nicht verfügbar (MTTR). Berechne die Verfügbarkeit in Prozent. Der SLA verlangt 99,9 %. Wird er erfüllt? Welcher MTTR wäre bei gleicher MTBF höchstens erlaubt?',
      hints: ['A = MTBF : (MTBF + MTTR)', 'A = 0,999 nach MTTR auflösen'],
      solution: 'Verfügbarkeit: 1.000 : 1.004 = 0,99602, also 99,60 %. Der SLA von 99,9 % wird nicht erfüllt. Erlaubter MTTR: 1.000 : (1.000 + x) = 0,999, also 1.000 + x = 1.001,0 und x ≈ 1,0 Stunde. Die Wiederherstellung müsste im Mittel höchstens etwa 1 Stunde dauern (oder die MTBF deutlich steigen).'
    },
    {
      id: 'change-planen',
      title: 'Change-Antrag formulieren',
      prompt: 'Die Firewall soll im Wartungsfenster am Samstag auf eine neue Firmware aktualisiert werden. Welche Angaben gehören in den Change-Antrag, und wie würdest du das Risiko begrenzen?',
      hints: ['Rückfallplan nicht vergessen', 'Test und Kommunikation'],
      solution: 'Inhalt: Beschreibung und Grund (Sicherheitslücke), betroffene Services und CIs, Risikobewertung, Zeitplan im Wartungsfenster mit Dauer, Testplan, Rückfallplan (Konfigurationssicherung und alte Firmware bereithalten), Verantwortliche und Kontakte, Kommunikation an die Nutzer. Risikobegrenzung: vorher in einer Testumgebung prüfen, Konfiguration sichern, Hochverfügbarkeit nutzen (erst Standby-Firewall, dann aktive), nach der Änderung Funktionstest, im Fehlerfall Rollback.'
    }
  ],
  quiz: [
    {
      question: 'Was ist das Hauptziel des Incident Managements?',
      options: [
        'Die Ursache dauerhaft beseitigen',
        'Den normalen Servicebetrieb so schnell wie möglich wiederherstellen',
        'Änderungen genehmigen',
        'Verträge mit Lieferanten verhandeln'
      ],
      correct: 1,
      explanation: 'Incident Management stellt den Betrieb schnell wieder her, auch mit einem Workaround. Ursachen klärt das Problem Management.'
    },
    {
      question: 'Welche Priorität ergibt sich bei hoher Auswirkung und hoher Dringlichkeit?',
      options: ['P4 niedrig', 'P3 mittel', 'P2 hoch', 'P1 kritisch'],
      correct: 3,
      explanation: 'Hohe Auswirkung und hohe Dringlichkeit führen zur höchsten Priorität P1.'
    },
    {
      question: 'Was beschreibt ein Known Error?',
      options: [
        'Ein Problem mit bekannter Ursache und dokumentiertem Workaround',
        'Einen Fehler, der noch nicht gemeldet wurde',
        'Einen genehmigten Change',
        'Eine Störung ohne Auswirkung'
      ],
      correct: 0,
      explanation: 'Beim Known Error ist die Ursache bekannt, der Workaround steht in der Wissensdatenbank.'
    },
    {
      question: 'Welcher Change-Typ ist wiederkehrend, risikoarm und vorab freigegeben?',
      options: ['Normaler Change', 'Notfall-Change', 'Standard-Change', 'Projekt-Change'],
      correct: 2,
      explanation: 'Standard-Changes sind vorab genehmigt und brauchen keine Einzelfreigabe.'
    },
    {
      question: 'Wie lautet die Formel der Verfügbarkeit mit MTBF und MTTR?',
      options: ['MTBF : (MTBF + MTTR)', 'MTTR : MTBF', 'MTBF − MTTR', 'MTBF · MTTR'],
      correct: 0,
      explanation: 'Verfügbarkeit = MTBF : (MTBF + MTTR). Je kleiner MTTR, desto näher an 100 %.'
    },
    {
      question: 'Wie viel Ausfallzeit pro Monat (30 Tage) erlaubt ein SLA mit 99,5 % Verfügbarkeit?',
      options: ['0,36 Stunden', '3,6 Stunden', '36 Stunden', '7,2 Stunden'],
      correct: 1,
      explanation: '0,5 % von 720 Stunden sind 3,6 Stunden.'
    },
    {
      question: 'Was regelt ein OLA?',
      options: [
        'Die Zusammenarbeit zwischen internen Teams der IT',
        'Die Vertragsbeziehung zum Kunden',
        'Die Lizenzbedingungen von Software',
        'Die Zugriffsrechte im Active Directory'
      ],
      correct: 0,
      explanation: 'Ein Operational Level Agreement gilt intern zwischen Teams. Mit dem Kunden wird ein SLA vereinbart, mit externen Lieferanten ein Underpinning Contract.'
    }
  ],
  relatedLabs: [
    { id: 'itsm_simulator', label: 'ITSM-Simulator' },
    { id: 'bsi_grundschutz_lab', label: 'BSI IT-Grundschutz' }
  ],
  sources: [
    { title: 'Wikipedia: IT Infrastructure Library (ITIL)', url: 'https://de.wikipedia.org/wiki/IT_Infrastructure_Library' },
    { title: 'Wikipedia: IT-Service-Management', url: 'https://de.wikipedia.org/wiki/IT-Service-Management' },
    { title: 'Wikipedia: Verfügbarkeit', url: 'https://de.wikipedia.org/wiki/Verf%C3%BCgbarkeit', note: 'MTBF, MTTR und Berechnung' },
    { title: 'ISO/IEC 20000-1', note: 'Norm für Service-Management-Systeme, kostenpflichtig' },
    { title: 'ITIL 4 Foundation (PeopleCert/AXELOS)', note: 'Leitprinzipien und Service Value System, kostenpflichtiges Lehrwerk' }
  ],
  sourcesCheckedOn: '25.11.2026'
};
