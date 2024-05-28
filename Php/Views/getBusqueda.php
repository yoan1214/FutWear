<?php
if (isset($_GET['query'])) {
    $query = $_GET['query'];
    
    $dsn = "mysql:dbname=futwear;host=127.0.0.1";
    $usuarioBD = "root";
    $clave = "";

    try {
        $bd = new PDO($dsn, $usuarioBD, $clave);
        $bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $sql = "SELECT * FROM Equipacion WHERE Nombre_equipo LIKE :query";
        $stmt = $bd->prepare($sql);
        $searchTerm = "%" . $query . "%";
        $stmt->bindParam(':query', $searchTerm, PDO::PARAM_STR);
        $stmt->execute();

        $resultados = $stmt->fetchAll(PDO::FETCH_ASSOC);

        header('Content-Type: application/json');
        echo json_encode(['status' => 'success', 'data' => $resultados]);
    } catch (PDOException $e) {
        echo json_encode(['status' => 'error', 'message' => 'Error en la búsqueda: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'No se proporcionó una consulta de búsqueda.']);
}
?>
