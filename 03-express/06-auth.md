# Lecture: Auth

**Class:** CS 2610
**Date:** Oct. 26, 2026
**Modules:** 3.6

---

## Announce
- Weekend
- Schedule
  - Exam
  - Assignment
- Attendance

---


## Main hits
- Hash / Salt / bcrypt
- session / cookie
- Middleware
  - Session loader
  - require auth
  - Authentication (401 unauthorized)
- Authentication vs Authorization (403 forbidden)

## Overview

### Register
- User types in new password on client
- Transfer to server (username and password in post body)
- Create user in database
- Store plaintext

### Login
- User types in password on client
- Transfer to server (username and password in post body)
- Compare against plaintext stored
- Allow / disallow access

## Hash / Salt / bcrypt

### Hash
- Deterministic
- One way
- Collision resistant

### Salt solves problems

##### Precompute
Store millions of common passwords hashed in a lookup table (`rainbow table`).  Lookup instead of computation

##### Duplicates
Duplicate passwords are obvious because the hash is the same.  Crack one, you get the rest.

##### Each guess must be hashed

### Bcrypt

##### Create

```javascript
import bcrypt from 'bcrypt';

const saltRounds = 10;
const plainPassword = 'userChosenPassword123';
const hash = await bcrypt.hash(plainPassword, saltRounds);
// Store `hash` in the database (e.g. in a users table)
```

##### Compare 

```javascript
const passwordFromForm = 'userChosenPassword123';
const hashFromDatabase = '...'; // e.g. from your users table
const matches = await bcrypt.compare(passwordFromForm, hashFromDatabase);
if (matches) {
  // Password is correct; log the user in
} else {
  // Invalid password
}
```

## Sessions / cookies

Sessionless - Store somehow so we don't recompute every time

```sql
CREATE TABLE sessions (
  id SERIAL PRIMARY KEY,
  token TEXT UNIQUE NOT NULL,
  user_id INTEGER NOT NULL REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP
);
```


```javascript
res.cookie('session_token', token, {
  httpOnly: true,
  secure: true,
  sameSite: 'lax',
  maxAge: 1000 * 60 * 60 * 24, // 1 day
});
```

## Middleware

### Load session
```javascript
async function loadSession(req, res, next) {
  // 1. Read the session token from the cookie (e.g. req.cookies.session_token)
  // 2. If no token, set req.session = null and call next()
  // 3. Otherwise, look up the session by token in the sessions table
  // 4. If not found or expired, set req.session = null; else set req.session = { userId: row.user_id }
  // 5. Call next()
}
```

### requireAuth
```javascript
function requireAuth(req, res, next) {
  if (req.session && req.session.userId) {
    next(); // User is logged in; continue to the route
  } else {
    res.status(401).json({ error: 'You must be logged in to access this resource' });
    // Or: res.redirect('/login');
  }
}
```

#### Install the middleware (or not)
```javascript
app.get('/api/profile', requireAuth, (req, res) => {
  // Only logged-in users reach here; req.session.userId is set
  const userId = req.session.userId;
  // ... fetch and return profile for userId
});

app.get('/api/public', (req, res) => {
  // No requireAuth; anyone can access
  res.json({ message: 'Public data' });
});```

```javascript
router.use(requireAuth);
```

## Authentication vs Authorization
