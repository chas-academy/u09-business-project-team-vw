
import { useAuth } from "../../hooks/useAuthState";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

const ClickableProfileIcon = () => {
    const {user, loading} = useAuth();
    const navigate = useNavigate();

    const handleIconClick = () => {
        // Not logged in, save currentpath and redirect to google auth.
        if(!user && !loading) {

            window.location.href = 'http://localhost:3000/auth/google';
            return;

        } else if(user?.isAdmin === true) {
            // Logged in user goes to settings page.
            navigate('/admin-settings');
            return;

        } else if (user) {
            navigate('/user-settings');
            return;
        }
    };

    if(loading) return null;

    let hoverText = 'Login';
    if(user?.isAdmin) {
        hoverText = 'Settings';
    } else if (user) {
        hoverText = 'Go To Dashboard';
    }

    return (
        <div id="header-profile">
            <div 
            onClick={handleIconClick} 
            style={{ cursor: 'pointer' }}
            title={hoverText}>
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
