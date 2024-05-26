<?php
$dsn = "mysql:host=localhost;dbname=futwear";
$usuarioBD = "root";
$clave = "";

try {
    $bd = new PDO($dsn, $usuarioBD, $clave);
    $bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "SELECT eq.Id, eq.Equipo_Id, e.Nombre AS Nombre_Equipo, eq.Nombre AS Nombre_Equipacion, eq.Precio, eq.Foto
            FROM Equipacion eq
            JOIN Equipo e ON eq.Equipo_Id = e.Id";
    $stmt = $bd->prepare($sql);
    $stmt->execute();
    $equipaciones = $stmt->fetchAll(PDO::FETCH_ASSOC);

    foreach ($equipaciones as &$equipacion) {
        $sql = "SELECT c.Id, c.Talla, c.Stock
                FROM Camiseta c
                WHERE c.Equipacion_Id = :equipacionId";
        $stmt = $bd->prepare($sql);
        $stmt->bindParam(':equipacionId', $equipacion['Id']);
        $stmt->execute();
        $equipacion['Camisetas'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    echo json_encode(['status' => 'success', 'data' => $equipaciones]);
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Error al cargar las equipaciones: ' . $e->getMessage()]);
}
?>
