import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../button/goBack/goBack";


const CreateListForm = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [title, setTitle] = useState<string>('');

    const navigate = useNavigate();

    const apiUrl = import.meta.env.VITE_API_URL;

        const handleSubmit = async(e: React.FormEvent) => {
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

            if(!response.ok) {
                const data = await response.json();
                setErrorMessage(data.message || 'The list couldnt be created!');
                return;
            }

            setMessage('List has been created!');
            navigate('/user-dashboard');

            } catch (error) {
                setErrorMessage('Server Error!');
                console.error(error);
            } finally {
                setLoading(false);
            }
        } 

    if(loading) {
        return <p>Loading ...</p>
    }

    if(errorMessage) {
        return <p>{errorMessage}</p>
    } else if (message) {
        return <p>{message}</p>
    }

    return (
        <div>
            <h2>Create a list: Form!</h2>
    <form onSubmit={handleSubmit} className="space-y-4">
      <label>
        Titel:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="createlist-input border p-2 rounded w-full"
          required
        />
      </label>

      <button
        type="submit"
        disabled={loading}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        {loading ? "Creating..." : "Create a list"}
      </button>

      {message && <p className="text-green-600">{message}</p>}
      {errorMessage && <p className="text-red-600">{errorMessage}</p>}
    </form>

        <div>
            <BackButton />
        </div>
    </div>

    );
       
}

export default CreateListForm;