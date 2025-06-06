import { useEffect, useState } from "react";
import type { RecipeList } from "../../types/RecipeList";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const EditListForm = () => {
    const [listForm, setListForm] = useState<RecipeList>();
    const [message, setMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [updating, setUpdating] = useState<boolean>(false);

    const navigate = useNavigate();

    const apiUrl = import.meta.env.VITE_API_URL;

    const { listId } = useParams();

    useEffect(() => {
        const fetchList = async() => {

            try {

                setLoading(true);

                const response = await fetch (`${apiUrl}/${listId}`, { 
                    credentials: 'include', 
                    method: 'GET' });

                if (response.ok) {
                    const fetchedList = await response.json();
                    setListForm(fetchedList.data);
                    setMessage('Here is the list!');
                }

            } catch (error) {
                setErrorMessage('Server error');
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchList();
    }, [listId]);

    const handleDeleteList = async () => {

        if(!confirm('Are you sure you want to delete the list? This cannot be undone.')) return;

        try {

            setLoading(true);

            const response = await fetch (`${apiUrl}/${listId}/delete`, {
                method: 'DELETE',
                credentials: 'include',
            });

            if(!response.ok) {
                setErrorMessage('Couldnt delete the list');
            }

            setMessage('The list has been deleted!');
            navigate('/user-dashboard');

        } catch (error) {
            setErrorMessage('Server Error!');
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if(!listForm) return;

        try {
            setUpdating(true);

            const response = await fetch (`${apiUrl}/${listId}/edit`, { 
                method: 'PATCH', 
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title: listForm.title }),
            });

            if(!response.ok) {
                setErrorMessage('Couldnt update the list!');
            }
            
            setMessage('The list is now updated!');

        } catch (error) {
            setErrorMessage('Server Error!');
            console.error(error);
        } finally {
            setUpdating(false);
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

    if (!listForm) return <p>No list to show</p>;

    return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label>
        Titel:
        <input
          type="text"
          value={listForm.title}
          onChange={(e) =>
            setListForm({ ...listForm, title: e.target.value })
          }
          className="border p-2 rounded w-full"
        />
      </label>

      <button
        type="submit"
        disabled={updating}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {updating ? "Saving..." : "Saving the changes!"}
      </button>

      <button
            type="button"
            onClick={handleDeleteList}
            className="bg-red-500 text-white px-4 py-2 rounded"
            >
            Delete the list
        </button>

      {message && <p className="text-green-600">{message}</p>}
    </form>
    )
}

export default EditListForm;