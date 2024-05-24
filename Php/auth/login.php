<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $correo = $_POST["correo"];
    $password = $_POST["password"];

    $dsn = "mysql:dbname=futwear;host=127.0.0.1";
    $usuarioBD = "root";
    $clave = ""; 

    try {
        $bd = new PDO($dsn, $usuarioBD, $clave);
        $bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $sql = "SELECT * FROM usuarios WHERE Correo = :correo AND Contraseña = :password";
        $stmt = $bd->prepare($sql);
        $stmt->execute([':correo' => $correo, ':password' => $password]);
        $count = $stmt->rowCount();

        if ($count == 1) {
            echo "success";
        } else {
            echo "Error de búsqueda";
        }
        $bd = null;
    } catch (PDOException $e) {
        echo "Falló la conexión: " . $e->getMessage();
    }
}
?>
