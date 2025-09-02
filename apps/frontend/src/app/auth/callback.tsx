"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Spin } from 'antd'
import { useAuthStore } from '../../store/authStore'

export default function AuthCallbackPage() {
  const router = useRouter()
  const { checkAuth } = useAuthStore()

  useEffect(() => {
    const handleCallback = async () => {
      setTimeout(async () => {
        await checkAuth()
        router.push('/data')
      }, 1000)
    }

    handleCallback()
  }, [checkAuth, router])

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      flexDirection: 'column',
      gap: 16
    }}>
      <Spin size="large" />
      <p style={{ color: '#666' }}>Signing you in...</p>
    </div>
  )
}