// Import Express Router
import { Router } from 'express'
// Import user controller
import { getMe } from '../controllers/user.controller'
// Import authentication & authorization middlewares
import { verifyToken } from '../middlewares/auth.middleware'
import { authorize } from '../middlewares/authorize.middleware'
import { User, UserRole } from '../entities/User'
import { getRepository } from 'typeorm'
import { AppDataSource } from '../data-source'

const router = Router()

// 🔒 GET /api/me - Lấy thông tin user hiện tại (Protected route)
// Chỉ cần authentication, không cần authorization (user có thể xem info của mình)
router.get('/me', verifyToken, getMe)

// 🔒 GET /api/users - Lấy danh sách tất cả users (Admin only)
// Yêu cầu: Authentication + ADMIN role
router.get(
  '/users',
  verifyToken,
  authorize([UserRole.ADMIN]),
  async (req, res) => {
    const userRepo = AppDataSource.getRepository(User)
    // Lấy tất cả users, không trả password
    const users = await userRepo.find({
      select: ['id', 'email', 'createdAt', 'role'], // Không trả
      // password để bảo mật
      order: { createdAt: 'DESC' } // Sắp xếp theo thời gian tạo
    })
    res.json(users)
  }
)

// 🔒 DELETE /api/users/:id - Xóa user theo ID (Admin only)
// Yêu cầu: Authentication + ADMIN role
router.delete(
  '/users/:id',
  verifyToken,
  authorize([UserRole.ADMIN]),
  async (req, res) => {
    res.json({ message: `Admin route - Delete user ${req.params.id}` })
  }
)

// 🔒 GET /api/profile - Protected route cho cả USER và ADMIN
// Chỉ cần authentication, không phân biệt role
router.get(
  '/profile',
  verifyToken,
  authorize([UserRole.USER, UserRole.ADMIN]),
  async (req, res) => {
    res.json({ message: 'User or Admin can access this' })
  }
)

export default router

/*
📖 Xem chi tiết tại: AUTHENTICATION_GUIDE.md
🔧 Usage: GET /api/me với Authorization: Bearer <token>
🔧 Note: Removed admin authorization - any authenticated user can view their own profile
*/
