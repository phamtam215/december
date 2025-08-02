// Import reflect-metadata để TypeORM decorators hoạt động
import 'reflect-metadata'
import {
  Entity, // Decorator đánh dấu class này là một database table
  PrimaryGeneratedColumn, // Tự động tạo ID primary key
  Column, // Đánh dấu field là column trong database
  CreateDateColumn // Tự động set timestamp khi tạo record
} from 'typeorm'

// @Entity() biến class này thành bảng "user" trong PostgreSQL
@Entity()
export class User {
  // Primary key tự động tăng - equivalent to SERIAL in PostgreSQL
  @PrimaryGeneratedColumn()
  id: number

  // VARCHAR column với constraint UNIQUE
  // { type: 'varchar' } chỉ định kiểu dữ liệu rõ ràng
  @Column({ type: 'varchar', unique: true })
  email: string

  // VARCHAR column để lưu password (sẽ hash trong production)
  @Column({ type: 'varchar' })
  password: string

  // Timestamp tự động được tạo khi INSERT record
  // TypeORM sẽ tự động set thời gian hiện tại
  @CreateDateColumn()
  createdAt: Date
}
