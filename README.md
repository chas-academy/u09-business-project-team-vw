# [![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/N68_urbh)

📘 Projekt: Team VW
🎨 Design Prototype
Du kan se Figma-designen som applikationen baseras på här:
🔗 Figma Design

Deployad frontend:
🔗 <https://u09-team-vw.netlify.app/>
Deployad backend:
🔗 <https://u09-business-project-team-vw.onrender.com/>

💡 Projektidé
Målet med projektet är att förenkla vardagen för användare genom att tillhandahålla recept som kan sparas i personliga listor. Det finns tre användartyper:

👤 Guest
Kan se och söka efter recept

Får 10 recept slumpmässigt vid sidladdning

Kan spara recept genom att bokmärka URL

👥 User (inloggad med Google OAuth)
Kan söka recept via egna nyckelord

Kan skapa obegränsat antal listor och spara recept

Recept som sparas kopplas till användaren och lagras i databasen

Full CRUD-stöd för listor

Recept som sparas reducerar behovet av API-anrop till Spoonacular

🛡️ Admin
Har tillgång till en adminvy

Kan hantera användare (t.ex. ta bort dem)

Endast systemansvarig kan ge ett konto adminbehörighet

Ett adminkonto kräver både inloggning och tillgång till databasen

🛠️ Teknisk översikt
Frontend: React + TypeScript

Backend: Node.js + Express + TypeScript

Databas: MongoDB

Deploy:

Backend: Render

Frontend: Netlify eller lokalt via vite preview

🚀 Kom igång

1. Klona projektet
    git clone <https://github.com/chas-academy/u09-business-project-team-vw.git>
    cd u09-business-project-team-vw

2. Installera beroenden
   npm install

3. Projektstruktur/
    ├── backend/          # Express + TypeScript + MongoDB API + Spoonacular
    ├── frontend/         # React + TypeScript
    └── README.md         # Dokumentation

4. Miljövariabler
    Skapa en .env-fil i backend/.
    👉 Kontakta William eller Viktor för att få rätt miljövariabler.

▶️ Köra lokalt

Frontend
    cd frontend
    npm install
    npm run build      # Bygger produktionen
    npm run preview    # Startar en lokal preview-server

backend
    cd backend
    npm install
    npm run dev        # Startar utvecklingsservern

## 📦 Backend – Beroenden

## ✅ Produktionsberoenden backend

- **express** – Webbramverk för HTTP och API
- **mongoose** – ODM för MongoDB
- **express-session** – Sessionshantering
- **connect-mongo** – Lagrar sessioner i MongoDB
- **passport** – Autentisering
- **passport-google-oauth20** – OAuth för Google-login
- **cors** – Hanterar cross-origin-förfrågningar
- **dotenv** – Läser miljövariabler från `.env`

## 🧾 Typdefinitioner för TypeScript backend

- **@types/express**, **@types/node**, **@types/cors**
- **@types/express-session**, **@types/dotenv**
- **@types/passport**, **@types/passport-google-oauth20**

## 🛠️ Utvecklingsberoenden backend

- **typescript**, **ts-node**, **ts-node-dev**
- **eslint**, **@typescript-eslint/***
- **nodemon** – Automatisk omstart av servern vid ändringar
- **tree-node-cli** – Genererar mappstruktur med `npm run gen:tree`

## 🎨 Frontend – Beroenden

## ✅ Produktionsberoenden för frontend

- **react** – UI-biblioteket
- **react-dom** – DOM-integration för React
- **react-router-dom** – Routing för SPA
- **@iconify/react** – Ikonbibliotek för UI-design

## 🧾 Typdefinitioner för TypeScript

- **@types/react**, **@types/react-dom**

## 🛠️ Utvecklingsberoenden frontend

- **vite** – Snabb utvecklingsserver och bundler
- **@vitejs/plugin-react** – React-plugin för Vite
- **typescript** – TypeScript-kompilator
- **sass** – Stöd för SCSS
- **eslint**, **@eslint/js**, **typescript-eslint**
- **eslint-plugin-react-hooks**, **eslint-plugin-react-refresh**
- **tree-node-cli**, **globals**


## 🧪 Kodkvalitet – ESLint

### ✅ Syfte

ESLint används för att:

- Upprätthålla gemensamma kodregler
- Förbättra läsbarhet
- Undvika potentiella buggar
- Anpassa kodstilen efter TypeScript och Node.js

### 🔧 ESLint-konfiguration (sammanfattning)

Vi har skapat en konfiguration som:

- Ignorerar mappar som `node_modules`, `dist` och vissa konfigfiler
- Gäller för filer med ändelserna `.js`, `.mjs`, `.cjs` och `.ts`
- Använder rekommenderade regler från ESLint och TypeScript
- Definierar kodstil (t.ex. enkla citattecken, semikolon)
- Specificerar namnkonventioner för variabler, klasser och typer

### 📜 Exempel på regler (Backend)

| Regel                                       | Beskrivning                                 |
|--------------------------------------------|---------------------------------------------|
| `semi: ['error', 'always']`                | Kräv semikolon                              |
| `quotes: ['error', 'single']`              | Använd enkla citattecken                    |
| `@typescript-eslint/no-unused-vars: ['warn']` | Varnar för oanvända variabler           |
| `no-eval: 'error'`                         | Förbjuder användning av `eval()`            |
| `no-var: 'error'`                          | Endast `let` och `const` tillåts            |
| `require-await: 'warn'`                    | Varnar om `async`-funktioner saknar `await` |
| `no-return-await: 'error'`                 | Förbjuder onödig `return await`             |

### 📜 Exempel på regler (Frontend)

| Regel                                       | Beskrivning                                 |
|--------------------------------------------|---------------------------------------------|
| `semi: ['error', 'always']`                | Kräv semikolon                              |
| `quotes: ['error', 'single']`              | Använd enkla citattecken                    |
| `@typescript-eslint/no-unused-vars: ['warn']` | Varnar för oanvända variabler           |
| `no-eval: 'error'`                         | Förbjuder användning av `eval()`            |
| `no-var: 'error'`                          | Endast `let` och `const` tillåts            |
| `require-await: 'warn'`                    | Varnar om `async`-funktioner saknar `await` |
| `no-return-await: 'error'`                 | Förbjuder onödig `return await`             |

### 📐 Namnkonventioner (Övergripande)

- **Variabler och egenskaper:** `camelCase`  
  - Tillåter inledande `_` (t.ex. `_id`)  
  - Tillåter **inte** avslutande `_`

- **Typer, klasser, interfaces, enums:** `PascalCase`

---

Frontend-konfigurationen innehåller även stöd för:

- `react-hooks` – Säker användning av hooks
- `react-refresh` – Stöd för Vite hot module replacement (HMR)
