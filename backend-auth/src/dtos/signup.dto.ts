// Import validation decorators từ class-validator
import { IsEmail, MinLength } from 'class-validator'

/**
 * Data Transfer Object cho signup request
 *
 * Validation rules:
 * - email: Phải là email hợp lệ
 * - password: Tối thiểu 6 ký tự
 *
 * Usage: POST /api/signup với validateDto(SignupDto) middleware
 */
export class SignupDto {
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string

  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string
}

/*
📖 Xem chi tiết tại: AUTHENTICATION_GUIDE.md
🔧 Usage: validateDto(SignupDto) middleware sẽ validate request body
🔧 Error response: 400 với chi tiết validation errors
*/
