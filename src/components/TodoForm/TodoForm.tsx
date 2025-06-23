import { useState, FormEvent, ChangeEvent } from "react"
import { Button } from "../Button/Button"
import { addTodos } from "../../api/todos"
import { validateTodoTitle } from "../../utils/validation"
import { Modal } from "../Modal/Modal"
import "./TodoForm.scss"

interface TodoFormProps {
  fetchTodos: () => Promise<void>
}

export const TodoForm = ({ fetchTodos }: TodoFormProps) => {
  const [title, setTitle] = useState("")
  const [error, setError] = useState<string | null>(null)

  const handleSubmitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

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
      <form className="todo-form" onSubmit={handleSubmitForm}>
        <input
          type="text"
          className="input"
          value={title}
          placeholder="Write something..."
          onChange={handleInputChange}
          autoFocus
        />

        <Button type="submit" variant="primary">
          Add ToDo item
        </Button>
      </form>

      <Modal isOpen={!!error}>
        <div className="error__content">
          <h3>ERROR!</h3>
          <p>{error}</p>
          <Button type="button" onHandler={closeErrorModal} variant="secondary">
            Ok
          </Button>
        </div>
      </Modal>
    </>
  )
}
