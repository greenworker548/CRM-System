import { useState } from "react"
import { Table, Button, Tag, Space, Dropdown, Menu } from "antd"
import { EditOutlined, DeleteOutlined, FilterOutlined } from "@ant-design/icons"

export const UsersTable = ({
  usersData,
  onSortChange,
  onBlockedFilterChange,
  currentBlockedFilter,
}: any) => {
  const [loading, setLoading] = useState(false)

  const handleEdit = (payload: any) => {
    console.log("edit")
  }

  const handleDelete = (payload: any) => {
    console.log("delete")
  }

  // Обработчик изменения таблицы (сортировка)
  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    // Когда сортировка отключена (третий клик) - сбрасываем к дефолту
    if (sorter.order === undefined) {
      onSortChange("id", "asc")
      return
    }

    // Когда сортировка активна - преобразуем формат и отправляем
    if (sorter.field && onSortChange) {
      const sortOrder = sorter.order === "ascend" ? "asc" : "desc"
      onSortChange(sorter.field, sortOrder)
    }
  }

  // Опции для фильтра по статусу
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

  // Обработчик выбора фильтра
  const handleStatusFilterSelect = ({ key }: any) => {
    const selectedOption = statusFilterOptions.find(
      (option) => option.key === key
    )
    if (selectedOption && onBlockedFilterChange) {
      onBlockedFilterChange(selectedOption.value)
    }
  }

  // Меню для dropdown фильтра
  const statusFilterMenu = (
    <Menu
      onClick={handleStatusFilterSelect}
      selectedKeys={[
        statusFilterOptions.find((opt) => opt.value === currentBlockedFilter)
          ?.key || "all",
      ]}
    >
      {statusFilterOptions.map((option) => (
        <Menu.Item key={option.key}>{option.label}</Menu.Item>
      ))}
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
    },
    {
      title: (
        <Space>
          <span>Status</span>
          <Dropdown
            overlay={statusFilterMenu}
            trigger={["click"]}
            placement="bottomRight"
          >
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
        </Space>
      ),
      dataIndex: "isBlocked",
      key: "isBlocked",
      render: (status: any) => (
        <Tag color={status === false ? "green" : "red"}>
          {status === false ? "Активен" : "Заблокирован"}
        </Tag>
      ),
    },
    // {
    //   title: "Role",
    //   dataIndex: "roles",
    //   key: "roles",
    // },
    {
      title: "Phone number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
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
    showTotal: (total: any, range: any) =>
      `${range[0]}-${range[1]} из ${total} записей`,
  }

  return (
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
  )
}
