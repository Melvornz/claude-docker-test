# claude-docker-test

Full-stack TODO aplikace demonstrující integraci Docker + Node.js + PostgreSQL + Vanilla JS frontend.

## Tech Stack

- **Node.js** (Express) — REST API server + static file serving, port 3000
- **PostgreSQL 16** — databáze běžící v Docker kontejneru, port 5432
- **Docker Compose** — orchestrace PostgreSQL kontejneru s automatickými migrations
- **Tailwind CSS** (CDN) — styling frontendu
- **Vanilla JavaScript** — frontend logika (Fetch API)

## Architektura

```
Browser → public/index.html + public/app.js
              ↓ Fetch API
localhost:3000 → server.js (Express)
              ↓ pg client
Docker: postgres:16 → localhost:5432
```

### Struktura souborů

```
claude-docker-test/
├── server.js              # Express server + REST API
├── docker-compose.yml     # PostgreSQL kontejner + migrations
├── package.json
├── migrations/
│   └── 001_create_todos.sql   # Automatická migrace při startu DB
└── public/
    ├── index.html         # Frontend UI (Tailwind CSS)
    └── app.js             # Vanilla JS logika
```

## Jak spustit

### 1. Spusť PostgreSQL v Dockeru (automaticky aplikuje migrations)

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
```

### 4. Spusť vývojový server

```bash
npm run dev
```

### 5. Otevři prohlížeč

```
http://localhost:3000
```

## API Endpointy

| Metoda | Endpoint | Popis |
|--------|----------|-------|
| `GET` | `/health` | Health check serveru |
| `GET` | `/api/test` | Test připojení k databázi |
| `GET` | `/api/todos` | Vrátí všechny todos (DESC created_at) |
| `POST` | `/api/todos` | Vytvoří nové todo `{title: string}` |
| `PATCH` | `/api/todos/:id` | Přepne completed status |
| `DELETE` | `/api/todos/:id` | Smaže todo |

### Chybové kódy

- `400` — validační chyba (prázdný title, neplatné id)
- `404` — todo neexistuje
- `500` — chyba databáze

## Frontend

Jednoduchá SPA bez frameworku:
- Formulář pro přidání úkolu s validací (max 255 znaků)
- Seznam úkolů s checkboxem (completed = přeškrtnutý text)
- Smazání úkolu tlačítkem X
- Empty state při prázdném seznamu
- Loading state při načítání
- Error handling pro všechny API volání

### Jak app vypadá

```
┌─────────────────────────────────────┐
│           Todo App                  │
│    Jednoduchý správce úkolů         │
│    ⎘ Melvornz/claude-docker-test    │
│                                     │
│  ┌──────────────────────┐  [Přidat] │
│  │ Co potřebuješ udělat?│           │
│  └──────────────────────┘           │
│                                     │
│  ┌─────────────────────────────────┐│
│  │ ☑ ~~Nakoupit mleko~~          × ││  ← completed, přeškrtnutý
│  │ ☐ Zavolat doktora             × ││  ← aktivní
│  │ ☐ Přečíst knihu               × ││
│  └─────────────────────────────────┘│
└─────────────────────────────────────┘
```

Při prázdném seznamu se zobrazí ikona složky s textem "Žádné úkoly. Přidej první!"

## Příkazy

| Příkaz | Popis |
|--------|-------|
| `docker compose up -d` | Spustí PostgreSQL + aplikuje migrations |
| `docker compose down` | Zastaví kontejnery |
| `docker compose down -v` | Zastaví + smaže data volume |
| `docker compose logs db` | Zobrazí logy databáze |
| `npm run dev` | Spustí server s hot-reload (nodemon) |
| `npm start` | Spustí server bez hot-reload |

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

**Reset databáze (smaže všechna data!):**
```bash
docker compose down -v
docker compose up -d
```
