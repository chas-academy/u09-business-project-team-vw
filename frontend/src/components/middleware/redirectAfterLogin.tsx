import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuthState";

const RedirectAfterLogin = () => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    console.log("RedirectAfterLogin running", { user });

    useEffect(() => {
        if(!loading) {

            if (user?.isAdmin) {
                navigate('/admin-dashboard');
            } else if (user) {
                navigate('/user-dashboard');
            } else {
                navigate('/');
            }
        }
    },[loading, user, navigate]);

    return <div>Redirecting...</div>;

}

export default RedirectAfterLogin;