/// Function to display cart items and calculate total on the cart page
function displayCartItems() {
    const cartContainer = document.getElementById('cart-section');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartTotal = 0;

    cartContainer.innerHTML = '';

    cart.forEach((product, index) => {
        const itemTotal = product.price * (product.quantity || 1); // Assuming quantity can be part of the product object, default to 1 if not present
        cartTotal += itemTotal;

        cartContainer.innerHTML += `
            <div class="cart-item" id="cart-item-${index}">
                <h3>${product.name}</h3>
                <img src="${product.image_url}" alt="${product.name}">
                <p>${product.description}</p>
                <p>Price: $${product.price.toFixed(2)}</p>
                <p>Quantity: ${product.quantity || 1}</p> <!-- Show quantity if available -->
                <button onclick="removeFromCart(${index})" class="cta-button">Remove</button>
            </div>
        `;
    });

    // Calculate tax and total
    const taxRate = 6.75 / 100;
    const taxAmount = cartTotal * taxRate;
    const deliveryFee = 15.00;
    const total = cartTotal + taxAmount + deliveryFee;

    // Update the total display
    const totalContainer = document.getElementById('total-section');
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
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1); // Remove the item at the specified index
    localStorage.setItem('cart', JSON.stringify(cart)); // Update the local storage
    
    // Optional: Display a message or indicator that an item was removed
    alert('Item removed from cart!');

    // Update the UI
    displayCartItems();

}

// This check ensures that displayCartItems only runs on the cart page
if (window.location.pathname.endsWith('cart.html')) {
    document.addEventListener('DOMContentLoaded', displayCartItems);
}
