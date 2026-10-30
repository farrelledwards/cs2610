import express from 'express';
import cookieParser from 'cookie-parser';
import { engine } from 'express-handlebars';
import recipeRouter from './controllers/recipes.js';
import userRouter from './controllers/users.js';
import loggingMiddleware from './middleware/logging.js';
import sessionMiddleware from './middleware/session.js';

// Startup
const app = express();
app.engine('hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', './views');

// Static serving
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Middleware
app.use(cookieParser());
app.use(sessionMiddleware);
app.use(loggingMiddleware);

// Routing
app.get('/', (req, res) => {
  res.render('home', {
    user: req.user
  });
});

app.use('/recipes', recipeRouter);
app.use('/', userRouter);

// Let's go
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});

