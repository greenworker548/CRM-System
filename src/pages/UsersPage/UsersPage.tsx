import { useEffect, useState } from "react"
import { UsersTable } from "../../components/UsersTable/UsersTable"
import "./UsersPage.scss"
import {
  getUsers,
  deleteUser,
  blockUser,
  unblockUser,
  updatingUserRights,
} from "../../api/users"
import { Roles, UserFilters } from "../../types/users"
import { useAuth } from "../../hooks/useAuth"
import UsersPagination from "../../components/UsersPagination/UsersPagination"

const UsersPage = () => {
  const [users, setUsers] = useState<any>([])
  const [totalUsers, setTotalUsers] = useState<number>(0)
  const [filters, setFilters] = useState<UserFilters>({
    sortBy: "id",
    sortOrder: "asc",
    isBlocked: undefined,
    limit: 10,
    page: 0,
  })

  const { userProfile } = useAuth()

  const userRole = userProfile ? userProfile.roles : null

  const fetchUsers = async (params: UserFilters = {}): Promise<void> => {
    try {
      const response = await getUsers({
        ...filters,
        ...params,
      })
      setUsers(response.data)
      setTotalUsers(response.meta.totalAmount) // Используем totalAmount из meta
    } catch (error) {
      alert("HTTP error! Restart your browser.")
    }
  }

  const handleSortChange = (sortBy: string, sortOrder: "asc" | "desc") => {
    const newSortParams = {
      ...filters,
      sortBy,
      sortOrder,
    }

    setFilters(newSortParams)
    fetchUsers(newSortParams)
  }

  const handleBlockedFilterChange = (isBlocked: boolean | undefined) => {
    const newFilters = {
      ...filters,
      isBlocked,
    }
    setFilters(newFilters)
    fetchUsers(newFilters)
  }

  const handleDeleteUser = async (userId: number) => {
    try {
      await deleteUser(userId)
      await fetchUsers(filters)
    } catch (error) {
      alert("HTTP error! Restart your browser.")
    }
  }

  // Обработчик блокировки пользователя
  const handleBlockUser = async (userId: number) => {
    try {
      await blockUser(userId)
      await fetchUsers(filters)
    } catch (error) {
      alert("HTTP error! Restart your browser.")
    }
  }

  // Обработчик разблокировки пользователя
  const handleUnblockUser = async (userId: number) => {
    try {
      await unblockUser(userId)
      await fetchUsers(filters)
    } catch (error) {
      alert("HTTP error! Restart your browser.")
    }
  }

  // Обработчик обновления ролей пользователя
  const handleUpdateUserRoles = async (userId: number, newRoles: Roles[]) => {
    try {
      await updatingUserRights(userId, newRoles)
      await fetchUsers(filters)
    } catch (error) {
      alert("HTTP error! Restart your browser.")
    }
  }

  // Обработчик изменения пагинации
  const handlePaginationChange = (page: number, pageSize: number) => {
    const newFilters = {
      ...filters,
      page: page - 1, // Antd начинается с 1, API с 0
      limit: pageSize,
    }
    setFilters(newFilters)
    fetchUsers(newFilters)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div className="users-page">
      <UsersTable
        usersData={users}
        currentBlockedFilter={filters.isBlocked}
        onSortChange={handleSortChange}
        onBlockedFilterChange={handleBlockedFilterChange}
        onDeleteUser={handleDeleteUser}
        onBlockUser={handleBlockUser}
        onUnblockUser={handleUnblockUser}
        onUpdateUserRoles={handleUpdateUserRoles}
      />
      <UsersPagination 
        current={(filters.page || 0) + 1}
        pageSize={filters.limit || 10}
        total={totalUsers}
        onChange={handlePaginationChange}
      />
    </div>
  )
}

export default UsersPage
