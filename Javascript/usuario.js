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
    // datos
  
});
document.addEventListener('DOMContentLoaded', function() {
    const userEmail = sessionStorage.getItem("userEmail");

    if (!userEmail) {
        alert("Por favor, inicia sesión primero.");
        window.location.href = './login.html';
        return;
    }

    // Obtener y mostrar los datos del usuario
    $.ajax({
        url: '../Php/User/getDatosUsuario.php',
        type: 'POST',
        data: { email: userEmail },
        dataType: 'json',
        success: function(response) {
            if (response.status === 'success') {
                // Asegúrate de que los IDs coinciden con los definidos en el HTML
                $('#displayNombre').text(response.data.Nombre);
                $('#displayApellidos').text(response.data.Apellidos);
                $('#displayCorreo').text(userEmail); // Suponiendo que quieres mostrar el correo también
                $('#displayTelefono').text(response.data.Teléfono);
                $('#displayDireccion').text(response.data.Dirección);
                $('#displayCodigoPostal').text(response.data.Código_Postal);
                $('#displayProvincia').text(response.data.Provincia);
                $('#displayMetodoPago').text(response.data.Método_de_Pago);

                // Rellenar el formulario con los datos del usuario para su posible actualización
                $('#telefono').val(response.data.Teléfono);
                $('#direccion').val(response.data.Dirección);
                $('#codigo_postal').val(response.data.Código_Postal);
                $('#provincia').val(response.data.Provincia);
                $('#metodo_pago').val(response.data.Método_de_Pago);
            } else {
                alert('Error al obtener datos del usuario.');
            }
        },
        error: function(xhr, status, error) {
            console.error('Error: ', error);
            alert('Error al obtener datos del usuario.');
        }
    });

    // Actualizar los datos del usuario
    $('#updateButton').click(function() {
        const formData = $('#userForm').serialize();
        $.ajax({
            url: '../Php/User/UpdateDatosUsuario.php',
            type: 'POST',
            data: formData + '&email=' + userEmail,
            success: function(response) {
                if (response === 'Datos actualizados correctamente') {
                    alert('Datos actualizados correctamente');
                    // Opcionalmente, puedes actualizar también los datos mostrados inmediatamente después de la actualización exitosa
                    $('#displayTelefono').text($('#telefono').val());
                    $('#displayDireccion').text($('#direccion').val());
                    $('#displayCodigoPostal').text($('#codigo_postal').val());
                    $('#displayProvincia').text($('#provincia').val());
                    $('#displayMetodoPago').text($('#metodo_pago option:selected').text());
                } else {
                    alert(response);
                }
            },
            error: function(xhr, status, error) {
                console.error('Error: ', error);
                alert('Error al actualizar datos del usuario.');
            }
        });
    });
});


