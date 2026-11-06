import express from 'express';
import { engine } from 'express-handlebars';

// Startup
const app = express();
app.engine('hbs', engine({ extname: '.hbs', defaultLayout: false }));
app.set('view engine', 'hbs');
app.set('views', './views');

// Static serving
app.use(express.static('public'));

// State lives in server memory, so it resets on restart
let count = 0;

// Routing
app.get('/', (req, res) => {
  res.render('home', { count });
});

app.post('/', (req, res) => {
  count++;
  res.render('home', { count });
});

// Let's go
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
