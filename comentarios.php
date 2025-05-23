<?php
$conexion = new mysqli("pdb1043.awardspace.net", "4554922_blog", "Nw]H1360Xkjh", "4554922_blog");

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
