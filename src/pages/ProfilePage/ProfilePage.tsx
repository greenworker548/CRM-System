import "./ProfilePage.scss"
import { Typography } from "antd"

const { Title, Text } = Typography

const ProfilePage = () => {
    return (
        <div className="profile">
            <Title level={3}>Profile Page</Title>
            <Text>Ant Design (default)</Text>
        </div>
    )
}

export default ProfilePage