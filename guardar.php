<?php
$conexion = new mysqli("histing", "nombre_base", "pass", "nombre de la tabla");
if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}

$nombre = $conexion->real_escape_string($_POST['nombre']);
$mensaje = $conexion->real_escape_string($_POST['mensaje']);

$sql = "INSERT INTO comentarios (nombre, mensaje) VALUES ('$nombre', '$mensaje')";
$conexion->query($sql);

header("Location: index.html"); 
?>
