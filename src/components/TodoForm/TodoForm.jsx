import { useState } from "react"
import { Button } from "../Button/Button"
import { addTodos } from "../../api/todos"

export const TodoForm = ({ render }) => {
    const [title, setTitle] = useState("")

    const handleSubmitForm = async (event) => {
        event.preventDefault()
        
        await addTodos(title)
        await render()
        setTitle("")
    }

    const handleResetForm = () => {
        setTitle("")
    }

    return (
        <form>
            <label>
                <input type="text" value={title} onChange={(event) => setTitle(event.target.value)}/>
            </label>
            <Button type="submit" onHandler={handleSubmitForm}>add</Button>
            <Button type="reset" onHandler={handleResetForm}>reset</Button>
        </form>
    )
}