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
})
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const usuarioId = urlParams.get('usuarioId');

    if (!usuarioId) {
        alert("ID de usuario no proporcionado.");
        window.location.href = './usuarios.html';
        return;
    }

    function cargarUsuario() {
        $.ajax({
            url: '../Php/admin/getUsuario.php',
            type: 'POST',
            data: { usuarioId: usuarioId },
            dataType: 'json',
            success: function(response) {
                if (response.status === 'success') {
                    $('#usuarioNombre').text(`${response.data.Nombre} ${response.data.Apellidos}`);
                } else {
                    alert('Error al cargar el nombre del usuario.');
                }
            },
            error: function(xhr, status, error) {
                console.error('Error: ', error);
                alert('Error al cargar el nombre del usuario.');
            }
        });
    }

    function cargarPedidos() {
        $.ajax({
            url: '../Php/admin/getPedidosUsuario.php',
            type: 'POST',
            data: { usuarioId: usuarioId },
            dataType: 'json',
            success: function(response) {
                if (response.status === 'success') {
                    const pedidosContainer = $('#pedidosContainer');
                    pedidosContainer.empty();
                    let table = '<table><tr><th>ID</th><th>Fecha</th><th>Total</th><th>Estado</th><th>Acciones</th></tr>';
                    response.data.forEach(pedido => {
                        const fecha = new Date(pedido.Fecha).toLocaleString();
                        table += `<tr>
                                    <td>${pedido.Id}</td>
                                    <td>${fecha}</td>
                                    <td>€${pedido.Precio_Total}</td>
                                    <td>${pedido.Estado}</td>
                                    <td>
                                        <button class="button" onclick="abrirModal(${pedido.Id})">Ver Detalles</button>
                                    </td>
                                  </tr>`;
                    });
                    table += '</table>';
                    pedidosContainer.append(table);
                } else {
                    alert('Error al cargar los pedidos.');
                }
            },
            error: function(xhr, status, error) {
                console.error('Error: ', error);
                alert('Error al cargar los pedidos.');
            }
        });
    }

    cargarUsuario();
    cargarPedidos();
});

function abrirModal(pedidoId) {
    // Obtener detalles del pedido y mostrar en el modal
    $.ajax({
        url: '../Php/admin/getDetallesPedido.php',
        type: 'POST',
        data: { pedidoId: pedidoId },
        dataType: 'json',
        success: function(response) {
            if (response.status === 'success') {
                const detallesContainer = $('#detallesPedidoContainer');
                detallesContainer.empty();
                response.data.forEach(detalle => {
                    detallesContainer.append(`
                        <div>
                            <img src="${detalle.Foto}" alt="${detalle.Nombre_Equipacion}" style="max-width: 100px;">
                            <p>Equipo: ${detalle.Nombre_Equipo}</p>
                            <p>Equipación: ${detalle.Nombre_Equipacion}</p>
                            <p>Talla: ${detalle.Talla}</p>
                            <p>Cantidad: ${detalle.Cantidad}</p>
                            <p>Precio Unitario: €${detalle.Precio_Unitario}</p>
                            <p>Total: €${detalle.Cantidad * detalle.Precio_Unitario}</p>
                        </div>
                    `);
                });

                const modal = $('#detallesModal');
                modal.show();
            } else {
                alert('Error al cargar los detalles del pedido.');
            }
        },
        error: function(xhr, status, error) {
            console.error('Error: ', error);
            alert('Error al cargar los detalles del pedido.');
        }
    });
}

function cerrarModal() {
    $('#detallesModal').hide();
}

// Cerrar modal al hacer clic en "x"
$('.close').click(function() {
    cerrarModal();
});

// Cerrar modal al hacer clic fuera de él
$(window).click(function(event) {
    if (event.target == document.getElementById('detallesModal')) {
        cerrarModal();
    }
});