import express from 'express';
const router = express.Router();

router.get('/users/:id', (req, res) => {
  res.render('users/show');
});

router.get('/login', (req, res) => {
  res.render('users/login');
});

router.post('/login', (req, res) => {
  res.cookie('username', 'farrell', {
    maxAge: 60 * 1000, // 1 minute in milliseconds
    httpOnly: true,              // Blocks client-side JS access
    secure: process.env.NODE_ENV === 'production', // true in production (HTTPS)
    sameSite: 'lax'              // CSRF protection
  }); 
  res.redirect('/');
});

router.get('/register', (req, res) => {
  res.render('users/register');
});

router.post('/register', (req, res) => {
  res.cookie('username', 'farrell', {
    maxAge: 60 * 1000, // 1 minute in milliseconds
    httpOnly: true,              // Blocks client-side JS access
    secure: process.env.NODE_ENV === 'production', // true in production (HTTPS)
    sameSite: 'lax'              // CSRF protection
  }); 
  res.redirect('/');
});

router.get('/favorites', (req, res) => {
  res.render('favorites');
});

router.get('/my-recipes', (req, res) => {
  res.render('my-recipes');
});

router.post('/logout', (req, res) => {
});


export default router;
