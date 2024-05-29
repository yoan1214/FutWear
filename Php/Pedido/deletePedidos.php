<?php
$dsn = "mysql:dbname=futwear;host=127.0.0.1";
$usuarioBD = "root";
$clave = "";

try {
    $conexion = new PDO($dsn, $usuarioBD, $clave);
    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Obtener el ID del pedido y el ID del usuario
    $pedidoId = $_POST['pedidoId'];
    $usuarioId = $_POST['usuarioId'];

    // Verificar si el pedido pertenece al usuario
    $sqlCheck = "SELECT * FROM Pedido WHERE Id = :pedidoId AND Id_Usuario = :usuarioId";
    $stmtCheck = $conexion->prepare($sqlCheck);
    $stmtCheck->bindParam(':pedidoId', $pedidoId, PDO::PARAM_INT);
    $stmtCheck->bindParam(':usuarioId', $usuarioId, PDO::PARAM_INT);
    $stmtCheck->execute();

    if ($stmtCheck->rowCount() > 0) {
        // Cambiar el estado del pedido a 'Cancelado'
        $sqlUpdate = "UPDATE Pedido SET Estado = 'Cancelado' WHERE Id = :pedidoId";
        $stmtUpdate = $conexion->prepare($sqlUpdate);
        $stmtUpdate->bindParam(':pedidoId', $pedidoId, PDO::PARAM_INT);
        $stmtUpdate->execute();

        if ($stmtUpdate->rowCount() > 0) {
            echo json_encode(['status' => 'success', 'message' => 'Pedido cancelado correctamente']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Error al cancelar el pedido']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Pedido no encontrado o no pertenece al usuario']);
    }

    $conexion = null;
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>
