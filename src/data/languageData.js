export const LANGUAGE_MODULES = [
  {
    id: 'python',
    name: 'Python Masterclass (W3Schools Style)',
    icon: '🐍',
    badge: 'Sehr beliebt',
    summary: 'Eine der vielseitigsten Sprachen für KI, Data Science, Webdev (Django/FastAPI) und Automatisierung.',
    topics: [
      {
        title: '1. Syntax, Datentypen & Variablen',
        desc: 'Python ist dynamisch typisiert und nutzt Einrückungen (Indentation) anstelle von geschweiften Klammern.',
        code: `# Variablen & Datentypen
x = 10          # int
pi = 3.14159    # float
name = "Dev"    # str
is_active = True# bool

print(f"Hallo {name}, x = {x}")`
      },
      {
        title: '2. Datenstrukturen: Lists, Tuples, Sets & Dicts',
        desc: 'Listen (veränderbar), Tuples (unveränderbar), Sets (eindeutig) und Dictionaries (Key-Value Paare).',
        code: `# List (geordnet, veränderbar)
fruits = ["Apfel", "Banane", "Kirsche"]
fruits.append("Orange")

# Dictionary (Key-Value)
user = {"name": "Alex", "role": "Admin", "level": 5}
print(user["name"]) # -> Alex`
      },
      {
        title: '3. Funktionen, Lambda & Exceptions',
        desc: 'Definiere modulare Funktionen mit def, anomyme Lambda-Funktionen und fange Fehler mit try-except ab.',
        code: `def calculate_tax(amount: float, rate: float = 0.19) -> float:
    return amount * rate

try:
    result = 100 / 0
except ZeroDivisionError as e:
    print("Fehler: Division durch Null ist nicht erlaubt!")`
      },
      {
        title: '4. Objektorientierung (OOP: Klassen & Vererbung)',
        desc: 'Erstelle Objekte mit __init__ Konstruktor, Methoden und Kapselung.',
        code: `class Hero:
    def __init__(self, name, hp):
        self.name = name
        self.hp = hp
        
    def attack(self):
        return f"{self.name} greift an!"

hero = Hero("Knight", 100)
print(hero.attack())`
      }
    ]
  },
  {
    id: 'javascript',
    name: 'JavaScript Modern ES6+ (W3Schools Style)',
    icon: '⚡',
    badge: 'Web Standard',
    summary: 'Die Sprache des Webs für dynamische Frontend-UIs und serverseitige Node.js Backends.',
    topics: [
      {
        title: '1. Variables (let / const) & Arrow Functions',
        desc: 'Verwende const für unveränderliche Referenzen und let für veränderliche Variablen. Arrow Functions verkürzen die Syntax.',
        code: `const multiply = (a, b) => a * b;
let score = 100;
score += 50;

console.log(\`Gesamtscore: \${score}\`);`
      },
      {
        title: '2. Modern Array Methods (map, filter, reduce)',
        desc: 'Funktionale Datenverarbeitung ohne explizite for-Schleifen.',
        code: `const numbers = [1, 2, 3, 4, 5, 6];

const evens = numbers.filter(n => n % 2 === 0);
const doubled = evens.map(n => n * 2);
const sum = numbers.reduce((acc, curr) => acc + curr, 0);`
      },
      {
        title: '3. Promises & Async/Await',
        desc: 'Asynchrone Operationen (HTTP Fetches) ohne Callback-Hell verarbeiten.',
        code: `async function fetchUserData(userId) {
  try {
    const res = await fetch(\`https://api.devgame.it/users/\${userId}\`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Fetch Fehler:", err);
  }
}`
      }
    ]
  },
  {
    id: 'typescript',
    name: 'TypeScript (Typisierte JS-Mastery)',
    icon: '🔷',
    badge: 'Enterprise Standard',
    summary: 'Erweitert JavaScript um statische Typisierung für skalierbare Großprojekte.',
    topics: [
      {
        title: '1. Interfaces, Types & Generics',
        desc: 'Definiere präzise Datenverträge für Objekte und erstelle wiederverwendbare generische Funktionen.',
        code: `interface User {
  id: number;
  username: string;
  email?: string; // Optional
}

function getFirstElement<T>(arr: T[]): T {
  return arr[0];
}`
      }
    ]
  },
  {
    id: 'java',
    name: 'Java (OOP Enterprise)',
    icon: '☕',
    badge: 'Klassiker',
    summary: 'Robuste, plattformunabhängige objektorientierte Sprache für Enterprise Backends & Android.',
    topics: [
      {
        title: '1. Klassen, Vererbung & Interfaces',
        desc: 'Strenge Typisierung und objektorientierte Prinzipien.',
        code: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hallo Java!");
    }
}`
      }
    ]
  }
];

export const PROGRAMMING_LANGUAGES = LANGUAGE_MODULES;
