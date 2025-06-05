import { useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuthState";
import "./notAutorizedPage.scss"
import { BaseButton } from "../../components/button/baseButton/baseButton";
import { Icon } from "@iconify/react";

export default function NotAutorized() {

    const apiUrl = import.meta.env.VITE_API_URL;

    const { user, loading } = useAuth()    
    const navigate = useNavigate();

    if (loading) return <p>Loading ...</p>

    const handleLogin = () => {
        window.location.href = `${apiUrl}/auth/google`;
    };

    const handleGoHome = () => {
        navigate('/');
    };

    const message = user 
    ? '🚫 Only Admin can view this page'
    : '🚫 Please log in to view this page';


   return (
    <div className="not-authorized-container">
      <h1 className="index-main-title">Access Denied</h1>
      <p className="not-authorized-message">{message}</p>
      <div className="not-authorized-buttons">
        {!user && (
        <BaseButton onClick={handleLogin} className="not-authorized-login">
          <Icon className="not-authorized-icon" icon="mdi:google" />
          <span>Login with Google</span>
        </BaseButton>)}
        <BaseButton onClick={handleGoHome}>Go to Home</BaseButton>
      </div>
    </div>
  );
}