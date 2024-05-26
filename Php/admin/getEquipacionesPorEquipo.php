<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $equipoId = $_POST['equipoId'];

    $dsn = "mysql:host=localhost;dbname=futwear";
    $usuarioBD = "root";
    $clave = "";

    try {
        $bd = new PDO($dsn, $usuarioBD, $clave);
        $bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $sql = "SELECT Id, Nombre FROM Equipacion WHERE Equipo_Id = :equipoId";
        $stmt = $bd->prepare($sql);
        $stmt->bindParam(':equipoId', $equipoId);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode(['status' => 'success', 'data' => $result]);
    } catch (PDOException $e) {
        echo json_encode(['status' => 'error', 'message' => 'Error al cargar las equipaciones: ' . $e->getMessage()]);
    }
}
?>
