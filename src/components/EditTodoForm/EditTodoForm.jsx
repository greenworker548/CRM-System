import { Form } from "../Form/Form"
import { Input } from "../Input/Input"
import { Button } from "../Button/Button"
import "./EditTodoForm.scss"

export const EditTodoForm = ({ value, onChange, onSubmit, onCancel }) => {
  return (
    <Form onSubmit={onSubmit}>
      <Input value={value} onChange={onChange} />
      <div className="todo-edit-form__buttons-wrapper">
        <Button type="submit" className="button secondary">
          Save
        </Button>
        <Button type="button" className="button danger" onHandler={onCancel}>
          Cancel
        </Button>
      </div>
    </Form>
  )
}
