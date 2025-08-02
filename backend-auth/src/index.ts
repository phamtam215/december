// Import reflect-metadata đầu tiên để TypeORM decorators hoạt động
import 'reflect-metadata'
// Import Express framework
import express from 'express'
// Import CORS middleware để handle cross-origin requests
import cors from 'cors'
// Import database connection configuration
import { AppDataSource } from './data-source'
// Import auth routes
import authRoutes from './routes/auth.routes'

// Tạo Express application instance
const app = express()

// Middleware setup
app.use(cors()) // Enable CORS cho tất cả routes
app.use(express.json()) // Parse JSON request body

// Routes setup
app.use('/api', authRoutes) // Mount auth routes tại /api prefix

// Database connection và server startup
AppDataSource.initialize()
  .then(() => {
    console.log('📦 Data Source initialized')
    // Chỉ start server sau khi database đã kết nối thành công
    app.listen(4000, () => console.log('🚀 Server running on port 4000'))
  })
  .catch(err => {
    // Log error và exit process nếu không kết nối được database
    console.error('❌ DB connection error:', err)
    process.exit(1)
  })

/*
ARCHITECTURE NOTES cho fresher:
1. reflect-metadata phải import đầu tiên
2. Database connection phải thành công trước khi start server
3. Middleware được apply theo thứ tự từ trên xuống
4. Error handling để app không crash khi DB lỗi
5. Port 4000 cho development, production sẽ dùng process.env.PORT
*/
