$(document).ready(function () {
    // Obtener todas las camisetas
    $.ajax({
        url: "../Php/Views/getCatalogo.php",
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
                var price = $('<p class="card_price"></p>').text('€ ' + equipacion.Precio);
                var title = $('<p class="card_title"></p>').text(equipacion.Nombre_equipo);
                var subtitle = $('<p class="card_subtitle"></p>').text(equipacion.Nombre);

                content.append(price);
                content.append(title);
                content.append(subtitle);

                if (equipacion.Precio <= 35) {
                    card.addClass('oferta'); // Añadir clase oferta
                    var discount = $('<p class="card_discount"></p>').text('Oferta');
                    content.append(discount); // Añadir el descuento
                }

                card.append(imageContainer);
                card.append(content);

                catalogo.append(card);
            });

            $(".card").click(function () {
                var equipo = $(this).find(".card_title").text();
                var equipacion = $(this).find(".card_subtitle").text();
                window.location.href =
                    "camiseta.html?equipo=" + equipo + "&equipacion=" + equipacion;
            });
        },
        error: function () {
            alert("Error al recuperar los datos");
        },
    });
});
document.addEventListener('DOMContentLoaded', function() {
    // Función para mostrar el nombre y apellidos en la bienvenida
    function showWelcomeMessage() {
        const userName = sessionStorage.getItem("userName");
        const userSurname = sessionStorage.getItem("userSurname");
        const mensajeBienvenida = document.querySelector(".mensajeBienvenida");

        if (userName && userSurname) {
            mensajeBienvenida.querySelector("span").textContent = `${userName} ${userSurname}`;
            mensajeBienvenida.classList.add('animate-welcome');
            mensajeBienvenida.style.display = 'block'; // Mostrar el mensaje de bienvenida
        } else {
            mensajeBienvenida.style.display = 'none'; // Ocultar el mensaje de bienvenida
        }
    }

    // Llamar a la función cuando se cargue la página
    showWelcomeMessage();
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
