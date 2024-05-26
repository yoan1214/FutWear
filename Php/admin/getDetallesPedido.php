<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $pedidoId = $_POST["pedidoId"];

    $dsn = "mysql:host=localhost;dbname=futwear";
    $usuarioBD = "root";
    $clave = "";

    try {
        $bd = new PDO($dsn, $usuarioBD, $clave);
        $bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Obtener el carrito ID del pedido
        $sql = "SELECT Id_Carrito FROM Pedido WHERE Id = :pedidoId";
        $stmt = $bd->prepare($sql);
        $stmt->bindParam(':pedidoId', $pedidoId);
        $stmt->execute();
        $carritoId = $stmt->fetchColumn();

        if (!$carritoId) {
            echo json_encode(['status' => 'error', 'message' => 'Pedido no encontrado']);
            exit;
        }

        $sql = "SELECT dc.*, eq.Nombre AS Nombre_Equipacion, eq.Foto, e.Nombre AS Nombre_Equipo
                FROM DetalleCarrito dc
                JOIN Camiseta c ON dc.Camiseta_Id = c.Id
                JOIN Equipacion eq ON c.Equipacion_Id = eq.Id
                JOIN Equipo e ON eq.Equipo_Id = e.Id
                WHERE dc.Carrito_Id = :carritoId";
        $stmt = $bd->prepare($sql);
        $stmt->bindParam(':carritoId', $carritoId);
        $stmt->execute();
        $detalles = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($detalles) {
            echo json_encode(['status' => 'success', 'data' => $detalles]);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'No se encontraron detalles para el pedido.']);
        }
    } catch (PDOException $e) {
        echo json_encode(['status' => 'error', 'message' => 'Error al cargar los detalles del pedido: ' . $e->getMessage()]);
    }
}
?>
