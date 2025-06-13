import LogoutButton from "../../components/button/useLogout/useLogout";
import BackButton from "../../components/button/goBack/goBack";

const AdminSettings = () => {
    return (
        <div className="index-main-container">
            <h1 className="index-main-title">ADMIN SETTINGS PAGE</h1>

            <LogoutButton />
            <BackButton />
        </div>
    )
}

export default AdminSettings;