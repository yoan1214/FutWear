<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $equipoId = $_POST['equipoId'];
    $nombreEquipacion = $_POST['nombreEquipacion'];
    $precioEquipacion = $_POST['precioEquipacion'];
    $fotoEquipacion = $_FILES['fotoEquipacion'];

    $targetDir = "../../Images/Equipaciones/";
    $relativeDir = "../Images/Equipaciones/";
    if (!is_dir($targetDir)) {
        mkdir($targetDir, 0777, true);
    }
    $targetFile = $targetDir . basename($fotoEquipacion["name"]);
    $relativeFile = $relativeDir . basename($fotoEquipacion["name"]);
    $imageFileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));

    // Verificar si el archivo es una imagen
    $check = getimagesize($fotoEquipacion["tmp_name"]);
    if ($check === false) {
        echo "El archivo no es una imagen.";
        exit;
    }

    // Mover el archivo a la carpeta de destino
    if (!move_uploaded_file($fotoEquipacion["tmp_name"], $targetFile)) {
        echo "Error al subir la imagen.";
        exit;
    }

    $dsn = "mysql:host=localhost;dbname=futwear";
    $usuarioBD = "root";
    $clave = "";

    try {
        $bd = new PDO($dsn, $usuarioBD, $clave);
        $bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $sql = "INSERT INTO Equipacion (Equipo_Id, Nombre_equipo, Nombre, Precio, Foto) VALUES (:equipoId, (SELECT Nombre FROM Equipo WHERE Id = :equipoId), :nombreEquipacion, :precioEquipacion, :fotoEquipacion)";
        $stmt = $bd->prepare($sql);
        $stmt->bindParam(':equipoId', $equipoId);
        $stmt->bindParam(':nombreEquipacion', $nombreEquipacion);
        $stmt->bindParam(':precioEquipacion', $precioEquipacion);
        $stmt->bindParam(':fotoEquipacion', $relativeFile); // Guardar la ruta relativa

        if ($stmt->execute()) {
            echo "Equipación añadida correctamente";
        } else {
            echo "Error al añadir la equipación.";
        }
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
}
?>
