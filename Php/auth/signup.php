<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $dsn = "mysql:dbname=futwear;host=127.0.0.1";
    $usuarioBD = "root";
    $clave = ""; 

    $nombre = $_POST["nombre"];
    $apellidos = $_POST["apellidos"];
    $correo = $_POST["correo"];
    $passw = password_hash($_POST["passw"], PASSWORD_DEFAULT); // Hasheo de la contraseña
    $sexo = $_POST["sexo"];
    $telefono = $_POST["telefono"];
    $direccion = $_POST["direccion"];
    $codigo_postal = $_POST["codigo_postal"];
    $provincia = $_POST["provincia"];
    $metodo_pago = $_POST["metodo_pago"];

    try {

        $bd = new PDO($dsn, $usuarioBD, $clave);

        $bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $sql = "INSERT INTO Usuarios (Nombre, Apellidos, Correo, Contraseña, Sexo, Teléfono, Dirección, Código_Postal, Provincia, Método_de_Pago, Admin) 
        VALUES (:nombre, :apellidos, :correo, :passw, :sexo, :telefono, :direccion, :codigo_postal, :provincia, :metodo_pago, false)";

$stmt = $bd->prepare($sql);
$stmt->bindParam(':nombre', $nombre);
$stmt->bindParam(':apellidos', $apellidos);
$stmt->bindParam(':correo', $correo);
$stmt->bindParam(':passw', $passw);
$stmt->bindParam(':sexo', $sexo);
$stmt->bindParam(':telefono', $telefono);
$stmt->bindParam(':direccion', $direccion);
$stmt->bindParam(':codigo_postal', $codigo_postal);
$stmt->bindParam(':provincia', $provincia);
$stmt->bindParam(':metodo_pago', $metodo_pago);


if ($stmt->execute()) {
    echo "Usuario registrado correctamente";  // Esta respuesta se maneja en el JS
} else {
    echo "El usuario no se ha registrado";  // Cualquier fallo devuelve esta respuesta
}

    } catch (PDOException $e) {
        if ($e->getCode() == 23000) { // Código de error para duplicados
            echo "El correo electrónico ya está registrado.";
        } else {
            echo "Error en la base de datos: " . $e->getMessage();
        }
}
}
?>
