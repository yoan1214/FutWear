<?php
$dsn = "mysql:dbname=futwear;host=127.0.0.1";
$usuarioBD = "root";
$clave = "";

try {
    // Crear conexión
    $conexion = new PDO($dsn, $usuarioBD, $clave);
    // Establecer el modo de error de PDO a excepción
    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Seleccionar equipaciones cuya suma de stocks de todas las camisetas asociadas sea menor a 25
    $sql = "
        SELECT e.*, SUM(c.Stock) AS total_stock
        FROM Equipacion e
        LEFT JOIN Camiseta c ON e.Id = c.Equipacion_Id
        GROUP BY e.Id
        HAVING total_stock < 25
    ";
    $stmt = $conexion->prepare($sql);
    $stmt->execute();

    // Recuperar todos los resultados en un array asociativo
    $equipaciones = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Cerrar la conexión
    $conexion = null;

    // Establecer el tipo de contenido a JSON
    header('Content-Type: application/json');
    // Devolver los resultados en formato JSON
    echo json_encode($equipaciones);
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>
