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
                    // Almacenar correo, usuarioId, nombre, apellidos y estado de admin en sessionStorage
                    sessionStorage.setItem("userEmail", response.email);
                    sessionStorage.setItem("usuarioId", response.usuarioId);
                    sessionStorage.setItem("isAdmin", response.isAdmin);
                    sessionStorage.setItem("userName", response.nombre);
                    sessionStorage.setItem("userSurname", response.apellidos);

                    if (response.isAdmin === "1") {
                        
                        window.location.href = './index.html'; // Cambiar a una página de administrador si necesario
                    } else {
                       
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
