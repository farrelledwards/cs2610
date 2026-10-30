import express from 'express';
import database from '../db/connection.js';
import User from '../models/users.js';
import { Recipe } from '../models/recipes.js';
import { setSession } from './sessions.js';
const router = express.Router();

router.get('/users/:id', async (req, res) => {
  console.log(`User id: ${req.user.id}`);
  const recipes = await Recipe.findByUserId(req.user.id);
  res.render('users/show', {
    user: req.user,
    profile: req.user,
    recipes: recipes
  });
});

router.get('/login', (req, res) => {
  res.render('users/login');
});

router.post('/login', async (req, res) => {
  const result = await database.query(`SELECT * FROM users WHERE username = $1`, [req.body.username]);
  
  if (result.rows.length == 0) {
    res.redirect('/register');
    return;
  }
  await setSession(result.rows[0].id, req, res);
  res.redirect('/');
});

router.get('/register', (req, res) => {
  res.render('users/register');
});

router.post('/register', async (req, res) => {
  await database.query('INSERT INTO users (username, password_hash, email) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING',
                       [req.body.username, req.body.password, req.body.email]);
  const result = await database.query('SELECT * FROM users WHERE username = $1', [req.body.username]);

  console.log(`Registered user ${result.rows[0].username} as ${result.rows[0].id}`);

  await setSession(result.rows[0].id, req, res);

  res.redirect('/');
});

router.get('/favorites', async (req, res) => {
  res.render('favorites', {
    user: req.user,
    recipes: await Recipe.findByUserId(req.user.id, true)
  });
});

router.get('/my-recipes', async (req, res) => {
  res.render('my-recipes', {
    user: req.user,
    recipes: await Recipe.findByUserId(req.user.id)
  });
});

router.post('/logout', async (req, res) => {
  res.clearCookie('session');
  await database.query(`DELETE FROM sessions WHERE user_id = $1`, [req.user.id]);
  res.redirect("/");
});


export default router;
