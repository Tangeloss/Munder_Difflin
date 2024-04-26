document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");

  if (searchInput && searchButton) {
    searchButton.addEventListener("click", performSearch);

    searchInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        performSearch();
      }
    });

    document
      .getElementById("edit_product_form")
      .addEventListener("submit", function (event) {
        event.preventDefault();
        updateProduct();
        createProduct();
      });
  } else {
    console.error("Search input or button not found");
  }
});

function searchProduct() {
  const productId = document.getElementById("search_product_id").value;
  fetch(`/api/products/${productId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch product details");
      }
      return response.json();
    })
    .then((product) => {
      if (product) {
        document.getElementById("product_id").value = product.product_id || "";
        document.getElementById("name").value = product.name || "";
        document.getElementById("description").value =
          product.description || "";
        document.getElementById("category_id").value =
          product.category_id || "";
        document.getElementById("image_url").value = product.image_url || "";
        document.getElementById("price").value = product.price || "";
      } else {
        alert("Product not found!");
      }
    })
    .catch((error) => {
      console.error("Error fetching product:", error);
      alert(error.message);
    });
}

function updateProduct(event) {
  event.preventDefault();
  const productData = {
    product_id: document.getElementById("product_id").value,
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    category_id: document.getElementById("category_id").value,
    image_url: document.getElementById("image_url").value,
    price: document.getElementById("price").value,
  };

  console.log("Sending data to server:", productData);

  fetch("/api/products/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Server response:", data);
      alert(data.message);
    })
    .catch((error) => {
      console.error("Error updating product:", error);
      alert("Failed to update product.");
    });
  return false;
}
function createProduct(event) {
  event.preventDefault();
  const productData = {
    name: document.getElementById('add_name').value,
    description: document.getElementById('add_description').value,
    category_id: document.getElementById('add_category_id').value,
    image_url: document.getElementById('add_image_url').value,
    price: document.getElementById('add_price').value,
  };

  console.log("Sending data to server for product creation:", productData);

  fetch("/api/products/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  })
    .then(response => response.json())
    .then(data => {
      console.log("Server response:", data);
      alert(data.message);
    })
    .catch(error => {
      console.error("Error creating product:", error);
      alert("Failed to create product.");
    });
  return false;
}


function uploadProducts(event) {
  event.preventDefault();
  const fileInput = document.getElementById('file_input');
  const file = fileInput.files[0];

  if (!file) {
    alert('Please select a file.');
    return;
  }

  const formData = new FormData();
  formData.append('file', file);

  fetch('/api/products/upload', {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      alert(data.message);
    })
    .catch(error => {
      console.error('Error uploading products:', error);
      alert('Failed to upload products.');
    });
}
