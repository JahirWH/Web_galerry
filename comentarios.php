<?php
$conexion = new mysqli("servidor", "usuario", "contraseña", "nombre_base");

$conexion->set_charset("utf8mb4");

if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}

$sql = "SELECT nombre, mensaje, fecha FROM comentarios ORDER BY fecha DESC";
$resultado = $conexion->query($sql);

if ($resultado && $resultado->num_rows > 0) {
    while ($row = $resultado->fetch_assoc()) {
        // Escapar salida para evitar XSS
        $nombre = htmlspecialchars($row['nombre'], ENT_QUOTES, 'UTF-8');
        $mensaje = nl2br(htmlspecialchars($row['mensaje'], ENT_QUOTES, 'UTF-8'));
        $fecha = htmlspecialchars($row['fecha'], ENT_QUOTES, 'UTF-8');

        echo "<article class='comentario' aria-label='Comentario de $nombre'>";
        echo "<header><strong>$nombre</strong></header>";
        echo "<p>$mensaje</p>";
        echo "<footer><small>$fecha</small></footer>";
        echo "</article>";
    }
} else {
    echo "<p>No hay comentarios aún. ¡Sé el primero en comentar!</p>";
}

// Liberar recursos y cerrar conexión
if ($resultado) $resultado->free();
$conexion->close();
?>
