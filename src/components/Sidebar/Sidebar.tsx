import { Menu } from "antd"
import { UserOutlined, CheckSquareOutlined } from "@ant-design/icons"
import type { MenuProps } from "antd"
import { NavLink, useLocation } from "react-router-dom"
import "./Sidebar.scss"
import { useEffect, useState } from "react"
import { useAuth } from "../../hooks/useAuth"

const Sidebar = () => {
  const location = useLocation()
  const { profile } = useAuth()
  const [isAdmin, setIsAdmin] = useState<boolean>(false)

  const getUserProfile = async () => {
    try {
      const userProfile = await profile()

      if (userProfile.roles.length > 1) setIsAdmin(true)
    } catch (error) {
      alert("HTTP error! Restart your browser.")
    }
  }

  useEffect(() => {
    getUserProfile()
  }, [])

  const menuItems: MenuProps["items"] = [
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

  const adminMenuItems: MenuProps["items"] = [
    {
      key: "/users",
      icon: <UserOutlined />,
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
