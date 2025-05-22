import { useState, useEffect } from "react";

type List = {

}

export function ApiTest2() {

const[currentRecipe, setRecipe] = useState<List[]>([]);

    useEffect(() => {

        const fetchRecipe = async () => {

            try {

                const fetchRecipe = await fetch ('https://www.themealdb.com/api/json/v1/1/random.php');
                const responseRecipe = await fetchRecipe.json();
                console.log('fetch lyckades!', responseRecipe);

                setRecipe(responseRecipe);

            } catch (error) {
                console.error(error);
            }
        }

        return (
            <h1>Recept:</h1>
            responseRecipe.map((recipe) => {
                
            })
        )

        fetchRecipe;
    }, []);
}






        