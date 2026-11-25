/** @type {import('../topicsData').TopicContent} */
export default {
  learningGoals: [
    'Aufgaben und Aufbau von Betriebssystemen (Kernel, Prozesse, Dateisysteme) erklären',
    'Rechte unter Linux (chmod, Besitzer) und Windows (NTFS, Freigabe, AGDLP) vergeben und bewerten',
    'Active Directory, Gruppenrichtlinien und Benutzerverwaltung einordnen',
    'Dienste, Updates, Logs und einfache Administrationsskripte (Bash, PowerShell) einsetzen'
  ],
  content: `
## Aufgaben eines Betriebssystems

Das Betriebssystem (BS) verwaltet die Hardware und stellt Programmen einheitliche Dienste bereit. Es besteht aus dem **Kernel** (läuft mit höchsten Rechten, verwaltet Prozesse, Speicher, Geräte und Dateien) und Systemprogrammen darüber. Anwendungen laufen im Benutzerbereich und rufen den Kernel über **Systemaufrufe** auf.

| Aufgabe | Beispiel |
| :--- | :--- |
| Prozessverwaltung | Scheduler verteilt Rechenzeit auf Programme |
| Speicherverwaltung | virtueller Adressraum, Auslagerung (Swap) |
| Dateiverwaltung | Dateisysteme, Rechte, Journaling |
| Geräteverwaltung | Treiber für Drucker, Netzwerk, Speicher |
| Benutzerverwaltung | Konten, Gruppen, Anmeldung, Berechtigungen |

## Partitionen und Dateisysteme

Ein Datenträger wird in **Partitionen** unterteilt. Es gibt zwei Partitionsschemata:

| Merkmal | MBR | GPT |
| :--- | :--- | :--- |
| Maximale Datenträgergröße | 2 TiB | mehr als 2 TiB (praktisch unbegrenzt) |
| Primäre Partitionen | 4 | 128 (unter Windows) |
| Start | klassisches BIOS | UEFI |

Gängige **Dateisysteme**: NTFS (Windows, Rechte, Journaling, Komprimierung), ext4 (Linux, Journaling), APFS (macOS), FAT32 (kompatibel, Dateien maximal 4 GiB minus 1 Byte), exFAT (große Dateien, für Wechselmedien). Ein **Journal** protokolliert Änderungen, damit das Dateisystem nach einem Absturz schnell konsistent wird.

## Linux: Aufbau, Rechte, Dienste

### Verzeichnisstruktur

Unter Linux gibt es **einen** Dateibaum ab \`/\` (Wurzel). Wichtige Verzeichnisse:

| Pfad | Inhalt |
| :--- | :--- |
| \`/etc\` | Konfigurationsdateien |
| \`/home\` | Benutzerverzeichnisse |
| \`/var\` | veränderliche Daten, Logs (\`/var/log\`) |
| \`/usr\`, \`/bin\` | Programme |
| \`/tmp\` | temporäre Dateien |
| \`/dev\` | Gerätedateien |

### Benutzer, Gruppen und Dateirechte

Jede Datei hat einen **Besitzer** und eine **Gruppe**. Die Rechte \`r\` (lesen, 4), \`w\` (schreiben, 2) und \`x\` (ausführen, 1) werden für **Besitzer, Gruppe und andere** vergeben. Eine Zahl wie 750 steht für drei Ziffern: 7 = rwx, 5 = r-x, 0 = ---.

\`\`\`bash
ls -l skript.sh          # -rwxr-x--- 1 anna admins ...
chmod 750 skript.sh      # Besitzer rwx, Gruppe r-x, andere nichts
chown anna:admins skript.sh
sudo apt update          # einzelne Befehle mit Administratorrechten
\`\`\`

Benutzerkonten stehen in \`/etc/passwd\`, die Passwort-Hashes in \`/etc/shadow\` (nur für root lesbar). Arbeite im Alltag mit einem normalen Konto und nutze \`sudo\` nur bei Bedarf (**Prinzip der minimalen Rechte**).

### Dienste und Protokolle

Unter modernen Distributionen verwaltet **systemd** die Dienste:

\`\`\`bash
systemctl status nginx     # Zustand eines Dienstes
systemctl enable --now nginx   # beim Start aktivieren und sofort starten
journalctl -u nginx -n 50  # letzte Protokollzeilen des Dienstes
\`\`\`

## Windows: Rechte, Domäne, Gruppenrichtlinien

### NTFS- und Freigaberechte

Für Dateien auf NTFS gibt es abgestufte Rechte (Lesen, Lesen und Ausführen, Schreiben, Ändern, Vollzugriff). Bei einer **Netzwerkfreigabe** wirken **Freigabe- und NTFS-Rechte** zusammen: Es gilt das **restriktivere** der beiden. Rechte werden vererbt, ein ausdrückliches **Verweigern** hat Vorrang vor Erlauben.

### Active Directory (AD)

Das **Active Directory** ist der Verzeichnisdienst einer Windows-Domäne. Zentrale Begriffe:

- **Domäne** und **Domänencontroller (DC)**: Der DC speichert die Verzeichnisdatenbank und authentifiziert Benutzer (**Kerberos**).
- **Organisationseinheit (OU)**: Container zur Gliederung von Konten und Rechnern, auf die Richtlinien angewendet werden.
- **Gruppenrichtlinien (GPO)**: zentrale Einstellungen für Benutzer und Computer. Die Verarbeitungsreihenfolge lautet **L**okal, **S**ite, **D**omäne, **O**U (LSDOU), spätere Richtlinien überschreiben frühere.
- **DNS** ist für AD zwingend nötig, weil Clients die Domänencontroller darüber finden.

### Rechte über Gruppen: AGDLP

Rechte werden nicht einzelnen Konten, sondern **Gruppen** zugewiesen. Das Prinzip **AGDLP** beschreibt die Schachtelung:

![AGDLP: Accounts in globale Gruppen, diese in domänenlokale Gruppen, diese erhalten die Berechtigung](agdlp.svg "Konten werden Mitglied einer globalen Gruppe, diese einer domänenlokalen Gruppe, die auf der Ressource berechtigt ist")

1. **A**ccounts (Benutzerkonten) werden Mitglied in einer **G**lobalen Gruppe (z. B. \`G_Vertrieb\`, nach Abteilung).
2. Die globale Gruppe wird Mitglied einer **D**omänen**L**okalen Gruppe (z. B. \`DL_Vertrieb_Lesen\`, nach Ressource und Recht).
3. Die domänenlokale Gruppe erhält die **P**ermission (Berechtigung) auf der Ressource.

Vorteil: Wechselt jemand die Abteilung, ändert man nur die Gruppenmitgliedschaft. Die Berechtigungen auf den Ressourcen bleiben unverändert und sind nachvollziehbar.

## Updates, Rollout und Lizenzen

- **Patch-Management**: Updates erst in einer **Testgruppe** einspielen, dann breit ausrollen, mit Wartungsfenster und Rückfallplan. In Unternehmen verteilt etwa WSUS Windows-Updates zentral.
- **Rollout** vieler Rechner: Mit **Images** und automatischer Installation, Start über das Netzwerk per **PXE**. Ein Image enthält Betriebssystem und Standardsoftware.
- **Lizenzen**: OEM (an die Hardware gebunden), Volumenlizenz (Unternehmen, Aktivierung zentral), Abonnement. Für Serverzugriffe sind teils Zugriffslizenzen (CAL) nötig. Open-Source-Software (zum Beispiel GPL) erlaubt Nutzung und Weitergabe unter Bedingungen.

## Automatisierung mit Skripten

Wiederkehrende Aufgaben werden skriptgesteuert erledigt. Ein Skript sollte **idempotent** sein (mehrfaches Ausführen führt zum selben Zustand) und Fehler sauber melden.

**Bash** (Linux):

\`\`\`bash
#!/usr/bin/env bash
set -euo pipefail
find /var/log -name "*.log" -mtime +30 -print   # Logs älter als 30 Tage anzeigen
\`\`\`

**PowerShell** (Windows) arbeitet mit **Objekten** und der Benennung **Verb-Nomen**:

\`\`\`powershell
Get-Service | Where-Object Status -eq 'Stopped' | Select-Object Name, DisplayName
Get-ChildItem C:\\Daten -Recurse | Where-Object Length -gt 100MB
\`\`\`

## Fehlersuche

1. Symptom genau beschreiben, Zeitpunkt und Änderungen erfragen.
2. **Protokolle** lesen (Windows: Ereignisanzeige, Linux: \`journalctl\` und \`/var/log\`).
3. Hypothese bilden, **eine** Änderung testen, Ergebnis dokumentieren.
4. Bei Systemfehlern den Wiederherstellungsmodus oder ein Image nutzen.

> [!exam] Prüfungshinweis
> Häufig gefragt: Rechte mit chmod als Zahl, die Wirkung von Freigabe- plus NTFS-Rechten, AGDLP, Unterschied MBR und GPT sowie die Reihenfolge der Gruppenrichtlinien (LSDOU). Rechne Rechte immer Ziffer für Ziffer (4 + 2 + 1).
`,
  exercises: [
    {
      id: 'chmod-berechnen',
      title: 'Dateirechte als Zahl berechnen',
      prompt: 'Eine Datei soll folgende Rechte erhalten: Der Besitzer darf lesen und schreiben, die Gruppe darf nur lesen, alle anderen dürfen nichts. Gib den chmod-Befehl mit Zahlenschreibweise an und beschreibe die symbolische Darstellung.',
      hints: ['r = 4, w = 2, x = 1', 'Jede Stelle einzeln berechnen'],
      solution: 'Besitzer: lesen + schreiben = 4 + 2 = 6. Gruppe: lesen = 4. Andere: 0. Befehl: chmod 640 datei.txt. Symbolisch: rw-r-----.'
    },
    {
      id: 'agdlp-anwenden',
      title: 'Berechtigung nach AGDLP umsetzen',
      prompt: 'Die Abteilung Einkauf (Anna, Ben, Carla) soll auf der Freigabe \\\\fs01\\Einkauf lesen und schreiben dürfen. Beschreibe die Gruppen und Schritte nach dem AGDLP-Prinzip und erkläre, was bei einem Abteilungswechsel von Ben zu tun ist.',
      hints: ['Eine globale Gruppe nach Abteilung, eine domänenlokale nach Ressource und Recht'],
      solution: 'Schritt 1: Globale Gruppe G_Einkauf anlegen, Anna, Ben und Carla als Mitglieder (A in G). Schritt 2: Domänenlokale Gruppe DL_Einkauf_Aendern anlegen und G_Einkauf als Mitglied hinzufügen (G in DL). Schritt 3: Auf der Freigabe und im NTFS die Berechtigung Ändern an DL_Einkauf_Aendern vergeben (P). Wechselt Ben die Abteilung, wird er nur aus G_Einkauf entfernt und der neuen globalen Gruppe hinzugefügt. Die Ressourcenberechtigungen bleiben unverändert.'
    },
    {
      id: 'freigabe-ntfs',
      title: 'Effektive Rechte bei Freigabe und NTFS',
      prompt: 'Auf einer Freigabe hat die Gruppe Vertrieb das Freigaberecht Lesen. Im NTFS hat dieselbe Gruppe das Recht Ändern. Welche effektiven Rechte haben Mitglieder beim Zugriff über das Netzwerk, welche beim lokalen Zugriff am Server? Begründe.',
      hints: ['Über das Netzwerk wirken beide Rechte, lokal nur NTFS'],
      solution: 'Über das Netzwerk gilt das restriktivere Recht: Lesen (Freigabe schränkt auf Lesen ein). Beim lokalen Zugriff am Server gelten nur die NTFS-Rechte: Ändern. Freigaberechte wirken nur beim Zugriff über das Netzwerk.'
    },
    {
      id: 'partitionierung-planen',
      title: 'Partitionsschema wählen',
      prompt: 'Ein neuer Server erhält zwei Festplatten mit je 4 TB. Es soll per UEFI gestartet werden und eine Datenpartition mit der gesamten Plattenkapazität bekommen. Welches Partitionsschema ist erforderlich, und warum reicht MBR nicht?',
      hints: ['MBR adressiert höchstens 2 TiB'],
      solution: 'Es muss GPT verwendet werden. MBR kann Datenträger nur bis 2 TiB adressieren, 4 TB entsprechen etwa 3,64 TiB. GPT unterstützt deutlich größere Datenträger und passt zum Start per UEFI.'
    }
  ],
  quiz: [
    {
      question: 'Welche Dateirechte beschreibt chmod 754?',
      options: ['Besitzer rwx, Gruppe r-x, andere r--', 'Besitzer rwx, Gruppe rwx, andere r--', 'Besitzer r-x, Gruppe r-x, andere r--', 'Besitzer rwx, Gruppe r--, andere r-x'],
      correct: 0,
      explanation: '7 = rwx, 5 = r-x, 4 = r--.'
    },
    {
      question: 'Was gilt, wenn auf einer Windows-Freigabe das Freigaberecht Lesen und das NTFS-Recht Ändern vorliegt (Zugriff über das Netzwerk)?',
      options: ['Ändern', 'Lesen', 'Vollzugriff', 'Kein Zugriff'],
      correct: 1,
      explanation: 'Es gilt das restriktivere Recht, also Lesen.'
    },
    {
      question: 'Wofür steht AGDLP?',
      options: [
        'Accounts in Globale Gruppen, diese in Domänenlokale Gruppen, diese erhalten Permissions',
        'Administratoren, Gäste, Domänen, Lizenzen, Profile',
        'Authentifizierung, Gruppen, Dateien, Laufwerke, Pfade',
        'Alle Gruppen dürfen lokal protokollieren'
      ],
      correct: 0,
      explanation: 'AGDLP schachtelt Konten, globale Gruppen, domänenlokale Gruppen und Berechtigungen.'
    },
    {
      question: 'In welcher Reihenfolge werden Gruppenrichtlinien verarbeitet?',
      options: ['OU, Domäne, Site, lokal', 'Lokal, Site, Domäne, OU', 'Domäne, lokal, OU, Site', 'Site, OU, lokal, Domäne'],
      correct: 1,
      explanation: 'LSDOU: Lokal, Site, Domäne, OU. Spätere Richtlinien überschreiben frühere.'
    },
    {
      question: 'Welche Datenträgergröße kann MBR höchstens adressieren?',
      options: ['512 GiB', '2 TiB', '16 TiB', 'Unbegrenzt'],
      correct: 1,
      explanation: 'MBR verwendet 32-Bit-Sektoradressen. Bei 512 Byte je Sektor ergeben sich 2 TiB.'
    },
    {
      question: 'Welcher Befehl zeigt unter Linux mit systemd die letzten Protokollzeilen eines Dienstes?',
      options: ['journalctl -u dienstname -n 50', 'ls /dev', 'chmod 750 dienstname', 'ipconfig /all'],
      correct: 0,
      explanation: 'journalctl liest das systemd-Journal, -u wählt den Dienst, -n begrenzt die Zeilenzahl.'
    },
    {
      question: 'Was bedeutet es, wenn ein Administrationsskript idempotent ist?',
      options: [
        'Es läuft nur einmalig',
        'Mehrfaches Ausführen führt zum selben Zielzustand',
        'Es benötigt keine Rechte',
        'Es schreibt keine Protokolle'
      ],
      correct: 1,
      explanation: 'Idempotent heißt: Wiederholtes Ausführen ändert den Zustand nach dem ersten Lauf nicht mehr.'
    }
  ],
  relatedLabs: [
    { id: 'linux_permissions_lab', label: 'Linux-Dateirechte' },
    { id: 'raid_calculator', label: 'RAID-Rechner' },
    { id: 'linux_memory_lab', label: 'Linux-Speicherverwaltung' }
  ],
  sources: [
    { title: 'Wikipedia: Active Directory', url: 'https://de.wikipedia.org/wiki/Active_Directory' },
    { title: 'Wikipedia: GUID Partition Table', url: 'https://de.wikipedia.org/wiki/GUID_Partition_Table', note: 'Vergleich mit MBR' },
    { title: 'Wikipedia: Unix-Dateirechte', url: 'https://de.wikipedia.org/wiki/Unix-Dateirechte' },
    { title: 'Microsoft Learn: Active Directory Domain Services, Übersicht', url: 'https://learn.microsoft.com/de-de/windows-server/identity/ad-ds/get-started/virtual-dc/active-directory-domain-services-overview' },
    { title: 'systemd: Dokumentation', url: 'https://systemd.io/' }
  ],
  sourcesCheckedOn: '25.11.2026'
};
