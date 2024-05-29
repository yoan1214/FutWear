document.addEventListener('DOMContentLoaded', function() {
    const isAdmin = sessionStorage.getItem("isAdmin");
    
    // Redirigir a la página de inicio si no es administrador
    if (isAdmin !== "1") {
        window.location.href = './index.html';
        return; // Detener la ejecución del script
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
                    let table = '<table><tr><th>ID</th><th>Usuario ID</th><th>Fecha</th><th>Total</th><th>Acciones</th></tr>';
                    response.data.forEach(pedido => {
                        const fecha = new Date(pedido.Fecha).toLocaleString();
                        table += `<tr>
                                    <td>${pedido.Id}</td>
                                    <td>${pedido.Id_Usuario}</td>
                                    <td>${fecha}</td>
                                    <td>€${pedido.Precio_Total}</td>
                                    <td>
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

function cancelarPedido(pedidoId) {
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
}
