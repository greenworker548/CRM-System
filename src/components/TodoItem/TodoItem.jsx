import { Button } from "../Button/Button"
import { deleteTodos } from "../../api/todos"

export const TodoItem = ({ id, checked, onToggle, title, created, render }) => {
    const handleDeleteTodoItem = async () => {
        await deleteTodos(id)
        await render()
    }

    return (
        <li>
            <div>
                <input type="checkbox" checked={checked} onChange={() => onToggle(id)} />
            </div>
            <div>
                {title}
            </div>
            <div>
                {created}
            </div>
            <Button type="submit">red</Button>
            <Button type="button" onHandler={handleDeleteTodoItem}>del</Button>
        </li>
    )
}