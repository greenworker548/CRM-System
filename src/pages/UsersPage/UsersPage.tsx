import { useEffect } from "react"
import { UsersTable } from "../../components/UsersTable/UsersTable"
import "./UsersPage.scss"

const UsersPage = () => {
  useEffect(() => {}, [])

  return (
    <div className="users-page">
      <UsersTable />
    </div>
  )
}

export default UsersPage
