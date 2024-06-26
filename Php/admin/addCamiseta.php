<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $equipoId = $_POST["equipoId"];
    $equipacionId = $_POST["equipacionId"];
    $talla = $_POST["tallaCamiseta"];
    $stock = $_POST["stockCamiseta"];

    $dsn = "mysql:host=localhost;dbname=futwear";
    $usuarioBD = "root";
    $clave = "";

    try {
        $bd = new PDO($dsn, $usuarioBD, $clave);
        $bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $sql = "INSERT INTO Camiseta (Equipo_Id, Equipacion_Id, Talla, Stock) VALUES (:equipoId, :equipacionId, :talla, :stock)";
        $stmt = $bd->prepare($sql);
        $stmt->bindParam(':equipoId', $equipoId);
        $stmt->bindParam(':equipacionId', $equipacionId);
        $stmt->bindParam(':talla', $talla);
        $stmt->bindParam(':stock', $stock);

        if ($stmt->execute()) {
            echo "Camiseta añadida correctamente";
        } else {
            echo "Error al añadir la camiseta";
        }
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
}
?>
