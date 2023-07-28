let itemsInCart = 0
let totalPrice = 0
const cart = []
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

    console.log("Total Price: $" + totalPrice)
}

document.getElementById("search-bar-button").addEventListener("click", search)
document.getElementById("search-input").addEventListener("keyup", (event) => {
    if (event.key === 'Enter') { 
        search();
    }
})

function search() {
    const searchInput = document.getElementById("search-input").value.toLowerCase()
    
    console.log("Results for: " + searchInput)
    
    const results = products.filter((products) => products.name.toLowerCase().includes(searchInput))
    
    switch(results.length) {
        case 0:
            console.log("No items found");
            break;
        case 1:
            console.log("There was " + results.length + " item found:");
            results.forEach(result => {
                console.log("\t" + result.name)
            });
            break;
        default:
            console.log("There were " + results.length + " items found:");
            results.forEach(result => {
                console.log("\t" + result.name)
            });
    }
}

class Product {
    constructor(id, name, price, productUrl, category) {
        this.id = id
        this.name = name
        this.productUrl = productUrl
        this.category = category
        this.price = parseFloat(price)
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
        productUrl: 'https://images.footballfanatics.com/mercedes-amg-petronas-f1-team/mercedes-amg-petronas-f1-2023-team-softshell-jacket_ss4_p-13368587+u-3eni2ld9fe08ym6ev1gj+v-d6cf1effdc564d528cf065aad06862d4.jpg?_hv=2&w=340"',
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
    }
]

console.log(products)