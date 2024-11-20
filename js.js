	//cambio de none a block en div
	// reduccion de codigo

	//cambio de imagenes en el mismo div
function imagen1(){
	
}





	//reciclo el div de zoom
function zom(){
	var z = document.getElementById("zom");

	if (z.style.display == "none") {
		z.style.display = "block";
	}else{
		z.style.display = "none";
	}
}





	//cambio de imagenes antigua a nueva 


function modal1(){

	var d = document.getElementById("img1");
	var a = document.getElementById("img2");	


	if (d.style.display == "block"){
		d.style.display = "none"
		a.style.display = "block";
	}else {
		a.style.display = "none"
		d.style.display = "block";
	}
}

function modal2(){

	var d = document.getElementById("img3");
	var a = document.getElementById("img4");	


	if (d.style.display == "block"){
		d.style.display = "none"
		a.style.display = "block";
	}else {
		a.style.display = "none"
		d.style.display = "block";
	}
}

function modal3(){

	var d = document.getElementById("img5");
	var a = document.getElementById("img6");	


	if (d.style.display == "block"){
		d.style.display = "none"
		a.style.display = "block";
	}else {
		a.style.display = "none"
		d.style.display = "block";
	}
}

	// subida de imagen
function up() {
	var y = document.getElementById("up")

	if (y.style.display == "block"){
		y.style.display = "none"

	}else {
		y.style.display = "block"
	}
}

	//anadir clase de clase//

	//function modal2(){
	//	var d = document.getElementById("img1");
	//	var a = document.getElementById("img2");	

	  //  if (9>2){
		//	a.classList.remove("img1_show");
		//	a.classList.toggle("img1_oculta");
		//	d.classList.remove("img1_oculta");
		//	d.classList.toggle("img1_show");
	//	}

	//}

	//copiar la misma funcion con imagenes diferentes


