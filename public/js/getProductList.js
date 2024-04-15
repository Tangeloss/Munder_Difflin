// Assuming getProductList.js fetches and displays the products

document.addEventListener("DOMContentLoaded", function () {
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
  





  /*document.addEventListener("DOMContentLoaded", function () {
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
