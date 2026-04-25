let cart = JSON.parse(localStorage.getItem("cart")) || [];
let products = JSON.parse(localStorage.getItem("products")) || [];

/* ---------------- CART SYSTEM ---------------- */

function addToCart(name, price) {
    cart.push({ name, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(name + " added to cart!");
}

function loadCart() {
    let cartBox = document.getElementById("cart-items");
    let totalBox = document.getElementById("total");

    if (!cartBox) return;

    cartBox.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;

        cartBox.innerHTML += `
            <div class="cart-item">
                <h3>${item.name}</h3>
                <p>MWK ${item.price}</p>
                <button onclick="removeItem(${index})">Remove</button>
            </div>
        `;
    });

    totalBox.innerText = "Total: MWK " + total;
}

function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

/* ---------------- ADMIN PANEL ---------------- */

function addProduct() {
    let name = document.getElementById("name").value;
    let price = document.getElementById("price").value;

    let image = prompt("Enter image URL:");

    if (!name || !price) {
        alert("Fill all fields");
        return;
    }

    products.push({ name, price, image });
    localStorage.setItem("products", JSON.stringify(products));

    loadProducts();
}

function loadProducts() {
    let list = document.getElementById("product-list");

    if (!list) return;

    list.innerHTML = "";

    products.forEach((p, index) => {
        list.innerHTML += `
            <div class="cart-item">
                <h3>${p.name}</h3>
                <p>MWK ${p.price}</p>
                <button onclick="deleteProduct(${index})">Delete</button>
            </div>
        `;
    });
}

function deleteProduct(index) {
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));
    loadProducts();
}

function loadHomeProducts() {
    let box = document.getElementById("product-box");
    if (!box) return;

    let products = JSON.parse(localStorage.getItem("products")) || [];

    box.innerHTML = "";

    products.forEach((p) => {
        box.innerHTML += `
            <div class="product">
                <img src="${p.image}" width="100%" height="180">
                <h3>${p.name}</h3>
                <p>MWK ${p.price}</p>
                <button onclick="addToCart('${p.name}', ${p.price})">
                    Add to Cart
                </button>
            </div>
        `;
    });
}

loadHomeProducts();

function placeOrder() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        alert("Cart is empty!");
        return;
    }

    let message = "Hello AKC ONLINE SHOP, I want to order:%0A";

    let total = 0;

    cart.forEach(item => {
        message += `- ${item.name} MWK ${item.price}%0A`;
        total += item.price;
    });

    message += `%0ATotal: MWK ${total}`;

    let phone = "265XXXXXXXXX"; // CHANGE THIS

    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
}

function login() {
    let user = document.getElementById("user").value;
    let pass = document.getElementById("pass").value;
    let msg = document.getElementById("msg");

    if (user === "admin" && pass === "1234") {
        msg.innerHTML = "Login successful!";
        msg.style.color = "green";
        localStorage.setItem("loggedIn", "true");
        setTimeout(() => {
            window.location.href = "admin.html";
        }, 1000);
    } else {
        msg.innerHTML = "Wrong username or password";
        msg.style.color = "red";
    }
}

function sendMessage(event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;

    alert("Thank you " + name + "! Your message has been sent.");

    console.log({
        name,
        email,
        message
    });
}