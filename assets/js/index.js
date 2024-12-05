document.addEventListener("DOMContentLoaded", () => {
  const API_URL = "https://fakestoreapi.com/products";

  const main = document.getElementById(`main`);
  const filterSelect = document.querySelector(`.filter-products`);
  const sortSelect = document.querySelector(".sort-products");

  let productsData = [];

  async function getProducts() {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}`);
      }

      const data = await response.json();

      console.log(data);
      renderProducts(data);

      productsData = [...data];

      console.log(sumTotal(data));
    } catch (error) {
      console.error(error);
    }
  }

  function renderProducts(data) {
    const html = data.map(
      (product) => `
      <article class="product-card">
        <img src="${product.image}" alt="${product.title}" />
        <h2>${product.title}</h2>
        <p>$${product.price}</p>
        <p>${product.rating.rate}</p>
      </article>
    `
    );

    main.innerHTML = html;
  }

  function filtering(category) {
    if (!category) {
      return productsData;
    } else {
      return productsData.filter((product) => product.category === category);
    }
  }

  function sorting(sort) {
    switch (sort) {
      case "title-asc":
        return productsData.sort((a, b) => a.title.localeCompare(b.title));
      case "title-desc":
        return productsData.sort((a, b) => b.title.localeCompare(a.title));
      case "price-asc":
        return productsData.sort((a, b) => b.price - a.price);
      case "price-desc":
        return productsData.sort((a, b) => a.price - b.price);
      case "rating-asc":
        return productsData.sort((a, b) => b.rating.rate - a.rating.rate);
      case "rating-desc":
        return productsData.sort((a, b) => a.rating.rate - b.rating.rate);
    }
  }

  function sumTotal(data) {
    const sum = data
      .map((product) => product.price)
      .reduce((acc, sum) => {
        return acc + sum;
      }, 0);

    return `$${sum.toFixed(2)}`;
  }

  filterSelect.addEventListener(`change`, (e) => {
    renderProducts(filtering(e.target.value));
  });

  sortSelect.addEventListener(`change`, (e) => {
    renderProducts(sorting(e.target.value));
  });

  getProducts();
});
