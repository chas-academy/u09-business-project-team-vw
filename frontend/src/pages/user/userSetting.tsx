import LogoutButton from "../../components/button/useLogout";
import BackButton from "../../components/button/goBack";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuthState";

const UserSettings = () => {
    const {user, setUser} = useAuth();
    const [loading, setLoading] = useState<Boolean>();
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [message, setMessage] = useState<string>('');


    useEffect(() => {
        const fetchUserData = async () => {

            setLoading(true);

            const res = await fetch (`http://localhost:3000/user/me`, {
                credentials: 'include'
            });

            if(res.ok) {
                const data = await res.json();
                setUser(data.data);
            }

            setLoading(false);
        }

        fetchUserData();
    }, []);

    
    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const res = await fetch('http://localhost:3000/user/update', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ displayName: user.displayName }),
    });

    console.log(res);

    if (res.ok) {
        const data = await res.json();
        setUser(data.data);
        setMessage('Profile name updated!');
        console.log(data);
    } else {
        setErrorMessage('Profile name was not updated');
    }
    };

    const handleDeleteUser = async() => {
        const confirmed = window.confirm('Are you sure you want to delete your profile? This cannot be undone.')
        
        if(!confirmed) return;

        try {
            const res = await fetch (`http://localhost:3000/user/delete`, {
                method: 'DELETE',
                credentials: 'include'
            });
            
            if(!res.ok) {
                setErrorMessage('Something went wrong');
            }

            setUser(null);

        } catch(error) {
            console.error(error);
        }
    }

    if (loading) {
            return <p>Loading...</p>;
            }

    return (
        <div>
            <h1>USER SETTINGS PAGE</h1>
            <h2>{message}</h2>
            <h2>{errorMessage}</h2>

            <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input
                type="text"
                value={user?.displayName || ''}
                onChange={(e) => setUser({ ...user!, displayName: e.target.value })}
                />
            </label>

            <button type="submit">Save display name</button>
            </form>

            <button onClick={() => handleDeleteUser()}>Delete My Account</button>

            <LogoutButton />
            <BackButton />
        </div>
    )
}

export default UserSettings;