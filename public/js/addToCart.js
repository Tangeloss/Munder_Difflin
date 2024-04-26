window.addToCart = function (productId, quantity = 1) {
  console.log({ productId, quantity });
  fetch("/cart/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ productId: productId.product_id, quantity }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      alert(data.message);
    })
    .catch((error) => {
      console.error("Error adding product to cart:", error);
    });
};

function displayCartItems() {
  fetch("/cart/items", {
    method: "GET",
    credentials: "include",
  })
    .then((response) => response.json())
    .then((cartItems) => {
      const cartContainer = document.getElementById("cart-section");
      let cartTotal = 0;

      cartContainer.innerHTML = cartItems
        .map((item) => {
          const price = item.price || 0;
          const itemTotal = price * (item.quantity || 1);
          cartTotal += itemTotal;
          return `
          <div class="cart-dis">
            <div class="cart-item" id="cart-item-${item.cart_products_id}">
              <h3>${item.name || "No name"}</h3>
              <img src="${item.image_url || "/images/default.png"}" alt="${
            item.name || "No name"
          }">
              <p>${item.description || "No description"}</p>
              <p>Price: $${price.toFixed(2)}</p>
              <p>Quantity: ${item.quantity || 1}</p>
              <div class="quantity">
                <input type="number" id="quantity-${
                  item.cart_products_id
                }" value="${item.quantity || 1}" min="1">
                <button onclick="updateQuantity(${
                  item.cart_products_id
                }, document.getElementById('quantity-${
            item.cart_products_id
          }').value)" class="cta-button">Update</button>
              </div>
              <button onclick="removeFromCart(${
                item.cart_products_id
              })" class="cta-button">Remove</button>
            </div>
            </div>
          `;
        })
        .join("");

      const taxRate = 6.75 / 100;
      const taxAmount = cartTotal * taxRate;
      const deliveryFee = 15.0;
      const total = cartTotal + taxAmount + deliveryFee;

      const totalContainer = document.getElementById("total-section");
      totalContainer.innerHTML = `
      <aside>
        <p><strong>Cart Total:</strong> $${cartTotal.toFixed(2)}</p>
        <p>Tax (6.75%): $${taxAmount.toFixed(2)}</p>
        <p>Delivery Fee: $${deliveryFee.toFixed(2)}</p>
        <p><strong>Total: $${total.toFixed(2)}</strong></p>
        <button class="cta-button" onclick="handleCheckout()">Checkout</button>
        </aside>
      `;

      console.log("Cart updated");
    })
    .catch((error) => console.error("Error fetching cart items:", error));
}

if (window.location.pathname.endsWith("cart.html")) {
  document.addEventListener("DOMContentLoaded", displayCartItems);
}

function updateQuantity(cartProductId, newQuantity) {
  fetch(`/cart/update/${cartProductId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ newQuantity: parseInt(newQuantity, 10) }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP status ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      alert(data.message);
      displayCartItems();
    })
    .catch((error) => {
      console.error("Error updating cart quantity:", error);
      alert("Error updating cart quantity: " + error);
    });
}

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
        displayCartItems();
      }
    })
    .catch((error) =>
      console.error("Error removing product from cart:", error)
    );
}

function handleCheckout() {
  fetch("/cart/checkout", {
    method: "POST",
    credentials: "include",
  })
    .then((response) => response.json())
    .then((data) => {
      alert(data.message);
      displayCartItems();
    })
    .catch((error) => {
      console.error("Error during checkout:", error);
    });
}
