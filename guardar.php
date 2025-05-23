<?php
$conexion = new mysqli("pdb1043.awardspace.net", "4554922_blog", "Nw]H1360Xkjh", "4554922_blog");
if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}

$nombre = $conexion->real_escape_string($_POST['nombre']);
$mensaje = $conexion->real_escape_string($_POST['mensaje']);

$sql = "INSERT INTO comentarios (nombre, mensaje) VALUES ('$nombre', '$mensaje')";
$conexion->query($sql);

header("Location: index.html"); // O el archivo que desees
?>
