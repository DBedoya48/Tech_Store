const form = document.getElementById("paymentForm");
const message = document.getElementById("message");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputs = form.querySelectorAll("input");

  // Validación: solo verificar que tenga al menos un dígito
  const valido = [...inputs].every(input => /\d/.test(input.value));

  if (!valido) {
    message.style.color = "#f87171";
    message.textContent = "Todos los campos deben contener al menos un número.";
    return;
  }

  // Simulación de pago exitoso
  message.style.color = "#4ade80";
  message.textContent = "✅ Pago exitoso. Redirigiendo...";

  // Simular envío del pedido (opcional)
  localStorage.setItem("pedidoPendiente", JSON.stringify({
    estado: "pendiente",
    fecha: new Date().toLocaleString()
  }));

  // Redirigir a pedidos pendientes del empleado
  setTimeout(() => {
    window.location.href = "pedidos-pendientes.html";
  }, 2000);
});
