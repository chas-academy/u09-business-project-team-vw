import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../button/goBack";


const AddRecipeToList = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [title, setTitle] = useState<string>('New List');

    const navigate = useNavigate();

    const { listId, recipeId } = useParams<{ listId: string, recipeId: string }>();

    const apiUrl = import.meta.env.VITE_API_URL;

        const handleSubmit = async(e: React.FormEvent) => {
            e.preventDefault();
    
            try {

            setLoading(true);

            const response = await fetch(`${apiUrl}/recipeList/add/${listId}`, {
                method: 'POST',
                credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                },
                body: JSON.stringify({ recipeId }),
            });

            if(!response.ok) {
                setErrorMessage('The list couldnt be created!');
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

    return (
        <div>
    <form onSubmit={handleSubmit} className="space-y-4">
      <label>
        Titel:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
      </label>

      <button
        type="submit"
        disabled={loading}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        {loading ? "Skapar..." : "Skapa lista"}
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

export default AddRecipeToList;