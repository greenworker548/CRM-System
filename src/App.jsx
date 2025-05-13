import { useEffect, useState } from "react"
import { getTodos } from "./api/todos"
import { TodoForm } from "./components/TodoForm/TodoForm"
import { TodoList } from "./components/TodosList/TodoList"
import { TodoFilter } from "./components/TodoFilter/TodoFilter"
import "./App.scss"

function App() {
  const [valueOfTodosStatus, setValueOfTodosStatus] = useState({
    all: 0,
    inWork: 0,
    completed: 0,
  }) // объект с количеством тудушек
  const [todos, setTodos] = useState([]) // массив тудушек для рендера

  // коллбэк отрисовки тудушек
  const renderTodos = async (status) => {
    const response = await getTodos(status)

    setValueOfTodosStatus({
      all: response.info.all,
      inWork: response.info.inWork,
      completed: response.info.completed,
    })

    setTodos(response.data)
  }

  // первичная отрисовка тудушек
  useEffect(() => {
    renderTodos()
  }, [])

  return (
    <div className="todo">
      <TodoForm render={renderTodos} />
      <TodoFilter
        render={renderTodos}
        valueAll={valueOfTodosStatus.all}
        valueInWork={valueOfTodosStatus.inWork}
        valueCompleted={valueOfTodosStatus.completed}
      />
      <TodoList arrData={todos} render={renderTodos} />
    </div>
  )
}

export default App
