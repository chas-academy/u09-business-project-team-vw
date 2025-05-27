import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export function AuthRedirect() {
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(loading) return;

        if(!user) {
            navigate('/login');
        } else if(user.isAdmin) {
            navigate('/admin-dashboard');
        } else {
            navigate('/user-dashboard');
        }
    }, [user, loading, navigate]);

    return <div>Redirecting ...</div>;
}