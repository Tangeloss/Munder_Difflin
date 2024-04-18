document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const categoryId = urlParams.get("category");
  const searchQuery = urlParams.get("search");
  const productsContainer = document.getElementById("products-section");
  const searchResultsContainer = document.getElementById("results-section");
  console.log("Category ID:", categoryId);
  productsContainer.innerHTML = "";
  searchResultsContainer.innerHTML = "";

  if (categoryId) {
    fetch(`/products/category/${categoryId}`)
      .then((response) => response.json())
      .then((products) => {
        console.log(products);
        const productsContainer = document.getElementById("products-section");
        productsContainer.innerHTML = "";
        products.forEach((product) => {
          productsContainer.innerHTML += `
              <div class="product">
                  <img src="${product.image_url}" alt="${product.name}">
                  <p>${product.name}</p>
                  <p><strong>Price: </strong>$${product.price}</p>
                  <a href="details.html?id=${product.product_id}" class="cta-button">Details</a>
              </div>
          `;
          searchResultsContainer.style.display = "none";
        });
      })
      .catch((error) => {
        console.error("Error fetching category products:", error);
      });
  }

  if (searchQuery) {
    fetch(`/products/search?search=${encodeURIComponent(searchQuery)}`)
      .then((response) => response.json())
      .then((products) => {
        const searchResultsContainer =
          document.getElementById("results-section");
        searchResultsContainer.innerHTML = "";

        if (products.length === 0) {
          searchResultsContainer.innerHTML = "<p>No products found.</p>";
          return;
        }
        products.forEach((product) => {
          searchResultsContainer.innerHTML += `
                  <div class="product">
                      <img src="${product.image_url}" alt="${product.name}">
                      <h3>${product.name}</h3>
                      <p><strong>Price:</strong> $${product.price.toFixed(
                        2
                      )}</p>
                      <a href="details.html?id=${
                        product.product_id
                      }" class="cta-button">Details</a>
                  </div>
              `;
          searchResultsContainer.style.display = "block";
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
});
