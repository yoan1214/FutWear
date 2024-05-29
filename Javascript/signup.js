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
            

                    alert("Registrado, Inicia Sesion para Empezar a comprar");
                    window.location.href = './login.html'; // Redirigir a la página principal o de usuario
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

        if (password.length < 6) {
            alert("La contraseña debe tener al menos 6 caracteres.");
            return false;
        }

        return true;
    }
});



