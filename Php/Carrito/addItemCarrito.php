<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Asegúrate de que todas las variables POST están definidas
    if (isset($_POST["usuarioId"]) && isset($_POST["camisetaId"]) && isset($_POST["cantidad"]) && isset($_POST["precioUnitario"]) && isset($_POST["talla"])) {
        $usuarioId = $_POST["usuarioId"];
        $camisetaId = $_POST["camisetaId"];
        $cantidad = $_POST["cantidad"];
        $precioUnitario = $_POST["precioUnitario"];
        $talla = $_POST["talla"];

        $dsn = "mysql:host=localhost;dbname=futwear";
        $usuarioBD = "root";
        $clave = "";

        try {
            $bd = new PDO($dsn, $usuarioBD, $clave);
            $bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            // Primero, verificar si ya existe un carrito para el usuario
            $sql = "SELECT Id FROM Carrito WHERE Id_Usuario = :usuarioId AND Estado = 'Pendiente' LIMIT 1";
            $stmt = $bd->prepare($sql);
            $stmt->bindParam(':usuarioId', $usuarioId);
            $stmt->execute();
            $carritoId = $stmt->fetchColumn();

            if (!$carritoId) {
                // Si no hay carrito activo, crear uno
                $sql = "INSERT INTO Carrito (Id_Usuario, Estado) VALUES (:usuarioId, 'Pendiente')";
                $stmt = $bd->prepare($sql);
                $stmt->bindParam(':usuarioId', $usuarioId);
                $stmt->execute();
                $carritoId = $bd->lastInsertId();
            }

            // Verificar si el item ya está en el carrito con la misma talla
            $sql = "SELECT * FROM DetalleCarrito WHERE Carrito_Id = :carritoId AND Camiseta_Id = :camisetaId AND Talla = :talla";
            $stmt = $bd->prepare($sql);
            $stmt->bindParam(':carritoId', $carritoId);
            $stmt->bindParam(':camisetaId', $camisetaId);
            $stmt->bindParam(':talla', $talla);
            $stmt->execute();
            $item = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($item) {
                // Si el item ya está en el carrito, actualizar la cantidad
                $sql = "UPDATE DetalleCarrito SET Cantidad = Cantidad + :cantidad WHERE Id = :id";
                $stmt = $bd->prepare($sql);
                $stmt->bindParam(':cantidad', $cantidad);
                $stmt->bindParam(':id', $item['Id']);
            } else {
                // Si el item no está en el carrito, insertarlo
                $sql = "INSERT INTO DetalleCarrito (Carrito_Id, Camiseta_Id, Cantidad, Precio_Unitario, Talla) VALUES (:carritoId, :camisetaId, :cantidad, :precioUnitario, :talla)";
                $stmt = $bd->prepare($sql);
                $stmt->bindParam(':carritoId', $carritoId);
                $stmt->bindParam(':camisetaId', $camisetaId);
                $stmt->bindParam(':cantidad', $cantidad);
                $stmt->bindParam(':precioUnitario', $precioUnitario);
                $stmt->bindParam(':talla', $talla);
            }

            if ($stmt->execute()) {
                echo "Item añadido al carrito correctamente";
            } else {
                echo "Error al añadir item al carrito";
            }
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
    } else {
        echo "Error: Falta uno o más parámetros.";
    }
}
?>
