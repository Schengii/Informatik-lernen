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
  }
];
