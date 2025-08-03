// Import Express types
import { Request, Response } from 'express'
// Import AuthRequest interface để có type safety cho req.user
import { AuthRequest } from '../middlewares/auth.middleware'
// Import AppDataSource để truy cập database
import { AppDataSource } from '../data-source'
// Import User entity
import { User } from '../entities/User'

/**
 * GET /api/me - Lấy thông tin user hiện tại từ database
 *
 * Protected route: Cần authentication token
 * req.user được set bởi verifyToken middleware
 */
export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    // Lấy User repository từ AppDataSource
    const userRepo = AppDataSource.getRepository(User)

    // Tìm user theo ID từ JWT token payload
    // req.user.id được decode từ JWT token
    const user = await userRepo.findOne({
      where: { id: req.user.id },
      select: ['id', 'email', 'createdAt', 'role'] // Không trả password
    })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json({ user })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
}

/*
📖 Xem chi tiết tại: AUTHENTICATION_GUIDE.md
🔧 Response: { user: { id: 1, email: "user@example.com", createdAt: "2025-08-03T..." } }
*/
