import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes'
import errorHandler from './middlewares/error.middleware'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api', authRoutes)
app.use(errorHandler)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`)
})
