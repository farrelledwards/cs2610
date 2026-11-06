# Lecture: Vite

**Class:** CS 2610
**Date:** Nov 6, 2026
**Modules:** 4.1

## Schedule

## 1. Express + handlebars

- Demo
- What's happening
  - browser > request > Express > Postgres > Handlebars > full HTML > page replaced

### Three problems

- Every interaction = full round trip
- State lost between pages

## 2. The fix

- MVC
  - Server: controllers and models
  - Browser/client: view.

- SPA - single page app
  - Server 
    - Delivers the first html page (using handlebars)
    - Delivers a bunch of javascript and css
    - Responds only with json
  - Client
    - Render
    - UI

## 3. Costs

- Slower first load
- SEO/shared links
- More tooling
  - Browswer can't get into node_modules
  - Doesn't know anything about npm imports
- Hundreds of files

## 4. Need

- **Dev** = fast feedback.
- **Build** = small, deployable files.**

## 5. Vite

- Build tool + dev server
  - `dev`: on-demand modules, instant start, hot reload
  - `build`: Rollup bundle into `dist` (HTML + hashed JS/CSS)
- Hot Module Replacement

## 4. Hands-On (0:22-0:37)

```shell
  npm create vite@latest my-app -- --template react --no-interactive
  cd my-app
  npm install
  npm run dev
  
  # Later
  npm run build
  npm run preview`
```

## 5. Express and Vite

- Ask: Vite has its own server. Where does Express go?
- Sketch (browser at :3000):
  1. `GET /` > Express: one HTML shell
  2. scripts > Vite :5173 (dev only)
  3. `fetch /api/...` > Express: JSON
- One origin: no CORS, cookies work
- Handlebars shrinks to one template; page routes become JSON routes
- Production: Express serves `dist`
- Preview only; no memorizing

### Server.js

```javascript
import { create } from 'express-handlebars'
```

```javascript
const PORT = 3000
const VITE_ORIGIN = 'http://localhost:5173'
```

**Static serving**

```javascript
// In development, redirect asset/file requests to the Vite dev server
app.use((req, res, next) => {
  if (req.path.includes('.')) {
    return res.redirect(`${VITE_ORIGIN}${req.path}`)
  }
  next()
})
```

**Handlebars index**

