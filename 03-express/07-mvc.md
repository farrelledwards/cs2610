# Lecture: MVC

**Class:** CS 2610
**Date:** Oct. 28, 2026
**Modules:** 3.7

## Schedule

| Date | Item |
|----|----|
| Oct 28 | MVC |
| Oct 28 | Exam 2 scores |
| Oct 30 | Assn 3 Lab | 
| Nov 2 | Assn 3 Lab |
| Nov 4 | Assn 3 Lab |
| Nov 4 | (Wed) - Assignment 3 due |

## Restaurant

## MVC
- Separation of concerns
- Model is independent
- View is passive
- Controller is precise
- Communication is well defined

### Why bother
- Swap one part without impacting others
- Easier to find things
- Easier to test (including automated testing) and share

### Mantra

**The view never talks to the database**
**The model doesn't know about html (or req or res)**


## Project layout

```
├── server.js              # Main entry point
├── package.json
├── .env                   # Environment variables (DB connection, etc.)
├── migrate.js             # Migration script (reads migrations/*.sql, applies unapplied)
├── migrations/            # SQL migration files (e.g. 001_initial_schema.sql)
│   └── *.sql
├── controllers/
│   ├── recipes.js         # Recipe routes (controllers for recipe endpoints)
│   ├── users.js           # User/auth routes (controllers for auth endpoints)
│   └── favorites.js       # Favorite routes
├── models/
│   ├── recipes.js         # Recipe model/data-access functions
│   └── users.js           # User model/data-access functions
│   └── *.js               # your other model files as necessary
├── middleware/
│   ├── auth.js            # Authentication middleware
│   └── errorHandler.js    # Error handling middleware
├── db/
│   └── connection.js      # Database connection
├── views/
│   ├── layouts/
│   │   └── main.hbs
│   ├── home.hbs
│   ├── recipes/
│   │   ├── index.hbs
│   │   ├── show.hbs
│   │   ├── new.hbs
│   │   └── edit.hbs
│   ├── users/
│   │   ├── login.hbs
│   │   ├── register.hbs
│   │   └── show.hbs
│   ├── favorites.hbs
│   ├── my-recipes.hbs
│   ├── not-found.hbs
│   └── unauthorized.hbs
└── public/
    ├── css/
    │   └── style.css
    └── js/
        └── (any client-side JavaScript)
```

## Understanding check

1. A bug: the page shows the wrong todos. Which file do you open first? (Likely the model, or the controller if it passes the wrong data.)
2. You want the same data as JSON for a mobile app. What changes? (Only the controller: res.json(todos) instead of res.render. The model is untouched.)
3. You switch from Postgres to another database. Which layer changes? (Only the model.)
4. A designer wants a new layout. Which layer changes? (Only the view.)
