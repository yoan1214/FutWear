document.addEventListener('DOMContentLoaded', function() {
    const isAdmin = sessionStorage.getItem("isAdmin");

    if (isAdmin !== "1") {
        window.location.href = './index.html';
        return;
    }

    function cargarPedidos() {
        $.ajax({
            url: '../Php/admin/getPedidosEnProceso.php',
            type: 'POST',
            dataType: 'json',
            success: function(response) {
                if (response.status === 'success') {
                    const pedidosContainer = $('#pedidosContainer');
                    pedidosContainer.empty();
                    let table = '<table><tr><th>ID</th><th>Usuario ID</th><th>Nombre</th><th>Correo</th><th>Dirección</th><th>Fecha</th><th>Total</th><th>Acciones</th></tr>';
                    response.data.forEach(pedido => {
                        const fecha = new Date(pedido.Fecha).toLocaleString();
                        table += `<tr>
                                    <td>${pedido.Id}</td>
                                    <td>${pedido.Id_Usuario}</td>
                                    <td>${pedido.Nombre}</td>
                                    <td>${pedido.Correo}</td>
                                    <td>${pedido.Dirección}</td>
                                    <td>${fecha}</td>
                                    <td>€${pedido.Precio_Total}</td>
                                    <td>
                                        <button class="button ver-detalle" data-pedido-id="${pedido.Id}">Ver Detalles</button>
                                        <button class="button completar" onclick="completarPedido(${pedido.Id})">Completar</button>
                                        <button class="button cancelar" onclick="cancelarPedido(${pedido.Id})">Cancelar</button>
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

    $('#pedidosContainer').on('click', '.ver-detalle', function() {
        const pedidoId = $(this).data('pedido-id');
        verDetallePedido(pedidoId);
    });

    function verDetallePedido(pedidoId) {
        $.ajax({
            url: '../Php/admin/getDetallesPedido.php',
            type: 'POST',
            data: { pedidoId: pedidoId },
            dataType: 'json',
            success: function(response) {
                if (response.status === 'success') {
                    const detalles = response.data;
                    let detalleHtml = '<h3>Detalles del Pedido</h3>';
                    detalles.forEach(detalle => {
                        detalleHtml += `
                            <p>Equipo: ${detalle.Nombre_Equipo}</p>
                            <p>Equipación: ${detalle.Nombre_Equipacion}</p>
                            <p>Cantidad: ${detalle.Cantidad}</p>
                            <p>Precio Unitario: €${detalle.Precio_Unitario}</p>
                            <img src="${detalle.Foto}" alt="Foto de la equipación" style="width:100px;">
                            <hr>
                        `;
                    });
                    $('#detallePedidoContent').html(detalleHtml);
                    openModal();
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

    function openModal() {
        const modal = document.getElementById("detallePedidoModal");
        const span = document.getElementsByClassName("close")[0];

        modal.style.display = "block";

        span.onclick = function() {
            modal.style.display = "none";
        }

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }

    window.completarPedido = function(pedidoId) {
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
    };

    window.cancelarPedido = function(pedidoId) {
        if (confirm('¿Estás seguro de cancelar este pedido?')) {
            $.ajax({
                url: '../Php/admin/deletePedido.php',
                type: 'POST',
                data: { pedidoId: pedidoId },
                success: function(response) {
                    if (response === 'Pedido cancelado correctamente') {
                        alert('Pedido cancelado correctamente');
                        location.reload();
                    } else {
                        alert(response);
                    }
                },
                error: function(xhr, status, error) {
                    console.error('Error: ', error);
                    alert('Error al cancelar el pedido.');
                }
            });
        }
    };
});
