$(document).ready(function() {
    function cargarCatalogo() {
        $.ajax({
            url: '../Php/Views/getCatalogo.php',
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                mostrarCatalogo(data);
                cargarEquipos(data);
            },
            error: function() {
                alert('Error al recuperar los datos');
            }
        });
    }

    function mostrarCatalogo(data) {
        var catalogo = $('#catalogo');
        catalogo.empty();
        $.each(data, function(index, equipacion) {
            var item = $('<div class="item"></div>')
                .attr('data-equipo', equipacion.Nombre_equipo)
                .attr('data-equipacion', equipacion.Nombre)
                .attr('data-precio', equipacion.Precio);

            if (equipacion.Precio <= 35) {
                item.addClass('oferta');
            }

            var img = $('<img>').attr('src', equipacion.Foto).attr('alt', equipacion.Nombre);
            var nombreEquipo = $('<h2></h2>').text(equipacion.Nombre_equipo);
            var nombreEquipacion = $('<p></p>').text(equipacion.Nombre);
            var precio = $('<p></p>').addClass('precio').text('Precio: €' + equipacion.Precio);

            item.append(img, nombreEquipo, nombreEquipacion, precio);
            catalogo.append(item);
        });

        $('.item').click(function() {
            var equipo = $(this).data('equipo');
            var equipacion = $(this).data('equipacion');
            window.location.href = 'camiseta.html?equipo=' + encodeURIComponent(equipo) + '&equipacion=' + encodeURIComponent(equipacion);
        });
    }

    function aplicarFiltros() {
        var tipoEquipacion = $('#tipoEquipacion').val();
        var nombreEquipo = $('#nombreEquipo').val().toLowerCase();
        var oferta = $('#oferta').is(':checked');

        $.ajax({
            url: '../Php/Views/getCatalogo.php',
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                var resultadosFiltrados = data.filter(function(equipacion) {
                    var cumpleTipo = (tipoEquipacion === 'todos' || 
                                      (tipoEquipacion === 'Otros' && equipacion.Nombre !== 'Primera Equipación' && equipacion.Nombre !== 'Segunda Equipación') ||
                                      equipacion.Nombre === tipoEquipacion);
                    var cumplePrecio = !oferta || equipacion.Precio <= 35;
                    var cumpleNombre = (nombreEquipo === 'todos' || equipacion.Nombre_equipo.toLowerCase().includes(nombreEquipo));

                    return cumpleTipo && cumplePrecio && cumpleNombre;
                });

                mostrarCatalogo(resultadosFiltrados);
            },
            error: function() {
                alert('Error al recuperar los datos');
            }
        });
    }

    function cargarEquipos(data) {
        var nombreEquipoSelect = $('#nombreEquipo');
        var equipos = new Set(data.map(equipacion => equipacion.Nombre_equipo));
        nombreEquipoSelect.empty();
        nombreEquipoSelect.append('<option value="todos">Todos</option>');
        equipos.forEach(equipo => {
            nombreEquipoSelect.append('<option value="' + equipo.toLowerCase() + '">' + equipo + '</option>');
        });
    }

    $('#tipoEquipacion').change(aplicarFiltros);
    $('#nombreEquipo').change(aplicarFiltros);
    $('#oferta').change(aplicarFiltros);
    $('#toggleFiltros').click(function() {
        $('#filtros').toggle();
    });

    cargarCatalogo();
});
