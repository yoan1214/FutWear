$(document).ready(function () {
    $.ajax({
        url: "../Php/Views/getAlternativas.php",
        type: "GET",
        dataType: "json",
        success: function (data) {
            var catalogo = $("#catalogo-destacados");
            $.each(data, function (index, equipacion) {
                var card = $('<div class="card"></div>');

                var imageContainer = $('<div class="card__image-container"></div>');
                var img = $("<img>")
                    .attr("src", equipacion.Foto)
                    .attr("alt", equipacion.Nombre);
                imageContainer.append(img);

                var content = $('<div class="card__content"></div>');
                var price = $('<p class="card__price"></p>').text('€ ' + equipacion.Precio);
                var title = $('<p class="card__title"></p>').text(equipacion.Nombre_equipo);
                var subtitle = $('<p class="card__subtitle"></p>').text(equipacion.Nombre);

                content.append(price);
                content.append(title);
                content.append(subtitle);

                card.append(imageContainer);
                card.append(content);

                catalogo.append(card);
            });

            $(".card").click(function () {
                var equipo = $(this).find(".card__title").text();
                var equipacion = $(this).find(".card__subtitle").text();
                window.location.href =
                    "camiseta.html?equipo=" + equipo + "&equipacion=" + equipacion;
            });
        },
        error: function () {
            alert("Error al recuperar los datos");
        },
    });
});

// carrusel
function slideRight() {
    const carousel = document.getElementById("carousel");
    const itemWidth = carousel.querySelector(".carrusel").offsetWidth + 20; // Ajusta el valor 20 si es necesario
    carousel.scrollBy({ left: itemWidth, behavior: "smooth" });
}

function slideLeft() {
    const carousel = document.getElementById("carousel");
    const itemWidth = carousel.querySelector(".carrusel").offsetWidth + 20; // Ajusta el valor 20 si es necesario
    carousel.scrollBy({ left: -itemWidth, behavior: "smooth" });
}
// slider de jugadores
jQuery(document).ready(function ($) {
    $(".slider-img").on("click", function () {
        $(".slider-img").removeClass("active");
        $(this).addClass("active");
    });
});

// Opcional: Detener autoplay cuando el usuario interactúa con los botones de navegación.
document.querySelectorAll(".nav-button").forEach((button) => {
    button.addEventListener("click", stopAutoplay);
});

// navbar
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
// funcion del texto mostrar mas
function showMore() {
    document.getElementById("moreText").style.display = "block";
    document.getElementById("shortText").style.display = "none";
}

function showLess() {
    document.getElementById("moreText").style.display = "none";
    document.getElementById("shortText").style.display = "block";
}
// video arsenal
document.addEventListener("DOMContentLoaded", (event) => {
    const videoElement = document.getElementById("videoElement");

    videoElement.addEventListener("click", () => {
        if (videoElement.paused) {
            videoElement.play();
        } else {
            videoElement.pause();
        }
    });
});


$(document).ready(function () {
    $.ajax({
        url: "../Php/Views/getOferta.php",
        type: "GET",
        dataType: "json",
        success: function (data) {
            var catalogo = $("#catalogo-cards");
            $.each(data, function (index, equipacion) {
                var card = $('<div class="card"></div>');

                var imageContainer = $('<div class="card__image-container"></div>');
                var img = $("<img>")
                    .attr("src", equipacion.Foto)
                    .attr("alt", equipacion.Nombre);
                imageContainer.append(img);

                var content = $('<div class="card__content"></div>');
                var price = $('<p class="card__price"></p>').text('€ ' + equipacion.Precio);
                var title = $('<p class="card__title"></p>').text(equipacion.Nombre_equipo);
                var subtitle = $('<p class="card__subtitle"></p>').text(equipacion.Nombre);

                content.append(price);
                content.append(title);
                content.append(subtitle);

                card.append(imageContainer);
                card.append(content);

                catalogo.append(card);
            });

            $(".card").click(function () {
                var equipo = $(this).find(".card__title").text();
                var equipacion = $(this).find(".card__subtitle").text();
                window.location.href =
                    "camiseta.html?equipo=" + equipo + "&equipacion=" + equipacion;
            });
        },
        error: function () {
            alert("Error al recuperar los datos");
        },
    });
});
