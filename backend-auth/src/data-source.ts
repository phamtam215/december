// Import TypeORM DataSource để cấu hình database connection
import { DataSource } from 'typeorm'
// Import User entity để TypeORM biết có những bảng nào
import { User } from './entities/User'
// Import dotenv để đọc biến môi trường từ file .env
import * as dotenv from 'dotenv'

// Load các biến môi trường từ file .env
dotenv.config()

// Cấu hình kết nối PostgreSQL database
export const AppDataSource = new DataSource({
  type: 'postgres', // Loại database: PostgreSQL
  host: 'localhost', // Server database (local development)
  port: 5432, // Port mặc định của PostgreSQL
  username: process.env.DB_USER || 'phamtam', // Username PostgreSQL
  password: process.env.DB_PASSWORD || '', // Password (empty for local dev)
  database: process.env.DB_NAME || 'myapp_dev', // Tên database
  synchronize: true, // Tự động sync schema (chỉ dùng trong dev!)
  entities: [User] // Danh sách các Entity/Table
})

/* 
NOTES cho fresher:
- synchronize: true sẽ tự động tạo/sửa bảng theo Entity
- Trong production phải set synchronize: false và dùng migrations
- Environment variables giúp khác biệt giữa dev/staging/production
- DataSource là singleton pattern - chỉ tạo 1 instance duy nhất
*/
