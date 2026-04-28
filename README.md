# claude-docker-test

Testovací projekt: Express API server s PostgreSQL databází v Dockeru.

## Požadavky

- [Node.js](https://nodejs.org/) v18+
- [Docker](https://www.docker.com/) s Docker Compose
- [git](https://git-scm.com/)

## Instalace

```bash
git clone https://github.com/Melvornz/claude-docker-test.git
cd claude-docker-test
cp .env.example .env
npm install
```

## Spuštění

```bash
# 1. Spusť databázi
docker compose up -d

# 2. Spusť server
npm run dev
```

Server běží na `http://localhost:3000`.

## API

### GET /health

Ověří, že server běží.

```bash
curl http://localhost:3000/health
```

```json
{ "status": "ok", "timestamp": "2026-04-28T..." }
```

### GET /api/test

Ověří připojení k PostgreSQL databázi.

```bash
curl http://localhost:3000/api/test
```

```json
{
  "status": "ok",
  "database": "connected",
  "current_time": "2026-04-28T...",
  "pg_version": "PostgreSQL 16.x ..."
}
```

## Zastavení

```bash
docker compose down
```
