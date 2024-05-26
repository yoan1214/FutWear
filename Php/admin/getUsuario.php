<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $usuarioId = $_POST["usuarioId"];

    $dsn = "mysql:host=localhost;dbname=futwear";
    $usuarioBD = "root";
    $clave = "";

    try {
        $bd = new PDO($dsn, $usuarioBD, $clave);
        $bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $sql = "SELECT Id, Nombre, Apellidos, Correo, Teléfono, Dirección, Código_Postal, Provincia, Método_de_Pago, Admin FROM Usuarios WHERE Id = :usuarioId";
        $stmt = $bd->prepare($sql);
        $stmt->bindParam(':usuarioId', $usuarioId);
        $stmt->execute();
        $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($usuario) {
            echo json_encode(['status' => 'success', 'data' => $usuario]);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Usuario no encontrado']);
        }
    } catch (PDOException $e) {
        echo json_encode(['status' => 'error', 'message' => 'Error al obtener el usuario: ' . $e->getMessage()]);
    }
}
?>
