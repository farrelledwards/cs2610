import express from 'express';
import cookieParser from 'cookie-parser';
import { engine } from 'express-handlebars';
import recipeRouter from './controllers/recipes.js';
import userRouter from './controllers/users.js';
import loggingMiddleware from './middleware/logging.js';

const app = express();
app.engine('hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', './views');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('home');
});

// Middleware
app.use(cookieParser());
app.use(loggingMiddleware);

app.use('/recipes', recipeRouter);
app.use('/', userRouter);

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});

