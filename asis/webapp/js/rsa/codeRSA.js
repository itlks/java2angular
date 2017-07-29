function devicePrint(){

	var charset = document.getElementById("formGeral:pm_chars");
	var devicePrint = document.getElementById("formGeral:pm_fp");
	devicePrint.value = encode_deviceprint();
	charset.value = document.charset; 
	
};


