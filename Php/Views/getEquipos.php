<?php
$dsn = "mysql:dbname=futwear;host=127.0.0.1";
$usuarioBD = "root";
$clave = ""; 

try {
    // Crear conexión
    $conexion = new PDO($dsn, $usuarioBD, $clave);
    // Establecer el modo de error de PDO a excepción
    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $sql = "SELECT * FROM Equipo"; // Asegúrate de que el nombre de la tabla es correcto
    $stmt = $conexion->prepare($sql);
    $stmt->execute();

    // Recuperar todos los resultados en un array asociativo
    $equipos = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Cerrar la conexión
    $conexion = null;

    // Establecer el tipo de contenido a JSON
    header('Content-Type: application/json');
    // Devolver los resultados en formato JSON
    echo json_encode($equipos);
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>
