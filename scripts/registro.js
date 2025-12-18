document.addEventListener("DOMContentLoaded", () => {

    const sesion = JSON.parse(localStorage.getItem("sesionActiva"));
    if (!sesion || sesion.rol !== "empleado") {
        window.location.href = "../../index.html";
        return;
    }

    const form = document.getElementById("productoForm");
    const lista = document.getElementById("listaProductos");

    const titulo = document.getElementById("titulo");
    const precio = document.getElementById("precio");
    const cantidad = document.getElementById("cantidad");
    const categoria = document.getElementById("categoria");
    const imagen = document.getElementById("imagen");
    const descripcion = document.getElementById("descripcion");

    form.addEventListener("submit", e => {
        e.preventDefault();

        const producto = {
            id: Date.now(),
            titulo: titulo.value,
            precio: Number(precio.value),
            cantidad: Number(cantidad.value),
            categoria: categoria.value.toLowerCase(),
            imagen: imagen.value,
            descripcion: descripcion.value
        };

        const productos = JSON.parse(localStorage.getItem("productos")) || [];
        productos.push(producto);

        localStorage.setItem("productos", JSON.stringify(productos));

        form.reset();
        renderProductos();
    });

    function renderProductos() {
        const productos = JSON.parse(localStorage.getItem("productos")) || [];
        lista.innerHTML = "";

        productos.forEach(p => {
            lista.innerHTML += `
            <div class="card card2">
              <div class="cardContenedor">
                <div class="tarjFrontal">
                  <img src="${p.imagen}">
                  <h3 class="card2-title">${p.titulo}</h3>
                  <p class="card2-price">$${p.precio}</p>
                  <button class="card-btn-flip">Ver</button>
                </div>
                <div class="tarjPosterior">
                  <h3 class="card2-title">${p.titulo}</h3>
                  <p>${p.descripcion}</p>
                  <p>Stock: ${p.cantidad}</p>
                  <p></p>
                  <button class="card-btn-flip">Volver</button>
                </div>
              </div>
            </div>
            `;
        });

        activarFlip();
    }

    function activarFlip() {
        document.querySelectorAll(".card").forEach(card => {
            card.querySelectorAll(".card-btn-flip").forEach(btn => {
                btn.onclick = () => card.classList.toggle("flipped");
            });
        });
    }

    renderProductos();
});
