$(document).ready(function() {
    const urlParams = new URLSearchParams(window.location.search);
    const equipo = urlParams.get('equipo');
    const equipacion = urlParams.get('equipacion');

    if (!equipo || !equipacion) {
        alert('Faltan parámetros en la URL.');
        return;
    }

    let camisetaData; // Define la variable fuera del scope de la solicitud AJAX

    $.ajax({
        url: '../Php/Views/getCamiseta.php',
        type: 'GET',
        data: { equipo: equipo, equipacion: equipacion },
        dataType: 'json',
        success: function(data) {
            console.log(data); // Verifica los datos que llegan del servidor
            camisetaData = data; // Asigna los datos a la variable global

            var detalle = $('#detalle');
            detalle.empty();

            if (!data || data.length === 0) {
                alert('No hay datos disponibles.');
                return;
            }

            if (data[0].Foto && data[0].Equipacion) {
                var img = $('<img>').attr('src', data[0].Foto).attr('alt', data[0].Equipacion);
                var nombreEquipo = $('<h2></h2>').text(data[0].Equipo + ' - ' + data[0].Equipacion);
                var precioBox = $('<div class="precio-box"></div>').text('Precio: €' + data[0].Precio);
                
                detalle.append(img);
                detalle.append(nombreEquipo);
                detalle.append(precioBox);

                var tallaSelector = $('<select id="talla"></select>');
                detalle.append(tallaSelector);

                $.each(data, function(index, item) {
                    var option = $('<option></option>')
                        .val(item.Talla)
                        .text(item.Talla)
                        .data('stock', item.Stock);

                    if (item.Stock == 0) {
                        option.css('color', 'red');
                    }

                    tallaSelector.append(option);
                });

                // Añadir botón para agregar al carrito
                detalle.append('<button id="addToCart">Añadir al Carrito</button>');
                
                $('#addToCart').click(function() {
                    const talla = $('#talla').val();
                    const selectedOption = $('#talla option:selected');
                    const stock = selectedOption.data('stock');

                    if (stock == 0) {
                        alert('Producto agotado');
                        return;
                    }

                    if (!talla) {
                        alert('Por favor, selecciona una talla.');
                        return;
                    }

                    const usuarioId = sessionStorage.getItem("usuarioId");
                    if (!usuarioId) {
                        alert("Por favor, inicia sesión primero.");
                        window.location.href = './login.html';
                        return;
                    }

                    const cantidad = 1; // Asume una cantidad fija de 1 para el carrito
                    const precioUnitario = parseFloat(data[0].Precio);

                    $.ajax({
                        url: '../Php/Carrito/addItemCarrito.php',
                        type: 'POST',
                        data: {
                            usuarioId: usuarioId,
                            camisetaId: data[0].CamisetaId, // Usa el ID correcto
                            cantidad: cantidad,
                            precioUnitario: precioUnitario,
                            talla: talla
                        },
                        success: function(response) {
                            alert(response);
                        },
                        error: function(xhr, status, error) {
                            console.error('Error al añadir el item al carrito:', xhr.responseText);
                            alert('Error al añadir el item al carrito');
                        }
                    });
                });

            } else {
                console.error('Datos incompletos en la respuesta');
            }
        },
        error: function(xhr, status, error) {
            console.error('Error al recuperar los detalles:', xhr.responseText);
            alert('Error al recuperar los detalles');
        }
    });
});
