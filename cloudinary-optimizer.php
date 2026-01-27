<?php
/**
 * Función para optimizar URLs de Cloudinary
 * Agregar calidad automática y formato responsive
 */

function optimizarURLCloudinary($url, $quality = 80, $width = null) {
    // Si ya está optimizada, no hacer nada
    if (strpos($url, 'q_') !== false) {
        return $url;
    }
    
    // Verificar que sea URL de Cloudinary
    if (strpos($url, 'cloudinary.com') === false) {
        return $url;
    }
    
    // Formato: https://res.cloudinary.com/dr9van0op/image/upload/v1732325067/filename.jpg
    // Convertir a: https://res.cloudinary.com/dr9van0op/image/upload/q_80,f_auto/v1732325067/filename.jpg
    
    $partes = explode('/image/upload/', $url);
    
    if (count($partes) !== 2) {
        return $url;
    }
    
    $transformaciones = "q_{$quality},f_auto";
    
    // Agregar ancho si se especifica
    if ($width) {
        $transformaciones .= ",w_{$width},c_scale";
    }
    
    return $partes[0] . '/image/upload/' . $transformaciones . '/' . $partes[1];
}

/**
 * Usar así en tu código:
 * 
 * $urlOptimizada = optimizarURLCloudinary(
 *     "https://res.cloudinary.com/dr9van0op/image/upload/v1732325067/calle3_t5sihk.jpg"
 * );
 * // Resultado: ...upload/q_80,f_auto/v1732325067/calle3_t5sihk.jpg
 * 
 * // Para responsive (para mobile)
 * $urlMovil = optimizarURLCloudinary(
 *     "https://res.cloudinary.com/dr9van0op/image/upload/v1732325067/calle3_t5sihk.jpg",
 *     75,  // quality
 *     600  // width en pixels
 * );
 */
?>
