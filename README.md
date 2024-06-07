# Futwear

## Requisitos del Sistema
- Windows
- XAMPP (incluye Apache, MySQL, PHP)
- Navegador web (Chrome, Opera, etc.)

## Instalación

### Paso 1: Instalar XAMPP
1. Descargue XAMPP desde la página oficial: [XAMPP](https://www.apachefriends.org).
2. Ejecute el instalador y siga las instrucciones en pantalla para completar la instalación.

### Paso 2: Configurar XAMPP
1. Abra XAMPP Control Panel.
2. Inicie los servicios de Apache y MySQL haciendo clic en el botón "Start" para cada uno.

### Paso 3: Configurar la Base de Datos
1. Descargue o clone este repositorio en su directorio `htdocs` dentro de la carpeta de instalación de XAMPP:
    
#### cd C:\xampp\htdocs
#### git clone https://github.com/yoan1214/FutWear.git
   
2. Abra su navegador web y vaya a las siguientes URLs para ejecutar los scripts de creación e inserción de datos en la base de datos:
    - [Crear Base de Datos y Tablas](http://localhost/futwear/Php/DataBase/bd.php): Este script creará la base de datos y las tablas necesarias.
    - [Insertar Datos Iniciales](http://localhost/futwear/Php/DataBase/datosBD.php): Este script insertará los datos iniciales en las tablas.

### Paso 4: Ejecutar el Proyecto
1. Abra su navegador web y vaya a [http://localhost/futwear/Html/index.html](http://localhost/futwear/Html/index.html).
2. El proyecto debería funcionar correctamente y mostrar la interfaz de usuario.

## Estructura del Proyecto
#### futwear/
#### ├── Css/
#### │ └── (archivos CSS)
#### ├── Fonts/
#### │ └── (archivos de fuentes)
#### ├── Html/
#### │ └── (archivos HTML)
#### ├── Images/
#### │ ├── Equipaciones/
#### │ ├── Equipo/
#### │ ├── icons/
#### │ └── imgs/
#### ├── Javascript/
#### │ └── (archivos JavaScript)
#### ├── Php/
#### │ ├── admin/
#### │ │ └── (archivos de administración)
#### │ ├── auth/
#### │ │ └── (archivos de autenticación)
#### │ ├── Carrito/
#### │ │ └── (archivos del carrito de compras)
#### │ ├── DataBase/
#### │ │ ├── bd.php
#### │ │ └── datosBD.php
#### │ ├── Pedido/
#### │ │ └── (archivos de pedidos)
#### │ ├── User/
#### │ │ └── (archivos de usuario)
#### │ └── Views/
#### │  └── (archivos de vistas)
#### └── Video/
####    └── (archivos de video)

## Tecnologías Utilizadas
- HTML5
- CSS3
- JavaScript
- PHP
- MySQL

## Autor
Yoancarlos Bermúdez Bermúdez
 
