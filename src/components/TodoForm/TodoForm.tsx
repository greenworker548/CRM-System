import { useState, FormEvent, ChangeEvent } from "react"
import { addTodos } from "../../api/todos"
import { validateTodoTitle } from "../../utils/validation"

import { Button, Input, Form, Modal } from "antd"

import "./TodoForm.scss"

interface TodoFormProps {
  fetchTodos: () => Promise<void>
}

export const TodoForm = ({ fetchTodos }: TodoFormProps) => {
  const [title, setTitle] = useState("")
  const [error, setError] = useState<string | null>(null)

  const handleSubmitForm = async (event: FormEvent<HTMLFormElement>) => {
    const validation = validateTodoTitle(title)

    if (!validation.isValid && validation.message) {
      setError(validation.message)
      return
    }

    try {
      await addTodos(title)
      await fetchTodos()
      setTitle("")
    } catch (error) {
      alert("HTTP error! Restart your browser.")
    }
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  };

  const closeErrorModal = () => {
    setError(null)
  }

  return (
    <>
      <Form className="todo-form" onFinish={handleSubmitForm}>
        <Input
          type="text"
          className="input"
          value={title}
          placeholder="Write something..."
          onChange={handleInputChange}
          autoFocus
        />

        <Button type="primary" htmlType="submit" className="button">
          Add ToDo item
        </Button>
      </Form>

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
    </>
  )
}
