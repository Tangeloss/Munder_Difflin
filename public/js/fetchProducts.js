document.addEventListener('DOMContentLoaded', function() {
    const baseUrl = ''; // Use the base URL of your backend if it's different from your frontend
    fetch(`${baseUrl}/api/products`)
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
  });
  