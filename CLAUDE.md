# claude-docker-test

Testovací projekt demonstrující integraci Docker + Node.js + PostgreSQL.

## Tech Stack

- **Node.js** (Express) — REST API server, port 3000
- **PostgreSQL 16** — databáze běžící v Docker kontejneru, port 5432
- **Docker Compose** — orchestrace PostgreSQL kontejneru

## Architektura

```
localhost:3000  →  server.js (Express)  →  Docker: postgres:16  →  localhost:5432
```

PostgreSQL běží v Dockeru s persistentním volume. Node.js server běží lokálně a připojuje se na databázi přes `pg` klienta.

## Jak spustit

### 1. Spusť PostgreSQL v Dockeru

```bash
docker compose up -d
```

### 2. Nainstaluj závislosti

```bash
npm install
```

### 3. Nastav proměnné prostředí

```bash
cp .env.example .env
# Upravuj .env dle potřeby
```

### 4. Spusť vývojový server

```bash
npm run dev
```

## Příkazy

| Příkaz | Popis |
|--------|-------|
| `docker compose up -d` | Spustí PostgreSQL na pozadí |
| `docker compose down` | Zastaví a odstraní kontejnery |
| `docker compose logs db` | Zobrazí logy databáze |
| `npm run dev` | Spustí server s hot-reload (nodemon) |
| `npm start` | Spustí server bez hot-reload |

## API Endpointy

- `GET /health` — health check serveru
- `GET /api/test` — test připojení k databázi

## Troubleshooting

**Port 5432 je obsazený:**
```bash
docker compose down
sudo lsof -i :5432
```

**Nelze se připojit k DB:**
```bash
docker compose logs db
docker compose ps
```

**Reset databáze:**
```bash
docker compose down -v   # smaže i volume!
docker compose up -d
```
