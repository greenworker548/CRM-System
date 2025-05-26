import { TodoItem } from "../TodoItem/TodoItem"

export const TodoList = ({ todo, activTodosStatus, fetchTodos }) => {
  return (
    <ul>
      {todo.map((item) => (
        <TodoItem
          id={item.id}
          checked={item.isDone}
          title={item.title}
          fetchTodos={fetchTodos}
          key={item.id}
        />
      ))}
    </ul>
  )
}
