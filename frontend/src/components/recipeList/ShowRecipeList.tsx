import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { RecipeList } from "../../types/RecipeList";
import type { Recipe } from "../../interfaces/recipe.interface";
import RecipeCard from "../recipe-card/recipe-card";
import BackButton from "../button/goBack";

const SingleListView = () => {
  const { listId } = useParams();
  const [list, setList] = useState<RecipeList | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchList = async () => {
      try {
        const res = await fetch(`${apiUrl}/recipeList/show/${listId}`, {
            method: 'GET',
            credentials: "include",
        });

        if (!res.ok) {
          throw new Error("couldnt fetch the list");
        }

        const data = await res.json();
        setList(data.data);

      } catch (err) {
        console.error(err);
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchList();
  }, [listId, apiUrl]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!list) return <p>Couldnt find the list</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{list.name}</h2>

      {list.recipes && list.recipes.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {list.recipes.map((recipe: Recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <p className="text-gray-600">Add a recipe to this list!</p>
      )}
      <BackButton />
    </div>

  );
};

export default SingleListView;