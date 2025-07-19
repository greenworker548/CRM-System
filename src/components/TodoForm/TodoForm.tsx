import { Form, Input, Button } from "antd"
import { addTodos } from "../../api/todos"
import "./TodoForm.scss"

interface TodoFormProps {
  fetchTodos: () => Promise<void>
}

export const TodoForm = ({ fetchTodos }: TodoFormProps) => {
  const [form] = Form.useForm()

  const handleSubmit = async (values: { title: string }) => {
    try {
      await addTodos(values.title)
      await fetchTodos()
      form.resetFields()
    } catch (error) {
      alert("HTTP error! Restart your browser.")
    }
  }

  return (
    <Form
      form={form}
      className="todo-form"
      onFinish={handleSubmit}
      initialValues={{ title: "" }}
    >
      <Form.Item
        name="title"
        rules={[
          { required: true, message: "Поле не может быть пустым!" },
          { min: 2, message: "Минимум 2 символа!" },
          { max: 64, message: "Максимум 64 символа!" },
        ]}
        className="todo-form__item"
      >
        <Input placeholder="Write something..." autoFocus />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="button">
          Add ToDo item
        </Button>
      </Form.Item>
    </Form>
  )
}