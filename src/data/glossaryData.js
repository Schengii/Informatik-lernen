export const GLOSSARY_TERMS = [
  {
    id: 'api',
    term: 'API (Application Programming Interface)',
    category: 'Programmierung',
    difficulty: 'Azubi / IHK',
    simpleExplanation: 'Eine Schnittstelle, über die verschiedene Software-Programme gegenseitig Daten austauschen können – wie ein Kellner im Restaurant, der deine Bestellung zur Küche bringt.',
    expertExplanation: 'Ein definiertes Set von Endpunkten (z. B. REST, GraphQL, gRPC), Protokollen und Datenformaten (JSON, XML), über das Softwaremodule miteinander kommunizieren.',
    example: 'const response = await fetch("https://api.example.com/wetter");'
  },
  {
    id: 'binaer',
    term: 'Binärsystem (Zweiersystem)',
    category: 'Grundlagen',
    difficulty: 'Einsteiger',
    simpleExplanation: 'Die Sprache des Computers, die nur aus zwei Ziffern besteht: 0 (Strom aus) und 1 (Strom an).',
    expertExplanation: 'Stellenwertsystem zur Basis 2. Jedes Bit repräsentiert eine Zweierpotenz (2^0, 2^1, 2^2, ...). 8 Bits bilden 1 Byte.',
    example: '1010 im Binärsystem entspricht der Zahl 10 im Dezimalsystem.'
  },
  {
    id: 'cpu',
    term: 'CPU (Central Processing Unit)',
    category: 'Hardware',
    difficulty: 'Einsteiger',
    simpleExplanation: 'Das Haupt-Gehirn des Computers. Die CPU verarbeitet Befehle und führt Berechnungen durch.',
    expertExplanation: 'Hardware-Komponente bestehend aus Rechenwerk (ALU), Steuerwerk (CU) und Registern. Taktfrequenz wird in Gigahertz (GHz) gemessen.',
    example: 'Intel Core i9 oder AMD Ryzen 9 führen Milliarden Befehle pro Sekunde aus.'
  },
  {
    id: 'deadlock',
    term: 'Deadlock (Verklemmung)',
    category: 'Programmierung',
    difficulty: 'Senior / Expert',
    simpleExplanation: 'Ein Zustand, bei dem zwei Programme gegenseitig auf Ressourcen des anderen warten und dadurch beide dauerhaft blockiert sind.',
    expertExplanation: 'Systemzustand in der Nebenläufigkeit (Concurrency), bei dem vier Bedingungen erfüllt sind: Mutual Exclusion, Hold and Wait, No Preemption und Circular Wait.',
    example: 'Prozess A sperrt Ressource 1 und wartet auf 2. Prozess B sperrt Ressource 2 und wartet auf 1.'
  },
  {
    id: 'dns',
    term: 'DNS (Domain Name System)',
    category: 'Netzwerke',
    difficulty: 'Azubi / IHK',
    simpleExplanation: 'Das Telefonbuch des Internets. Es übersetzt verständliche Namen (wie google.com) in IP-Adressen (wie 142.250.180.36).',
    expertExplanation: 'Hierarchisch verteiltes Domaennamensystem auf OSI-Schicht 7, das FQDNs mittels rekursiver und iterativer Nameserver-Abfragen in IP-Adressen auflöst.',
    example: 'nslookup google.com gibt die zugehörige IP-Adresse zurück.'
  },
  {
    id: 'git',
    term: 'Git & Versionskontrolle',
    category: 'Tools & DevOps',
    difficulty: 'Einsteiger',
    simpleExplanation: 'Ein Zeitreise-Werkzeug für Code. Es speichert jeden Zwischenstand deines Projekts, damit du Änderungen nachvollziehen und im Team arbeiten kannst.',
    expertExplanation: 'Verteiltes Versionskontrollsystem (DVCS), das Repositories als gerichtete azyklische Graphen (DAG) von Commits speichert.',
    example: 'git add . && git commit -m "feat: neues Feature" && git push'
  },
  {
    id: 'hash',
    term: 'Hashing & Hashfunktionen',
    category: 'Security',
    difficulty: 'Azubi / IHK',
    simpleExplanation: 'Ein Einweg-Verfahren, das einen beliebig langen Text in eine feste Zeichenkette verwandelt. Aus dem Hash kann das Original nicht zurückgerechnet werden.',
    expertExplanation: 'Kryptographische Einwegfunktion (z. B. SHA-256, bcrypt) mit Kollisionssicherheit und Lawineneffekt (Avalanche Effect).',
    example: 'bcrypt.hash("MeinPasswort", 10) erzeugt einen sicheren Hash für die Datenbank.'
  },
  {
    id: 'ihk_gap1',
    term: 'IHK GAP 1 (Gestreckte Abschlussprüfung Teil 1)',
    category: 'Ausbildung & IHK',
    difficulty: 'Azubi / IHK',
    simpleExplanation: 'Die erste große Teilprüfung der IHK für IT-Ausbildungen nach ca. 1,5 Jahren (zählt 20% zur Gesamtnote).',
    expertExplanation: 'Prüfungsbereich "Einrichten eines IT-gestützten Arbeitsplatzes" mit Schwerpunkten Hardware, Betriebssysteme, Netzwerke, Kundenbedarf und Arbeitssicherheit.',
    example: 'Prüfungsfragen zu Subnetting, Kaufverträgen, Stromverbrauch und Ergonomie.'
  },
  {
    id: 'json',
    term: 'JSON (JavaScript Object Notation)',
    category: 'Webentwicklung',
    difficulty: 'Einsteiger',
    simpleExplanation: 'Ein einfaches Textformat zum Speichern und Austauschen von Daten zwischen Webseiten und Servern.',
    expertExplanation: 'Leichtgewichtiges, sprachunabhängiges Datenaustauschformat basierend auf Schlüssel-Wert-Paaren und geordneten Listen.',
    example: '{ "user": "Alex", "level": 5, "active": true }'
  },
  {
    id: 'owasp',
    term: 'OWASP Top 10',
    category: 'Security',
    difficulty: 'Senior / Expert',
    simpleExplanation: 'Eine Liste der 10 gefährlichsten Sicherheitslücken in Webanwendungen, die jeder Programmierer kennen sollte.',
    expertExplanation: 'Regelmäßig aktualisierter Standardbericht des Open Web Application Security Project zu kritischen Sicherheitsrisiken (z. B. Broken Access Control, Injection, Cryptographic Failures).',
    example: 'Vermeidung von SQL Injection durch Verwendung von Prepared Statements.'
  },
  {
    id: 'ram',
    term: 'RAM (Random Access Memory)',
    category: 'Hardware',
    difficulty: 'Einsteiger',
    simpleExplanation: 'Der flüchtige Arbeitsspeicher des Computers. Hier liegen alle Programme, die aktuell geöffnet sind. Beim Ausschalten wird er geleert.',
    expertExplanation: 'Direkt adressierbarer, valatiler Hauptspeicher mit sehr hohen Lese- und Schreibgeschwindigkeiten im Vergleich zu SSDs.',
    example: '16 GB DDR5-RAM ermöglichen das flüssige Ausführen mehrerer Entwickler-Tools zeitgleich.'
  },
  {
    id: 'sql_join',
    term: 'SQL JOIN (Verknüpfung)',
    category: 'Datenbanken',
    difficulty: 'Azubi / IHK',
    simpleExplanation: 'Verbindet Daten aus zwei verschiedenen Datenbank-Tabellen über ein gemeinsames Merkmal (z. B. Kundennummer).',
    expertExplanation: 'Relationaler Operator zur Kombination von Zeilen aus zwei Tabellen basierend auf Join-Bedingungen (INNER, LEFT OUTER, RIGHT OUTER, FULL OUTER).',
    example: 'SELECT * FROM kunden JOIN bestellungen ON kunden.id = bestellungen.kunden_id;'
  }
];
