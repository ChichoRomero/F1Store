// Array de productos
const products = []

function getProducts(path) {
    fetch(path)
    .then((response) => response.json())
    .then((response) => {
        for(item of response) {
            products.push(item)
        }
    })
    .catch((error) => redirectError())
}

function redirectError() {
    window.location.href = "../404.html"
}


let itemsInCart = 0
let totalPrice = 0
const cart = JSON.parse(localStorage.getItem('cart')) || []
const cartCounter = cart ? cart.length : 0
let i = 0

class Product {
    constructor(name, price, productUrl, category) {
        this.name = name
        this.productUrl = productUrl
        this.category = category
        this.price = parseFloat(price)
    }
}

function saveCart(price, name, productUrl, category) {
    cart.push(new Product(name, price, productUrl, category))
    localStorage.setItem('cart', JSON.stringify(cart))
}


function addToCart(price, name, productUrl, category) {
    itemsInCart++
    totalPrice = totalPrice + price
    saveCart(price, name, productUrl, category)
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

    console.log("Total Price: $" + totalPrice)
}

// Mostrar el botón del carrito
const root = window.location.pathname
switch(true) {
    case root.endsWith("/index.html"):
    case root.endsWith("/"):
        document.getElementById("view-cart").innerHTML = `<img src="./img/shopping-cart.png" alt="Cart"><span id="cart-counter" class="cart-counter"></span>`
        getProducts('./products.json')
        break;
    default:
        document.getElementById("view-cart").innerHTML = `<img src="../img/shopping-cart.png" alt="Cart"><span id="cart-counter" class="cart-counter"></span>`
        getProducts('../products.json')
        break;
}

// Muestra la search bar en todas las páginas
document.getElementById("search-bar").innerHTML = `<input type="text" id="search-input" class="form-control" placeholder="Search..." aria-label="Search..." aria-describedby="button-addon2">
<div class="input-group-append">
    <button id="search-bar-button" class="btn btn-outline-secondary" type="button">Search</button>
</div>`

// Función de búsqueda
function search() {
    const searchInput = document.getElementById("search-input").value

    localStorage.setItem('search', JSON.stringify(searchInput))
    
    console.log("Results for: " + searchInput)
    
    const results = products.filter((products) => products.name.toLowerCase().includes(searchInput.toLowerCase()))

    localStorage.setItem('results', JSON.stringify(results))

    const currentPath = window.location.pathname;
    switch(true) {
        case currentPath.endsWith("/index.html"):
        case currentPath.endsWith("/"):
            window.location.href = "./views/results.html"
            break;
        default:
            window.location.href = "../views/results.html"
            break;
    }
}

// Listeners
document.addEventListener("DOMContentLoaded", () => {

        path = window.location.pathname
        setTimeout(() => {
            switch(true) {
                case path.endsWith("/apparel.html"):
                    displayApparel("items-apparel-list", products)
                    updateCartCounter()
                    break;
                case path.endsWith("/accessories.html"):
                    displayAccessories("items-accessories-list", products)
                    updateCartCounter()
                    break;
                case path.endsWith("/cart.html"):
                    displayCart("items-cart", cart)
                    updateCartCounter()
                    break;
                case path.endsWith("/results.html"):
                    displayResults("items-search", results)
                    updateCartCounter()
                    break;
                case path.endsWith("/index.html"):
                default:
                    displayAll("items-home-list", products)
                    updateCartCounter()
                    break;
            }
        }, 1000)
        

        document.getElementById("search-bar-button").addEventListener("click", search)
        document.getElementById("search-input").addEventListener("keyup", (event) => {
            if (event.key === "Enter") {
                search()
            }
        })

        const hamburgerMenu = document.querySelector('.hamburger-menu');
        const menu = document.querySelector('.menu');
        hamburgerMenu.addEventListener('click', () => {
        menu.classList.toggle('show');
        });

        AOS.init({duration: 1200})
    }
)

// Contador de items en el carrito
function updateCartCounter() {
    const cartCounterElement = document.getElementById('cart-counter')
    cartCounterElement.textContent = cart.length
}

// Muestra los resultados de una búsqueda
function displayResults(targetView, results) {
    console.log(targetView)
    const resultsView = document.getElementById(targetView)

    const resultsArray = JSON.parse(localStorage.getItem('results')) || []

    let input = JSON.parse(localStorage.getItem('search'))

    switch(resultsArray.length) {
        case 0:
            console.log("No items found")
            let noResults = document.createElement("div")

            resultsView.innerHTML = `<div class="content-not-found">
            <p><strong>No items found for ${input}</strong></p>
            <div data-aos="fade-left" class="aos-init aos-animate">
            <img src="../img/Max-Not-Found.png" alt="Max-Not-Found">
            </div>
            </div>`
            resultsView.appendChild(noResults)
            break;
        case 1:
            console.log("There was " + resultsArray.length + " item found:")
            
            for(const item of resultsArray) {
                console.log("\t" + item.name)
                let element = document.createElement("ol")
    
                element.innerHTML = `<div data-aos="zoom-in-up" class="aos-init aos-animate">
                <img src="${item.productUrl}" alt="${item.name}">
                <div> ${item.name} </div>
                <strong>$${item.price}</strong>
                </div>
                <button class="add-to-cart">Add to cart</button>`
                resultsView.appendChild(element)

                btnAddToCart = element.querySelector(".add-to-cart")

                btnAddToCart.addEventListener("click", () => {
                    addToCart(item.price, item.name, item.productUrl, item.category)
                    Toastify ({
                        text: "Item added to cart",
                        duration: 1500,
                        gravity: 'top',
                        position: 'center',
                        style: {
                            background: '#000000'
                        }
                    }).showToast()
                })
            }
            break;
        default:
            console.log("There were " + resultsArray.length + " items found:")

            for(const item of resultsArray) {
                console.log("\t" + item.name)
                let element = document.createElement("ol")
    
                element.innerHTML = `<div data-aos="zoom-in-up" class="aos-init aos-animate">
                <img src="${item.productUrl}" alt="${item.name}">
                <div> ${item.name} </div>
                <strong>$${item.price}</strong>
                </div>
                <button class="add-to-cart">Add to cart</button>`
                resultsView.appendChild(element)

                btnAddToCart = element.querySelector(".add-to-cart")

                btnAddToCart.addEventListener("click", () => {
                    addToCart(item.price, item.name, item.productUrl, item.category)
                    Toastify ({
                        text: "Item added to cart",
                        duration: 1500,
                        gravity: 'top',
                        position: 'center',
                        style: {
                            background: '#000000'
                        }
                    }).showToast()
                })
            };
    }
}

