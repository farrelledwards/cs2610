import express from 'express';
import { Recipe } from "./models/recipe.js";
import { RecipeController } from "./controllers/recipeController.js";

const app = express();


app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
