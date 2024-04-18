// getProductDetails.js
/*document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');  // Get the product ID from the URL

    fetch(`/products/${productId}`)
        .then(response => response.json())
        .then(product => {
            console.log('Product data:', product);
            // Make sure these fields are correct
            document.querySelector('.product-details').innerHTML = `
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <p><strong>Price:</strong> $${product.price}</p>
            `;
        })
        .catch(error => console.error('Error fetching data:', error));
});*/

document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id"); // Make sure 'id' matches the query parameter key

  console.log("Product ID:", productId);

  if (!productId) {
    console.error("Product ID is undefined");
    return; // Stop further execution if no product ID is found
  }

  fetch(`/products/${productId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not OK");
      }
      return response.json();
    })
    .then((product) => {
      const productDetailsSection = document.querySelector(".product-details");
      if (productDetailsSection) {
        productDetailsSection.innerHTML = `
                  <h2>${product.name}</h2>
                  <img src="${product.image_url}" alt="${product.name}">
                  <p>${product.description}</p>
                  <p><strong>Price:</strong> $${product.price}</p>
                  <button id="addToCartButton" class="cta-button">Add to Cart</button>
              `;

        document
          .getElementById("addToCartButton")
          .addEventListener("click", () => {
            addToCart(product);
          });
      }
    })
    .catch((error) => {
      console.error("Error fetching product details:", error);
    });
});

/*
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart!");
}


document.addEventListener("DOMContentLoaded", function () {
  const queryParams = new URLSearchParams(window.location.search);
  const productId = queryParams.get("id");

  fetch(`/products/${productId}`)
    .then((response) => response.json())
    .then((product) => {
      const productDetailsSection = document.querySelector(".product-details");
      productDetailsSection.innerHTML = `
              <h2>${product.name}</h2>
              <img src="${product.image}" alt="${product.name}">
              <p>${product.description}</p>
              <p><strong>Price:</strong> $${product.price}</p>
              <button id="addToCartButton" class="cta-button">Add to Cart</button>
          `;

      // After setting the innerHTML of product details...
      const addToCartButton = document.getElementById("addToCartButton");
      addToCartButton.addEventListener("click", () => {
        addToCart(product);
      });
    })
    .catch((error) => console.error("Error:", error));
});

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart!");
}*/
