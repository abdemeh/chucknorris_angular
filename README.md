# 🤠 Chuck Norris Saloon

A Western-themed Angular 19.2.19 app that fetches Chuck Norris jokes from the public Chuck Norris API and displays them as rustic brown cards with a saloon aesthetic.

Users can search jokes, filter by category, and deal a new set of random jokes—all without reloading the page.

---

## ✨ Features

- **Western-style UI** with dark brown theme and glowing card shadows
- **Barriecito font** used throughout the entire app
- **Centered layout** with "Chuck Norris Saloon" header and avatar
- **Search functionality** with text input and dedicated search button
- **Category filters** as clickable brown chips (multi-line wrapping)
- **Responsive joke cards** (1–3 columns based on viewport width)
- **"Deal new jokes" button** to fetch a fresh batch without page reload
- Each joke card displays:
  - "Wanted: Laughs" label
  - Short joke ID
  - The joke text
  - Category tags

---

## 🛠️ Tech Stack

- **Angular 19.2.19** (standalone components, signals)
- **TypeScript**
- **SCSS** for styling
- **HttpClient** for API calls
- **Google Fonts** – Barriecito

---

## 📂 Project Structure

```
chuck-jokes/
├─ src/
│  ├─ app/
│  │  ├─ app.component.ts
│  │  ├─ app.config.ts
│  │  ├─ app.routes.ts
│  │  ├─ core/
│  │  │  └─ services/
│  │  │     └─ jokes.service.ts
│  │  └─ features/
│  │     └─ jokes/
│  │        ├─ jokes.component.ts
│  │        ├─ jokes.component.html
│  │        └─ jokes.component.scss
│  ├─ main.ts
│  ├─ index.html
│  └─ styles.scss
├─ angular.json
├─ package.json
└─ README.md
```

---

## 🌐 API

The app uses the public **Chuck Norris Jokes API** (no authentication required).

**Base URL:**
```
https://api.chucknorris.io/jokes
```

**Endpoints:**

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/categories` | Get all joke categories |
| GET | `/random` | Get a random joke |
| GET | `/random?category={category}` | Get a random joke by category |
| GET | `/search?query={term}` | Search jokes by text |

---

## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/abdemeh/chucknorris_angular.git chuck-jokes
cd chuck-jokes
```

### 2. Install dependencies

```bash
npm install
```

### 3. (Optional) Install Angular CLI globally

```bash
npm install -g @angular/cli@19.2.19
```

---

## 💻 Running the App

### Development Server

```bash
ng serve -o
```

This starts the dev server on `http://localhost:4200/` and opens your browser automatically.

The app will hot-reload when you change source files.

### Production Build

```bash
ng build
```

Build artifacts are output to the `dist/` folder. Serve them with any static file server (Nginx, Apache, `npx serve`, etc.).

---

## 📜 Available Scripts

```json
{
  "scripts": {
    "start": "ng serve",
    "build": "ng build",
    "test": "ng test",
    "lint": "ng lint"
  }
}
```

Run any script with:

```bash
npm run <script-name>
```

---

## 🏗️ How It Works

### Core Files

**`index.html`**
- Loads the Barriecito font from Google Fonts
- Hosts the root `<app-root>` element

**`styles.scss`**
- Defines the global brown Western color palette
- Applies Barriecito font to the body
- Forces `input`, `button`, etc. to inherit font styling

**`main.ts`**
- Bootstraps the standalone `AppComponent` with shared `appConfig`

**`app.routes.ts`**
- Routes the root path (`/`) to `JokesComponent`

**`app.config.ts`**
- Registers the router and `HttpClient` providers

### Service Layer

**`jokes.service.ts`**
- Wraps all calls to the Chuck Norris API
- Exposes methods:
  - `getCategories()` – Fetch all categories
  - `getRandom(category?)` – Get one random joke
  - `getManyRandom(count, category?)` – Get multiple random jokes
  - `searchJokes(query)` – Search jokes by text

### Component Layer

**`jokes.component.ts`**
- Uses Angular signals for reactive state management (`jokes`, `categories`, `searchTerm`, `loading`, `error`, etc.)
- **On init:**
  - Loads categories
  - Loads initial batch of random jokes
- **Handles:**
  - Search submit (API search → replace jokes)
  - Category click (reload random jokes for that category)
  - "Deal new jokes" (reload jokes for current category)

**`jokes.component.html`**
- Renders:
  - Header with Chuck Norris avatar and subtitle
  - Top bar with search input, Search button, and Deal new jokes button (all on one row)
  - Category chips (wrapping layout)
  - Loading, error, and empty states
  - Responsive grid of joke cards

**`jokes.component.scss`**
- Applies Western brown theme:
  - Card background: `#241405`
  - Rusty shadows: `rgba(115, 67, 23, …)`
- Ensures:
  - No borders on cards/buttons (shadows only)
  - Category chips wrap across multiple lines
  - Responsive, centered layout

---

## 📝 Notes

- The Chuck Norris API is public. If unavailable, the app displays an error banner but the UI remains functional.
- Customize the theme by editing color variables and shadows in `styles.scss` and `jokes.component.scss`.
- To point to a custom backend, update the API base URL in `jokes.service.ts`.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Enjoy the jokes, partner! 🤠**