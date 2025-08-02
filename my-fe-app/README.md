# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# 🚀 React Login App - Hướng dẫn cho Fresher

Đây là một ứng dụng React đơn giản với tính năng đăng nhập, được xây dựng bằng **React**, **TypeScript**, **Tailwind CSS**, và **Axios**. Project này hoàn hảo để fresher học cách xây dựng một ứng dụng web hiện đại.

## 📋 Mục lục

- [Tổng quan](#-tng-quan)
- [Công nghệ sử dụng](#-công-ngh-s-dng)
- [Cài đặt và chạy](#-ci-đt-và-chy)
- [Cấu trúc project](#-cu-trúc-project)
- [Giải thích chi tiết từng file](#-gii-thích-chi-tit-tng-file)
- [Concepts quan trọng](#-concepts-quan-trng)
- [Troubleshooting](#-troubleshooting)

## 🎯 Tổng quan

Ứng dụng này bao gồm:

- ✅ Form đăng nhập với validation
- ✅ Gửi HTTP request đến API
- ✅ Lưu token vào localStorage
- ✅ Xử lý lỗi và hiển thị thông báo
- ✅ Responsive design với Tailwind CSS
- ✅ TypeScript để type safety

## 🛠 Công nghệ sử dụng

| Công nghệ        | Phiên bản | Mục đích                    |
| ---------------- | --------- | --------------------------- |
| **React**        | 19.1.0    | Library UI chính            |
| **TypeScript**   | Latest    | Type safety và IntelliSense |
| **Vite**         | Latest    | Build tool và dev server    |
| **Tailwind CSS** | Latest    | CSS framework cho styling   |
| **Axios**        | 1.11.0    | HTTP client để gọi API      |

## 🚀 Cài đặt và chạy

### Bước 1: Clone/Download project

```bash
# Nếu có git repository
git clone <repository-url>
cd my-fe-app

# Hoặc download và extract zip file
```

### Bước 2: Cài đặt dependencies

```bash
npm install
```

### Bước 3: Chạy development server

```bash
npm run dev
```

### Bước 4: Mở trình duyệt

Truy cập: `http://localhost:5173` (hoặc port khác nếu 5173 đang được sử dụng)

### Các lệnh khác:

```bash
# Build cho production
npm run build

# Preview production build
npm run preview

# Lint code (kiểm tra lỗi code style)
npm run lint
```

## 📁 Cấu trúc project

```
my-fe-app/
├── public/
│   └── vite.svg                    # Icon của Vite
├── src/
│   ├── assets/
│   │   └── react.svg               # Logo React
│   ├── App.tsx                     # Component chính
│   ├── App.css                     # CSS cho App component
│   ├── LoginForm.tsx               # Component form đăng nhập
│   ├── index.css                   # CSS global + Tailwind imports
│   ├── main.tsx                    # Entry point của ứng dụng
│   └── vite-env.d.ts              # TypeScript definitions cho Vite
├── eslint.config.js                # Cấu hình ESLint
├── index.html                      # HTML template chính
├── package.json                    # Dependencies và scripts
├── postcss.config.js               # Cấu hình PostCSS
├── tailwind.config.js              # Cấu hình Tailwind CSS
├── tsconfig.json                   # Cấu hình TypeScript chính
├── tsconfig.app.json               # TypeScript config cho app
├── tsconfig.node.json              # TypeScript config cho Node.js
├── vite.config.ts                  # Cấu hình Vite
└── README.md                       # File này
```

## 📖 Giải thích chi tiết từng file

### 🏠 `index.html` - HTML Template

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React + TS</title>
  </head>
  <body>
    <div id="root"></div>
    <!-- Nơi React render -->
    <script type="module" src="/src/main.tsx"></script>
    <!-- Entry point -->
  </body>
</html>
```

**Giải thích:**

- `<div id="root">`: Nơi React sẽ render toàn bộ ứng dụng
- `<script type="module">`: Import entry point của ứng dụng
- `viewport meta tag`: Đảm bảo responsive trên mobile

### 🎯 `main.tsx` - Entry Point

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
```

**Giải thích từng dòng:**

- `import { StrictMode }`: React component giúp phát hiện bugs
- `import { createRoot }`: API mới của React 18+ để render
- `import './index.css'`: Load CSS global
- `import App`: Import component chính
- `createRoot()`: Tạo root React và render App component
- `StrictMode`: Bật chế độ strict để development tốt hơn

### 🧩 `App.tsx` - Component chính

```tsx
import LoginForm from './LoginForm'

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <LoginForm />
    </div>
  )
}

export default App
```

**Giải thích:**

- `import LoginForm`: Import component con
- `function App()`: Khai báo functional component
- `className`: Sử dụng Tailwind CSS classes
  - `min-h-screen`: Chiều cao tối thiểu = 100vh
  - `flex items-center justify-center`: Căn giữa theo cả 2 trục
  - `bg-gray-100`: Background màu xám nhạt
- `export default`: Export component để import ở nơi khác

### 📝 `LoginForm.tsx` - Component Form đăng nhập

```tsx
import { useState } from 'react'
import axios from 'axios'

function LoginForm() {
  // State management
  const [email, setEmail] = useState('admin@example.com')
  const [password, setPassword] = useState('123456')
  const [error, setError] = useState('')

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault() // Ngăn page reload
    setError('') // Clear error cũ

    try {
      // Gửi POST request đến API
      const res = await axios.post('http://localhost:4000/api/login', {
        email,
        password
      })

      // Lấy token từ response
      const token = res.data.token

      // Lưu token vào localStorage
      localStorage.setItem('token', token)

      // Thông báo thành công
      alert('✅ Đăng nhập thành công!\nToken: ' + token)
    } catch (err: any) {
      // Xử lý lỗi
      console.error('❌ Lỗi đăng nhập:', err.response?.data || err.message)
      setError(
        'Đăng nhập thất bại: ' + (err.response?.data?.message || err.message)
      )
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto p-6 bg-white rounded shadow space-y-4"
    >
      <h2 className="text-xl font-bold text-center">Đăng nhập</h2>

      {/* Email Input */}
      <input
        className="w-full border p-2 rounded"
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />

      {/* Password Input */}
      <input
        className="w-full border p-2 rounded"
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
      >
        Đăng nhập
      </button>

      {/* Error Message */}
      {error && <div className="text-red-500 text-sm text-center">{error}</div>}
    </form>
  )
}

export default LoginForm
```

**Giải thích chi tiết:**

#### 1. Imports

```tsx
import { useState } from 'react' // Hook để quản lý state
import axios from 'axios' // Library để gọi HTTP API
```

#### 2. State Management

```tsx
const [email, setEmail] = useState('admin@example.com')
```

- `useState`: React Hook để tạo state
- `email`: Giá trị hiện tại
- `setEmail`: Function để update giá trị
- `"admin@example.com"`: Giá trị khởi tạo

#### 3. Event Handler

```tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault() // Ngăn form reload page
  // ... logic xử lý
}
```

#### 4. HTTP Request với Axios

```tsx
const res = await axios.post('http://localhost:4000/api/login', {
  email,
  password
})
```

- `axios.post()`: Gửi POST request
- `await`: Chờ response trước khi tiếp tục
- Object `{email, password}`: Request body

#### 5. localStorage

```tsx
localStorage.setItem('token', token)
```

- Lưu token vào browser storage
- Persistent data (không mất khi refresh page)

### 🎨 `index.css` - Global CSS

```css
@tailwind base; /* Reset CSS và base styles */
@tailwind components; /* Component classes */
@tailwind utilities; /* Utility classes */
```

**Giải thích:**

- `@tailwind`: Import các layer của Tailwind CSS
- `base`: Reset CSS, normalize styles
- `components`: Classes cho components
- `utilities`: Utility classes như `flex`, `text-center`

### ⚙️ Config Files

#### `package.json` - Project metadata

```json
{
  "name": "my-fe-app",
  "scripts": {
    "dev": "vite", // Chạy dev server
    "build": "tsc -b && vite build", // Build production
    "lint": "eslint .", // Check code quality
    "preview": "vite preview" // Preview production build
  },
  "dependencies": {
    "axios": "^1.11.0", // HTTP client
    "react": "^19.1.0", // React library
    "react-dom": "^19.1.0" // React DOM renderer
  }
}
```

#### `vite.config.ts` - Vite configuration

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()] // Enable React support
})
```

#### `tailwind.config.js` - Tailwind CSS configuration

```javascript
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}' // Scan these files for classes
  ],
  theme: {
    extend: {} // Extend default theme
  },
  plugins: [] // Additional plugins
}
```

## 🧠 Concepts quan trọng

### 1. **React Functional Components**

```tsx
function MyComponent() {
  return <div>Hello World</div>
}
```

- Modern way viết React components
- Sử dụng Hooks thay vì Class components

### 2. **React Hooks**

```tsx
const [state, setState] = useState(initialValue)
```

- `useState`: Quản lý local state
- `useEffect`: Handle side effects
- Custom hooks: Tái sử dụng logic

### 3. **Event Handling**

```tsx
const handleClick = (e: React.MouseEvent) => {
  e.preventDefault() // Ngăn default behavior
  // Your logic here
}

;<button onClick={handleClick}>Click me</button>
```

### 4. **Async/Await**

```tsx
const fetchData = async () => {
  try {
    const response = await axios.get('/api/data')
    console.log(response.data)
  } catch (error) {
    console.error('Error:', error)
  }
}
```

### 5. **TypeScript Types**

```tsx
interface User {
  id: number
  email: string
  name: string
}

const [user, setUser] = useState<User | null>(null)
```

### 6. **CSS với Tailwind**

```tsx
<div className="flex items-center justify-center p-4 bg-blue-500 text-white rounded">
  Content
</div>
```

- Utility-first CSS framework
- Responsive design: `sm:`, `md:`, `lg:`
- Hover states: `hover:bg-blue-700`

## 🔧 Troubleshooting

### ❌ Lỗi thường gặp:

#### 1. "Cannot find module"

```bash
# Cài đặt lại dependencies
rm -rf node_modules package-lock.json
npm install
```

#### 2. "Port 5173 is already in use"

```bash
# Tìm process đang dùng port và kill
lsof -ti:5173 | xargs kill -9

# Hoặc dùng port khác
npm run dev -- --port 3000
```

#### 3. "Tailwind classes không hoạt động"

- Kiểm tra `tailwind.config.js` có đúng content paths không
- Đảm bảo `@tailwind` directives có trong `index.css`

#### 4. "CORS Error khi gọi API"

- API server cần enable CORS
- Hoặc dùng proxy trong `vite.config.ts`:

```typescript
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:4000'
    }
  }
})
```

#### 5. "localStorage is not defined"

- Chỉ sử dụng localStorage trong browser (không server-side)
- Check trước khi dùng:

```tsx
if (typeof window !== 'undefined') {
  localStorage.setItem('key', 'value')
}
```

### 📚 Tài liệu tham khảo:

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Axios Documentation](https://axios-http.com/docs/intro)
- [Vite Guide](https://vitejs.dev/guide/)

## 🎯 Bài tập thực hành cho Fresher:

### Cấp độ Beginner:

1. Thay đổi màu sắc của button
2. Thêm placeholder text cho input fields
3. Thêm validation cho email format
4. Hiển thị loading state khi đang submit

### Cấp độ Intermediate:

1. Tạo Registration form
2. Thêm "Remember me" checkbox
3. Tạo Protected Route (cần login mới vào được)
4. Thêm logout functionality

### Cấp độ Advanced:

1. Tích hợp với real API backend
2. Thêm token refresh mechanism
3. Tạo global state management với Context API
4. Thêm unit tests với Jest/Vitest

---

**Happy Coding! 🚀**

_Nếu có thắc mắc gì, hãy đọc kỹ documentation hoặc google error message. Đây là cách tốt nhất để học lập trình!_

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname
      }
      // other options...
    }
  }
])
```
