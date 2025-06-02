import { useEffect, useState } from "react";
import type { ReactNode } from "react";

import type { User } from "../types/User";
import { AuthContext } from "./authContext";


export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
            const fetchUser = async() => {
                try {
                    const res = await fetch('http://localhost:3000/auth/me', { 
                        method: 'GET',
                        credentials: 'include' 
                    });

                    if(res.ok) {
                        const data = await res.json();
                        setUser(data.data);
                    } else if (res.status === 401) {
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
        }, []);
        
        return (
            <AuthContext.Provider value={{ user, setUser, loading, errorMessage }}>
                {children}
            </AuthContext.Provider>
        );
};