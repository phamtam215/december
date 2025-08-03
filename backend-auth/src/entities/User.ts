// Import reflect-metadata để TypeORM decorators hoạt động
import 'reflect-metadata'
import {
  Entity, // Decorator đánh dấu class này là một database table
  PrimaryGeneratedColumn, // Tự động tạo ID primary key
  Column, // Đánh dấu field là column trong database
  CreateDateColumn, // Tự động set timestamp khi tạo record
  OneToMany
} from 'typeorm'
// Import validation decorators từ class-validator
import { IsEmail, MinLength } from 'class-validator'
import { Post } from './Post'

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin'
}

/**
 * User Entity - Đại diện cho bảng "user" trong PostgreSQL
 *
 * Entity này kết hợp:
 * - TypeORM decorators: Để mapping với database
 * - class-validator decorators: Để validate input data
 *
 * DESIGN PATTERN: Active Record + Validation
 */
@Entity() // Biến class này thành bảng "user" trong PostgreSQL
export class User {
  // Primary key tự động tăng - equivalent to SERIAL in PostgreSQL
  @PrimaryGeneratedColumn()
  id: number

  // VARCHAR column với constraint UNIQUE + Email validation
  @Column({ unique: true }) // TypeORM: Database constraint
  @IsEmail() // class-validator: Input validation
  email: string

  // VARCHAR column để lưu password + Length validation
  @Column() // TypeORM: Database column
  @MinLength(6) // class-validator: Minimum 6 characters
  password: string

  // Enum column để lưu role của user (USER hoặc ADMIN)
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER // Mặc định là USER role
  })
  role: UserRole

  // One-to-Many relationship với Post entity
  @OneToMany(() => Post, post => post.author)
  posts: Post[]

  // Timestamp tự động được tạo khi INSERT record
  // TypeORM sẽ tự động set thời gian hiện tại
  @CreateDateColumn()
  createdAt: Date
}

/*
ARCHITECTURE NOTES cho fresher:

1. DUAL PURPOSE ENTITY:
   - Database Entity (TypeORM) ✅
   - Validation DTO (class-validator) ✅
   - Một class phục vụ 2 mục đích

2. DATABASE MAPPING:
   - @Entity() → Table "user"
   - @PrimaryGeneratedColumn() → id SERIAL PRIMARY KEY
   - @Column({ unique: true }) → email VARCHAR UNIQUE
   - @Column() → password VARCHAR
   - @CreateDateColumn() → createdAt TIMESTAMP DEFAULT NOW()

3. VALIDATION RULES:
   - @IsEmail() → Kiểm tra format email hợp lệ
   - @MinLength(6) → Password tối thiểu 6 ký tự
   - Validation chạy khi dùng với validateDto() middleware

4. SECURITY CONSIDERATIONS:
   - Password sẽ được hash trước khi lưu DB (trong controller)
   - Email unique constraint tránh duplicate users
   - createdAt timestamp để audit trail

5. BEST PRACTICES:
   - Entity đơn giản, chỉ chứa data structure
   - Business logic nên ở Service layer
   - Validation ở Entity level cho reusability
   - Database constraints + Application validation = Defense in depth

EXAMPLE SQL GENERATED:
CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY,
  "email" VARCHAR UNIQUE NOT NULL,
  "password" VARCHAR NOT NULL,
  "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL
);
*/
