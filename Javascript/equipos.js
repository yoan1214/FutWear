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
            const isAdmin = sessionStorage.getItem("isAdmin");
            const userEmail = sessionStorage.getItem("userEmail");
            
            // Ocultar todos los elementos por defecto
            document.querySelectorAll('.logged-in, .no-logged-in, .admin-only').forEach(el => el.style.display = 'none');
        
            if (userEmail) {
                // Usuario está logueado
                document.querySelectorAll('.logged-in').forEach(el => el.style.display = 'block'); // Mostrar elementos comunes logueados
        
                if (isAdmin === "1") {
                    // Usuario es administrador
                    document.querySelectorAll('.admin-only').forEach(el => el.style.display = 'block'); // Mostrar contenido admin y admin-only
                } else {
                    // Usuario es un usuario registrado no administrador
                    document.querySelectorAll('.user-content').forEach(el => el.style.display = 'block'); // Mostrar contenido de usuario
                }
            } else {
                // Usuario no está logueado
                document.querySelectorAll('.no-logged-in').forEach(el => el.style.display = 'block'); // Mostrar elementos para no logueados
            }
            const logoutButton = document.getElementById('logoutButton');
            if (logoutButton) {
                logoutButton.addEventListener('click', function() {
                    // Limpiar sessionStorage
                    sessionStorage.clear();
                    window.location.href = './index.html'; // Redirige al usuario a la página de inicio
                });
            } else {
                console.error("Logout button not found");
            }
        
        });
        // icono de menu
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