import { useState } from "react"
import { Table, Button, Tag, Space, Dropdown, Menu, Modal, Select } from "antd"
import {
  EditOutlined,
  DeleteOutlined,
  FilterOutlined,
  LockOutlined,
  UnlockOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons"
import { Roles } from "../../types/users"

const { Option } = Select

export const UsersTable = ({
  usersData,
  onSortChange,
  onBlockedFilterChange,
  currentBlockedFilter,
  onDeleteUser,
  onBlockUser,
  onUnblockUser,
  onUpdateUserRoles,
}: any) => {
  const [loading, setLoading] = useState(false)
  const [userToDelete, setUserToDelete] = useState<any>(null)
  const [userToBlock, setUserToBlock] = useState<any>(null)

  const [userToEditRoles, setUserToEditRoles] = useState<any>(null)
  const [selectedRoles, setSelectedRoles] = useState<Roles[]>([])

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

  const handleBlockUser = (user: any) => {
    setUserToBlock(user)
  }

  const handleEditRoles = (user: any) => {
    setUserToEditRoles(user)
    setSelectedRoles(user.roles || [])
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
      title: "Roles",
      dataIndex: "roles",
      key: "roles",
      render: (roles: Roles[], record: any) => (
        <Space wrap>
          {roles.map((role: Roles) => (
            <Tag
              color={
                role === Roles.ADMIN
                  ? "red"
                  : role === Roles.MODERATOR
                  ? "blue"
                  : "green"
              }
              key={role}
            >
              {role}
            </Tag>
          ))}
        </Space>
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
            icon={<UserSwitchOutlined />}
            size="small"
            onClick={() => handleEditRoles(record)}
          />
          <Button
            icon={record.isBlocked ? <UnlockOutlined /> : <LockOutlined />}
            size="small"
            type={record.isBlocked ? "primary" : "default"}
            danger={!record.isBlocked}
            onClick={() => handleBlockUser(record)}
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

      <Modal
        title={
          userToBlock?.isBlocked
            ? "Разблокировать пользователя?"
            : "Заблокировать пользователя?"
        }
        open={!!userToBlock}
        onOk={() => {
          if (userToBlock.isBlocked) {
            onUnblockUser(userToBlock.id)
          } else {
            onBlockUser(userToBlock.id)
          }
          setUserToBlock(null)
        }}
        onCancel={() => setUserToBlock(null)}
        okText={userToBlock?.isBlocked ? "Разблокировать" : "Заблокировать"}
        cancelText="Отмена"
        okType={userToBlock?.isBlocked ? "default" : "danger"}
      >
        {userToBlock && (
          <p>
            Вы уверены, что хотите{" "}
            {userToBlock.isBlocked ? "разблокировать" : "заблокировать"}{" "}
            пользователя <strong>{userToBlock.username}</strong> (
            {userToBlock.email})?
          </p>
        )}
      </Modal>

      <Modal
        title="Изменить роли пользователя?"
        open={!!userToEditRoles}
        onOk={() => {
          onUpdateUserRoles(userToEditRoles.id, selectedRoles)
          setUserToEditRoles(null)
        }}
        onCancel={() => setUserToEditRoles(null)}
        okText="Сохранить"
        cancelText="Отмена"
      >
        {userToEditRoles && (
          <div>
            <p>
              Выберите роли для пользователя{" "}
              <strong>{userToEditRoles.username}</strong>:
            </p>
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="Выберите роли"
              value={selectedRoles}
              onChange={setSelectedRoles}
            >
              <Option value={Roles.USER}>USER</Option>
              <Option value={Roles.MODERATOR}>MODERATOR</Option>
              <Option value={Roles.ADMIN}>ADMIN</Option>
            </Select>
          </div>
        )}
      </Modal>
    </>
  )
}
