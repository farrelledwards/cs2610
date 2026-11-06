import express from 'express';
const router = express.Router();

import { Recipe } from '../models/recipes.js';
import { Favorite } from '../models/favorites.js';
import requireAuth from '../middleware/requireAuth.js';

router.get('/', async (req, res) => {
  res.render('recipes/index', {
    user: req.user,
    recipes: await Recipe.getAll(),
  });
});

router.get('/:id', async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  await recipe.setFavorite(req.user ? req.user.id : null);

  res.render('recipes/show', {
    user: req.user,
    recipe: recipe
  });
});

//-------------------------------------------------------
// Authenticated (owner only)
//
async function matchUser() {
};

router.get('/:id/edit', requireAuth, async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  if (recipe.user_id != req.user.id) {
    res.status(403).json({
      status: 'error',
      message: 'Access denied.'
    });
    return;
  }
  res.render('recipes/edit', {
    user: req.user,
    recipe: recipe
  });
});

router.post('/:id', requireAuth, async (req, res) => {
  console.log(req.body);
  const recipe = new Recipe(req.body);
  recipe.id = req.params.id;
  if (recipe.user_id != req.user.id) {
    res.status(403).json({
      status: 'error',
      message: 'Access denied.'
    });
    return;
  }

  recipe.user_id = req.user.id;
  await recipe.update();
  res.redirect(`/recipes/${req.params.id}`);
});

router.post('/:id/delete', (req, res) => {
  // Add user auth here
  const recipeId = req.params.id;
  res.json({ message: `Delete recipe ${recipeId}` });
});

//-------------------------------------------------------
// Authenticated (anyone)
// 
router.get('/new', requireAuth, (req, res) => {
  res.render('recipes/new', {
    user: req.user
  });
});

router.post('', requireAuth, async (req, res) => {
  req.body.user_id = req.user.id;
  const recipe = new Recipe(req.body);
  await recipe.save_new();
  res.redirect(`/recipes/${recipe.id}`);
});

router.post('/:id/rate', requireAuth, (req, res) => {
  const recipeId = req.params.id;
  res.json({ message: `Rate recipe ${recipeId}` });
});

router.post('/:id/favorite', requireAuth, async (req, res) => {
  const favorite = new Favorite(req.params.id, req.user.id);
  console.log(`${req.params.id}  ${req.user.id}`);
  await favorite.saveNew();
  res.redirect(`/recipes/${req.params.id}`);
});

router.post('/:id/unfavorite', requireAuth, async (req, res) => {
  await Favorite.unfavorite(req.params.id, req.user.id);
  res.redirect(`/recipes/${req.params.id}`);
});

export default router;
