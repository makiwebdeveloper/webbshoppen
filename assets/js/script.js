document.addEventListener("DOMContentLoaded", () => {
  const filter = document.getElementById("filter");
  const sort = document.getElementById("sort");
  const webshopMain = document.getElementById("webshop-main");
  const shoppingCart = document.getElementById("shopping-cart");
  const checkOut = document.getElementById("checkout");
  const svgClose = document.getElementById("svg-close");
  const productList = document.getElementById("product-list");
  const svgCart = document.getElementById("svg-cart");
  const checkoutModal = document.getElementById('checkoutModal');
  const contactForm = document.getElementById("contact-form");
  const payBtn = document.getElementById('payBtn');
  const checkoutBtn = document.getElementById("checkoutBtn");
  const total = document.getElementById("total");
  let products = [];
  let myCart = JSON.parse(localStorage.getItem("myCart") || "[]");

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

  webshopMain.addEventListener("click", (e) => {
    e.preventDefault();
    const btn = e.target.closest("button");
    if (!btn) return;

    const itemId = btn.dataset.id;
    if (!itemId) {
      console.error(`ID is invalid or does not exist!`);
      return;
    }

    const product = products.find((p) => p.id === parseInt(itemId));
    if (!product) {
      console.error(`Product ID ${itemId} not found!`);
      return;
    }

    const article = btn.closest("article");
    const quantityHtml = article.querySelector(".quantity");
    let quantity = parseInt(quantityHtml.textContent) || 0;

    if (btn.classList.contains("addBtn")) {
      showAlert("Product has been added to your cart!", 3000);

      addItemToCart(product, quantity);
    } else if (btn.classList.contains("plusBtn")) {
      // increaseQuantity
      quantity++;
      quantityHtml.textContent = quantity;

      const minusBtn = article.querySelector(".minusBtn");
      minusBtn.removeAttribute("disabled");
    } else if (btn.classList.contains("minusBtn")) {
      // decreaseQuantity
      if (quantity > 0) {
        quantity--;
        quantityHtml.textContent = quantity;
      }
      if (quantity === 0) {
        btn.setAttribute("disabled", "true");
      }
    }
  });

  // addItemToCart
  function addItemToCart(product, quantity) {
    if (quantity <= 0) {
      showAlert(
        "Quantity must be higher than 0! Please select at least one product.",
        3000
      );
      return;
    }

    const existingInCart = myCart.find((p) => p.ItemId === product.id);

    if (existingInCart) {
      myCart.map((item) =>
        item.ItemId === existingInCart.ItemId
          ? { ...item, Quantity: (item.Quantity += quantity) }
          : item
      );
    } else {
      myCart.push({
        ItemId: product.id,
        Title: product.title,
        Price: product.price,
        Quantity: quantity,
      });
    }
    saveCartToLocalStorage();
  }

  // saveCartToLocalStorage
  function saveCartToLocalStorage() {
    localStorage.setItem("myCart", JSON.stringify(myCart));
    console.log(`Cart: ${JSON.stringify(myCart)}`);
  }

  // filterProducts
  filter.addEventListener("change", (e) => {
    e.preventDefault();
    const filtering = e.target.value;
    const filteredProducts = filterProducts(filtering);
    showProducts(filteredProducts);
  });

  function filterProducts(category) {
    if (category === "all") {
      return products;
    } else {
      return products.filter((product) => product.category === category);
    }
  }

  // sortProducts
  sort.addEventListener("change", (e) => {
    e.preventDefault();
    const sorting = e.target.value;
    const sortedProducts = sortProducts(sorting);
    showProducts(sortedProducts);
  });

  function sortProducts(sort) {
    switch (sort) {
      case "A-Z":
        return products.sort((a, b) => a.title.localeCompare(b.title));
      case "Z-A":
        return products.sort((a, b) => b.title.localeCompare(a.title));
      case "Price Low > High":
        return products.sort((a, b) => a.price - b.price);
      case "Price High > Low":
        return products.sort((a, b) => b.price - a.price);
      case "Rate High > Low":
        return products.sort((a, b) => b.rating.rate - a.rating.rate);
      case "Rate Low > High":
        return products.sort((a, b) => a.rating.rate - b.rating.rate);
    }
  }

  function showCart(data) {
    productList.innerHTML = myCart
      .map(
        (data) => `
      <li> 
        <p>${data.Title}</p>
        <p>€ ${data.Price * data.Quantity}</p>
        <div class="buttons">
                <button data-id="${
                  data.ItemId
                }" class="deleteBtn"><img src="./assets/svg/delete.svg" class="svg"></button>
                <button data-id="${
                  data.ItemId
                }" class="plusBtn"><img src="./assets/svg/plus-solid.svg" class="svg"></button>
                <span class="quantity">${data.Quantity}</span>
                <button data-id="${
                  data.ItemId
                }" class="minusBtn"><img src="./assets/svg/minus-solid.svg" class="svg"></button>
        <div>
      </li>`
      )
      .join("");

    total.innerHTML = sumTotal(myCart);
  }

  function sumTotal(data) {
    const sum = data
      .map((product) => product.Price * product.Quantity)
      .reduce((acc, sum) => {
        return acc + sum;
      }, 0);

    return `$${sum.toFixed(2)}`;
  }

  productList.addEventListener("click", (e) => {
    e.preventDefault();
    const btn = e.target.closest("button");
    if (!btn) return;

    const itemId = btn.dataset.id;
    if (!itemId) {
      console.error(`ID is invalid or does not exist!`);
      return;
    }

    const product = products.find((p) => p.id === parseInt(itemId));

    if (!product) {
      console.error(`Product ID ${itemId} not found!`);
      return;
    }

    const existingInCart = myCart.find((p) => p.ItemId === product.id);
    let existingQuantity = existingInCart.Quantity;
    console.log(existingInCart);

    const li = btn.closest("li");

    if (btn.classList.contains("deleteBtn")) {
      myCart = [
        ...myCart.filter((item) => item.ItemId !== existingInCart.ItemId),
      ];
    } else if (btn.classList.contains("plusBtn")) {
      // increaseQuantity
      existingQuantity++;
      existingInCart.Quantity = existingQuantity;

      const minusBtn = li.querySelector(".minusBtn");
      minusBtn.removeAttribute("disabled");
    } else if (btn.classList.contains("minusBtn")) {
      // decreaseQuantity
      existingQuantity--;
      existingInCart.Quantity = existingQuantity;

      if (existingQuantity === 0) {
        btn.setAttribute("disabled", "true");
        myCart = [
          ...myCart.filter((item) => item.ItemId !== existingInCart.ItemId),
        ];
      }
    }
    saveCartToLocalStorage();
    showCart();
  });

  svgCart.addEventListener("click", (e) => {
    webshopMain.style.display = "none";
    filter.style.display = "none";
    sort.style.display = "none";
    shoppingCart.style.display = "flex";

    showCart();
  });

  checkoutBtn.addEventListener("click", (e) => {
    checkOut.style.display = "flex";
    shoppingCart.style.display = "none";
  });

  svgClose.addEventListener("click", (e) => {
    webshopMain.style.display = "grid";
    filter.style.display = "inline-flex";
    sort.style.display = "inline-flex";
    shoppingCart.style.display = "none";
    checkoutModal.style.display = "none";
  });

  payBtn.addEventListener("click", (e) => {
    webshopMain.style.display = "grid";
    filter.style.display = "inline-flex";
    sort.style.display = "inline-flex";
    shoppingCart.style.display = "none";
    checkoutModal.style.display = "none";

    localStorage.clear();
    // localStorage.removeItem("myCart");
    myCart.splice(0, myCart.length);
    productList.innerHTML = "";
  });

  // ALERT
  function showAlert(message, timeout = 3000) {
    const alertBox = document.getElementById("custom-alert");

    alertBox.textContent = message;
    alertBox.classList.remove("hidden", "hide");
    alertBox.classList.add("show");

    setTimeout(() => {
      alertBox.classList.remove("show");
      alertBox.classList.add("hide");

      setTimeout(() => {
        alertBox.classList.add("hidden");
      }, 500);
    }, timeout);
  }

  // SUBMIT THE CONTACT FORM / SENDING EMAIL
  emailjs.init("CUTjA1ptYGkoIJ1On");

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Define your EmailJS service and template IDs
    const serviceID = "webbshoppen";
    const templateID = "webbshoppen";

    // Use emailjs.sendForm
    emailjs
      .sendForm(serviceID, templateID, contactForm)
      .then(() => {
        showAlert(`Your message was successful!`, 1000);
        contactForm.reset(); // Reset form
      })
      .catch((error) => {
        showAlert(`Message failed. Please try again.`, 1000);
        console.log(`EmailJS error: ${error}`);
      });
  });

  emailjs.sendForm();
});
