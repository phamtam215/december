// Import reflect-metadata để TypeORM decorators hoạt động
import 'reflect-metadata'
import {
  Entity, // Decorator đánh dấu class này là một database table
  PrimaryGeneratedColumn, // Tự động tạo ID primary key
  Column, // Đánh dấu field là column trong database
  ManyToOne // Relationship decorator: nhiều posts thuộc về một user
} from 'typeorm'
// Import User entity để tạo relationship
import { User } from './User'

/**
 * Post Entity - Đại diện cho bảng "post" trong PostgreSQL
 *
 * RELATIONSHIPS:
 * - Many Posts belong to One User (ManyToOne)
 * - User has Many Posts (OneToMany trong User entity)
 *
 * DESIGN PATTERN: Active Record với Foreign Key relationship
 */
@Entity() // Biến class này thành bảng "post" trong PostgreSQL
export class Post {
  // Primary key tự động tăng
  @PrimaryGeneratedColumn()
  id: number

  // VARCHAR column để lưu tiêu đề bài viết
  @Column()
  title: string

  // TEXT column để lưu nội dung bài viết (có thể dài)
  @Column({ type: 'text' })
  content: string

  // Foreign key relationship với User entity
  // Một user có thể có nhiều posts, nhưng mỗi post chỉ thuộc về một user
  @ManyToOne(() => User, user => user.posts)
  author: User // Tự động tạo column "authorId" trong database
}

/*
📖 Xem chi tiết tại: AUTHENTICATION_GUIDE.md
🔧 Generated SQL:
CREATE TABLE "post" (
  "id" SERIAL PRIMARY KEY,
  "title" VARCHAR NOT NULL,
  "content" TEXT NOT NULL,
  "authorId" INTEGER REFERENCES "user"("id")
);
*/
