/**
 * USER LIST COMPONENT - Display users from API
 */

import { useState, useEffect } from 'react'
import api from '../api'

// TypeScript interface for user data structure
interface User {
  id: number
  name?: string
  email: string
  phone?: string
}

function UserList() {
  // Component state
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Fetch users data on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log('🔍 Fetching users...')
        const response = await api.get('/users')
        console.log('✅ Users data:', response.data)
        
        setUsers(response.data)
        setLoading(false)
      } catch (err) {
        console.error('❌ Error fetching users:', err)
        setError('Không thể tải danh sách người dùng')
        setLoading(false)
      }
    }

    fetchUsers()
  }, []) // Empty dependency array = run once on mount

  // Loading state
  if (loading) {
    return (
      <div className="text-center py-4">
        <div className="text-blue-600">Đang tải...</div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="text-center py-4">
        <div className="text-red-500">{error}</div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Danh sách người dùng</h2>
      
      {/* Users grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map(user => (
          <div 
            key={user.id} 
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {user.name}
            </h3>
            <p className="text-gray-600 mb-1">
              📧 {user.email}
            </p>
            <p className="text-gray-600">
              📱 {user.phone}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserList
