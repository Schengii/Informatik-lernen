export const AI_BUSINESS_MODULES = [
  {
    id: 'prompt_templates',
    title: '1. Business & Marketing Prompt Templates',
    category: 'AI Efficiency',
    desc: 'Erstelle professionelle Marketing-Texte, E-Mails, Zusammenfassungen und Strategiepapiere mit strukturierten Prompts.',
    promptTemplate: `Rolle: Senior Marketing Strategist
Kontext: Neue SaaS-App für IT-Entwickler
Aufgabe: Erstelle einen 3-stufigen E-Mail-Funnel für Kaltakquise.
Format: Überschrift, Betreffzeile, Haupttext, Call-to-Action (CTA).`,
    bestPractice: 'Kombiniere immer Rolle + Kontext + konkrete Aufgabe + Ausgabeformat.'
  },
  {
    id: 'deep_learning',
    title: '2. Deep Learning & Neuronale Netze (Coursera-Inspired)',
    category: 'AI Engineering',
    desc: 'Verstehe die Funktionsweise von künstlichen neuronalen Netzen, Layer (Input, Hidden, Output), Activation Functions (ReLU, Sigmoid) und Backpropagation.',
    promptTemplate: `# TensorFlow / PyTorch Konzept-Beispiel
import torch
import torch.nn as nn

class SimpleNeuralNet(nn.Module):
    def __init__(self):
        super().__init__()
        self.fc1 = nn.Linear(10, 64)
        self.relu = nn.ReLU()
        self.fc2 = nn.Linear(64, 1)
    def forward(self, x):
        return self.fc2(self.relu(self.fc1(x)))`,
    bestPractice: 'Neuronale Netze lernen durch Minimierung einer Loss-Funktion mittels Gradient Descent.'
  }
];
