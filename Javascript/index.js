$(document).ready(function () {
    $.ajax({
        url: "../Php/Views/getDestacados.php",
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
// equipos
// $(document).ready(function() {
//     $.ajax({
//         url: '../Php/Views/getEquipoIndex.php',
//         type: 'GET',
//         dataType: 'json',
//         success: function(data) {
//             var catalogo = $('#dynamic-teams');
//             $.each(data, function(index, equipo) {
//                 // Crear las tarjetas dinámicamente con los datos recibidos
//                 var teamCard = $('<div class="team-card"></div>').attr('data-equipo', equipo.Nombre);
//                 var img = $('<img>').attr('src', equipo.Foto).attr('alt', equipo.Nombre);
//                 var overlay = $('<div class="team-overlay"></div>');
//                 var teamName = $('<span></span>').text(equipo.Nombre);

//                 overlay.append(teamName);
//                 teamCard.append(img);
//                 teamCard.append(overlay);
//                 catalogo.append(teamCard);
//             });

//             // Agregar evento de clic a las tarjetas dinámicas
//             $('.team-card').click(function() {
//                 var equipo = $(this).data('equipo');
//                 window.location.href = 'equipaciones.html?equipo=' + equipo;
//             });
//         },
//         error: function() {
//             alert('Error al recuperar los datos');
//         }
//     });
// });


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
document.addEventListener("DOMContentLoaded", function () {
    var menuIcon = document.getElementById("menu-icon");
    if (!menuIcon) {
        console.error("Menu icon not found");
        return;
    }

    menuIcon.addEventListener("click", function () {
        var navbar = document.querySelector(".navbar");
        if (!navbar) {
            console.error("Navbar element not found");
            return;
        }

        // Toggle the display of the navbar on click
        navbar.style.display = navbar.style.display === "flex" ? "none" : "flex";
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
        url: "../Php/Views/getNovedades.php",
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
