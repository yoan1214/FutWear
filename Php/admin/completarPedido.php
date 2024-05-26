<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $pedidoId = $_POST["pedidoId"];

    $dsn = "mysql:host=localhost;dbname=futwear";
    $usuarioBD = "root";
    $clave = "";

    try {
        $bd = new PDO($dsn, $usuarioBD, $clave);
        $bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $sql = "UPDATE Pedido SET Estado = 'Completado' WHERE Id = :pedidoId";
        $stmt = $bd->prepare($sql);
        $stmt->bindParam(':pedidoId', $pedidoId);

        if ($stmt->execute()) {
            echo "Pedido completado correctamente";
        } else {
            echo "Error al completar el pedido";
        }
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
}
?>
