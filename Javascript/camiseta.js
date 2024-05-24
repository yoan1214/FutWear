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