// Muestra los items agregados al carrito
function displayCart(targetView, cart) {
    const cartView = document.getElementById(targetView)

    if(cart.length === 0) {
        let emptyCart = document.createElement("div")

        emptyCart.innerHTML = `<div class="content-not-found">
        <p><strong>Cart is empty</strong></p>
        <div data-aos="fade-left" class="aos-init aos-animate">
        <img src="../img/Max-Not-Found.png" alt="Max-Not-Found">
        </div>
        </div>`
        cartView.appendChild(emptyCart)
    } else {
        for (const product of cart) {
            let item = document.createElement("ol")
    
            item.innerHTML = `<div data-aos="zoom-in-up" class="aos-init aos-animate">
            <img src="${product.productUrl}" alt="${product.name}">
            <div> ${product.name} </div>
            <strong>$${product.price}</strong>
            </div>
            <button class="remove-from-cart">Remove from cart</button>`
            cartView.appendChild(item)

            const index = cart.indexOf(product)

            const btnRemoveFromCart = item.querySelector(".remove-from-cart")
    
            btnRemoveFromCart.addEventListener("click", () => {
                cart.splice(index, 1)
                localStorage.setItem('cart', JSON.stringify(cart))
                cartView.innerHTML = ``
                displayCart(targetView, cart)
                updateCartCounter()
                Toastify ({
                    text: "Item removed",
                    duration: 1500,
                    gravity: 'top',
                    position: 'center',
                    style: {
                        background: '#f5f5f5',
                        color: `#000000`
                    }
                }).showToast()
                itemsInCart--
            })
        }
    }
}

// Muestra los productos en la Home page
function displayAll(targetView, products) {
    const homeView = document.getElementById(targetView)

    for (const product of products) {
        let item = document.createElement("ol")
    
        item.innerHTML = `<div data-aos="zoom-in-up" class="aos-init aos-animate">
        <img src="${product.productUrl}" alt="${product.name}">
        <div> ${product.name} </div>
        <strong>$${product.price}</strong>
        </div>
        <button class="add-to-cart">Add to cart</button>`
        homeView.appendChild(item)

        const btnAddToCart = item.querySelector(".add-to-cart")

        btnAddToCart.addEventListener("click", () => {
            addToCart(product.price, product.name, product.productUrl, product.category)
            updateCartCounter()
            Toastify ({
                text: "Item added to cart",
                duration: 1500,
                gravity: 'top',
                position: 'center',
                style: {
                    background: '#000000'
                }
            }).showToast()
        })
    }
}

// Muestra la vestimenta
function displayApparel(targetView, products) {

    const apparelView = document.getElementById(targetView)
    
    for (const product of products) {

        if (product.category === 'apparel') {
            let item = document.createElement("ol")
    
            item.innerHTML = `<div data-aos="zoom-in-up" class="aos-init aos-animate">
            <img src="${product.productUrl}" alt="${product.name}">
            <div> ${product.name} </div>
            <strong>$${product.price}</strong>
            </div>
            <button class="add-to-cart">Add to cart</button>`
            apparelView.appendChild(item)

            const btnAddToCart = item.querySelector(".add-to-cart")

            btnAddToCart.addEventListener("click", () => {
                addToCart(product.price, product.name, product.productUrl, product.category)
                updateCartCounter()
                Toastify ({
                    text: "Item added to cart",
                    duration: 1500,
                    gravity: 'top',
                    position: 'center',
                    style: {
                        background: '#000000'
                    }
                }).showToast()
            })
        }
    }
}

// Muestra los accessorios
function displayAccessories(targetView, products) {

    const accessoriesView = document.getElementById(targetView)
    
    for (const product of products) {

        if (product.category === 'accessories') {
            let item = document.createElement("ol")
    
            item.innerHTML = `<div data-aos="zoom-in-up" class="aos-init aos-animate">
            <img src="${product.productUrl}" alt="${product.name}">
            <div> ${product.name} </div>
            <strong>$${product.price}</strong>
            </div>
            <button class="add-to-cart">Add to cart</button>`
            accessoriesView.appendChild(item)

            const btnAddToCart = item.querySelector(".add-to-cart")

            btnAddToCart.addEventListener("click", () => {
                addToCart(product.price, product.name, product.productUrl, product.category)
                updateCartCounter()
                Toastify ({
                    text: "Item added to cart",
                    duration: 1500,
                    gravity: 'top',
                    position: 'center',
                    style: {
                        background: '#000000'
                    }
                }).showToast()
            })
        }
    }
}