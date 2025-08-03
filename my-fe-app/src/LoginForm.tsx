/**
 * LOGIN FORM COMPONENT - User authentication form
 */

import { useState } from "react"
import axios from "axios"

function LoginForm() {
  // Form state management
  const [email, setEmail] = useState("admin@example.com")
  const [password, setPassword] = useState("123456")
  const [error, setError] = useState("")

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault() // Prevent page reload
    setError("")

    try {
      console.log("🚀 Sending login request...")
      
      // Send login request to API
      const res = await axios.post("http://localhost:4000/api/login", {
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      
      console.log("✅ Login response:", res.data)
      
      // Save token to localStorage
      if (res.data && res.data.token) {
        const token = res.data.token
        localStorage.setItem("token", token)
        console.log("💾 Token saved to localStorage:", token)
        alert("✅ Đăng nhập thành công!\nToken: " + token)
      } else {
        setError("Không nhận được token từ server")
      }
      
    } catch (err: unknown) {
      // Handle login errors
      const error = err as { response?: { data?: { message?: string } }; message?: string }
      console.error("❌ Login error:", error.response?.data || error.message)
      
      const errorMessage = error.response?.data?.message || error.message || "Có lỗi xảy ra"
      setError("Đăng nhập thất bại: " + errorMessage)
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
      {error && (
        <div className="text-red-500 text-sm text-center">
          {error}
        </div>
      )}
    </form>
  )
}

export default LoginForm
