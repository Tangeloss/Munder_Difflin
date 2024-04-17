document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');
  
  if (searchInput && searchButton) {
    searchButton.addEventListener('click', performSearch);

    searchInput.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault(); // Prevent the default form submission
        performSearch();
      }
    });

    document.getElementById('edit_product_form').addEventListener('submit', function(event) {
      event.preventDefault();
      updateProduct();
    });
    
  } else {
    console.error('Search input or button not found');
  }
});

function searchProduct() {
  const productId = document.getElementById('search_product_id').value;
  fetch(`/api/products/${productId}`)
      .then(response => {
          if (!response.ok) {
              throw new Error('Failed to fetch product details');
          }
          return response.json();
      })
      .then(product => {
          if (product) {
              document.getElementById('product_id').value = product.product_id || '';
              document.getElementById('name').value = product.name || '';
              document.getElementById('description').value = product.description || '';
              document.getElementById('category_id').value = product.category_id || '';
              document.getElementById('image_path').value = product.image_url || '';
              document.getElementById('price').value = product.price || '';
          } else {
              alert('Product not found!');
          }
      })
      .catch(error => {
          console.error('Error fetching product:', error);
          alert(error.message);
      });
}




function updateProduct(event) {
  //event.preventDefault();  // Good practice to include this
  const productData = {
      product_id: document.getElementById('product_id').value,  // Though this field is read-only, capturing if needed
      name: document.getElementById('name').value,
      description: document.getElementById('description').value,
      category_id: document.getElementById('category_id').value,
      image_path: document.getElementById('image_path').value,
      price: document.getElementById('price').value
  };

  fetch('/api/products/update', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(productData)
  })
  .then(response => response.json())
  .then(data => {
      alert(data.message);  // Displaying a success message or handling response
  })
  .catch(error => {
      console.error('Error updating product:', error);
      alert('Failed to update product.');
  });
}


