export const DOCKER_MODULES = [
  {
    id: 'dockerfile',
    title: '1. Dockerfile Erstellung',
    desc: 'Lerne wie man ein sauberes Multi-Stage Dockerfile für Node.js oder React-Anwendungen schreibt.',
    snippet: `FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]`
  },
  {
    id: 'compose',
    title: '2. Docker Compose (Multi-Container)',
    desc: 'Orchestriere mehrere Container (Frontend, Node.js API, PostgreSQL) mit einer einzigen docker-compose.yml Datei.',
    snippet: `version: '3.8'
services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DB_HOST=db
  db:
    image: postgres:15
    environment:
      POSTGRES_PASSWORD: secretpassword
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:`
  }
];
