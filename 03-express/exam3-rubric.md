# Unit 3 Exam Rubric

**Total: 150 pts. 14 questions, each worth 150 / 14 ≈ 10.71 pts.**
Where a question has numbered parts, split the points evenly across the parts. Within a part, award full / partial / none based on the key ideas.

---

## Q1
**Question:** Describe how a server using Express.js processes an HTTP request from start to finish. In your answer, explain the role of middleware functions and route handlers.

1. **Start to finish:** The request arrives and passes through middleware in the order registered. Express then matches a route by method and path (params in `req.params`), the handlers build the response on `res`, and Express sends it.
2. **Middleware:** Functions with `req`, `res`, `next` that can modify them or end the cycle. Calling `next()` passes control on; not calling it stops the request there.
3. **Route handlers:** Handle a specific method and path. They modify `res` (`send`/`json`/`render`) rather than returning a Response.

```js
const app = express();

// 1. Middleware runs first, in order
app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();                       // pass control onward
});
app.use(express.urlencoded({ extended: true }));

// 2. Route handler matches method + path
app.get('/users/:id', (req, res) => {
  res.send(`User ${req.params.id}`);   // 3. modifies res; Express sends it
});
```

## Q2
**Question:** Explain why Express routers are useful in a growing application. How do they change the way you organize and structure your routes?

1. **Why useful:** A router is a mini-app of related routes (and its own middleware) that can be mounted anywhere. It keeps the main file small and the code reusable and maintainable.
2. **Organization:** Routes are split by resource into separate files (e.g. `users.js`), each mounted at a prefix like `/api/users`.

## Q3
**Question:** 1) Describe how Handlebars templates work with Express to render dynamic HTML. 2) How is data included? 3) What is sent to the browser?

1. **How it works:** A template is HTML with `{{ }}` placeholders and simple loop/if helpers, stored in `views/`. Express uses Handlebars as its view engine and fills the template in when a route renders it.
2. **Data:** The route handler passes an object: `res.render('name', data)`. Placeholders are replaced with its values; loops repeat once per array item.
3. **Sent to browser:** Only the finished HTML, never the template or the data object.

```js
// Setup + route
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/users', (req, res) => {
  res.render('users', { users: [{ name: 'Alice', email: 'a@x.com' }], admin: true });
});
```

```handlebars
<!-- views/users.handlebars -->
{{#if admin}}<p>Admin view</p>{{/if}}
<ul>
  {{#each users}}
    <li>{{name}} ({{email}})</li>
  {{/each}}
</ul>
```

Browser receives:

```html
<p>Admin view</p>
<ul>
  <li>Alice (a@x.com)</li>
</ul>
```

## Q4
**Question:** 1) Explain the purpose of a Handlebars layout file? 2) How does it fit into an application that has multiple pages or views?

1. **Purpose:** A shared wrapper (head, nav, footer) so common page structure is written once. `{{{body}}}` marks where each page's content goes (triple braces = unescaped HTML).
2. **Multiple pages:** Every view is inserted into the same layout (default `views/layouts/main.handlebars`), so pages stay consistent with no duplicated markup. It can be skipped per render with `layout: false`.

## Q5
**Question:** Explain how an HTML form is structured and how it sends data to a server. Describe the role of the HTML element and its important attributes? How do input fields contribute data to what the server receives? List 3 specific HTML form elements.

1. **Structure and sending:** A `<form>` wraps the controls. On submit the browser collects the named fields, encodes them (default `application/x-www-form-urlencoded`), and sends them to the server. GET puts them in the query string, POST in the request body. Express reads them from `req.body` using `express.urlencoded()`.
2. **`<form>` element and attributes:** `action` is the URL that receives the data; `method` is GET or POST.
3. **Inputs:** Each control's `name` becomes the key and its value the value (always a string). Controls without a `name`, and unchecked checkboxes, send nothing.
4. **Three elements:** Any valid three, e.g. `input`, `select`, `textarea`, `button`, `label`.

