/**
 * APP COMPONENT - Main application with authentication flow
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react"
import LoginForm from "./LoginForm"
import UserList from "./components/UserList"
import api from "./api"

function App() {
  // Track authentication status: null = not logged in, object = logged in user
  const [user, setUser] = useState<any>(null)

  // Check authentication on component mount
  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await api.get("/me")
        setUser(res.data.user)
        console.log("✅ User authenticated:", res.data.user)
      } catch (err) {
        console.error("❌ Authentication failed:", err)
        // user stays null → show AuthForm
      }
    }

    fetchMe()
  }, [])

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('token')
    setUser(null)
    console.log("🚪 User logged out")
  }

  // Show dashboard if user is logged in
  if (user) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Chào {user.email} 👋
              </h1>
              <p className="text-sm text-gray-500">
                Bạn đã đăng nhập thành công!
              </p>
            </div>
            
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Đăng xuất
            </button>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-6 py-8">
          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* User Info Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-900">
                Thông tin tài khoản
              </h2>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-medium text-gray-700">Email:</span>
                  <span className="ml-2 text-gray-600">{user.email}</span>
                </p>
                <p className="text-sm">
                  <span className="font-medium text-gray-700">Role:</span>
                  <span className="ml-2 text-gray-600">{user.role || 'User'}</span>
                </p>
                <p className="text-sm">
                  <span className="font-medium text-gray-700">ID:</span>
                  <span className="ml-2 text-gray-600">{user.id}</span>
                </p>
              </div>
            </div>
            
            {/* Quick Stats Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-900">
                Thống kê nhanh
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">5</div>
                  <div className="text-sm text-gray-500">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">12</div>
                  <div className="text-sm text-gray-500">Tasks</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* User List Section */}
          <div className="mt-8">
            <div className="bg-white rounded-lg shadow">
              <UserList />
            </div>
          </div>
        </main>
      </div>
    )
  }

  // Show login form if user is not logged in
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <LoginForm />
    </div>
  )
}

export default App
