import { useNavigate, Link } from "react-router-dom"
import { AuthData } from "../../types/auth"
import { Button, Form, Input, Typography } from "antd"
import { useAuth } from "../../hooks/useAuth"
import "./LoginPage.scss"
import { signin } from "../../api/auth"

const { Title, Text } = Typography

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
    <div className="login-page">
      <Title level={3} className="login-page_title">
        Sign In
      </Title>
      <Form
        name="basic"
        initialValues={{ remember: false }}
        onFinish={handleSubmit}
        className="login-page__form"
        labelCol={{ span: 5 }}
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

        <Form.Item
          wrapperCol={{
            offset: 0,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <Text>
        Not registered Yet? <Link to="/register">Create an account.</Link>
      </Text>
    </div>
  )
}

export default LoginPage
