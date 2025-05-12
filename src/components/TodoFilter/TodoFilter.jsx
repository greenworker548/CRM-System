import { Button } from "../Button/Button"
import "./TodoFilter.scss"

export const TodoFilter = ({render, valueAll, valueInWork, valueCompleted}) => {
    return (
        <div className="todo-filter">
            <Button type="button" className="button secondary" onHandler={() => render("all")}>{`All (${valueAll})`}</Button>
            <Button type="button" className="button secondary" onHandler={() => render("inWork")}>{`In work (${valueInWork})`}</Button>
            <Button type="button" className="button secondary" onHandler={() => render("completed")}>{`Completed (${valueCompleted})`}</Button>
        </div>
    )
}