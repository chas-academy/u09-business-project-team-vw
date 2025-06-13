import { Icon } from "@iconify/react";
import "./recipe-card.scss"
import type { Recipe } from "../../interfaces/recipe.interface";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuthState";
import { useState, useEffect } from "react";
import type { RecipeList } from "../../types/RecipeList";
import { useParams } from "react-router-dom";


const apiUrl = import.meta.env.VITE_API_URL;

// card component that is imported in homepage
function RecipeCard({ recipe }: { recipe: Recipe; }) {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { listId } = useParams();
    const [errorMessage, setErrorMessage] = useState<string>();
    const [message, setMessage] = useState<string>();

    const [userLists, setUserLists] = useState<RecipeList[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(!user) return;
        
        async function fetchLists() {
            try {
                console.log('Sending recipe ID:', recipe.originalRecipeId);

                const res = await fetch(`${apiUrl}/recipeList/all`, {
                method: 'GET',
                credentials: "include"
            });

            const data = await res.json();
            console.log("API-response från /recipeList/all:", data.data);

            // Skydda mot undefined
            if (Array.isArray(data.data)) {
                setUserLists(data.data);
                console.log("Användarens listor:", data.data);
            } else {
                setUserLists([]); // tom array för säkerhet
                console.warn("data.lists är inte en array:", data.data);
            }

            } catch (error) {
                console.error(error);
                setUserLists([]);
            }
        }
            
        fetchLists();
    }, [user, recipe.originalRecipeId]);


    async function handleSelectedList(listId: string) {
        setLoading(true);
        setShowDropdown(false);

        try {
            let recipeDbId: string;

            const findRes = await fetch(`${apiUrl}/recipes/${recipe.originalRecipeId}`, {
                credentials: 'include',
                method: 'GET'
            });

            if (findRes.ok) {
                const findData = await findRes.json();
                recipeDbId = findData.data._id;
            } else {
                const saveRes = await fetch (`${apiUrl}/recipes/${recipe.originalRecipeId}/save`, {
                    credentials: 'include',
                    method: 'POST'
                });

                if (!saveRes.ok) throw new Error('Failed to save recipe');
                    const saveData = await saveRes.json();
                    recipeDbId = saveData.data._id;
                }

                const addRes = await fetch(`${apiUrl}/recipeList/add/${listId}`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ recipeId: recipeDbId }),
                });

            const addData = await addRes.json();

            if(addRes.ok) {
                navigate('/user-page');
            } else {
                alert(addData.message || 'Something went wrong!');
            }

            } catch (error) {
            console.log(error);
            return;
        } finally {
            setLoading(false);
        }

    }

    const handleRemoveFromList = async (recipeId: string) => {
        if(!listId) {
            console.error('listID missing');
            return;
        }

        const url = `${apiUrl}/remove/${listId}/${recipeId}`;
        console.log('🔗 DELETE URL:', url);

        try {
            setLoading(true);

            const response = await fetch(`${apiUrl}/recipeList/remove/${listId}/${recipeId}`, {
                credentials: 'include',
                method: 'PATCH'
            });

            if(!response.ok) {
                setErrorMessage('Couldnt remove recipe from list');
                return;
            }

            setMessage('Recipe Removed from the list!');


        } catch (error) {
            console.error(error);
            setErrorMessage('Server Error');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="recipe-background" onClick={() => navigate(`/recipes/${recipe.originalRecipeId}`)}>
            <div className="upper-card">
                {/* if recipe has an image, display it */}
                {recipe.imageUrl && <img src={recipe.imageUrl} alt={recipe.title} className="recipe-image" />}
            </div>
            <div className="lower-card">
                <h3 className="recipe-title">{recipe.title}</h3>
                <div className="types-container">
                    <div className="recipe-type-container">
                        <Icon className="recipe-icon" icon="mdi:leaf"></Icon>
                        <p className="recipe-type">
                            {/* if recipe is vegetarian, display "Yes", else display "No" */}
                            Vegetarian:{recipe.isVegetarian ? 'Yes' : 'No'}
                        </p>
                    </div>
                    <div className="recipe-type-container">
                        <Icon className="recipe-icon" icon="mdi:gluten"></Icon>
                        <p className="recipe-type">
                            Glutenfree:{recipe.isGlutenfree ? 'Yes' : 'No'}
                        </p>
                    </div>
                    <div className="recipe-type-container">
                        <Icon className="recipe-icon" icon="mdi:cow"></Icon>
                        <p className="recipe-type">
                            Dairyfree:{recipe.isDairyfree ? 'Yes' : 'No'}
                        </p>
                    </div>
                </div>
                <div className="button-container">
                    <div className="recipe-time">
                        <Icon className="recipe-time-icon" icon="mdi:access-time"></Icon> 
                        <p className="recipe-time-text">
                            {/* display time in minutes */}
                            {recipe.readyInMinutes} min
                        </p>
                    </div>
                   {user && (
  <div className="save-recipe-wrapper" onClick={e => e.stopPropagation()}>
    {listId ? (
      // Inne på en lista: visa "ta bort från listan"-knapp
      <button
        type="button"
        title="remove-from-list"
        className="card-button"
        onClick={() => handleRemoveFromList(recipe._id)}
        disabled={loading}
      >
        <Icon className="add-recipe-icon" icon="mdi:playlist-remove" />
      </button>
    ) : (
      // Utanför en specifik lista: visa dropdown som vanligt
      <div className="list-dropdown-wrapper">
        <button
          type="button"
          title="add-to-recipe"
          className="card-button"
          onClick={() => setShowDropdown(prev => !prev)}
          disabled={loading}
        >
          <Icon className="add-recipe-icon" icon="mdi:invoice-add" />
        </button>

        {showDropdown && (
            <div className="list-dropdown-menu">
                {userLists.length > 0 ? (
                userLists.map((list) => (
                    <button
                    key={list._id}
                    className="list-dropdown-item"
                    onClick={() => handleSelectedList(list._id)}
                    >
                    {list.name}
                    </button>
                ))
                ) : (
                <p className="list-dropdown-item">You have no lists yet</p>
                )}
            </div>
                )}  
                </div>
                )}
                </div>
                )}
                </div>
            </div>
                <p className="dropdown-message">{message}</p>
                <p className="dropdown-message">{errorMessage}</p>
            </div>
    );
}

export default RecipeCard;