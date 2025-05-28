import { useAuth } from "../hooks/useAuthState";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {

    const { user, setUser } = useAuth();
    const navigate = useNavigate();

    if(!user) return null;

    const handleLogout = () => {
        fetch('http://localhost:3000/user/logout', {
        credentials: 'include'
        })
        .then((res) => {
            if(res.ok) {
                setUser(null);
                navigate('/');
            }
        })
        .catch((err) => {
            console.error('Logout failed:', err)
        });
    }

    return (
        <button onClick={handleLogout}>Logga ut</button>
    )
}

export default LogoutButton;