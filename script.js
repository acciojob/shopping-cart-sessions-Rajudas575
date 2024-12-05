// Sample product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 }
];

// Function to render products
function renderProducts() {
  const productList = document.getElementById("product-list");
  productList.innerHTML = '';  // Clear the list before rendering
  products.forEach(product => {
    const li = document.createElement("li");
    li.classList.add("product");
    li.innerHTML = `
      <span>${product.name} - ${product.price}</span>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productList.appendChild(li);
  });
}

// Function to render the shopping cart
function renderCart() {
   const cartList = document.getElementById("cart-list");
  cartList.innerHTML = '';  // Clear the cart list before rendering
  const cartItems = JSON.parse(sessionStorage.getItem("cart")) || [];

  // Ensure each item is added to the cart list
  cartItems.forEach(item => {
    const li = document.createElement("li");
    li.classList.add("cart-item");
    li.innerHTML = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

// Function to add a product to the cart
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

  // Allow duplicates (no need to check for duplicates here)
  cart.push(product);

  // Save the updated cart to sessionStorage
  sessionStorage.setItem("cart", JSON.stringify(cart));

  // Re-render the cart
  renderCart();
}

// Function to clear the cart
function clearCart() {
  sessionStorage.removeItem("cart");
  renderCart();  // Re-render the cart to reflect the empty cart
}

// Attach event listener for the "Clear Cart" button
document.getElementById("clear-cart-btn").addEventListener("click", clearCart);

// Initial render of products and cart when the page loads
window.onload = function() {
  renderProducts();
  renderCart();
};
