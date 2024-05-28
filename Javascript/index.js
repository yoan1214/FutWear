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
            if (data.length > 0) {
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

                $("#ofertasIndex").show(); // Muestra el div solo si hay ofertas

                $(".card").click(function () {
                    var equipo = $(this).find(".card__title").text();
                    var equipacion = $(this).find(".card__subtitle").text();
                    window.location.href =
                        "camiseta.html?equipo=" + equipo + "&equipacion=" + equipacion;
                });
            } else {
                $("#ofertasIndex").hide(); // Oculta el div si no hay ofertas
            }
        },
        error: function () {
            alert("Error al recuperar los datos");
        },
    });
});

