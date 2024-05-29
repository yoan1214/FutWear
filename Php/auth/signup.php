<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $dsn = "mysql:dbname=futwear;host=127.0.0.1";
    $usuarioBD = "root";
    $clave = ""; 

    $nombre = $_POST["nombre"];
    $apellidos = $_POST["apellidos"];
    $correo = $_POST["correo"];
    $passw = $_POST["passw"]; // Hasheo de la contraseña
    $sexo = $_POST["sexo"];
    $telefono = $_POST["telefono"];
    $direccion = $_POST["direccion"];
    $codigo_postal = $_POST["codigo_postal"];
    $provincia = $_POST["provincia"];

    try {
        $bd = new PDO($dsn, $usuarioBD, $clave);
        $bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $sql = "INSERT INTO Usuarios (Nombre, Apellidos, Correo, Contraseña, Sexo, Teléfono, Dirección, Código_Postal, Provincia, Admin) 
                VALUES (:nombre, :apellidos, :correo, :passw, :sexo, :telefono, :direccion, :codigo_postal, :provincia, false)";
        
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

        if ($stmt->execute()) {
            $usuarioId = $bd->lastInsertId();
            echo json_encode([
                "status" => "success",
                "message" => "Usuario registrado correctamente",
                "usuarioId" => $usuarioId
            ]);
        } else {
            echo json_encode(["status" => "error", "message" => "El usuario no se ha registrado"]);
        }
    } catch (PDOException $e) {
        if ($e->getCode() == 23000) { // Código de error para duplicados
            echo json_encode(["status" => "error", "message" => "El correo electrónico ya está registrado."]);
        } else {
            echo json_encode(["status" => "error", "message" => "Error en la base de datos: " . $e->getMessage()]);
        }
    }
}
?>
