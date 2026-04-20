
let cartItems = JSON.parse(localStorage.getItem('cart') || '[]')
//function to add items to the cart
function addToCart({name, price}) 
{ 
    cartItems.push({name, price});
    console.log(cartItems);
    saveCart();
    
}
//function to remove items from the cart
function removeFromCart(name) {
    // Find the index of the item to remove
    let index = cartItems.findIndex(item => item.name === name);
    if (index !== -1) {
        cartItems.splice(index, 1);
    }
   saveCart(); 
}

//function to save the cart items to local storage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    window.dispatchEvent(new CustomEvent('cartUpdated'));
}


//function to get the items in the cart
function getCartItems()
{
    return cartItems;
}

//clear the cart when the user clicks the clear cart button 
function clearCart() {
    cartItems = [];
    saveCart();
}

// calculate total price of all items in cart
function calculateTotal() {
    return cartItems.reduce((sum, item) => sum + Number(item.price || 0), 0);
}

// calculate number of items in cart
function getCartCount() {
    return cartItems.length;
}

// format price as currency string
function formatPrice(price) {
    return '$' + Number(price || 0).toFixed(2);
}

// This function shows the cart items on the page
function renderCart() {
    // Get the list of things in the cart
    const items = getCartItems();

    // Find the box where we show the cart items
    const container = document.getElementById('cart-items');

    // Find the box where we show the total price
    const totalEl = document.getElementById('cart-total');

    // If there's no box for items, stop
    if (!container) return;

    // Clear the box (remove old items)
    container.innerHTML = '';

    // If cart is empty, show a message
    if (items.length === 0) {
        container.innerHTML = '<p>Your cart is empty.</p>';
        if (totalEl) totalEl.innerHTML = '<strong>Total: $0.00</strong>';
        return;
    }

    // For each thing in the cart, make a box to show it
    items.forEach(item => {
        // Make the HTML for one item
        const html = '<div class="cart-item">' +
            '<div class="cart-item-info">' +
            '<span class="item-name">' + item.name + '</span>' +
            '<span class="item-price">' + formatPrice(item.price) + '</span>' +
            '</div>' +
            '<button type="button" onclick="removeFromCart(\'' + item.name + '\'); renderCart();" class="remove-from-cart">Remove</button>' +
            '</div>';

        // Add it to the container
        container.innerHTML += html;
    });

    // Show the total price
    if (totalEl) totalEl.innerHTML = '<strong>Total: ' + formatPrice(calculateTotal()) + '</strong>';
}

function generateOrderNumber() {
            // Generate random 4-digit number
            const randomNum = Math.floor(Math.random() * 10000);
            return 'SILC-' + String(randomNum).padStart(4, '0');
        }

// process checkout - create order and clear cart
function processCheckout() {
    const items = getCartItems();
    const total = calculateTotal();
    
    if (items.length === 0) {
        alert('Cart is empty. Cannot proceed with checkout.');
        return null;
    }
    
    const orderNumber = generateOrderNumber();
    const order = {
        orderNumber: orderNumber,
        items: items,
        total: total,
        date: new Date().toDateString
    };
    
    // Store order in localStorage
    localStorage.setItem('lastOrder', JSON.stringify(order));
    
    return order;
}

window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.getCartItems = getCartItems;
window.clearCart = clearCart;
window.calculateTotal = calculateTotal;
window.getCartCount = getCartCount;
window.formatPrice = formatPrice;
window.renderCart = renderCart;
window.generateOrderNumber = generateOrderNumber;
window.processCheckout = processCheckout;