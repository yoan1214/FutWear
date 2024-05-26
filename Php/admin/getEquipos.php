<?php
$dsn = "mysql:host=localhost;dbname=futwear";
$usuarioBD = "root";
$clave = "";

try {
    $bd = new PDO($dsn, $usuarioBD, $clave);
    $bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "SELECT Id, Nombre FROM Equipo ORDER BY nombre ASC";
    $stmt = $bd->prepare($sql);
    $stmt->execute();
    $equipos = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['status' => 'success', 'data' => $equipos]);
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Error al cargar los equipos: ' . $e->getMessage()]);
}
?>
