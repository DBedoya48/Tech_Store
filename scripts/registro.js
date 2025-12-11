const form = document.getElementById("registerForm");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;
    const usuario = document.getElementById("usuario").value;
    const pass = document.getElementById("pass").value;
    const pass2 = document.getElementById("pass2").value;
    const rol = document.getElementById("rol").value;

    if (pass !== pass2) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    // Cargar DB o crearla
    let usuariosDB = JSON.parse(localStorage.getItem("usuariosDB")) || [];

    // Verificar usuario duplicado
    const existe = usuariosDB.some(u => u.usuario === usuario);
    if (existe) {
        alert("Este usuario ya existe.");
        return;
    }

    // Crear usuario
    const nuevoUsuario = {
        nombre,
        correo,
        usuario,
        pass,
        rol
    };

    // Guardarlo
    usuariosDB.push(nuevoUsuario);
    localStorage.setItem("usuariosDB", JSON.stringify(usuariosDB));

    alert("¡¡Usuario registrado correctamente!!");
    form.reset();
    window.location.href = "../pages/registro.html";

});