import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { RecipeList } from "../../../types/RecipeList";
import type { Recipe } from "../../../interfaces/recipe.interface";
import RecipeCard from "../../recipe-card/recipe-card";
import BackButton from "../../button/goBack/goBack";
import { BaseButton } from "../../button/baseButton/baseButton";
import "./ShowRecipeList.scss";
import { InputField } from "../../InputField/InputField";

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


  useEffect(() => {
    if (list) {
      setEditedTitle(list.name);
    }
  }, [list]);



  const handleInlineUpdate = async (e: React.FormEvent) => {
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

      if (!response.ok) {
        alert('couldnt update the list name!');
        return;
      }

      setIsEditing(false);

      setList((prev) => prev ? { ...prev, name: editedTitle } : prev);

    } catch (error) {
      console.error(error);
    }
  };

  if (!listId) {
    return <p>No list was found</p>
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="show-list-error">{error}</p>;
  if (!list) return <p>Couldnt find the list</p>;

  return (
    <div className="show-list-container">
      {isEditing ? (
        <form onSubmit={handleInlineUpdate} className="show-list-form">
          <InputField
            labelText="Change list name"
            inputProps={{
              placeholder: "List Name",
              type: "text",
              value: editedTitle,
              onChange: (e) => setEditedTitle(e.target.value),
            }}
          />
          <BaseButton
            type="submit"
            className="edit-name-button"
          >
            Save
          </BaseButton>
          <BaseButton
            type="button"
            onClick={() => {
              setEditedTitle(list.name);
              setIsEditing(false);
            }}
            className="edit-name-button"
          >
            Cancel
          </BaseButton>
        </form>

      ) : (
        <h2
          className="index-main-title show-list-title"
          onClick={() => setIsEditing(true)}
          title="Click to edit title"
        >
          {list.name}
        </h2>
      )}

      {list.recipes && list.recipes.length > 0 ? (
        <div className="show-list-recipe">
          {list.recipes.map((recipe: Recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <p className="show-list-message">Add a recipe to this list!</p>
      )}

      <BaseButton
        onClick={async () => {
          if (!confirm("Are you sure you want to delete this list?")) return;

          try {
            const res = await fetch(`${apiUrl}/recipeList/delete/${listId}`, {
              method: 'DELETE',
              credentials: 'include',
            });

            if (!res.ok) {
              alert('Failed to delete the list');
              return;
            }

            navigate('/user-page'); // eller annan sida
          } catch (error) {
            console.error(error);
            alert('Server error');
          }
        }}
        className="show-list-button"
      >
        Delete this list
      </BaseButton>
      <BackButton />

    </div>

  );
};

export default SingleListView;