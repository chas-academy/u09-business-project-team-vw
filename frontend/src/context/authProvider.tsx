import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

import type { User } from "../types/User";
import { AuthContext } from "./authContext";


// This component wraps your application and provides authentication context to all children
export const AuthProvider = ({ children }: { children: ReactNode }) => {

    const apiUrl = import.meta.env.VITE_API_URL;

    // Stores the currently logged-in user (or null if not logged in)
    const [user, setUser] = useState<User | null>(null);

    // Indicates whether user authentication is being checked
    const [loading, setLoading] = useState(true);

    // Stores any unexpected error messages
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const navigate = useNavigate();

    useEffect(() => {

         // ⏳ Kolla URL-parametern
        const location = window.location;
        const params = new URLSearchParams(location.search);
        const justLoggedIn = params.get("loggedIn") === "true";

        if (justLoggedIn) {
        // 🧼 Rensa URL:en från ?loggedIn
        const newUrl = location.pathname;
        window.history.replaceState({}, "", newUrl);
        }

        // Fetch the current authenticated user on first render
        const fetchUser = async() => {
            try {
                 // Send a request to check if a user is authenticated, include cookie
                const res = await fetch(`${apiUrl}/auth/me`, { 
                    method: 'GET',
                    credentials: 'include' 
                });

                if(res.ok) {
                    // If successful, extract user data and store it in context
                    const data = await res.json();
                    setUser(data.data);

                    if(justLoggedIn) {
                        if (data.data?.isAdmin) {
                            navigate('/admin-dashboard');
                        } else {
                            navigate('/user-page');
                        }
                    }

                } else if (res.status === 401) {
                    // User is not logged in – expected, do nothing
                    setUser(null);
                } else {
                    setErrorMessage('Unkown error');
                }
                
            } catch (error) {
                console.error(error);
                setErrorMessage('Auth fetch failed');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();

    }, [apiUrl, navigate]);
    
        // Provide the authentication state and updater to the entire app via context
        return (
            <AuthContext.Provider value={{ user, setUser, loading, errorMessage }}>
                {children}
            </AuthContext.Provider>
        );
};