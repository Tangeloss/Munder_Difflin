// client.js (client-side)
fetch('http://localhost:3000/products/all')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(products => {
    const productList = document.getElementById('product-list');
    products.forEach(product => {
      const productItem = document.createElement('div');
      productItem.textContent = product.name;
      productList.appendChild(productItem);
    });
  })
  .catch(error => {
    console.error('Fetch error:', error);
    // Display an error message to the user
  });