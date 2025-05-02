// Función para cambiar entre imágenes (de forma general)
function toggleImageVisibility(image1Id, image2Id) {
	var image1 = document.getElementById(image1Id);

var image2 = document.getElementById(image2Id);

    // Cambia entre mostrar/ocultar las imágenes
if (image1.style.display === "block") {
	image1.style.display = "none";
	image2.style.display = "block";
} else {
	image2.style.display = "none";
	image1.style.display = "block";
}
}

// Función para mostrar/ocultar el zoom
function zom() { 
	var zoomDiv = document.getElementById("zom");
zoomDiv.style.display = (zoomDiv.style.display === "none" || zoomDiv.style.display === "") ? "block" : "none";
}


// Función para mostrar una imagen en el div #f1
function showImage1() { 
	var zoomDiv = document.getElementById("f1");
zoomDiv.style.display = (zoomDiv.style.display === "none" || zoomDiv.style.display === "") ? "block" : "none";
}
// Función para mostrar una imagen en el div #f2

function showImage2() {
	var f2 = document.getElementById("f2");
	f2.style.display = "block" ; 
}

function showImage3() {
	var f2 = document.getElementById("f3");
	f2.style.display = "block" ; 
}
function showImage4() {
	var f2 = document.getElementById("f4");
	f2.style.display = "block" ; 
}
function showImage6() {
	var f2 = document.getElementById("f6");
	f2.style.display = "block" ; 
}
function showImage7() {
	var f2 = document.getElementById("f7");
	f2.style.display = "block" ; 
}


function close1(){
	var f1 = document.getElementById("f1");
f1.style.display = "none";  
}
function close2(){
	var f1 = document.getElementById("f2");
f1.style.display = "none"; 
}
function close3(){
	var f1 = document.getElementById("f3");
f1.style.display = "none";  
}
function close4(){
	var f1 = document.getElementById("f4");
f1.style.display = "none";  
}
function close6(){
	var f1 = document.getElementById("f6");
f1.style.display = "none";  
}
function close7(){
	var f1 = document.getElementById("f7");
f1.style.display = "none";  
}


// Función para abrir la vista previa de las imágenes en zoom
function modal1() {
	toggleImageVisibility("img1", "img2");
}

function modal2() {
	toggleImageVisibility("img3", "img4");
}

function modal3() {
	toggleImageVisibility("img5", "img6");
}
function modal4() {
	toggleImageVisibility("img7", "img8");
}
// Función para mostrar/ocultar el formulario de subida de imagen
function up() {
	var upDiv = document.getElementById("up");
    upDiv.style.display = (upDiv.style.display === "block") ? "none" : "block";  // Alterna entre mostrar/ocultar
}


// lectura del json y covercion a html

function loadJSON() {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', '/datos.json', true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.status === 200) {
			var jsonResponse = JSON.parse(xhr.responseText);
			var htmlContent = '';

			for (var i = 0; i < jsonResponse.length; i++) {
				htmlContent += '<div class="orden">' +
								'<div id="img${id} " class="img_show div" style="display:block;">' +
									'<button class="boton" onclick="modal1()">' +
										'<img loading="lazy" src="{imagen}" />' +
									'</button>' +
									'<a target="_bank" href="https://res.cloudinary.com/dr9van0op/image/upload/v1732324702/calle1-r_yix6yv.jpg" download="calle1" class="dowload">' +
										'<img loading="lazy" src="https://res.cloudinary.com/dr9van0op/image/upload/v1732325657/descarga_qi5d3r.png" alt="Descargar foto histórica de la calle" />' +
									'</a>' +
									'<div class="zom" onclick="zom(), showImage1()">' +
										'<img src="https://res.cloudinary.com/dr9van0op/image/upload/v1732324582/calle1_preview_utnl69.jpg" alt="Vista previa de la calle" />' +
									'</div>' +
								'</div>' +
								'</div>';
			}

			document.getElementById('galeria').innerHTML = htmlContent;
		}
	};
	xhr.send();
}