import { Button } from "../Button/Button"
import "./TodoFilter.scss"

export const TodoFilter = ({
  fetchTodos,
  valueOfTodosStatus,
  activTodosStatus,
  changeaActivTodosStatus,
}) => {
  const handleChangeActivStatus = async (status) => {
    await changeaActivTodosStatus(status)
    await fetchTodos(status)
  }

  return (
    <div className="todo-filter">
      <Button
        type="button"
        variant={`outline ${activTodosStatus === "all" ? "active" : ""}`}
        onHandler={() => handleChangeActivStatus("all")}
      >{`All (${valueOfTodosStatus.all})`}</Button>
      <Button
        type="button"
        variant={`outline ${activTodosStatus === "inWork" ? "active" : ""}`}
        onHandler={() => handleChangeActivStatus("inWork")}
      >{`In work (${valueOfTodosStatus.inWork})`}</Button>
      <Button
        type="button"
        variant={`outline ${activTodosStatus === "completed" ? "active" : ""}`}
        onHandler={() => handleChangeActivStatus("completed")}
      >{`Completed (${valueOfTodosStatus.completed})`}</Button>
    </div>
  )
}
