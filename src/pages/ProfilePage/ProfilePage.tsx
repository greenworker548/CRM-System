import "./ProfilePage.scss"
import { Typography, Button } from "antd"
import { useAuth } from "../../hooks/useAuth"

const { Title, Text } = Typography

const ProfilePage = () => {
  const { logout } = useAuth()

  const handlelogout = async () => {
    try {
      await logout()
    } catch (error) {
      alert("HTTP error! Restart your browser.")
    }
  }

  return (
    <div className="profile">
      <Title level={3}>Profile Page</Title>
      <Text>Ant Design (default)</Text>
      <Button type="primary" htmlType="button" onClick={handlelogout}>
        Logout
      </Button>
    </div>
  )
}

export default ProfilePage
