import express from 'express';
const router = express.Router();

import { Recipe } from '../models/recipes.js';
import { Favorite } from '../models/favorites.js';

router.get('/', async (req, res) => {
  res.render('recipes/index', {
    user: req.user,
    recipes: await Recipe.getAll(),
  });
});

router.get('/new', (req, res) => {
  res.render('recipes/new', {
    user: req.user
  });
});

router.get('/:id', async (req, res) => {
  const recipeId = req.params.id;
  const recipe = await Recipe.findById(req.params.id);
  await recipe.setFavorite(req.user.id);

  res.render('recipes/show', {
    user: req.user,
    recipe: recipe
  });
});

router.post('', async (req, res) => {
  req.body.user_id = req.user.id;
  const recipe = new Recipe(req.body);
  await recipe.save_new();
  res.redirect(`/recipes/${recipe.id}`);
});

//-------------------------------------------------------
// Authenticated (owner only)
//
router.get('/:id/edit', async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  res.render('recipes/edit', {
    user: req.user,
    recipe: recipe
  });
});

router.post('/:id', async (req, res) => {
  console.log(req.body);
  const recipe = new Recipe(req.body);
  recipe.id = req.params.id;
  recipe.user_id = req.user.id;
  await recipe.update();
  res.redirect(`/recipes/${req.params.id}`);
});

router.post('/:id/delete', (req, res) => {
    const recipeId = req.params.id;
    res.json({ message: `Delete recipe ${recipeId}` });
});

//-------------------------------------------------------
// Authenticated (anyone)
// 
router.post('/:id/rate', (req, res) => {
    const recipeId = req.params.id;
    res.json({ message: `Rate recipe ${recipeId}` });
});

router.post('/:id/favorite', async (req, res) => {
  const favorite = new Favorite(req.params.id, req.user.id);
  console.log(`${req.params.id}  ${req.user.id}`);
  await favorite.saveNew();
  res.redirect(`/recipes/${req.params.id}`);
});

router.post('/:id/unfavorite', async (req, res) => {
  await Favorite.unfavorite(req.params.id, req.user.id);
  res.redirect(`/recipes/${req.params.id}`);
});

export default router;
