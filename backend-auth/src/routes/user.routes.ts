// Import Express Router
import { Router } from 'express'
// Import user controller
import { getMe } from '../controllers/user.controller'
// Import authentication middleware
import { verifyToken } from '../middlewares/auth.middleware'

const router = Router()

// 🔒 GET /api/me - Lấy thông tin user hiện tại (Protected route)
// Cần authentication token để truy cập
router.get('/me', verifyToken, getMe)

export default router

/*
📖 Xem chi tiết tại: AUTHENTICATION_GUIDE.md
🔧 Usage: GET /api/me với Authorization: Bearer <token>
*/
