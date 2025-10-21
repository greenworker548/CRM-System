import { useEffect, useState } from "react"
import { UsersTable } from "../../components/UsersTable/UsersTable"
import "./UsersPage.scss"
import { getUsers } from "../../api/users"
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
      isBlocked, // undefined - все, true - заблокированные, false - активные
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
        onSortChange={handleSortChange}
        onBlockedFilterChange={handleBlockedFilterChange}
        currentBlockedFilter={filters.isBlocked}
      />
    </div>
  )
}

export default UsersPage
