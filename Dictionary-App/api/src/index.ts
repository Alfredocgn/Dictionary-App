import express from 'express'
import { router } from './routes'


const app = express()
const port = 3001

app.use('/', router)

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})
