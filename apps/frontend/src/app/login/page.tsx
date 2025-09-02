"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, Typography, Row, Col, Button, Spin } from "antd"
import { GoogleOutlined } from "@ant-design/icons"
import { useAuthStore } from "@/store/authStore"

const { Title, Text } = Typography

export default function LoginPage() {
  const { login, loading, isAuthenticated, checkAuth } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/data") 
    }
  }, [isAuthenticated, router])

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" />
      </div>
    )
  }

  if (isAuthenticated) return null

  return (
    <Row justify="center" align="middle" style={{ minHeight: "100vh", background: "#f5f5f5" }}>
      <Col xs={22} sm={16} md={12} lg={8} xl={6}>
        <Card style={{ textAlign: "center", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
          <div style={{ marginBottom: 32 }}>
            <Title level={2} style={{ marginBottom: 8 }}>
              Welcome
            </Title>
            <Text type="secondary">Please sign in to continue</Text>
          </div>

          <Button
            type="primary"
            icon={<GoogleOutlined />}
            size="large"
            loading={loading}
            onClick={login}
            style={{
              width: "100%",
              height: 48,
              fontSize: 16,
              fontWeight: 500,
            }}
          >
            Sign in with Google
          </Button>
        </Card>
      </Col>
    </Row>
  )
}
