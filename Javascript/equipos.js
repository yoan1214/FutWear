$(document).ready(function() {
    $.ajax({
        url: '../Php/Views/getEquipos.php',
        type: 'GET',
                dataType: 'json',
                success: function(data) {
                    var catalogo = $('#catalogo');
                    $.each(data, function(index, equipo) {
                        var item = $('<div class="item"></div>').attr('data-equipo', equipo.Nombre);
                        var img = $('<img>').attr('src', equipo.Foto).attr('alt', equipo.Nombre);
                        var nombreEquipo = $('<h2></h2>').text(equipo.Nombre);

                        item.append(img);
                        item.append(nombreEquipo);
                        catalogo.append(item);
                    });

                    $('.item').click(function() {
                        var equipo = $(this).data('equipo');
                        window.location.href = 'equipaciones.html?equipo=' + equipo;
                    });
                },
                error: function() {
                    alert('Error al recuperar los datos');
                }
            });
        });
    