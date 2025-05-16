import { Button } from "../Button/Button"
import "./TodoFilter.scss"

export const TodoFilter = ({
  render,
  valueOfTodosStatus,
  activTodosStatus,
  changeaActivTodosStatus,
}) => {
  const handleChangeActivStatus = (status) => {
    changeaActivTodosStatus(status)
    render(status)
  }

  return (
    <div className="todo-filter">
      <Button
        type="button"
        className={`button outline ${
          activTodosStatus === "all" ? "active" : ""
        }`}
        onHandler={() => handleChangeActivStatus("all")}
      >{`All (${valueOfTodosStatus.all})`}</Button>
      <Button
        type="button"
        className={`button outline ${
          activTodosStatus === "inWork" ? "active" : ""
        }`}
        onHandler={() => handleChangeActivStatus("inWork")}
      >{`In work (${valueOfTodosStatus.inWork})`}</Button>
      <Button
        type="button"
        className={`button outline ${
          activTodosStatus === "completed" ? "active" : ""
        }`}
        onHandler={() => handleChangeActivStatus("completed")}
      >{`Completed (${valueOfTodosStatus.completed})`}</Button>
    </div>
  )
}
