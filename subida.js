const cloudName = "dr9van0op"; // Tu nombre de nube de Cloudinary
const uploadPreset = "Web_gallery";

// Variable para evitar múltiples listeners
let inputFile = null;

function enviar_img() {
    // Obtener el input o crearlo si no existe
    inputFile = document.getElementById("img");
    
    if (!inputFile) {
        console.error("Input de archivo no encontrado");
        return;
    }
    
    // Remover listener anterior para evitar duplicados
    const newInput = inputFile.cloneNode(true);
    inputFile.parentNode.replaceChild(newInput, inputFile);
    inputFile = newInput;
    
    // Agregar listener para cambios de archivo
    inputFile.addEventListener("change", manejarSubidaImagen);
    
    // Simular click
    inputFile.click();
}

async function manejarSubidaImagen(e) {
    const file = e.target.files[0];
    
    if (!file) {
        console.log("No se seleccionó archivo");
        return;
    }
    
    // Validar tipo de archivo
    const tiposPermitidos = ["image/jpeg", "image/png", "image/webp"];
    if (!tiposPermitidos.includes(file.type)) {
        alert("Solo se permiten imágenes JPG, PNG y WebP");
        return;
    }
    
    // Validar tamaño (máximo 6MB)
    const maxTamano = 6 * 1024 * 1024;
    if (file.size > maxTamano) {
        alert("La imagen no puede superar 6MB");
        return;
    }
    
    try {
        // Mostrar indicador de carga
        const preview = document.getElementById("preview");
        const estadoDiv = document.getElementById("estadoSubida");
        
        if (estadoDiv) {
            estadoDiv.innerHTML = "⏳ Subiendo imagen a la nube...";
            estadoDiv.style.display = "block";
            estadoDiv.style.background = "#FFF3CD";
            estadoDiv.style.color = "#856404";
            estadoDiv.style.border = "1px solid #FFEAA7";
        }
        
        if (preview) {
            preview.style.opacity = "0.5";
        }
        
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", uploadPreset);
        
        const res = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            {
                method: "POST",
                body: formData
            }
        );
        
        if (!res.ok) {
            throw new Error(`Error HTTP: ${res.status}`);
        }
        
        const data = await res.json();
        
        if (!data.secure_url) {
            throw new Error("No se recibió URL de la imagen");
        }
        
        console.log("URL subida:", data.secure_url);
        
        // Actualizar preview
        if (preview) {
            preview.src = data.secure_url;
            preview.style.opacity = "1";
        }
        
        // Guardar URL en el input
        const inputURL = document.getElementById("imagen_url");
        if (inputURL) {
            inputURL.value = data.secure_url;
        }
        
        // Mostrar mensaje de éxito
        if (estadoDiv) {
            estadoDiv.innerHTML = "✅ ¡Imagen subida correctamente! Ahora completa los datos y envía.";
            estadoDiv.style.background = "#D4EDDA";
            estadoDiv.style.color = "#155724";
            estadoDiv.style.border = "1px solid #C3E6CB";
        }
        
    } catch (error) {
        console.error("Error al subir imagen:", error);
        
        const estadoDiv = document.getElementById("estadoSubida");
        if (estadoDiv) {
            estadoDiv.innerHTML = "❌ Error: " + error.message;
            estadoDiv.style.display = "block";
            estadoDiv.style.background = "#F8D7DA";
            estadoDiv.style.color = "#721C24";
            estadoDiv.style.border = "1px solid #F5C6CB";
        }
        
        const preview = document.getElementById("preview");
        if (preview) {
            preview.style.opacity = "1";
        }
    }
}

// Manejar el envío del formulario
document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('formularioSubida');
    
    if (formulario) {
        formulario.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Validar que hay URL de imagen
            const imagenUrl = document.getElementById('imagen_url').value;
            if (!imagenUrl) {
                alert("Por favor, primero sube la imagen a la nube");
                return;
            }
            
            // Validar descripción
            const descripcion = document.querySelector('input[name="descripcion"]').value.trim();
            if (!descripcion) {
                alert("La descripción es requerida");
                return;
            }
            
            const estadoDiv = document.getElementById("estadoSubida");
            if (estadoDiv) {
                estadoDiv.innerHTML = "⏳ Enviando datos al servidor...";
                estadoDiv.style.display = "block";
                estadoDiv.style.background = "#FFF3CD";
                estadoDiv.style.color = "#856404";
                estadoDiv.style.border = "1px solid #FFEAA7";
            }
            
            try {
                const formData = new FormData(formulario);
                
                const response = await fetch('subir_imagen.php', {
                    method: 'POST',
                    body: formData
                });
                
                const resultado = await response.json();
                
                if (resultado.success) {
                    if (estadoDiv) {
                        estadoDiv.innerHTML = "✅ " + resultado.mensaje;
                        estadoDiv.style.background = "#D4EDDA";
                        estadoDiv.style.color = "#155724";
                        estadoDiv.style.border = "1px solid #C3E6CB";
                    }
                    
                    // Limpiar formulario después de 2 segundos
                    setTimeout(() => {
                        formulario.reset();
                        document.getElementById('preview').style.display = 'none';
                        document.getElementById('preview').src = '';
                        GaleriaApp.alternarFormularioSubida();
                    }, 2000);
                } else {
                    throw new Error(resultado.error || 'Error desconocido');
                }
                
            } catch (error) {
                console.error("Error:", error);
                if (estadoDiv) {
                    estadoDiv.innerHTML = "❌ Error: " + error.message;
                    estadoDiv.style.background = "#F8D7DA";
                    estadoDiv.style.color = "#721C24";
                    estadoDiv.style.border = "1px solid #F5C6CB";
                }
            }
        });
    }
});