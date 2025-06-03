import { useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuthState";

export default function NotAutorized() {
    const { user, loading } = useAuth()    
    const navigate = useNavigate();

    if (loading) return <p>Loading ...</p>

    const handleLogin = () => {
        window.location.href = 'http://localhost:3000/auth/google';
    };

    const handleGoHome = () => {
        navigate('/');
    };

    const message = user 
    ? '🚫 Only Admin can view this page'
    : '🚫 Please log in to view this page';


   return (
    <div style={{ textAlign: "center", marginTop: "5rem" }}>
      <h1>Access Denied</h1>
      <p>{message}</p>
      <div style={{ marginTop: "2rem" }}>
        {!user && (
            <button onClick={handleLogin} style={{ marginRight: "1rem" }}>
          Login with Google
        </button>)}
        <button onClick={handleGoHome}>Go to Home</button>
      </div>
    </div>
  );
}