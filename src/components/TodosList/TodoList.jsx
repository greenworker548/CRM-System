import { TodoItem } from "../TodoItem/TodoItem"

export const TodoList = ({ arrData, activTodosStatus, render }) => {
  return (
    <ul>
      {arrData.map((item) => (
        <TodoItem
          id={item.id}
          checked={item.isDone}
          title={item.title}
          activTodosStatus={activTodosStatus}
          render={render}
          key={item.id}
        />
      ))}
    </ul>
  )
}
