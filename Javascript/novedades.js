$(document).ready(function() {
    $.ajax({
        url: '../Php/Views/getNovedades.php',
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            var catalogo = $('#catalogo');
            $.each(data, function(index, equipacion) {
                var item = $('<div class="item"></div>').attr('data-equipo', equipacion.Nombre_equipo).attr('data-equipacion', equipacion.Nombre);
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
                window.location.href = 'camiseta.html?equipo=' + equipo + '&equipacion=' + equipacion;
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