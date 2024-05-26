<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    $dsn = "mysql:host=localhost;dbname=futwear";
    $usuarioBD = "root";
    $clave = "";

    try {
        $bd = new PDO($dsn, $usuarioBD, $clave);
        $bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        foreach ($data as $camiseta) {
            $sql = "UPDATE Camiseta SET Stock = :stock WHERE Id = :camisetaId";
            $stmt = $bd->prepare($sql);
            $stmt->bindParam(':stock', $camiseta['stock']);
            $stmt->bindParam(':camisetaId', $camiseta['camisetaId']);
            $stmt->execute();
        }

        echo "Camiseta actualizada correctamente";
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
}
?>
