<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $detalleCarritoId = $_POST["detalleCarritoId"];

    $dsn = "mysql:host=localhost;dbname=futwear";
    $usuarioBD = "root";
    $clave = "";

    try {
        $bd = new PDO($dsn, $usuarioBD, $clave);
        $bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Eliminar el item del carrito
        $sql = "DELETE FROM DetalleCarrito WHERE Id = :detalleCarritoId";
        $stmt = $bd->prepare($sql);
        $stmt->bindParam(':detalleCarritoId', $detalleCarritoId);

        if ($stmt->execute()) {
            echo "Item eliminado del carrito correctamente";
        } else {
            echo "Error al eliminar el item";
        }
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
}
?>
