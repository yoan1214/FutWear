document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector(".formulario");

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Previene el envío tradicional del formulario

       
        const formData = $(this).serialize();

       
        $.ajax({
            url: "../Php/auth/login.php", 
            type: "POST",
            data: formData,
            dataType: "json", 
            success: function(response) {
                if (response.status === "success") {
                    // Almacenar correo, usuarioId, nombre, apellidos y estado de admin en sessionStorage
                    sessionStorage.setItem("userEmail", response.email);
                    sessionStorage.setItem("usuarioId", response.usuarioId);
                    sessionStorage.setItem("isAdmin", response.isAdmin);
                    sessionStorage.setItem("userName", response.nombre);
                    sessionStorage.setItem("userSurname", response.apellidos);

                    if (response.isAdmin === "1") {
                        
                        window.location.href = './index.html'; 
                    } else {
                       
                        window.location.href = './index.html'; 
                    }
                } else {
                    alert(response.message); 
                }
            },
            error: function(xhr, status, error) {
                console.error("Error: ", status, error);
            }
        });
    });
});
