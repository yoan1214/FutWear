$(document).ready(function() {
    $.ajax({
        url: '../Php/Views/getNovedades.php',
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            var catalogo = $('#catalogo');
            $.each(data, function(index, equipacion) {
                var item = $('<div class="item"></div>')
                    .attr('data-equipo', equipacion.Nombre_equipo)
                    .attr('data-equipacion', equipacion.Nombre);

                if (equipacion.Precio <= 35) {
                    item.addClass('oferta'); // Añadir clase oferta si el precio es menor o igual a 35
                }

                var img = $('<img>').attr('src', equipacion.Foto).attr('alt', equipacion.Nombre);
                var nombreEquipo = $('<h2></h2>').text(equipacion.Nombre_equipo);
                var nombreEquipacion = $('<p></p>').text(equipacion.Nombre);
                var precio = $('<p></p>').addClass('precio').text('Precio: €' + equipacion.Precio);

                item.append(img);
                item.append(nombreEquipo);
                item.append(nombreEquipacion);
                item.append(precio); // Agregar el precio al elemento del catálogo
                catalogo.append(item);
            });

            $('.item').click(function() {
                var equipo = $(this).data('equipo');
                var equipacion = $(this).data('equipacion');
                window.location.href = 'camiseta.html?equipo=' + encodeURIComponent(equipo) + '&equipacion=' + encodeURIComponent(equipacion);
            });
        },
        error: function() {
            alert('Error al recuperar los datos');
        }
    });
});
