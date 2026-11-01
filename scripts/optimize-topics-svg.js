import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const topicsDir = path.resolve(__dirname, '../src/assets/topics');

const DESCRIPTIONS = {
  'box-model.svg': 'Schematische Darstellung der Schichten: Äußerer Rand margin, Rahmen border, Innenabstand padding und innerster Block content.',
  'break-even.svg': 'Koordinatensystem mit Stückzahl auf der X-Achse und Kosten bzw. Erlös in Euro auf der Y-Achse. Der Schnittpunkt markiert die Gewinnschwelle bei 600 Stück.',
  'event-loop.svg': 'Ablaufdiagramm mit Call Stack für synchrone Funktionen, Web APIs im Hintergrund, Microtask Queue für Promises und Task Queue für Timer.',
  'git-bereiche.svg': 'Vierstufiger Arbeitsablauf: Working Tree per git add zur Staging Area, per git commit ins Local Repository und per git push ins Remote Repository.',
  'http-anfrage.svg': 'Strukturierter Aufbau eines HTTP-Request mit Methode GET, Pfad, Request-Headern und Body sowie die dazugehörige HTTP 200 OK Response.',
  'hybride-verschluesselung.svg': 'Kombination aus asymmetrischem Schlüsselaustausch per RSA/ECC Public Key und schneller symmetrischer AES-Verschlüsselung der Nutzdaten.',
  'hypervisor-container.svg': 'Gegenüberstellung: Typ-1 Hypervisor auf Bare-Metal, Typ-2 Hypervisor auf Host-Betriebssystem und schlanke Container mit geteiltem Host-Kernel.',
  'js-wert-referenz.svg': 'Speichermodell: Primitive Datentypen werden als Werte auf dem Stack kopiert, während Referenztypen wie Objekte und Arrays als Zeiger auf den Heap verweisen.',
  'netzplan.svg': 'Netzplantechnik mit 6 Vorgangsknoten, frühesten und spätesten Anfangs- und Endzeitpunkten, Pufferzeiten und dem rot hervorgehobenen kritischen Pfad.',
  'neuron.svg': 'Mathematisches Modell eines künstlichen Neurons: Eingabevektor x multipliziert mit Gewichten w, Addition des Bias b und Auswertung durch die Aktivierungsfunktion.',
  'normalisierung.svg': 'Relationales Datenbankschema nach der Normalisierung mit Primärschlüsseln, Fremdschlüsseln und referentieller Integrität zwischen Ort, Kunde, Rechnung und Position.',
  'osi-modell.svg': '7 Schichten des ISO/OSI-Referenzmodells von Bitübertragung bis Anwendungsschicht mit Zuordnung zu den 4 Schichten des TCP/IP-Modells und Protokollen.',
  'python-sammlungen.svg': 'Matrix-Vergleich der 4 Standard-Datentypen in Python: List, Tuple, Set und Dict nach Ordnung, Mutierbarkeit und Duplikaten.',
  'raid-level.svg': 'Visuelle Gegenüberstellung der Festplattenaufteilung: RAID 0 mit Block-Striping, RAID 1 mit Spiegelung, RAID 5 mit rotierender Parität und RAID 10 als Kombination.',
  'schutzziele.svg': 'Die CIA-Triade der IT-Sicherheit: Dreieck aus Vertraulichkeit (Confidentiality), Integrität (Integrity) und Verfügbarkeit (Availability).',
  'sozialversicherung.svg': 'Die fünf gesetzlichen Säulen in Deutschland: Kranken-, Pflege-, Renten-, Arbeitslosen- und Unfallversicherung mit aktuellen Beitragssätzen und Arbeitgeberanteilen.',
  'sql-injection.svg': 'Demonstration einer SQL-Injektion: Ungefilterte Benutzereingaben verändern die logische Abfragestruktur und umgehen Authentifizierungsprüfungen.',
  'sql-joins.svg': 'Venn-Diagramme zur Veranschaulichung relationaler Mengenoperationen: Inner Join, Left Join, Right Join und Full Outer Join.',
  'struktogramm.svg': 'DIN 66261 Nassi-Shneiderman Diagramm mit sequentiellen Anweisungen, Zählschleife und Verzweigung zur Ermittlung des Maximums.',
  'subnetting.svg': 'Binäre Adressaufteilung einer IPv4-Adresse in Netzanteil, Subnetzanteil und Hostanteil mit variabler Subnetzmaske (VLSM).',
  'testpyramide.svg': 'Dreistufige Teststrategie nach Mike Cohn: Viele schnelle Unit-Tests an der Basis, Integrationstests in der Mitte und wenige End-to-End-Tests an der Spitze.',
  'uml-klassendiagramm.svg': 'Objektorientierter Klassenentwurf mit Attributen, Methoden, Vererbungsbeziehungen, Generalisierung und Assoziationskardinalitäten.',
  'utf8-kodierung.svg': 'Binäres Bytemuster und Bitverteilung nach RFC 3629 für ASCII (1 Byte), Umlaute (2 Byte), Währungssymbole (3 Byte) und Emojis (4 Byte).',
  'von-neumann.svg': 'Klassische Rechnerarchitektur nach John von Neumann: Zentraler Speicher, Steuerwerk, Rechenwerk, Ein-/Ausgabeeinheiten und gemeinsamer Bus.',
  'zahlensysteme.svg': 'Gegenüberstellung und Umrechnung zwischen Dualsystem (Basis 2), Hexadezimalsystem (Basis 16) und Dezimalsystem (Basis 10).'
};

const files = fs.readdirSync(topicsDir).filter((f) => f.endsWith('.svg'));
console.log(`Verarbeite ${files.length} SVGs in ${topicsDir}...`);

for (const file of files) {
  const filePath = path.join(topicsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Prüfen und Ergänzen von aria-labelledby="t d"
  content = content.replace(/aria-labelledby="t"/g, 'aria-labelledby="t d"');

  // Prüfen und Ergänzen von <desc id="d">
  const desc = DESCRIPTIONS[file];
  if (desc && !content.includes('<desc id="d">')) {
    content = content.replace(/(<title id="t">.*?<\/title>)/s, `$1\n  <desc id="d">${desc}</desc>`);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✓ ${file}: Barrierefreiheit ergänzt (title + desc + aria-labelledby="t d")`);
}
console.log('\nAlle 25 SVGs erfolgreich aktualisiert.');
