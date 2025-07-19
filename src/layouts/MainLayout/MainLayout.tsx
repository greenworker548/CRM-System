import { Outlet } from 'react-router-dom'
import Sidebar from '../Sidebar/Sidebar'
import "./MainLayout.scss"

const MainLayout = () => {
  return (
    <div className='lauout'>
      <Sidebar />
      <main className='lauout__content'>
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout