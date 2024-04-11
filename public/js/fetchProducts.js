/*document.addEventListener('DOMContentLoaded', function() {
    const baseUrl = ''; // Use the base URL of your backend if it's different from your frontend
    fetch(`${baseUrl}/products`)
      .then(response => response.json())
      .then(products => {
        const productDisplay = document.getElementById('product-display');
        productDisplay.innerHTML = ''; // Clear previous content
        products.forEach(product => {
          const productDiv = document.createElement('div');
          productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <a href="${product.link}" class="cta-button">${product.name}</a>
          `;
          productDisplay.appendChild(productDiv);
        });
      })
      .catch(error => console.error('Failed to load products:', error));
  });*/

  // fetchProducts.js

  // fetchProducts.js


// Fetch single product data
async function fetchProduct(id) {

  const response = await fetch(`/products/${id}`);
  return await response.json();

}

// Render product details page
function renderProductDetails(product) {

  document.querySelector('.product-detail').innerHTML = `
    <h2>${product.name}</h2>
    <img src="${product.image}">
    <p>${product.description}</p>
    <p>Price: $${product.price}</p>
  `;

}

function handleProductClick(id) {
  fetchProduct(id)
    .then(product => renderProductDetails(product)) 
}


async function fetchProducts() {
  const response = await fetch('/products');
  return await response.json();
}

async function fetchProductById(id) {
  const response = await fetch(`/products/${id}`);
  return await response.json(); 
}

module.exports = {
  fetchProducts,
  fetchProductById
};
  