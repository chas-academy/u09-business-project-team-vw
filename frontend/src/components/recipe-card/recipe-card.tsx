import { Icon } from "@iconify/react";
import "./recipe-card.scss"
import type { Recipe } from "../../interfaces/recipe.interface";
import { useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

// card component that is imported in home page
function RecipeCard({ recipe }: { recipe: Recipe }) {
    const navigate = useNavigate();

    async function handleAddRecipe(id: string | number) {
    await fetch(`${apiUrl}/recipes/${id}`, { method: "GET" });
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
                    <button
                        className="card-button"
                        onClick={e => {
                            e.stopPropagation(); // Hindra navigation om du har onClick på kortet
                            handleAddRecipe(recipe.originalRecipeId);
                        }}
                    >
                        <Icon className="add-recipe-icon" icon="mdi:invoice-add"></Icon>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RecipeCard