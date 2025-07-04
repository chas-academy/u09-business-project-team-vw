import LogoutButton from "../../components/button/useLogout/useLogout"
import BackButton from "../../components/button/goBack/goBack"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import type { User } from "../../types/User";

const ShowUser = () => {

    const apiUrl = import.meta.env.VITE_API_URL;

    const [user, setUser] = useState<User>();
    const { id } = useParams<{ id: string }>();


    useEffect(() => {
        const fetchUserById = async () => {
            try {
                const res = await fetch(`${apiUrl}/admin/dashboard/${id}`, { credentials: 'include' });

                if (res.ok) {
                    const data = await res.json();
                    setUser(data.data);
                    console.log(data);

                }
            } catch (error) {
                console.error('internal server error', error);
            }
        }

        fetchUserById();

    }, [id, apiUrl]);

    return (
        <div className="index-main-container">
            <h1 className="index-main-title">USER BY ID</h1>

            {user ? (
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <li>ID: {user._id}</li>
                    <li>Name: {user.name}</li>
                    <li>Email: {user.email}</li>
                    <li>Admin: {user.isAdmin ? 'Yes' : 'No'}</li>
                </ul>
            ) : (
                <p>Loading user...</p>
            )}

            <div style={{ display: 'flex', gap: '1rem' }}>
                <LogoutButton />
                <BackButton />
            </div>

        </div>
    )
}

export default ShowUser;