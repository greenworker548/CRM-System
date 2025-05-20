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
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(initialTitle)
  const [error, setError] = useState(null)

  const handleCompleteTodoItem = async () => {
    await changeTodos(id, initialTitle, !checked)
    await render(activTodosStatus)
  }

  const handleStartEditing = () => {
    setEditedTitle(initialTitle)
    setError(null)
    setIsEditing(true)
  }

  const handleSave = async () => {
    const validation = validateTodoTitle(editedTitle)
    if (!validation.isValid) {
      setError(validation.message)
      return
    }

    await changeTodos(id, editedTitle, checked)
    setIsEditing(false)
    await render(activTodosStatus)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditedTitle(initialTitle)
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

        {isEditing ? (
          <input
            type="text"
            className="todo-item__edit-input"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            autoFocus
          />
        ) : (
          <p className={`todo-item__content ${checked ? "completed" : ""}`}>
            {initialTitle}
          </p>
        )}

        <div className="todo-item__buttons-wrapper">
          {isEditing ? (
            <>
              <Button
                type="button"
                className="button success"
                onHandler={handleSave}
              >
                <img src={"iconSave"} alt="Save" />
              </Button>
              <Button
                type="button"
                className="button warning"
                onHandler={handleCancel}
              >
                <img src={"iconCancel"} alt="Cancel" />
              </Button>
            </>
          ) : (
            <Button
              type="button"
              className="button primary"
              onHandler={handleStartEditing}
            >
              <img src={iconEdit} alt="Edit" />
            </Button>
          )}

          <Button
            type="button"
            className="button danger"
            onHandler={handleDeleteTodoItem}
          >
            <img src={iconRemove} alt="Delete" />
          </Button>
        </div>
      </li>

      {error && (
        <Popup isOpen={!!error} onClose={closeErrorPopup}>
          <ErrorContent error={error} onClose={closeErrorPopup} />
        </Popup>
      )}
    </>
  )
}
