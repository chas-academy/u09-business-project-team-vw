import { useEffect, useState } from 'react';
import type { RecipeList } from '../../../types/RecipeList';
import { useNavigate } from 'react-router-dom';
import { Icon } from "@iconify/react";
import "./userRecipeList.scss"

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
                
                console.log("🔍 apiUrl:", apiUrl);

                setLoading(true);

            const listResponse = await fetch (`${apiUrl}/recipeList/all`, { 
                credentials: 'include', 
                method: 'GET' 
            });

            if(!listResponse.ok) {
                setErrorMessage('Couldnt fet the data!');
                return;                
            }

            const data = await listResponse.json();
                console.log('Data received:', data);
                setLists(data.data);
                setMessage('List fetched!');

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
    <div className="userlist-container max-w-2xl mx-auto p-4">
        <h2 className="index-main-title userlist-title text-xl font-bold mb-4">Your recipelists</h2>

        

        {lists.length === 0 ? (
            <p className="userlist-text text-gray-600">
                Create a list to save all your favorite recipes! <Icon icon="mdi:food-fork-drink" />
            </p>
        ) : (
            <div className="userlist-listname-container space-y-2">
                {lists.map((list) => (
                    <div
                        key={list._id}
                        onClick={() => navigate(`/recipe-list/${list._id}`)}
                        className="userlist-listname cursor-pointer p-3 border rounded hover:bg-gray-100"
                    >
                        <h3 className="text-lg font-semibold">{list.name} <Icon className="userlist-icon" icon="mdi:keyboard-arrow-right" /></h3>
                    </div>
                ))}
            </div>
        )}

        {message && <p className="userlist-text userlist-message text-green-600 mt-4">{message}</p>}
    </div>
    );
}

export default UserRecipeList;