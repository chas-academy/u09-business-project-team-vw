import type { RecipeList } from "../../types/RecipeList"
import { useState } from "react"
import { useParams } from "react-router-dom";

const AddRecipeToList = () => {
    const[loading, setLoading] = useState<boolean>(false);
    const[errorMessage, setErrorMessage] = useState<string | null>(null);
    const[message, setMessage] = useState<string | null>(null);

    const { id, recipeId } = useParams<{ id: string, recipeId: string }>();

    const apiUrl = import.meta.env.VITE_API_URL;

    const handleRecipeToList = async() => {

        try {

            setLoading(true);
            setMessage(null);
            setErrorMessage(null);

            const response = await fetch (`${apiUrl}/recipeList/${id}/add`, {
                method: 'POST',
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ recipeId })
                
            });

            if(!response.ok) {
                setErrorMessage('Couldnt add the recipe to the list!');
                return;
            }

            setMessage('The recipe has been added to the list!');

        } catch (error) {
            console.error(error);
            setErrorMessage('Something Went wrong');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <div>
            <button onClick={handleRecipeToList} disabled={loading}>
                {loading ? "Adding the Recipe..." : "Add to a list"}
            </button>
            {message && <p>{message}</p>}
            </div>
        <div>
            {message && <p style={{ color: "green" }}>{message}</p>}
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </div>
    </div>
  )
}


export default AddRecipeToList;