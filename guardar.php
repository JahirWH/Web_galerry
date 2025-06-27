<?php
$conexion = new mysqli("histing", "nombre_base", "pass", "nombre de la tabla");
if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}

$nombre = $conexion->real_escape_string($_POST['nombre']);
$mensaje = $conexion->real_escape_string($_POST['mensaje']);

if (!empty($_POST['website'])) {
    die('Spam detectado');
}
//detectcion de letras 
if (strlen($nombre) < 2 || strlen($mensaje) < 5) {
    die('Nombre y mensaje son obligatorios y deben tener una longitud mínima.');
}

// evitar xss ejecucion de javascip en el mismo codigo
$nombre = htmlspecialchars($nombre, ENT_QUOTES, 'UTF-8');
$mensaje = htmlspecialchars($mensaje, ENT_QUOTES, 'UTF-8');


//codigo  prepare para prevenir sql malicioso al insertar o peticiones maliciosas
$stmt = $conexion->prepare("INSERT INTO comentarios (nombre, mensaje) VALUES (?, ?)");
//ss tipo de dato string
$stmt->bind_param("ss", $nombre, $mensaje);
$stmt->execute();

header("Location: index.html"); 
?>
