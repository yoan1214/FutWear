<?php
$dsn = "mysql:dbname=futwear;host=127.0.0.1";
$usuarioBD = "root";
$clave = "";

try {
    // Crear conexión
    $conexion = new PDO($dsn, $usuarioBD, $clave);
    // Establecer el modo de error de PDO a excepción
    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $equipo = $_GET['equipo'];
    $equipacion = $_GET['equipacion'];

    $sql = "SELECT c.Id AS CamisetaId, e.Nombre AS Equipo, eq.Nombre AS Equipacion, eq.Foto, eq.Precio, c.Talla, c.Stock 
            FROM Equipacion eq
            JOIN Equipo e ON eq.Equipo_Id = e.Id
            JOIN Camiseta c ON c.Equipacion_Id = eq.Id
            WHERE e.Nombre = :equipo AND eq.Nombre = :equipacion";

    $stmt = $conexion->prepare($sql);
    $stmt->bindParam(':equipo', $equipo);
    $stmt->bindParam(':equipacion', $equipacion);
    $stmt->execute();

    // Recuperar todos los resultados en un array asociativo
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Cerrar la conexión
    $conexion = null;

    // Establecer el tipo de contenido a JSON
    header('Content-Type: application/json');
    // Devolver los resultados en formato JSON
    echo json_encode($result);
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>
