<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $usuarioId = $_POST["usuarioId"];
    $nombre = $_POST["nombre"];
    $apellidos = $_POST["apellidos"];
    $correo = $_POST["correo"];
    $telefono = $_POST["telefono"];
    $direccion = $_POST["direccion"];
    $codigoPostal = $_POST["codigo_postal"];
    $provincia = $_POST["provincia"];
    $metodoPago = $_POST["metodo_pago"];
    $admin = $_POST["admin"];

    $dsn = "mysql:host=localhost;dbname=futwear";
    $usuarioBD = "root";
    $clave = "";

    try {
        $bd = new PDO($dsn, $usuarioBD, $clave);
        $bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $sql = "UPDATE Usuarios SET Nombre = :nombre, Apellidos = :apellidos, Correo = :correo, Teléfono = :telefono, Dirección = :direccion, Código_Postal = :codigoPostal, Provincia = :provincia, Método_de_Pago = :metodoPago, Admin = :admin WHERE Id = :usuarioId";
        $stmt = $bd->prepare($sql);
        $stmt->bindParam(':nombre', $nombre);
        $stmt->bindParam(':apellidos', $apellidos);
        $stmt->bindParam(':correo', $correo);
        $stmt->bindParam(':telefono', $telefono);
        $stmt->bindParam(':direccion', $direccion);
        $stmt->bindParam(':codigoPostal', $codigoPostal);
        $stmt->bindParam(':provincia', $provincia);
        $stmt->bindParam(':metodoPago', $metodoPago);
        $stmt->bindParam(':admin', $admin);
        $stmt->bindParam(':usuarioId', $usuarioId);

        if ($stmt->execute()) {
            echo "Usuario actualizado correctamente";
        } else {
            echo "Error al actualizar el usuario";
        }
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
}
?>
