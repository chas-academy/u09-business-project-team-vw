import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputField } from "../../InputField/InputField";
import { BaseButton } from "../../button/baseButton/baseButton";
import "./CreateListForm.scss";
import BackButton from "../../button/goBack/goBack";


const CreateListForm = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [title, setTitle] = useState<string>('');

    const navigate = useNavigate();

    const apiUrl = import.meta.env.VITE_API_URL;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {

            setLoading(true);

            const response = await fetch(`${apiUrl}/recipeList/create`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: title }),
            });

            if (!response.ok) {
                const data = await response.json();
                setErrorMessage(data.message || 'The list couldnt be created!');
                return;
            }

            setMessage('List has been created!');
            navigate('/user-page');

        } catch (error) {
            setErrorMessage('Server Error!');
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <p>Loading ...</p>
    }

    if (errorMessage) {
        return <p>{errorMessage}</p>
    } else if (message) {
        return <p>{message}</p>
    }

    return (
        <div className="createlist-container">
            <h2 className="index-main-title createlist-title">Create a new List</h2>
            <form onSubmit={handleSubmit} className="createlist-form">
                <InputField
                    labelText="List Title:"
                    inputProps={{
                        type: "text",
                        value: title,
                        onChange: (e) => setTitle(e.target.value),
                        required: true,
                    }}
                />

                <BaseButton
                    type="submit"
                    disabled={loading}
                    className="createlist-button"
                >
                    {loading ? "Creating..." : "Create a list"}
                </BaseButton>

                {message && <p className="createlist-message">{message}</p>}
                {errorMessage && <p className="createlist-error">{errorMessage}</p>}
            </form>

            <BackButton />

        </div>

    );

}

export default CreateListForm;