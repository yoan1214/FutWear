<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombreEquipo = $_POST['nombreEquipo'];
    $fotoEquipo = $_FILES['fotoEquipo'];

    $targetDir = "../../Images/Equipo/";
    $relativeDir = "../Images/Equipo/";
    if (!is_dir($targetDir)) {
        mkdir($targetDir, 0777, true);
    }
    $targetFile = $targetDir . basename($fotoEquipo["name"]);
    $relativeFile = $relativeDir . basename($fotoEquipo["name"]);
    $imageFileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));

    // Verificar si el archivo es una imagen
    $check = getimagesize($fotoEquipo["tmp_name"]);
    if ($check === false) {
        echo "El archivo no es una imagen.";
        exit;
    }

    // Mover el archivo a la carpeta de destino
    if (!move_uploaded_file($fotoEquipo["tmp_name"], $targetFile)) {
        echo "Error al subir la imagen.";
        exit;
    }

    $dsn = "mysql:host=localhost;dbname=futwear";
    $usuarioBD = "root";
    $clave = "";

    try {
        $bd = new PDO($dsn, $usuarioBD, $clave);
        $bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $sql = "INSERT INTO Equipo (Nombre, Foto) VALUES (:nombreEquipo, :fotoEquipo)";
        $stmt = $bd->prepare($sql);
        $stmt->bindParam(':nombreEquipo', $nombreEquipo);
        $stmt->bindParam(':fotoEquipo', $relativeFile);  // Guardar la ruta relativa

        if ($stmt->execute()) {
            echo "Equipo añadido correctamente";
        } else {
            echo "Error al añadir el equipo.";
        }
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
}
?>
