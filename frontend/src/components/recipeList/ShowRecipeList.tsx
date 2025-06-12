import { useNavigate, useParams } from "react-router-dom";
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
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState<string>(list?.name ?? '');
  const navigate = useNavigate();

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

  const handleInlineUpdate = async(e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${apiUrl}/recipeList/edit/${list?._id}`, {
        credentials: 'include',
        method: 'PATCH', 
        headers: 
        {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: editedTitle }),
      });

      if(!response.ok) {
        alert('couldnt update the list name!');
        return;
      }

      setIsEditing(false);

      list.name = editedTitle;
    } catch (error) {
      console.error(error);
    }
  };

  if(!listId) {
    return <p>No list was found</p>
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!list) return <p>Couldnt find the list</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      {isEditing ? (
  <form
    onSubmit={handleInlineUpdate}
    className="mb-4 flex gap-2 items-center"
  >
    <input
      type="text"
      value={editedTitle}
      onChange={(e) => setEditedTitle(e.target.value)}
      className="border p-1 rounded text-xl font-bold"
    />
    <button
      type="submit"
      className="bg-green-500 text-white px-2 py-1 rounded"
    >
      Save
    </button>
    <button
      type="button"
      onClick={() => {
        setEditedTitle(list.name);
        setIsEditing(false);
      }}
      className="text-sm underline text-gray-600"
    >
      Cancel
    </button>
  </form>
) : (
  <h2
    className="text-2xl font-bold mb-4 cursor-pointer"
    onClick={() => setIsEditing(true)}
    title="Click to edit title"
  >
    {list.name}
  </h2>
)}

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

      <button
      className="bg-yellow-500 text-white px-3 py-1 rounded"
      onClick={() => navigate(`/edit-list/${listId}`)}
    >
      Edit this list
    </button>

    </div>

  );
};

export default SingleListView;