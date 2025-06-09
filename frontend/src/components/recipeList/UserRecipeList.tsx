import { useEffect, useState } from 'react';
import type { RecipeList } from '../../types/RecipeList';
import { useNavigate } from 'react-router-dom';
import BackButton from '../button/goBack';

const UserRecipeList = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [lists, setLists] = useState<RecipeList[]>([]);
    const [message, setMessage] = useState<(string | null)>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const apiUrl = import.meta.env.VITE_API_URL;

    const navigate = useNavigate();

    useEffect(() => {
        const fetchListAndIndex = async() => {

            try {
                setLoading(true);

            const listResponse = await fetch (`${apiUrl}/recipeList/showLists`, { 
                credentials: 'include', 
                method: 'GET' 
            });

            if(listResponse.ok) {
                const data = await listResponse.json();
                setLists(data.data);
                setMessage('List fetched!');
            }

            } catch (error) {
                setErrorMessage('Server Error');
                console.error(error);
                
            } finally {
                setLoading(false);
            }

        }    

        fetchListAndIndex();

    }, [apiUrl]);

    if(loading) {
        return <p>Loading ...</p>
    }

    if (errorMessage) {
        return <p>{errorMessage}</p>
    }

    return (
        <div>
            {lists.map((list) => (
            <div
                key={list._id}
                onClick={() => navigate(`/recipe-list/${list._id}`)}
                className="cursor-pointer p-3 border rounded hover:bg-gray-100"
            >
            <h3>{list.title}</h3>
        </div>
            ))}
            <div>
                {message && <p>{message}</p>}
                {lists.map((list) => (
                <div key={list._id}>
                    <h3>{list.title}</h3>
                </div>
                ))}
            </div>

            <BackButton />
        </div>
    )
}

export default UserRecipeList;