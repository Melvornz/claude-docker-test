# claude-docker-test — Full-stack TODO App

Full-stack TODO aplikace: Express API + PostgreSQL v Dockeru + Vanilla JS frontend.

## Požadavky

- [Node.js](https://nodejs.org/) v18+
- [Docker](https://www.docker.com/) s Docker Compose
- [git](https://git-scm.com/)

## Instalace a spuštění

```bash
git clone https://github.com/Melvornz/claude-docker-test.git
cd claude-docker-test
cp .env.example .env
npm install

# Spusť databázi (automaticky vytvoří tabulku todos)
docker compose up -d

# Spusť vývojový server
npm run dev
```

Otevři prohlížeč na `http://localhost:3000`.

## Použití frontendu

- Zadej název úkolu do pole a klikni **Přidat**
- Klikni na checkbox pro označení úkolu jako dokončeného (text se přeškrtne)
- Klikni na **×** pro smazání úkolu

## API Reference

### GET /health

```bash
curl http://localhost:3000/health
# {"status":"ok","timestamp":"2026-04-28T..."}
```

### GET /api/todos

Vrátí všechny todos seřazené od nejnovějšího.

```bash
curl http://localhost:3000/api/todos
```

```json
[
  {"id": 1, "title": "Nakoupit mleko", "completed": false, "created_at": "..."}
]
```

### POST /api/todos

Vytvoří nové todo.

```bash
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Nový úkol"}'
```

```json
{"id": 2, "title": "Nový úkol", "completed": false, "created_at": "..."}
```

### PATCH /api/todos/:id

Přepne stav completed/incomplete.

```bash
curl -X PATCH http://localhost:3000/api/todos/1
```

```json
{"id": 1, "title": "Nakoupit mleko", "completed": true, "created_at": "..."}
```

### DELETE /api/todos/:id

Smaže todo.

```bash
curl -X DELETE http://localhost:3000/api/todos/1
```

```json
{"deleted": true, "todo": {"id": 1, ...}}
```

### Chybové odpovědi

| Status | Situace |
|--------|---------|
| `400` | Prázdný title nebo neplatné ID |
| `404` | Todo neexistuje |
| `500` | Chyba databáze |

## Zastavení

```bash
docker compose down        # zastaví kontejnery
docker compose down -v     # zastaví + smaže data (reset DB)
```
