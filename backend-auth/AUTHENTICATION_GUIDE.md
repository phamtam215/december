# 🔐 Authentication System Guide

> **Mục đích:** Hướng dẫn chi tiết hệ thống authentication cho fresher developers

## 📁 File Structure

```
src/
├── entities/User.ts              # Database entity + validation
├── controllers/auth.controller.ts # Login/signup logic
├── middlewares/auth.middleware.ts # JWT verification
├── middlewares/validate.ts       # DTO validation
├── data-source.ts               # Database configuration
├── seed.ts                      # Sample data creation
└── index.ts                     # Application entry point
```

## 🎯 Authentication Flow Overview

### 1. User Registration Flow

```
POST /api/signup → validateDto → signupController → Hash password → Save to DB
```

### 2. User Login Flow

```
POST /api/login → loginController → Verify password → Generate JWT → Return token
```

### 3. Protected Route Access

```
GET /api/profile → verifyToken middleware → Extract user from JWT → Controller
```

---

## 📋 File Details

### 🗄️ `src/entities/User.ts`

**Purpose:** Database table definition với validation rules

**Key Concepts:**

- **TypeORM Entity**: Maps TypeScript class to PostgreSQL table
- **Dual Purpose**: Database schema + Input validation
- **Decorators**: `@Entity()`, `@Column()`, `@IsEmail()`, `@MinLength()`

**Generated SQL:**

```sql
CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY,
  "email" VARCHAR UNIQUE NOT NULL,
  "password" VARCHAR NOT NULL,
  "createdAt" TIMESTAMP DEFAULT NOW()
);
```

**Security Notes:**

- Email unique constraint prevents duplicate users
- Password validation at application level
- createdAt for audit trail

---

### 🎮 `src/controllers/auth.controller.ts`

**Purpose:** Business logic cho authentication

#### Login Process:

1. Extract email/password từ request body
2. Find user trong database by email
3. Compare plain password với hashed password (bcrypt)
4. Generate JWT token với user info
5. Return token cho client

#### Signup Process:

1. Check email đã tồn tại chưa
2. Hash password với bcrypt (salt rounds = 10)
3. Create user instance với hashed password
4. Save to database
5. Return success message

**Security Implementation:**

- ✅ Password hashing với bcrypt
- ✅ Generic error messages
- ✅ Status codes: 401 (Unauthorized), 409 (Conflict), 201 (Created)

---

### 🛡️ `src/middlewares/auth.middleware.ts`

**Purpose:** JWT token verification cho protected routes

#### Middleware Flow:

1. Extract `Authorization` header từ request
2. Parse token từ "Bearer <token>" format
3. Verify JWT signature và expiration
4. Attach decoded user info vào `req.user`
5. Call `next()` để continue hoặc return 401

#### Usage trong Routes:

```javascript
// PUBLIC ROUTES
router.post('/login', loginController)
router.post('/signup', signupController)

// PROTECTED ROUTES
router.get('/profile', verifyToken, getProfileController)
router.put('/profile', verifyToken, updateProfileController)
```

---

### ✅ `src/middlewares/validate.ts`

**Purpose:** Request body validation sử dụng DTO pattern

#### Validation Flow:

1. Convert plain object (req.body) thành DTO class instance
2. Run validation decorators (`@IsEmail`, `@MinLength`, etc.)
3. Return 400 với error details nếu invalid
4. Call `next()` nếu validation pass

#### Example Usage:

```javascript
// Create DTO class
class LoginDto {
  @IsEmail()
  email: string

  @MinLength(6)
  password: string
}

// Apply middleware
router.post('/login', validateDto(LoginDto), loginController)
```

---

### 🗃️ `src/data-source.ts`

**Purpose:** TypeORM database connection configuration

#### Key Settings:

- **Database**: PostgreSQL
- **synchronize: true**: Auto-sync schema (DEV ONLY!)
- **entities**: List of Entity classes
- **Environment Variables**: DB_USER, DB_PASSWORD, DB_NAME

#### Production Considerations:

- Set `synchronize: false`
- Use migrations instead
- Proper connection pooling
- Error handling

---

### 🌱 `src/seed.ts`

**Purpose:** Create sample data cho development

#### Seed Process:

1. Initialize database connection
2. Check if admin user exists
3. Create admin user nếu chưa có
4. Hash password trước khi save
5. Log success/error messages

#### Development Workflow:

```bash
npx tsx src/seed.ts  # Create sample data
npm run dev          # Start development server
```

---

### 🚀 `src/index.ts`

**Purpose:** Application entry point

#### Startup Sequence:

1. Import reflect-metadata (MUST BE FIRST!)
2. Setup Express app với middleware
3. Register routes
4. Initialize database connection
5. Start server chỉ sau khi DB connected

#### Architecture Notes:

