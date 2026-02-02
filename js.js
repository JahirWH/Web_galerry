
const urlAPI = 'https://api.jsonbin.io/v3/b/681659948a456b79669700c5';

// ====================================================================
// CLOUDINARY OPTIMIZATION UTILITY
// Optimización de imágenes sin necesidad de backend
// ====================================================================

/**
 * Optimiza URLs de Cloudinary agregando parámetros de calidad y formato
 * @param {string} url - URL de Cloudinary a optimizar
 * @param {number} ancho - Ancho máximo en píxeles (opcional)
 * @param {number} calidad - Calidad 1-100 (default: 80)
 * @returns {string} URL optimizada
 */
function optimizarURLCloudinary(url, ancho = null, calidad = 80) {
    if (!url || typeof url !== 'string') return url;
    if (!url.includes('cloudinary.com')) return url;
    if (url.includes('q_') || url.includes(',f_auto')) return url; // Ya optimizada
    
    // Formato: https://res.cloudinary.com/dr9van0op/image/upload/v1732325067/filename.jpg
    // Resultado: https://res.cloudinary.com/dr9van0op/image/upload/q_80,f_auto/v1732325067/filename.jpg
    const partes = url.split('/image/upload/');
    if (partes.length !== 2) return url;
    
    let transformaciones = `q_${calidad},f_auto`;
    if (ancho) transformaciones += `,w_${ancho},c_scale`;
    
    return partes[0] + '/image/upload/' + transformaciones + '/' + partes[1];
}

/**
 * Presets predefinidos de optimización
 */
const CloudinaryPresets = {
    thumbnail: { calidad: 75, ancho: 400 },  // Para listados pequeños
    preview: { calidad: 80, ancho: 600 },    // Vista previa
    full: { calidad: 85, ancho: 1200 },      // Vista completa
    social: { calidad: 85, ancho: 1200 },    // Meta tags (OG, Twitter)
    download: { calidad: 90, ancho: null },  // Sin limitar ancho
    icon: { calidad: 80, ancho: 200 }        // Logos
};

/**
 * Aplica un preset de optimización a una URL
 * @param {string} url - URL de Cloudinary
 * @param {string} preset - Nombre del preset (thumbnail, preview, full, social, download, icon)
 * @returns {string} URL optimizada
 */
function aplicarPresetCloudinary(url, preset = 'full') {
    const config = CloudinaryPresets[preset];
    if (!config) return url;
    return optimizarURLCloudinary(url, config.ancho, config.calidad);
}

