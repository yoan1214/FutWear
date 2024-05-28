
// contenido pag
document.addEventListener('DOMContentLoaded', function() {
    function cargarProductos() {
        $.ajax({
            url: '../Php/admin/getProductos.php',
            type: 'POST',
            dataType: 'json',
            success: function(response) {
                if (response.status === 'success') {
                    const productosContainer = $('#productosContainer');
                    productosContainer.empty();
                    let table = '<table><tr><th>ID Equipación</th><th>ID Equipo</th><th>Nombre Equipo</th><th>Nombre Equipación</th><th>Precio</th><th>Foto</th><th>Tallas</th><th>Acciones</th></tr>';
                    response.data.forEach(equipacion => {
                        let tallas = '';
                        equipacion.Camisetas.forEach(camiseta => {
                            let stockClass = '';
                            if (camiseta.Stock === 0) {
                                stockClass = 'stock-zero';
                            } else if (camiseta.Stock < 3) {
                                stockClass = 'stock-low';
                            }

                            tallas += `<div class="stock-input-container ${stockClass}">
                                        <label>${camiseta.Talla}:</label>
                                        <input type="number" value="${camiseta.Stock}" data-camiseta-id="${camiseta.Id}" class="stock-input">
                                       </div>`;
                        });
                        table += `<tr>
                                    <td>${equipacion.Id}</td>
                                    <td>${equipacion.Equipo_Id}</td>
                                    <td>${equipacion.Nombre_Equipo}</td>
                                    <td>${equipacion.Nombre_Equipacion}</td>
                                    <td>€<input type="number" value="${equipacion.Precio}" data-equipacion-id="${equipacion.Id}" class="precio-input" step="0.01"></td>
                                    <td><img src="${equipacion.Foto}" alt="${equipacion.Nombre_Equipacion}" style="max-width: 100px;"></td>
                                    <td>${tallas}</td>
                                    <td>
                                        <button class="button edit" onclick="editarCamiseta(${equipacion.Id})">Editar Stock</button>
                                        <button class="button edit" onclick="editarPrecio(${equipacion.Id})">Editar Precio</button>
                                        <button class="button delete" onclick="eliminarEquipacion(${equipacion.Id})">Borrar</button>
                                        <button class="button oferta" onclick="aplicarOferta(${equipacion.Id})">Oferta</button> 
                                    </td>
                                  </tr>`;
                    });
                    table += '</table>';
                    productosContainer.append(table);
                } else {
                    alert('Error al cargar los productos.');
                }
            },
            error: function(xhr, status, error) {
                console.error('Error: ', error);
                alert('Error al cargar los productos.');
            }
        });
    }

    function cargarEquipos() {
        $.ajax({
            url: '../Php/admin/getEquipos.php',
            type: 'POST',
            dataType: 'json',
            success: function(response) {
                if (response.status === 'success') {
                    const equipoSelect = $('#equipoId, #equipoIdCamiseta');
                    equipoSelect.empty();
                    response.data.forEach(equipo => {
                        equipoSelect.append(`<option value="${equipo.Id}">${equipo.Nombre}</option>`);
                    });

                    // Cargar equipaciones del primer equipo por defecto
                    const primerEquipoId = response.data.length > 0 ? response.data[0].Id : null;
                    if (primerEquipoId) {
                        cargarEquipaciones(primerEquipoId);
                    }
                } else {
                    alert('Error al cargar los equipos.');
                }
            },
            error: function(xhr, status, error) {
                console.error('Error: ', error);
                alert('Error al cargar los equipos.');
            }
        });
    }

    function cargarEquipaciones(equipoId) {
        $.ajax({
            url: '../Php/admin/getEquipacionesPorEquipo.php',
            type: 'POST',
            data: { equipoId: equipoId },
            dataType: 'json',
            success: function(response) {
                if (response.status === 'success') {
                    const equipacionSelect = $('#equipacionId');
                    equipacionSelect.empty();
                    response.data.forEach(equipacion => {
                        equipacionSelect.append(`<option value="${equipacion.Id}">${equipacion.Nombre}</option>`);
                    });
                } else {
                    alert('Error al cargar las equipaciones.');
                }
            },
            error: function(xhr, status, error) {
                console.error('Error: ', error);
                alert('Error al cargar las equipaciones.');
            }
        });
    }

    $('#equipoIdCamiseta').change(function() {
        const equipoId = $(this).val();
        cargarEquipaciones(equipoId);
    });

    $('#formAñadirEquipo').submit(function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        $.ajax({
            url: '../Php/admin/addEquipo.php',
            type: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            success: function(response) {
                if (response === 'Equipo añadido correctamente') {
                    alert(response);
                    cerrarModal('añadirEquipo');
                    cargarEquipos();
                    cargarProductos();
                } else {
                    alert(response);
                }
            },
            error: function(xhr, status, error) {
                console.error('Error: ', error);
                alert('Error al añadir el equipo.');
            }
        });
    });

    $('#formAñadirEquipacion').submit(function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        $.ajax({
            url: '../Php/admin/addEquipacion.php',
            type: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            success: function(response) {
                if (response === 'Equipación añadida correctamente') {
                    alert(response);
                    cerrarModal('añadirEquipacion');
                    cargarProductos();
                } else {
                    alert(response);
                }
            },
            error: function(xhr, status, error) {
                console.error('Error: ', error);
                alert('Error al añadir la equipación.');
            }
        });
    });

    $('#formAñadirCamiseta').submit(function(e) {
        e.preventDefault();
        const formData = $(this).serialize();
        $.ajax({
            url: '../Php/admin/addCamiseta.php',
            type: 'POST',
            data: formData,
            success: function(response) {
                if (response === 'Camiseta añadida correctamente') {
                    alert(response);
                    cerrarModal('añadirCamiseta');
                    cargarProductos();
                } else {
                    alert(response);
                }
            },
           
            error: function(xhr, status, error) {
                console.error('Error: ', error);
                alert('Error al añadir la camiseta.');
            }
        });
    });

    cargarEquipos();
    cargarProductos();
});

