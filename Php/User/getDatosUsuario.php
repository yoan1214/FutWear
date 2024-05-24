<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST["email"];

    $dsn = "mysql:dbname=futwear;host=127.0.0.1";
    $usuarioBD = "root";
    $clave = "";

    try {
        $bd = new PDO($dsn, $usuarioBD, $clave);
        $bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $sql = "SELECT Nombre, Apellidos, Teléfono, Dirección, Código_Postal, Provincia, Método_de_Pago FROM Usuarios WHERE Correo = :correo";
        $stmt = $bd->prepare($sql);
        $stmt->bindParam(':correo', $email);
        $stmt->execute();

        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($user) {
            echo json_encode(['status' => 'success', 'data' => $user]);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Usuario no encontrado']);
        }
    } catch (PDOException $e) {
        echo json_encode(['status' => 'error', 'message' => 'Falló la conexión: ' . $e->getMessage()]);
    }
}
?>
