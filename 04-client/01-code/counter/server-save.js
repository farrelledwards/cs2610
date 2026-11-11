// server.js (development: serve HTML that loads JS from Vite)
import express from 'express'
import { create } from 'express-handlebars'

const app = express()
const PORT = 3000
const VITE_ORIGIN = 'http://localhost:5173'

const hbs = create({ defaultLayout: false })
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')
app.set('views', 'views')

app.use(express.json())

app.get('/', (req, res) => {
  res.render('index', { viteOrigin: VITE_ORIGIN })
})

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Express' })
})

app.listen(PORT, () => {
  console.log(`App at http://localhost:${PORT} (HTML from Express, JS from Vite)`)
})
