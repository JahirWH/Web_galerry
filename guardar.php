<?php
session_start();

// Endpoint para registrar tiempo de inicio del formulario
if (isset($_POST['set_form_time'])) {
    $_SESSION['form_start_time'] = time();
    exit();
}

$conexion = new mysqli("histing", "nombre_base", "pass", "nombre de la tabla");
if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}

$conexion->set_charset("utf8mb4");

// Obtener IP del usuario
$ip = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['HTTP_X_REAL_IP'] ?? $_SERVER['REMOTE_ADDR'];
if (strpos($ip, ',') !== false) {
    $ip = trim(explode(',', $ip)[0]);
}

// 1. RATE LIMITING - Verificar frecuencia de comentarios por IP
$stmt = $conexion->prepare("SELECT COUNT(*) FROM comentarios WHERE ip = ? AND fecha > DATE_SUB(NOW(), INTERVAL 5 MINUTE)");
$stmt->bind_param("s", $ip);
$stmt->execute();
$result = $stmt->get_result();
$comentarios_recientes = $result->fetch_row()[0];

if ($comentarios_recientes >= 3) {
    die('Demasiados comentarios desde tu IP. Espera 5 minutos antes de comentar nuevamente.');
}

// 2. VERIFICACIÓN DE TIEMPO DE ENVÍO (anti-bot)
if (isset($_SESSION['form_start_time'])) {
    $tiempo_transcurrido = time() - $_SESSION['form_start_time'];
    if ($tiempo_transcurrido < 3) {
        die('Formulario enviado demasiado rápido. Por favor, espera un momento.');
    }
}

$nombre = $conexion->real_escape_string($_POST['nombre']);
$mensaje = $conexion->real_escape_string($_POST['mensaje']);

// 3. HONEYPOT - Campo oculto para detectar bots
if (!empty($_POST['website'])) {
    die('Spam detectado');
}

// 4. VALIDACIÓN DE LONGITUD
if (strlen($nombre) < 2 || strlen($mensaje) < 5) {
    die('Nombre y mensaje son obligatorios y deben tener una longitud mínima.');
}

// 5. FILTROS DE PALABRAS PROHIBIDAS
$palabras_spam = [
    'casino', 'viagra', 'loan', 'crypto', 'bitcoin', 'pharmacy', 'pills', 'discount',
    'free money', 'make money', 'earn cash', 'get rich', 'lottery', 'winner',
    'click here', 'buy now', 'limited time', 'urgent', 'congratulations'
];

$mensaje_lower = strtolower($mensaje);
$nombre_lower = strtolower($nombre);

foreach ($palabras_spam as $palabra) {
    if (stripos($mensaje_lower, $palabra) !== false || stripos($nombre_lower, $palabra) !== false) {
        die('Contenido no permitido detectado.');
    }
}

// 6. VERIFICACIÓN DE PATRONES SOSPECHOSOS
// Detectar URLs múltiples
if (preg_match_all('/https?:\/\/[^\s]+/', $mensaje, $matches) > 2) {
    die('Demasiados enlaces detectados en el mensaje.');
}

// Detectar texto repetitivo
if (preg_match('/(.{5,})\1{3,}/', $mensaje)) {
    die('Texto repetitivo detectado.');
}

// Detectar exceso de caracteres especiales
if (preg_match_all('/[!@#$%^&*()_+\-=\[\]{};\':"\\|,.<>\/?]/', $mensaje, $matches) > strlen($mensaje) * 0.3) {
    die('Demasiados caracteres especiales detectados.');
}

// Detectar solo números o caracteres aleatorios
if (preg_match('/^[0-9\s]+$/', trim($mensaje)) || preg_match('/^[a-z]{20,}$/i', str_replace(' ', '', $mensaje))) {
    die('Contenido sospechoso detectado.');
}

// 7. SANITIZACIÓN XSS
$nombre = htmlspecialchars($nombre, ENT_QUOTES, 'UTF-8');
$mensaje = htmlspecialchars($mensaje, ENT_QUOTES, 'UTF-8');

// 8. INSERTAR COMENTARIO CON IP
$stmt = $conexion->prepare("INSERT INTO comentarios (nombre, mensaje, ip) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $nombre, $mensaje, $ip);

if ($stmt->execute()) {
    // Limpiar session del formulario
    unset($_SESSION['form_start_time']);
    header("Location: index.html?success=1"); 
} else {
    die('Error al guardar el comentario. Intenta nuevamente.');
}

$conexion->close();
?>
