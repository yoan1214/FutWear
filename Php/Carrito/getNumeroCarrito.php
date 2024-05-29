<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $usuarioId = $_POST["usuarioId"];

    $dsn = "mysql:dbname=futwear;host=127.0.0.1";
    $usuarioBD = "root";
    $clave = "";

    try {
        $bd = new PDO($dsn, $usuarioBD, $clave);
        $bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Contar el número total de elementos en el carrito para el usuario
        $sql = "SELECT SUM(dc.Cantidad) as numero
                FROM DetalleCarrito dc
                JOIN Carrito ca ON dc.Carrito_Id = ca.Id
                WHERE ca.Id_Usuario = :usuarioId AND ca.Estado = 'Pendiente'";

        $stmt = $bd->prepare($sql);
        $stmt->bindParam(':usuarioId', $usuarioId);
        $stmt->execute();

        $result = $stmt->fetch(PDO::FETCH_ASSOC);

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
