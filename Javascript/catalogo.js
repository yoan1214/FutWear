$(document).ready(function() {
    $.ajax({
        url: '../Php/Views/getCatalogo.php',
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            console.log(data);  // Verificar los datos recibidos
            var catalogo = $('#catalogo');
            $.each(data, function(index, equipacion) {
                var item = $('<div class="item"></div>')
                    .attr('data-equipo', equipacion.Nombre_equipo)  // Asegurarse de que esto coincide con lo que se envía
                    .attr('data-equipacion', equipacion.Nombre);
                var img = $('<img>').attr('src', equipacion.Foto).attr('alt', equipacion.Nombre);
                var nombreEquipo = $('<h2></h2>').text(equipacion.Nombre_equipo);
                var nombreEquipacion = $('<p></p>').text(equipacion.Nombre);
                var precio = $('<p></p>').addClass('precio').text('Precio: €' + equipacion.Precio);

                item.append(img, nombreEquipo, nombreEquipacion, precio);
                catalogo.append(item);
            });

            // Ajuste en la vinculación del evento click
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
