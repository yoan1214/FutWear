<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $usuarioId = $_POST["usuarioId"];

    $dsn = "mysql:host=localhost;dbname=futwear";
    $usuarioBD = "root";
    $clave = "";

    try {
        $bd = new PDO($dsn, $usuarioBD, $clave);
        $bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $sql = "SELECT Id, Fecha, Precio_Total, Estado FROM Pedido WHERE Id_Usuario = :usuarioId ORDER BY Fecha DESC";
        $stmt = $bd->prepare($sql);
        $stmt->bindParam(':usuarioId', $usuarioId);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode(['status' => 'success', 'data' => $result]);
    } catch (PDOException $e) {
        echo json_encode(['status' => 'error', 'message' => 'Error al cargar los pedidos: ' . $e->getMessage()]);
    }
}
?>
