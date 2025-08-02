// Import React hook và HTTP client library
import { useState } from "react"  // Hook để quản lý state trong functional component
import axios from "axios"  // Library để thực hiện HTTP requests

/**
 * Component LoginForm - Form đăng nhập
 * Chứa logic xử lý đăng nhập và UI form
 */
function LoginForm() {
  // =============== STATE MANAGEMENT ===============
  // Sử dụng useState hook để quản lý state của component
  
  // State cho email input - khởi tạo với giá trị mặc định
  const [email, setEmail] = useState("admin@example.com")
  
  // State cho password input - khởi tạo với giá trị mặc định  
  const [password, setPassword] = useState("123456")
  
  // State cho error message - ban đầu là chuỗi rỗng
  const [error, setError] = useState("")

  // =============== EVENT HANDLERS ===============
  
  /**
   * Xử lý khi user submit form
   * @param e - Event object từ form submission
   */
  const handleSubmit = async (e: React.FormEvent) => {
    // Ngăn chặn default behavior của form (tránh page reload)
    e.preventDefault()
    
    // Reset error message từ lần submit trước
    setError("")

    try {
      // =============== HTTP REQUEST ===============
      console.log("🚀 Đang gửi request đăng nhập...")
      
      // Gửi POST request đến API endpoint
      const res = await axios.post("http://localhost:4000/api/login", {
        email,     // Shorthand cho email: email
        password,  // Shorthand cho password: password
      })
      
      console.log("✅ Response nhận được:", res.data)
      
      // =============== XỬ LÝ RESPONSE THÀNH CÔNG ===============
      
      // Lấy token từ response data
      const token = res.data.token
      
      // Lưu token vào localStorage để persist qua các session
      // localStorage là Web API để lưu data trong browser
      localStorage.setItem("token", token)
      
      console.log("💾 Token đã lưu vào localStorage:", token)
      
      // Hiển thị thông báo thành công cho user
      alert("✅ Đăng nhập thành công!\nToken: " + token)
      
    } catch (err: unknown) {
      // =============== XỬ LÝ LỖI ===============
      
      // Type assertion để xử lý error object
      const error = err as { response?: { data?: { message?: string } }; message?: string }
      
      console.error("❌ Lỗi đăng nhập:", error.response?.data || error.message)
      
      // Tạo error message từ response hoặc fallback message
      const errorMessage = error.response?.data?.message || error.message || "Có lỗi xảy ra"
      
      // Cập nhật state để hiển thị error cho user
      setError("Đăng nhập thất bại: " + errorMessage)
    }
  }

  // =============== RENDER UI ===============
  return (
    // Form element với event handler
    <form
      onSubmit={handleSubmit}  // Gọi handleSubmit khi user submit form
      className="max-w-sm mx-auto p-6 bg-white rounded shadow space-y-4"
      /*
        Giải thích Tailwind classes:
        - max-w-sm: max width = 24rem (384px)
        - mx-auto: margin auto để center form
        - p-6: padding 1.5rem (24px) tất cả các side
        - bg-white: background màu trắng
        - rounded: border-radius để bo góc
        - shadow: box-shadow để tạo hiệu ứng nổi
        - space-y-4: margin-top 1rem (16px) cho các child elements
      */
    >
      {/* =============== FORM TITLE =============== */}
      <h2 className="text-xl font-bold text-center">Đăng nhập</h2>
      {/*
        - text-xl: font-size 1.25rem (20px)
        - font-bold: font-weight bold
        - text-center: text-align center
      */}

      {/* =============== EMAIL INPUT =============== */}
      <input
        className="w-full border p-2 rounded"
        type="email"          // HTML5 input type để validate email format
        placeholder="Email"   // Placeholder text hiển thị khi input rỗng
        value={email}         // Controlled input - giá trị từ state
        onChange={e => setEmail(e.target.value)}  // Update state khi user type
        required              // HTML5 validation - bắt buộc nhập
        /*
          Giải thích Tailwind classes:
          - w-full: width 100%
          - border: border 1px solid
          - p-2: padding 0.5rem (8px)
          - rounded: border-radius
          
          Controlled Input Pattern:
          - value={email}: giá trị input luôn sync với state
          - onChange: mỗi khi user type sẽ update state
          - Đây là pattern bắt buộc trong React để quản lý form data
        */
      />

      {/* =============== PASSWORD INPUT =============== */}
      <input
        className="w-full border p-2 rounded"
        type="password"       // Ẩn text khi user nhập
        placeholder="Password"
        value={password}      // Controlled input
        onChange={e => setPassword(e.target.value)}  // Update state
        required              // Bắt buộc nhập
      />

      {/* =============== SUBMIT BUTTON =============== */}
      <button
        type="submit"         // Type submit để trigger form submission
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
        /*
          - bg-blue-600: background xanh đậm
          - hover:bg-blue-700: màu tối hơn khi hover
          - text-white: chữ màu trắng
          - px-4: padding-left và padding-right 1rem (16px)
          - py-2: padding-top và padding-bottom 0.5rem (8px)
          - w-full: width 100%
        */
      >
        Đăng nhập
      </button>

      {/* =============== ERROR MESSAGE =============== */}
      {/* Conditional rendering - chỉ hiện khi có error */}
      {error && (
        <div className="text-red-500 text-sm text-center">
          {/*
            - text-red-500: màu chữ đỏ
            - text-sm: font-size nhỏ (14px)
            - text-center: căn giữa
          */}
          {error}  {/* Hiển thị nội dung error message */}
        </div>
      )}
      {/*
        Conditional Rendering Pattern:
        - {condition && <JSX>}: chỉ render JSX khi condition = true
        - Trong trường hợp này: chỉ hiện error message khi có lỗi
      */}
    </form>
  )
}

// Export component để có thể import ở nơi khác
export default LoginForm
