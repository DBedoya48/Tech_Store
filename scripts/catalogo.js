document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("productoForm");

  // 🔐 Solo proteger si es página de empleado
  if (form) {
    const sesion = JSON.parse(localStorage.getItem("sesionActiva"));
    /* if (!sesion || sesion.rol !== "empleado") {
      window.location.href = "../../index.html";
      return;
    }*/
  }

  const contenedores = {
    cables: document.querySelector("#cables .connection"),
    camaras: document.querySelector("#camaras .connection"),
    hogar: document.querySelector("#hogar .connection")

  };

  // 1️⃣ Renderizar productos desde localStorage al cargar la página
  function renderProductos() {
    const productos = JSON.parse(localStorage.getItem("productos")) || [];
    Object.values(contenedores).forEach(c => c.innerHTML = ""); // Limpiar contenedores

    productos.forEach(p => {
      if (contenedores[p.categoria]) {
        const card = crearCard(p);
        contenedores[p.categoria].appendChild(card);
      }
    });

    activarFlip();
    activarAddToCart();
  }

  // 2️⃣ Guardar el nuevo producto en localStorage
  if (form) {
    const titulo = document.getElementById("titulo");
    const precio = document.getElementById("precio");
    const cantidad = document.getElementById("cantidad");
    const categoria = document.getElementById("categoria");
    const imagen = document.getElementById("imagen");
    const descripcion = document.getElementById("descripcion");

    form.addEventListener("submit", e => {
      e.preventDefault();

      const producto = {
        id: Date.now(),  // Usamos Date.now() como id único
        titulo: titulo.value, 
        precio: Number(precio.value),
        cantidad: Number(cantidad.value),
        categoria: categoria.value.toLowerCase(),
        imagen: imagen.value,
        descripcion: descripcion.value
      };

      // Guardamos el nuevo producto en localStorage
      const productos = JSON.parse(localStorage.getItem("productos")) || [];
      productos.push(producto);
      localStorage.setItem("productos", JSON.stringify(productos));

      form.reset();
      renderProductos(); // Actualizamos la vista
    });
  }

function formatCOP(precio) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  }).format(precio);
}
  // 3️⃣ Crear una card para el producto
  function crearCard(p) {
    const div = document.createElement("div");
    div.className = "card card2";

    div.innerHTML = `
      <div class="cardContenedor">
        <div class="tarjFrontal">
          <img src="${p.imagen}">
          <h3>${p.titulo}</h3>
          <p>${formatCOP(p.precio)}</p>
          <p class="stock">Stock: ${p.cantidad}</p>
          <button class="card-btn add-cart-btn"data-id="${p.id}">Añadir al carrito</button>
          <button class="card-btn-flip">Ver detalles</button>
        </div>

        <div class="tarjPosterior">
          <h3 class="card2-title">${p.titulo}</h3>
          <p>${p.descripcion}</p>
          <p class="stock">Stock: ${p.cantidad}</p>
          <button class="card-btn-flip">Volver</button>
        </div>
      </div>
    `;
    return div;
  }

  // 4️⃣ Activar el flip de la tarjeta
  function activarFlip() {
    document.querySelectorAll(".card").forEach(card => {
      card.querySelectorAll(".card-btn-flip").forEach(btn => {
        btn.onclick = () => card.classList.toggle("flipped");
      });
    });
  }

  // 5️⃣ Ejecutar la renderización de los productos al cargar la página
  renderProductos();

});

function activarAddToCart() {
  document.querySelectorAll(".add-cart-btn").forEach(btn => {
    btn.onclick = () => {
      const id = Number(btn.dataset.id);
      const img = btn.closest(".card").querySelector("img");

      // 👉 delega al carrito
      window.addToCart(id, img);
    };
  });
}





