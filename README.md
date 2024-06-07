Requisitos del Sistema
    Windows
    XAMPP (incluye Apache, MySQL, PHP)
    Navegador web (Chrome, Firefox, etc.)
Instalación:
Paso 1: Instalar XAMPP
    Descargue XAMPP desde la página oficial: https://www.apachefriends.org.
    Ejecute el instalador y siga las instrucciones en pantalla para completar la instalación.
Paso 2: Configurar XAMPP
    Abra XAMPP Control Panel.
    Inicie los servicios de Apache y MySQL haciendo clic en el botón "Start" para cada uno.
Paso 3: Configurar la Base de Datos
    Descargue o clone este repositorio en su directorio htdocs dentro de la carpeta de instalación de XAMPP. 
        cd C:\xampp\htdocs
        git clone https://github.com/tu-usuario/futwear.git
    Abra su navegador web y vaya a las siguientes URLs para ejecutar los scripts de creación e inserción de datos en la base de datos:
        http://localhost/futwear/Php/DataBase/bd.php - Este script creará la base de datos y las tablas necesarias.
        http://localhost/futwear/Php/DataBase/datosBD.php - Este script insertará los datos iniciales en las tablas.
Paso 4: Ejecutar el Proyecto
    Abra su navegador web y vaya a http://localhost/futwear/Html/index.html.
    El proyecto debería funcionar correctamente y mostrar la interfaz de usuario.

Estructura del Proyecto:
    futwear/
    │
    ├── Css/
    │   └── (archivos CSS)
    │
    ├── Fonts/
    │   └── (archivos de fuentes)
    │
    ├── Html/
    │   └── (archivos HTML)
    │
    ├── Images/
    │   └── (imágenes del proyecto)
    │
    ├── Javascript/
    │   └── (archivos JavaScript)
    │
    ├── Php/
    │   ├── admin/
    │   ├── auth/
    │   ├── Carrito/
    │   ├── DataBase/
    │   │   ├── bd.php
    │   │   └── datosBD.php
    │   ├── Pedido/
    │   ├── User/
    │   └── Views/
    │
    └── Video/
        └── (archivos de video)

Tecnologías Utilizadas:
    HTML5
    CSS3
    JavaScript
    PHP
    MySQL

Autor:
    Yoancarlos Bermúdez Bermúdez