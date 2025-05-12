import { useState } from "react"
import { Button } from "../Button/Button"
import { addTodos } from "../../api/todos"
import { Form } from "../Form/Form"
import { Input } from "../Input/Input"
import { validateTodoTitle } from "../../utils/validation"
import { Popup } from "../Popup/Popup"
import { ErrorContent } from "../ErrorContent/ErrorContent"
import "./TodoForm.scss"

export const TodoForm = ({ render }) => {
    const [title, setTitle] = useState("")
    const [error, setError] = useState(null)

    const handleSubmitForm = async (event) => {
        event.preventDefault()

        const validation = validateTodoTitle(title);
        if (!validation.isValid) {
          setError(validation.message)
          return
        }
        
        await addTodos(title)
        await render()
        setTitle("")
    }

    const closeErrorPopup = () => {
        setError(null)
    }

    return (
        <>
            <Form className="form todo-form" onSubmit={handleSubmitForm}>
                <Input className="form-inp" value={title} onChange={(event) => setTitle(event.target.value)} />
                <Button type="submit" className="button primary">Add</Button>
            </Form>

            <Popup isOpen={!!error} onClose={closeErrorPopup}>
                <ErrorContent error={error} onClose={closeErrorPopup} />
            </Popup>
        </>
    )
}