import express from 'express';
import { engine } from 'express-handlebars';

const PORT = 3000
const VITE_ORIGIN = "http://localhost:5173"

// Startup
const app = express();
app.engine('hbs', engine({ extname: '.hbs', defaultLayout: false }));
app.set('view engine', 'hbs');
app.set('views', './views');

// Static serving
app.use((req, res, next) => {
  if (req.path.includes(".")) {
    return res.redirect(`${VITE_ORIGIN}${req.path}`)
  }
  next();
});

// State lives in server memory, so it resets on restart
let count = 0;

// Routing
app.get('/', (req, res) => {
  res.render('index', { viteOrigin : VITE_ORIGIN });
});

app.post('/', (req, res) => {
  count++;
  res.render('index', { viteOrigin : VITE_ORIGIN });
});

// Let's go
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
