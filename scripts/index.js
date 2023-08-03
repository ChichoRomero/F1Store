let itemsInCart = 0
let totalPrice = 0
const cart = JSON.parse(localStorage.getItem('cart')) || []
let i = 0

class Product {
    constructor(name, price, productUrl, category) {
        // this.id = id
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
    console.log("Item added to cart")
    itemsInCart++
    totalPrice = totalPrice + price
    saveCart(price, name, productUrl, category)
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

    console.log("Total Price: $" + totalPrice)
}

document.getElementById("search-bar").innerHTML = `<input type="text" id="search-input" class="form-control" placeholder="Search..." aria-label="Search..." aria-describedby="button-addon2">
<div class="input-group-append">
    <button id="search-bar-button" class="btn btn-outline-secondary" type="button">Search</button>
</div>`

function search() {
    const searchInput = document.getElementById("search-input").value
    
    console.log("Results for: " + searchInput)
    
    const results = products.filter((products) => products.name.toLowerCase().includes(searchInput.toLowerCase()))
    
    switch(results.length) {
        case 0:
            console.log("No items found");
            break;
        case 1:
            console.log("There was " + results.length + " item found:")
            results.forEach(result => {
                console.log("\t" + result.name)
            });
            break;
        default:
            console.log("There were " + results.length + " items found:")
            results.forEach(result => {
                console.log("\t" + result.name)
            });
    }
}

const products = [
    {
        price: 80,
        name: 'Mercedes AMG Petronas F1 2023 Team Stealth Hoodie',
        productUrl: 'https://images.footballfanatics.com/mercedes-amg-petronas-f1-team/mercedes-amg-petronas-f1-2023-team-stealth-hoodie_ss5_p-13376397+u-3tajvzqsjn4tdb1c2mwv+v-laviv0myn6kymyw1dyjl.jpg?_hv=2&w=340',
        category: 'apparel'
    }, 
    {
        price: 50,
        name: 'Oracle Red Bull Racing 2023 Team Polo',
        productUrl: 'https://images.footballfanatics.com/red-bull-racing/oracle-red-bull-racing-2023-team-polo_ss4_p-13334182+u-b0ltd2b4a8klkiofqnxj+v-f5c87e271a10452a97dbd9e1a8031219.jpg?_hv=2&w=340"',
        category: 'apparel'
    },
    {
        price: 55,
        name: 'Scuderia Ferrari 2023 Team Charles Leclerc T-Shirt',
        productUrl: 'https://images.footballfanatics.com/scuderia-ferrari/scuderia-ferrari-2023-team-charles-leclerc-t-shirt_ss4_p-13368477+u-1a0txatu76m1w7bkbbaj+v-b38414ba03b0479ebc7e8f9e4116ab11.jpg?_hv=2&w=340"',
        category: 'apparel'
    },
    {
        price: 5,
        name: 'Pirelli Medium Tyre Keyring - Yellow',
        productUrl: 'https://images.footballfanatics.com/pirelli/pirelli-medium-tyre-keyring-yellow_ss4_p-13329453+u-qh6lhfin10px0efjxdma+v-d5481fc37f6f47b5b35c5b60c9913b3b.jpg?_hv=2&w=340',
        category: 'accessories'
    }, 
    {
        price: 75, 
        name: 'Mercedes AMG Petronas F1 2023 Team Softshell Jacket',
        productUrl: 'https://images.footballfanatics.com/mercedes-amg-petronas-f1-team/mercedes-amg-petronas-f1-2023-team-softshell-jacket_ss4_p-13368587+u-3eni2ld9fe08ym6ev1gj+v-d6cf1effdc564d528cf065aad06862d4.jpg?_hv=2&w=340"',
        category: 'apparel'
    },
    {
        price: 30, 
        name: 'Oracle Red Bull Racing Backpack',
        productUrl: 'https://images.footballfanatics.com/red-bull-racing/oracle-red-bull-racing-backpack_ss4_p-13368668+u-hhkstd6oq1vwquldzdkl+v-5d576e7579b74c31abbb536f6ed9a65f.jpg?_hv=2&w=340"',
        category: 'accessories'
    },
    {
        price: 40, 
        name: 'Aston Martin Cognizant F1 Official Team Telescopic Umbrella',
        productUrl: 'https://images.footballfanatics.com/aston-martin/aston-martin-cognizant-f1-official-team-telescopic-umbrella_ss4_p-13369043+u-25pfgwbt3woptemk2zhq+v-8634833c1c25460f91f8336d5b9caa2f.jpg?_hv=2&w=340',
        category: 'accessories'
    },
    {
        price: 38, 
        name: 'Scuderia Ferrari Compact Umbrella - Red',
        productUrl: 'https://images.footballfanatics.com/scuderia-ferrari/scuderia-ferrari-compact-umbrella-red_ss4_p-12046114+u-a85sj1hghut3yc6qf0mq+v-3a4402dae3894381a86588f6159b76e4.jpg?_hv=2&w=340',
        category: 'accessories'
    },
    {
        price: 5, 
        name: 'Pirelli Intermediate Tyre Keyring - Green',
        productUrl: 'https://images.footballfanatics.com/pirelli/pirelli-intermediate-tyre-keyring-green_ss4_p-13329452+u-mw8iwdb5vfh1k58phzv7+v-9f90c1e58e454d6aa33aac6c7f6b3874.jpg?_hv=2&w=340',
        category: 'accessories'
    },
    {
        price: 22, 
        name: 'McLaren Flag',
        productUrl: 'https://images.footballfanatics.com/mclaren-f1-team/mclaren-flag_ss4_p-13306577+u-tfnaopzqm004jbyut356+v-f48384fec2634d04b62925a11f00b841.jpg?_hv=2&w=340',
        category: 'accessories'
    },
    {
        price: 18, 
        name: 'BWT Alpine F1 Team A522 No.31 Esteban Ocon 1:64 Model',
        productUrl: 'https://images.footballfanatics.com/alpine/bwt-alpine-f1-team-a522-no31-esteban-ocon-1:64-model_ss4_p-13364191+u-153fha26059aqe4d0z3s+v-0b69eb2b937f4025a089cc0a8bf036d2.jpg?_hv=2&w=340',
        category: 'accessories'
    },
    {
        price: 28, 
        name: 'Alfa Romeo Sauber F1 F1 Team ORLEN 2022 C42 No.77 - Valtteri Bottas 1:43 Model with Figure',
        productUrl: 'https://images.footballfanatics.com/alfa-romeo-racing/alfa-romeo-sauber-f1-f1-team-orlen-2022-c42-no77-valtteri-bottas-1:43-model-with-figure_ss4_p-13365698+u-198qqicuo4adyynadb9g+v-af392f46a55f4762ad44a998dc14847d.jpg?_hv=2&w=340',
        category: 'accessories'
    },
    {
        price: 50, 
        name: 'Ayrton Senna Lotus 97T - Horizontal Tribute - Estoril 1985 Limited Edition Poster',
        productUrl: 'https://images.footballfanatics.com/ayrton-senna/ayrton-senna-lotus-97t-horizontal-tribute-estoril-1985-limited-edition-poster_ss4_p-13385623+u-ez0vl650r3kb8j1lg2wu+v-5e8e8acff3794490a2c5acfe69fefa91.jpg?_hv=2&w=340',
        category: 'accessories'
    },
    {
        price: 31, 
        name: 'Scuderia AlphaTauri 2023 Team Cap - White',
        productUrl: 'https://images.footballfanatics.com/alphatauri/scuderia-alphatauri-2023-team-cap-white_ss4_p-13349780+u-d9zytq9qfh7xhd0xdp3l+v-1677ba9e6ddc402198180e42768246ab.jpg?_hv=2&w=340',
        category: 'apparel'
    },
    {
        price: 40, 
        name: 'Williams Racing 2023 Team Training Jersey - Kids',
        productUrl: 'https://images.footballfanatics.com/williams-racing/williams-racing-2023-team-training-jersey-kids_ss4_p-13347537+u-9zc1pyghlnlmn9dvz0ya+v-646e64e5f4d14e72978d1f353a948c65.jpg?_hv=2&w=340',
        category: 'apparel'
    },
    {
        price: 33, 
        name: 'Pirelli Podium Cap',
        productUrl: 'https://images.footballfanatics.com/pirelli/pirelli-podium-cap_ss4_p-13329456+u-tn0tl87z0ahyao45mdty+v-1f7f9339cb5740a8925bf111dbf746db.jpg?_hv=2&w=340',
        category: 'apparel'
    },
    {
        price: 50, 
        name: 'Williams Racing 2023 Team Training Jersey - Womens',
        productUrl: 'https://images.footballfanatics.com/williams-racing/williams-racing-2023-team-training-jersey-womens_ss4_p-13347535+u-jcq8iqeb1nsg7pkj4lqb+v-a0ee9463c45d48ee9fc8b8b6c7d01d8a.jpg?_hv=2&w=340',
        category: 'apparel'
    }
]

document.getElementById("view-cart").addEventListener("click", viewCart)

document.addEventListener("DOMContentLoaded", () => {
        document.getElementById("search-bar-button").addEventListener("click", search)
        document.getElementById("search-input").addEventListener("keyup", (event) => {
            if (event.key === "Enter") {
                search()
            }
        })

        path = window.location.pathname

        switch(true) {
            case path.endsWith("/apparel.html"):
                displayApparel("items-apparel-list", products)
                break;
            case path.endsWith("/accessories.html"):
                displayAccessories("items-accessories-list", products)
                break;
            case path.endsWith("/cart.html"):
                displayCart("items-cart", cart)
                break;
            case path.endsWith("/index.html"):
            default:
                displayAll("items-home-list", products)
                break;
        }

        const hamburgerMenu = document.querySelector('.hamburger-menu');
        const menu = document.querySelector('.menu');
        hamburgerMenu.addEventListener('click', () => {
        menu.classList.toggle('show');
        });

        AOS.init({duration: 1200})
    }
)

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
    
            // const btnRemoveFromCart = item.querySelector(".remove-from-cart")
    
            // btnRemoveFromCart.addEventListener("click", () => {
            //     localStorage.removeItem("index")
            // })
        }
    }
}

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
        })
    }
}

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
            })
        }
    }
}

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
            })
        }
    }
}