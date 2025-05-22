import { useEffect, useState } from "react";

 type Category = { // <-- Denna typen används i useState
    idCategory: string;
    strCategory: string;
    category: string;
}

function ApiTest() {
    const [categories, setCategories] = useState<Category[]>([]); //<-- Tom Array som kan fyllas med category

    useEffect (() => {
        
        const fetchData = async () => {
            try {
                const res2 = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php'); // <-- hämta data
                const data2 = await res2.json(); // <-- omvandla till json för läsbarhet
                console.log('Data från API "KATEGORIER"', data2); // <--- Frivillig

                setCategories(data2.categories) // <--- uppdatera tom sträng i useState, använd response från json.

            } catch (error) {
                console.error('fel vid hämtning:', error);
            }
        };

        fetchData();
    }, [] ); // hakparentes så att datan bara laddas en gång

    return (
        <div>
            <h2>Test hämtning av data</h2>
            <ul>
                {categories.map((category) => { // <-- loopa över en array
                    return <li key={category.idCategory}>{category.strCategory}</li> // <-- Skapar ett react element + returnerar en ny array med resutat
                })}
            </ul>
        </div>
    )
}

export default ApiTest;