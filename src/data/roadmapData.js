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
