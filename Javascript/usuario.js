
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


