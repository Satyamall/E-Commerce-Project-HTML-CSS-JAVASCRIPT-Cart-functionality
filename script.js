// Sample product data as an array of objects with categories
const products = [
    {
        id: 1,
        name: "Laptop",
        price: 1000,
        image: "laptop.jpg",
        description: "Powerful laptop for all your computing needs.",
        category: "electronics",
    },
    {
        id: 2,
        name: "T-shirt",
        price: 20,
        image: "tshirt.jpg",
        description: "Comfortable cotton t-shirt for everyday wear.",
        category: "clothing",
    },
    {
        id: 3,
        name: "Smartphone",
        price: 800,
        image: "smartphone.jpg",
        description: "The latest smartphone with advanced features.",
        category: "electronics",
    },
    {
        id: 4,
        name: "Jeans",
        price: 50,
        image: "jeans.jpg",
        description: "Classic denim jeans for a stylish look.",
        category: "clothing",
    },
    // Add more products with different categories as needed
];

const cart = [];

let addToCartButtons = document.querySelectorAll('.add-to-cart');
let cartCount = document.getElementById('cart-count');
let categoryButtons = document.querySelectorAll('.category-button');
let cartList = document.getElementById('cart-list');
let cartTotal = document.getElementById('cart-total');

function addToCart(productId) {
    const product = products.find((item) => item.id === productId);
    if (product) {
        cart.push(product);
        updateCartCount();
        updateCartDisplay();
    }
}

function updateCartCount() {
    cartCount.innerText = cart.length;
}

function updateCartDisplay() {
    cartList.innerHTML = '';
    let total = 0;
    cart.forEach((product) => {
        total += product.price;
        const listItem = document.createElement('li');
        listItem.textContent = product.name;
        cartList.appendChild(listItem);
    });
    cartTotal.textContent = total;
}

function filterProducts(category) {
    const filteredProducts = category === "all" ? products : products.filter(product => product.category === category);
    displayProducts(filteredProducts);
}

function displayProducts(productsToDisplay) {
    const productContainer = document.getElementById('product-container');
    productContainer.innerHTML = '';

    productsToDisplay.forEach((product) => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>$${product.price}</p>
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        `;
        productContainer.appendChild(productElement);
    });

    // Reattach click event listeners to the "Add to Cart" buttons
    addToCartButtons = document.querySelectorAll('.add-to-cart'); // Updated this line to re-select all buttons
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = parseInt(event.target.getAttribute('data-id'));
            addToCart(productId);
        });
    });
}

categoryButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const category = event.target.getAttribute('data-category');
        filterProducts(category);
    });
});

filterProducts("all");
