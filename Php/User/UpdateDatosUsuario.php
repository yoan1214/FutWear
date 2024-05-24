<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST["email"];
    $telefono = $_POST["telefono"];
    $password = $_POST["password"];
    $direccion = $_POST["direccion"];
    $codigo_postal = $_POST["codigo_postal"];
    $provincia = $_POST["provincia"];
    $metodo_pago = $_POST["metodo_pago"];

    $dsn = "mysql:dbname=futwear;host=127.0.0.1";
    $usuarioBD = "root";
    $clave = "";

    try {
        $bd = new PDO($dsn, $usuarioBD, $clave);
        $bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        if (!empty($password)) {
            $password = password_hash($password, PASSWORD_DEFAULT);
            $sql = "UPDATE Usuarios SET Teléfono = :telefono, Contraseña = :password, Dirección = :direccion, Código_Postal = :codigo_postal, Provincia = :provincia, Método_de_Pago = :metodo_pago WHERE Correo = :correo";
            $stmt = $bd->prepare($sql);
            $stmt->bindParam(':password', $password);
        } else {
            $sql = "UPDATE Usuarios SET Teléfono = :telefono, Dirección = :direccion, Código_Postal = :codigo_postal, Provincia = :provincia, Método_de_Pago = :metodo_pago WHERE Correo = :correo";
            $stmt = $bd->prepare($sql);
        }

        $stmt->bindParam(':telefono', $telefono);
        $stmt->bindParam(':direccion', $direccion);
        $stmt->bindParam(':codigo_postal', $codigo_postal);
        $stmt->bindParam(':provincia', $provincia);
        $stmt->bindParam(':metodo_pago', $metodo_pago);
        $stmt->bindParam(':correo', $email);

        if ($stmt->execute()) {
            echo "Datos actualizados correctamente";
        } else {
            echo "Error al actualizar los datos";
        }
    } catch (PDOException $e) {
        echo "Falló la conexión: " . $e->getMessage();
    }
}
?>
