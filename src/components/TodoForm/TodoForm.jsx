import { useState } from "react"
import { Button } from "../Button/Button"
import { addTodos } from "../../api/todos"
import { validateTodoTitle } from "../../utils/validation"
import { Modal } from "../Modal/Modal"
import "./TodoForm.scss"

export const TodoForm = ({ fetchTodos }) => {
  const [title, setTitle] = useState("")
  const [error, setError] = useState(null)

  const handleSubmitForm = async (event) => {
    event.preventDefault()

    const validation = validateTodoTitle(title)
    if (!validation.isValid) {
      setError(validation.message)
      return
    }

    await addTodos(title)
    await fetchTodos()
    setTitle("")
  }

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
          onChange={(event) => setTitle(event.target.value)}
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
