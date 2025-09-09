<?php

// Manejo de errores
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', 'error.log');

try {
    // Conexión a la base de datos
    $conexion = new mysqli("hostserver", "usuario", "password", "nombre_base_datos");
    
    // Configurar el conjunto de caracteres
    $conexion->set_charset("utf8mb4");

    // Verificar la conexión
    if ($conexion->connect_error) {
        throw new Exception("Error de conexión a la base de datos: " . $conexion->connect_error);
    }
} catch (Exception $e) {
    // Registrar el error en el log
    error_log($e->getMessage());
    // Mostrar mensaje amigable al usuario
    echo "<p>Lo sentimos, hay un problema temporal con el servicio de comentarios. Por favor, intenta más tarde.</p>";
    exit();
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
