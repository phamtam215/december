// Import Express types
import { Request, Response, NextFunction } from 'express'
// Import JWT library để verify token
import jwt from 'jsonwebtoken'

/**
 * Extend Request interface để thêm user property
 * Sau khi verify token thành công, user info sẽ được attach vào req.user
 */
export interface AuthRequest extends Request {
  user?: any // User info từ JWT payload (id, email, etc.)
}

/**
 * Authentication middleware để verify JWT token cho protected routes
 * Usage: router.get('/profile', verifyToken, controller)
 */
export const verifyToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  // Extract Authorization header: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6..."
  const authHeader = req.headers.authorization

  // Split để lấy token (bỏ "Bearer " prefix)
  const token = authHeader?.split(' ')[1]

  // Nếu không có token -> User chưa login
  if (!token) {
    return res.status(401).json({ message: 'No token provided' })
  }

  try {
    // Verify token signature và expiration
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string)

    // Token hợp lệ -> Attach user info vào request
    req.user = decoded // { id: 1, email: "user@example.com", iat: ..., exp: ... }

    // Cho phép request tiếp tục đến controller
    next()
  } catch (err) {
    // Token invalid (expired, wrong signature, malformed)
    return res.status(401).json({ message: 'Invalid token' })
  }
}

/*
📖 Xem chi tiết tại: AUTHENTICATION_GUIDE.md
🔧 Usage: import { verifyToken } from './middlewares/auth.middleware'
*/
