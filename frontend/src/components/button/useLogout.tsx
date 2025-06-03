import { useAuth } from "../../hooks/useAuthState";
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
            style={{
                padding: '0.5rem 1rem',
                fontSize: '1rem',
                cursor: 'pointer',
                borderRadius: '8px',
                backgroundColor: '#AAAAAA',
                border: 'none'}}
                >
            Logga ut
        </button>
    )
}

export default LogoutButton;