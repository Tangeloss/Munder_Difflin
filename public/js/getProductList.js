// Assuming getProductList.js fetches and displays the products
// getProductList.js
document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const categoryId = urlParams.get("category");
  const searchQuery = urlParams.get("search");
  const productsContainer = document.getElementById("products-section");
  const searchResultsContainer = document.getElementById("results-section");
  console.log("Category ID:", categoryId);
  // Clear previous results
  productsContainer.innerHTML = "";
  searchResultsContainer.innerHTML = "";

  // Display products based on category if 'category' parameter exists
  if (categoryId) {
    fetch(`/products/category/${categoryId}`)
      .then((response) => response.json())
      .then((products) => {
        console.log(products); // Check the data
        const productsContainer = document.getElementById("products-section");
        productsContainer.innerHTML = ""; // Clear the products container before adding new products
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

  // Display products based on search if 'search' parameter exists
  if (searchQuery) {
    fetch(`/products/search?search=${encodeURIComponent(searchQuery)}`)
      .then((response) => response.json())
      .then((products) => {
        const searchResultsContainer =
          document.getElementById("results-section");
        // Clear any existing products before displaying new ones
        searchResultsContainer.innerHTML = "";

        if (products.length === 0) {
          // No products found for the search query
          searchResultsContainer.innerHTML = "<p>No products found.</p>";
          return;
        }

        // Build HTML for each product and append to the container
        products.forEach((product) => {
          searchResultsContainer.innerHTML += `
                  <div class="product">
                      <img src="${product.image_url}" alt="${product.name}">
                      <h3>${product.name}</h3>
                      <p>${product.description}</p>
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
        // Logic to display search results...
        // Make sure to use searchResultsContainer for appending search results
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
});

/*document.addEventListener("DOMContentLoaded", function () {
    // Get the category ID from the URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const categoryId = urlParams.get('category'); // This will be `null` if no category parameter is present
  
    console.log("Category ID:", categoryId);

    if(categoryId){
    fetch(`/products/category/${categoryId}`)
      .then((response) => response.json())
      .then((products) => {
        console.log(products); // Check the data
        const productsContainer = document.getElementById("products-section");
        productsContainer.innerHTML = ''; // Clear the products container before adding new products
        products.forEach((product) => {
          productsContainer.innerHTML += `
              <div class="product">
                  <img src="${product.image_url}" alt="${product.name}">
                  <p>${product.name}</p>
                  <p><strong>Price: </strong>$${product.price}</p>
                  <a href="details.html?id=${product.product_id}" class="cta-button">Details</a>
              </div>
          `;
        });
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
    }
  });

  // getProductList.js
document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get('search'); // Retrieves the search parameter from the URL
  const endpoint = searchQuery ? `/products/search?search=${encodeURIComponent(searchQuery)}` : '/products';

  fetch(endpoint)
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not OK');
          }
          return response.json();
      })
      .then(products => {
          const productsContainer = document.getElementById("results-section");
          // Clear any existing products before displaying new ones
          productsContainer.innerHTML = '';

          if (products.length === 0) {
              // No products found for the search query
              productsContainer.innerHTML = '<p>No products found.</p>';
              return;
          }

          // Build HTML for each product and append to the container
          products.forEach(product => {
              productsContainer.innerHTML += `
                  <div class="product">
                      <img src="${product.image_url}" alt="${product.name}">
                      <h3>${product.name}</h3>
                      <p>${product.description}</p>
                      <p><strong>Price:</strong> $${product.price.toFixed(2)}</p>
                      <button onclick="addToCart(${product.product_id})" class="cta-button">Add to Cart</button>
                  </div>
              `;
          });
      })
      .catch(error => {
          console.error('Error:', error);
      });
});

  
document.addEventListener("DOMContentLoaded", function () {
      fetch("/products")
        .then((response) => response.json())
        .then((products) => {
          console.log(products); // Check the data
          const productsContainer = document.getElementById("products-section");
          products.forEach((product) => {
            productsContainer.innerHTML += `
                <div>
                    <img src="${product.image}" alt="${product.name}">
                    <p>${product.name}</p>
                    <p><strong>Price: </strong>$${product.price}</p>
                    <a href="details.html?id=${product.product_id}" class="cta-button">Details</a>
                </div>
            `;
          });
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
    });



document.addEventListener('DOMContentLoaded', function() {
    fetch('/products')
        .then(response => response.json())
        .then(products => {
            const productsContainer = document.getElementById('products-section');
            products.forEach(product => {
                productsContainer.innerHTML += `
                    <div>
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                        <p><strong>Price:</strong> $${product.price}</p>
                        <a href="details.html?id=${product.id}" class="cta-button">Details</a>
                    </div>
                `;
            });
        })
        .catch(error => console.error('Error fetching products:', error));
});*/
