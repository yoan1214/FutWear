$(document).ready(function() {
    const urlParams = new URLSearchParams(window.location.search);
    const equipo = urlParams.get('equipo');

    $.ajax({
        url: '../Php/Views/getEquipaciones.php',
        type: 'GET',
        data: { equipo: equipo },
        dataType: 'json',
        success: function(data) {
            var catalogo = $('#catalogo');
            $.each(data, function(index, equipacion) {
                if (equipacion.Nombre_equipo === equipo) {
                    var item = $('<div class="item"></div>')
                        .attr('data-equipo', equipacion.Nombre_equipo)
                        .attr('data-equipacion', equipacion.Nombre);

                    var img = $('<img>').attr('src', equipacion.Foto).attr('alt', equipacion.Nombre);
                    var nombreEquipacion = $('<h2></h2>').text(equipacion.Nombre);
                    var precio = $('<p></p>').addClass('precio').text('Precio: €' + equipacion.Precio); // Agregar precio

                    item.append(img, nombreEquipacion, precio);
                    catalogo.append(item);
                }
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


