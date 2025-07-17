import { useState } from "react"
import { changeTodos, deleteTodos } from "../../api/todos"
import { validateTodoTitle } from "../../utils/validation"
import iconRemove from "../../assets/icon/icon-remove.png"
import iconEdit from "../../assets/icon/icon-edit.png"
import iconSave from "../../assets/icon/icon-save.png"
import iconCancel from "../../assets/icon/icon-cancel.png"
import "./TodoItem.scss"

import { Button, Input, Modal, Checkbox } from "antd"

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
    await changeTodos(id, {title: title, isDone: !checked})
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

    await changeTodos(id, {title: editedTitle, isDone: checked})
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
          <Checkbox
            checked={checked}
            onChange={handleCompleteTodoItem}
          />
        </div>

        {isEditing ? (
          <Input
            type="text"
            className="input"
            value={editedTitle}
            placeholder="Write something..."
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
              <Button
                htmlType="button"
                type="default"
                className="button"
                onClick={handleSave} 
                icon={<img src={iconSave} alt="Save" />}
              />
              <Button
                htmlType="button"
                type="default"
                className="button"
                onClick={handleCancel}
                icon={<img src={iconCancel}alt="Cancel" />}
              />
            </>
          ) : (
            <Button
              htmlType="button"
              type="primary"
              className="button"
              onClick={handleStartEditing}
              icon={<img src={iconEdit} alt="Edit" />}
            />
          )}

          <Button
            htmlType="button"
            type="primary"
            className="button"
            onClick={handleDeleteTodoItem}
            icon={<img src={iconRemove} alt="Delete" />}
            danger
          />
        </div>
      </li>

      {error && (
        <Modal 
          open={!!error}
          onCancel={closeErrorModal}
          footer={[
            <Button 
              type="primary" 
              key="ok" 
              onClick={closeErrorModal}
            >
              OK
            </Button>
          ]}
          centered
          >
          <div className="error__content">
            <h3>ERROR!</h3>
            <p>{error}</p>
          </div>
        </Modal>
      )}
    </>
  )
}
