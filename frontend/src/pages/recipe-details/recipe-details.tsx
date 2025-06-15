import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Recipe } from "../../interfaces/recipe.interface";
import { Icon } from "@iconify/react";
import "./recipe-details.scss"
import BackButton from "../../components/button/goBack/goBack";


function RecipeDetail() {

    const { id } = useParams();
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        if (!id) return;
        fetch(`${apiUrl}/recipes/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log('API response:', data.data);
                setRecipe(data.data);
            });
    }, [id, apiUrl]);

    if (!recipe) return <div>Laddar...</div>;

    return (
        <div className="recipe-detail-container">
            <div className="upper-detail-container">
                <h1 className="recipe-details-title">{recipe.title}</h1>
                <img className="recipe-details-image" src={recipe.imageUrl} alt={recipe.title} />
                <div className="details-types-container">
                    <h2 className="details-types-title">Allergens</h2>
                    <div className="detail-type-container">
                        <Icon className="recipe-icon" icon="mdi:leaf"></Icon>
                        <p className="details-type">Vegetarian: {recipe.isVegetarian ? 'Yes' : 'No'}</p>
                    </div>
                    <div className="detail-type-container">
                        <Icon className="recipe-icon" icon="mdi:gluten"></Icon>
                        <p className="details-type">Glutenfree: {recipe.isGlutenfree ? 'Yes' : 'No'}</p>
                    </div>
                    <div className="detail-type-container">
                        <Icon className="recipe-icon" icon="mdi:cow"></Icon>
                        <p className="details-type">Dairyfree: {recipe.isDairyfree ? 'Yes' : 'No'}</p>
                    </div>
                </div>
            </div>
            <div className="lower-detail-container">
                <div className="servings-time-container">
                    <h2 className="details-types-title">Recipe Overview</h2>
                    <div className="detail-type-container">
                        <Icon className="recipe-icon" icon="mdi:food-fork-drink"></Icon>
                        <p className="recipe-details-servings">Servings: {recipe.servings}</p>
                    </div>
                    {recipe.preparationMinutes != null && recipe.preparationMinutes > 0 && (
                        <div className="detail-type-container">
                            <Icon className="recipe-time-icon" icon="mdi:access-time"></Icon>
                            <p className="recipe-details-time">Preparation time: {recipe.preparationMinutes} minutes</p>
                        </div>
                    )}
                    {recipe.cookingMinutes != null && recipe.cookingMinutes > 0 && (
                        <div className="detail-type-container">
                            <Icon className="recipe-time-icon" icon="mdi:access-time"></Icon>
                            <p className="recipe-details-time">Cooking time: {recipe.cookingMinutes} minutes</p>
                        </div>
                    )}
                    <div className="detail-type-container">
                        <Icon className="recipe-time-icon" icon="mdi:access-time"></Icon>
                        <p className="recipe-details-time">Total time: {recipe.readyInMinutes} minutes</p>
                    </div>
                </div>
                <div className="detail-ingredients-container">
                    <h2 className="details-types-title">Ingredients</h2>
                    <ul className="recipe-details-ingredients">
                        {recipe.ingredients.map((ing, i) => <li className="details-ingredient" key={i}>{ing}</li>)}
                    </ul>
                </div>
                <div className="detail-instructions-container">
                    <h2 className="details-types-title">Instructions</h2>
                    <div className="recipe-details-instructions" dangerouslySetInnerHTML={{ __html: recipe.instructions }}></div>
                </div>
            </div>
            <BackButton />
        </div>
    );
}

export default RecipeDetail;