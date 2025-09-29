import { Button, Form, Input, Typography } from "antd"
import { signup } from "../../api/auth"
import { UserRegistration } from "../../types/auth"
import { Link } from "react-router-dom"
import "./RegisterPage.scss"

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

const { Title, Text } = Typography

const handleSubmit = async (values: UserRegistration) => {
  try {
    await signup(values)
  } catch (error) {
    alert("HTTP error! Restart your browser.")
  }
}

const RegisterPage = () => {
  return (
    <div className="register-page">
      <Title level={3} className="register-page_title">
        Sign Up
      </Title>
      <Form
        name="basic"
        labelCol={{ span: 6 }}
        style={{ maxWidth: 600 }}
        onFinish={handleSubmit}
        autoComplete="off"
        className="register-page_form"
      >
        <Form.Item<UserRegistration>
          label="Login"
          name="login"
          rules={[{ required: true, message: "Please input your login!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<UserRegistration>
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<UserRegistration>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<UserRegistration>
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<UserRegistration>
          label="Phone number"
          name="phoneNumber"
          rules={[
            { required: true, message: "Please input your phonenumber!" },
          ]}
        >
          <Input />
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
        Have an account? <Link to="/login">Log in.</Link>
      </Text>
    </div>
  )
}

export default RegisterPage
