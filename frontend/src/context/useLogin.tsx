
import { useAuth } from "../hooks/useAuthState";
import { Icon } from "@iconify/react";

const ClickableProfileIcon = () => {
    const {user, loading} = useAuth();

    const handleIconClick = () => {
        if(!user && !loading) {
            const currentPath = window.location.pathname;
            localStorage.setItem('redirectAfterLogin', currentPath);

            window.location.href = 'http://localhost:3000/auth/google';
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
