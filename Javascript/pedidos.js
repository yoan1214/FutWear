document.addEventListener('DOMContentLoaded', function() {
    const usuarioId = sessionStorage.getItem("usuarioId");

    if (!usuarioId) {
        alert("Por favor, inicia sesión primero.");
        window.location.href = './login.html';
        return;
    }

    function cargarPedidos() {
        $.ajax({
            url: '../Php/Pedido/getPedidos.php',
            type: 'POST',
            data: { usuarioId: usuarioId },
            dataType: 'json',
            success: function(response) {
                if (response.status === 'success') {
                    const pedidosItems = $('#pedidosItems');
                    pedidosItems.empty();
                    response.data.forEach(pedido => {
                        const fecha = new Date(pedido.Fecha).toLocaleString();
                        const pedidoItem = $(`
                            <div class="pedido-item">
                                <p><strong>Pedido ID:</strong> ${pedido.Id}</p>
                                <p><strong>Fecha:</strong> ${fecha}</p>
                                <p><strong>Total:</strong> €${pedido.Precio_Total}</p>
                                <p><strong>Estado:</strong> ${pedido.Estado}</p>
                                <button class="detalles-button" data-pedido-id="${pedido.Id}">Ver Detalles</button>
                                <div class="detalle-pedido" id="detallePedido-${pedido.Id}" style="display: none;"></div>
                            </div>
                        `);
                        pedidosItems.append(pedidoItem);
                    });

                    $('.detalles-button').on('click', function() {
                        const pedidoId = $(this).data('pedido-id');
                        const detalleDiv = $(`#detallePedido-${pedidoId}`);
                        
                        if (detalleDiv.is(':empty')) {
                            console.log(`Cargando detalles para el pedido ID: ${pedidoId}`);
                            $.ajax({
                                url: '../Php/Pedido/getDetallePedido.php',
                                type: 'POST',
                                data: { pedidoId: pedidoId },
                                dataType: 'json',
                                success: function(response) {
                                    console.log('Detalles del pedido:', response);
                                    if (response.status === 'success') {
                                        response.data.forEach(detalle => {
                                            detalleDiv.append(`
                                                <div>
                                                    <img src="${detalle.Foto}" alt="${detalle.Nombre_Equipacion}" style="width: 50px;">
                                                    <p>${detalle.Nombre_Equipo} - ${detalle.Nombre_Equipacion} - Talla: ${detalle.Talla}</p>
                                                    <p>Precio Unitario: €${detalle.Precio_Unitario}</p>
                                                    <p>Cantidad: ${detalle.Cantidad}</p>
                                                    <p>Total: €${detalle.Precio_Unitario * detalle.Cantidad}</p>
                                                </div>
                                            `);
                                        });
                                        detalleDiv.slideToggle();
                                    } else {
                                        alert('Error al cargar los detalles del pedido.');
                                    }
                                },
                                error: function(xhr, status, error) {
                                    console.error('Error: ', error);
                                    console.error('Response:', xhr.responseText);
                                    alert('Error al cargar los detalles del pedido.');
                                }
                            });
                        } else {
                            detalleDiv.slideToggle();
                        }
                    });
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