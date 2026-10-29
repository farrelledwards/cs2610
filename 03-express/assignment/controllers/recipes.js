import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: `Get all recipes` });
});

router.get('/:id', (req, res) => {
    const recipeId = req.params.id;
    res.json({ message: `Get recipe ${recipeId}` });
});

router.get('/new', (req, res) => {
    res.json({ message: `Get recipe form` });
});

router.post('', (req, res) => {
    res.json({ message: `Post recipe` });
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

router.post('/:id', (req, res) => {
    const recipeId = req.params.id;
    res.json({ message: `Update recipe ${recipeId}` });
});

router.post('/:id/delete', (req, res) => {
    const recipeId = req.params.id;
    res.json({ message: `Delete recipe ${recipeId}` });
});

/*GET /favorites - View the current user's favorite recipes
GET /my-recipes - View the current user's own recipes
POST /logout - Logout*/

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
