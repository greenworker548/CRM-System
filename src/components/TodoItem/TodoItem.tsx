import { useState } from "react"
import { Button } from "../Button/Button"
import { changeTodos, deleteTodos } from "../../api/todos"
import { Modal } from "../Modal/Modal"
import { validateTodoTitle } from "../../utils/validation"
import iconRemove from "../../assets/icon/icon-remove.png"
import iconEdit from "../../assets/icon/icon-edit.png"
import iconSave from "../../assets/icon/icon-save.png"
import iconCancel from "../../assets/icon/icon-cancel.png"
import "./TodoItem.scss"

interface TodoItemProps {
  id: number,
  checked: boolean,
  title: string,
  fetchTodos: () => Promise<void>,
}

export const TodoItem = ({ id, checked, title, fetchTodos }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(title)
  const [error, setError] = useState<string | null>(null)

  const handleCompleteTodoItem = async () => {
    await changeTodos(id, title, !checked)
    await fetchTodos()
  }

  const handleStartEditing = () => {
    setEditedTitle(title)
    setError(null)
    setIsEditing(true)
  }

  const handleSave = async () => {
    const validation = validateTodoTitle(editedTitle)
    if (!validation.isValid && validation.message) {
      setError(validation.message)
      return
    }

    await changeTodos(id, editedTitle, checked)
    setIsEditing(false)
    await fetchTodos()
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditedTitle(title)
    setError(null)
  }

  const handleDeleteTodoItem = async () => {
    await deleteTodos(id)
    await fetchTodos()
  }

  const closeErrorModal = () => {
    setError(null)
  }

  return (
    <>
      <li className="todo-item">
        <div className="todo-item__checkbox-wrapper">
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
            className="input"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            autoFocus
          />
        ) : (
          <p className={`todo-item__content ${checked ? "completed" : ""}`}>
            {title}
          </p>
        )}

        <div className="todo-item__buttons-wrapper">
          {isEditing ? (
            <>
              <Button type="button" variant="secondary" onHandler={handleSave}>
                <img src={iconSave} alt="Save" />
              </Button>
              <Button type="button" variant="outline" onHandler={handleCancel}>
                <img src={iconCancel} alt="Cancel" />
              </Button>
            </>
          ) : (
            <Button
              type="button"
              variant="primary"
              onHandler={handleStartEditing}
            >
              <img src={iconEdit} alt="Edit" />
            </Button>
          )}

          <Button
            type="button"
            variant="danger"
            onHandler={handleDeleteTodoItem}
          >
            <img src={iconRemove} alt="Delete" />
          </Button>
        </div>
      </li>

      {error && (
        <Modal isOpen={!!error}>
          <div className="error__content">
            <h3>ERROR!</h3>
            <p>{error}</p>
            <Button
              type="button"
              onHandler={closeErrorModal}
              variant="secondary"
            >
              Ok
            </Button>
          </div>
        </Modal>
      )}
    </>
  )
}
