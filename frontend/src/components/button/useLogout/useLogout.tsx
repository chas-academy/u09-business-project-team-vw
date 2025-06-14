import { useAuth } from "../../../hooks/useAuthState";
import { useNavigate } from "react-router-dom";
import "./useLogout.scss"

const LogoutButton = () => {

    const apiUrl = import.meta.env.VITE_API_URL;

    const { user, setUser } = useAuth();
    const navigate = useNavigate();

    if (!user) return null;

    const handleLogout = () => {
        fetch(`${apiUrl}/user/logout`, {
            credentials: 'include'
        })
            .then((res) => {
                if (res.ok) {
                    setUser(null);
                    setTimeout(() => {
                        navigate('/');
                    }, 10);
                }
            })
            .catch((err) => {
                console.error('Logout failed:', err)
            });
    }

    return (
        <button
            onClick={handleLogout}
            className="use-logout">
            Log Out
        </button>
    )
}

export default LogoutButton;