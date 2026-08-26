import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';
import { useTranslation } from '../../utils/i18n';

// Jeder Guide trägt seine englische Übersetzung im `en`-Feld, analog zum bereits
// bestehenden Muster in data/userProfiles.js (siehe getLocalizedRole dort). Das ist der
// erste von mehreren geplanten i18n-Content-Piloten (siehe README-Changelog) - bewusst
// mit dem Einsteiger-Bereich begonnen, weil das der erste Berührungspunkt für
// nicht-deutschsprachige Nutzer:innen ist.
export const ANFAENGER_GUIDES = [
  {
    id: 'eva_prinzip',
    title: '1. Das EVA-Prinzip: Wie funktioniert ein Computer?',
    icon: '💻',
    category: 'Grundlagen',
    content: `Jeder Computer auf der Welt – egal ob Smartphone, Laptop oder Supercomputer – arbeitet nach demselben Grundprinzip: dem **EVA-Prinzip**:

1. **E**ingabe: Informationen werden in den PC eingegeben (z.B. Tastatur, Maus, Touchscreen, Mikrofon).
2. **V**erarbeitung: Die **CPU (Prozessor)** verarbeitet die Daten im Arbeitsspeicher (RAM) anhand von Befehlen.
3. **A**usgabe: Das Ergebnis wird ausgegeben (z.B. Bildschirm, Lautsprecher, Drucker).`,
    example: 'Beispiel: Du tippst den Buchstaben "A" auf der Tastatur (Eingabe), die CPU wandelt die Taste in den Binärcode 01000001 um (Verarbeitung) und zeigt den Buchstaben "A" auf deinem Monitor an (Ausgabe).',
    en: {
      title: '1. The EVA Principle: How does a computer work?',
      category: 'Fundamentals',
      content: `Every computer in the world - whether smartphone, laptop or supercomputer - works on the same basic principle: the **EVA principle** (Input-Processing-Output):

1. **I**nput: Information is entered into the PC (e.g. keyboard, mouse, touchscreen, microphone).
2. **P**rocessing: The **CPU (processor)** processes the data in main memory (RAM) based on instructions.
3. **O**utput: The result is output (e.g. screen, speakers, printer).`,
      example: 'Example: You type the letter "A" on the keyboard (input), the CPU converts the key into the binary code 01000001 (processing) and displays the letter "A" on your monitor (output).'
    }
  },
  {
    id: 'cpu_brain',
    title: '2. Das Gehirn des PCs: Wie denkt die CPU?',
    icon: '🧠',
    category: 'Hardware',
    content: `Die **CPU (Central Processing Unit)** ist das Rechenzentrum des Computers. Sie führt Milliarden von Befehlen pro Sekunde aus!

Sie besteht im Wesentlichen aus:
- **ALU (Arithmetic Logic Unit)**: Das Rechenwerk für mathematische Plus/Minus-Rechnungen und Vergleiche.
- **Steuerwerk (Control Unit)**: Holt Befehle aus dem Arbeitsspeicher und verteilt Aufgaben.
- **Register**: Ultra-schnelle Mikrospeicher direkt in der CPU.
- **Taktfrequenz (GHz)**: Gibt an, wie viele Milliarden Arbeitsschritte pro Sekunde ausgeführt werden (z.B. 3,5 GHz = 3,5 Milliarden Schritte/Sekunde).`,
    example: 'Stell dir die CPU wie den Chefkoch in einer Küche vor: Das Steuerwerk ist der Koch, die Register sind das Schneidebrett und der RAM ist der Kühlschrank!',
    en: {
      title: '2. The brain of the PC: How does the CPU think?',
      category: 'Hardware',
      content: `The **CPU (Central Processing Unit)** is the computer's computing center. It executes billions of instructions per second!

It essentially consists of:
- **ALU (Arithmetic Logic Unit)**: The unit for mathematical addition/subtraction and comparisons.
- **Control Unit**: Fetches instructions from main memory and distributes tasks.
- **Registers**: Ultra-fast micro-storage directly inside the CPU.
- **Clock speed (GHz)**: Indicates how many billion steps are executed per second (e.g. 3.5 GHz = 3.5 billion steps/second).`,
      example: 'Think of the CPU like the head chef in a kitchen: the control unit is the chef, the registers are the cutting board, and the RAM is the fridge!'
    }
  },
  {
    id: 'binary_system',
    title: '3. Die Sprache der Computer: Bits, Bytes & Binärsystem',
    icon: '🔢',
    category: 'Daten & Logik',
    content: `Computer kennen im Grunde nur zwei Zustände: **Strom an (1)** oder **Strom aus (0)**.

- **Bit**: Die kleinste Informationseinheit (entweder 0 oder 1).
- **Byte**: 8 Bits zusammen ergeben 1 Byte (z.B. 01000001). Ein Byte kann 256 verschiedene Werte darstellen (2^8 = 256).
- **Kilobyte (KB)**: ca. 1.000 Bytes (ein kurzer Text).
- **Megabyte (MB)**: ca. 1.000 KB (ein Foto oder MP3-Song).
- **Gigabyte (GB)**: ca. 1.000 MB (ein Spielfilm).
- **Terabyte (TB)**: ca. 1.000 GB (eine große Festplatte).`,
    example: 'Der Buchstabe "A" ist im Computer die Zahl 65, und als Binärcode geschrieben 01000001!',
    en: {
      title: '3. The language of computers: bits, bytes & the binary system',
      category: 'Data & Logic',
      content: `Computers fundamentally know only two states: **power on (1)** or **power off (0)**.

- **Bit**: The smallest unit of information (either 0 or 1).
- **Byte**: 8 bits together make 1 byte (e.g. 01000001). A byte can represent 256 different values (2^8 = 256).
- **Kilobyte (KB)**: about 1,000 bytes (a short text).
- **Megabyte (MB)**: about 1,000 KB (a photo or MP3 song).
- **Gigabyte (GB)**: about 1,000 MB (a movie).
- **Terabyte (TB)**: about 1,000 GB (a large hard drive).`,
      example: 'The letter "A" is the number 65 inside a computer, written as the binary code 01000001!'
    }
  },
  {
    id: 'internet_dns',
    title: '4. Wie funktioniert das Internet & DNS?',
    icon: '🌐',
    category: 'Netzwerke',
    content: `Das Internet ist ein riesiges weltweites Netzwerk von zusammenhängenden Computern.

- **IP-Adresse**: Jeder Computer im Internet hat eine eindeutige Hausnummer (z.B. 142.250.185.206).
- **DNS (Domain Name System)**: Weil sich Menschen Zahlen schwer merken können, übersetzt das DNS Namen wie "google.de" in die richtige IP-Adresse.
- **Router**: Das digitale Postamt, das Datenpakete durch das Netzwerk an ihr Ziel leitet.`,
    example: 'DNS ist das Telefonbuch des Internets: Du suchst nach "Peter", und das Telefonbuch gibt dir seine Telefonnummer!',
    en: {
      title: '4. How does the Internet & DNS work?',
      category: 'Networks',
      content: `The Internet is a huge worldwide network of connected computers.

- **IP address**: Every computer on the Internet has a unique house number (e.g. 142.250.185.206).
- **DNS (Domain Name System)**: Because people find numbers hard to remember, DNS translates names like "google.com" into the correct IP address.
- **Router**: The digital post office that routes data packets through the network to their destination.`,
      example: 'DNS is the phone book of the Internet: you look up "Peter", and the phone book gives you his phone number!'
    }
  }
];

