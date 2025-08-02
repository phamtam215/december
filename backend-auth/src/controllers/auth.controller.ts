import { Request, Response, NextFunction } from 'express'
import { signToken } from '../utils/jwt'

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body

  // giả lập: chỉ chấp nhận 1 user
  if (email === 'admin@example.com' && password === '123456') {
    const token = signToken({ email })
    return res.json({ token })
  }

  return res.status(401).json({ message: 'Invalid credentials' })
}
