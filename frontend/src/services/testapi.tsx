import { useEffect } from "react";

function ApiTest() {
    useEffect (() => {
        const fetchData = async () => {
            try {
                const res1 = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata');
                const data1 = await res1.json();
                console.log('Data från API 1:', data1);

                const res2 = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
                const data2 = await res2.json();
                console.log('Data från API 2:', data2);

            } catch (error) {
                console.error('fel vid hämtning:', error);
            }
        };

        fetchData();
    }, [] ); // hakparentes så att datan bara laddas en gång

    return <div>Se konsolen för data</div>;
}

export default ApiTest;