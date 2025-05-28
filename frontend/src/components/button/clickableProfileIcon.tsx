
import { useAuth } from "../../hooks/useAuthState";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

const ClickableProfileIcon = () => {
    const {user, loading} = useAuth();
    const navigate = useNavigate();

    const handleIconClick = () => {
        // Not logged in, save currentpath and redirect to google auth.
        if(!user && !loading) {
            const currentPath = window.location.pathname;
            localStorage.setItem('redirectAfterLogin', currentPath);

            window.location.href = 'http://localhost:3000/auth/google';
            return;

        } else if(user?.isAdmin === true) {
            // Logged in user goes to settings page.
            navigate('/admin-dashboard');
            return;

        } else if (user) {
            navigate('/user-dashboard');
            return;
        }
    };

    if(loading) return null;

    return (
        <div id="header-profile">
            <div onClick={handleIconClick} style={{ cursor: 'pointer' }}>
            <Icon className="profile-icon" icon="mdi:person-circle" />
            </div>
            {user ? (
                <p className="profile-text">{user.isAdmin ? 'Admin' : user.name}</p>
            ) : (
                <p className='profile-text'>Guest</p>
            )}
        </div>
    )
};

export default ClickableProfileIcon;
