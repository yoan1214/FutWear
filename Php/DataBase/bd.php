<?php
$dsn = "mysql:host=localhost";
$usuario = "root";
$clave = "";
$nombreBD = "futwear";

try {
    // Crear la conexión PDO
    $bd = new PDO($dsn, $usuario, $clave);

    // Crear la base de datos si no existe
    $sql_create_db = "CREATE DATABASE IF NOT EXISTS $nombreBD CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci";
    $bd->exec($sql_create_db);
    // Seleccionar la base de datos
    $bd->exec("USE $nombreBD");
    echo "Base de datos $nombreBD creada correctamente";

    // Creación de tablas
    $sql_usuarios = "CREATE TABLE IF NOT EXISTS Usuarios (
        Id INT AUTO_INCREMENT PRIMARY KEY,
        Nombre VARCHAR(100),
        Apellidos VARCHAR(100),
        Sexo ENUM('Masculino', 'Femenino'),
        Correo VARCHAR(100) UNIQUE,
        Contraseña VARCHAR(100),
        Teléfono INTEGER,
        Dirección VARCHAR(255),
        Código_Postal INTEGER,
        Provincia VARCHAR(50),
        Método_de_Pago VARCHAR(100),
        Admin BOOLEAN NOT NULL DEFAULT FALSE
    )";

    $sql_equipo = "CREATE TABLE IF NOT EXISTS Equipo (
        Id INT AUTO_INCREMENT PRIMARY KEY,
        Nombre VARCHAR(100),
        Foto VARCHAR(255)
    )";

    $sql_equipacion = "CREATE TABLE IF NOT EXISTS Equipacion (
        Id INT AUTO_INCREMENT PRIMARY KEY,
        Equipo_Id INT,
        Nombre_equipo VARCHAR(100),
        Nombre VARCHAR(100),
        Precio DECIMAL(10,2),
        Foto VARCHAR(255),
        FOREIGN KEY (Equipo_Id) REFERENCES Equipo(Id)
    )";

    $sql_camiseta = "CREATE TABLE IF NOT EXISTS Camiseta (
        Id INT AUTO_INCREMENT PRIMARY KEY,
        Equipo_Id INT,
        Equipacion_Id INT,
        Talla VARCHAR(10),
        Stock INT DEFAULT 0,
        FOREIGN KEY (Equipo_Id) REFERENCES Equipo(Id),
        FOREIGN KEY (Equipacion_Id) REFERENCES Equipacion(Id)
    )";

$sql_carrito = "CREATE TABLE IF NOT EXISTS Carrito (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Id_Usuario INT,
    Estado ENUM('Pendiente', 'Pagado', 'Completado') DEFAULT 'Pendiente',
    FOREIGN KEY (Id_Usuario) REFERENCES Usuarios(Id)
)";

$sql_detalle_carrito = "CREATE TABLE IF NOT EXISTS DetalleCarrito (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Carrito_Id INT,
    Camiseta_Id INT,
    Cantidad INT,
    Precio_Unitario DECIMAL(10, 2),
    Talla VARCHAR(10),
    FOREIGN KEY (Carrito_Id) REFERENCES Carrito(Id) ON DELETE CASCADE,
    FOREIGN KEY (Camiseta_Id) REFERENCES Camiseta(Id) ON DELETE CASCADE
)";

$sql_pedido = "CREATE TABLE IF NOT EXISTS Pedido (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Id_Carrito INT,
    Id_Usuario INT,
    Precio_Total DECIMAL(10, 2),
    Fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Estado ENUM('Pendiente', 'Pagado', 'Completado','Cancelado'),
    FOREIGN KEY (Id_Carrito) REFERENCES Carrito(Id),
    FOREIGN KEY (Id_Usuario) REFERENCES Usuarios(Id)
)";

    // Ejecutar las consultas de creación de tablas
    $bd->exec($sql_usuarios);
    $bd->exec($sql_equipo);
    $bd->exec($sql_equipacion);
    $bd->exec($sql_camiseta);
    $bd->exec($sql_carrito);
    $bd->exec($sql_detalle_carrito);
    $bd->exec($sql_pedido);

    echo "<p>Tablas creadas correctamente</p>";
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>
