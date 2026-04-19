//let cartItems = []; //defining the empty array to store the items in the cart
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

window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.getCartItems = getCartItems;
window.clearCart = clearCart;