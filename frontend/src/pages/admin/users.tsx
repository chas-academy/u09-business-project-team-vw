import LogoutButton from "../../components/button/useLogout"
import BackButton from "../../components/button/goBack"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import type { User } from "../../types/User";

const ShowUser = () => {
    const [user, setUser] = useState<User>();
    const { id } = useParams<{ id: string }>();


    useEffect(() => {
        const fetchUserById = async() => {
            try {
                const res = await fetch (`http://localhost:3000/admin/dashboard/${id}`, { credentials: 'include' });

                if(res.ok) {
                    const data = await res.json();
                    setUser(data.data);
                    console.log(data);

                }
            } catch (error) {
                console.error('internal server error', error);
            }
        }

        fetchUserById();

    }, [id]);

    return (
        <div>
            <h1>USER BY ID</h1>

            {user ? (
                <ul>
                    <li>ID: {user._id}</li>
                    <li>Name: {user.name}</li>
                    <li>Email: {user.email}</li>
                    <li>Admin: {user.isAdmin ? 'Yes' : 'No'}</li>
                </ul>
                ) : (
                <p>Loading user...</p>
                )}

            <div>
                <LogoutButton />
                <BackButton />
            </div>

        </div>
    )
}

export default ShowUser;