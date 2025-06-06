import { useEffect, useState } from "react";
import LogoutButton from "../../components/button/useLogout";
import type { User } from "../../types/User";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {

    const apiUrl = import.meta.env.VITE_API_URL;

    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllUsers = async () => {

            setLoading(true);

            const res = await fetch (`${apiUrl}/admin/dashboard`,
                {credentials: 'include'}
            );
            
            if(res.ok){
                const data = await res.json();
                setUsers(data.data);
            } else {
                setErrorMessage('Something went wrong, try again');
            }

            setLoading(false);
        };

        fetchAllUsers();

    }, [apiUrl]);

    const handleDeleteUser = async(_id: string) => {
        const confirmed = window.confirm('Are you sure you want to delete the user? This cannot be undone.')
        
        if(!confirmed) return;

        try {
            const res = await fetch (`${apiUrl}/admin/dashboard/delete/${_id}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            
            if(!res.ok) {
                setErrorMessage('Something went wrong');
            }

            setUsers((prev) => prev.filter((user) => user._id !== _id));

        } catch(error) {
            console.error(error);
        }
    }

    const handleUser = (_id: string) => {
        navigate(`/show-user/${_id}`);
    }

    
    if (loading) {
        return <p>Loading users...</p>;
        }

    return(
        <div>
        <h1>ADMIN DASHBOARD PAGE</h1>
        <p>{errorMessage}</p>
        <div>
            <p>Id | Name | Email | Edit | Delete</p>
        </div>
        <div>
        <ul>
            {users.map((user) => (
                <li key={user._id}>
                {" "}
                {user._id} - {user.name} - {user.email}
                {" "}
                <button onClick={() => handleUser(user._id)}>Show</button>
                <button onClick={() => handleDeleteUser(user._id)}>Delete user</button>
                </li>
            ))}
        </ul>
        </div>
        <LogoutButton />
        </div>
    )
}

export default AdminDashboard;