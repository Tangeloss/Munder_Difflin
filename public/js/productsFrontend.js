
document.addEventListener('DOMContentLoaded', () => {

    // Fetch products data
    fetchProducts()
      .then(products => {
      
        // Get container element  
        const productContainer = document.querySelector('.products');
        
        // Render each product
        products.forEach(product => {
          const productEl = document.createElement('div');
          productEl.classList.add('product');
          productEl.innerHTML = `
            <h3>${product.name}</h3>
            <img src="${product.image}">
            <a href="/products/${product.id}">View Details</a>
          `;
          productContainer.appendChild(productEl);
        });
        
      })
      .catch(err => console.error(err));
  
    // Add event listener for product click
    const productEls = document.querySelectorAll('.product');
    
    productEls.forEach(el => {
      el.addEventListener('click', event => {
        const productId = event.target.closest('.product').dataset.id; 
        handleProductClick(productId);
      });
    });
  
  });