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
        loginForm.reset();
        return;
    }

    // Guardar sesión activa
    localStorage.setItem("sesionActiva", JSON.stringify(usuarioEncontrado));

    alert("Inicio de sesión exitoso");
    loginForm.reset();
    

    // Redirecciones según rol
switch (usuarioEncontrado.rol) {
    case "admin":
        window.location.href = "../pages/admin/index.html";
        break;
    case "empleado":
        window.location.href = "../pages/empleados/index.html";
        break;
    case "comprador":
        window.location.href = "../pages/compradores/index.html";
        break;
}
});
JSON.parse(localStorage.getItem("sesionActiva"));