<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $equipacionId = $_POST["equipacionId"];

    $dsn = "mysql:host=localhost;dbname=futwear";
    $usuarioBD = "root";
    $clave = "";

    try {
        $bd = new PDO($dsn, $usuarioBD, $clave);
        $bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Comenzar la transacción
        $bd->beginTransaction();

        // Eliminar las camisetas asociadas a la equipación
        $sql = "DELETE FROM Camiseta WHERE Equipacion_Id = :equipacionId";
        $stmt = $bd->prepare($sql);
        $stmt->bindParam(':equipacionId', $equipacionId);
        $stmt->execute();

        // Eliminar la equipación
        $sql = "DELETE FROM Equipacion WHERE Id = :equipacionId";
        $stmt = $bd->prepare($sql);
        $stmt->bindParam(':equipacionId', $equipacionId);
        $stmt->execute();

        // Confirmar la transacción
        $bd->commit();

        echo "Equipación y camisetas eliminadas correctamente";
    } catch (PDOException $e) {
        // Revertir la transacción si ocurre un error
        $bd->rollBack();
        echo "Error: " . $e->getMessage();
    }
}
?>
