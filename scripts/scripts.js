let cart = [];
let total = 0;

/* ======================
   INIT
====================== */
document.addEventListener("DOMContentLoaded", () => {
  cart = JSON.parse(localStorage.getItem("carrito")) || [];
  updateCart();
});

/* ======================
   TOGGLE CARRITO
====================== */
const cartElement = document.getElementById("cart");
const cartToggle = document.getElementById("cart-toggle");

cartToggle.addEventListener("click", e => {
  cartElement.classList.toggle("show");
  e.stopPropagation();
});

document.addEventListener("click", e => {
  if (
    cartElement.classList.contains("show") &&
    !cartElement.contains(e.target) &&
    e.target !== cartToggle
  ) {
    cartElement.classList.remove("show");
  }
});

cartElement.addEventListener("click", e => e.stopPropagation());

/* ======================
   ACTIVAR BOTONES
====================== */
function activarAddToCart() {
  document.querySelectorAll(".add-cart-btn").forEach(btn => {
    btn.onclick = () => {
      const id = Number(btn.dataset.id);
      const img = btn.closest(".card").querySelector("img");
      addToCart(id, img);
    };
  });
}

/* ======================
   ADD TO CART
====================== */
function addToCart(productId, imgElement) {
  let productos = JSON.parse(localStorage.getItem("productos")) || [];
  let carritoLS = JSON.parse(localStorage.getItem("carrito")) || [];

  const producto = productos.find(p => p.id === productId);

  if (!producto || producto.cantidad <= 0) {
    alert("Producto agotado");
    return;
  }

  const existente = carritoLS.find(i => i.id === productId);

  if (existente) {
    existente.quantity++;
  } else {
    carritoLS.push({
      id: producto.id,
      name: producto.titulo,
      price: producto.precio,
      quantity: 1,
      imagen: producto.imagen
    });
  }

  // 🔥 RESTAR STOCK REAL
  producto.cantidad--;

  localStorage.setItem("productos", JSON.stringify(productos));
  localStorage.setItem("carrito", JSON.stringify(carritoLS));

  flyToCart(imgElement);

  cart = carritoLS;
  updateCart();

  actualizarStockVisual(productId, producto.cantidad);

  // 🔄 actualizar catálogo
  renderProductos();
}

/* ======================
   ANIMACIÓN
====================== */
function flyToCart(imgElement) {
  if (!imgElement) return;

  const imgRect = imgElement.getBoundingClientRect();
  const cartRect = cartToggle.getBoundingClientRect();

  const clone = imgElement.cloneNode(true);
  Object.assign(clone.style, {
    position: "fixed",
    top: imgRect.top + "px",
    left: imgRect.left + "px",
    width: imgRect.width + "px",
    height: imgRect.height + "px",
    zIndex: 1000,
    transition: "all 0.8s ease",
    pointerEvents: "none"
  });

  document.body.appendChild(clone);

  requestAnimationFrame(() => {
    clone.style.top = cartRect.top + "px";
    clone.style.left = cartRect.left + "px";
    clone.style.transform = "scale(0.2)";
    clone.style.opacity = "0";
  });

  setTimeout(() => clone.remove(), 800);
}

/* ======================
   UPDATE CART
====================== */
function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const cartCount = document.getElementById("cart-count");

  if (!cartItems) return;

  cartItems.innerHTML = "";

  cart.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} x${item.quantity} - $${item.price * item.quantity}
      <button onclick="removeFromCart(${item.id})">X</button>
    `;
    cartItems.appendChild(li);
  });

  total = cart.reduce((acc, i) => acc + i.price * i.quantity, 0);
  cartTotal.textContent = total;
  cartCount.textContent = cart.reduce((acc, i) => acc + i.quantity, 0);
}

/* ======================
   REMOVE FROM CART
====================== */
function removeFromCart(productId) {
  let productos = JSON.parse(localStorage.getItem("productos")) || [];
  let carritoLS = JSON.parse(localStorage.getItem("carrito")) || [];

  const item = carritoLS.find(i => i.id === productId);
  if (!item) return;

  const producto = productos.find(p => p.id === productId);
  if (producto) producto.cantidad++;

  item.quantity--;
  if (item.quantity <= 0) {
    carritoLS = carritoLS.filter(i => i.id !== productId);
  }

  localStorage.setItem("productos", JSON.stringify(productos));
  localStorage.setItem("carrito", JSON.stringify(carritoLS));

  cart = carritoLS;
  updateCart();
  actualizarStockVisual(productId, producto.cantidad)
  renderProductos();
}

function actualizarStockVisual(productId, nuevoStock) {
  document
    .querySelectorAll(`.add-cart-btn[data-id="${productId}"]`)
    .forEach(btn => {
      const card = btn.closest(".card");
      card.querySelectorAll(".stock").forEach(s => {
        s.textContent = `Stock: ${nuevoStock}`;
      });

      if (nuevoStock <= 0) {
        btn.disabled = true;
        btn.textContent = "Agotado";
      }
    });
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

/*function logout() {
    localStorage.removeItem("sesionActiva");
    window.location.href = "../index.html";
}
*/
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

