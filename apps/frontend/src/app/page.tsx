"use client" 

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "../store/authStore"

export default function HomePage() {
  const { isAuthenticated } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/data")
    } else {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  return null
}
