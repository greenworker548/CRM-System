import { useEffect, useState } from "react"
import { getTodos } from "./api/todos"
import { TodoForm } from "./components/TodoForm/TodoForm"
import { TodoList } from "./components/TodosList/TodoList"

function App() {
  const [todos, setTodos] = useState([])

  const renderTodos = async () => {
    const response = await getTodos()
    setTodos(response.data)
  }

  useEffect(() => {
    renderTodos()
  }, [])

  return (
    <div>
      <TodoForm render={renderTodos}/>
      <TodoList arrData={todos} render={renderTodos}/>
    </div>
  )
}

export default App