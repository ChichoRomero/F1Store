// Array de productos traídos desde products.json
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

const cart = JSON.parse(localStorage.getItem('cart')) || []
let i = 0

class Product {
    constructor(name, price, productUrl, category, quantity) {
        this.name = name
        this.productUrl = productUrl
        this.category = category
        this.price = parseFloat(price)
        this.quantity = quantity
    }
}

// Guarda los productos en el carrito
function saveCart(price, name, productUrl, category, quantity) {
    cart.push(new Product(name, price, productUrl, category, quantity))
    localStorage.setItem('cart', JSON.stringify(cart))
}

// Verifica si existe el producto en el carrito y actualiza o redirige a la función de guardado
function addToCart(price, name, productUrl, category, quantity) {
    const productExists = cart.find(item => item.name === name)
    if(productExists) {
        productExists.quantity++
        localStorage.setItem('cart', JSON.stringify(cart))
    } else {
        saveCart(price, name, productUrl, category, quantity)
    }
}

// Mostrar el botón del carrito
// Mismo escenario que con los Listeners, al tener problemas de redireccionamiento con Github Pages, me fue más simple utilizar esta manera para manejar correctamente el redireccionamiento y mostrar el botón/imagen del carrito
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

// Listeners, agrega un timeout antes de cargar la vista para poder guardar los productos desde el JSON
// Uso el switch porque Github Pages me dio varios problemas con el redireccionamiento, fue la manera más simple que se me ocurrió para poder manejar ese tipo de escenarios
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
    cartCounterElement.textContent = cart.reduce((total, product) => total + product.quantity, 0)
}

// Muestra los resultados de una búsqueda
function displayResults(targetView, results) {
    const resultsView = document.getElementById(targetView)

    const resultsArray = JSON.parse(localStorage.getItem('results')) || []

    let input = JSON.parse(localStorage.getItem('search'))

    switch(resultsArray.length) {
        case 0:
            let noResults = document.createElement("div")

            resultsView.innerHTML = `<div class="content-not-found">
            <p><strong>No items found for ${input}</strong></p>
            <div data-aos="fade-left" class="aos-init aos-animate">
            <img src="../img/Max-Not-Found.png" alt="Max-Not-Found">
            </div>
            </div>`
            resultsView.appendChild(noResults)
            break;
        default:

            for(const item of resultsArray) {
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
                    clickAddToCart(product)
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
            <div class="quantity-line">
            <button class="remove-one">-</button>
            <div> Quantity: ${product.quantity}</div>
            <button class="add-one">+</button>
            </div>
            </div>
            <button class="remove-from-cart">Remove from cart</button>`
            cartView.appendChild(item)

            const index = cart.indexOf(product)

            const btnRemoveOne = item.querySelector(".remove-one")
            const btnAddOne = item.querySelector(".add-one")
            const btnRemoveFromCart = item.querySelector(".remove-from-cart")
            
            btnRemoveOne.addEventListener("click", () => {removeOneItem(cartView, product.name)})
            btnAddOne.addEventListener("click", () => {addOneItem(cartView, product.name)} )
            btnRemoveFromCart.addEventListener("click", () => {removeItem(cartView, product.name)})
        }
        const price = calculateTotalPrice(cart)
        const priceElement = document.createElement("div")
        priceElement.className = "totalPrice"
        priceElement.textContent = `Price: $${price}`
        cartView.appendChild(priceElement)
    }
}

// Función para calcular el precio total del carrito
function calculateTotalPrice(cart) {
    return cart.reduce((total, product) => total + (product.price * product.quantity), 0)
}

// Función para agregar 1 item al carrito desde un objeto existente en el carrito
function addOneItem(cartView, productName) {
    const productIndex = cart.findIndex(item => item.name === productName)
    const product = cart[productIndex]
    product.quantity++
    localStorage.setItem('cart', JSON.stringify(cart))
    cartView.innerHTML = ``
    displayCart("items-cart", cart)
    updateCartCounter()
    Toastify ({
        text: "One item added to cart",
        duration: 1500,
        gravity: 'top',
        position: 'center',
        style: {
            background: '#000000'
        }
    }).showToast()
}

// Función para eliminar el total de existencias de un producto del carrito
function removeItem(cartView, productName) {
    const productIndex = cart.findIndex(item => item.name === productName)
    cart.splice(productIndex, 1)
    localStorage.setItem('cart', JSON.stringify(cart))
    cartView.innerHTML = ``
    displayCart("items-cart", cart)
    updateCartCounter()
    Toastify ({
        text: "Item removed from cart",
            duration: 1500,
            gravity: 'top',
            position: 'center',
            style: {
                background: '#f5f5f5',
                color: `#000000`
            }
        }).showToast()
}

// Función para reducir la cantidad de un item existente en el carrito
function removeOneItem(cartView, productName) {
    const productIndex = cart.findIndex(item => item.name === productName)
    const product = cart[productIndex]
    if(product.quantity > 1) {
        product.quantity--
        localStorage.setItem('cart', JSON.stringify(cart))
        cartView.innerHTML = ``
        displayCart("items-cart", cart)
        updateCartCounter()
        Toastify ({
            text: "One item removed",
            duration: 1500,
            gravity: 'top',
            position: 'center',
            style: {
                background: '#f5f5f5',
                color: `#000000`
            }
        }).showToast()
    } else {
        removeItem(cartView, productName)
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
            clickAddToCart(product)
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
                clickAddToCart(product)
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
                clickAddToCart(product)
            })
        }
    }
}

// Función para agregar items al carrito desde las landings (se utiliza otra función para aquellos items que se agregan desde el carrito ya que el mensaje de éxito es otro)
function clickAddToCart(product) {
    addToCart(product.price, product.name, product.productUrl, product.category, 1)
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
}
