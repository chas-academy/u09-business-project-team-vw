import { useEffect, useState } from "react";
import LogoutButton from "../../components/button/useLogout";
import BackButton from "../../components/button/goBack";
import type { User } from "../../types/User";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllUsers = async () => {

            setLoading(true);

            const res = await fetch ('http://localhost:3000/admin/dashboard',
                {credentials: 'include'}
            );
            
            if(res.ok){
                const data = await res.json();
                setUsers(data.data);
            } else {
                setErrorMessage('Something went wrong, try again');
            }
        };

        fetchAllUsers();

    }, []);

    const handleDeleteUser = async(_id: string) => {
        const confirmed = window.confirm('Are you sure you want to delete the user? This cannot be undone.')
        
        if(!confirmed) return;

        try {
            const res = await fetch ('http://localhost:3000/admin/dashboard/delete/${_id}', {
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

    const handleEdit = (_id: string) => {
        
    }


    return(
        <div>
        <h1>ADMIN DASHBOARD PAGE</h1>
        <div>
            <p>Id | Name | Email | Edit | Delete</p>
        </div>
        <div>
        <ul>
            {users.map((user) => (
                <li key={user._id}>
                <label htmlFor='checkbox'></label>
                <input id='checkbox' name='checkbox' type='checkbox' aria-label="...">
                
                </input>
                {" "}
                {user._id} - {user.name} - {user.email}
                {" "}
                <button onClick={() => handleEdit(user._id)}>Edit</button>
                <button onClick={() => handleDeleteUser(user._id)}>Delete user</button>
                </li>
            ))}
        </ul>
        </div>
        <LogoutButton />
        <BackButton />
        </div>
    )
}

export default AdminDashboard;