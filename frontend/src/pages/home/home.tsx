import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import RecipeCard from '../../components/recipe-card/recipe-card';
import type { Recipe } from '../../interfaces/recipe.interface';
import './home.scss'

function Home() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    // get information from url
    const location = useLocation();
    const apiUrl = import.meta.env.VITE_API_URL;
    // fetch recipes when component mounts
    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                // get filter parameter from url, example ?vegetarian=true
                const query = location.search;
                // fetch recipes through backend endpoint
                const res = await fetch(`${apiUrl}/recipes${query}`);
                const data = await res.json();
                // saves recipe objects in state
                setRecipes(data.data || []);
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        };

        fetchRecipes();
        // fetch recipes when mounts or new filter is triggered
    }, [apiUrl, location.search]);

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