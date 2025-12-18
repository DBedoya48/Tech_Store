function formatCOP(precio) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  }).format(precio);
}

function renderResumenCarrito() {
  const contenedor = document.getElementById("resumenCarrito");
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  if (carrito.length === 0) {
    contenedor.innerHTML = "<p>Tu carrito está vacío</p>";
    return;
  }

  let total = 0;

  const itemsHTML = carrito.map(p => {
    const subtotal = p.precio * p.cantidad;
    total += subtotal;

    return `
      <div class="resumen-item">
        <img src="${p.imagen}">
        <div>
          <h2 >${p.titulo}</h2>
          <h3 >Cantidad: ${p.cantidad}</h3>
        </div>
        <h3 class="resumen-price">C/U:${formatCOP(p.precio)}</h3>
        <h3 class="resumen-price">SUBTOTAL:${formatCOP(subtotal)}</h3>
      </div>
    `;
  }).join("");

  contenedor.innerHTML = `
    <div class="resumen-card">
      <h2>Resumen de compra</h2>
      ${itemsHTML}
      <div class="resumen-total">
        Total a pagar: ${formatCOP(total)}
      </div>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  renderResumenCarrito();
});


function generarPago() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  if (carrito.length === 0) {
    alert("El carrito está vacío");
    return;
  }

  // 💰 calcular total
  const total = carrito.reduce(
    (acc, p) => acc + p.precio * p.cantidad,
    0
  );

  // 📦 crear pedido pendiente
  const pedido = {
    idPedido: Date.now(),
    fecha: new Date().toLocaleString(),
    estado: "pendiente",
    productos: carrito,
    total
  };

  const pedidosPendientes =
    JSON.parse(localStorage.getItem("pedidosPendientes")) || [];

  pedidosPendientes.push(pedido);

  localStorage.setItem(
    "pedidosPendientes",
    JSON.stringify(pedidosPendientes)
  );

  // 🧹 limpiar carrito
  localStorage.removeItem("carrito");

  // ✅ feedback visual
  const msg = document.getElementById("mensajePago");
  msg.textContent = "✅ Pago exitoso. Redirigiendo al inicio...";
  msg.style.color = "#4ade80";

    // 🧹 limpiar carrito (storage + memoria)
    cart = [];
    updateCart();
    setTimeout(() => {
    window.location.href = "../../index.html"
    }, 2000);

}

const btnPagar = document.getElementById("btnPagar");

btnPagar.addEventListener("click", (e) => {
  e.preventDefault();
  generarPago();
});