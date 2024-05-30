<?php
$dsn = "mysql:dbname=futwear;host=127.0.0.1";
$usuario = "root";
$clave = "";
try {
    // Create the PDO connection
    $pdo = new PDO($dsn, $usuario, $clave);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Connected to the database 'futwear' successfully.<br>";
    // equipos
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

    // equipaciones
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
    // Usuario Admin
    $sql_usuario = "INSERT INTO Usuarios (Nombre, Apellidos, Sexo, Correo, Contraseña, Teléfono, Dirección, Código_Postal, Provincia, Método_de_Pago, Admin) 
    VALUES ('Yoancarlos', 'Bermudez', 'Masculino', 'yoancarlosb@gmail.com', '123456', 666333444, 'Calle Aller', 33600, 'Asturias', 'Paypal', 1)";
    $pdo->exec($sql_usuario);
    echo "Usuario Admin insertado correctamente.<br>";
    // Usuarios 

    // usuariosbd
    $usuariosBD = [
        [
            'Nombre' => 'Carmen',
            'Apellidos' => 'Fernandez Llaneza',
            'Sexo' => 'Femenino',
            'Correo' => 'carmenllaneza@gmail.com',
            'Contraseña' => 'abc123',
            'Teléfono' => 666555444,
            'Dirección' => 'Calle Mayor',
            'Código_Postal' => 28013,
            'Provincia' => 'Madrid',
            'Método_de_Pago' => 'Tarjeta',
            'Admin' => 0
        ],
        [
            'Nombre' => 'Carlos',
            'Apellidos' => 'Lopez Martinez',
            'Sexo' => 'Masculino',
            'Correo' => 'charly@gmail.com',
            'Contraseña' => 'password123',
            'Teléfono' => 665141232,
            'Dirección' => 'Avenida de la Paz',
            'Código_Postal' => 46001,
            'Provincia' => 'Valencia',
            'Método_de_Pago' => 'transferencia',
            'Admin' => 0
        ],
        [
            'Nombre' => 'Jonathan',
            'Apellidos' => 'Ramallo Rubio',
            'Sexo' => 'Masculino',
            'Correo' => 'jony.rama@gmail.com',
            'Contraseña' => '123456',
            'Teléfono' => 633321987,
            'Dirección' => 'Calle Mieres',
            'Código_Postal' => 29401,
            'Provincia' => 'Cadiz',
            'Método_de_Pago' => 'Paypal',
            'Admin' => 0
        ],
        [
            'Nombre' => 'Martin',
            'Apellidos' => 'Riera Bernardo ',
            'Sexo' => 'Masculino',
            'Correo' => 'riera2@gmail.com',
            'Contraseña' => 'pass123',
            'Teléfono' => 644324332,
            'Dirección' => 'Calle Uria',
            'Código_Postal' => 33001,
            'Provincia' => 'Asturias',
            'Método_de_Pago' => 'transferencia',
            'Admin' => 0
        ],
        [
            'Nombre' => 'Paula',
            'Apellidos' => 'Alvarez Garcia',
            'Sexo' => 'Femenino',
            'Correo' => 'paulita@gmail.com',
            'Contraseña' => '654321',
            'Teléfono' => 621544332,
            'Dirección' => 'Barrio salamanca 2',
            'Código_Postal' => 28013,
            'Provincia' => 'Madrid',
            'Método_de_Pago' => 'Paypal',
            'Admin' => 0
        ]
        
    ];

    foreach ($usuariosBD as $usuario) {
        $sql_usuario = "INSERT INTO Usuarios (Nombre, Apellidos, Sexo, Correo, Contraseña, Teléfono, Dirección, Código_Postal, Provincia, Método_de_Pago, Admin) 
    VALUES ('" . $usuario['Nombre'] . "', '" . $usuario['Apellidos'] . "', '" . $usuario['Sexo'] . "', '" . $usuario['Correo'] . "', '" . $usuario['Contraseña'] . "', " . $usuario['Teléfono'] . ", '" . $usuario['Dirección'] . "', " . $usuario['Código_Postal'] . ", '" . $usuario['Provincia'] . "', '" . $usuario['Método_de_Pago'] . "', " . $usuario['Admin'] . ")";
        $pdo->exec($sql_usuario);
    }
    echo "Usuarios insertados correctamente.";

    // Insertar equipos
    foreach ($equipos as $nombre => $foto) {
        $sql = "INSERT INTO Equipo (Nombre, Foto) VALUES (?, ?) ON DUPLICATE KEY UPDATE Foto = VALUES(Foto)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$nombre, $foto]);
        echo "Equipo $nombre insertado con éxito.<br>";
    }

    // Insertar equipaciones y camisetas
    foreach ($equipaciones as $nombre_equipo => $lista_equipaciones) {
        $equipo_id = $pdo->query("SELECT Id FROM Equipo WHERE Nombre = '$nombre_equipo'")->fetchColumn();

        foreach ($lista_equipaciones as $nombre_equipacion => $datos) {
            $precio_base = 70; // 
            $sql = "INSERT INTO Equipacion (Equipo_Id, Nombre_equipo, Nombre, Precio, Foto) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE Foto = VALUES(Foto), Precio = VALUES(Precio)";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$equipo_id, $nombre_equipo, $nombre_equipacion, $precio_base, $datos['Foto']]);
            echo "Equipación $nombre_equipacion para equipo $nombre_equipo insertada con éxito.<br>";

            $equipacion_id = $pdo->lastInsertId();
            $tallas = ["S", "M", "L", "XL"];
            foreach ($tallas as $talla) {
                $stock_inicial = mt_rand(1, 10); //stock aleatorio
                $sql_camiseta = "INSERT INTO Camiseta (Equipo_Id, Equipacion_Id, Talla, Stock) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE Stock = VALUES(Stock)";
                $stmt_camiseta = $pdo->prepare($sql_camiseta);
                $stmt_camiseta->execute([$equipo_id, $equipacion_id, $talla, $stock_inicial]);
                echo "Camiseta talla $talla para equipación $nombre_equipacion insertada con stock de $stock_inicial.<br>";
            }
        }
    }
   
    // Crear pedidos para cada usuario
    $usuarios_pedidos = [
        'yoancarlosb@gmail.com' => 6,
        'riera2@gmail.com' => 3,
        'paulita@gmail.com' => 5,
        'charly@gmail.com' => 4,
        'carmenllaneza@gmail.com' => 1,
        'jony.rama@gmail.com' => 2,
    ];

    $estados_pedidos = ['Pagado', 'Completado', 'Cancelado'];

    foreach ($usuarios_pedidos as $correo => $num_pedidos) {
        $id_usuario = $pdo->query("SELECT Id FROM Usuarios WHERE Correo = '$correo'")->fetchColumn();

        for ($i = 0; $i < $num_pedidos; $i++) {
            $estado = $estados_pedidos[array_rand($estados_pedidos)];

            // Crear carrito
            $sql_carrito = "INSERT INTO Carrito (Id_Usuario, Estado) VALUES ($id_usuario, 'Pendiente')";
            $pdo->exec($sql_carrito);
            $id_carrito = $pdo->lastInsertId();

            // Añadir detalles del carrito
            $precio_total = 0;
            $num_items = mt_rand(1, 10); // Número aleatorio de artículos en el carrito
            for ($j = 0; $j < $num_items; $j++) {
                $camiseta_id = $pdo->query("SELECT Id FROM Camiseta ORDER BY RAND() LIMIT 1")->fetchColumn();
                $cantidad = 1;
                $precio_unitario = 70;
                $talla = ['S', 'M', 'L', 'XL'][array_rand(['S', 'M', 'L', 'XL'])];
                $sql_detalle_carrito = "INSERT INTO DetalleCarrito (Carrito_Id, Camiseta_Id, Cantidad, Precio_Unitario, Talla) VALUES ($id_carrito, $camiseta_id, $cantidad, $precio_unitario, '$talla')";
                $pdo->exec($sql_detalle_carrito);

                $precio_total += $cantidad * $precio_unitario;
            }

            // Actualizar el estado del carrito a 'Pagado'
            $sql_update_carrito = "UPDATE Carrito SET Estado = 'Pagado' WHERE Id = $id_carrito";
            $pdo->exec($sql_update_carrito);

            // Crear pedido
            $sql_pedido = "INSERT INTO Pedido (Id_Carrito, Id_Usuario, Precio_Total, Estado) VALUES ($id_carrito, $id_usuario, $precio_total, '$estado')";
            $pdo->exec($sql_pedido);

            echo "Pedido creado para el usuario $correo con estado $estado y precio total $precio_total.<br>";
        }
    }
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
