document.addEventListener("DOMContentLoaded", function() {
    const registrationForm = document.querySelector(".formulario");

    registrationForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Previene el envío tradicional del formulario

        // Llamada a la función de validación
        if (!validateForm()) {
            alert("Por favor, asegúrate de que todos los datos sean correctos.");
            return;
        }

        // Recolección de datos del formulario utilizando jQuery
        const formData = $(this).serialize();

        // Llamada AJAX con jQuery
        $.ajax({
            url: "../Php/auth/signup.php", // Asegúrate de poner aquí la URL correcta de tu script PHP
            type: "POST",
            data: formData,
            dataType: "json",
            success: function(response) {
                if (response.status === "success") {
                    // Almacenar correo y estado de admin en sessionStorage
                    sessionStorage.setItem("userEmail", response.email);
                    sessionStorage.setItem("usuarioId", response.usuarioId);
                    sessionStorage.setItem("isAdmin", "0"); // Todos los nuevos usuarios no son admins

                    alert("Registro exitoso. Bienvenido!");
                    window.location.href = './index.html'; // Redirigir a la página principal o de usuario
                } else {
                    alert(response.message); // Muestra el mensaje de respuesta del servidor
                }
            },
            error: function(xhr, status, error) {
                console.error("Error: ", status, error);
            }
        });
    });

    function validateForm() {
        const password = document.getElementById("password1").value;
        const confirmPassword = document.getElementById("password2").value;

        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden.");
            return false;
        }

        if (password.length < 8) {
            alert("La contraseña debe tener al menos 8 caracteres.");
            return false;
        }

        return true;
    }
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

    

