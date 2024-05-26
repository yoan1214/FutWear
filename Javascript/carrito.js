document.addEventListener('DOMContentLoaded', function() {
    const usuarioId = sessionStorage.getItem("usuarioId");

    if (!usuarioId) {
        alert("Por favor, inicia sesión primero.");
        window.location.href = './login.html';
        return;
    }

    function cargarCarrito() {
        $.ajax({
            url: '../Php/Carrito/getCarrito.php',
            type: 'POST',
            data: { usuarioId: usuarioId },
            dataType: 'json',
            success: function(response) {
                if (response.status === 'success') {
                    const carritoItems = $('#carritoItems');
                    carritoItems.empty();
                    let total = 0;
                    response.data.forEach(item => {
                        const itemTotal = item.Cantidad * item.Precio_Unitario;
                        total += itemTotal;
                        carritoItems.append(`
                            <div class="carrito-item" data-camiseta-id="${item.Camiseta_Id}" data-stock="${item.Stock}">
                                <img src="${item.Foto}" alt="${item.Nombre_Camiseta}">
                                <div>
                                    <p>${item.Equipo} - ${item.Equipacion}</p>
                                    <p>${item.Talla}</p>
                                    <p>Precio Unitario: €${item.Precio_Unitario}</p>
                                    <p>Total: €${itemTotal.toFixed(2)}</p>
                                </div>
                                <div>
                                    <p>Cantidad: <input type="number" value="${item.Cantidad}" data-detalle-carrito-id="${item.Id}" class="cantidad-input"></p>
                                    <button data-detalle-carrito-id="${item.Id}" class="remove-item-button">Eliminar</button>
                                </div>
                            </div>
                        `);
                    });
                    $('#totalPrecio').text(`Total: €${total.toFixed(2)}`);
                } else {
                    alert('Error al cargar el carrito.');
                }
            },
            error: function(xhr, status, error) {
                console.error('Error: ', error);
                alert('Error al cargar el carrito.');
            }
        });
    }

    $('#carritoItems').on('change', '.cantidad-input', function() {
        const detalleCarritoId = $(this).data('detalle-carrito-id');
        const cantidad = $(this).val();
        const stock = $(this).closest('.carrito-item').data('stock');
        const precioUnitario = parseFloat($(this).closest('.carrito-item').find('p:contains("Precio Unitario")').text().replace('Precio Unitario: €', ''));

        if (cantidad > stock) {
            alert(`Solo quedan ${stock} unidades de esta camiseta.`);
            $(this).val(stock); // Revertir a la cantidad máxima disponible en stock
            return;
        }

        $.ajax({
            url: '../Php/Carrito/updateCarritoItem.php',
            type: 'POST',
            data: {
                detalleCarritoId: detalleCarritoId,
                cantidad: cantidad,
                precioUnitario: precioUnitario
            },
            success: function(response) {
                if (response === 'Item actualizado correctamente') {
                    cargarCarrito();
                } else {
                    alert(response);
                }
            },
            error: function(xhr, status, error) {
                console.error('Error: ', error);
                alert('Error al actualizar el item.');
            }
        });
    });

    $('#carritoItems').on('click', '.remove-item-button', function() {
        const detalleCarritoId = $(this).data('detalle-carrito-id');

        $.ajax({
            url: '../Php/Carrito/deleteItemCarrito.php',
            type: 'POST',
            data: { detalleCarritoId: detalleCarritoId },
            success: function(response) {
                if (response === 'Item eliminado del carrito correctamente') {
                    cargarCarrito();
                } else {
                    alert(response);
                }
            },
            error: function(xhr, status, error) {
                console.error('Error: ', error);
                alert('Error al eliminar el item.');
            }
        });
    });

    // Finalizar Compra
    $('#checkoutButton').click(function() {
        $.ajax({
            url: '../Php/Carrito/finalizarCompra.php',
            type: 'POST',
            data: { usuarioId: usuarioId },
            success: function(response) {
                if (response === 'Compra finalizada correctamente') {
                    alert('Gracias por tu compra!');
                    cargarCarrito(); // Recargar o limpiar el carrito
                } else {
                    alert(response);
                }
            },
            error: function(xhr, status, error) {
                console.error('Error: ', error);
                alert('Error al finalizar la compra.');
            }
        });
    });

    cargarCarrito();
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
