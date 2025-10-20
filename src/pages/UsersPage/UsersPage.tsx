import { useEffect, useState } from "react"
import { UsersTable } from "../../components/UsersTable/UsersTable"
import "./UsersPage.scss"
import { getUsers } from "../../api/users"

const UsersPage = () => {
  const [user, setUser] = useState<any>([])

  const fetchUser = async (): Promise<void> => {
    try {
      const response = await getUsers()
      setUser(response.data)
    } catch (error) {
      alert("HTTP error! Restart your browser.")
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <div className="users-page">
      <UsersTable userData={user} />
    </div>
  )
}

export default UsersPage