```html
<form action="/register" method="POST">
  <label for="username">Username</label>
  <input type="text" id="username" name="username">

  <label for="role">Role</label>
  <select id="role" name="role">
    <option value="student">Student</option>
    <option value="teacher">Teacher</option>
  </select>

  <textarea name="bio"></textarea>

  <input type="checkbox" name="subscribe" value="yes">
  <button type="submit">Register</button>
</form>
```

Server receives (body): `username=john+doe&role=student&bio=Hi&subscribe=yes`, available as `req.body.username`, etc. (an unchecked checkbox is simply absent).

## Q6
**Question:** 1) Explain RESTful routing. 2) How does it apply to designing routes for a resource in a web application? 3) Illustrate 2 different routes that do the same thing that are both RESTful.

1. **REST:** A convention for web APIs: URLs name resources (nouns), HTTP methods name the action, requests are stateless, and the interface is consistent.
2. **Applying it:** Each resource gets the standard routes: index, show, new, create, edit, update, destroy, each mapped to a method and path (e.g. `GET /recipes/:id` to show one).
3. **Two routes, same operation:** The same outcome reachable through different paths, both noun-based, with the method carrying the action. Example: creating a loan (checking out a book); `loans` is the resource.

```html
<!-- Route A: nested under the user; form says which book -->
<form action="/users/8/loans" method="POST">
  <input type="hidden" name="book_id" value="55">
  <button>Check out</button>
</form>

<!-- Route B: nested under the book; form says which user -->
<form action="/books/55/loans" method="POST">
  <input type="hidden" name="user_id" value="8">
  <button>Check out</button>
</form>
```

```js
router.post('/users/:userId/loans', (req, res) => { /* req.body.book_id */ });
router.post('/books/:bookId/loans', (req, res) => { /* req.body.user_id */ });
```

- Also acceptable: flat `POST /loans` with both ids in the body; or `GET /users/8/loans` vs `GET /loans?user_id=8`
- Not RESTful (no credit): verb paths like `/checkoutBook` or `/users/8/checkout`
- Other valid pairs acceptable if justified

## Q7
**Question:** 1) Explain why database migrations are used. 2) What are the benefits over manually changing the schema in each environment?

1. **Why used:** Migrations are ordered, versioned scripts for schema changes, like version control for the database. A tracking table (`schema_migrations`) records which have run so each runs exactly once.
2. **Benefits over manual:** Environments stay consistent, there is a history of changes, a new developer or machine can rebuild the schema, and nothing is accidentally applied twice ("table already exists").

## Q8
**Question:** 1) Explain why storing user passwords securely requires hashing instead of plain text. 2) What is the purpose of the salt? 3) Summarize the main ideas behind using a password-hashing library such as `bcrypt` in a web application.

1. **Why hash:** If the database leaks, plain text exposes every password. A hash is one-way, so it can't be reversed. At login, hash the submitted password and compare.
2. **Salt:** Random data added per password before hashing. It defeats precomputed rainbow tables, and the same password gives a different hash for each user. It must be kept with the hash to verify later.
3. **Library (main ideas):** Use a proven library instead of writing your own. It generates the salt and embeds it in the hash (no separate salt column). Call `bcrypt.hash(password, saltRounds)` at registration and store only the hash; call `bcrypt.compare(submitted, storedHash)` at login. `saltRounds` makes hashing deliberately slow (about 10 is common) to resist brute force. Never store or compare plain text.

```js
// register
const hash = await bcrypt.hash(password, 10);   // store `hash` in users table

// login
const ok = await bcrypt.compare(submittedPassword, user.password_hash);
if (!ok) return res.status(401).send('Invalid login');
```

## Q9
**Question:** 1) Describe what it means for a user to be "logged in" in a web application. 2) How is the server able to recognize the same user across multiple requests.

