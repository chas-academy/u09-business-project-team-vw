import { useEffect, useState } from "react";

export function useAuth() {
    const [user, setUser] = useState<null | { isAdmin: Boolean; name: String }>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3000/api/auth/me', { credentials: 'include' })
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

    return { user, loading };
}