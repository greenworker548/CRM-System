import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Form, Input, Button } from "antd"
import { ArrowLeftOutlined, EditOutlined } from "@ant-design/icons"
import { updatingUser, getUserOnId } from "../../api/users"
import { User, UserRequest } from "../../types/users"
import "./UserEditPage.scss"

const VALIDATION_RULES = {
  USERNAME_MIN_LENGTH: 1,
  USERNAME_MAX_LENGTH: 64,
}

const ERROR_MESSAGES = {
  USERNAME_MIN_MAX_LENGTH: "User name must be between 1 and 60 characters",
}

const UserEditPage = () => {
  const { userId } = useParams()
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [userData, setUserData] = useState<User | null>(null)
  const [isEditing, setIsEditing] = useState(false)

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
        setIsEditing(false)
        return
      }

      await updatingUser(
        Number(userId),
        updateData.username,
        updateData.email,
        updateData.phoneNumber
      )

      const updatedUser = await getUserOnId(Number(userId))
      setUserData(updatedUser)
      setIsEditing(false)
    } catch {
      alert("HTTP error! Restart your browser.")
    }
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleCancel = () => {
    form.setFieldsValue({
      username: userData?.username,
      email: userData?.email,
      phoneNumber: userData?.phoneNumber || "",
    })
    setIsEditing(false)
  }

  const handleBack = () => {
    navigate("/users")
  }

  return (
    <div className="user-edit-page">
      <Form form={form} layout="vertical" onFinish={handleSave}>
        <Form.Item
          label="Username"
          name="username"
          rules={[
            { required: true, message: "Please input your username!" },
            {
              min: VALIDATION_RULES.USERNAME_MIN_LENGTH,
              max: VALIDATION_RULES.USERNAME_MAX_LENGTH,
              message: ERROR_MESSAGES.USERNAME_MIN_MAX_LENGTH,
            },
          ]}
        >
          <Input readOnly={!isEditing} />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            {
              type: "email",
              message: "Please enter a valid email address!",
            },
          ]}
        >
          <Input readOnly={!isEditing} />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phoneNumber"
          rules={[
            {
              pattern: /^\+\d{11}$/,
              message: "Phone must start with + and have 11 digits",
            },
          ]}
        >
          <Input readOnly={!isEditing} />
        </Form.Item>

        <Form.Item>
          <Button icon={<ArrowLeftOutlined />} onClick={handleBack}>
            Back
          </Button>
          {!isEditing ? (
            <Button type="primary" icon={<EditOutlined />} onClick={handleEdit}>
              Edit
            </Button>
          ) : (
            <>
              <Button onClick={handleCancel} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </>
          )}
        </Form.Item>
      </Form>
    </div>
  )
}

export default UserEditPage
