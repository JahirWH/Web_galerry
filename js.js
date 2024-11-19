	//cambio de none a block en div
	// reduccion de codigo

	//cambio de imagenes en el mismo div
function imagen1(){
	a = document.getElementsByClassName("i1");
	d = document.getElementsByClassName("i2");
	c = document.getElementsByClassName("i3");
	e = document.getElementsByClassName("i4");
	f = document.getElementsByClassName("i5");
	g = document.getElementsByClassName("i6");
	h = document.getElementsByClassName("i7");
	i = document.getElementsByClassName("i8");
	j = document.getElementsByClassName("i9");



	if (a.style.display == "none",
		d.style.display == "none",
		c.style.display == "none",
		e.style.display == "none",
		f.style.display == "none",
		g.style.display == "none",
		h.style.display == "none",
		i.style.display == "none",
		j.style.display == "none") {
		a.style.display = "block";
}else {
		a.style.display = "none",		
		d.style.display = "none",
		c.style.display = "none",
		e.style.display = "none",
		f.style.display = "none",
		g.style.display = "none",
		h.style.display = "none",
		i.style.display = "none",
		j.style.display = "none",
		imagen1()
		
}
}
function imagen2(){

	a = document.getElementsByClassName("i1");
	d = document.getElementsByClassName("i2");
	c = document.getElementsByClassName("i3");
	e = document.getElementsByClassName("i4");
	f = document.getElementsByClassName("i5");
	g = document.getElementsByClassName("i6");
	h = document.getElementsByClassName("i7");
	i = document.getElementsByClassName("i8");
	j = document.getElementsByClassName("i9");


	if (a.style.display == "none",
		d.style.display == "none",
		c.style.display == "none",
		e.style.display == "none",
		f.style.display == "none",
		g.style.display == "none",
		h.style.display == "none",
		i.style.display == "none",
		j.style.display == "none"
		) {
		d.style.display = "block";
}else {
		a.style.display = "none",
		d.style.display = "none",
		c.style.display = "none",
		e.style.display = "none",
		f.style.display = "none",
		g.style.display = "none",
		h.style.display = "none",
		i.style.display = "none",
		j.style.display = "none"
		imagen2()
}
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


