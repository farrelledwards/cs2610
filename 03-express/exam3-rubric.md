# Unit 3 Exam Rubric

**Total: 150 pts. 14 questions, each worth 150 / 14 ≈ 10.71 pts.**
Where a question has numbered parts, split the points evenly across the parts. Within a part, award full / partial / none based on the bullets.

---

## Q1: Express request lifecycle
- Request arrives; middleware runs in the order registered
- Middleware gets `req`, `res`, `next`; can modify them, end the cycle, or call `next()`
- No `next()` → cycle stops
- Route matched by method and path; params via `req.params`
- Handler modifies `res` (`send`/`json`/`render`); Express sends it (handlers don't return a Response)

## Q2: Routers
- Modular, mountable mini-apps
- Group routes by feature/resource, one file per resource
- Mounted at a prefix (e.g. `/api/users`)
- Middleware can be scoped to one router
- Keeps main app small; reusable and maintainable

## Q3: Handlebars with Express
- Install `express-handlebars`; register with `app.engine` / `app.set('view engine')`
- Template = `{{ }}` placeholders + helpers (`#each`, `#if`); files in `views/`
- Data passed from route handler: `res.render('name', data)`
- Browser receives finished plain HTML (not the template or the data object)

## Q4: Layouts
- Shared wrapper: head, nav, footer
- `{{{body}}}` marks where the page template is inserted (triple braces = unescaped HTML)
- Every view reuses the layout; no duplicated markup (default `layouts/main.handlebars`)
- Can be disabled per render with `layout: false`

## Q5: HTML forms
- `<form>` wraps controls; `action` = target URL; `method` = GET or POST
- Each control needs a `name` → becomes key in `req.body`; `label` pairs with `id`
- Data travels in the query string (GET) or request body (POST); default encoding is `application/x-www-form-urlencoded` (`Content-Type` / encoding mention = bonus detail, not required)
- Express needs `express.urlencoded()` before routes; values arrive as strings
- Any 3 valid elements (`input`, `select`, `textarea`, `button`, `label`, etc.)

## Q6: RESTful routing
- REST: resource-based URLs, standard HTTP methods, stateless, uniform interface
- Canonical routes (index, show, new, create, edit, update, destroy) map methods + paths to a resource
- Two valid routes for the same operation, e.g. update: `PUT/PATCH /recipes/:id` and `POST /recipes/:id`
- Justification: HTML forms only support GET and POST
- Other valid pairs acceptable if justified

## Q7: Migrations
- Versioned, ordered scripts for schema changes = version control for the DB
- Tracking table (`schema_migrations`) ensures each runs exactly once
- Benefits vs. manual: consistent environments, change history, reproducible setup (new dev/machine), avoids "already exists" errors

## Q8: Password hashing
- Plain text → breach exposes all passwords; hash is one-way
- Good hash: deterministic, one-way, collision-resistant; slow
- Salt: random per-user data; defeats rainbow tables; same password → different hash; stored with/in the hash
- `bcrypt.hash()` at registration, `bcrypt.compare()` at login; salt rounds set cost; never store/compare plain text

## Q9: "Logged in"
- HTTP is stateless
- Login creates a server-side session tied to a user
- Browser holds session token in a cookie, sends it each request
- Server looks up token → identifies user

## Q10: Auth middleware
- Session-loading middleware: reads cookie, looks up session, sets `req.session`; always calls `next()`
- `requireAuth`: checks `req.session.userId`; if missing → 401 or redirect to login, no `next()`
- Apply per route or `router.use(requireAuth)`; order matters (loader before `requireAuth`)

## Q11: Authn vs. authz
- Authentication = who you are (identity); authorization = what you may do (permission)
- Valid example: logged-in user tries to edit/delete someone else's post or reach an admin page
- Not authenticated → 401 (or redirect to login); authenticated but not allowed → 403

## Q12: MVC
- Model = data + business logic; View = presentation; Controller = handles requests, calls model, picks view
- Mapping: Express routes/routers = controllers; Handlebars templates = views; `pg`/data-access modules = models
- Full credit for the mapping; tracing a request (controller → model → `res.render` with view + data) = bonus detail
- Views don't touch the DB

## Q13: Sessions table
- Core fields: `id` (PK), `token` (unique, random), `user_id` (FK), `expires_at`; `created_at` acceptable extra
- Login: insert row, set token in cookie
- Each request: look up token, check not expired, attach `userId` to request
- Logout/expiry: delete or invalidate row
- Cookie security: HttpOnly, HTTPS

## Q14: "Guarantee" data is never compromised
- Core: cannot guarantee; no system is perfectly secure
- Justifies risk reduction via defense in depth:
  - hashed + salted passwords, HTTPS, HttpOnly cookies, session expiry
  - authorization checks on every route; input validation
  - least privilege, updated dependencies, secrets out of git (`.env`)
- Little/no credit for claiming a single measure (e.g. bcrypt alone) guarantees safety
