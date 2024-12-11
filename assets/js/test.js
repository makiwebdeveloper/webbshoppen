document.addEventListener("DOMContentLoaded", () => {

  const mainContent = document.getElementById("main-content");
  const prev = document.getElementById('prev');
  const next = document.getElementById('next');
  let product = [];
  const URL = "https://fakestoreapi.com/products";

  let currentPage = 0;
  const perPage = 5;

  async function getData() {
    try {
      const response = await fetch(URL);
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const data = await response.json();
      product = [...data];
      renderData(product);
      // console.log(data);
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  }

  getData();

  function renderData(data) {
    const html = pagination(data)
      .map(
        (data) => `
        <article>
            <img class="productImg" src="${data.image}">
            <h4>${data.title}</h4>
            <p>${data.description}</p>
            <p>€${data.price}</p>
            <p>${data.rating.rate}/5</p>
        </article>
        `
      )
      .join(" ");

    mainContent.innerHTML = html;
  }


  // FILTER 
  function filtering(data, category) {
    if (category === "all") {
      return data;
    } else {
      return data.filter((product) => product.category === category);
    }
  }

  const filter = document.querySelector(".filter");
  filter.addEventListener("change", (e) => {
    currentPage = 0;
    renderData(filtering(product, e.target.value));

    console.log(e.target.value);
  });


  // SORT
  const sort = document.querySelector(".sort");
  sort.addEventListener("change", (e) => {
    renderData(sorting(product, e.target.value));

    console.log(e.target.value);
  });

  function sorting(data, sort) {
    switch (sort) {
      case "Alph asc-desc":
        return data.sort((a, b) => a.title.localeCompare(b.title));

      case "Alph desc-asc":
        return data.sort((a, b) => b.title.localeCompare(a.title));

      case "Price asc-desc":
        return data.sort((a, b) => b.price - a.price);

      case "Price desc-asc":
        return data.sort((a, b) => a.price - b.price);

      case "Rating asc-desc":
        return data.sort((a, b) => b.rating.rate - a.rating.rate);

      case "Rating desc-asc":
        return data.sort((a, b) => a.rating.rate - b.rating.rate);
    }
  }


  // PAGINATION

  // Prev and Next buttons and logic for page numbers 
  // arr.slice(currentPage * perPage, (currentPage * perPage) + perPage)

  function pagination(data) {
    if (currentPage === 0) {
        prev.style.display = "none";
    } else if (currentPage === (data.length/perPage) -1) {
        next.style.display = "none";
    } else {
        prev.style.display = "inline-block";
        next.style.display = "inline-block";
    }
    return data.slice(currentPage * perPage, (currentPage * perPage) + perPage);
  }

  prev.addEventListener('click', (e) => {
    e.preventDefault();
    currentPage--;
    renderData(product);
  });
 
  next.addEventListener('click', (e) => {
    e.preventDefault();
    currentPage++;
    renderData(product);
  });



});
