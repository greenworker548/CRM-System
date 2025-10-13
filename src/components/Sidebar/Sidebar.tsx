import { Menu } from "antd"
import { UserOutlined, CheckSquareOutlined } from "@ant-design/icons"
import type { MenuProps } from "antd"
import { NavLink, useLocation } from "react-router-dom"
import "./Sidebar.scss"

const Sidebar = () => {
  const location = useLocation()

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

  return (
    <div className="sidebar">
      <Menu
        mode="inline"
        items={menuItems}
        defaultSelectedKeys={[location.pathname]}
      />
    </div>
  )
}

export default Sidebar
