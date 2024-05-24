<?php
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["nombre_equipo"])) {
    $dsn = "mysql:dbname=futwear;host=127.0.0.1";
    $usuarioBD = "root";
    $clave = ""; 

    try {
        $nombre_equipo = $_POST["nombre_equipo"];
        
        // Crear la conexión PDO
        $bd = new PDO($dsn, $usuarioBD, $clave);

        // Preparar la consulta SQL DELETE
        $sql = "DELETE FROM Equipo WHERE Nombre = :nombre_equipo";
        $stmt = $bd->prepare($sql);

        // Asignar valor al parámetro de la consulta
        $stmt->bindParam(':nombre_equipo', $nombre_equipo);
        
        // Ejecutar la consulta
        if ($stmt->execute()) {
            echo "El equipo '$nombre_equipo' ha sido eliminado correctamente.";
        } else {
            echo "Error al eliminar el equipo '$nombre_equipo'.";
        }
    } catch (PDOException $e) {
        echo "Falló la conexión: " . $e->getMessage();
    }
}
?>
