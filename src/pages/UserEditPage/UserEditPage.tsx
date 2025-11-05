import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Form, Input, Button, Card } from "antd"
import { ArrowLeftOutlined } from "@ant-design/icons"
import { updatingUser, getUserOnId } from "../../api/users"
import { User, UserRequest } from "../../types/users"
import "./UserEditPage.scss"

const UserEditPage = () => {
  const { userId } = useParams()
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [userData, setUserData] = useState<User | null>(null)

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return

      try {
        const user = await getUserOnId(Number(userId))
        setUserData(user)
        form.setFieldsValue({
          username: user.username,
          email: user.email,
          phoneNumber: user.phoneNumber || "",
        })
      } catch {
        alert("HTTP error! Restart your browser.")
      }
    }

    fetchUserData()
  }, [userId, form])

  const handleSave = async (values: UserRequest) => {
    if (!userId || !userData) return

    try {
      const updateData: UserRequest = {}

      if (values.username !== userData.username) {
        updateData.username = values.username
      }

      if (values.email !== userData.email) {
        updateData.email = values.email
      }

      if (values.phoneNumber !== (userData.phoneNumber || "")) {
        updateData.phoneNumber = values.phoneNumber || undefined
      }

      if (Object.keys(updateData).length === 0) {
        navigate("/users")
        return
      }

      await updatingUser(
        Number(userId),
        updateData.username,
        updateData.email,
        updateData.phoneNumber
      )

      navigate("/users")
    } catch {
      alert("HTTP error! Restart your browser.")
    }
  }

  const handleBack = () => {
    navigate("/users")
  }

  return (
    <div className="user-edit-page">
      <Form form={form} layout="vertical" onFinish={handleSave}>
        <Form.Item
          label="Имя пользователя"
          name="username"
          rules={[{ required: true, message: "Введите имя пользователя" }]}
        >
          <Input placeholder="Введите имя пользователя" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Введите email" },
            { type: "email", message: "Введите корректный email" },
          ]}
        >
          <Input placeholder="Введите email" />
        </Form.Item>

        <Form.Item label="Номер телефона" name="phoneNumber">
          <Input placeholder="Введите номер телефона" />
        </Form.Item>

        <Form.Item>
          <Button icon={<ArrowLeftOutlined />} onClick={handleBack}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default UserEditPage
