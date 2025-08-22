import TodoListPage from "./pages/TodoListPage/TodoListPage"
import ProfilePage from "./pages/ProfilePage/ProfilePage"
import { Route, Routes } from "react-router-dom"
import MainLayout from "./layouts/MainLayout/MainLayout"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<TodoListPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
