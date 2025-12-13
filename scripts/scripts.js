let cart = [];
let total = 0;

const cartElement = document.getElementById('cart');
const cartToggle = document.getElementById('cart-toggle');

// Toggle carrito al hacer clic en el botón
cartToggle.addEventListener('click', (e) => {
    cartElement.classList.toggle('show');
    e.stopPropagation(); // evitar que el clic se propague al documento
});

// Detectar clic fuera del carrito para ocultarlo
document.addEventListener('click', (e) => {
    if(cartElement.classList.contains('show') && !cartElement.contains(e.target) && e.target !== cartToggle){
        cartElement.classList.remove('show');
    }
});

// Evitar que clics dentro del carrito cierren la lista
cartElement.addEventListener('click', (e) => {
    e.stopPropagation();
});

// Añadir producto al carrito
function addToCart(name, price, imgElement) {
    const existing = cart.find(item => item.name === name);
    if(existing){
        existing.quantity += 1;
    } else {
        cart.push({name, price, quantity:1});
    }
    total += price;

    // Animación de la tarjeta “volando”
    flyToCart(imgElement);

    updateCart();
}

// Animación de la tarjeta hacia el carrito
function flyToCart(imgElement){
    const imgRect = imgElement.getBoundingClientRect();
    const cartToggleRect = cartToggle.getBoundingClientRect(); // CORREGIDO

    const clone = imgElement.cloneNode(true);
    clone.style.position = "fixed";
    clone.style.top = imgRect.top + "px";
    clone.style.left = imgRect.left + "px";
    clone.style.width = imgRect.width + "px";
    clone.style.height = imgRect.height + "px";
    clone.style.zIndex = "1000";
    clone.style.opacity = "1";
    clone.style.transform = "scale(1)";
    clone.style.transition = "all 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)";
    clone.style.pointerEvents = "none";

    document.body.appendChild(clone);

    const targetX = cartToggleRect.left + cartToggleRect.width / 2 - imgRect.width / 2;
    const targetY = cartToggleRect.top + cartToggleRect.height / 2 - imgRect.height / 2;

    requestAnimationFrame(() => {
        clone.style.top = targetY + "px";
        clone.style.left = targetX + "px";
        clone.style.transform = "scale(0.2)";
        clone.style.opacity = "0.4";
    });

    setTimeout(() => clone.remove(), 800);
}

// Actualizar carrito
function updateCart(){
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.getElementById('cart-count');

    cartItems.innerHTML = '';

    cart.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `${item.name} x${item.quantity} - $${(item.price*item.quantity)}
        <button onclick="removeFromCart('${item.name}')">X</button>`;
        cartItems.appendChild(li);
    });

    total = cart.reduce((acc, item) => acc + item.price*item.quantity, 0);

    cartTotal.textContent = total;
    cartCount.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
}

// Restar 1 unidad del producto o eliminar si llega a 0
function removeFromCart(name){
    const item = cart.find(item => item.name === name);
    if(item){
        item.quantity -= 1;
        if(item.quantity <= 0){
            cart = cart.filter(i => i.name !== name);
        }
        updateCart();
    }
}


function flipCard(button) {
    const card = button.closest(".card, .card2");
    card.classList.toggle("flipped");
}

//script para eliminar los flips cuando actualizo pagina

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".card").forEach(card => {
        card.classList.remove("flip");
    });
});


const form = document.getElementById("registerForm");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;
    const usuario = document.getElementById("usuario").value;
    const pass = document.getElementById("pass").value;
    const pass2 = document.getElementById("pass2").value;

    // Validación de contraseñas
    if (pass !== pass2) {
        alert("Las contraseñas no coinciden");
        return;
    }

    // Crear el objeto usuario
    const nuevoUsuario = {
        nombre,
        correo,
        usuario,
        pass
    };

    // Guardar en localStorage
    localStorage.setItem("usuarioRegistrado", JSON.stringify(nuevoUsuario));

    alert("Registro exitoso. Ya puedes iniciar sesión");

    // Redirigir a login (ajusta tu ruta)
    window.location.href = "../pages/index.html";
});

function logout() {
    localStorage.removeItem("sesionActiva");
    window.location.href = "../index.html";
}

//sript para el saludo en cada pagina

function mostrarSaludo() {
    const sesion = JSON.parse(localStorage.getItem("sesionActiva"));
    if (!sesion) return;

    const saludo = document.getElementById("saludo2");
    if (saludo) {
        saludo.textContent = `Bienvenido(a), ${sesion.usuario}`;
    }
}

document.addEventListener("DOMContentLoaded", mostrarSaludo);