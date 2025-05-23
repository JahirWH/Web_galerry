

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
            
            // Inicializa la galería cargando los datos del JSON
            function inicializar() {
                cargarImagenesDesdeJSON();
            }
            
            // URL de tu JSON (puedes cambiarla por tu endpoint real)
            const urlJSON = './datos.json'; // O 'https://api.jsonbin.io/v3/b/681659948a456b79669700c5'

            // Carga las imágenes desde el archivo JSON
            function cargarImagenesDesdeJSON() {
                fetch(urlJSON)
                    .then(respuesta => respuesta.json())
                    .then(datos => {
                        estado.imagenes = datos;
                        renderizarGaleria(datos);
                    })
                    .catch(error => {
                        console.error('Error al cargar los datos de imágenes:', error);
                        elementos.galeria.innerHTML = '<p>Error al cargar las imágenes. Por favor, intenta más tarde.</p>';
                    });
            }
            
            // Construye el HTML para la galería de imágenes
            function renderizarGaleria(imagenes) {
                if (!elementos.galeria) return;
                
                const htmlContenido = imagenes.map(imagen => {
                    return `
                        <div class="orden" data-id="${imagen.id}">
                            <div class="img_show div" style="display:block;" data-modo="restaurada">
                                <button class="boton" onclick="GaleriaApp.alternarVistas(${imagen.id})">
                                    <img loading="lazy" src="./img/img.png" alt="${imagen.titulo}" />
                                </button>
                                
                                <a target="_blank" href="${imagen.img_restaurada}" download="${imagen.titulo}" class="dowload">
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
                                <button class="boton" onclick="GaleriaApp.alternarVistas(${imagen.id})">
                                    <img loading="lazy" src="./img/img.png" alt="Otra vista de ${imagen.titulo}" />
                                </button>
            
                                <div class="zom" onclick="GaleriaApp.mostrarVistaGrande('${imagen.img_Norestaurada}')">
                                    <img loading="lazy" src="${imagen.img_Norestaurada}" alt="Otra vista de ${imagen.titulo}" />
                                </div>
                                
                                <div class="img-info">
                                    <div class="img-titulo">${imagen.titulo}</div>
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