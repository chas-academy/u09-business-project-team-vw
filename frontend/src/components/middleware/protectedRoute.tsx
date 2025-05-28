import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuthState";
import type { ReactNode } from "react";

type Props = {
    children: ReactNode;
    requireAdmin?: boolean;
}

export function ProtectedRoute({ children, requireAdmin = false }: Props) {
    const {user, loading} = useAuth();

    if(loading) return <div>Loading ...</div>;

    if(!user) return <Navigate to='/' />;

    if(requireAdmin && !user.isAdmin) return <Navigate to='/not-authorized' />;

    return children;
}