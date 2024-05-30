<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $dsn = "mysql:host=localhost;dbname=futwear";
    $usuarioBD = "root";
    $clave = "";

    try {
        $bd = new PDO($dsn, $usuarioBD, $clave);
        $bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Actualiza la consulta para incluir los detalles del usuario
        $sql = "SELECT Pedido.Id, Pedido.Id_Usuario, Pedido.Fecha, Pedido.Precio_Total, Pedido.Estado, 
                       Usuarios.Nombre, Usuarios.Correo, Usuarios.Dirección
                FROM Pedido
                JOIN Usuarios ON Pedido.Id_Usuario = Usuarios.Id
                WHERE Pedido.Estado = 'Pagado'
                ORDER BY Pedido.Fecha DESC";
        $stmt = $bd->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode(['status' => 'success', 'data' => $result]);
    } catch (PDOException $e) {
        echo json_encode(['status' => 'error', 'message' => 'Error al cargar los pedidos: ' . $e->getMessage()]);
    }
}
?>
