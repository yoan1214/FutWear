<?php
$dsn = "mysql:dbname=futwear;host=127.0.0.1";
$usuarioBD = "root";
$clave = "";

try {
    $conexion = new PDO($dsn, $usuarioBD, $clave);
    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Obtener el ID del pedido a cancelar
    $pedidoId = $_POST['pedidoId'];

    // Cambiar el estado del pedido a 'Cancelado'
    $sql = "UPDATE Pedido SET Estado = 'Cancelado' WHERE Id = :pedidoId";
    $stmt = $conexion->prepare($sql);
    $stmt->bindParam(':pedidoId', $pedidoId, PDO::PARAM_INT);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        echo "Pedido cancelado correctamente";
    } else {
        echo "Error: No se pudo cancelar el pedido";
    }

    $conexion = null;
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>
