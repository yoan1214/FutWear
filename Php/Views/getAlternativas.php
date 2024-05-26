<?php
$dsn = "mysql:dbname=futwear;host=127.0.0.1";
$usuarioBD = "root";
$clave = "";

try {
    // Crear conexión
    $conexion = new PDO($dsn, $usuarioBD, $clave);
    // Establecer el modo de error de PDO a excepción
    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Seleccionar las equipaciones  que no sean "Primera Equipación" o "Segunda Equipación"
    $sql = "SELECT * FROM Equipacion WHERE Nombre NOT IN ('Primera Equipación', 'Segunda Equipación')";
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
