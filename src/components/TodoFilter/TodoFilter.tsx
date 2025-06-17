import { Button } from "../Button/Button"
import { ValueOfTodosStatus, ActivTodosStatus } from "../../types/common"
import "./TodoFilter.scss"

interface TodoFilterProps {
  activTodosStatus: ActivTodosStatus,
  valueOfTodosStatus: ValueOfTodosStatus,
  fetchTodos: (status: ActivTodosStatus) => Promise<void>,
  changeaActivTodosStatus: (status: ActivTodosStatus) => void
}

export const TodoFilter = ({
  activTodosStatus,
  valueOfTodosStatus,
  fetchTodos,
  changeaActivTodosStatus,
}: TodoFilterProps) => {
  const handleChangeActivStatus = async (status: ActivTodosStatus) => {
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
