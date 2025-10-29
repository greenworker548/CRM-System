import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Form, Input, Button, Card, message, Space, Spin } from "antd"
import { ArrowLeftOutlined } from "@ant-design/icons"
import { updatingUser, getUserOnId } from "../../api/users"
import { User } from "../../types/users"

const UserEditPage = () => {
  const { userId } = useParams()
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useState<User | null>(null)
  const [pageLoading, setPageLoading] = useState(true)

  // Загружаем данные пользователя при монтировании компонента
  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return
      
      try {
        setPageLoading(true)
        const user = await getUserOnId(Number(userId))
        setUserData(user)
        form.setFieldsValue({
          username: user.username,
          email: user.email,
          phoneNumber: user.phoneNumber || "" // на случай если null/undefined
        })
      } catch (error) {
        message.error("Ошибка при загрузке данных пользователя")
        console.error("Error fetching user:", error)
      } finally {
        setPageLoading(false)
      }
    }

    fetchUserData()
  }, [userId, form])

  const handleSave = async (values: any) => {
    if (!userId) return
    
    try {
      setLoading(true)
      await updatingUser(
        Number(userId),
        values.username,
        values.email,
        values.phoneNumber
      )
      message.success("Данные пользователя успешно обновлены")
      navigate("/users") // Возвращаемся к таблице после сохранения
    } catch (error) {
      message.error("Ошибка при обновлении данных пользователя")
      console.error("Error updating user:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleBack = () => {
    navigate("/users")
  }

  if (pageLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}>
        <Spin size="large" />
      </div>
    )
  }

  return (
    <div style={{ padding: "24px" }}>
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        {/* Кнопка назад */}
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={handleBack}
          type="text"
        >
          Вернуться к таблице пользователей
        </Button>

        {/* Форма редактирования */}
        <Card title={`Редактирование пользователя ${userData?.username || ''}`}>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSave}
          >
            <Form.Item
              label="Имя пользователя"
              name="username"
              rules={[
                { required: true, message: "Введите имя пользователя" },
              ]}
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

            <Form.Item
              label="Номер телефона"
              name="phoneNumber"
            >
              <Input placeholder="Введите номер телефона" />
            </Form.Item>

            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Сохранить
                </Button>
                <Button onClick={handleBack}>
                  Отмена
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      </Space>
    </div>
  )
}

export default UserEditPage