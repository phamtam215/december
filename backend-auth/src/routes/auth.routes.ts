// Import Express Router
import { Router } from 'express'
// Import authentication controllers
import { login, signup } from '../controllers/auth.controller'
// Import validation middleware
import { validateDto } from '../middlewares/validate'
// Import DTO class để validate signup data
import { SignupDto } from '../dtos/signup.dto'

const router = Router()

// 🟢 POST /api/login - Public route
// User đăng nhập với email/password, nhận JWT token
router.post('/login', login)

// 🟢 POST /api/signup - Public route với validation
// Validate input trước khi chạy signup controller
router.post('/signup', validateDto(SignupDto), signup)

export default router

/*
📖 Xem chi tiết tại: AUTHENTICATION_GUIDE.md
🔧 Public routes - Không cần authentication token
🔧 /api/me route đã move sang user.routes.ts (better organization)
*/
