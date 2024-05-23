<?php
$dsn = "mysql:dbname=futwear;host=127.0.0.1";
$usuarioBD = "root";
$clave = "";

try {
    // Crear conexión
    $conexion = new PDO($dsn, $usuarioBD, $clave);
    // Establecer el modo de error de PDO a excepción
    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Seleccionar las 10 equipaciones más recientes
    $sql = "SELECT e.*
    FROM Equipacion e
    INNER JOIN (
        SELECT MAX(Id) AS Id
        FROM Equipacion
        GROUP BY Equipo_Id
        ORDER BY MAX(Id) DESC
        LIMIT 5
    ) sub ON e.Id = sub.Id;";
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
