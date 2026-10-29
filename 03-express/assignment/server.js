import express from 'express';
import { engine } from 'express-handlebars';
import recipeRouter from './controllers/recipes.js';

const app = express();
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use('/recipes', recipeRouter);

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
