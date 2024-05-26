<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $usuarioId = $_POST["usuarioId"];

    $dsn = "mysql:dbname=futwear;host=127.0.0.1";
    $usuarioBD = "root";
    $clave = "";

    try {
        $bd = new PDO($dsn, $usuarioBD, $clave);
        $bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Seleccionar los elementos del carrito para el usuario
        $sql = "SELECT dc.Id AS Id, c.Talla, c.Stock, eq.Nombre AS Equipacion, eq.Foto, eq.Precio, e.Nombre AS Equipo, dc.Cantidad, dc.Precio_Unitario, (dc.Cantidad * dc.Precio_Unitario) AS Precio_Total, dc.Carrito_Id
                FROM DetalleCarrito dc
                JOIN Carrito ca ON dc.Carrito_Id = ca.Id
                JOIN Camiseta c ON dc.Camiseta_Id = c.Id
                JOIN Equipacion eq ON c.Equipacion_Id = eq.Id
                JOIN Equipo e ON eq.Equipo_Id = e.Id
                WHERE ca.Id_Usuario = :usuarioId AND ca.Estado = 'Pendiente'";

        $stmt = $bd->prepare($sql);
        $stmt->bindParam(':usuarioId', $usuarioId);
        $stmt->execute();

        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($result) {
            echo json_encode(['status' => 'success', 'data' => $result]);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'No se encontraron items en el carrito.']);
        }
    } catch (PDOException $e) {
        echo json_encode(['status' => 'error', 'message' => 'Error al cargar el carrito: ' . $e->getMessage()]);
    }
}
?>
