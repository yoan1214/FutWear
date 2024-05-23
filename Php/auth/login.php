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

        $sql = "SELECT * from usuarios u where u.Correo=\"$correo\" and u.Contraseña=\"$password\"; ";
        $resultado = $bd->query($sql);
        $count = $resultado->rowCount();
        

        if ($count == 1) {
            $usuario=$resultado->fetch();
            header("Location: ../html/index.html");
        } else {
            echo "Error de búsqueda";
        }
        $bd = null;
    } catch (PDOException $e) {
        echo "Falló la conexión: " . $e->getMessage();
    }
}
?>
