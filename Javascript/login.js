
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector(".formulario");

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Previene el envío tradicional del formulario

        // Recolección de datos del formulario utilizando jQuery
        const formData = $(this).serialize();

        // Llamada AJAX con jQuery para el inicio de sesión
        $.ajax({
            url: "../Php/auth/login.php", // Asegúrate de poner aquí la URL correcta de tu script PHP
            type: "POST",
            data: formData,
            dataType: "json", // Especifica que esperas una respuesta en formato JSON
            success: function(response) {
                if (response.status === "success") {
                    // Almacenar correo y estado de admin en sessionStorage
                    sessionStorage.setItem("userEmail", response.email);
                    sessionStorage.setItem("isAdmin", response.isAdmin);

                    if (response.isAdmin === "1") {
                        alert("Inicio de sesión de administrador exitoso");
                        window.location.href = './index.html'; // Cambiar a una página de administrador si necesario
                    } else {
                        alert("Inicio de sesión exitoso");
                        window.location.href = './index.html'; // Cambiar a la página de usuario
                    }
                } else {
                    alert(response.message); // Muestra el error devuelto por el servidor
                }
            },
            error: function(xhr, status, error) {
                console.error("Error: ", status, error);
            }
        });
    });
   
});
document.addEventListener('DOMContentLoaded', function() {
    const isAdmin = sessionStorage.getItem("isAdmin");
    const userEmail = sessionStorage.getItem("userEmail");
    
    // Ocultar todos los elementos por defecto
    document.querySelectorAll('.logged-in, .no-logged-in, .admin-only').forEach(el => el.style.display = 'none');

    if (userEmail) {
        // Usuario está logueado
        document.querySelectorAll('.logged-in').forEach(el => el.style.display = 'block'); // Mostrar elementos comunes logueados

        if (isAdmin === "1") {
            // Usuario es administrador
            document.querySelectorAll('.admin-only').forEach(el => el.style.display = 'block'); // Mostrar contenido admin y admin-only
        } else {
            // Usuario es un usuario registrado no administrador
            document.querySelectorAll('.user-content').forEach(el => el.style.display = 'block'); // Mostrar contenido de usuario
        }
    } else {
        // Usuario no está logueado
        document.querySelectorAll('.no-logged-in').forEach(el => el.style.display = 'block'); // Mostrar elementos para no logueados
    }
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            // Limpiar sessionStorage
            sessionStorage.clear();
            window.location.href = './index.html'; // Redirige al usuario a la página de inicio
        });
    } else {
        console.error("Logout button not found");
    }

});
// icono de menu
document.addEventListener('DOMContentLoaded', function() {
    var menuIcon = document.getElementById('menu-icon');
    if (!menuIcon) {
        console.error('Menu icon not found');
        return;
    }

    menuIcon.addEventListener('click', function() {
        var navbar = document.querySelector('.navbar');
        if (!navbar) {
            console.error('Navbar element not found');
            return;
        }

        // Toggle the display of the navbar on click
        navbar.style.display = (navbar.style.display === 'flex' ? 'none' : 'flex');
    });
});