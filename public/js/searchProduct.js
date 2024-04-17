document.addEventListener("DOMContentLoaded", function () {

  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');

  if (searchInput && searchButton) {
    searchButton.addEventListener('click', function () {
      const query = searchInput.value;
      window.location.href = `/products.html?search=${encodeURIComponent(query)}`;
    });

    searchInput.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        searchButton.click();
      }
    });
  } else {
    console.error('Search input or button not found');
  }
});
