<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Verificar si se ha subido un archivo
    if (isset($_FILES['imagen']) && $_FILES['imagen']['error'] == 0) {
        // Obtener la información del archivo
        $nombreArchivo = $_FILES['imagen']['name'];
        $tmpNombre = $_FILES['imagen']['tmp_name'];
        $tipoArchivo = $_FILES['imagen']['type'];
        $tamanoArchivo = $_FILES['imagen']['size'];

        // Definir una carpeta para almacenar las imágenes subidas
        $carpetaDestino = 'up';
        
        // Verificar que la carpeta de destino exista, si no, crearla
        if (!is_dir($carpetaDestino)) {
            mkdir($carpetaDestino, 0777, true); // Crea la carpeta si no existe
        }

        // Definir la ruta completa de destino
        $rutaDestino = $carpetaDestino . basename($nombreArchivo);

        // Verificar el tipo de archivo (puedes agregar más tipos si lo deseas)
        $tiposPermitidos = ['image/jpeg', 'image/png', 'image/jpeg'];

        if (!in_array($tipoArchivo, $tiposPermitidos)) {
            echo "Error: Solo se permiten imágenes JPG, PNG y jpeg.";
            exit;
        }

        // Limitar el tamaño del archivo 
        $maxTamano = 6 * 1024 * 1024; 
        if ($tamanoArchivo > $maxTamano) {
            echo "Error: El archivo es demasiado grande. El tamaño máximo es 6MB.";
            exit;
        }

        // Mover el archivo subido a la carpeta de destino
        if (move_uploaded_file($tmpNombre, $rutaDestino)) {
            echo "La imagen se subió correctamente: " . htmlspecialchars($nombreArchivo);
        } else {
            echo "Error al subir el archivo.";
        }
    } else {
        echo "No se ha subido ningún archivo o ha ocurrido un error.";
    }
}
?>
