// Import các thư viện React cần thiết
import { StrictMode } from 'react'  // StrictMode giúp phát hiện bugs và warnings trong development
import { createRoot } from 'react-dom/client'  // API mới của React 18+ để render ứng dụng

// Import CSS global và component chính
import './index.css'  // CSS global chứa Tailwind CSS directives
import App from './App.tsx'  // Component gốc của ứng dụng

// Lấy DOM element có id="root" từ index.html và tạo React root
// Dấu ! ở cuối là TypeScript assertion (đảm bảo element tồn tại)
createRoot(document.getElementById('root')!).render(
  // StrictMode: Chế độ nghiêm ngặt của React để phát hiện bugs
  // Chỉ hoạt động trong development, không ảnh hưởng production
  <StrictMode>
    <App />  {/* Component chính của ứng dụng */}
  </StrictMode>,
)
