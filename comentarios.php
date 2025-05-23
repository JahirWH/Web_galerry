<?php
$conexion = new mysqli("servidor", "nombre baser", "pass", "nombre de la tabla");

if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}

$resultado = $conexion->query("SELECT * FROM comentarios ORDER BY fecha DESC");

while ($row = $resultado->fetch_assoc()) {
    echo "<div class='comentario'>";
    echo "<strong>" . htmlspecialchars($row['nombre']) . "</strong><br>";
    echo "<p>" . nl2br(htmlspecialchars($row['mensaje'])) . "</p>";
    echo "<small>" . $row['fecha'] . "</small>";
    echo "</div>";
}
?>
