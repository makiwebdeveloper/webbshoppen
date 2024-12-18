document.addEventListener("DOMContentLoaded", () => {
    const filter = document.getElementById("filter");
    const sort = document.getElementById("sort");
  const webshopMain = document.getElementById("webshop-main");
  let products = [];

  const URL = "https://fakestoreapi.com/products";

  // getProducts
  async function getProducts() {
    try {
      const response = await fetch(URL);
      if (!response.ok) {
        throw new Error(`HTTP status: ${response.status}`);
      }
      const data = await response.json();

      products = [...data];

      //   console.log(data);
      //   console.log(products);

      showProducts(products);
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  }

  getProducts();

  // showProducts
  function showProducts(data) {
    const html = data
      .map(
        (data) => `
        <article>
            <img class="productImg" src="${data.image}">
            <h5>${data.category}</h5>
            <h5>${data.title}</h5>
            <h5>€ ${data.price}</h5>
            <h5><img src="./assets/svg/star.svg"class="svg"> ${data.rating.rate}</h5>
            <div class="buttons">
                <button data-id="${data.id}" class="addBtn">Add to Cart</button>
                <button data-id="${data.id}" class="plusBtn"><img src="./assets/svg/plus-solid.svg" class="svg"></button>
                <span class="quantity">0</span>
                <button data-id="${data.id}" class="minusBtn"><img src="./assets/svg/minus-solid.svg" class="svg"></button>
            <div>
        </article>    
        
        `
      )
      .join("");

    webshopMain.innerHTML = html;
  }
});
