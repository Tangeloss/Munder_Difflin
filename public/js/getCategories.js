// getCategories.js
document.addEventListener("DOMContentLoaded", function () {
  fetch("/categories")
    .then((response) => response.json())
    .then((categories) => {
      const categoriesContainer = document.getElementById("categories-section");
      categories.forEach((categories) => {
        categoriesContainer.innerHTML += `
              <div>
                  <img src="${categories.image_url}" alt="${categories.name}">
                  <h3>${categories.name}</h3>
                  <button class="cta-button" onclick="window.location.href='/products.html?category=${categories.category_id}'">Shop ${categories.name}</button>
              </div>
          `;
      });
    })
    .catch((error) => {
      console.error("Error fetching categories:", error);
    });
});
