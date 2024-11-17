'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { AuthContextType,UserRequestDto,UserResponsetDto,UserListResponseDto,UserDetailsRequestDto } from '@/interfaces/user-interfaces'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<string | null>(null)

  const BASE_HOST = process.env.NEXT_PUBLIC_BASE_HOST;
  const BASE_PORT = process.env.NEXT_PUBLIC_PORT_AUTH;
  const API_URL = `${BASE_HOST}:${BASE_PORT}`
  useEffect(() => {
    const savedUser = Cookies.get('user')
    if (savedUser) {
      setUser(savedUser)
    }
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_URL}/ms-auth/api/v1/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('User not found')
        }
        throw new Error('Login failed')
      }

      const data = await response.json()
      const authToken = data.Token

      setUser(email)
      Cookies.set('user', email)
      Cookies.set('auth_token', authToken) // Guardamos el token de autenticación
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  const signup = async (userData: UserRequestDto) => {
    try {
      const response = await fetch(`${API_URL}/ms-auth/api/v1/users/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      })

      if (!response.ok) {
        throw new Error('Signup failed')
      }

      console.log('User created successfully')
    } catch (error) {
      console.error('Signup error:', error)
      throw error
    }
  }

  const getUserDetails = async (id: number): Promise<UserResponsetDto | null> => {
    try {
      const authToken = Cookies.get('auth_token')
      if (!authToken) {
        throw new Error('Unauthorized')
      }

      const response = await fetch(`${API_URL}/ms-auth/api/v1/users/${id}/details`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${authToken}` },
      })

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized')
        }
        throw new Error('Failed to fetch user details')
      }

      const data: UserResponsetDto = await response.json()
      return data
    } catch (error) {
      console.error('Get user details error:', error)
      return null
    }
  }

  const getListUsers = async (): Promise<UserListResponseDto[] | null> => {
    try {
      const authToken = Cookies.get('auth_token')
      if (!authToken) {
        throw new Error('Unauthorized')
      }

      const response = await fetch(`${API_URL}/ms-auth/api/v1/users`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${authToken}` },
      })

      if (!response.ok) {
        throw new Error('Failed to fetch users list')
      }

      const data = await response.json()
      return data.data[0] as UserListResponseDto[]
    } catch (error) {
      console.error('Get users list error:', error)
      return null
    }
  }

  const deleteUser = async (id: number) => {
    try {
      const authToken = Cookies.get('auth_token')
      if (!authToken) {
        throw new Error('Unauthorized')
      }

      const response = await fetch(`${API_URL}/ms-auth/api/v1/users/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${authToken}` },
      })

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized')
        }
        throw new Error('Failed to delete user')
      }

      console.log('User deleted successfully')
    } catch (error) {
      console.error('Delete user error:', error)
      throw error
    }
  }

  const updateUserDetails = async (id: number, userData: UserDetailsRequestDto) => {
    try {
      const authToken = Cookies.get('auth_token')
      if (!authToken) {
        throw new Error('Unauthorized')
      }

      const response = await fetch(`${API_URL}/ms-auth/api/v1/users/${id}/details`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${authToken}` },
        body: JSON.stringify(userData),
      })

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized')
        }
        throw new Error('Failed to update user details')
      }

      console.log('User details updated successfully')
    } catch (error) {
      console.error('Update user details error:', error)
      throw error
    }
  }

  const getSelfUserDetails = async (): Promise<UserResponsetDto | null> => {
    try {
      const authToken = Cookies.get('auth_token')
      if (!authToken) {
        throw new Error('Unauthorized')
      }

      const response = await fetch(`${API_URL}/ms-auth/api/v1/users/self/details`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${authToken}` },
      })

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized')
        }
        throw new Error('Failed to fetch self user details')
      }

      const data: UserResponsetDto = await response.json()
      return data
    } catch (error) {
      console.error('Get self user details error:', error)
      return null
    }
  }

  const updateSelfUserDetails = async (userData: UserRequestDto) => {
    try {
      const authToken = Cookies.get('auth_token')
      if (!authToken) {
        throw new Error('Unauthorized')
      }

      const response = await fetch(`${API_URL}/ms-auth/api/v1/users/self/details`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${authToken}` },
        body: JSON.stringify(userData),
      })

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized')
        }
        throw new Error('Failed to update self user details')
      }

      console.log('Self user details updated successfully')
    } catch (error) {
      console.error('Update self user details error:', error)
      throw error
    }
  }

  const logout = () => {
    setUser(null)
    Cookies.remove('user')
    Cookies.remove('auth_token')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, signup, getUserDetails, getListUsers, deleteUser, updateUserDetails, updateSelfUserDetails, getSelfUserDetails }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
