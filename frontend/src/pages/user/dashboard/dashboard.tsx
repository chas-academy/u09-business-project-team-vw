import LogoutButton from "../../../components/button/useLogout/useLogout";
import "./dashboard.scss"

const UserDashboard = () => {
    return (
        <div className="user-dashboard-container">
            <h1 className="user-dashboard-title">USER DASHBOARD PAGE</h1>

            <LogoutButton />
        </div>
    )
}

export default UserDashboard;