import { useEffect, useState } from "react"
import { UsersTable } from "../../components/UsersTable/UsersTable"
import "./UsersPage.scss"
import { getUsers, deleteUser } from "../../api/users"
import { UserFilters } from "../../types/users"

const UsersPage = () => {
  const [users, setUsers] = useState<any>([])
  const [filters, setFilters] = useState<UserFilters>({
    sortBy: "id",
    sortOrder: "asc",
    isBlocked: undefined,
    limit: 100,
    page: 0,
  })

  const fetchUsers = async (params: UserFilters = {}): Promise<void> => {
    try {
      const response = await getUsers({
        ...filters,
        ...params,
      })
      setUsers(response.data)
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
      />
    </div>
  )
}

export default UsersPage
