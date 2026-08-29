/**
 * IHK Mündliches Fachgespräch & Prüfer-Simulator Engine (AO 2020)
 * Provides adaptive examiner personas, follow-up question trees, and scoring rubric.
 */

export const EXAMINER_PERSONAS = {
  architect: {
    id: 'architect',
    name: 'Dr. Martin Jansen',
    role: 'Technischer Prüfer & Chefarchitekt',
    focus: 'Softwarearchitektur, Clean Code, Design Patterns & Performance',
    avatarColor: '#3b82f6'
  },
  controller: {
    id: 'controller',
    name: 'Sabine Meier',
    role: 'Wirtschaftsprüferin & DSGVO-Beauftragte',
    focus: 'Wirtschaftlichkeit, Amortisation, ROI, DSGVO & Lizenzrecht',
    avatarColor: '#10b981'
  },
  sysadmin: {
    id: 'sysadmin',
    name: 'Klaus Weber',
    role: 'Praxisprüfer & DevOps/Security Lead',
    focus: 'IT-Sicherheit, Backup-Strategien, CI/CD, Container & Rollback',
    avatarColor: '#f59e0b'
  }
};

export const SAMPLE_EXAM_TOPICS = [
  {
    id: 'microservices_rest',
    title: 'Microservices & REST API Backend',
    profession: 'fiae',
    initialQuestion: 'Sie haben sich in Ihrem Projekt für eine Microservice-Architektur statt eines Monolithen entschieden. Wie haben Sie die Service-Grenzen definiert und wie handhaben Sie verteilte Transaktionen?',
    followUps: [
      {
        keyword: 'saga',
        question: 'Sehr gut, Sie erwähnten das Saga-Pattern. Bevorzugen Sie hier die Choreographie oder die Orchestrierung und warum?'
      },
      {
        keyword: 'acid',
        question: 'Wie stellen Sie die Datenkonsistenz sicher, wenn das CAP-Theorem besagt, dass Konsistenz und Verfügbarkeit bei Netzwerkpartitionen im Konflikt stehen?'
      },
      {
        keyword: 'default',
        question: 'Wie überwachen Sie die Latenz zwischen den Microservices im Produktivbetrieb (Distributed Tracing)?'
      }
    ]
  },
  {
    id: 'cloud_migration_fisi',
    title: 'Cloud-Migration & IT-Sicherheitskonzept',
    profession: 'fisi',
    initialQuestion: 'Wie haben Sie die Hochverfügbarkeit (SLA 99.9%) und die Notfall-Wiederherstellung (RTO und RPO) für die migrierten Server geplant?',
    followUps: [
      {
        keyword: 'backup',
        question: 'Welche 3-2-1 Backup-Strategie und welches Verschlüsselungsverfahren (AES-256 / KMS) haben Sie implementiert?'
      },
      {
        keyword: 'rto',
        question: 'Wenn RTO = 2 Stunden gefordert ist, wie testen Sie dieses Disaster-Recovery-Szenario regelmäßig?'
      },
      {
        keyword: 'default',
        question: 'Welche Maßnahmen gegen Ransomware und unbefugten Zugriff wurden auf Netzwerkebene (VPC, Zero Trust) ergriffen?'
      }
    ]
  }
];

/**
 * Generates the next adaptive follow-up question based on candidate's answer text
 */
export function determineNextQuestion(topic, answerText) {
  if (!topic || !topic.followUps) {
    return 'Können Sie eine konkrete Herausforderung während der Projektphase schildern und wie Sie diese gelöst haben?';
  }

  const lowerAnswer = (answerText || '').toLowerCase();
  for (const item of topic.followUps) {
    if (item.keyword !== 'default' && lowerAnswer.includes(item.keyword)) {
      return item.question;
    }
  }

  const defaultFollowUp = topic.followUps.find(f => f.keyword === 'default');
  return defaultFollowUp ? defaultFollowUp.question : topic.followUps[0].question;
}

/**
 * Calculates candidate oral exam scores and official German IHK Grade (1.0 to 6.0)
 */
export function evaluateOralExam({ techScore, methodScore, businessScore, presentationScore }) {
  // Weighted according to IHK AP2 Fachgespräch Rubric:
  // 40% Fachkompetenz, 25% Methodik, 20% Wirtschaftlichkeit & Recht, 15% Präsentation & Ausdruck
  const points = Math.min(100, Math.max(0, Math.round(
    techScore * 0.40 +
    methodScore * 0.25 +
    businessScore * 0.20 +
    presentationScore * 0.15
  )));

  let grade = 5;
  let gradeText = 'Mangelhaft';

  if (points >= 92) {
    grade = 1;
    gradeText = 'Sehr Gut';
  } else if (points >= 81) {
    grade = 2;
    gradeText = 'Gut';
  } else if (points >= 67) {
    grade = 3;
    gradeText = 'Befriedigend';
  } else if (points >= 50) {
    grade = 4;
    gradeText = 'Ausreichend';
  } else if (points >= 30) {
    grade = 5;
    gradeText = 'Mangelhaft';
  } else {
    grade = 6;
    gradeText = 'Ungenügend';
  }

  return {
    points,
    grade,
    gradeText,
    passed: points >= 50,
    feedback: points >= 80 
      ? 'Exzellente fachliche Tiefe, souveräne Argumentation und sichere Reflexion eigener Projektentscheidungen.'
      : points >= 50
      ? 'Solide Grundlagen vorhanden. Bei tiefergehenden Architekturfragen und Normen (z. B. DSGVO/SLA) empfiehlt sich weitere Vertiefung.'
      : 'Prüfungsziel leider verfehlt. Essenzielle Fachkonzepte und wirtschaftliche Zusammenhänge wurden nicht ausreichend beherrscht.'
  };
}
