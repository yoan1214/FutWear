<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $usuarioId = $_POST["usuarioId"];

    $dsn = "mysql:host=localhost;dbname=futwear";
    $usuarioBD = "root";
    $clave = "";

    try {
        $bd = new PDO($dsn, $usuarioBD, $clave);
        $bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Actualizar el estado del carrito a 'En proceso'
        $sql = "UPDATE Carrito SET Estado = 'En proceso' WHERE Id_Usuario = :usuarioId AND Estado = 'Pendiente'";
        $stmt = $bd->prepare($sql);
        $stmt->bindParam(':usuarioId', $usuarioId);
        $stmt->execute();

        // Obtener el ID del carrito actualizado
        $sql = "SELECT Id FROM Carrito WHERE Id_Usuario = :usuarioId AND Estado = 'En proceso' ORDER BY Id DESC LIMIT 1";
        $stmt = $bd->prepare($sql);
        $stmt->bindParam(':usuarioId', $usuarioId);
        $stmt->execute();
        $carritoId = $stmt->fetchColumn();

        // Calcular el precio total del carrito
        $sql = "SELECT SUM(Cantidad * Precio_Unitario) AS Precio_Total FROM DetalleCarrito WHERE Carrito_Id = :carritoId";
        $stmt = $bd->prepare($sql);
        $stmt->bindParam(':carritoId', $carritoId);
        $stmt->execute();
        $precioTotal = $stmt->fetchColumn();

        // Insertar en la tabla Pedido
        $sql = "INSERT INTO Pedido (Id_Carrito, Id_Usuario, Precio_Total, Estado) VALUES (:carritoId, :usuarioId, :precioTotal, 'En proceso')";
        $stmt = $bd->prepare($sql);
        $stmt->bindParam(':carritoId', $carritoId);
        $stmt->bindParam(':usuarioId', $usuarioId);
        $stmt->bindParam(':precioTotal', $precioTotal);
        $stmt->execute();

        // Obtener los detalles del carrito para actualizar el stock
        $sql = "SELECT Camiseta_Id, Cantidad FROM DetalleCarrito WHERE Carrito_Id = :carritoId";
        $stmt = $bd->prepare($sql);
        $stmt->bindParam(':carritoId', $carritoId);
        $stmt->execute();
        $detallesCarrito = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Actualizar el stock de cada camiseta
        foreach ($detallesCarrito as $detalle) {
            $sql = "UPDATE Camiseta SET Stock = Stock - :cantidad WHERE Id = :camisetaId";
            $stmt = $bd->prepare($sql);
            $stmt->bindParam(':cantidad', $detalle['Cantidad']);
            $stmt->bindParam(':camisetaId', $detalle['Camiseta_Id']);
            $stmt->execute();
        }

        echo "Compra finalizada correctamente";
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
}
?>
