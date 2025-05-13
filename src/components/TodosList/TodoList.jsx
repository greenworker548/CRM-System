import { TodoItem } from "../TodoItem/TodoItem"

export const TodoList = ({ arrData, render }) => {
  return (
    <ul>
      {arrData.map((item) => (
        <TodoItem
          id={item.id}
          checked={item.isDone}
          title={item.title}
          key={item.id}
          render={render}
        />
      ))}
    </ul>
  )
}