// Módulo para manejar la galería de imágenes
const GaleriaApp = (function() {
    // Elementos DOM
    const elementos = {
        galeria: document.getElementById('galeria-container'),
        vistaGrande: document.getElementById('zom'),
        formularioSubida: document.getElementById('up')
    };
    
    // Almacenamiento de datos e imágenes actuales
    const estado = {
        imagenes: [],
        imagenActual: null
    };
    
    // Inicializa la galería cargando los datos de la API
    function inicializar() {
        cargarImagenesDesdeAPI();
    }
    
    // URL de la API

    // Carga las imágenes desde la API
    function cargarImagenesDesdeAPI() {
        fetch(urlAPI, {
            headers: {
                "X-Master-Key": "$2a$10$3ltxguseYrgRQPXoSVCwHeeWuuuCXUyhznAv2ZHXcum7NQIq4jkEK",
                "Content-Type": "application/json"
            }
        })
            .then(respuesta => {
                if (!respuesta.ok) {
                    throw new Error(`HTTP error! status: ${respuesta.status}`);
                }
                return respuesta.json();
            })
            .then(datos => {
                // JSONBin.io devuelve los datos en la propiedad 'record'
                if (datos && datos.record) {
                    estado.imagenes = datos.record;
                    renderizarGaleria(datos.record);
                } else {
                    throw new Error('Formato de datos inválido');
                }
            })
            .catch(error => {
                console.error('Error al cargar los datos de imágenes:', error);
                elementos.galeria.innerHTML = `
                    <div style="text-align: center; padding: 2rem; color: #666;">
                        <p>Error al cargar las imágenes. Por favor, intenta más tarde.</p>
                        <p style="font-size: 0.9rem; color: #999;">Detalles: ${error.message}</p>
                    </div>`;
            });
    }
    
    // Construye el HTML para la galería de imágenes
    function renderizarGaleria(imagenes) {
        if (!elementos.galeria) return;
        
        const htmlContenido = imagenes.map(imagen => {
            // Optimizar URLs de Cloudinary
            const imgRestauradaOpt = optimizarURLCloudinary(imagen.img_restaurada, 800);
            const imgPreviewOpt = optimizarURLCloudinary(imagen.img_preview, 400);
            const imgOriginalOpt = optimizarURLCloudinary(imagen.img_Norestaurada, 800);
            
            return `
                <div class="orden" data-id="${imagen.id}">
                    <div class="img_show div" style="display:block;" data-modo="restaurada">
                        <button class="boton" onclick="GaleriaApp.alternarVistas(${imagen.id})" title="Alternar vista">
                            <img loading="lazy" src="./img/img.png" alt="Alternar vista" />
                        </button>
                        
                        <a target="_blank" rel="noopener" href="${imgRestauradaOpt}" download="${imagen.titulo}" class="dowload">
                            <img loading="lazy" src="./img/descarga.png" alt="Descargar ${imagen.titulo}" />
                        </a>
        
                                <div class="zom" onclick="GaleriaApp.mostrarVistaGrande('${imgRestauradaOpt}')" role="button" tabindex="0">
                                    <img loading="lazy" 
                                         srcset="${imgPreviewOpt} 300w,
                                                 ${imgRestauradaOpt} 800w"
                                         sizes="(max-width: 600px) 300px,
                                                800px"
                                         src="${imgPreviewOpt}" 
                                         alt="Vista histórica de ${imagen.titulo} - ${imagen.fecha}"
                                         itemprop="image"
                                         width="800"
                                         height="600" />
                                </div>                        <div class="img-info">
                            <div class="img-titulo">${imagen.titulo}</div>
                            <div class="img-fecha">${imagen.fecha}</div>
                        </div>
                    </div>
        
                    <div class="img_oculta div" style="display:none;" data-modo="original">
                        <button class="boton" onclick="GaleriaApp.alternarVistas(${imagen.id})" title="Alternar vista">
                            <img loading="lazy" src="./img/img.png" alt="Alternar vista" />
                        </button>
        
                        <div class="zom" onclick="GaleriaApp.mostrarVistaGrande('${imgOriginalOpt}')">
                            <img loading="lazy" src="${imgOriginalOpt}" alt="Versión original de ${imagen.titulo}" />
                        </div>
                        
                        <div class="img-info">
                            <div class="img-titulo">${imagen.titulo} (Original)</div>
                            <div class="img-fecha">${imagen.fecha}</div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
        
        elementos.galeria.innerHTML = htmlContenido;
    }
    
    // Alterna entre la imagen restaurada y la original
    function alternarVistas(id) {
        const contenedorImagen = document.querySelector(`.orden[data-id="${id}"]`);
        if (!contenedorImagen) return;
        
        const vistaRestaurada = contenedorImagen.querySelector('[data-modo="restaurada"]');
        const vistaOriginal = contenedorImagen.querySelector('[data-modo="original"]');
        
        if (vistaRestaurada.style.display === "block") {
            vistaRestaurada.style.display = "none";
            vistaOriginal.style.display = "block";
        } else {
            vistaOriginal.style.display = "none";
            vistaRestaurada.style.display = "block";
        }
    }
    
    // Muestra la vista grande de la imagen
    function mostrarVistaGrande(urlImagen) {
        if (!elementos.vistaGrande) return;
        
        // Limpia cualquier contenido previo
        const contenedorImagen = elementos.vistaGrande.querySelector('.img_zom');
        if (!contenedorImagen) return;
        
        contenedorImagen.innerHTML = `<img loading="lazy" src="${urlImagen}" alt="Imagen ampliada">`;
        
        // Muestra la vista grande
        elementos.vistaGrande.style.display = "flex";
    }
    
    // Cierra la vista grande
    function cerrarVistaGrande() {
        if (!elementos.vistaGrande) return;
        elementos.vistaGrande.style.display = "none";
    }
    
    // Alterna la visibilidad del formulario de subida
    function alternarFormularioSubida() {
        if (!elementos.formularioSubida) return;
        
        const estaVisible = elementos.formularioSubida.style.display === "flex";
        elementos.formularioSubida.style.display = estaVisible ? "none" : "flex";
    }
    
    // API pública del módulo
    return {
        inicializar: inicializar,
        alternarVistas: alternarVistas,
        mostrarVistaGrande: mostrarVistaGrande,
        cerrarVistaGrande: cerrarVistaGrande,
        alternarFormularioSubida: alternarFormularioSubida
    };
})();

// Inicializar la aplicación cuando se cargue la página
document.addEventListener('DOMContentLoaded', function() {
    GaleriaApp.inicializar();
    
    // Inicializar el formulario de comentarios
    const comentarioForm = document.getElementById('comentario-form');
    if (comentarioForm) {
        // Registrar tiempo de inicio cuando el usuario interactúa con el formulario
        const inputs = comentarioForm.querySelectorAll('input, textarea');
        let tiempoRegistrado = false;
        
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                if (!tiempoRegistrado) {
                    // Enviar tiempo de inicio al servidor via session
                    fetch('guardar.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: 'set_form_time=1'
                    }).catch(() => {}); // Ignora errores
                    tiempoRegistrado = true;
                }
            });
        });
    }
});

// Función para manejar el evento de carga de la página (para compatibilidad con el código existente)
function loadJSON() {
    GaleriaApp.inicializar();
}

// Función para alternar la visibilidad del formulario de subida (para compatibilidad con el código existente)
function up() {
    GaleriaApp.alternarFormularioSubida();
}

// Función para mostrar/ocultar el zoom (para compatibilidad con el código existente)
function zom() {
    const zoomDiv = document.getElementById("zom");
    if (!zoomDiv) return;
    
    const estaVisible = zoomDiv.style.display === "flex";
    zoomDiv.style.display = estaVisible ? "none" : "flex";
    
    // Si se está cerrando, también limpiamos el contenido
    if (estaVisible) {
        GaleriaApp.cerrarVistaGrande();
    }
}