# Lecture: React

**Class:** CS 2610
**Date:** Nov 16, 2026
**Modules:** 4


## XML

From: https://github.com/react/jsx

`JSX is an XML-like syntax extension to ECMAScript without any defined semantics.`

Further

`This specification does not attempt to comply with any XML or HTML specification. JSX is designed as an ECMAScript feature and the similarity to XML is only for familiarity.`

## The path

1. The browser asks Express (port 3000) for `/quotes`. 
   - Express has no page route for it
   - catch-all returns the Handlebars shell: an empty `<div id="root">` and some script tags.
2. The browser loads `main.jsx` and the rest of the React code from Vite (port 5173).
3. React renders the `Quotes` page. Its `quotes` state starts as an empty list, so the first render has nothing to show.
4. After that first render, `useEffect` runs and calls `fetch("/api/quotes")`. The page came from Express, so this request goes to Express too.
5. Express answers with JSON from the quotes controller.
6. `setQuotes(...)` stores the JSON in state. A state change makes React render again.
7. The page maps each quote to a `QuoteCard`, passing `text` and `author` as props.

## Plan at a glance

| Time      | Segment           | What you build                                   | Idea it introduces                            |
|-----------|-------------------|--------------------------------------------------|-----------------------------------------------|
| 0:00-0:04 | 1. Frame          | Nothing yet: the board path, the running app     | Why the browser needs to ask for data         |
| 0:04-0:10 | 2. Back end       | `GET /api/quotes` returning placeholder JSON     | The API is just a URL that returns data       |
| 0:10-0:22 | 3. Thinnest slice | A `Quotes` page that fetches and prints raw JSON | `useState`, `useEffect`, the dependency array |
| 0:22-0:31 | 4. Component      | `QuoteCard` with `text` and `author` props       | Components, props, `key`                      |
| 0:31-0:37 | 5. State inside   | A Like button on each card                       | State belongs to each instance                |
| 0:37-0:45 | 6. Reuse          | `useQuotes` hook; a featured card on Home        | Custom hooks, one component in many places    |
| 0:45-0:50 | 7. Trace and exit | Walk the path again in the Network tab           | Putting it together                           |

## Before class

- Starter. 
- Run `./setup.sh` once
- Start both servers: `npm run server-dev` and `npm run client-dev`.
- Open `http://localhost:3000`
- Register a demo user and stay logged in.

## 1. Running app

## 2. Endpoint

**Do:** Create `server/controllers/quotes.js`:

```js
import express from "express";

const router = express.Router();

// Placeholder data. No database yet; the point is the path, not the source.
const quotes = [
  { id: 1, text: "Simplicity is prerequisite for reliability.", author: "Edsger Dijkstra" },
  { id: 2, text: "Premature optimization is the root of all evil.", author: "Donald Knuth" },
  { id: 3, text: "The best way to predict the future is to invent it.", author: "Alan Kay" },
];

// GET /api/quotes
router.get("/", (req, res) => {
  res.json({ quotes });
});

export default router;
```

Then mount it in `server/server.js`, next to the auth router and before the catch-all:

```js
import quotesController from "./controllers/quotes.js";
// ...
app.use("/api/quotes", quotesController);
```

Open `localhost:3000/api/quotes` in a new tab. The browser shows raw JSON, and React is not involved at all.

## 3. state and useEffect

**Do:** Create `client/src/pages/Quotes.jsx`:

```jsx
import { useState, useEffect } from "react";

function Quotes() {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    fetch("/api/quotes")
      .then((res) => res.json())
      .then((data) => setQuotes(data.quotes));
  }, []);

  return <pre>{JSON.stringify(quotes, null, 2)}</pre>;
}

export default Quotes;
```

Add the route in `App.jsx`

```jsx
import Quotes from "./pages/Quotes";
<Route path="/quotes" element={<Quotes />} />
```

Add a link in `Navbar.jsx`:

```jsx
<Link to="/quotes">Quotes</Link>
```

Click it. Raw JSON appears. 

Open `AuthContext.jsx`: state, effect, fetch.

**Walk the three moves:**

- State starts as `[]`, so the first render has nothing real to show.
- The effect runs after that render, because fetching is a side effect and rendering must stay pure.
- The setter changes state, so React renders again with the data.

## Add a loading state.

Slow the endpoint on purpose so students can see it

```js
router.get("/", (req, res) => {
  setTimeout(() => res.json({ quotes }), 1500);
});
```

```jsx
const [loading, setLoading] = useState(true);

useEffect(() => {
  fetch("/api/quotes")
    .then((res) => res.json())
    .then((data) => {
      setQuotes(data.quotes);
      setLoading(false);
    });
}, []);

if (loading) {
  return <p>Loading quotes...</p>;
}
```

