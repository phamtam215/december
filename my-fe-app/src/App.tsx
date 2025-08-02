// Import component LoginForm từ file LoginForm.tsx
import LoginForm from "./LoginForm"

/**
 * Component chính của ứng dụng
 * Đây là root component chứa toàn bộ UI của app
 */
function App() {
  return (
    // Container chính với Tailwind CSS classes
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* 
        Giải thích các Tailwind classes:
        - min-h-screen: chiều cao tối thiểu = 100vh (full screen height)
        - flex: display flex để layout
        - items-center: căn giữa theo trục dọc (vertical center)
        - justify-center: căn giữa theo trục ngang (horizontal center)
        - bg-gray-100: background màu xám nhạt
      */}
      
      {/* Render component LoginForm */}
      <LoginForm />
    </div>
  )
}

// Export component để có thể import ở file khác
export default App
