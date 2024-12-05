const products = [
      { id: 1, name: "Product 1", price: 10 },
      { id: 2, name: "Product 2", price: 20 },
      { id: 3, name: "Product 3", price: 30 },
      { id: 4, name: "Product 4", price: 40 },
      { id: 5, name: "Product 5", price: 50 },
    ];

    // DOM elements
    const productList = document.getElementById("product-list");
    const cartList = document.getElementById("cart-list");
    const clearCartBtn = document.getElementById("clear-cart-btn");

    // Retrieve cart from session storage
    function getCartFromStorage() {
      const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
      return cart;
    }

    // Save cart to session storage
    function saveCartToStorage(cart) {
      sessionStorage.setItem('cart', JSON.stringify(cart));
    }

    // Render product list
    function renderProducts() {
      products.forEach((product) => {
        const li = document.createElement("li");
        li.innerHTML = `${product.name} - $${product.price} 
          <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
        productList.appendChild(li);
      });

      // Attach event listener to "Add to Cart" buttons
      const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
      addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          const productId = parseInt(e.target.getAttribute('data-id'));
          addToCart(productId);
        });
      });
    }

    // Render cart list
    function renderCart() {
      const cart = getCartFromStorage();
      cartList.innerHTML = ""; // Clear current cart list

      if (cart.length === 0) {
        cartList.innerHTML = "<li>Your cart is empty.</li>";
      } else {
        cart.forEach((productId) => {
          const product = products.find(p => p.id === productId);
          const li = document.createElement("li");
          li.innerHTML = `${product.name} - $${product.price} 
            <button class="remove-from-cart-btn" data-id="${productId}">Remove</button>`;
          cartList.appendChild(li);
        });
      }

      // Attach event listener to "Remove from Cart" buttons
      const removeFromCartBtns = document.querySelectorAll('.remove-from-cart-btn');
      removeFromCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          const productId = parseInt(e.target.getAttribute('data-id'));
          removeFromCart(productId);
        });
      });
    }

    // Add item to cart
    function addToCart(productId) {
      const cart = getCartFromStorage();
      if (!cart.includes(productId)) {
        cart.push(productId);
        saveCartToStorage(cart);
        renderCart();
      }
    }

    // Remove item from cart
    function removeFromCart(productId) {
      let cart = getCartFromStorage();
      cart = cart.filter(id => id !== productId);
      saveCartToStorage(cart);
      renderCart();
    }

    // Clear cart
    function clearCart() {
      saveCartToStorage([]);
      renderCart();
    }

    // Initial render
    renderProducts();
    renderCart();

    // Attach event listener to "Clear Cart" button
    clearCartBtn.addEventListener('click', clearCart);