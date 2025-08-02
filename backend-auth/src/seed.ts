// Import reflect-metadata để TypeORM decorators hoạt động đúng
import 'reflect-metadata'
// Import cấu hình database connection
import { AppDataSource } from './data-source'
// Import User entity để làm việc với bảng users
import { User } from './entities/User'

// Khởi tạo kết nối database và chạy seed data
AppDataSource.initialize()
  .then(async () => {
    // Lấy repository để thao tác với bảng User
    // Repository là pattern của TypeORM để CRUD database
    const userRepo = AppDataSource.getRepository(User)

    // Kiểm tra xem user admin đã tồn tại chưa
    // findOneBy() tìm 1 record dựa trên điều kiện
    const existing = await userRepo.findOneBy({ email: 'admin@example.com' })
    if (existing) return console.log('⚠️ User already exists')

    // Tạo instance User mới (chưa lưu vào DB)
    // create() chỉ tạo object, chưa INSERT vào database
    const user = userRepo.create({
      email: 'admin@example.com',
      password: '123456' // TODO: Hash password với bcrypt trong production
    })

    // Lưu user vào database
    // save() thực hiện INSERT query vào PostgreSQL
    await userRepo.save(user)
    console.log('✅ Seed user thành công')
  })
  .catch(error => {
    // Xử lý lỗi nếu có vấn đề với database
    console.error('❌ Seed failed:', error)
    process.exit(1) // Thoát process với error code
  })
