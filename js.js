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
