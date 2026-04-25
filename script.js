import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { 
    getAuth, 
    signInWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import { 
    getFirestore, 
    collection, 
    getDocs, 
    addDoc 
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

/* ---------------- FIREBASE CONFIG ---------------- */

const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_BUCKET",
  messagingSenderId: "YOUR_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

/* ---------------- CART SYSTEM ---------------- */

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price) {
    cart.push({ name, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(name + " added to cart!");
}

function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

/* ---------------- ADMIN - ADD PRODUCT (FIREBASE) ---------------- */

async function addProduct() {
    let name = document.getElementById("name").value;
    let price = document.getElementById("price").value;
    let image = prompt("Image URL:");

    if (!name || !price) {
        alert("Fill all fields");
        return;
    }

    await addDoc(collection(db, "products"), {
        name: name,
        price: Number(price),
        image: image
    });

    alert("Product added successfully!");

    loadProducts();
    loadHomeProducts();
}

/* ---------------- LOAD PRODUCTS (ADMIN) ---------------- */

async function loadProducts() {
    let list = document.getElementById("product-list");
    if (!list) return;

    const querySnapshot = await getDocs(collection(db, "products"));

    list.innerHTML = "";

    querySnapshot.forEach((doc) => {
        let p = doc.data();

        list.innerHTML += `
            <div class="cart-item">
                <h3>${p.name}</h3>
                <p>MWK ${p.price}</p>
            </div>
        `;
    });
}

/* ---------------- LOAD PRODUCTS (HOME PAGE) ---------------- */

async function loadHomeProducts() {
    let box = document.getElementById("product-box");
    if (!box) return;

    const querySnapshot = await getDocs(collection(db, "products"));

    box.innerHTML = "";

    querySnapshot.forEach((doc) => {
        let p = doc.data();

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

/* ---------------- LOGIN SYSTEM ---------------- */

function login() {
    let email = document.getElementById("user").value;
    let password = document.getElementById("pass").value;

    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            alert("Login successful");
            window.location.href = "admin.html";
        })
        .catch((error) => {
            alert(error.message);
        });
}

/* ---------------- INIT ---------------- */

loadHomeProducts();

/* ---------------- MAKE FUNCTIONS WORK IN HTML ---------------- */

window.addProduct = addProduct;
window.loadProducts = loadProducts;
window.loadHomeProducts = loadHomeProducts;
window.addToCart = addToCart;
window.removeItem = removeItem;
window.login = login;