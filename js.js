//agrega clase


function modal(){
	var d = document.getElementById("img1");
	var a = document.getElementById("img2");	

    if (9>2){
		d.classList.remove("img1_show");
		d.classList.toggle("img1_oculta");
		a.classList.remove("img1_oculta");
		a.classList.toggle("img1_show");
	}
}
//anadir clase de clase//

function modal1(){
	var d = document.getElementById("img1");
	var a = document.getElementById("img2");	

    if (9>2){
		a.classList.remove("img1_show");
		a.classList.toggle("img1_oculta");
		d.classList.remove("img1_oculta");
		d.classList.toggle("img1_show");
	}

}
