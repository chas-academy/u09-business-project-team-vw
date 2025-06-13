import { useEffect, useState } from "react";
import LogoutButton from "../../../components/button/useLogout/useLogout";
import type { User } from "../../../types/User";
import { useNavigate } from "react-router-dom";
import "./dashboard.scss"
import { BaseButton } from "../../../components/button/baseButton/baseButton";

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
        <div className="index-main-container">
        <h1 className="index-main-title">ADMIN DASHBOARD PAGE</h1>
        <p>{errorMessage}</p>
        <table className="admin-dashboard-table">
            <thead>
                <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                    <BaseButton onClick={() => handleUser(user._id)} className="admin-dashboard-table-button">Show</BaseButton>
                    <BaseButton onClick={() => handleDeleteUser(user._id)} className="admin-dashboard-table-button">Delete user</BaseButton>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        <LogoutButton />
        </div>
    )
}

export default AdminDashboard;