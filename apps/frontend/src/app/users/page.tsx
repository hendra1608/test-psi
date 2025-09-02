"use client"

import React from "react"
import { Row, Col, Card, Typography, Divider, Button } from "antd"
import { LogoutOutlined } from "@ant-design/icons"
import { useAuthStore } from "@/store/authStore"
import UserTable from "../../../components/userTable"

const { Text } = Typography

const UsersPage: React.FC = () => {
  const { logout, loading } = useAuthStore()

  return (
    <div style={{ padding: 24, background: "#f0f2f5", minHeight: "100vh" }}>
      <Row justify="center" style={{ marginBottom: 24 }}>
        <Col xs={24} sm={24} md={20} lg={18}>
          <Card
            style={{
              borderRadius: 12,
              boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
              background: "#ffffff",
            }}
            bodyStyle={{ padding: 24 }}
          >
            <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
              <Col>
              </Col>
              <Col>
                <Button
                  type="primary"
                  danger
                  icon={<LogoutOutlined />}
                  loading={loading}
                  onClick={logout}
                >
                  Logout
                </Button>
              </Col>
            </Row>

            <Text type="secondary" style={{ display: "block", textAlign: "center", marginBottom: 16 }}>
              List of users
            </Text>
            <Divider />

            <UserTable />
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default UsersPage
