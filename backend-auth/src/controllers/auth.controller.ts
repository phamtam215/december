// Import types từ Express để type safety
import { Request, Response } from 'express'
// Import database connection
import { AppDataSource } from '../data-source'
// Import User entity để truy vấn database
import { User } from '../entities/User'
// Import JWT utility để tạo access token
import { signToken } from '../utils/jwt'
// Import bcrypt để hash và compare password
import bcrypt from 'bcrypt'
// Import DTO để validate signup data (nếu có)
import { SignupDto } from '../dtos/signup.dto'

/**
 * Controller xử lý đăng nhập
 * Authenticate user với email/password và trả về JWT token
 */
export const login = async (req: Request, res: Response) => {
  // Destructure email và password từ request body
  const { email, password } = req.body

  // Lấy User repository để thao tác với bảng users
  const userRepo = AppDataSource.getRepository(User)

  // Tìm user theo email trong database
  // findOneBy() trả về null nếu không tìm thấy
  const user = await userRepo.findOneBy({ email })

  // Kiểm tra user tồn tại và password đúng
  // bcrypt.compare() so sánh plain password với hashed password
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  // Tạo JWT token với user info
  // Payload chứa id và email để identify user
  const token = signToken({ id: user.id, email: user.email, role: user.role })

  // Trả về token cho client
  // MỤC ĐÍCH CỦA JWT TOKEN:
  // 1. STATELESS AUTHENTICATION: Client lưu token, không cần server lưu session
  // 2. AUTHORIZATION: Client gửi token trong header để truy cập protected routes
  // 3. USER IDENTIFICATION: Server decode token để biết user nào đang request
  // 4. SCALABILITY: Không cần shared session store giữa multiple servers
  // 5. MOBILE/SPA FRIENDLY: Dễ dàng sử dụng với React, Vue, Mobile apps
  return res.json({ token })
}

/**
 * Controller xử lý đăng ký tài khoản mới
 * Tạo user mới với password đã hash
 */
export const signup = async (req: Request, res: Response) => {
  // Lấy thông tin từ request body
  const { email, password } = req.body
  const userRepo = AppDataSource.getRepository(User)

  // Kiểm tra email đã tồn tại chưa
  const existing = await userRepo.findOneBy({ email })
  if (existing) return res.status(409).json({ message: 'User already exists' })

  // Hash password với salt rounds = 10
  // Không bao giờ lưu plain text password vào database
  const hashed = await bcrypt.hash(password, 10)

  // Tạo user instance với password đã hash
  const user = userRepo.create({ email, password: hashed })

  // Lưu user vào database
  await userRepo.save(user)

  // Trả về success response (không trả token, client phải login)
  return res.status(201).json({ message: 'User created' })
}

/*
SECURITY NOTES cho fresher:

1. PASSWORD SECURITY:
   - Không bao giờ so sánh plain text password trong production ❌
   - Luôn hash password với bcrypt trước khi lưu DB ✅
   - Salt rounds = 10 là đủ cho hầu hết application
   - bcrypt.compare() tự động handle salt

2. JWT TOKEN:
   - JWT token nên có expiration time (1h - 24h)
   - Payload chỉ chứa thông tin cần thiết (id, email)
   - Không lưu sensitive data trong JWT

3. INPUT VALIDATION:
   - Cần validate input để tránh injection attacks
   - Sử dụng DTO + class-validator middleware
   - Sanitize input trước khi xử lý

4. ERROR HANDLING:
   - Không expose chi tiết lỗi database cho client
   - Generic error messages để tránh information disclosure
   - Log chi tiết error cho debugging

5. HTTP STATUS CODES:
   - 401: Unauthorized (wrong credentials)
   - 409: Conflict (user already exists)
   - 201: Created (signup success)
   - 200: OK (login success)

=== JWT TOKEN WORKFLOW CHO FRESHER ===

🔐 AUTHENTICATION FLOW:
1. User login với email/password
2. Server verify credentials
3. Server tạo JWT token và trả về client
4. Client lưu token (localStorage, sessionStorage, cookie)

🛡️ AUTHORIZATION FLOW:
1. Client muốn truy cập protected route (ví dụ: /api/profile)
2. Client gửi request với Authorization header: "Bearer <token>"
3. Server verify JWT token (signature + expiration)
4. Server extract user info từ token payload
5. Server xử lý request với context của user đó

📱 PRACTICAL EXAMPLE:

// Client side (React/Vue/Mobile):
const login = async (email, password) => {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  const { token } = await response.json()
  localStorage.setItem('token', token) // Lưu token
}

const getProfile = async () => {
  const token = localStorage.getItem('token')
  const response = await fetch('/api/profile', {
    headers: { 'Authorization': `Bearer ${token}` } // Gửi token
  })
  return response.json()
}

// Server side (Express middleware):
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1] // Extract token
  if (!token) return res.status(401).json({ message: 'No token' })
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET) // Verify token
    req.user = decoded // Attach user info to request
    next()
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token' })
  }
}

🎯 BENEFITS OF JWT:
- Stateless: Server không cần lưu session
- Scalable: Hoạt động tốt với multiple servers
- Self-contained: Token chứa tất cả info cần thiết
- Cross-domain: Hoạt động với CORS, microservices
- Mobile-friendly: Dễ implement với mobile apps

⚠️ JWT CONSIDERATIONS:
- Token size: Không nên chứa quá nhiều data
- Security: Phải có strong secret key
- Expiration: Luôn set exp time để giảm risk
- Storage: Client cần bảo vệ token khỏi XSS attacks
*/
