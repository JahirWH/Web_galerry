function modal_1(){
	var d1 = document.getElementById("img1");
	var d2 = document.getElementById("img2");

	if (d1.style.display == "block" ) {
		d1.style.display = "none"
		d2.style.display = "block"
	}else{
		d1.style.display = "none"

	}
}