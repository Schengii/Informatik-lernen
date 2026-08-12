export const PROGRAMMING_LANGUAGES = [
  {
    id: 'python',
    name: 'Python 3',
    icon: '🐍',
    category: 'Backend & Data Science',
    difficulty: 'Einsteiger & Azubis',
    description: 'Eine der beliebtesten und am leichtesten lesbaren Sprachen für Scripting, Webentwicklung und KI.',
    syntaxExample: `def begrüssung(name):
    return f"Hallo {name}, willkommen bei Python!"

print(begrüssung("Developer"))`,
    keyFeatures: ['Einfache Syntax ohne Semikolons', 'Starke Community für Data Science & KI', 'Umfangreiche Standardbibliothek'],
    topics: [
      { title: 'Variablen & Datentypen', code: 'x = 10\nname = "Alice"\nist_aktiv = True' },
      { title: 'Listen & Dictionaries', code: 'früchte = ["Apfel", "Banane"]\nuser = {"name": "Alex", "age": 25}' },
      { title: 'Funktionen & Modules', code: 'def quadrat(n):\n    return n * n' }
    ]
  },
  {
    id: 'java',
    name: 'Java / C#',
    icon: '☕',
    category: 'Enterprise & App-Entwicklung',
    difficulty: 'Azubi & Senior',
    description: 'Objektorientierte, typensichere Sprachen für Enterprise-Software, Android-Apps und backend Systeme.',
    syntaxExample: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hallo Java!");
    }
}`,
    keyFeatures: ['Strikte Objektorientierung (OOP)', 'Plattformunabhängig (JVM)', 'Starke Typisierung'],
    topics: [
      { title: 'Klassen & Objekte', code: 'public class Auto {\n    private String marke;\n}' },
      { title: 'Vererbung & Schnittstellen', code: 'public class Hund extends Tier implements Lautbar {}' }
    ]
  },
  {
    id: 'react',
    name: 'React & Modern Frontend',
    icon: '⚛️',
    category: 'Web & UI Entwicklung',
    difficulty: 'Junior & Senior',
    description: 'Das weltweit meistgenutzte JavaScript-Framework zum Bauen von schnellen, komponentenbasieren Web-Apps.',
    syntaxExample: `import React, { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}`,
    keyFeatures: ['Komponentenbasierte Architektur', 'Virtueller DOM für maximale Performance', 'Reaktives State-Management'],
    topics: [
      { title: 'JSX & Props', code: 'function UserCard({ name }) {\n  return <h2>{name}</h2>;\n}' },
      { title: 'State & Hooks', code: 'const [data, setData] = useState(null);' }
    ]
  },
  {
    id: 'nodejs',
    name: 'Node.js & Express APIs',
    icon: '🟢',
    category: 'Backend & REST APIs',
    difficulty: 'Azubi & Senior',
    description: 'Führe JavaScript serverseitig aus und erstelle hochperformante REST-APIs und Serverdienste.',
    syntaxExample: `import express from 'express';
const app = express();

app.get('/api/status', (req, res) => {
  res.json({ status: 'online' });
});

app.listen(3000);`,
    keyFeatures: ['Asynchrones I/O-Modell', 'npm Ökosystem', 'Gleiche Sprache in Frontend & Backend'],
    topics: [
      { title: 'REST API Endpunkte', code: 'app.post("/api/data", (req, res) => {...})' },
      { title: 'Middleware & Auth', code: 'app.use(express.json());' }
    ]
  }
];
