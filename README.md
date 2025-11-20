# Chuck Norris Saloon

A small Angular 19.2.19 app that fetches Chuck Norris jokes from the public `https://api.chucknorris.io` API and displays them as Western‑style brown cards.  
Users can search jokes, filter by category, and deal a new set of random jokes without reloading the page.

---

## Tech stack

- Angular 19.2.19 (standalone components, signals)
- TypeScript
- SCSS for styling
- HttpClient for API calls
- Google Fonts – Barriecito

---

## Project structure

chuck-jokes/
├─ src/
│ ├─ app/
│ │ ├─ app.component.ts
│ │ ├─ app.config.ts
│ │ ├─ app.routes.ts
│ │ ├─ core/
│ │ │ └─ services/
│ │ │ └─ jokes.service.ts
│ │ └─ features/
│ │ └─ jokes/
│ │ ├─ jokes.component.ts
│ │ ├─ jokes.component.html
│ │ └─ jokes.component.scss
│ ├─ main.ts
│ ├─ index.html
│ └─ styles.scss
├─ angular.json
├─ package.json
└─ README.md

text

---

## API

The app uses the public **Chuck Norris Jokes** API.

Base URL:

https://api.chucknorris.io/jokes

text

Endpoints used:

- **Get categories**

GET /categories

text

- **Get a random joke**

GET /random

text

- **Get a random joke by category**

GET /random?category={category}

text

- **Search jokes**

GET /search?query={term}

text

No authentication or API key is required.

---

## Features

- Western‑style dark brown UI with glowing card shadows
- Barriecito font used everywhere (body, inputs, buttons, chips, cards)
- Centered container with “Chuck Norris Saloon” header and avatar
- Search bar with:
- Text input
- “Search” button
- “Deal new jokes” button  
all aligned on the same row
- Category filters as small brown chips (wrap on multiple lines, no scroll)
- Jokes displayed as responsive cards (1–3 columns depending on width)
- Each card shows:
- Label “Wanted: Laughs”
- Short joke ID
- The joke text
- Its categories as mini tags
- Reload button fetches a new batch of random jokes without page reload

---

## Installation

1. **Clone the repository**

git clone <your-repo-url> chuck-jokes
cd chuck-jokes

text

2. **Install dependencies**

npm install

text

3. **Ensure Angular CLI v19.2.19 is installed globally (optional but recommended)**

npm install -g @angular/cli@19.2.19

text

---

## Running the app

### Development server

ng serve -o

text

This starts the dev server on `http://localhost:4200/` and opens your browser.

The app will automatically reload when you change any source file.

---

## Build

Build a production bundle:

ng build

text

The build artifacts are output to the `dist/` folder.  
You can serve the built app with any static file server (Nginx, Apache, `npx serve`, etc.).

---

## How it works (high level)

- `index.html`  
  - Loads the Barriecito font from Google Fonts.  
  - Hosts the root `<app-root>` element.

- `styles.scss`  
  - Defines the global brown Western color palette.  
  - Applies the Barriecito font to the body.  
  - Forces `input`, `button`, etc. to `font-family: inherit` so the font is everywhere.

- `main.ts`  
  - Bootstraps the standalone `AppComponent` with the shared `appConfig`.

- `app.routes.ts`  
  - Routes the root path (`/`) to `JokesComponent`.

- `app.config.ts`  
  - Registers the router and `HttpClient` providers.

- `jokes.service.ts`  
  - Wraps all calls to `https://api.chucknorris.io/jokes`.  
  - Exposes methods:
    - `getCategories()`
    - `getRandom(category?)`
    - `getManyRandom(count, category?)`
    - `searchJokes(query)`

- `jokes.component.ts`  
  - Uses Angular signals for state (`jokes`, `categories`, `searchTerm`, `loading`, `searching`, `error`, etc.).  
  - On init:
    - Loads categories.
    - Loads an initial batch of random jokes.  
  - Handles:
    - Search submit (API search → replace jokes).  
    - Category click (reload random jokes for that category).  
    - “Deal new jokes” (reload current category).

- `jokes.component.html`  
  - Renders:
    - Header with Chuck avatar and subtitle.  
    - Top bar with search input + Search button + Deal new jokes button on one row.  
    - Category chips.  
    - Loading / error / empty states.  
    - Grid of joke cards.

- `jokes.component.scss`  
  - Applies the Western brown theme:
    - Card background `#241405`.  
    - Rusty shadows around cards and buttons (`rgba(115, 67, 23, …)`).  
  - Ensures:
    - No borders on cards/buttons (only shadows).  
    - Category chips wrap across multiple lines.  
    - Layout is responsive and centered.

---

## Scripts (package.json)

Typical useful scripts:

{
"scripts": {
"start": "ng serve",
"build": "ng build",
"test": "ng test",
"lint": "ng lint"
}
}

text

Run any of them with:

npm run <script-name>

text

---

## Notes

- The Chuck Norris API is public; if it becomes unavailable, the app will show an error banner but still render the UI.  
- Feel free to customize the theme by editing the color variables and shadows in `styles.scss` and `jokes.component.scss`.  
- You can swap the API base URL in `jokes.service.ts` if you want to point to a custom backend later.