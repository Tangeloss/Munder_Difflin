document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");

  if (searchInput && searchButton) {
    searchButton.addEventListener("click", performSearch);

    searchInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        e.preventDefault(); // Prevent the default form submission
        performSearch();
      }
    });

    document
      .getElementById("edit_product_form")
      .addEventListener("submit", function (event) {
        event.preventDefault();
        updateProduct();
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
    image_url: document.getElementById("image_url").value, // Corrected to 'image_url'
    price: document.getElementById("price").value,
  };

  console.log("Sending data to server:", productData); // Debugging output

  fetch("/api/products/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Server response:", data); // More debugging output
      alert(data.message);
    })
    .catch((error) => {
      console.error("Error updating product:", error);
      alert("Failed to update product.");
    });
  return false; // Ensure this is here to prevent form submission
}
