import { useState } from "react"
import { Table, Button, Tag, Space, Dropdown, Menu, Modal } from "antd"
import { EditOutlined, DeleteOutlined, FilterOutlined } from "@ant-design/icons"

export const UsersTable = ({
  usersData,
  onSortChange,
  onBlockedFilterChange,
  currentBlockedFilter,
  onDeleteUser,
}: any) => {
  const [loading, setLoading] = useState(false)
  const [userToDelete, setUserToDelete] = useState<any>(null)

  const handleEdit = (payload: any) => {
    console.log("edit")
  }

  const handleDelete = (user: any) => {
    setUserToDelete(user)
  }

  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    if (sorter.order === undefined) {
      onSortChange("id", "asc")
      return
    }

    if (sorter.field && onSortChange) {
      const sortOrder = sorter.order === "ascend" ? "asc" : "desc"
      onSortChange(sorter.field, sortOrder)
    }
  }

  const handleStatusFilterSelect = ({ key }: any) => {
    const selectedOption = statusFilterOptions.find(
      (option) => option.key === key
    )
    if (selectedOption && onBlockedFilterChange) {
      onBlockedFilterChange(selectedOption.value)
    }
  }

  const statusFilterOptions = [
    {
      key: "all",
      label: "All",
      value: undefined,
    },
    {
      key: "active",
      label: "Active",
      value: false,
    },
    {
      key: "blocked",
      label: "Blocked",
      value: true,
    },
  ]

  const statusFilterMenu = (
    <Menu onClick={handleStatusFilterSelect}>
      <Menu.Item key="all">All</Menu.Item>
      <Menu.Item key="active">Active</Menu.Item>
      <Menu.Item key="blocked">Blocked</Menu.Item>
    </Menu>
  )

  const columns: any = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "username",
      key: "username",
      sorter: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: true,
    },
    {
      title: "Registration date",
      dataIndex: "date",
      key: "date",
      render: (dateString: string) => {
        if (!dateString) return "—"

        try {
          const date = new Date(dateString)
          return date.toLocaleDateString("ru-RU", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })
        } catch (error) {
          return "—"
        }
      },
    },
    {
      title: (
        <>
          <span>Status</span>
          <Dropdown overlay={statusFilterMenu} trigger={["click"]}>
            <Button
              type={currentBlockedFilter !== undefined ? "primary" : "default"}
              size="small"
              icon={<FilterOutlined />}
            >
              {currentBlockedFilter === undefined && "All"}
              {currentBlockedFilter === false && "Active"}
              {currentBlockedFilter === true && "Blocked"}
            </Button>
          </Dropdown>
        </>
      ),
      dataIndex: "isBlocked",
      key: "isBlocked",
      render: (status: any) => (
        <Tag color={status === false ? "green" : "red"}>
          {status === false ? "Active" : "Blocked"}
        </Tag>
      ),
    },
    {
      title: "Phone number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      render: (phoneNumber: any) => {
        if (!phoneNumber || phoneNumber.trim() === "") {
          return "—"
        }
        return phoneNumber
      },
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
            onClick={() => handleDelete(record)}
          />
        </Space>
      ),
    },
  ]

  const pagination = {
    showTotal: (total: any, range: any) =>
      `${range[0]}-${range[1]} из ${total} записей`,
  }

  return (
    <>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={usersData}
        pagination={pagination}
        loading={loading}
        scroll={{ x: 800 }}
        size="middle"
        onChange={handleTableChange}
      />

      <Modal
        title="Удалить пользователя?"
        open={!!userToDelete}
        onOk={() => {
          onDeleteUser(userToDelete.id)
          setUserToDelete(null)
        }}
        onCancel={() => setUserToDelete(null)}
        okText="Удалить"
        cancelText="Отмена"
        okType="danger"
      >
        {userToDelete && (
          <p>
            Вы уверены, что хотите удалить пользователя{" "}
            <strong>{userToDelete.username}</strong> ({userToDelete.email})?
          </p>
        )}
      </Modal>
    </>
  )
}
