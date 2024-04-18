document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  console.log("Product ID:", productId);

  if (!productId) {
    console.error("Product ID is undefined");
    return;
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
