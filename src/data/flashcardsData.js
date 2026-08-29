export const FLASHCARDS_DATA = [
  {
    id: 1,
    category: 'Grundlagen',
    difficulty: 'Einsteiger',
    front: 'Was ist ein Bit und wie unterscheidet es sich von einem Byte?',
    back: 'Ein Bit ist die kleinste Informationseinheit (0 oder 1). 1 Byte besteht aus 8 Bits und kann 256 verschiedene Zustände (0-255) darstellen.'
  },
  {
    id: 2,
    category: 'Datenbanken',
    difficulty: 'Azubi / IHK',
    front: 'Was ist der Unterschied zwischen einem Primärschlüssel (Primary Key) und einem Fremdschlüssel (Foreign Key)?',
    back: 'Ein Primärschlüssel identifiziert jeden Datensatz in einer Tabelle eindeutig. Ein Fremdschlüssel verweist auf den Primärschlüssel einer anderen Tabelle, um eine Beziehung herzustellen.'
  },
  {
    id: 3,
    category: 'Security',
    difficulty: 'Senior / Expert',
    front: 'Was versteht man unter Cross-Site Scripting (XSS)?',
    back: 'XSS ist eine Sicherheitslücke, bei der Angreifer bösartigen Skriptcode (meist JavaScript) in eine vertrauenswürdige Webseite einschleusen, der dann im Browser anderer Nutzer ausgeführt wird.'
  },
  {
    id: 4,
    category: 'Netzwerke',
    difficulty: 'Azubi / IHK',
    front: 'Was ist der Unterschied zwischen TCP und UDP?',
    back: 'TCP (Transmission Control Protocol) ist verbindungsorientiert und garantiert die korrekte, vollständige Paketübertragung. UDP ist verbindungslos, schneller, garantiert jedoch keine Auslieferung (ideal für Streaming/Gaming).'
  },
  {
    id: 5,
    category: 'Programmierung',
    difficulty: 'Junior / Professional',
    front: 'Was ist der Unterschied zwischen `==` und `===` in JavaScript?',
    back: '`==` vergleicht nur die Werte und führt eine implizite Typkonvertierung durch. `===` vergleicht sowohl Wert als auch Datentyp (strikt).'
  },
  {
    id: 6,
    category: 'Rechnerarchitektur',
    difficulty: 'Azubi / IHK',
    front: 'Welche vier Phasen durchläuft der Von-Neumann-Befehlszyklus (Taktzyklus)?',
    back: '1. FETCH (Befehl aus dem RAM ins IR laden)\n2. DECODE (Steuerwerk decodiert den Opcode)\n3. EXECUTE (ALU führt die Rechenoperation aus)\n4. WRITEBACK (Ergebnis im Akkumulator oder RAM speichern).'
  },
  {
    id: 7,
    category: 'Datenbanken',
    difficulty: 'Senior / Expert',
    front: 'Wann wählt der SQL Query Optimizer einen Index Scan statt eines Full Table Scans?',
    back: 'Wenn die Abfrage hochselektiv ist (nur ein kleiner Prozentsatz der Zeilen wird abgerufen, z. B. < 5-10%) und ein passender B-Tree Index auf den gefilterten Spalten (WHERE / JOIN) existiert.'
  },
  {
    id: 8,
    category: 'Security & Auth',
    difficulty: 'Junior / Professional',
    front: 'Was ist der Unterschied zwischen Authentifizierung und Autorisierung?',
    back: 'Authentifizierung = "Wer bist du?" (Identitätsprüfung via Passwort, MFA, JWT).\nAutorisierung = "Was darfst du tun?" (Rechteprüfung via Rollen/Permissions/RBAC).'
  },
  {
    id: 9,
    category: 'DevOps & Cloud',
    difficulty: 'Senior / Expert',
    front: 'Was ist der Unterschied zwischen einem Docker Image und einem Docker Container?',
    back: 'Ein Image ist die unveränderliche, schreibgeschützte Vorlage (Blueprint). Ein Container ist die laufende, isolierte Instanz dieses Images mit einer beschreibbaren obersten Ebene.'
  },
  {
    id: 10,
    category: 'IHK Prüfungswissen',
    difficulty: 'Azubi / IHK',
    front: 'Was bedeuten die Kennzahlen RTO (Recovery Time Objective) und RPO (Recovery Point Objective)?',
    back: 'RTO = Maximale Ausfallzeit (Wie schnell muss das System nach einem Crash wieder laufen?).\nRPO = Maximal tolerierbarer Datenverlust gemessen in Zeit (Wie alt darf das letzte Backup sein?).'
  }
];

export const LEITNER_FLASHCARDS = [
  { id: 'l1', q: 'Was bedeutet die Abkürzung EVA im Grundprinzip der DV?', a: 'Eingabe, Verarbeitung, Ausgabe', box: 1 },
  { id: 'l2', q: 'Welche Schicht des OSI-Modells ist für das IP-Routing verantwortlich?', a: 'Schicht 3 (Network Layer / Vermittlungsschicht)', box: 1 },
  { id: 'l3', q: 'Was ist der Hauptunterschied zwischen symmetrischer und asymmetrischer Verschlüsselung?', a: 'Symmetrisch nutzt 1 gemeinsamen Schlüssel; Asymmetrisch nutzt ein Schlüsselpaar (Public/Private Key).', box: 1 },
  { id: 'l4', q: 'Was beschreibt die Normalisierung bis zur 3. Normalform (3NF)?', a: 'Freiheit von redundanten Attributen und transitiven Abhängigkeiten.', box: 1 }
];

export const SM2_SAMPLE_CARDS = [
  {
    id: 1,
    front: 'Was besagt das EVA-Prinzip in der Informatik?',
    back: 'Eingabe -> Verarbeitung -> Ausgabe (Grundlegendes Strukturprinzip der Datenverarbeitung).',
    category: 'Grundlagen',
    repetitions: 2,
    easeFactor: 2.5,
    interval: 6
  },
  {
    id: 2,
    front: 'Welcher HTTP-Statuscode signalisiert "101 Switching Protocols" (z.B. bei WebSockets)?',
    back: 'HTTP 101: Der Server wechselt das Protokoll gemäß dem Upgrade-Header des Clients (z.B. von HTTP/1.1 zu WebSocket).',
    category: 'Netzwerke',
    repetitions: 1,
    easeFactor: 2.4,
    interval: 1
  },
  {
    id: 3,
    front: 'Was ist der Unterschied zwischen 2. Normalform (2NF) und 3. Normalform (3NF)?',
    back: '2NF fordert keine partiellen Abhängigkeiten vom zusammengesetzten Primärschlüssel. 3NF fordert zusätzlich keine transitiven Abhängigkeiten zwischen Nichtschlüssel-Attributen.',
    category: 'Datenbanken',
    repetitions: 0,
    easeFactor: 2.5,
    interval: 0
  }
];
