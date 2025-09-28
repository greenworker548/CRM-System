import { useNavigate } from "react-router-dom"
import { AuthData } from "../../types/auth"
import { Button, Form, Input } from "antd"
import { useAuth } from "../../hooks/useAuth"
import "./LoginPage.scss"
import { signin } from "../../api/auth"

// const VALIDATION_RULES = {
//   TITLE_MIN_LENGTH: 2,
//   TITLE_MAX_LENGTH: 64,
// }

// const ERROR_MESSAGES = {
//   EMPTY_FIELD: "Поле не может быть пустым!",
//   MIN_LENGTH: `Минимум ${VALIDATION_RULES.TITLE_MIN_LENGTH} символа!`,
//   MAX_LENGTH: `Максимум ${VALIDATION_RULES.TITLE_MAX_LENGTH} символов!`,
//   HTTP_ERROR: "HTTP error! Restart your browser.",
// }

const LoginPage = () => {
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = async (values: AuthData) => {
    try {
      const tokens = await signin(values)
      await login(tokens)
      navigate("/", { replace: true })
    } catch (error) {
      alert("HTTP error! Restart your browser.")
    }
  }

  return (
    <div>
      <h3>Log In</h3>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: false }}
        onFinish={handleSubmit}
        autoComplete="off"
        className="login-form"
      >
        <Form.Item<AuthData>
          label="Username"
          name="login"
          rules={[{ required: true, message: "Please input your login!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<AuthData>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>

      <Button type="primary" htmlType="button">
        Registration
      </Button>
    </div>
  )
}

export default LoginPage
