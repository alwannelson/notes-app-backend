import express from 'express'
import routes from './routes.js'
import cors from 'cors'

const app = express()

const PORT = 2000
const URL = `http://localhost:${PORT}`

app.use(cors({
    origin: '*'
}))

app.use(express.json())

app.use('/', routes)

app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING \naccess at ${URL}`)
})