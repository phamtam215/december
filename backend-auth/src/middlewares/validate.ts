// Import class-transformer để convert plain object thành class instance
import { plainToInstance } from 'class-transformer'
// Import class-validator để validate dữ liệu theo decorators
import { validate } from 'class-validator'
// Import Express types cho middleware
import { Request, Response, NextFunction } from 'express'

/**
 * Middleware factory để validate request body theo DTO class
 *
 * @param dtoClass - Class DTO có các validation decorators (@IsEmail, @IsNotEmpty, etc.)
 * @returns Express middleware function
 *
 * CÁCH HOẠT ĐỘNG:
 * 1. Convert plain object (req.body) thành instance của DTO class
 * 2. Chạy validation theo các decorators trong DTO
 * 3. Nếu có lỗi: trả về 400 với chi tiết lỗi
 * 4. Nếu OK: chuyển sang middleware tiếp theo
 */
export function validateDto(dtoClass: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Chuyển đổi plain object thành class instance
    // Cần thiết để class-validator có thể đọc decorators
    const instance = plainToInstance(dtoClass, req.body)

    // Validate instance theo các decorator rules
    // validate() trả về array các ValidationError
    const errors = await validate(instance)

    // Nếu có lỗi validation
    if (errors.length > 0) {
      return res.status(400).json({
        message: 'Validation failed',
        // Format lỗi thành dạng dễ đọc cho client
        errors: errors.map(e => ({
          property: e.property, // Tên field bị lỗi
          constraints: e.constraints // Chi tiết các rule bị vi phạm
        }))
      })
    }

    // Validation thành công, chuyển sang middleware/controller tiếp theo
    next()
  }
}

/*
USAGE EXAMPLE cho fresher:

// 1. Tạo DTO class với validation decorators
class LoginDto {
  @IsEmail()
  email: string

  @IsNotEmpty()
  @MinLength(6)
  password: string
}

// 2. Sử dụng middleware trong route
router.post('/login', validateDto(LoginDto), loginController)

// 3. Khi request body không hợp lệ:
// POST /login { "email": "invalid", "password": "123" }
// Response: 400 {
//   "message": "Validation failed",
//   "errors": [
//     { "property": "email", "constraints": { "isEmail": "email must be an email" } },
//     { "property": "password", "constraints": { "minLength": "password must be longer than or equal to 6 characters" } }
//   ]
// }
*/