- Database-first initialization
- Proper error handling
- Graceful shutdown on DB connection failure

---

## 🔒 Security Best Practices

### Password Security

- ❌ Never store plain text passwords
- ✅ Always hash với bcrypt (salt rounds ≥ 10)
- ✅ Use `bcrypt.compare()` for verification
- ✅ Generic error messages

### JWT Token Security

- ✅ Set expiration time (1-24 hours)
- ✅ Use strong JWT_SECRET (32+ characters)
- ✅ Only include necessary data trong payload
- ❌ Never include sensitive data trong JWT

### Input Validation

- ✅ Validate tất cả user input
- ✅ Use DTO pattern với class-validator
- ✅ Sanitize data trước khi process
- ✅ Return structured error responses

### Error Handling

- ❌ Don't expose database errors to client
- ✅ Use generic error messages
- ✅ Log detailed errors for debugging
- ✅ Proper HTTP status codes

---

## 🌐 Client-Server Integration

### Frontend Implementation (React/Vue/Angular)

#### 1. Login Flow

```javascript
const login = async (email, password) => {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })

  if (response.ok) {
    const { token } = await response.json()
    localStorage.setItem('token', token)
    // Redirect to dashboard
  } else {
    // Show error message
  }
}
```

#### 2. API Calls với Authentication

```javascript
const apiCall = async (url, options = {}) => {
  const token = localStorage.getItem('token')

  const response = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...options.headers
    }
  })

  // Handle 401 Unauthorized
  if (response.status === 401) {
    localStorage.removeItem('token')
    window.location.href = '/login'
    return
  }

  return response.json()
}
```

#### 3. Route Protection

```javascript
// React Router example
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token')

  if (!token) {
    return <Navigate to="/login" />
  }

  return children
}

// Usage
;<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
```

---

## 🚀 Development Workflow

### 1. Setup Database

```bash
# Install PostgreSQL
brew install postgresql
brew services start postgresql

# Create database
createdb myapp_dev
```

### 2. Environment Variables

```bash
# .env file
DB_USER=phamtam
DB_PASSWORD=
DB_NAME=myapp_dev
JWT_SECRET=your-super-secret-key-here
```

### 3. Install Dependencies

```bash
npm install express cors dotenv jsonwebtoken bcrypt
npm install typeorm pg reflect-metadata class-validator class-transformer
npm install -D @types/express @types/cors @types/jsonwebtoken @types/pg
npm install -D typescript ts-node-dev
```

### 4. Database Setup

```bash
npx tsx src/seed.ts  # Create sample data
```

### 5. Development Server

```bash
npm run dev  # Start with auto-reload
```

---

## 🧪 Testing Authentication

### 1. Test Signup

```bash
curl -X POST http://localhost:4000/api/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"123456"}'
```

### 2. Test Login

```bash
curl -X POST http://localhost:4000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"123456"}'
```

### 3. Test Protected Route

```bash
curl -X GET http://localhost:4000/api/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

---

## 🎯 Learning Roadmap cho Fresher

### Beginner Level

1. ✅ Hiểu TypeScript basics
2. ✅ Express.js fundamentals
3. ✅ Database concepts (SQL)
4. ✅ HTTP status codes
5. ✅ REST API principles

### Intermediate Level

1. ✅ TypeORM Entity relationships
2. ✅ Advanced validation (custom validators)
3. ✅ Error handling patterns
4. ✅ Testing (unit + integration)
5. ✅ Security best practices

### Advanced Level

1. ✅ JWT refresh tokens
2. ✅ Role-based access control (RBAC)
3. ✅ Rate limiting
4. ✅ Microservices architecture
5. ✅ Production deployment

---

## 📚 Recommended Resources

### Documentation

- [TypeORM Guide](https://typeorm.io/)
- [class-validator Documentation](https://github.com/typestack/class-validator)
- [JWT.io](https://jwt.io/) - JWT debugger
- [bcrypt Documentation](https://www.npmjs.com/package/bcrypt)

### Security

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js Security Checklist](https://blog.risingstack.com/node-js-security-checklist/)

### Best Practices

- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [TypeScript Best Practices](https://typescript-eslint.io/rules/)

---

## ❓ Common Issues & Solutions

### Issue: "reflect-metadata" errors

**Solution:** Import `'reflect-metadata'` as first line trong entry file

### Issue: JWT_SECRET undefined

**Solution:** Check `.env` file và `dotenv.config()` call

### Issue: Database connection failed

**Solution:** Verify PostgreSQL running và credentials correct

### Issue: CORS errors

**Solution:** Ensure `app.use(cors())` middleware setup

### Issue: Validation not working

**Solution:** Check DTO class decorators và middleware order

---

**💡 Pro Tip:** Luôn test authentication flow manually trước khi integrate với frontend!
