document.addEventListener("DOMContentLoaded", () => {
  const btnImp = document.getElementById("btn-import");

  if (!btnImp) {
    console.error("❌ Botón btn-import no encontrado");
    return;
  }

  btnImp.addEventListener("click", importarBase);
});

async function importarBase() {
  const yaCargado = localStorage.getItem("baseImportada");
  if (yaCargado) {
    alert("¡¡Base de datos actualizada!!");
    return;
  }

  try {
    const res = await fetch("../../data/base.json");
    const data = await res.json();

    localStorage.setItem("productos", JSON.stringify(data.productos || []));
    localStorage.setItem("carrito", JSON.stringify(data.carrito || []));
    localStorage.setItem("compras", JSON.stringify(data.compras || []));
    localStorage.setItem("usuariosDB", JSON.stringify(data.usuariosDB))

    localStorage.setItem("baseImportada", "true");

    alert("✅ DATOS CARGADOS CORRECTAMENTE");

    location.reload();
  } catch (error) {
    console.error(error);
    alert("❌ Error al cargar base.json");
  }
}