Last use of loading, useEffect and useState

```js
function UserProfile({ userId }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch(`/api/users/${userId}`)
      .then((res) => res.json())
      .then((data) => setUser(data))
      .finally(() => setLoading(false))
  }, [userId])

  if (loading) return <p>Loading...</p>
  if (!user) return <p>No user found.</p>
  return <div>{user.name}</div>
}
```

**Break it on purpose.** Remove the `setTimeout` first, so the endpoint is fast again. Ask: "What happens if I delete the `[]`?" Delete it and look at the Network tab. In testing this fired about 500 requests in two seconds: with no dependency array the effect runs after every render, and `setQuotes` gives a new array each time, which triggers another render. Put the `[]` back right away and close the tab so it stops hammering the server.

## 4. Component with props

**Do 1:** Replace the `<pre>` with markup written inline in the map. Paste the prepared `.quote-card` styles into `index.css` first (they are in the patch).

```jsx
return (
  <div>
    <h2>Quotes</h2>
    {quotes.map((quote) => (
      <div key={quote.id} className="quote-card">
        <p className="quote-text">“{quote.text}”</p>
        <p className="quote-author">— {quote.author}</p>
      </div>
    ))}
  </div>
);
```

### Quote Card

**Do 2:** Create `client/src/components/QuoteCard.jsx`:

```jsx
function QuoteCard({ text, author }) {
  return (
    <div className="quote-card">
      <p className="quote-text">“{text}”</p>
      <p className="quote-author">— {author}</p>
    </div>
  );
}

export default QuoteCard;
```

Back in `Quotes.jsx`, import it and use it in the map:

```jsx
{quotes.map((quote) => (
  <QuoteCard key={quote.id} text={quote.text} author={quote.author} />
))}
```

## CSS

Styles to paste at the end of `index.css` before segment 4:

```css
/* Quotes */
.quote-card {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 1rem;
  margin-bottom: 1rem;
  text-align: left;
}

.quote-text {
  font-size: 1.1rem;
}

.quote-author {
  color: #777;
  margin-bottom: 0.5rem;
}
```

## 5. Component State

This state will be for each component.

**Do:** Add a Like button to `QuoteCard.jsx`:

```jsx
import { useState } from "react";

function QuoteCard({ text, author }) {
  const [likes, setLikes] = useState(0);

  return (
    <div className="quote-card">
      <p className="quote-text">“{text}”</p>
      <p className="quote-author">— {author}</p>
      <button className="btn btn-primary" onClick={() => setLikes((n) => n + 1)}>
        Like ({likes})
      </button>
    </div>
  );
}

export default QuoteCard;
```

## 6. Component Reuse

### Add component to Home for featured quote.  Same data.  Same rendering.

**Do 1:** Create `client/src/hooks/useQuotes.js`. It is the same code you already wrote, moved:

```js
import { useState, useEffect } from "react";

export function useQuotes() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/quotes")
      .then((res) => res.json())
      .then((data) => {
        setQuotes(data.quotes);
        setLoading(false);
      });
  }, []);

  return { quotes, loading };
}
```

**Do 2:** Shrink `Quotes.jsx` to use it. Students should see how much disappears:

```jsx
import { useQuotes } from "../hooks/useQuotes";
import QuoteCard from "../components/QuoteCard";

function Quotes() {
  const { quotes, loading } = useQuotes();

  if (loading) {
    return <p>Loading quotes...</p>;
  }

  return (
    <div>
      <h2>Quotes</h2>
      {quotes.map((quote) => (
        <QuoteCard key={quote.id} text={quote.text} author={quote.author} />
      ))}
    </div>
  );
}

export default Quotes;
```

**Do 3:** Add a featured card to `Home.jsx`:

```jsx
import { useRequireUser } from "../hooks/useRequireUser";
import { useQuotes } from "../hooks/useQuotes";
import QuoteCard from "../components/QuoteCard";
import logo from "../assets/logo.png";

function Home() {
  const user = useRequireUser();
  const { quotes } = useQuotes();

  if (!user) {
    return null;
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Welcome, {user.username}!</h2>
      <img src={logo} alt="My App" className="home-logo" />
      {quotes.length > 0 && (
        <QuoteCard text={quotes[0].text} author={quotes[0].author} />
      )}
    </div>
  );
}

export default Home;
```

Two details to say out loud. The hook is called above the `if (!user) return null`, because hooks must run on every render in the same order. And `quotes.length > 0 &&` guards the first render, when the list is still empty and `quotes[0]` would be `undefined`.

## 7. Trace it and exit (0:45-0:50)

**Do:** Reload `/quotes` with the Network tab open and walk the board path again, one request at a time:

## 8. Extra

**TODO:**  Add a `year` field to each quote in `quotes.js` and show it on the card.

