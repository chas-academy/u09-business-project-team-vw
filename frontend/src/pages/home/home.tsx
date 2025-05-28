import { useEffect, useState } from 'react';
import RecipeCard from '../../components/recipe-card/recipe-card';
import type { Recipe } from '../../interfaces/recipe.interface';
import './home.scss'

function Home() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    const apiUrl = import.meta.env.VITE_API_URL;
    // fetch recipes when component mounts
    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                // fetch recipes from database through backend endpoint
                const res = await fetch(`${apiUrl}/recipes`);
                const data = await res.json();
                // saves recipe objects in state
                setRecipes(data);
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        };

        fetchRecipes();
    }, [apiUrl]);

        return (
            // container for recipe cards
            <div className="recipe-list">
                {/* For each recipe, display a recipe card */}
                {recipes.map(recipe => (
                    // recipe card with right recipe id is displayed
                    <RecipeCard key={recipe.originalRecipeId} recipe={recipe} />
                ))}
            </div>
        );
    }

    export default Home