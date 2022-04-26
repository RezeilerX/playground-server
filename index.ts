import express from 'express'
import routes from 'routes'
import { PORT } from 'config'

const app = express()

app.use('/api', routes)

app.listen(PORT, () => {
  console.log('Estamos en vivo')
})
