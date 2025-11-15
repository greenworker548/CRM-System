import { Menu } from "antd"
import {
  UserOutlined,
  CheckSquareOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons"
import { NavLink, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import "./Sidebar.scss"

const Sidebar = () => {
  const location = useLocation()
  const { profile } = useAuth()
  const [isAdmin, setIsAdmin] = useState<boolean>(false)

  const getUserProfile = async () => {
    try {
      const userProfile = await profile()

      if (
        userProfile?.roles?.includes("ADMIN") ||
        userProfile?.roles?.includes("MODERATOR")
      ) {
        setIsAdmin(true)
      }
    } catch (error) {
      alert("HTTP error! Restart your browser.")
    }
  }

  useEffect(() => {
    getUserProfile()
  }, [])

  const menuItems = [
    {
      key: "/",
      icon: <CheckSquareOutlined />,
      label: (
        <NavLink to="/" className="sidebar__link">
          Todo
        </NavLink>
      ),
    },
    {
      key: "/profile",
      icon: <UserOutlined />,
      label: (
        <NavLink to="/profile" className="sidebar__link">
          Profile
        </NavLink>
      ),
    },
  ]

  const adminMenuItems = [
    {
      key: "/users",
      icon: <UserSwitchOutlined />,
      label: (
        <NavLink to="/users" className="sidebar__link">
          Users
        </NavLink>
      ),
    },
  ]

  return (
    <div className="sidebar">
      <Menu
        mode="inline"
        items={isAdmin ? [...menuItems, ...adminMenuItems] : menuItems}
        defaultSelectedKeys={[location.pathname]}
      />
    </div>
  )
}

export default Sidebar
