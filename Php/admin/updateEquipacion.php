<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $equipacionId = $_POST["equipacionId"];
    $nuevoPrecio = $_POST["nuevoPrecio"];

    $dsn = "mysql:host=localhost;dbname=futwear";
    $usuarioBD = "root";
    $clave = "";

    try {
        $bd = new PDO($dsn, $usuarioBD, $clave);
        $bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $sql = "UPDATE Equipacion SET Precio = :nuevoPrecio WHERE Id = :equipacionId";
        $stmt = $bd->prepare($sql);
        $stmt->bindParam(':nuevoPrecio', $nuevoPrecio);
        $stmt->bindParam(':equipacionId', $equipacionId);

        if ($stmt->execute()) {
            echo "Equipación actualizada correctamente";
        } else {
            echo "Error al actualizar la equipación";
        }
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
}
?>
