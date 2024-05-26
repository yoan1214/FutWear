document.addEventListener('DOMContentLoaded', function() {
    const isAdmin = sessionStorage.getItem("isAdmin");
    const userEmail = sessionStorage.getItem("userEmail");
    
    // Redirigir a la página de inicio si no es administrador
    if (isAdmin !== "1") {
        window.location.href = './index.html';
        return; // Detener la ejecución del script
    }

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
document.addEventListener('DOMContentLoaded', function() {
    function cargarUsuarios() {
        $.ajax({
            url: '../Php/admin/getUsuarios.php',
            type: 'POST',
            dataType: 'json',
            success: function(response) {
                if (response.status === 'success') {
                    const usuariosContainer = $('#usuariosContainer');
                    usuariosContainer.empty();
                    let table = '<table><tr><th>ID</th><th>Nombre</th><th>Correo</th><th>Admin</th><th>Acciones</th></tr>';
                    response.data.forEach(usuario => {
                        table += `<tr>
                                    <td>${usuario.Id}</td>
                                    <td>${usuario.Nombre}</td>
                                    <td>${usuario.Correo}</td>
                                    <td>${usuario.Admin ? 'Sí' : 'No'}</td>
                                    <td>
                                        <button class="button edit" onclick="abrirModal(${usuario.Id})">Editar</button>
                                   
                                        <button class="button" onclick="verPedidos(${usuario.Id})">Ver Pedidos</button>
                                    </td>
                                  </tr>`;
                    });
                    table += '</table>';
                    usuariosContainer.append(table);
                } else {
                    alert('Error al cargar los usuarios.');
                }
            },
            error: function(xhr, status, error) {
                console.error('Error: ', error);
                alert('Error al cargar los usuarios.');
            }
        });
    }

    cargarUsuarios();
});

function abrirModal(usuarioId) {
    // Obtener datos del usuario y rellenar el formulario
    $.ajax({
        url: '../Php/admin/getUsuario.php',
        type: 'POST',
        data: { usuarioId: usuarioId },
        dataType: 'json',
        success: function(response) {
            if (response.status === 'success') {
                const usuario = response.data;
                $('#editUserId').val(usuario.Id);
                $('#editNombre').val(usuario.Nombre);
                $('#editApellidos').val(usuario.Apellidos);
                $('#editCorreo').val(usuario.Correo);
                $('#editTelefono').val(usuario.Teléfono);
                $('#editDireccion').val(usuario.Dirección);
                $('#editCodigoPostal').val(usuario.Código_Postal);
                $('#editProvincia').val(usuario.Provincia);
                $('#editMetodoPago').val(usuario.Método_de_Pago);
                $('#editAdmin').val(usuario.Admin);

                const modal = $('#editModal');
                modal.show();
            } else {
                alert('Error al obtener los datos del usuario.');
            }
        },
        error: function(xhr, status, error) {
            console.error('Error: ', error);
            alert('Error al obtener los datos del usuario.');
        }
    });
}

function cerrarModal() {
    $('#editModal').hide();
}

function guardarCambios() {
    const usuarioId = $('#editUserId').val();
    const formData = $('#editForm').serialize();

    $.ajax({
        url: '../Php/admin/updateUsuario.php',
        type: 'POST',
        data: formData + '&usuarioId=' + usuarioId,
        success: function(response) {
            if (response === 'Usuario actualizado correctamente') {
                alert('Usuario actualizado correctamente');
                cerrarModal();
                location.reload();
            } else {
                alert(response);
            }
        },
        error: function(xhr, status, error) {
            console.error('Error: ', error);
            alert('Error al actualizar el usuario.');
        }
    });
}




function verPedidos(usuarioId) {
    window.location.href = `pedidosUsuario.html?usuarioId=${usuarioId}`;
}

$('.close').click(function() {
    cerrarModal();
});

$(window).click(function(event) {
    if (event.target == document.getElementionById('editModal')) {
        cerrarModal();
    }
});