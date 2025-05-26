import { useEffect, useState } from "react"
import { getTodos } from "../api/todos"
import { TodoForm } from "../components/TodoForm/TodoForm"
import { TodoList } from "../components/TodosList/TodoList"
import { TodoFilter } from "../components/TodoFilter/TodoFilter"
import "./TodoListPage.scss"

const TodoListPage = () => {
  const [todos, setTodos] = useState([])
  const [valueOfTodosStatus, setValueOfTodosStatus] = useState({
    all: 0,
    inWork: 0,
    completed: 0,
  })
  const [activTodosStatus, setActivTodosStatus] = useState("all")

  const fetchTodos = async (status) => {
    try {
      const response = await getTodos(status)
      setValueOfTodosStatus({
        all: response.info.all,
        inWork: response.info.inWork,
        completed: response.info.completed,
      })
      setTodos(response.data)
    } catch (error) {
      alert("HTTP error! Restart your browser.")
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  const changeaActivTodosStatus = (status) => {
    setActivTodosStatus(status)
  }

  return (
    <div className="todo">
      <TodoForm fetchTodos={() => fetchTodos(activTodosStatus)} />
      <TodoFilter
        fetchTodos={fetchTodos}
        valueOfTodosStatus={valueOfTodosStatus}
        activTodosStatus={activTodosStatus}
        changeaActivTodosStatus={changeaActivTodosStatus}
      />
      <TodoList todo={todos} fetchTodos={() => fetchTodos(activTodosStatus)} />
    </div>
  )
}

export default TodoListPage
