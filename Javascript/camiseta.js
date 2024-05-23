$(document).ready(function() {
    const urlParams = new URLSearchParams(window.location.search);
    const equipo = urlParams.get('equipo');
    const equipacion = urlParams.get('equipacion');

    if (!equipo || !equipacion) {
        alert('Faltan parámetros en la URL.');
        return;
    }

    $.ajax({
        url: '../Php/Views/getCamiseta.php',
        type: 'GET',
        data: { equipo: equipo, equipacion: equipacion },
        dataType: 'json',
        success: function(data) {
            console.log(data); // Verifica los datos que llegan del servidor
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

                $.each(data, function(index, item) {
                    var talla = $('<span class="talla"></span>').text(item.Talla);
                    detalle.append(talla);
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