import { useEffect, useState } from "react";

export function useAuth() {
    const [user, setUser] = useState<null | { isAdmin: boolean; name: string }>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3000/auth/me', { credentials: 'include' })
        .then((res) => res.json())
        .then((data) => {
            setUser(data.data);
            setLoading(false);
        })
        .catch(() => {
            setUser(null);
            setLoading(false);
        });
    }, []);

    return { user, setUser, loading };
}