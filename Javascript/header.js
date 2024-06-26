const isAdmin = sessionStorage.getItem("isAdmin");
const userEmail = sessionStorage.getItem("userEmail");

// Ocultar todos los elementos por defecto
document.querySelectorAll('.logged-in, .no-logged-in, .admin-only').forEach(el => el.style.display = 'none');

if (userEmail) {
    document.querySelectorAll('.logged-in').forEach(el => el.style.display = 'block'); 
    if (isAdmin === "1") {
        document.querySelectorAll('.admin-only').forEach(el => el.style.display = 'block'); 
    } else {
        document.querySelectorAll('.user-content').forEach(el => el.style.display = 'block'); 
    }
    actualizarNumeroCarrito(); // Actualizar número de artículos en el carrito
} else {
    document.querySelectorAll('.no-logged-in').forEach(el => el.style.display = 'block'); 
}

const logoutButton = document.getElementById('logoutButton');
if (logoutButton) {
    logoutButton.addEventListener('click', function() {
        sessionStorage.clear();
        window.location.href = './index.html';
    });
} else {
    console.error("Logout button not found");
}

var menuIcon = document.getElementById('menu-icon');
if (!menuIcon) {
    console.error('Menu icon not found');
} else {
    menuIcon.addEventListener('click', function() {
        var navbar = document.querySelector('.navbar');
        if (!navbar) {
            console.error('Navbar element not found');
        } else {
            navbar.style.display = (navbar.style.display === 'flex' ? 'none' : 'flex');
        }
    });
}

const searchIcon = document.getElementById('searchIcon');
const searchInput = document.getElementById('searchQuery');

searchIcon.addEventListener('click', function() {
    searchInput.style.display = 'block';
    searchInput.focus();
    searchIcon.style.display = 'none'; // Ocultar el icono de búsqueda al mostrar el input
});

document.getElementById('searchForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const query = searchInput.value;
    if (query) {
        window.location.href = `resultadosBusqueda.html?query=${encodeURIComponent(query)}`;
    }
});

searchInput.addEventListener('blur', function() {
    if (!searchInput.value) {
        searchInput.style.display = 'none';
        searchIcon.style.display = 'block'; // Mostrar el icono de búsqueda si el input está vacío y pierde el foco
    }
});

function actualizarNumeroCarrito() {
    const usuarioId = sessionStorage.getItem("usuarioId");

    if (!usuarioId) {
        return;
    }

    $.ajax({
        url: '../Php/Carrito/getNumeroCarrito.php',
        type: 'POST',
        data: { usuarioId: usuarioId },
        dataType: 'json',
        success: function(response) {
            if (response.status === 'success') {
                const numeroCarrito = $('#numeroCarrito');
                const cantidad = response.data.numero;
                if (cantidad > 0) {
                    numeroCarrito.text(cantidad);
                    numeroCarrito.css('display', 'inline-block'); // Mostrar el contador
                } else {
                    numeroCarrito.css('display', 'none'); // Ocultar el contador
                }
            } else {
                console.error('Error al obtener el número de artículos en el carrito.');
            }
        },
        error: function(xhr, status, error) {
            console.error('Error: ', error);
        }
    });
}