1. **Logged in:** After a successful login the server creates a session, a record linking that browser to a user.
2. **Recognizing the user:** HTTP is stateless, so the session's token is stored in a cookie. The browser sends it with every request, and the server looks the token up to find the user.

## Q10
**Question:** 1) Explain how middleware can be used to support authentication in an Express application. 2) How would you use it to protect routes that should only be available to logged-in users?

1. **Supporting authentication:** Two middleware pieces. A session-loading one reads the cookie token, looks up the session and attaches `req.session`, and always calls `next()`. `requireAuth` then checks that `req.session.userId` exists.
2. **Protecting routes:** Put `requireAuth` on routes that need login. If not logged in it responds 401 or redirects to login and does not call `next()`. Order matters: the session loader must run first.

```js
// Session-loading middleware: runs on every request, always calls next()
async function loadSession(req, res, next) {
  const token = req.cookies.session_token;
  if (token) {
    const result = await db.query(
      'SELECT user_id FROM sessions WHERE token = $1 AND expires_at > NOW()', [token]);
    if (result.rows[0]) req.session = { userId: result.rows[0].user_id };
  }
  next();
}

// requireAuth: only checks that a session was attached
function requireAuth(req, res, next) {
  if (req.session && req.session.userId) return next();
  res.status(401).redirect('/login');   // or 401; do NOT call next()
}

// App level: load the session for every request (must come first)
app.use(loadSession);

// Option 1: protect a single route
app.get('/dashboard', requireAuth, (req, res) => { /* ... */ });

// Option 2: protect every route on a router
const recipesRouter = express.Router();
recipesRouter.use(requireAuth);
recipesRouter.get('/', (req, res) => { /* ... */ });
app.use('/recipes', recipesRouter);
```

## Q11
**Question:** 1) Explain the difference between authentication and authorization. 2) Give an example of a situation where a user is authenticated but not authorized. 3) What is the appropriate thing for the server to return in each case?

1. **Difference:** Authentication is who you are (verifying identity, e.g. login). Authorization is what you're allowed to do (permissions).
2. **Example:** A logged-in user tries to edit or delete someone else's post, or open an admin page.
3. **What to return:** Not authenticated: 401 (or redirect to login). Authenticated but not allowed: 403.

## Q12
**Question:** 1) Describe the responsibilities of the Model, View, and Controller in the MVC pattern. 2) Explain how those ideas map onto an Express and Handlebars application.

1. **Responsibilities:** Model: data and business logic. View: presentation. Controller: receives requests, calls the model, and picks the view.
2. **Mapping:** Express routes/routers are the controllers, Handlebars templates are the views, and the database/data-access code (e.g. `pg` queries) is the model. A request flows controller → model → `res.render` with a view and data. (The flow is a bonus detail.)

## Q13
**Question:** In a web application that uses server-side sessions, describe how you would design a sessions table in the database to support user logins. In your answer, explain what kinds of information need to be stored for each session and how that information is used when handling incoming requests.

1. **What's stored:** `id` (primary key), `token` (unique, random; the value in the cookie), `user_id` (links to the user), `expires_at`. A `created_at` column is an acceptable extra.
2. **How it's used:** At login, insert a row and set the token in a cookie. On each request, look up the cookie's token, check it hasn't expired, and attach the `user_id` to the request. At logout or expiry, delete or invalidate the row.

## Q14
**Question:** As a developer or business owner, what can you do to guarantee that your application's data will never be compromised? Answer from the perspective of someone who understands web security and authentication/authorization, and justify your answer.

1. **Core answer:** You can't guarantee it; no system is perfectly secure.
2. **Justification:** Reduce risk with layered defenses: hashed and salted passwords, HTTPS, HttpOnly cookies, session expiry, authorization checks on every route, input validation, least privilege, updated dependencies, secrets kept out of git.
3. **No credit:** Claiming one measure (e.g. bcrypt alone) guarantees safety.
