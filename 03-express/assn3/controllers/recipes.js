import express from 'express';
const router = express.Router();

import { Recipe } from '../models/recipes.js';

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
  console.log(recipe);
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
router.get('/:id/edit', (req, res) => {
    const recipeId = req.params.id;
    res.json({ message: `Get form to edit recipe ${recipeId}` });
});

router.post('/:id', (req, res) => {
    const recipeId = req.params.id;
    res.json({ message: `Update recipe ${recipeId}` });
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

router.post('/:id/favorite', (req, res) => {
    const recipeId = req.params.id;
    res.json({ message: `Add / remove recipe favorite ${recipeId}` });
});

export default router;
