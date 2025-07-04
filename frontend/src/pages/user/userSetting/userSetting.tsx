import LogoutButton from "../../../components/button/useLogout/useLogout";
import BackButton from "../../../components/button/goBack/goBack";
import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuthState";
import { BaseButton } from "../../../components/button/baseButton/baseButton";
import "./userSetting.scss";
import UserRecipeList from "../../../components/recipeList/UserRecipeList/UserRecipeList";
import { InputField } from "../../../components/InputField/InputField";

const UserSettings = () => {

    const apiUrl = import.meta.env.VITE_API_URL;

    const { user, setUser } = useAuth();
    const [loading, setLoading] = useState<boolean>();
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [message, setMessage] = useState<string>('');


    useEffect(() => {
        const fetchUserData = async () => {

            setLoading(true);

            const res = await fetch(`${apiUrl}/user/me`, {
                credentials: 'include'
            });

            if (res.ok) {
                const data = await res.json();
                setUser(data.data);
            }

            setLoading(false);
        }

        fetchUserData();
    }, [apiUrl, setUser]);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        const res = await fetch(`${apiUrl}/user/update`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ displayName: user.displayName }),
        });

        if (res.ok) {
            const data = await res.json();
            setUser(data.data);
            setMessage('Profile name updated!');
            console.log(data);
        } else {
            setErrorMessage('Profile name was not updated');
        }
    };

    const handleDeleteUser = async () => {
        const confirmed = window.confirm('Are you sure you want to delete your profile? This cannot be undone.')

        if (!confirmed) return;

        try {
            const res = await fetch(`${apiUrl}/user/delete`, {
                method: 'DELETE',
                credentials: 'include'
            });

            if (!res.ok) {
                setErrorMessage('Something went wrong');
            }

            setUser(null);

        } catch (error) {
            console.error(error);
        }
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    console.log("Rendering <UserRecipeList />");

    return (
        <div className="index-main-container">
            <h1 className="index-main-title">User Page</h1>
            <h2 className="user-settings-message">{message}</h2>
            <h2 className="user-settings-error">{errorMessage}</h2>

            <form onSubmit={handleSubmit} className="user-settings-form">
                <InputField
                    labelText="Change your username:"
                    inputProps={{
                        type: "text",
                        value: user?.displayName || "",
                        onChange: (e) => setUser({ ...user!, displayName: e.target.value }),
                    }}
                />



                <BaseButton type="submit" className="user-settings-button">Save Username</BaseButton>
            </form>

            <BaseButton onClick={() => handleDeleteUser()} className="user-settings-button">Delete My Account</BaseButton>

            <UserRecipeList />
            <LogoutButton />
            <BackButton />
        </div>
    )
}

export default UserSettings;