// Import types từ Express để type safety
import { Request, Response } from 'express'
// Import database connection
import { AppDataSource } from '../data-source'
// Import User entity để truy vấn database
import { User } from '../entities/User'
// Import JWT utility để tạo access token
import { signToken } from '../utils/jwt'

// Controller xử lý đăng nhập
export const login = async (req: Request, res: Response) => {
  // Destructure email và password từ request body
  const { email, password } = req.body

  // Lấy User repository để thao tác với bảng users
  const userRepo = AppDataSource.getRepository(User)

  // Tìm user theo email trong database
  // findOneBy() trả về null nếu không tìm thấy
  const user = await userRepo.findOneBy({ email })

  // Kiểm tra user tồn tại và password đúng
  // TODO: So sánh với hashed password trong production
  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  // Tạo JWT token với user info
  // Payload chứa id và email để identify user
  const token = signToken({ id: user.id, email: user.email })

  // Trả về token cho client
  return res.json({ token })
}

/*
SECURITY NOTES cho fresher:
- Không bao giờ so sánh plain text password trong production
- Phải hash password với bcrypt trước khi lưu DB
- JWT token nên có expiration time
- Cần validate input để tránh injection attacks
*/
