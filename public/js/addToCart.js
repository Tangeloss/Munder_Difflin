/// Function to display cart items and calculate total on the cart page
// Function to add a product to the cart
window.addToCart = function (productId, quantity = 1) {
  fetch("/cart/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId, quantity }),
    credentials: "include", // Include cookies for session
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    alert(data.message); // Notify the user of the result
    // Additional logic to handle the response
  })
  .catch(error => {
    console.error('Error adding product to cart:', error);
  });
};


// Function to display cart items and calculate total on the cart page
function displayCartItems() {
  fetch("/cart/items", {
    method: "GET",  
    credentials: "include", // Include session cookie in the request if needed
  })
    .then((response) => response.json())
    .then((cartItems) => {
      const cartContainer = document.getElementById("cart-section");
      let cartTotal = 0;

      cartContainer.innerHTML = cartItems
        .map((item) => {
          const itemTotal = item.price * item.quantity;
          cartTotal += itemTotal;
          return `
        <div class="cart-item" id="cart-item-${item.cart_products_id}">
          <h3>${item.name}</h3>
          <img src="${item.image_url}" alt="${item.name}">
          <p>${item.description}</p>
          <p>Price: $${item.price.toFixed(2)}</p>
          <p>Quantity: ${item.quantity}</p>
          <div class="quantity">
            <input type="number" value="${item.quantity}" min="1">
            <button onclick="updateQuantity(${
              item.cart_products_id
            }, this.previousElementSibling.value)" class="cta-button">Save</button>
          </div>
          <button onclick="removeFromCart(${
            item.cart_products_id
          })" class="cta-button">Remove</button>
        </div>
      `;
        })
        .join("");
        
  console.log('Cart items:', cartItems);
        console.log('Updating cart total');

      // Update the total display
      const taxRate = 6.75 / 100;
      const taxAmount = cartTotal * taxRate;
      const deliveryFee = 15.0;
      const total = cartTotal + taxAmount + deliveryFee;

      // Update the total display
      const totalContainer = document.getElementById("total-section");
      totalContainer.innerHTML = `
        <p><strong>Cart Total:</strong> $${cartTotal.toFixed(2)}</p>
        <p>Tax (6.75%): $${taxAmount.toFixed(2)}</p>
        <p>Delivery Fee: $${deliveryFee.toFixed(2)}</p>
        <p><strong>Total: $${total.toFixed(2)}</strong></p>
        <button class="cta-button">Checkout</button>
    `;
    console.log('Cart updated');

    })
    .catch((error) => console.error("Error fetching cart items:", error));
}

// Call displayCartItems to update the page
if (window.location.pathname.endsWith("cart.html")) {
  document.addEventListener("DOMContentLoaded", displayCartItems);
}

// Function to update the quantity of a product in the cart
function updateQuantity(cartProductId, newQuantity) {
  // Send the update to the server
  fetch(`/cart/update/${cartProductId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      credentials: "include",
    },
    body: JSON.stringify({ newQuantity }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message) {
        alert(data.message);
        displayCartItems(); // Refresh the cart display
      }
    })
    .catch((error) => console.error("Error updating cart quantity:", error));
}

// Function to remove a product from the cart
function removeFromCart(cartProductId) {
  fetch(`/cart/remove/${cartProductId}`, {
    method: "DELETE",
    headers: {
      credentials: "include",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message) {
        alert(data.message);
        displayCartItems(); // Refresh the cart display
      }
    })
    .catch((error) =>
      console.error("Error removing product from cart:", error)
    );
}

/*function displayCartItems() {
  const cartContainer = document.getElementById("cart-section");
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let cartTotal = 0;

  cartContainer.innerHTML = "";

  cart.forEach((product, index) => {
    const itemTotal = product.price * (product.quantity || 1); // Assuming quantity can be part of the product object, default to 1 if not present
    cartTotal += itemTotal;

    cartContainer.innerHTML += `
            <div class="cart-item" id="cart-item-${index}">
                <h3>${product.name}</h3>
                <img src="${product.image_url}" alt="${product.name}">
                <p>${product.description}</p>
                <p>Price: $${product.price.toFixed(2)}</p>
                <p>Quantity: ${
                  product.quantity || 1
                }</p> <!-- Show quantity if available -->
                <div class="quantity">
      <input type="number" id="quantity-${product.product_id}" value="${
      product.quantity || 1
    }" min="1">
      <button onclick="updateQuantity(${product.product_id}, getNewQuantity(${
      product.product_id
    }))" class="cta-button">Save</button>
    </div>
                <button onclick="removeFromCart(${index})" class="cta-button">Remove</button>
            </div>
        `;
  });

  // Calculate tax and total
  const taxRate = 6.75 / 100;
  const taxAmount = cartTotal * taxRate;
  const deliveryFee = 15.0;
  const total = cartTotal + taxAmount + deliveryFee;

  // Update the total display
  const totalContainer = document.getElementById("total-section");
  totalContainer.innerHTML = `
        <p><strong>Cart Total:</strong> $${cartTotal.toFixed(2)}</p>
        <p>Tax (6.75%): $${taxAmount.toFixed(2)}</p>
        <p>Delivery Fee: $${deliveryFee.toFixed(2)}</p>
        <p><strong>Total: $${total.toFixed(2)}</strong></p>
        <button class="cta-button">Checkout</button>
    `;
}

// Function to remove a product from the cart
function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1); // Remove the item at the specified index
  localStorage.setItem("cart", JSON.stringify(cart)); // Update the local storage

  // Optional: Display a message or indicator that an item was removed
  //alert('Item removed from cart!');

  // Update the UI
  displayCartItems();
}

// Function to update the quantity of a product in the cart
function updateQuantity(productId, newQuantity) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let productIndex = cart.findIndex((item) => item.product_id === productId);

  if (productIndex !== -1) {
    // Update the quantity of the product
    cart[productIndex].quantity = newQuantity;

    // Save the updated cart back to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Recalculate and update the cart total display
    displayCartItems();
  } else {
    console.error("Product not found in cart");
  }
}

function getNewQuantity(productId) {
  const quantityInput = document.getElementById(`quantity-${productId}`);
  return quantityInput ? parseInt(quantityInput.value, 10) : 0;
}

// addToCart.js

// Function to add a product to the cart
window.addToCart = function (productId) {
  // Retrieve the existing cart from local storage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Find if the product already exists in the cart
  let productIndex = cart.findIndex((item) => item.product_id === productId);

  if (productIndex !== -1) {
    // Product exists, update the quantity
    cart[productIndex].quantity += 1;
  } else {
    // Product does not exist, fetch product details and add to cart
    fetch(`/products/${productId}`)
      .then((response) => response.json())
      .then((product) => {
        product.quantity = 1; // Start with a quantity of 1
        cart.push(product); // Add new product to cart
        localStorage.setItem("cart", JSON.stringify(cart)); // Update cart in local storage
        console.log(`Product ${productId} added to cart`);
      })
      .catch((error) => {
        console.error(`Error adding product ${productId} to cart: `, error);
      });
  }

  // Save the updated cart back to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart!");
};

// This check ensures that addToCart is only defined on pages where it's used
if (
  window.location.pathname.endsWith("products.html") ||
  window.location.pathname.endsWith("index.html")
) {
  window.addToCart = addToCart;
}

// Call displayCartItems to update the page
displayCartItems();

// This check ensures that displayCartItems only runs on the cart page
if (window.location.pathname.endsWith("cart.html")) {
  document.addEventListener("DOMContentLoaded", displayCartItems);
}*/
