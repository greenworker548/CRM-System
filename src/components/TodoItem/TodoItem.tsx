import { useState } from "react"
import { Form, Input, Button, Checkbox, message } from "antd"
import { changeTodos, deleteTodos } from "../../api/todos"
import iconRemove from "../../assets/icon/icon-remove.png"
import iconEdit from "../../assets/icon/icon-edit.png"
import iconSave from "../../assets/icon/icon-save.png"
import iconCancel from "../../assets/icon/icon-cancel.png"
import "./TodoItem.scss"

const VALIDATION_RULES = {
  TITLE_MIN_LENGTH: 2,
  TITLE_MAX_LENGTH: 64,
}

const ERROR_MESSAGES = {
  EMPTY_FIELD: "Поле не может быть пустым!",
  MIN_LENGTH: `Минимум ${VALIDATION_RULES.TITLE_MIN_LENGTH} символа!`,
  MAX_LENGTH: `Максимум ${VALIDATION_RULES.TITLE_MAX_LENGTH} символов!`,
  HTTP_ERROR: "HTTP error! Restart your browser.",
}

interface TodoItemProps {
  id: number,
  checked: boolean,
  title: string,
  fetchTodos: () => Promise<void>,
}

export const TodoItem = ({ id, checked, title, fetchTodos }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [form] = Form.useForm()

  const handleCompleteTodoItem = async () => {
    await changeTodos(id, { title, isDone: !checked })
    await fetchTodos()
  }

  const handleStartEditing = () => {
    form.setFieldsValue({ title })
    setIsEditing(true)
  }

  const handleSave = async () => {
    const values = await form.validateFields()
    await changeTodos(id, { title: values.title, isDone: checked })
    setIsEditing(false)
    await fetchTodos()
  }

  const handleCancel = () => {
    setIsEditing(false)
    form.resetFields()
  }

  const handleDeleteTodoItem = async () => {
    await deleteTodos(id)
    await fetchTodos()
    message.success("Задача удалена")
  }

  return (
    <li className="todo-item">
      <div className="todo-item__checkbox-wrapper">
        <Checkbox checked={checked} onChange={handleCompleteTodoItem} />
      </div>

      {isEditing ? (
        <Form form={form} component={false}>
          <Form.Item
            name="title"
            rules={[
              { required: true, message: ERROR_MESSAGES.EMPTY_FIELD },
              { 
                min: VALIDATION_RULES.TITLE_MIN_LENGTH, 
                message: ERROR_MESSAGES.MIN_LENGTH 
              },
              { 
                max: VALIDATION_RULES.TITLE_MAX_LENGTH, 
                message: ERROR_MESSAGES.MAX_LENGTH 
              },
            ]}
            className="todo-form__item"
          >
            <Input autoFocus />
          </Form.Item>
        </Form>
      ) : (
        <p className={`todo-item__content ${checked ? "completed" : ""}`}>
          {title}
        </p>
      )}

      <div className="todo-item__buttons-wrapper">
        {isEditing ? (
          <>
            <Button
              onClick={handleSave}
              icon={<img src={iconSave} alt="Save" className="button"/>}
            />
            <Button
              onClick={handleCancel}
              icon={<img src={iconCancel} alt="Cancel" />}
            />
          </>
        ) : (
          <Button
            onClick={handleStartEditing}
            icon={<img src={iconEdit} alt="Edit" />}
          />
        )}
        <Button
          onClick={handleDeleteTodoItem}
          icon={<img src={iconRemove} alt="Delete" />}
          danger
        />
      </div>
    </li>
  )
}