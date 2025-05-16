import { useState } from "react"
import { Button } from "../Button/Button"
import { changeTodos, deleteTodos } from "../../api/todos"
import { Popup } from "../Popup/Popup"
import { validateTodoTitle } from "../../utils/validation"
import { ErrorContent } from "../ErrorContent/ErrorContent"
import { EditTodoForm } from "../EditTodoForm/EditTodoForm"
import iconRemove from "../../assets/icon/icon-remove.png"
import iconEdit from "../../assets/icon/icon-edit.png"
import "./TodoItem.scss"

export const TodoItem = ({
  id,
  checked,
  title: initialTitle,
  activTodosStatus,
  render,
}) => {
  const [popupStatus, setPopupStatus] = useState(false)
  const [contentTitle, setContentTitle] = useState(initialTitle)
  const [error, setError] = useState(null)

  const handleCompleteTodoItem = async () => {
    await changeTodos(id, initialTitle, !checked)
    await render(activTodosStatus)
  }

  const handleOpenPopup = () => {
    setContentTitle(initialTitle)
    setError(null)
    setPopupStatus(true)
  }

  const handleSaveNewTitle = async (event) => {
    event.preventDefault()

    const validation = validateTodoTitle(contentTitle)
    if (!validation.isValid) {
      setError(validation.message)
      return
    }

    await changeTodos(id, contentTitle, checked)
    setPopupStatus(false)
    await render(activTodosStatus)
  }

  const handleCancelChange = () => {
    setPopupStatus(false)
    setContentTitle(initialTitle)
    setError(null)
  }

  const handleDeleteTodoItem = async () => {
    await deleteTodos(id)
    await render(activTodosStatus)
  }

  const closeErrorPopup = () => {
    setError(null)
  }

  return (
    <>
      <li className="todo-item">
        <div>
          <input
            type="checkbox"
            className="todo-item__checkbox"
            checked={checked}
            onChange={handleCompleteTodoItem}
          />
        </div>
        <p className={`todo-item__content ${checked ? "completed" : ""}`}>
          {initialTitle}
        </p>
        <div className="todo-item__buttons-wrapper">
          <Button
            type="button"
            className="button primary"
            onHandler={handleOpenPopup}
          >
            <img src={iconEdit} alt="icon" />
          </Button>
          <Button
            type="button"
            className="button danger"
            onHandler={handleDeleteTodoItem}
          >
            <img src={iconRemove} alt="icon" />
          </Button>
        </div>
      </li>

      <Popup isOpen={popupStatus} onClose={handleCancelChange}>
        {error ? (
          <ErrorContent error={error} onClose={closeErrorPopup} />
        ) : (
          <EditTodoForm
            value={contentTitle}
            onChange={(event) => setContentTitle(event.target.value)}
            onSubmit={handleSaveNewTitle}
            onCancel={handleCancelChange}
          />
        )}
      </Popup>
    </>
  )
}
