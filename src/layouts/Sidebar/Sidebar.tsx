import { NavLink } from "react-router-dom"
import "./Sidebar.scss"

const Sidebar = () => {
    return (
        <nav className="sidebar">
            <NavLink to="/" className="sidebar__link">Todo</NavLink>
            <NavLink to="/profile" className="sidebar__link">Profile</NavLink>
        </nav>
    )
}

export default Sidebar