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
    const urlAPI = 'https://api.jsonbin.io/v3/b/681659948a456b79669700c5';

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
            return `
                <div class="orden" data-id="${imagen.id}">
                    <div class="img_show div" style="display:block;" data-modo="restaurada">
                        <button class="boton" onclick="GaleriaApp.alternarVistas(${imagen.id})" title="Alternar vista">
                            <img loading="lazy" src="./img/img.png" alt="Alternar vista" />
                        </button>
                        
                        <a target="_blank" rel="noopener" href="${imagen.img_restaurada}" download="${imagen.titulo}" class="dowload">
                            <img loading="lazy" src="./img/descarga.png" alt="Descargar ${imagen.titulo}" />
                        </a>
        
                        <div class="zom" onclick="GaleriaApp.mostrarVistaGrande('${imagen.img_restaurada}')">
                            <img loading="lazy" src="${imagen.img_preview}" alt="Vista previa de ${imagen.titulo}" />
                        </div>
                        
                        <div class="img-info">
                            <div class="img-titulo">${imagen.titulo}</div>
                            <div class="img-fecha">${imagen.fecha}</div>
                        </div>
                    </div>
        
                    <div class="img_oculta div" style="display:none;" data-modo="original">
                        <button class="boton" onclick="GaleriaApp.alternarVistas(${imagen.id})" title="Alternar vista">
                            <img loading="lazy" src="./img/img.png" alt="Alternar vista" />
                        </button>
        
                        <div class="zom" onclick="GaleriaApp.mostrarVistaGrande('${imagen.img_Norestaurada}')">
                            <img loading="lazy" src="${imagen.img_Norestaurada}" alt="Versión original de ${imagen.titulo}" />
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
    
    // Smooth scroll para navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
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