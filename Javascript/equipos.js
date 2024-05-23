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
        