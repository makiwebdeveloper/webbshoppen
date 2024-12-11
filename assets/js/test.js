document.addEventListener("DOMContentLoaded", () => {

    const mainContent = document.getElementById('main-content');

    const URL = "https://fakestoreapi.com/products";

    async function getData() {

        try {
            const response = await fetch(URL);

            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);

        } catch (error) {
            console.error(`Error: ${error}`);
        };
    }

    getData();



});