function editarCamiseta(equipacionId) {
    const stockInputs = document.querySelectorAll(`.stock-input[data-camiseta-id]`);
    const stockData = [];
    stockInputs.forEach(input => {
        stockData.push({
            camisetaId: input.dataset.camisetaId,
            stock: input.value
        });
    });

    $.ajax({
        url: '../Php/admin/updateCamiseta.php',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(stockData),
        success: function(response) {
            if (response === 'Camiseta actualizada correctamente') {
                alert(response);
                cargarProductos();
            } else {
                alert(response);
            }
        },
        error: function(xhr, status, error) {
            console.error('Error: ', error);
            alert('Error al actualizar la camiseta.');
        }
    });
}

function editarPrecio(equipacionId) {
    const precioInput = document.querySelector(`.precio-input[data-equipacion-id="${equipacionId}"]`);
    const nuevoPrecio = precioInput.value;

    $.ajax({
        url: '../Php/admin/updateEquipacion.php',
        type: 'POST',
        data: {
            equipacionId: equipacionId,
            nuevoPrecio: nuevoPrecio
        },
        success: function(response) {
            if (response === 'Equipación actualizada correctamente') {
                alert(response);
                cargarProductos();
            } else {
                alert(response);
            }
        },
        error: function(xhr, status, error) {
            console.error('Error: ', error);
            alert('Error al actualizar la equipación.');
        }
    });
}

function aplicarOferta(equipacionId) {
    const precioInput = document.querySelector(`.precio-input[data-equipacion-id="${equipacionId}"]`);
    const precioOriginal = parseFloat(precioInput.value);
    const precioDescuento = (precioOriginal * 0.5).toFixed(2); // Aplicar 40% de descuento
    precioInput.value = precioDescuento;

    editarPrecio(equipacionId);
}

function eliminarEquipacion(equipacionId) {
    if (confirm('¿Estás seguro de eliminar esta equipación y sus camisetas asociadas?')) {
        $.ajax({
            url: '../Php/admin/deleteEquipacion.php',
            type: 'POST',
            data: { equipacionId: equipacionId },
            success: function(response) {
                if (response === 'Equipación y camisetas eliminadas correctamente') {
                    alert(response);
                    cargarProductos();
                } else {
                    alert(response);
                }
            },
            error: function(xhr, status, error) {
                console.error('Error: ', error);
                alert('Error al eliminar la equipación.');
            }
        });
    }
}

function mostrarModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function cerrarModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}