function getLocalizedGuide(guide, lang) {
  if (lang !== 'en' || !guide.en) return guide;
  return { ...guide, ...guide.en };
}

export default function AnfaengerGuideHub() {
  const { t, lang } = useTranslation();
  const [selectedId, setSelectedId] = useState(ANFAENGER_GUIDES[0].id);

  const activeGuide = getLocalizedGuide(
    ANFAENGER_GUIDES.find(g => g.id === selectedId) || ANFAENGER_GUIDES[0],
    lang
  );

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '60px' }}>
      <div className="glass-panel" style={{ padding: '32px', marginBottom: '24px', border: '2px solid var(--accent-emerald)' }}>
        <span className="badge badge-emerald" style={{ marginBottom: '10px' }}>
          🌱 {t('beginner_guide_badge')}
        </span>
        <h1 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '8px', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <BookOpen size={32} style={{ color: 'var(--accent-emerald)' }} /> {t('beginner_guide_heading')}
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
          {t('beginner_guide_subheading')}
        </p>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', overflowX: 'auto' }}>
        {ANFAENGER_GUIDES.map((g) => {
          const localized = getLocalizedGuide(g, lang);
          return (
            <button
              key={g.id}
              onClick={() => setSelectedId(g.id)}
              style={{
                minHeight: '48px',
                padding: '10px 20px',
                borderRadius: 'var(--radius-md)',
                fontWeight: '700',
                fontSize: '0.95rem',
                background: selectedId === g.id ? 'var(--accent-emerald)' : 'var(--bg-card)',
                color: selectedId === g.id ? '#ffffff' : 'var(--text-main)',
                border: selectedId === g.id ? '2px solid var(--accent-emerald)' : '2px solid var(--border-color)',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {g.icon} {localized.title}
            </button>
          );
        })}
      </div>

      <div className="glass-panel" style={{ padding: '32px' }}>
        <span className="badge badge-indigo" style={{ marginBottom: '12px' }}>{activeGuide.category}</span>
        <h2 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '16px', color: 'var(--text-main)' }}>
          {activeGuide.icon} {activeGuide.title}
        </h2>

        <div style={{ whiteSpace: 'pre-line', fontSize: '1.05rem', lineHeight: '1.7', color: 'var(--text-main)', marginBottom: '24px' }}>
          {activeGuide.content}
        </div>

        <div style={{ background: 'var(--bg-tertiary)', padding: '20px', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--accent-teal)' }}>
          <strong style={{ color: 'var(--accent-teal)', fontSize: '0.95rem', display: 'block', marginBottom: '6px' }}>💡 {t('beginner_guide_example_label')}</strong>
          <p style={{ margin: 0, fontSize: '0.98rem', color: 'var(--text-main)', lineHeight: '1.6' }}>
            {activeGuide.example}
          </p>
        </div>
      </div>
    </div>
  );
}
