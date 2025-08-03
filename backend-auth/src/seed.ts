// Import reflect-metadata để TypeORM decorators hoạt động đúng
import 'reflect-metadata'
// Import cấu hình database connection
import { AppDataSource } from './data-source'
// Import User entity và UserRole enum
import { User, UserRole } from './entities/User'
// Import bcrypt để hash password
import bcrypt from 'bcrypt'

// Khởi tạo kết nối database và chạy seed data
AppDataSource.initialize()
  .then(async () => {
    // Lấy repository để thao tác với bảng User
    // Repository là pattern của TypeORM để CRUD database
    const userRepo = AppDataSource.getRepository(User)

    // 1. Tạo ADMIN user
    const existingAdmin = await userRepo.findOneBy({
      email: 'admin@example.com'
    })
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('admin123', 10)
      const adminUser = userRepo.create({
        email: 'admin@example.com',
        password: hashedPassword,
        role: UserRole.ADMIN
      })
      await userRepo.save(adminUser)
      console.log('✅ Admin user created: admin@example.com / admin123')
    }

    // 2. Tạo regular USER
    const existingUser = await userRepo.findOneBy({ email: 'user@example.com' })
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash('user123', 10)
      const regularUser = userRepo.create({
        email: 'user@example.com',
        password: hashedPassword,
        role: UserRole.USER
      })
      await userRepo.save(regularUser)
      console.log('✅ Regular user created: user@example.com / user123')
    }

    console.log('🎯 Seed completed! Test authorization với 2 users trên')
    process.exit(0)
  })
  .catch(error => {
    // Xử lý lỗi nếu có vấn đề với database
    console.error('❌ Seed failed:', error)
    process.exit(1) // Thoát process với error code
  })
