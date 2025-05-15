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

  const renderTodos = async (status) => {
    const response = await getTodos(status)
    setValueOfTodosStatus({
      all: response.info.all,
      inWork: response.info.inWork,
      completed: response.info.completed,
    })
    setTodos(response.data)
  }

  useEffect(() => {
    renderTodos()
  }, [])

  const changeaActivTodosStatus = (status) => {
    setActivTodosStatus(status)
  }

  return (
    <div className="todo">
      <TodoForm activTodosStatus={activTodosStatus} render={renderTodos} />
      <TodoFilter
        render={renderTodos}
        valueOfTodosStatus={valueOfTodosStatus}
        activTodosStatus={activTodosStatus}
        changeaActivTodosStatus={changeaActivTodosStatus}
      />
      <TodoList
        arrData={todos}
        activTodosStatus={activTodosStatus}
        render={renderTodos}
      />
    </div>
  )
}

export default TodoListPage
