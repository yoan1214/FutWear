<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $correo = $_POST["correo"];
    $passw = $_POST["passw"];  
    $dsn = "mysql:dbname=futwear;host=127.0.0.1";
    $usuarioBD = "root";
    $clave = "";

    try {
        $bd = new PDO($dsn, $usuarioBD, $clave);
        $bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $sql = "SELECT Id, Nombre, Apellidos, Contraseña, Admin FROM Usuarios WHERE Correo = :correo LIMIT 1";
        $stmt = $bd->prepare($sql);
        $stmt->bindParam(':correo', $correo);
        $stmt->execute();
        $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($usuario && $usuario['Contraseña'] === $passw) {
            echo json_encode([
                "status" => "success",
                "usuarioId" => $usuario['Id'],
                "nombre" => $usuario['Nombre'],
                "apellidos" => $usuario['Apellidos'],
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
