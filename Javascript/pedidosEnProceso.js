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
    function cargarPedidos() {
        $.ajax({
            url: '../Php/admin/getPedidosEnProceso.php',
            type: 'POST',
            dataType: 'json',
            success: function(response) {
                if (response.status === 'success') {
                    const pedidosContainer = $('#pedidosContainer');
                    pedidosContainer.empty();
                    let table = '<table><tr><th>ID</th><th>Usuario ID</th><th>Fecha</th><th>Total</th><th>Acciones</th></tr>';
                    response.data.forEach(pedido => {
                        const fecha = new Date(pedido.Fecha).toLocaleString();
                        table += `<tr>
                                    <td>${pedido.Id}</td>
                                    <td>${pedido.Id_Usuario}</td>
                                    <td>${fecha}</td>
                                    <td>€${pedido.Precio_Total}</td>
                                    <td>
                                        <button class="button" onclick="completarPedido(${pedido.Id})">Completar</button>
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

    cargarPedidos();
});

function completarPedido(pedidoId) {
    if (confirm('¿Estás seguro de completar este pedido?')) {
        $.ajax({
            url: '../Php/admin/completarPedido.php',
            type: 'POST',
            data: { pedidoId: pedidoId },
            success: function(response) {
                if (response === 'Pedido completado correctamente') {
                    alert('Pedido completado correctamente');
                    location.reload();
                } else {
                    alert(response);
                }
            },
            error: function(xhr, status, error) {
                console.error('Error: ', error);
                alert('Error al completar el pedido.');
            }
        });
    }
}