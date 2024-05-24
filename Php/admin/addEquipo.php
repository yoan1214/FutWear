<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $dsn = "mysql:dbname=futwear;host=127.0.0.1";
    $usuarioBD = "root";
    $clave = ""; 

    try {
        $nombreEquipo = $_POST["nombre"];
        $foto = $_FILES["foto"]["name"];
        $temp_file = $_FILES["foto"]["tmp_name"];
        $directorio_destino = "../Images/Equipo/";
        move_uploaded_file($temp_file, $directorio_destino . $foto);
        $bd = new PDO($dsn, $usuarioBD, $clave);

        $sql = "INSERT INTO Equipo (Nombre, Foto) VALUES (:nombreEquipo, :foto)";
        $stmt = $bd->prepare($sql);

        $stmt->bindParam(':nombreEquipo', $nombreEquipo);
        $stmt->bindParam(':foto', $foto);
        
        if ($stmt->execute()) {
            header("Location: ../html/index.html");
            exit(); 
        } else {
            echo "Error al insertar el equipo en la base de datos";
        }
    } catch (PDOException $e) {
        echo "Falló la conexión: " . $e->getMessage();
    }
}
?>
