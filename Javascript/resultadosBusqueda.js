document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query');

    if (query) {
        fetch(`../Php/Views/getBusqueda.php?query=${encodeURIComponent(query)}`)
            .then(response => response.json())
            .then(data => {
                const catalogo = document.getElementById('catalogo');
                catalogo.innerHTML = '';

                if (data.status === 'success' && data.data.length > 0) {
                    data.data.forEach(item => {
                        const itemElement = document.createElement('div');
                        itemElement.classList.add('item');
                        itemElement.setAttribute('data-equipo', item.Nombre_equipo);
                        itemElement.setAttribute('data-equipacion', item.Nombre);

                        if (item.Precio <= 35) {
                            itemElement.classList.add('oferta'); // Añadir clase oferta si el precio es menor o igual a 35
                        }

                        const img = document.createElement('img');
                        img.src = item.Foto;
                        img.alt = item.Nombre;

                        const nombreEquipo = document.createElement('h2');
                        nombreEquipo.textContent = item.Nombre_equipo;

                        const nombreEquipacion = document.createElement('p');
                        nombreEquipacion.textContent = item.Nombre;

                        const precio = document.createElement('p');
                        precio.classList.add('precio');
                        precio.textContent = 'Precio: €' + item.Precio;

                        itemElement.appendChild(img);
                        itemElement.appendChild(nombreEquipo);
                        itemElement.appendChild(nombreEquipacion);
                        itemElement.appendChild(precio);

                        catalogo.appendChild(itemElement);
                    });

                    document.querySelectorAll('.item').forEach(item => {
                        item.addEventListener('click', function() {
                            const equipo = this.getAttribute('data-equipo');
                            const equipacion = this.getAttribute('data-equipacion');
                            window.location.href = 'camiseta.html?equipo=' + encodeURIComponent(equipo) + '&equipacion=' + encodeURIComponent(equipacion);
                        });
                    });
                } else {
                    catalogo.innerHTML = '<p>No se encontraron resultados.</p>';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                document.getElementById('catalogo').innerHTML = '<p>Error al realizar la búsqueda.</p>';
            });
    } else {
        document.getElementById('catalogo').innerHTML = '<p>No se proporcionó una consulta de búsqueda.</p>';
    }
});
