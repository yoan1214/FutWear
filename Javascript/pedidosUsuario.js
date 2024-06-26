
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


$('.close').click(function() {
    cerrarModal();
});

// Cerrar modal al hacer clic fuera de él
$(window).click(function(event) {
    if (event.target == document.getElementById('detallesModal')) {
        cerrarModal();
    }
});