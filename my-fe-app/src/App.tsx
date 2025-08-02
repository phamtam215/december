/**
 * APP COMPONENT - MAIN APPLICATION LOGIC
 * =======================================
 * Component chính với authentication flow
 * 
 * Features:
 * - Auto-login khi có token
 * - Conditional rendering (Login form vs User dashboard)
 * - API integration với protected routes
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
// Import React hooks và components
import { useEffect, useState } from "react"  // Hooks cho state và lifecycle
import LoginForm from "./LoginForm"          // Component form đăng nhập
import api from "./api"                      // Configured Axios instance

/**
 * MAIN APP COMPONENT
 * ==================
 * Root component với authentication logic
 */
function App() {
  // =============== STATE MANAGEMENT ===============
  
  /**
   * User state để track authentication status
   * - null: chưa đăng nhập hoặc đang loading
   * - object: user đã đăng nhập với thông tin user
   */
  const [user, setUser] = useState<any>(null)
  /*
    TypeScript note: Dùng 'any' để đơn giản
    Trong production nên define proper User interface:
    
    interface User {
      id: number
      email: string
      name?: string
      createdAt: string
    }
    
    const [user, setUser] = useState<User | null>(null)
  */

  // =============== AUTHENTICATION CHECK ===============
  
  /**
   * useEffect hook để check authentication khi component mount
   * Dependency array [] = chỉ chạy 1 lần khi component mount
   */
  useEffect(() => {
    /**
     * Async function để fetch user information
     * Gọi API endpoint /me để verify token và lấy user info
     */
    const fetchMe = async () => {
      try {
        // Gọi protected API endpoint
        const res = await api.get("/me")
        /*
          API call này sẽ:
          1. Tự động gắn Authorization header (từ interceptor)
          2. Server verify token
          3. Return user information nếu token valid
          4. Throw error nếu token invalid/expired
        */
        
        console.log("✅ User authenticated:", res.data.user)
        
        // Set user state với data từ API
        setUser(res.data.user)
        /*
          Khi setUser được gọi:
          1. Component re-render
          2. Conditional rendering sẽ show user dashboard thay vì login form
        */
        
      } catch (err) {
        // Xử lý lỗi authentication
        console.error("❌ Không xác thực được:", err)
        /*
          Các trường hợp lỗi:
          - Token không tồn tại
          - Token expired
          - Token invalid
          - Server error
          - Network error
        */
        
        // Không set user = null vì state đã null sẵn
        // User sẽ thấy LoginForm
      }
    }

    // Gọi function check authentication
    fetchMe()
  }, [])  // Empty dependency array = chỉ chạy khi component mount

  // =============== CONDITIONAL RENDERING ===============
  
  /**
   * Nếu user đã đăng nhập, hiển thị dashboard
   */
  if (user) {
    return (
      // User Dashboard UI
      <div className="p-6">
        {/* Welcome message */}
        <h1 className="text-xl font-bold">
          Chào {user.email} 👋
        </h1>
        {/*
          Tailwind classes:
          - text-xl: font-size 1.25rem (20px)
          - font-bold: font-weight bold
        */}
        
        {/* Success message */}
        <p className="text-sm text-gray-500">
          Bạn đã đăng nhập thành công!
        </p>
        {/*
          Tailwind classes:
          - text-sm: font-size 0.875rem (14px)  
          - text-gray-500: màu chữ xám
        */}
        
        {/*
          TODO: Có thể thêm các features khác:
          - Logout button
          - User profile
          - Protected content
          - Navigation menu
        */}
      </div>
    )
  }

  /**
   * Nếu user chưa đăng nhập, hiển thị login form
   */
  return <LoginForm />
  /*
    Conditional rendering pattern:
    - if (condition) return <Component1 />
    - return <Component2 />
    
    React sẽ render:
    - LoginForm nếu user = null
    - Dashboard nếu user = object
  */
}

// Export component để import ở main.tsx
export default App

/**
 * COMPONENT LIFECYCLE FLOW
 * =========================
 * 
 * 1. Component mount
 *    - user state = null
 *    - Render LoginForm
 * 
 * 2. useEffect chạy
 *    - fetchMe() được gọi
 *    - API call đến /me
 * 
 * 3a. Nếu có token hợp lệ:
 *     - API return user data
 *     - setUser(userData)
 *     - Component re-render
 *     - Hiển thị Dashboard
 * 
 * 3b. Nếu không có token hoặc token invalid:
 *     - API throw error
 *     - catch block chạy
 *     - user vẫn = null
 *     - Hiển thị LoginForm
 * 
 * 4. User đăng nhập thành công (từ LoginForm):
 *    - Token được lưu vào localStorage
 *    - Page refresh hoặc fetchMe() được gọi lại
 *    - Flow lặp lại từ bước 2
 */

/**
 * SECURITY CONSIDERATIONS
 * =======================
 * 
 * ✅ Good practices trong code này:
 * - Token được lưu trong localStorage
 * - Automatic token attachment với interceptors
 * - Protected API calls để verify authentication
 * - Graceful error handling
 * 
 * 🔐 Additional security measures có thể thêm:
 * - Token refresh mechanism
 * - Automatic logout khi token expired
 * - HTTPS only trong production
 * - XSS protection với Content Security Policy
 * - Token expiration handling
 */
