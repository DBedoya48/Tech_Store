const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const usuarioLogin = document.getElementById("usuarioLogin").value;
    const passLogin = document.getElementById("passLogin").value;

    const usuariosDB = JSON.parse(localStorage.getItem("usuariosDB")) || [];

    const usuarioEncontrado = usuariosDB.find(
        u => u.usuario === usuarioLogin && u.pass === passLogin
    );

    if (!usuarioEncontrado) {
        alert("Usuario o contraseña incorrectos");
        return;
    }

    // Guardar sesión activa
    localStorage.setItem("sesionActiva", JSON.stringify(usuarioEncontrado));

    alert("Inicio de sesión exitoso");

    // Redirecciones según rol
    if (usuarioEncontrado.rol === "admin") {
        window.location.href = "../pages/admin.html";
    } else if (usuarioEncontrado.rol === "empleado") {
        window.location.href = "../pages/empleado.html";
    } else {
        window.location.href = "../pages/comprador.html";
    }
});
JSON.parse(localStorage.getItem("sesionActiva"));