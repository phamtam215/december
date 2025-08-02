/**
 * API CLIENT CONFIGURATION
 * =========================
 * File này tạo và configure một Axios instance để gọi API
 *
 * Tại sao cần file này?
 * - Centralized API configuration (không phải config mỗi lần gọi API)
 * - Automatic token handling (tự động gắn Authorization header)
 * - Base URL management (không phải hardcode URL mỗi nơi)
 * - Request/Response interceptors (middleware cho HTTP requests)
 */

// Import Axios HTTP client library
import axios from 'axios'

/**
 * TẠO AXIOS INSTANCE
 * ==================
 * Thay vì dùng axios trực tiếp, tạo instance với config riêng
 */
const api = axios.create({
  // Base URL cho tất cả requests
  baseURL: 'http://localhost:4000/api'
  /*
    Khi gọi api.get('/users'), thực tế sẽ gọi:
    'http://localhost:4000/api/users'
    
    Benefits:
    - Không phải lặp lại base URL
    - Dễ thay đổi API endpoint (chỉ sửa 1 chỗ)
    - Support multiple environments (dev, staging, prod)
  */
})

/**
 * REQUEST INTERCEPTOR
 * ===================
 * Middleware chạy TRƯỚC mỗi HTTP request
 *
 * Use cases:
 * - Tự động gắn Authentication headers
 * - Log requests cho debugging
 * - Thêm common headers
 * - Request transformation
 */
api.interceptors.request.use(config => {
  // Lấy token từ localStorage
  const token = localStorage.getItem('token')

  // Nếu có token, gắn vào Authorization header
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
    /*
      Authorization header format:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
      
      Server sẽ:
      1. Extract token từ header
      2. Verify token validity
      3. Decode user information
      4. Authorize request
    */
  }

  // Return modified config
  return config
  /*
    Config object chứa:
    - url, method, data, params
    - headers, timeout, responseType
    - Tất cả axios configuration options
  */
})

/**
 * RESPONSE INTERCEPTOR (có thể thêm)
 * ==================================
 * Middleware chạy SAU mỗi HTTP response
 *
 * api.interceptors.response.use(
 *   // Success handler
 *   response => {
 *     console.log('Response received:', response)
 *     return response
 *   },
 *
 *   // Error handler
 *   error => {
 *     if (error.response?.status === 401) {
 *       // Token expired, redirect to login
 *       localStorage.removeItem('token')
 *       window.location.href = '/login'
 *     }
 *     return Promise.reject(error)
 *   }
 * )
 */

// Export configured API instance
export default api

/**
 * USAGE EXAMPLES
 * ==============
 *
 * // Import trong components
 * import api from './api'
 *
 * // GET request
 * const users = await api.get('/users')
 *
 * // POST request
 * const newUser = await api.post('/users', { name: 'John', email: 'john@example.com' })
 *
 * // PUT request
 * const updatedUser = await api.put('/users/1', { name: 'Jane' })
 *
 * // DELETE request
 * await api.delete('/users/1')
 *
 * // Tất cả requests tự động có:
 * // - Base URL: http://localhost:4000/api
 * // - Authorization header (nếu có token)
 */
