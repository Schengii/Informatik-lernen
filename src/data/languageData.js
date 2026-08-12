export const PROGRAMMING_LANGUAGES = [
  {
    id: 'javascript',
    name: 'JavaScript (JS)',
    icon: '🟨',
    category: 'Web & Fullstack',
    difficulty: 'Einsteiger bis Senior',
    description: 'Die meistverbreitete Programmiersprache der Welt für interaktive Webseiten, Node.js Backends und Apps.',
    syntaxExample: `// Modernes JavaScript (ES6+)
const greet = (name) => {
  return \`Hallo \${name}, willkommen im Web!\`;
};
console.log(greet("Developer"));`,
    keyFeatures: ['Dynamische Typisierung', 'Asynchrones Async/Await', 'Standard auf allen Webbrowsern'],
    topics: [
      { title: 'Variablen & Funktionen', code: 'const x = 10;\nfunction test() { return x * 2; }' },
      { title: 'DOM Manipulation', code: 'document.querySelector("#btn").addEventListener("click", fn);' }
    ]
  },
  {
    id: 'typescript',
    name: 'TypeScript (TS)',
    icon: '🔷',
    category: 'Enterprise Web & Modern Dev',
    difficulty: 'Junior & Senior',
    description: 'Typisiertes Superset von JavaScript, das Compile-Zeit-Fehler verhindert und ideale Autovervollständigung bietet.',
    syntaxExample: `interface User {
  id: number;
  name: string;
  role: 'admin' | 'dev';
}

function getUserInfo(user: User): string {
  return \`User \${user.name} (\${user.role})\`;
}`,
    keyFeatures: ['Strikte statische Typen', 'Interfaces & Generics', 'Kompiliert zu sauberem JavaScript'],
    topics: [
      { title: 'Interfaces & Types', code: 'type ID = string | number;' },
      { title: 'Generics', code: 'function identity<T>(arg: T): T { return arg; }' }
    ]
  },
  {
    id: 'python',
    name: 'Python 3',
    icon: '🐍',
    category: 'Backend, Data & KI',
    difficulty: 'Einsteiger bis Senior',
    description: 'Leicht lesbare Sprache für Scripting, Webentwicklung (Django/FastAPI) und künstliche Intelligenz (AI/ML).',
    syntaxExample: `def begrüssung(name: str) -> str:
    return f"Hallo {name}, willkommen bei Python!"

print(begrüssung("Developer"))`,
    keyFeatures: ['Kompakte, saubere Syntax', 'Riesiges Ökosystem für Data Science & KI', 'Einfacher Einstieg'],
    topics: [
      { title: 'Variablen & Listen', code: 'daten = [1, 2, 3]\nprint(len(daten))' },
      { title: 'Dictionaries & Functions', code: 'user = {"name": "Alex"}' }
    ]
  },
  {
    id: 'java',
    name: 'Java & Spring Boot',
    icon: '☕',
    category: 'Enterprise & Microservices',
    difficulty: 'Azubi & Senior',
    description: 'Plattformunabhängige, objektorientierte Sprache für Enterprise-Systeme, Spring Boot APIs und Vaadin UIs.',
    syntaxExample: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hallo Java & Spring Boot!");
    }
}`,
    keyFeatures: ['Strikte Objektorientierung (OOP)', 'Java Virtual Machine (JVM)', 'Spring Boot Framework'],
    topics: [
      { title: 'Klassen & Objekte', code: 'public class Auto { private String marke; }' },
      { title: 'Spring REST Controller', code: '@RestController\npublic class ApiController {}' }
    ]
  },
  {
    id: 'csharp',
    name: 'C# / .NET Core',
    icon: '🎯',
    category: 'Enterprise & Game Dev',
    difficulty: 'Azubi & Senior',
    description: 'Microsofts moderne Programmiersprache für ASP.NET Core Web APIs, Desktop-Apps und Unity Game Development.',
    syntaxExample: `using System;

class Program {
    static void Main() {
        Console.WriteLine("Hallo C# & .NET!");
    }
}`,
    keyFeatures: ['Starke Typisierung & LINQ Queries', 'Cross-Platform .NET Core', 'Unity Engine Integration'],
    topics: [
      { title: 'LINQ Abfragen', code: 'var list = users.Where(u => u.IsActive);' }
    ]
  },
  {
    id: 'angular',
    name: 'Angular Framework',
    icon: '🅰️',
    category: 'Frontend Framework',
    difficulty: 'Junior & Senior',
    description: 'Googles TypeScript-basiertes Web-Framework für großskalierte Enterprise Single-Page Applications.',
    syntaxExample: `import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<h1>{{ title }}</h1>'
})
export class AppComponent {
  title = 'Hallo Angular!';
}`,
    keyFeatures: ['Dependency Injection', 'RxJS Observables', 'Zwei-Wege-Datenbindung (Two-Way Binding)'],
    topics: [
      { title: 'Components & Directives', code: '*ngIf="isLoggedIn"' }
    ]
  },
  {
    id: 'php',
    name: 'PHP 8 & Laravel',
    icon: '🐘',
    category: 'Backend Web Dev',
    difficulty: 'Einsteiger & Azubi',
    description: 'Die serverseitige Skriptsprache, die über 75% des modernen Webs (WordPress, Laravel, Symfony) antreibt.',
    syntaxExample: `<?php
function begrüssung(string $name): string {
    return "Hallo " . htmlspecialchars($name);
}
echo begrüssung("Dev");
?>`,
    keyFeatures: ['Einfaches Web-Hosting', 'Modernes PHP 8 JIT & Attributes', 'Laravel Framework'],
    topics: [
      { title: 'PDO Datenbanken', code: '$pdo = new PDO("mysql:host=localhost;dbname=test");' }
    ]
  },
  {
    id: 'cpp',
    name: 'C++',
    icon: '⚡',
    category: 'Systemnahe Programmierung',
    difficulty: 'Senior / Expert',
    description: 'Hochperformante, systemnahe Sprache für Betriebssysteme, Game Engines, Treiber und Hochfrequenz-Trading.',
    syntaxExample: `#include <iostream>

int main() {
    std::cout << "Hallo C++ Systemebene!" << std::endl;
    return 0;
}`,
    keyFeatures: ['Manuelles Speicher-Management (Pointers)', 'Maximale Ausführungsgeschwindigkeit', 'STL Bibliothek'],
    topics: [
      { title: 'Zeiger & Referenzen', code: 'int* ptr = &val;' }
    ]
  },
  {
    id: 'react',
    name: 'React.js',
    icon: '⚛️',
    category: 'Web UI Framework',
    difficulty: 'Junior & Senior',
    description: 'Das beliebteste UI-Framework von Meta für komponentenbasierte, deklarative Webanwendungen.',
    syntaxExample: `import React, { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}`,
    keyFeatures: ['Virtueller DOM', 'React Hooks', 'Riesiges Ökosystem'],
    topics: [
      { title: 'Hooks & State', code: 'const [state, setState] = useState();' }
    ]
  },
  {
    id: 'vite',
    name: 'Vite Build Tool',
    icon: '⚡',
    category: 'Build Tools & Bundler',
    difficulty: 'Junior & Senior',
    description: 'Das ultra-schnelle Build-Tool für moderne Frontend-Entwicklung mit nativen ES-Modulen und HMR.',
    syntaxExample: `// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});`,
    keyFeatures: ['Instant Server Start', 'Lightning Fast HMR', 'Optimierter Rollup Build'],
    topics: [
      { title: 'Vite Plugins', code: 'plugins: [react()]' }
    ]
  }
];
