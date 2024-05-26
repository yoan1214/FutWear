<?php
$dsn = "mysql:dbname=futwear;host=127.0.0.1";
$usuario = "root";
$clave = "";
try {
    // Create the PDO connection
    $pdo = new PDO($dsn, $usuario, $clave);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Connected to the database 'futwear' successfully.<br>";
    // array de equipos
    $equipos = array(
        "AcMilan" => "../Images/Equipo/AcMilan.png",
        "Arsenal" => "../Images/Equipo/Arsenal.png",
        "AstonVilla" => "../Images/Equipo/AstonVilla.png",
        "AtleticoMadrid" => "../Images/Equipo/AtleticoMadrid.png",
        "Barcelona" => "../Images/Equipo/Barcelona.png",
        "Bayern" => "../Images/Equipo/Bayern.png",
        "Betis" => "../Images/Equipo/Betis.png",
        "Bilbao" => "../Images/Equipo/Bilbao.png",
        "Chelsea" => "../Images/Equipo/Chelsea.png",
        "Dortmunt" => "../Images/Equipo/Dortmunt.png",
        "Girona" => "../Images/Equipo/Girona.png",
        "InterMilan" => "../Images/Equipo/InterMilan.png",
        "Juventus" => "../Images/Equipo/Juventus.png",
        "Lazio" => "../Images/Equipo/Lazio.png",
        "Leverkusen" => "../Images/Equipo/Leverkusen.png",
        "Liverpool" => "../Images/Equipo/Liverpool.png",
        "Madrid" => "../Images/Equipo/Madrid.png",
        "ManUnited" => "../Images/Equipo/ManUnited.png",
        "Newcastle" => "../Images/Equipo/Newcastle.png",
        "Oviedo" => "../Images/Equipo/Oviedo.png",
        "Psg" => "../Images/Equipo/Psg.png",
        "RealSociedad" => "../Images/Equipo/RealSociedad.png",
        "Roma" => "../Images/Equipo/Roma.png",
        "Sevilla" => "../Images/Equipo/Sevilla.png",
        "Sporting" => "../Images/Equipo/Sporting.png",
        "Tottenham" => "../Images/Equipo/Tottenham.png",
        "Valencia" => "../Images/Equipo/Valencia.png",
        "Villareal" => "../Images/Equipo/Villareal.png",
        "ManCity" => "../Images/Equipo/ManCity.png"
    );

    // array equipaciones
    $equipaciones = array(
        "AcMilan" => array(
            "Primera Equipación" => array(
                "Foto" => "../Images/Equipaciones/acMilan1.jpg",
            ),
            "Segunda Equipación" => array(
                "Foto" => "../Images/Equipaciones/acMilan2.jpg",
            ),
        ),
        "Arsenal" => array(
            "Primera Equipación" => array(
                "Foto" => "../Images/Equipaciones/arsenal1.jpg",
            ),
            "Segunda Equipación" => array(
                "Foto" => "../Images/Equipaciones/arsenal2.jpg",
            ),
        ),
        "AstonVilla" => array(
            "Primera Equipación" => array(
                "Foto" => "../Images/Equipaciones/astonVilla1.jpg",
            ),
            "Segunda Equipación" => array(
                "Foto" => "../Images/Equipaciones/astonVilla2.jpg",
            ),
        ),
        "AtleticoMadrid" => array(
            "Primera Equipación" => array(
                "Foto" => "../Images/Equipaciones/atleticoMadrid1.jpg",
            ),
            "Segunda Equipación" => array(
                "Foto" => "../Images/Equipaciones/atleticoMadrid2.jpg",
            ),
        ),
        "Barcelona" => array(
            "Primera Equipación" => array(
                "Foto" => "../Images/Equipaciones/barcelona1.jpg",
            ),
            "Segunda Equipación" => array(
                "Foto" => "../Images/Equipaciones/barcelona2.jpg",
            ),
            "Tercera Equipación" => array(
                "Foto" => "../Images/Equipaciones/barcelona3.jpg",
            ),
        ),
        "Bayern" => array(
            "Primera Equipación" => array(
                "Foto" => "../Images/Equipaciones/bayern1.jpg",
            ),
            "Segunda Equipación" => array(
                "Foto" => "../Images/Equipaciones/bayern2.jpg",
            ),
        ),
        "Betis" => array(
            "Primera Equipación" => array(
                "Foto" => "../Images/Equipaciones/betis1.jpg",
            ),
        ),
        "Bilbao" => array(
            "Primera Equipación" => array(
                "Foto" => "../Images/Equipaciones/bilbao1.jpg",
            ),
        ),
        "Chelsea" => array(
            "Primera Equipación" => array(
                "Foto" => "../Images/Equipaciones/chelsea1.jpg",
            ),
            "Segunda Equipación" => array(
                "Foto" => "../Images/Equipaciones/chelsea2.jpg",
            ),
        ),
        "Dortmunt" => array(
            "Primera Equipación" => array(
                "Foto" => "../Images/Equipaciones/dortmund1.jpg",
            ),
            "Segunda Equipación" => array(
                "Foto" => "../Images/Equipaciones/dortmund2.jpg",
            ),
        ),
        "Girona" => array(
            "Primera Equipación" => array(
                "Foto" => "../Images/Equipaciones/girona1.jpg",
            ),
            "Segunda Equipación" => array(
                "Foto" => "../Images/Equipaciones/girona2.jpg",
            ),
        ),
        "InterMilan" => array(
            "Primera Equipación" => array(
                "Foto" => "../Images/Equipaciones/interMilan1.jpg",
            ),
            "Segunda Equipación" => array(
                "Foto" => "../Images/Equipaciones/interMilan2.jpg",
            ),
        ),
        "Juventus" => array(
            "Primera Equipación" => array(
                "Foto" => "../Images/Equipaciones/juventus1.jpg",
            ),
            "Segunda Equipación" => array(
                "Foto" => "../Images/Equipaciones/juventus2.jpg",
            ),
        ),
        "Lazio" => array(
            "Primera Equipación" => array(
                "Foto" => "../Images/Equipaciones/lazio1.jpg",
            ),
        ),
        "Leverkusen" => array(
            "Primera Equipación" => array(
                "Foto" => "../Images/Equipaciones/leverkusen1.jpg",
            ),
            "Segunda Equipación" => array(
                "Foto" => "../Images/Equipaciones/leverkusen2.jpg",
            ),
        ),
        "Liverpool" => array(
            "Primera Equipación" => array(
                "Foto" => "../Images/Equipaciones/liverpool1.jpg",
            ),
            "Segunda Equipación" => array(
                "Foto" => "../Images/Equipaciones/liverpool2.jpg",
            ),
        ),
        "Madrid" => array(
            "Primera Equipación" => array(
                "Foto" => "../Images/Equipaciones/madrid1.jpg",
            ),
            "Segunda Equipación" => array(
                "Foto" => "../Images/Equipaciones/madrid2.jpg",
            ),
            "Tercera Equipación" => array(
                "Foto" => "../Images/Equipaciones/madrid3.jpg",
            ),
        ),
        "ManUnited" => array(
            "Primera Equipación" => array(
                "Foto" => "../Images/Equipaciones/manUnited1.jpg",
            ),
            "Segunda Equipación" => array(
                "Foto" => "../Images/Equipaciones/manUnited2.jpg",
            ),
        ),
        "Newcastle" => array(
            "Primera Equipación" => array(
                "Foto" => "../Images/Equipaciones/newcastle1.jpg",
            ),
        ),
        "Oviedo" => array(
            "Primera Equipación" => array(
                "Foto" => "../Images/Equipaciones/oviedo1.jpg",
            ),
        ),
        "Psg" => array(
            "Primera Equipación" => array(
                "Foto" => "../Images/Equipaciones/psg1.jpg",
            ),
            "Segunda Equipación" => array(
                "Foto" => "../Images/Equipaciones/psg2.jpg",
            ),
        ),
        "RealSociedad" => array(
            "Primera Equipación" => array(
                "Foto" => "../Images/Equipaciones/realSociedad1.jpg",
            ),
        ),
        "Roma" => array(
            "Primera Equipación" => array(
                "Foto" => "../Images/Equipaciones/roma1.jpg",
            ),
            "Segunda Equipación" => array(
                "Foto" => "../Images/Equipaciones/roma2.jpg",
            ),
        ),
        "Sevilla" => array(
            "Primera Equipación" => array(
                "Foto" => "../Images/Equipaciones/sevilla1.jpg",
            ),
            "Segunda Equipación" => array(
                "Foto" => "../Images/Equipaciones/sevilla2.jpg",
            ),
            "Terera Equipación" => array(
                "Foto" => "../Images/Equipaciones/sevilla3.jpg",
            ),
        ),
        "Sporting" => array(
            "Primera Equipación" => array(
                "Foto" => "../Images/Equipaciones/sporting1.jpg",
            ),
        ),
        "Tottenham" => array(
            "Primera Equipación" => array(
                "Foto" => "../Images/Equipaciones/tottenham1.jpg",
            ),
        ),
        "Valencia" => array(
            "Primera Equipación" => array(
                "Foto" => "../Images/Equipaciones/valencia1.jpg",
            ),
            "Segunda Equipación" => array(
                "Foto" => "../Images/Equipaciones/valencia2.jpg",
            ),
        ),
        "Villareal" => array(
            "Primera Equipación" => array(
                "Foto" => "../Images/Equipaciones/villareal1.jpg",
            ),
            "Segunda Equipación" => array(
                "Foto" => "../Images/Equipaciones/villareal2.jpg",
            ),
        ),
        "ManCity" => array(
            "Primera Equipación" => array(
                "Foto" => "../Images/Equipaciones/manCity1.jpg",
            ),
            "Segunda Equipación" => array(
                "Foto" => "../Images/Equipaciones/manCity2.jpg",
            ),
        )
    );


    // Insertar equipos
    foreach ($equipos as $nombre => $foto) {
        $sql = "INSERT INTO Equipo (Nombre, Foto) VALUES (?, ?) ON DUPLICATE KEY UPDATE Foto = VALUES(Foto)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$nombre, $foto]);
        echo "Equipo $nombre insertado o actualizado con éxito.<br>";
    }

    // Insertar equipaciones y camisetas
    foreach ($equipaciones as $nombre_equipo => $lista_equipaciones) {
        $equipo_id = $pdo->query("SELECT Id FROM Equipo WHERE Nombre = '$nombre_equipo'")->fetchColumn();

        foreach ($lista_equipaciones as $nombre_equipacion => $datos) {
            $precio_base = mt_rand(50, 100); // Ejemplo: precio base aleatorio para demostración
            $sql = "INSERT INTO Equipacion (Equipo_Id, Nombre_equipo, Nombre, Precio, Foto) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE Foto = VALUES(Foto), Precio = VALUES(Precio)";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$equipo_id, $nombre_equipo, $nombre_equipacion, $precio_base, $datos['Foto']]);
            echo "Equipación $nombre_equipacion para equipo $nombre_equipo insertada o actualizada con éxito.<br>";

            $equipacion_id = $pdo->lastInsertId();
            $tallas = ["S", "M", "L", "XL", "XXL"];
            foreach ($tallas as $talla) {
                $stock_inicial = mt_rand(10, 100); // Stock aleatorio para la demostración
                $sql_camiseta = "INSERT INTO Camiseta (Equipo_Id, Equipacion_Id, Talla, Stock) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE Stock = VALUES(Stock)";
                $stmt_camiseta = $pdo->prepare($sql_camiseta);
                $stmt_camiseta->execute([$equipo_id, $equipacion_id, $talla, $stock_inicial]);
                echo "Camiseta talla $talla para equipación $nombre_equipacion insertada o actualizada con stock $stock_inicial.<br>";
            }
        }
    }
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
