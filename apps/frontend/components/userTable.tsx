"use client"

import React, { useEffect, useState } from "react"
import { Table, Input, Button, Space, Image, Modal, Form, Row, Col } from "antd"
import { PlusOutlined } from "@ant-design/icons"
import { useUserStore } from "@/store/userStore"

const { Search } = Input

const UserTable: React.FC = () => {
  const { filteredUsers, fetchRandomUsers, setSearchText, loading, addLocalUser } = useUserStore()
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form] = Form.useForm()

  useEffect(() => {
    fetchRandomUsers(pageSize, currentPage)
  }, [currentPage, pageSize, fetchRandomUsers])

  const handleTableChange = (pagination: any) => {
    setCurrentPage(pagination.current)
    setPageSize(pagination.pageSize)
  }

  const handleAddUser = () => {
    form.validateFields().then((values) => {
      addLocalUser({
        name: values.name,
        email: values.email,
        location: values.location,
        age: values.age,
        phone: values.phone,
        cell: values.cell,
        picture: [values.picture || ''],
      })
      form.resetFields()
      setIsModalOpen(false)
      setCurrentPage(1) 
    })
  }

  const columns = [
    { title: "Nama", dataIndex: "name", key: "name" },
    { title: "Umur", dataIndex: "age", key: "age", width: 80 },
    { title: "Alamat", dataIndex: "location", key: "location", render: (text: string) => <span>({text})</span> },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "No. Telepon 1", dataIndex: "phone", key: "phone" },
    { title: "No. Telepon 2", dataIndex: "cell", key: "cell" },
    {
      title: "Gambar",
      dataIndex: "picture",
      key: "picture",
      render: (pic: string[] | string) => {
        const src = Array.isArray(pic) ? pic[0] : pic
        return <Image src={src} alt="user" width={80} height={50} style={{ borderRadius: 8 }} />
      },
    },
  ]

  return (
    <div>
      <Space style={{ marginBottom: 16, display: "flex", justifyContent: "space-between" }}>
        <Search
          placeholder="Search"
          onSearch={(val) => setSearchText(val)}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 200 }}
        />
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
          New Data
        </Button>
      </Space>

      <Table
        dataSource={filteredUsers.map((u, idx) => ({ ...u, key: u.id || idx }))}
        columns={columns}
        loading={loading}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          showSizeChanger: true,
          total: 5000,
        }}
        onChange={handleTableChange}
      />

      <Modal
        title="Tambah User Baru"
        open={isModalOpen}
        onOk={handleAddUser}
        onCancel={() => setIsModalOpen(false)}
        okText="Tambah"
        cancelText="Batal"
      >
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="name" label="Nama" rules={[{ required: true, message: "Masukkan nama" }]}>
                <Input placeholder="Nama" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="age" label="Umur" rules={[{ required: true, message: "Masukkan umur" }]}>
                <Input type="number" placeholder="Umur" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="location" label="Alamat" rules={[{ required: true, message: "Masukkan alamat" }]}>
                <Input placeholder="Alamat" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="email" label="Email" rules={[{type:"email", required: true, message: "Masukkan email" }]}>
                <Input placeholder="Email" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="phone" label="No. Telepon 1" rules={[{ required: true, message: "Masukkan no. telepon" }]}>
                <Input placeholder="No. Telepon 1" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="cell" label="No. Telepon 2">
                <Input placeholder="No. Telepon 2" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="picture" label="URL Gambar">
                <Input placeholder="https://example.com/photo.jpg" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  )
}

export default UserTable
