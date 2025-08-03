// Import Express types
import { Request, Response } from 'express'
// Import AuthRequest interface để có type safety cho req.user
import { AuthRequest } from '../middlewares/auth.middleware'

/**
 * GET /api/me - Lấy thông tin user hiện tại
 * 
 * Protected route: Cần authentication token
 * req.user được set bởi verifyToken middleware
 */
export const getMe = (req: AuthRequest, res: Response) => {
  // req.user chứa decoded JWT payload: { id, email, iat, exp }
  res.json({ user: req.user })
}

/*
📖 Xem chi tiết tại: AUTHENTICATION_GUIDE.md
🔧 Response: { user: { id: 1, email: "user@example.com", iat: ..., exp: ... } }
*/
