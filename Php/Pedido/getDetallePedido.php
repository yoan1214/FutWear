<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $pedidoId = $_POST["pedidoId"];

    $dsn = "mysql:host=localhost;dbname=futwear";
    $usuarioBD = "root";
    $clave = "";

    try {
        $bd = new PDO($dsn, $usuarioBD, $clave);
        $bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $sql = "SELECT dc.*, eq.Nombre AS Nombre_Equipacion, eq.Foto, e.Nombre AS Nombre_Equipo
                FROM DetalleCarrito dc
                JOIN Carrito ca ON dc.Carrito_Id = ca.Id
                JOIN Camiseta c ON dc.Camiseta_Id = c.Id
                JOIN Equipacion eq ON c.Equipacion_Id = eq.Id
                JOIN Equipo e ON eq.Equipo_Id = e.Id
                WHERE ca.Id = :pedidoId";
        $stmt = $bd->prepare($sql);
        $stmt->bindParam(':pedidoId', $pedidoId);
        $stmt->execute();

        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($result) {
            echo json_encode(['status' => 'success', 'data' => $result]);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'No se encontraron detalles para el pedido.']);
        }
    } catch (PDOException $e) {
        echo json_encode(['status' => 'error', 'message' => 'Error: ' . $e->getMessage()]);
    }
}
?>
