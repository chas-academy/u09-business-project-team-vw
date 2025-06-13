
import { useAuth } from "../../hooks/useAuthState";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

const ClickableProfileIcon = () => {

    const apiUrl = import.meta.env.VITE_API_URL;

    const Profile = () => {
        const { user } = useAuth();

        if(!user) {
            return null;
        }

        const visibleName = user.displayName?.trim() || user.name

        
        return <p className='profile-text'>{visibleName}</p>
    }


    const {user, loading} = useAuth();
    const navigate = useNavigate();

    const handleIconClick = () => {
        // Not logged in, save currentpath and redirect to google auth.
        if(!user && !loading) {

            window.location.href = `${apiUrl}/auth/google`;
            return;

        } else if(user?.isAdmin === true) {
            // Logged in user goes to settings page.
            navigate('/admin-settings');
            return;

        } else if (user) {
            navigate('/user-page');
            return;
        }
    };

    if(loading) return null;

    let hoverText = 'Login';
    if(user?.isAdmin) {
        hoverText = 'Settings';
    } else if (user) {
        hoverText = 'Go To User Page';
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
            <>
                <Profile />
                {user.isAdmin && (
                    <p className="profile-text admin-label">Admin</p>
                )}
            </>
        ) : (
            <p className="profile-text">Log In!</p>
        )}
        </div>
    )
};

export default ClickableProfileIcon;
