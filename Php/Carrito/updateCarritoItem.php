<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $detalleCarritoId = $_POST["detalleCarritoId"];
    $cantidad = $_POST["cantidad"];
    $precioUnitario = $_POST["precioUnitario"];

    $dsn = "mysql:host=localhost;dbname=futwear";
    $usuarioBD = "root";
    $clave = "";

    try {
        $bd = new PDO($dsn, $usuarioBD, $clave);
        $bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Actualizar la cantidad en DetalleCarrito
        $sql = "UPDATE DetalleCarrito SET Cantidad = :cantidad WHERE Id = :detalleCarritoId";
        $stmt = $bd->prepare($sql);
        $stmt->bindParam(':cantidad', $cantidad);
        $stmt->bindParam(':detalleCarritoId', $detalleCarritoId);

        if ($stmt->execute()) {
            echo "Item actualizado correctamente";
        } else {
            echo "Error al actualizar el item";
        }
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
}
?>
