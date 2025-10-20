import { useState } from "react"
import { Table, Button, Tag, Space } from "antd"
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"

export const UsersTable = ({ userData }: any) => {
  const [loading, setLoading] = useState(false)

  const handleEdit = (payload: any) => {
    console.log("edit")
  }

  const handleDelete = (payload: any) => {
    console.log("delete")
  }

  // const data = [
  //   {
  //     id: 1,
  //     name: "Иван Иванов",
  //     email: "ivan@mail.ru",
  //     createdAt: "2024-01-15",
  //     status: "active",
  //     role: "admin",
  //     tel: "+375292932269",
  //   },
  //   {
  //     id: 2,
  //     name: "Петя Иванов",
  //     email: "ivan@mail.ru",
  //     createdAt: "2024-01-15",
  //     status: "active",
  //     role: "admin",
  //     tel: "+375292932269",
  //   },
  //   // ... больше данных
  // ]

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      //   sorter: (a: any, b: any) => a.name.localeCompare(b.name),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      //   sorter: (a: any, b: any) => a.name.localeCompare(b.name),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Registration date",
      dataIndex: "createdAt",
      key: "createdAt",
      //   sorter: (a: any, b: any) => new Date(a.createdAt) - new Date(b.createdAt),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      //   render: (status: any) => (
      //     <Tag color={status === "active" ? "green" : "red"}>
      //       {status === "active" ? "Активен" : "Неактивен"}
      //     </Tag>
      //   ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      //   filters: [
      //     { text: "Админ", value: "admin" },
      //     { text: "Пользователь", value: "user" },
      //   ],
      //   onFilter: (value: any, record: any) => record.role === value,
    },
    {
      title: "Phone number",
      dataIndex: "tel",
      key: "tel",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            size="small"
            onClick={() => handleEdit(record)}
          />
          <Button
            icon={<DeleteOutlined />}
            size="small"
            danger
            onClick={() => handleDelete(record.id)}
          />
        </Space>
      ),
    },
  ]

  const pagination = {
    pageSize: 10,
    showSizeChanger: true,
    showTotal: (total: any, range: any) =>
      `${range[0]}-${range[1]} из ${total} записей`,
  }

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={userData}
      pagination={pagination}
      loading={loading}
      scroll={{ x: 800 }}
      size="middle"
    />
  )
}
