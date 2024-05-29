<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $usuarioId = $_POST["usuarioId"];
    $metodoPago = $_POST["metodoPago"];

    $dsn = "mysql:dbname=futwear;host=127.0.0.1";
    $usuarioBD = "root";
    $clave = "";

    try {
        $bd = new PDO($dsn, $usuarioBD, $clave);
        $bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $sql = "UPDATE Usuarios SET Método_de_Pago = :metodoPago WHERE Id = :usuarioId";
        $stmt = $bd->prepare($sql);
        $stmt->bindParam(':usuarioId', $usuarioId);
        $stmt->bindParam(':metodoPago', $metodoPago);

        if ($stmt->execute()) {
            echo 'Método de pago actualizado correctamente';
        } else {
            echo 'Error al actualizar el método de pago';
        }
    } catch (PDOException $e) {
        echo 'Error al actualizar el método de pago: ' . $e->getMessage();
    }
}
?>
