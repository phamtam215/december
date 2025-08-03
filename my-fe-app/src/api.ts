/**
 * API CLIENT CONFIGURATION - Centralized HTTP client with interceptors
 */

import axios from 'axios'

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'http://localhost:4000/api'
})

// Request interceptor - Add authorization token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
