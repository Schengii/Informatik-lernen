// `labId` (optional, additiv) verlinkt einen Roadmap-Schritt auf ein passendes interaktives
// Lab aus LAB_REGISTRY (siehe data/labRegistry.js) - vorher zeigte jeder Schritt nur an, ob
// er als Thema abgeschlossen wurde, ohne einen Weg dorthin anzubieten. Nicht jeder Schritt
// hat ein 1:1 passendes Lab (z. B. reines HTML/CSS); dort bleibt `labId` bewusst weg.
export const CAREER_ROADMAPS = [
  {
    id: 'fullstack',
    title: '🚀 Fullstack Web Developer Roadmap',
    subtitle: 'Vom ersten HTML-Tag bis zum skalierbaren Cloud-Deployment',
    color: 'var(--accent-primary)',
    steps: [
      { id: 'web_html_css', label: '1. HTML5 & CSS3 Grundlagen', category: 'Frontend' },
      { id: 'js_programming', label: '2. JavaScript (ES6+) & DOM', category: 'Frontend', labId: 'monaco_studio' },
      { id: 'sql_databases', label: '3. Relationale Datenbanken & SQL', category: 'Backend', labId: 'sql_joins' },
      { id: 'react_node', label: '4. React.js & Node.js REST APIs', category: 'Fullstack' },
      { id: 'cloud_deploy', label: '5. Docker & CI/CD Deployment', category: 'DevOps', labId: 'cicd_pipeline' }
    ]
  },
  {
    id: 'cybersecurity',
    title: '🛡️ Cybersecurity & Pentesting Roadmap',
    subtitle: 'Schütze Systeme vor OWASP Top 10 Angriffsvektoren',
    color: 'var(--accent-rose)',
    steps: [
      { id: 'it_basics', label: '1. Binärsystem & Hardware-Basics', category: 'Grundlagen', labId: 'cpu_architecture_lab' },
      { id: 'networking_osi', label: '2. Netzwerke & OSI 7-Schichten', category: 'Infrastruktur', labId: 'packet_sniffer' },
      { id: 'cli_linux', label: '3. Linux Terminal & Scripting', category: 'System', labId: 'linux_permissions_lab' },
      { id: 'it_security_advanced', label: '4. OWASP, SQLi & XSS Defense', category: 'Security', labId: 'owasp_exploit_lab' },
      { id: 'crypto_hashes', label: '5. Kryptographie & Zero Trust', category: 'Expert', labId: 'crypto_keygen_lab' }
    ]
  },
  {
    id: 'ai_data',
    title: '🤖 AI & Data Science Roadmap',
    subtitle: 'Entwickle intelligente KI-Agenten & RAG-Systeme',
    color: 'var(--accent-teal)',
    steps: [
      { id: 'python_basics', label: '1. Python 3 Syntax & Listen', category: 'Programming', labId: 'python_wasm' },
      { id: 'sql_data', label: '2. SQL & Vekordatenbanken', category: 'Data', labId: 'vector_search' },
      { id: 'ai_prompting', label: '3. Prompt Engineering & LLMs', category: 'AI', labId: 'ai' },
      { id: 'rag_architectures', label: '4. RAG-Systeme mit Vektor-Search', category: 'AI Architecture', labId: 'rag_ai' }
    ]
  }
];

export const SKILL_TREE_DATA = [
  {
    category: 'Tier 1: IT-Grundlagen',
    nodes: [
      { id: 'eva', title: 'EVA-Prinzip & Hardware', desc: 'Eingabe, Verarbeitung, Ausgabe & CPU Aufbau', xp: 50, req: null },
      { id: 'binary', title: 'Binärsystem & Zahlensysteme', desc: 'Dezimal, Binär, Hexadezimal & Bitshift', xp: 50, req: null },
      { id: 'networks', title: 'Netzwerk Grundlagen', desc: 'OSI-Modell, TCP/IP, DNS & IP-Adressen', xp: 75, req: null }
    ]
  },
  {
    category: 'Tier 2: Programmierung & Datenbanken',
    nodes: [
      { id: 'js_es6', title: 'JavaScript ES6+ & Async', desc: 'Promises, Async/Await, Array Methods', xp: 100, req: 'eva' },
      { id: 'sql_master', title: 'SQL & Relationale DBs', desc: 'JOINs, Subqueries, Normalisierung (1NF-3NF)', xp: 120, req: 'binary' },
      { id: 'python_core', title: 'Python Programming', desc: 'OOP, Datenstrukturen & Data Cleaning', xp: 100, req: 'binary' }
    ]
  },
  {
    category: 'Tier 3: Systemintegration & Cloud Native',
    nodes: [
      { id: 'subnetting', title: 'CIDR Subnetting & Routing', desc: 'Subnetzmasken, Netz-ID & Broadcast', xp: 150, req: 'networks' },
      { id: 'git_branching', title: 'Git Workflows & Merging', desc: 'Commits, Rebase, Branching & Conflict Resolution', xp: 150, req: 'js_es6' },
      { id: 'docker_k8s', title: 'Docker & Kubernetes', desc: 'Container, Pods, Deployments & Services', xp: 200, req: 'sql_master' }
    ]
  },
  {
    category: 'Tier 4: Enterprise Architecture & AI',
    nodes: [
      { id: 'microservices', title: 'Microservices & Event-Driven', desc: 'Apache Kafka, Circuit Breakers & REST/gRPC', xp: 250, req: 'docker_k8s' },
      { id: 'rag_ai', title: 'RAG & Vector AI Pipelines', desc: 'Embeddings, Vector DBs (Pinecone/Chroma)', xp: 300, req: 'python_core' }
    ]
  }
];

