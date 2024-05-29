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
                    let totalCantidad = 0;
                    response.data.forEach(item => {
                        const itemTotal = item.Cantidad * item.Precio_Unitario;
                        total += itemTotal;
                        totalCantidad += item.Cantidad;
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
                                    <p>Cantidad: <input type="number" value="${item.Cantidad}" data-detalle-carrito-id="${item.Id}" class="cantidad-input" min="1"></p>
                                    <button data-detalle-carrito-id="${item.Id}" class="remove-item-button">Eliminar</button>
                                </div>
                            </div>
                        `);
                    });
                    $('#totalPrecio').text(`Total: €${total.toFixed(2)}`);
                    if (totalCantidad === 0) {
                        $('#checkoutButton').prop('disabled', true).css('display', 'none');
                    } else {
                        $('#checkoutButton').prop('disabled', false).css('display', 'block');
                    }
                    actualizarNumeroCarrito();
                } else {
                    console.error('Error al cargar los items del carrito.');
                    $('#checkoutButton').prop('disabled', true).css('display', 'none');
                }
            },
            error: function(xhr, status, error) {
                console.error('Error: ', error);
                $('#checkoutButton').prop('disabled', true).css('display', 'none');
            }
        });
    }

    $('#carritoItems').on('change', '.cantidad-input', function() {
        const detalleCarritoId = $(this).data('detalle-carrito-id');
        let cantidad = $(this).val();
        const stock = $(this).closest('.carrito-item').data('stock');
        const precioUnitario = parseFloat($(this).closest('.carrito-item').find('p:contains("Precio Unitario")').text().replace('Precio Unitario: €', ''));

        if (cantidad < 1) {
            cantidad = 1;
            $(this).val(1);
        }

        if (cantidad > stock) {
            alert(`Solo quedan ${stock} unidades de esta camiseta.`);
            $(this).val(stock);
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
                    location.reload();
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

    // Abrir el modal de pago
    $('#checkoutButton').click(function() {
        $('#paymentModal').show();
    });

    // Cerrar el modal de pago
    $('.close').click(function() {
        $('#paymentModal').hide();
    });

    // Completar el pedido
    $('#completeOrderButton').click(function() {
        const selectedMethod = $('input[name="paymentMethod"]:checked').val();
        if (!selectedMethod) {
            alert("Por favor, selecciona un método de pago.");
            return;
        }

        // Actualizar el método de pago del usuario
        $.ajax({
            url: '../Php/User/updateMetodoPago.php',
            type: 'POST',
            data: { usuarioId: usuarioId, metodoPago: selectedMethod },
            success: function(response) {
                if (response === 'Método de pago actualizado correctamente') {
                    $.ajax({
                        url: '../Php/Carrito/finalizarCompra.php',
                        type: 'POST',
                        data: { usuarioId: usuarioId },
                        success: function(response) {
                            if (response === 'Compra finalizada correctamente') {
                                alert("Compra finalizada correctamente. Serás redirigido a la pagina principal.");
                                window.location.href = './index.html';
                            } else {
                                alert(response);
                            }
                        },
                        error: function(xhr, status, error) {
                            console.error('Error: ', error);
                            alert('Error al finalizar la compra.');
                        }
                    });
                } else {
                    alert(response);
                }
            },
            error: function(xhr, status, error) {
                console.error('Error: ', error);
                alert('Error al actualizar el método de pago.');
            }
        });

        $('#paymentModal').hide();
    });

    cargarCarrito();
    
    function actualizarNumeroCarrito() {
        const usuarioId = sessionStorage.getItem("usuarioId");

        if (!usuarioId) {
            return;
        }

        $.ajax({
            url: '../Php/Carrito/getNumeroCarrito.php',
            type: 'POST',
            data: { usuarioId: usuarioId },
            dataType: 'json',
            success: function(response) {
                if (response.status === 'success') {
                    const numeroCarrito = $('#numeroCarrito');
                    const cantidad = response.data.numero;
                    if (cantidad > 0) {
                        numeroCarrito.text(cantidad);
                        numeroCarrito.css('display', 'inline-block');
                    } else {
                        numeroCarrito.css('display', 'none');
                    }
                } else {
                    console.error('Error al obtener el número de artículos en el carrito.');
                }
            },
            error: function(xhr, status, error) {
                console.error('Error: ', error);
            }
        });
    }
});
