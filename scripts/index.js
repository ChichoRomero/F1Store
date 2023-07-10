let itemsInCart = 0
let totalPrice = 0
const cart = [] //Me adelanté un poco con arrays para poder implementar el FOR para ver el carrito
let i = 0

function addToCart(price, name) {
    console.log("Item added to cart")
    itemsInCart++
    totalPrice = totalPrice + price
    cart[i] = {name, price}
    console.log(cart[i])
    i++
}

function viewCart() {

    if(cart.length === 0) {
        console.log("Cart is empty!")
    } else {
        console.log("There are " + itemsInCart + " items in the cart")
    
        for(let j=0; j< cart.length; j++) {
            console.log("Item in cart: " + cart[j].name + ", Price: $" + cart[j].price)
        }
    }

    if(itemsInCart > 5) {
        let discount = totalPrice * 0.05
        console.log("5% DISCOUNT APPLIED! -$" + discount)
        totalPrice = totalPrice * 0.95
    }

    console.log("Total Price: " + totalPrice)
}