import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import RecipeCard from "../../components/recipe-card/recipe-card";
import type { Recipe } from "../../interfaces/recipe.interface";
import "./search.scss";

// Hjälpfunktion för att hämta query-parametrar
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Search() {
  const query = useQuery();
  const ingredients = query.get("ingredients") || "";
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!ingredients) {
      setRecipes([]);
      return;
    }

    const fetchRecipes = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${apiUrl}/recipes/search?ingredients=${encodeURIComponent(ingredients)}`);
        const data = await res.json();
        setRecipes(data.data || []);
      } catch {
        setError("Something went wrong while fetching recipes.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [ingredients, apiUrl]);

  return (
        <div className="search-container">
            <h2 className="search-title">
                Search results for: <em>{ingredients}</em>
            </h2>
            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}
            <div className="search-list">
                {recipes.map((recipe) => (
                <RecipeCard key={recipe.originalRecipeId} recipe={recipe} />
                ))}
            </div>
            {!loading && !error && recipes.length === 0 && (
                <p className="no-recipes">No recipes found for the given ingredients.</p>
            )}
        </div>
  );
}

export default Search;
