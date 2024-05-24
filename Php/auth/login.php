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

        // Obtener la contraseña hasheada y el estado de administrador basado en el correo.
        $sql = "SELECT Contraseña, Admin FROM usuarios WHERE Correo = :correo";
        $stmt = $bd->prepare($sql);
        $stmt->bindParam(':correo', $correo);
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($passw, $user['Contraseña'])) {
            $isAdmin = $user['Admin'] ? "1" : "0";  // Convertir booleano a cadena para simplificar el manejo en JS
            echo json_encode(["status" => "success", "isAdmin" => $isAdmin, "email" => $correo]);
        } else {
            echo json_encode(["status" => "error", "message" => "Error de autenticación"]);
        }
    } catch (PDOException $e) {
        echo json_encode(["status" => "error", "message" => "Falló la conexión: " . $e->getMessage()]);
    }
}
?>
