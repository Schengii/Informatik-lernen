/**
 * Dockerfile Multi-Stage Optimizer & Security Linter Engine
 * Analyzes Dockerfile instructions, layer caching, security antipatterns, and generates optimized multi-stage builds.
 */

export const SAMPLE_DOCKERFILES = [
  {
    id: 'node_monolith',
    title: 'Node.js Express API (Unoptimiert, 1.3 GB)',
    language: 'nodejs',
    raw: `FROM node:20
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]`
  },
  {
    id: 'golang_fat',
    title: 'Go Microservice (Großes Build-Image, 850 MB)',
    language: 'golang',
    raw: `FROM golang:1.22
WORKDIR /src
COPY . .
RUN go build -o server main.go
EXPOSE 8080
CMD ["./server"]`
  },
  {
    id: 'python_insecure',
    title: 'Python FastAPI (Root User & Kein Cache-Split, 950 MB)',
    language: 'python',
    raw: `FROM python:3.11
WORKDIR /code
COPY requirements.txt .
COPY . .
RUN pip install -r requirements.txt
EXPOSE 8000
CMD ["python", "main.py"]`
  }
];

/**
 * Lints a Dockerfile for security and caching issues
 */
export function lintDockerfile(dockerfileText) {
  const lines = (dockerfileText || '').split('\n').map(l => l.trim()).filter(Boolean);
  const issues = [];
  let isMultiStage = false;
  let hasNonRootUser = false;
  let hasLatestTag = false;
  let copyAllBeforeInstall = false;

  let seenCopyAll = false;

  lines.forEach((line, idx) => {
    const lineNum = idx + 1;

    // Check for Multi-Stage
    if (/^FROM\s+.*\s+AS\s+/i.test(line)) {
      isMultiStage = true;
    }

    // Check for latest tag or unpinned versions
    if (/^FROM\s+[^:]+(:latest)?\s*$/i.test(line) && !line.includes('AS')) {
      hasLatestTag = true;
      issues.push({
        line: lineNum,
        severity: 'WARNING',
        code: 'UNPINNED_IMAGE',
        message: 'Base Image nutzt :latest oder keinen festen Versions-Tag. Kann zu unvorhersehbaren Breaking Changes führen.'
      });
    }

    // Check for USER instruction
    if (/^USER\s+/i.test(line)) {
      hasNonRootUser = true;
    }

    // Check layer caching antipattern (COPY . . before npm/pip install)
    if (/^COPY\s+\.\s+\./i.test(line)) {
      seenCopyAll = true;
    }

    if (seenCopyAll && (/RUN\s+(npm\s+install|pip\s+install|go\s+mod\s+download)/i.test(line))) {
      copyAllBeforeInstall = true;
      issues.push({
        line: lineNum,
        severity: 'CRITICAL',
        code: 'INEFFICIENT_LAYER_CACHE',
        message: 'Gesamter Quellcode wird vor den Abhängigkeiten kopiert. Jeder Quellcode-Change invalidiert den gesamten Dependency-Cache.'
      });
    }

    // Check for curl | sh or unsafe apt-get
    if (/RUN\s+.*apt-get\s+install/i.test(line) && !line.includes('rm -rf /var/lib/apt/lists/*')) {
      issues.push({
        line: lineNum,
        severity: 'INFO',
        code: 'APT_CACHE_NOT_CLEANED',
        message: 'Apt-Cache wird nach apt-get install nicht bereinigt (vergrößert das Image unnötig).'
      });
    }
  });

  if (!hasNonRootUser) {
    issues.push({
      line: 0,
      severity: 'WARNING',
      code: 'ROOT_USER',
      message: 'Container läuft standardmäßig als Root (UID 0). Empfehlung: Eigenen non-root User (z.B. USER node / nonroot) anlegen.'
    });
  }

  // Calculate Security & Efficiency Score (0 - 100)
  let score = 100;
  issues.forEach(iss => {
    if (iss.severity === 'CRITICAL') score -= 30;
    else if (iss.severity === 'WARNING') score -= 15;
    else if (iss.severity === 'INFO') score -= 5;
  });

  score = Math.max(10, Math.min(100, score));

  return {
    isMultiStage,
    hasNonRootUser,
    hasLatestTag,
    copyAllBeforeInstall,
    issues,
    score,
    rating: score >= 85 ? 'EXCELLENT' : score >= 60 ? 'ACCEPTABLE' : 'POOR'
  };
}

/**
 * Generates an optimized Multi-Stage Dockerfile for a given language template
 */
export function generateMultiStageOptimized(language = 'nodejs') {
  switch (language) {
    case 'golang':
      return {
        optimizedDockerfile: `# --- Build Stage ---
FROM golang:1.22-alpine AS builder
WORKDIR /src
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-s -w" -o /app/server main.go

# --- Production Distroless Stage ---
FROM gcr.io/distroless/static-debian12:nonroot
WORKDIR /app
COPY --from=builder /app/server .
USER nonroot:nonroot
EXPOSE 8080
ENTRYPOINT ["/app/server"]`,
        originalSizeMb: 850,
        optimizedSizeMb: 18,
        savingsPercent: 97.8
      };

    case 'python':
      return {
        optimizedDockerfile: `# --- Build Stage ---
FROM python:3.11-slim AS builder
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends gcc libpq-dev && rm -rf /var/lib/apt/lists/*
COPY requirements.txt .
RUN pip install --no-cache-dir --user -r requirements.txt

# --- Runtime Stage ---
FROM python:3.11-slim AS runner
WORKDIR /app
RUN useradd -m -u 1001 appuser
COPY --from=builder /root/.local /home/appuser/.local
COPY --chown=appuser:appuser . .
USER appuser
ENV PATH=/home/appuser/.local/bin:$PATH
EXPOSE 8000
CMD ["python", "main.py"]`,
        originalSizeMb: 950,
        optimizedSizeMb: 115,
        savingsPercent: 87.9
      };

    case 'nodejs':
    default:
      return {
        optimizedDockerfile: `# --- Build Stage ---
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build || true

# --- Production Runner Stage ---
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist
USER node
EXPOSE 3000
CMD ["node", "dist/index.js"]`,
        originalSizeMb: 1300,
        optimizedSizeMb: 85,
        savingsPercent: 93.5
      };
  }
}
