<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $correo = $_POST["correo"];
    $passw = $_POST["passw"];  // La contraseña proporcionada por el usuario.

    $dsn = "mysql:dbname=futwear;host=127.0.0.1";
    $usuarioBD = "root";
    $clave = "";

    try {
        $bd = new PDO($dsn, $usuarioBD, $clave);
        $bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $sql = "SELECT Id, Contraseña, Admin FROM Usuarios WHERE Correo = :correo LIMIT 1";
        $stmt = $bd->prepare($sql);
        $stmt->bindParam(':correo', $correo);
        $stmt->execute();
        $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($usuario && password_verify($passw, $usuario['Contraseña'])) {
            echo json_encode([
                "status" => "success",
                "usuarioId" => $usuario['Id'],
                "isAdmin" => $usuario['Admin'] ? "1" : "0",
                "email" => $correo
            ]);
        } else {
            echo json_encode(["status" => "error", "message" => "Error de autenticación"]);
        }
        $bd = null;
    } catch (PDOException $e) {
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
    }
}
?>
