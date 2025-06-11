import { Icon } from "@iconify/react";
import "./recipe-card.scss"
import type { Recipe } from "../../interfaces/recipe.interface";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuthState";
import { useState, useEffect } from "react";
import type { RecipeList } from "../../types/RecipeList";


const apiUrl = import.meta.env.VITE_API_URL;

// card component that is imported in home page
function RecipeCard({ recipe }: { recipe: Recipe; }) {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [userLists, setUserLists] = useState<RecipeList[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(!user) return;
        
        async function fetchLists() {
            try {
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
    }, [user]);


    async function handleSelectedList(listId: string) {
        setLoading(true);

        const res = await fetch (`${apiUrl}/recipeList/add/${listId}` , {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                recipeId: String(recipe.originalRecipeId)
            })
        });

        const data = await res.json();
        setLoading(false);
        setShowDropdown(false);

        if (res.ok) {
            alert('RECIPE ADDED TO LIST!');
        } else {
            alert(data.message || 'something went wrong');
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
                        <div className="dropdown-menu">
                            {userLists.length > 0 ? (
                                userLists.map((list) => (
                                    <button
                                        key={list._id}
                                        className="dropdown-item"
                                        onClick={() => handleSelectedList(list._id)}
                                    >
                                        {list.name}
                                    </button>
                                ))
                            ) : (
                                <p className="dropdown-item">You have no lists yet</p>
                            )}
                        </div>
                    )}
                </div>
                )}
            </div>
            </div>
            </div>
    );
}

export default RecipeCard;