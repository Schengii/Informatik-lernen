// Nur die Einsteiger-Kategorie ("ihk_basics") trägt bisher eine englische Übersetzung
// (`en`-Unterobjekt) - erster i18n-Content-Pilot, siehe utils/i18n.js Header-Kommentar.
// Die zwei fortgeschritteneren Kategorien (ai_trends, cloud_devops) bleiben für diesen
// Piloten bewusst Deutsch, genau wie die meisten der 100+ Labs.
export const QUIZ_ARENA_CATEGORIES = [
  {
    id: 'ai_trends',
    title: '🤖 KI & LLM Trends 2026',
    difficulty: 'Senior / Expert',
    questions: [
      {
        q: 'Was bewirkt RAG (Retrieval-Augmented Generation) bei KI-Sprachmodellen?',
        options: [
          'Es beschleunigt die Grafikkarte beim Training.',
          'Es durchsucht externe Datenbanken nach Fakten, um Halluzinationen zu verhindern.',
          'Es löscht den Speicher des Sprachmodells.',
          'Es übersetzt Python-Code automatisch in C++.'
        ],
        correct: 1,
        explanation: 'RAG holt relevante Dokumente aus Vektordatenbanken und übergibt sie als Kontext an das LLM.'
      },
      {
        q: 'Was zeichnet ein "AI Agent" System aus?',
        options: [
          'Es kann selbstständig Ziele planen, Werkzeuge (Tools/APIs) nutzen und Aufgaben ausführen.',
          'Es antwortet nur mit Ja oder Nein.',
          'Es benötigt keine Grafikkarte.',
          'Es speichert Daten nur im Arbeitsspeicher.'
        ],
        correct: 0,
        explanation: 'AI Agenten nutzen LLMs als Gehirn, um autonom Schleifen zu planen und externe APIs aufzurufen.'
      }
    ]
  },
  {
    id: 'cloud_devops',
    title: '☁️ Cloud, Kubernetes & DevOps',
    difficulty: 'Azubi & Senior',
    questions: [
      {
        q: 'Welche Aufgabe erfüllt Kubernetes (K8s)?',
        options: [
          'Es ist eine Datenbank für SQL.',
          'Es ist ein Bildbearbeitungsprogramm.',
          'Es ist ein System zur automatisierten Orchestrierung und Skalierung von Docker-Containern.',
          'Es ist eine Programmiersprache.'
        ],
        correct: 2,
        explanation: 'Kubernetes steuert die Bereitstellung, Skalierung und Verwaltung von Container-Anwendungen.'
      }
    ]
  },
  {
    id: 'ihk_basics',
    title: '🌱 Informatik Grundwissen & IHK Basics',
    difficulty: 'Einsteiger & Azubis',
    questions: [
      {
        q: 'Was ist der Unterschied zwischen RAM und SSD?',
        options: [
          'RAM speichert Daten dauerhaft, SSD ist flüchtig.',
          'RAM ist der flüchtige schnelle Arbeitsspeicher, SSD speichert Daten dauerhaft.',
          'Beide Speicher sind identisch.',
          'SSD ist langsamer als ein USB-Stick.'
        ],
        correct: 1,
        explanation: 'RAM verliert beim Ausschalten alle Daten, während eine SSD Daten dauerhaft sichert.'
      }
    ],
    en: {
      title: '🌱 Computer Science Basics & IHK Fundamentals',
      difficulty: 'Beginner & Apprentices',
      questions: [
        {
          q: 'What is the difference between RAM and an SSD?',
          options: [
            'RAM stores data permanently, an SSD is volatile.',
            'RAM is the fast, volatile main memory, an SSD stores data permanently.',
            'Both types of storage are identical.',
            'An SSD is slower than a USB stick.'
          ],
          correct: 1,
          explanation: 'RAM loses all data when powered off, while an SSD saves data permanently.'
        }
      ]
    }
  }
];

export function getLocalizedQuizCategory(category, lang) {
  if (lang !== 'en' || !category.en) return category;
  return { ...category, ...category.en };
}
