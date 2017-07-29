oldObj = "";
oldValor = "";
inteiro = new RegExp("[0-9]");
naoInteiro = new RegExp("[^0-9,]");
decimal = new RegExp("[\,]");
arroba = new RegExp("[@]");
ponto = new RegExp("[\.]");
hexa = new RegExp("[0-9a-fA-F]");
letras = new RegExp("[a-zA-Z]");
minutos = new RegExp("\:");
semCaracterEspeciais = new RegExp("[\"!@#$%&*{}^~�`?/><()=+;?,.\\|]");
caracConta = new RegExp("[\"!@#$&{}^~�`?><=+;?,.\\|]");

var objOld;
function changeColor(obj){
	
	if(obj){
		if(objOld){
			objOld.style.color = 'black';
		}
		
		obj.style.color = 'red';
		objOld = obj;
		
	}	
	return true;
}

function checaCNPJ(obj){
  valor = obj.value;
  if(valor != oldValor || oldObj != obj){
    for(i=0;i<valor.length;i++){
      if(!inteiro.test(valor.charAt(i))){
        valor = valor.substring(0,i) + valor.substring(i+1,valor.length);
        i = -1;
      }
    }
    if(valor.length < 1){
      valor = "";
    }else if(valor.length > 2 && valor.length < 6){
      valor = valor.substring(0,2) + "." + valor.substring(2,valor.length);
    }else if(valor.length > 5 && valor.length < 9){
      valor = valor.substring(0,2) + "." + valor.substring(2,5) + "." + valor.substring(5,valor.length);
    }else if(valor.length > 8 && valor.length < 13){
      valor = valor.substring(0,2) + "." + valor.substring(2,5) + "." + valor.substring(5,8) + "/" + valor.substring(8,valor.length);
    }else if(valor.length > 12 && valor.length < 15){
      valor = valor.substring(0,2) + "." + valor.substring(2,5) + "." + valor.substring(5,8) + "/" + valor.substring(8,12) + "-" + valor.substring(12,valor.length);
    }else if(valor.length > 14){
      valor = valor.substring(0,2) + "." + valor.substring(2,5) + "." + valor.substring(5,8) + "/" + valor.substring(8,12) + "-" + valor.substring(12,14);
    }
    obj.value = valor;
    oldValor = valor;
    oldObj = obj;
  }
}

function habilitaDesabilitaPosOUPreFixado() {
	if (document.getElementById("formID:detalhePosFixadoID") != null && document.getElementById("formID:detalhePosFixadoID").value != "") {
		document.getElementById("formID:bonificacaoPreComplementarID").disabled = true;
		document.getElementById("formID:bonificacaoPreComplementarID").value = "";
	} else {
		document.getElementById("formID:bonificacaoPreComplementarID").disabled = false;
	}

	if (document.getElementById("formID:bonificacaoPreComplementarID") != null && document.getElementById("formID:bonificacaoPreComplementarID").value != "") {
		document.getElementById("formID:detalhePosFixadoID").disabled = true;
		document.getElementById("formID:detalhePosFixadoID").value = "";
	} else {
		document.getElementById("formID:detalhePosFixadoID").disabled = false;
	}
}

function habilitaTodosCheckbox(combo) {
	
	var names = combo.name.split(":");
	
	var form = names[0];
	
	var table = names[1];
	
	var checkboxTodosID = names[2];
	
	var checkboxID = "checkboxID";
	
	for ( var i = 0; i < 100; i++) {
		
		if(document.getElementById(form +":"+ table +":"+ i + ":" + checkboxID)){

			if (document.getElementById(form +":"+ table +":"+ checkboxTodosID) != null && document.getElementById(form +":"+ table +":"+ checkboxTodosID).checked == true) {
				document.getElementById(form +":"+ table +":"+ i + ":" + checkboxID).checked = true;
				
			}else{
				document.getElementById(form +":"+ table +":"+ i + ":" + checkboxID).checked = false;
			}
		}
	}
}

function habilitaTodosCheckboxPreenchidos(combo, selecionado, buttonDisable) {
	
	var names = combo.name.split(":");
	
	var form = names[0];
	
	var table = names[1];
	
	var checkboxTodosID = names[2];
	
	var checkboxID = "checkboxID";
	
	var checked = false;
	for ( var i = 0; i < 100; i++) {
		
		if(document.getElementById(form +":"+ table +":"+ i + ":" + checkboxID)){
			if (document.getElementById(form +":"+ table +":"+ checkboxTodosID) != null && 
				document.getElementById(form +":"+ table +":"+ checkboxTodosID).checked == true && 
				document.getElementById(form +":"+ table +":"+ i + ":" +selecionado).value != "") {
				
				document.getElementById(form +":"+ table +":"+ i + ":" + checkboxID).checked = true;
				
				if(!checked){
					checked = true;
				}	
					
			}else{
				document.getElementById(form +":"+ table +":"+ i + ":" + checkboxID).checked = false;
			}
		}
	}
	
	if(checked){
		document.getElementById(form +":"+buttonDisable).disabled = false;
	}else{
		document.getElementById(form +":"+buttonDisable).disabled = true;
	}
}


function MaskDate(source) {

	var evt = window.event;
	var keyChar = String.fromCharCode(window.event.keyCode);
	
	if(source != null){
		source.maxLength = 10;
	}
	
	if (("0123456789/").indexOf(keyChar) == -1) {
		evt.returnValue = false;
		return false;
	}

	switch (source.value.length) {
	case 0:
		if (keyChar == "/") {
			evt.returnValue = false;
			return false;
		}
		break;

	case 1:
		if (keyChar == "/") {
			if (source.value == "0") {
				evt.returnValue = false;
				return false;
			} else {
				source.value = "0" + source.value;
			}
		} else if (("456789").indexOf(source.value.charAt(0)) != -1
				|| (source.value.charAt(0) == "3" && keyChar != "0" && keyChar != "1")) {
			if (("01").indexOf(keyChar) != -1) {
				source.value = "0" + source.value + "/";
			} else {
				source.value = "0" + source.value + "/0";
			}
		}
		var dia = parseInt(source.value + keyChar, 10)

		if (dia > 31 || dia < 1) {
			evt.returnValue = false;
			return false;
		}
		break;

	case 2:
		if (keyChar != "/") {
			source.value += "/";
		}

		if (("23456789").indexOf(keyChar) != -1) {
			source.value = source.value.substr(0, 3) + "0";

			var dia = parseInt(source.value.substr(0, 2), 10);
			var mes = parseInt(source.value.substr(3, 1) + keyChar, 10);

			if (mes == 4 || mes == 6 || mes == 9 || mes == 11) {
				if (dia == 31) {
					source.value = "30/" + source.value.substr(3, 2);
				}
			}
		}
		break;

	case 3:
		if (keyChar == "/") {
			evt.returnValue = false;
			return false;
		}
		if (("23456789").indexOf(keyChar) != -1) {
			source.value = source.value.substr(0, 3) + "0";

			var dia = parseInt(source.value.substr(0, 2), 10);
			var mes = parseInt(source.value.substr(3, 1) + keyChar, 10);
			if (mes == 4 || mes == 6 || mes == 9 || mes == 11) {
				if (dia == 31) {
					source.value = "30/" + source.value.substr(3, 2);
				}
			}
		}
		break;

	case 4:
		if (keyChar == "/") {
			if (source.value.charAt(source.value.length - 1) == "0") {
				evt.returnValue = false;
				return false;
			} else {
				source.value = (source.value).substr(0, 3) + "0"
						+ source.value.substr(3, 1);
			}
		}

		var dia = parseInt(source.value.substr(0, 2), 10);
		var mes = parseInt(source.value.substr(3, 1) + keyChar, 10);

		if (mes < 1 || mes > 12) {
			evt.returnValue = false;
			return false;
		}
		if (mes == 4 || mes == 6 || mes == 9 || mes == 11) {
			if (dia == 31) {
				source.value = "30/" + source.value.substr(3, 2);
			}
		}
		break;

	case 5:
		var dig5= parseInt(keyChar);
		if (dig5 == 0) {
			evt.returnValue = false;
			return false;
		} else if (dig5 > 2){
			evt.returnValue = false;
			return false;
		}
		
		if (keyChar != "/") {
			source.value += "/";
		}
		break;

	case 6:
	    var dig6 = parseInt(keyChar);
		if (dig6 == 0) {
			evt.returnValue = false;
			return false;
		} else if (dig6 > 2){
			evt.returnValue = false;
			return false;
		}
		
	case 7:
		var dig7 = parseInt(keyChar);
		if (dig7 > 0) {
			evt.returnValue = false;
			return false;
		} 

	case 9:
		if (keyChar == "/") {
			evt.returnValue = false;
			return false;
		}
		var dia = parseInt(source.value.substr(0, 2), 10);
		var mes = parseInt(source.value.substr(3, 2), 10);
		var ano = parseInt(source.value.substr(6) + keyChar, 10)
		
		if (mes == 2) {
			if (dia >= 29) {
				if (ano % 4 != 0) {
					source.value = "28/02/" + source.value.substr(6);
				} else {
					source.value = "29/02/" + source.value.substr(6);
				}
			}
		}
		break;

	default:
		if (keyChar == "/") {
			evt.returnValue = false;
			return false;
		}
	}
}

function valida_horas(edit){
	alert(event.keyCode); 
    if(event.keyCode<48 || event.keyCode>57){
      event.returnValue=false;
    }
    if(edit.value.length==2 || edit.value.length==5){
      edit.value+= ":";
    }   
}

function valida_horasMinutos(edit){
    if(event.keyCode<48 || event.keyCode>57){
      event.returnValue=false;
    }
    if(edit.value.length==2){
      edit.value+= ":";
    }   
}
function currencyFormat(fld, e) {
	var milSep = '.';
	var decSep = ','; 	
	var sep = 0;
	var key = '';
	var i = j = 0;
	var len = len2 = 0;
	var strCheck = '0123456789';
	var aux = aux2 = '';
	var whichCode = e.keyCode;
	if (whichCode == 0) whichCode = e.which;  
	if (whichCode == 13) return true;  
	key = String.fromCharCode(whichCode);  
	if (strCheck.indexOf(key) == -1) return false;  
	
	if (e.keyCode) 
		e.keyCode = 0;
	else if (e.which) 
		e.which = 0; 
	else if (e.charCode) 
		e.charCode = 0; 			
	
	len = fld.value.length;
	for(i = 0; i < len; i++)
	if ((fld.value.charAt(i) != '0') && (fld.value.charAt(i) != decSep)) break;
	aux = '';
	for(; i < len; i++)
	if (strCheck.indexOf(fld.value.charAt(i))!=-1) aux += fld.value.charAt(i);
	aux += key;
	len = aux.length;
	if (len == 0) fld.value = '';
	if (len == 1) fld.value = '0'+ decSep + '0' + aux;
	if (len == 2) fld.value = '0'+ decSep + aux;
	if (len > 2) {
		aux2 = '';
		for (j = 0, i = len - 3; i >= 0; i--) {
			if (j == 3) {
				aux2 += milSep;
				j = 0;
			}
			aux2 += aux.charAt(i);
			j++;
		}
		fld.value = '';
		len2 = aux2.length;
		for (i = len2 - 1; i >= 0; i--)
			fld.value += aux2.charAt(i);
		fld.value += decSep + aux.substr(len - 2, len);
	}
	
	
	return false;
}

String.prototype.fracao = function() {
	return String(parseFloat(this) - parseInt(this)); 
} 

function isContratoBacen(source){
	
	var evt = window.event;
	var keyChar = String.fromCharCode(window.event.keyCode);
	var charCorrent = '';
	if (("0123456789").indexOf(keyChar) == -1) {
		evt.returnValue = false;
		return false;
	}else{
		charCorrent = ("0123456789").indexOf(keyChar);
	}
	//alert(source.length);
	if(source.value.length == 2){
		source.value += "/";
	}
	
	
}
function isHoraMinuto(edit) {
      if(event.keyCode<48 || event.keyCode>57){
        event.returnValue=false;
      }
      if(edit.value.length==5){
        event.returnValue=false;
      }
      if(edit.value.length==2){
        edit.value+=":";
      }
}
function isDigit(keyEvent) {
	if (document.all)
		var tecla = event.keyCode;
	else if (document.layers)
		var tecla = e.which;
	if (tecla > 47 && tecla < 58)
		return true;
	else {
		if (tecla != 8)
			event.keyCode = 0;
		else
			return true;
	}
}
function isCurrency(keyEvent) {
	if (document.all)
		var tecla = event.keyCode;
	else if (document.layers)
		var tecla = e.which;
		
	if(tecla ==44)
		return true;
		
	if(tecla ==45){
		return true;
	}
	if (tecla > 47 && tecla < 58)
		return true;
	else {
		if (tecla != 8)
			event.keyCode = 0;
		else
			return true;
	}
}

function isNumberFracionary(keyEvent, permiteNegativo) {
	if (document.all)
		var tecla = event.keyCode;
	else if (document.layers)
		var tecla = e.which;
		
	if(tecla ==46)
		return true;
		
	if(tecla ==44)
		return true;
		
	if(permiteNegativo==true){
		if(tecla ==45){
			return true;
		}
	}
	if (tecla > 47 && tecla < 58)
		return true;
	else {
		if (tecla != 8)
			event.keyCode = 0;
		else
			return true;
	}
}

function apenasNumeroInteiro(keyEvent, permiteNegativo) {
	if (document.all)
		var tecla = event.keyCode;
	else if (document.layers)
		var tecla = e.which;
	
	if(tecla ==46)
		return true;
		
	if(permiteNegativo==true){
		if(tecla ==45){
			return true;
		}
	}
	
	if (tecla > 47 && tecla < 58)
		return true;
	else {
		if (tecla != 8)
			event.keyCode = 0;
		else
			return true;
	}
}

function isSpecial(campo) {
	
	var whichCode = event.keyCode; 
	if (whichCode == 0) whichCode = event.which;  
	if (whichCode == 13) return true;  
	if (whichCode == 231) return event.keyCode = null;  
	if (whichCode == 199) return event.keyCode = null;  
	key = String.fromCharCode(whichCode);  
	if (semCaracterEspeciais.test(campo.value+key))
		event.keyCode = null;
	else {
		return true;
	}
}

function validarConta(campo) {
	var validarConta = new Array(0, 231, 199, 92, 39, 34, 33, 64, 35, 36, 38, 123, 125, 94, 126, 180, 96, 63, 62, 60, 61, 59, 124, 168, 37);
	var whichCode = event.keyCode; 
	for (i=0;i<=validarConta.length;i++)
	{
		if (whichCode == validarConta[i]){
			return event.keyCode = null;
		}
	}
}

function validarCaracEspeciais(campo) {
	validarConta(campo);
}

function caracteresUpperCase(campo) {
	campo.value = campo.value.toUpperCase();
}

function caracteresUpperCaseSwift(campo) {
	key = window.event.keyCode;
	if ((key > 0x60) && (key < 0x7B))
	window.event.keyCode = key-0x20;
}

function checaSemEspeciais(obj){
	
	if(semCaracterEspeciais.test(obj.value)){
		alert(1);
		event.returnValue=false;
		return false;
	} 
}

function numberFormatValue(fld){
	var v = fld.value;
	
	v=v.replace(/\D/g,"")									
	v=v.replace(/(\d)(\d{18})$/,"$1.$2")
	v=v.replace(/(\d)(\d{15})$/,"$1.$2")
	v=v.replace(/(\d)(\d{12})$/,"$1.$2")
	v=v.replace(/(\d)(\d{9})$/,"$1.$2")
	v=v.replace(/(\d)(\d{6})$/,"$1.$2")
	v=v.replace(/(\d)(\d{3})$/,"$1.$2")
	fld.value =  v;
	
	return false;	
}

function currencyFormatValue(fld) {
	var milSep = '.';
	var decSep = ','; 	
	var sep = 0;
	var i = j = 0;
	var len = len2 = 0;
	var strCheck = '0123456789';
	var aux = aux2 = '';
	len = fld.value.length;
	for(i = 0; i < len; i++)
	if ((fld.value.charAt(i) != '0') && (fld.value.charAt(i) != decSep)) break;
	aux = '';
	for(; i < len; i++)
	if (strCheck.indexOf(fld.value.charAt(i))!=-1) aux += fld.value.charAt(i);
	len = aux.length;
	if (len == 0) fld.value = '';
	//if (len == 1) fld.value = '0'+ decSep + '0' + aux;
	//if (len == 2) fld.value = '0'+ decSep + aux;
	if (len == 1) fld.value = aux + decSep + '00';
	if (len == 2) fld.value = aux + decSep + '00';
	if (len == 3) fld.value = aux + decSep + '00';
	if (len > 3) {
		aux2 = '';
		for (j = 0, i = len - 3; i >= 0; i--) {
			if (j == 3) {
				aux2 += milSep;
				j = 0;
			}
			aux2 += aux.charAt(i);
			j++;
		}
		fld.value = '';
		len2 = aux2.length;
		for (i = len2 - 1; i >= 0; i--)
			fld.value += aux2.charAt(i);
		fld.value += decSep + aux.substr(len - 2, len);
	}
	return false;
}

function formatValueNewHouseDecimal(fld,qntCasas) {
	var ponto = '.';
	var virgula = ','; 	
	var i = j = 0;
	var len = len2 = 0;
	var strCheck = '0123456789';
	var aux = aux2 = '';
	var valorInteiro = fld.value;
	var indexSeparadorVirgula  = valorInteiro.indexOf(virgula);
	var indexSeparadorPonto  = valorInteiro.indexOf(ponto);
	var valorInteiroNaoFormatado="";
	var valorDecimal = "";
	
	if(indexSeparadorVirgula>-1){
		valorInteiro = fld.value.substring(0,indexSeparadorVirgula);
		valorDecimal = fld.value.substring(indexSeparadorVirgula + 1, fld.value.length);
	}
	else if(indexSeparadorPonto>-1){
		valorInteiro = fld.value.substring(0,indexSeparadorPonto);
		valorDecimal = fld.value.substring(indexSeparadorPonto + 1, fld.value.length);
	}
	
	if((qntCasas >= valorDecimal.length && indexSeparadorVirgula>-1) || (qntCasas >= valorDecimal.length && indexSeparadorPonto>-1)){
		for(i=0; i < qntCasas-valorDecimal.length; i++){
			fld.value = fld.value + '0';
		}
	}else{
		fld.value = valorInteiro+virgula;
		for(i=0; i < qntCasas-len; i++){
			fld.value = fld.value + '0';
		}
	}
	
	if(valorDecimal.length > qntCasas){
		valorDecimal = valorDecimal.substring(0, qntCasas);
		if((indexSeparadorVirgula>-1) || (indexSeparadorPonto>-1)){
			fld.value = valorInteiro+virgula+valorDecimal;
		}
	}
	
	if(indexSeparadorVirgula>-1){
		valorInteiro = fld.value.substring(0,indexSeparadorVirgula);
		valorDecimal = fld.value.substring(indexSeparadorVirgula + 1, fld.value.length);
	}
	else if(indexSeparadorPonto>-1){
		valorInteiro = fld.value.substring(0,indexSeparadorPonto);
		valorDecimal = fld.value.substring(indexSeparadorPonto + 1, fld.value.length);
	}
	
	virgula = ','; 
	len = fld.value.length;
	for(i = 0; i < len; i++)
	if ((fld.value.charAt(i) != '0') && (fld.value.charAt(i) != virgula)) break;
	aux = '';
	for(; i < len; i++)
	if (strCheck.indexOf(fld.value.charAt(i))!=-1) aux += fld.value.charAt(i);
	len = aux.length;
	if (len == 0) fld.value = '';
	if(qntCasas >= valorDecimal.length){
		fld.value = '0'+ virgula;
		for(i=0; i < qntCasas-len; i++){
			fld.value = fld.value + '0';
		}
		fld.value = fld.value + aux;
	}

	if((indexSeparadorVirgula>-1) || (indexSeparadorPonto>-1)){
		if (len > qntCasas) {
			aux2 = aux;
			fld.value = '';
			len2 = aux2.length;
			for (i = len2,j=0; i <= len2 && j < len2; i--){
				if(i == qntCasas){
					fld.value += virgula;
				}
				fld.value += aux2.charAt(j);
				j++;
			}
		}
	}else{
		if (len > qntCasas) {
			aux2 = aux;
			fld.value = '';
			len2 = aux2.length;
			for (i = len2,j=0; i <= len2 && j < len2; i--){
				if(i == qntCasas){
					fld.value += virgula;
				}
				fld.value += aux2.charAt(j);
				j++;
			}
		}
	}
	return false;
}

function currencyFormatValueNewHouseDecimal(fld,qntCasas) {
	var milSep = '.';
	var decSep = ','; 	
	var sep = 0;
	var i = j = 0;
	var len = len2 = 0;
	var strCheck = '0123456789';
	var aux = aux2 = '';
	len = fld.value.length;
	for(i = 0; i < len; i++)
	if ((fld.value.charAt(i) != '0') && (fld.value.charAt(i) != decSep)) break;
	aux = '';
	for(; i < len; i++)
	if (strCheck.indexOf(fld.value.charAt(i))!=-1) aux += fld.value.charAt(i);
	len = aux.length;
	if (len == 0) fld.value = '';
	if(qntCasas >= len){
		fld.value = '0'+ decSep;
		for(i=0; i < qntCasas-len; i++){
			fld.value = fld.value + '0';
		}
		fld.value = fld.value + aux;
	}
//	if (len == 1) fld.value = '0'+ decSep + '0' + aux;
//	if (len == 2) fld.value = '0'+ decSep + aux;
//	if (len == 1) fld.value = aux + decSep + '00';
//	if (len == 2) fld.value = aux + decSep + '00';
//	if (len == 3) fld.value = aux + decSep + '00';
	if (len > qntCasas) {
		aux2 = aux;
		fld.value = '';
		len2 = aux2.length;
		for (i = len2,j=0; i <= len2 && j < len2; i--){
			if(i == qntCasas){
				fld.value += decSep;
			}
			fld.value += aux2.charAt(j);
			j++;
		}
	}
	return false;
}
 
function formatValueDecimalPonto(fld,qntCasas) {
	var decSep = '.'; 	
	var sep = 0;
	var i = j = 0;
	var len = len2 = 0;
	var strCheck = '0123456789';
	var aux = aux2 = '';
	len = fld.value.length;
	for(i = 0; i < len; i++)
	if ((fld.value.charAt(i) != '0') && (fld.value.charAt(i) != decSep)) break;
	aux = '';
	for(; i < len; i++)
	if (strCheck.indexOf(fld.value.charAt(i))!=-1) aux += fld.value.charAt(i);
	len = aux.length;
	if (len == 0) fld.value = '';
	if(qntCasas >= len){
		fld.value = '0'+ decSep;
		for(i=0; i < qntCasas-len; i++){
			fld.value = fld.value + '0';
		}
		fld.value = fld.value + aux;
	}
	if (len > qntCasas) {
		aux2 = aux;
		fld.value = '';
		len2 = aux2.length;
		for (i = len2,j=0; i <= len2 && j < len2; i--){
			if(i == qntCasas){
				fld.value += decSep;
			}
			fld.value += aux2.charAt(j);
			j++;
		}
	}
	return false;
}

function atualizaEscolha_23_50_55(escolha){
	
	var descricaoRelatedRefID = document.getElementById("formID:descricaoRelatedRefID");
	var SlctBnkOpt = document.getElementById("formID:SlctBnkOpt");
	var SlctBnkOpt_CRED = document.getElementById("formID:SlctBnkOpt:_1"); 
	var SlctOrdCust = document.getElementById("formID:SlctOrdCust");
	var SlctOrdCust_A = document.getElementById("formID:SlctOrdCust:_1"); 
	var SlctOrdCust_K = document.getElementById("formID:SlctOrdCust:_2"); 
	var SlctOrdCust_F = document.getElementById("formID:SlctOrdCust:_3"); 
	var cod50_Tipo = document.getElementById("formID:cod50_Tipo");
	var orderCustomer1 = document.getElementById("formID:orderCustomer1");
	var orderCustomer2 = document.getElementById("formID:orderCustomer2");
	var orderCustomer3 = document.getElementById("formID:orderCustomer3");
	var orderCustomer4 = document.getElementById("formID:orderCustomer4");
	var orderCustomer5 = document.getElementById("formID:orderCustomer5");
	var SlctTRI_A = document.getElementById("formID:SlctTRI:_1"); 
	var cod55_Forma_PagamentoID = document.getElementById("formID:cod55_Forma_PagamentoID");
	var cod55_Account = document.getElementById("formID:cod55_Account");
	var cod55_Texto_1 = document.getElementById("formID:cod55_Texto_1");
	var cod55_Texto_2 = document.getElementById("formID:cod55_Texto_2");
	var cod55_Texto_3 = document.getElementById("formID:cod55_Texto_3");
	var cod55_Tipo = document.getElementById("formID:cod55_Tipo");
	var tipoMensagemSwiftDetalhe = document.getElementById("formID:tipoMensagemSwiftDetalhe");
	
//	var id = SlctBnkOpt.id;
//	var el = forms.elements;
//	for (var i = 0; i < el.length; i++) { 
//		alert(el[i].id.substring(el[i].id.lastIndexOf(':')));
//		if (el[i].id.substring(el[i].id.lastIndexOf(':')) == id){
//			alert("Igual..");
//			if (el[i].checked){
//				alert(el[i].value);
//			}
//		}
//	}
	
	tipoMensagemSwiftDetalhe.value = escolha;
	if (escolha == "MTS103"){ 
		descricaoRelatedRefID.disabled = true;

		SlctBnkOpt.disabled = false;
		SlctBnkOpt_CRED.checked = true; 

		SlctOrdCust.disabled = false;
		SlctOrdCust_A.disabled = true;
		SlctOrdCust_F.disabled = true;
		SlctOrdCust_K.checked = true;
		cod50_Tipo.Value = "K";
		orderCustomer1.disabled = false;		
		orderCustomer2.disabled = false;		
		orderCustomer3.disabled = false;		
		orderCustomer4.disabled = false;		
		orderCustomer5.disabled = false;		

		cod55_Forma_PagamentoID.disabled = false;
		cod55_Account.disabled = false;
		cod55_Texto_1.disabled = false;
		cod55_Texto_2.disabled = false;
		cod55_Texto_3.disabled = false;
	}

	if (escolha == "MTS202" || escolha == "COMAG"){ 
		descricaoRelatedRefID.disabled = false;

		SlctBnkOpt_CRED.checked = true; 
		SlctBnkOpt_CRED.checked = false; 
		SlctBnkOpt.disabled = true;
		

		SlctOrdCust_A.checked = true;
		SlctOrdCust_A.checked = false;
		cod50_Tipo.value = "";
		SlctOrdCust.disabled = true;
		orderCustomer1.disabled = true;		
		orderCustomer2.disabled = true;		
		orderCustomer3.disabled = true;		
		orderCustomer4.disabled = true;		
		orderCustomer5.disabled = true;		
		

		SlctTRI_A.checked = true;
		SlctTRI_A.checked = false;
		cod55_Tipo.Value = "";
		cod55_Forma_PagamentoID.selectedIndex = 0;
		cod55_Forma_PagamentoID.disabled = true;
		cod55_Account.value = "";
		cod55_Texto_1.value = "";
		cod55_Texto_2.value = "";
		cod55_Texto_3.value = "";
		cod55_Account.disabled = true;
		cod55_Texto_1.disabled = true;
		cod55_Texto_2.disabled = true;
		cod55_Texto_3.disabled = true;
		
	}
}

function tipoComagPrincipal_23_50_55(escolha){

	var btnComag = document.getElementById("formID:btnComag");
	var btnValorPrincipal = document.getElementById("formID:btnValorPrincipal");
	var mts103 = document.getElementById("formID:SlctTipoMsg:_1");
	var mts202 = document.getElementById("formID:SlctTipoMsg:_2");
	var SlctTipoMsg = document.getElementById("formID:SlctTipoMsg");
	var valorComagID = document.getElementById("formID:valorComagID");
	var tipoComagPrincipal = document.getElementById("formID:tipoComagPrincipal");

	if (escolha == "COMAG"){
		btnComag.style.background  = "#999999";
		mts202.checked = true;
		mts202.checked = false;
		SlctTipoMsg.disabled = true;
		valorComagID.disabled = false;
		tipoComagPrincipal.value = escolha;
		atualizaEscolha_23_50_55(escolha);
	}
	if (escolha == "valorPrincipal" || escolha == "MTS103" || escolha == "MTS202"){
		valorComagID.value = 0;
		valorComagID.disabled = true;
		tipoComagPrincipal.value = "valorPrincipal";
		SlctTipoMsg.disabled = false;
		btnComag.style.background  = "#F8F8FF";
		if (mts103.checked){
			atualizaEscolha_23_50_55(mts103.value);
		}
		if (mts202.checked){
			atualizaEscolha_23_50_55(mts202.value);
		}
	}
}

function atualizaEscolha_56_57_59_70(escolha){
	
	var descricaoRelatedRefID = document.getElementById("formID:descricaoRelatedRefID");
	var chkA = document.getElementById("formID:chkA"); 
	var cod59_Tipo = document.getElementById("formID:cod59_Tipo");
	var paisContaID = document.getElementById("formID:paisContaID");
	var cod59_Account = document.getElementById("formID:cod59_Account");
	var cod59_Texto_1 = document.getElementById("formID:cod59_Texto_1");
	var cod59_Texto_2 = document.getElementById("formID:cod59_Texto_2");
	var cod59_Texto_3 = document.getElementById("formID:cod59_Texto_3");
	var cod59_Texto_4 = document.getElementById("formID:cod59_Texto_4");
	var cod70_RFB = document.getElementById("formID:cod70_RFB");
	var cod70_Texto_1 = document.getElementById("formID:cod70_Texto_1");
	var cod70_Texto_2 = document.getElementById("formID:cod70_Texto_2");
	var cod70_Texto_3 = document.getElementById("formID:cod70_Texto_3");
	var cod70_Texto_4 = document.getElementById("formID:cod70_Texto_4");
	var cod70_Texto_5 = document.getElementById("formID:cod70_Texto_5");
	var tipoMensagemSwiftDetalhe = document.getElementById("formID:tipoMensagemSwiftDetalhe");
	
	tipoMensagemSwiftDetalhe.value = escolha;
	if (escolha == "MTS103"){ 
		descricaoRelatedRefID.disabled = true;

		chkA.disabled = false;
		paisContaID.disabled = false;
		cod59_Account.disabled = false;
		cod59_Texto_1.disabled = false;
		cod59_Texto_2.disabled = false;
		cod59_Texto_3.disabled = false;
		cod59_Texto_4.disabled = false;


		cod70_RFB.disabled = false;
		cod70_Texto_1.disabled = false;
		cod70_Texto_2.disabled = false;
		cod70_Texto_3.disabled = false;
		cod70_Texto_4.disabled = false;
		cod70_Texto_5.disabled = false;
	}
	
	if (escolha == "MTS202" || escolha == "COMAG"){ 
		descricaoRelatedRefID.disabled = false;

		chkA.checked = false;
		cod59_Tipo.value = "";		
		paisContaID.selectedIndex = 0;
		cod59_Account.value = "";
		cod59_Texto_1.value = "";
		cod59_Texto_2.value = "";
		cod59_Texto_3.value = "";
		cod59_Texto_4.value = "";
		
		chkA.disabled = true;
		paisContaID.disabled = true;
		cod59_Account.disabled = true;
		cod59_Texto_1.disabled = true;
		cod59_Texto_2.disabled = true;
		cod59_Texto_3.disabled = true;
		cod59_Texto_4.disabled = true;


		cod70_RFB.value = "";
		cod70_Texto_1.value = "";
		cod70_Texto_2.value = "";
		cod70_Texto_3.value = "";
		cod70_Texto_4.value = "";
		cod70_Texto_5.value = "";

		cod70_RFB.disabled = true;
		cod70_Texto_1.disabled = true;
		cod70_Texto_2.disabled = true;
		cod70_Texto_3.disabled = true;
		cod70_Texto_4.disabled = true;
		cod70_Texto_5.disabled = true;
	}
	
}

function tipoComagPrincipal_56_57_59_70(escolha){
	
	var btnComag = document.getElementById("formID:btnComag");
	var btnValorPrincipal = document.getElementById("formID:btnValorPrincipal");
	var mts103 = document.getElementById("formID:SlctTipoMsg:_1");
	var mts202 = document.getElementById("formID:SlctTipoMsg:_2");
	var SlctTipoMsg = document.getElementById("formID:SlctTipoMsg");
	var valorComagID = document.getElementById("formID:valorComagID");
	var tipoComagPrincipal = document.getElementById("formID:tipoComagPrincipal");

	if (escolha == "COMAG"){
		btnComag.style.background  = "#999999";
		mts202.checked = true;
		mts202.checked = false;
		SlctTipoMsg.disabled = true;
		valorComagID.disabled = false;
		tipoComagPrincipal.value = escolha;
		atualizaEscolha_56_57_59_70(escolha);
	}
	if (escolha == "valorPrincipal" || escolha == "MTS103" || escolha == "MTS202"){
		valorComagID.value = 0;
		valorComagID.disabled = true;
		tipoComagPrincipal.value = "valorPrincipal";
		SlctTipoMsg.disabled = false;
		btnComag.style.background  = "#F8F8FF";
		if (mts103.checked){
			atualizaEscolha_56_57_59_70(mts103.value);
		}
		if (mts202.checked){
			atualizaEscolha_56_57_59_70(mts202.value);
		}
	}
}

function atualizaEscolha_71_72(escolha){
	
	var descricaoRelatedRefID = document.getElementById("formID:descricaoRelatedRefID");
	var SlctCod71A = document.getElementById("formID:SlctCod71A");
	var SlctCod71A_1 = document.getElementById("formID:SlctCod71A:_1"); 
	var cod71G_Currency = document.getElementById("formID:cod71G_Currency"); 
	var cod71G_Valor = document.getElementById("formID:cod71G_Valor"); 
	var tipoMensagemSwiftDetalhe = document.getElementById("formID:tipoMensagemSwiftDetalhe");
	
	tipoMensagemSwiftDetalhe.value = escolha;
	if (escolha == "MTS103"){ 
		descricaoRelatedRefID.disabled = true;

		SlctCod71A.disabled = false;

		cod71G_Currency.disabled = false;
		cod71G_Valor.disabled = false;
	}

	if (escolha == "MTS202" || escolha == "COMAG"){ 
		descricaoRelatedRefID.disabled = false;

		SlctCod71A_1.ckecked = true;
		SlctCod71A_1.ckecked = false;
		SlctCod71A.disabled = true;

		cod71G_Currency.value = "";
		cod71G_Valor.value = "0";
		cod71G_Currency.disabled = true;
		cod71G_Valor.disabled = true;
	}
}

function tipoComagPrincipal_71_72(escolha){
	
	var btnComag = document.getElementById("formID:btnComag");
	var btnValorPrincipal = document.getElementById("formID:btnValorPrincipal");
	var mts103 = document.getElementById("formID:SlctTipoMsg:_1");
	var mts202 = document.getElementById("formID:SlctTipoMsg:_2");
	var SlctTipoMsg = document.getElementById("formID:SlctTipoMsg");
	var valorComagID = document.getElementById("formID:valorComagID");
	var tipoComagPrincipal = document.getElementById("formID:tipoComagPrincipal");

	if (escolha == "COMAG"){
		btnComag.style.background  = "#999999";
		mts202.checked = true;
		mts202.checked = false;
		SlctTipoMsg.disabled = true;
		valorComagID.disabled = false;
		tipoComagPrincipal.value = escolha;
		atualizaEscolha_71_72(escolha);
	}
	if (escolha == "valorPrincipal" || escolha == "MTS103" || escolha == "MTS202"){
		valorComagID.value = 0;
		valorComagID.disabled = true;
		tipoComagPrincipal.value = "valorPrincipal";
		SlctTipoMsg.disabled = false;
		btnComag.style.background  = "#F8F8FF";
		if (mts103.checked){
			atualizaEscolha_71_72(mts103.value);
		}
		if (mts202.checked){
			atualizaEscolha_71_72(mts202.value);
		}
	}
}

function tratarFormaPagtoCod55(campo){
	
	var tipoComagPrincipal = document.getElementById("formID:tipoComagPrincipal");
	var SlctTRI_A = document.getElementById("formID:SlctTRI:_1"); 
	var SlctTRI_D = document.getElementById("formID:SlctTRI:_3"); 
	var cod55_Account = document.getElementById("formID:cod55_Account");
	var cod55_Texto_1 = document.getElementById("formID:cod55_Texto_1");
	var cod55_Texto_2 = document.getElementById("formID:cod55_Texto_2");
	var cod55_Texto_3 = document.getElementById("formID:cod55_Texto_3");
	var cod55_Tipo = document.getElementById("formID:cod55_Tipo");


	SlctTRI_A.checked = true;
	SlctTRI_A.checked = false;
	cod55_Tipo.value = "";
	cod55_Account.disabled = true;
	cod55_Texto_1.disabled = true;
	cod55_Texto_2.disabled = true;
	cod55_Texto_3.disabled = true;
	
	if (tipoComagPrincipal.value == "MTS103"){

		if (campo.value > 0 && campo.value < 7){ 
			cod55_Account.disabled = false;
			cod55_Texto_1.disabled = false;
			cod55_Texto_2.disabled = false;
			cod55_Texto_3.disabled = false;
			if (campo.value == 1){ 
				SlctTRI_A.checked = true;
				cod55_Tipo.value = "A";
			}else {
				SlctTRI_D.checked = true;
				cod55_Tipo.value = "D";
			} 
		}else {
			cod55_Account.value = "";
			cod55_Texto_1.value = "";
			cod55_Texto_2.value = "";
			cod55_Texto_3.value = "";
		}
	} else{
		campo.selectedIndex = 0;
		campo.disabled = true;
		cod55_Account.value = "";
		cod55_Texto_1.value = "";
		cod55_Texto_2.value = "";
		cod55_Texto_3.value = "";
	}
}
function tratarFormaPagtoCod56(campo){
	
	var SlctIntermediary_A = document.getElementById("formID:SlctIntermediary:_1"); 
	var SlctIntermediary_D = document.getElementById("formID:SlctIntermediary:_3");  
	var cod56_Tipo = document.getElementById("formID:cod56_Tipo"); 
	var cod56_Account = document.getElementById("formID:cod56_Account");
	var cod56_Texto_1 = document.getElementById("formID:cod56_Texto_1");
	var cod56_Texto_2 = document.getElementById("formID:cod56_Texto_2");
	var cod56_Texto_3 = document.getElementById("formID:cod56_Texto_3");

	SlctIntermediary_A.checked = true;
	SlctIntermediary_A.checked = false;
	cod56_Tipo.value = "";
	cod56_Account.disabled = true;
	cod56_Texto_1.disabled = true;
	cod56_Texto_2.disabled = true;
	cod56_Texto_3.disabled = true;
	
	if (campo.value > 0 && campo.value < 7){ 
		cod56_Account.disabled = false;
		cod56_Texto_1.disabled = false;
		cod56_Texto_2.disabled = false;
		cod56_Texto_3.disabled = false;
		if (campo.value == 1){ 
			SlctIntermediary_A.checked = true;
			cod56_Tipo.value = "A";
		}else {
			SlctIntermediary_D.checked = true;
			cod56_Tipo.value = "D";
		} 
	}else {
		cod56_Account.value = "";
		cod56_Texto_1.value = "";
		cod56_Texto_2.value = "";
		cod56_Texto_3.value = "";
	}
}

function tratarFormaPagtoCod57(campo){
	
	var SlctAccount_A = document.getElementById("formID:SlctAccount:_1"); 
	var SlctAccount_D = document.getElementById("formID:SlctAccount:_2"); 
	var cod57_Tipo    = document.getElementById("formID:cod57_Tipo");
	var cod57_Account = document.getElementById("formID:cod57_Account");
	var cod57_Texto_1 = document.getElementById("formID:cod57_Texto_1");
	var cod57_Texto_2 = document.getElementById("formID:cod57_Texto_2");
	var cod57_Texto_3 = document.getElementById("formID:cod57_Texto_3");

	SlctAccount_A.checked = true;
	SlctAccount_A.checked = false;
	cod57_Tipo.value = "";
	cod57_Account.disabled = true;
	cod57_Texto_1.disabled = true;
	cod57_Texto_2.disabled = true;
	cod57_Texto_3.disabled = true;
	
	if (campo.value > 0 && campo.value < 7){ 
		cod57_Account.disabled = false;
		cod57_Texto_1.disabled = false;
		cod57_Texto_2.disabled = false;
		cod57_Texto_3.disabled = false;
		if (campo.value == 1){ 
			SlctAccount_A.checked = true;
			cod57_Tipo.value = "A";
		}else {
			SlctAccount_D.checked = true;
			cod57_Tipo.value = "D";
		} 
	}else {
		cod57_Account.value = "";
		cod57_Texto_1.value = "";
		cod57_Texto_2.value = "";
		cod57_Texto_3.value = "";
	}
}

function tratarCod59Tipo(campo){
	var cod59_Tipo    = document.getElementById("formID:cod59_Tipo");
	
	if (campo.checked)
		cod59_Tipo.value = "A";
	else
		cod59_Tipo.value = "";
}

String.prototype.replaceAll = function(de, para){
    var str = this;
    var pos = str.indexOf(de);
    while (pos > -1){
		str = str.replace(de, para);
		pos = str.indexOf(de);
	}
    return (str);
}

String.prototype.reverse = function() {
	return this.split('').reverse().join('');
}

String.prototype.times = function(n) {
	var s = '';
	for (var i = 0; i < n; i++)
		s += this;

	return s;
}

String.prototype.zt = function(n) {
	return this + '0'.times(n - this.length);
} 

String.prototype.group = function() {
	var s = this.reverse(), r = ''; 
	for (var i = 0; i < s.length; i++)
		r += (i > 0 && i % 3 == 0 ? '.' : '') + s.charAt(i);
 
	return r.reverse();
}

String.prototype.formataNumero = function(posFrac) {
	if(this=='') return '';
	var fracao = "";
	var inteiro = this.replaceAll('.','');
	if(this.indexOf(",")!==-1){
		inteiro = this.substring(0,this.indexOf(","));
		fracao = this.substring(this.indexOf(","));
		
		if(fracao.length<++posFrac) 
			fracao = fracao.zt(posFrac);		
	} else {
		fracao = fracao + ",";
		fracao = fracao.zt(++posFrac);
	}

	return inteiro.group() + fracao;
}

function informaNumero(objeto, posInt, posFrac) {
	informaNumero(objeto, posInt, posFrac, null);
}

function informaNumero(objeto, posInt, posFrac, negativo){
	
	posInt--;
	if (document.all)
		var tecla = event.keyCode;
	else if (document.layers)
		var tecla = e.which;
	
	if (tecla > 47 && tecla < 58){
		var valor = objeto.value;
		var separador = valor.indexOf(",");
		if(separador==-1) {
			if(valor.length>posInt){
				event.keyCode=0;
			} else {
				return true;
			}
		} else {
			
			var caretPos = 0;	
			if (document.selection) {
				var Sel = document.selection.createRange ();
				Sel.moveStart ('character', -objeto.value.length);
				caretPos = Sel.text.length;
			} else if (objeto.selectionStart || objeto.selectionStart == '0')
				caretPos = objeto.selectionStart;
			
			var valor = objeto.value;
			var separador = valor.indexOf(",");
			
			if(caretPos<=separador){
				if(separador > posInt){
					event.keyCode=0;
				} else {
					return true;	
				}
			} else {
				if((valor.length - separador)>posFrac){
					event.keyCode=0;
				} else {
					return true;
				}
			}
		}
		
	} else {
		if(tecla==44 && posFrac>0){
			if(objeto.value.indexOf(",")==-1)
				return true;
			else 
				event.keyCode = 0;
		} else if(tecla == 45 && negativo) {
			var caretPos = 0;	
			if (document.selection) {
				var Sel = document.selection.createRange ();
				Sel.moveStart ('character', -objeto.value.length);
				caretPos = Sel.text.length;
			} else if (objeto.selectionStart || objeto.selectionStart == '0')
				caretPos = objeto.selectionStart;

			if(caretPos==0) {
				return true;
			} else {
				event.keyCode = 0;
			}
		
		} else {
			if (tecla != 8)
				event.keyCode = 0;
			else
				return true;			
		}

	}	
}

function prePosFixada(campoHabilita, campoDesabilita){

	campoDesabilita.value    = '';
}


Number.prototype.truncate = function(n) {
	return Math.round(this * Math.pow(10, n)) / Math.pow(10, n);
}

function limpaNumero(campoTexto){
	campoTexto.value = campoTexto.value.replaceAll('.','');
}

function formataNumero(campoTexto, posFrac){
	campoTexto.value = campoTexto.value.formataNumero(posFrac);
}

function formataMaiusculo(campoTexto){
	campoTexto.value = campoTexto.value.toUpperCase();
}

function preencheEncaixeBaixa(){
	var pronto = document.forms["complementarContratoImp"].elements["complementarContratoImp:PRONTO_BOOLEAN"].value;
	var valorME = parseFloat(document.forms["complementarContratoImp"].elements["complementarContratoImp:valorMEID"].value.replaceAll(".","").replace(",","."));
	var valorTX = document.forms["complementarContratoImp"].elements["complementarContratoImp:taxaID"].value;
	var valorEncaixeMN = String((valorTX*valorME).truncate(2)).replaceAll(".",",").formataNumero(2);
	if(isNaN(valorTX*valorME)) valorEncaixeMN="0,00";
	var valorBaixaME="0,00";
	if(pronto == 'true'){
		if(!isNaN(valorME)) valorBaixaME = String((valorME).truncate(2)).replaceAll(".",",").formataNumero(2);
	}
	document.forms["complementarContratoImp"].elements["complementarContratoImp:valorEncaixeMNID"].value = valorEncaixeMN;
	document.forms["complementarContratoImp"].elements["complementarContratoImp:valorBaixaMEID"].value = valorBaixaME;
} 

function habilitaTodosCheckboxDespComag() {
	
	for ( var i = 0; i < 50; i++) {
		
		if(document.getElementById("receitaDespesaComagExp:tabelaListaComag:" + i + ":checkboxID")){

			if (document.getElementById("receitaDespesaComagExp:tabelaListaComag:checkboxTodosID") != null && document.getElementById("receitaDespesaComagExp:tabelaListaComag:checkboxTodosID").checked == true) {
				document.getElementById("receitaDespesaComagExp:tabelaListaComag:" + i + ":checkboxID").checked = true;
				
			}else{
				document.getElementById("receitaDespesaComagExp:tabelaListaComag:" + i + ":checkboxID").checked = false;
			}
		}
	}
}

function recalculaTaxa(){
	var valorMN = parseFloat(document.forms["contratacaoExp"].elements["contratacaoExp:valorMNID"].value.replaceAll(".","").replace(",","."));
	var valorMNFixoID = parseFloat(document.forms["contratacaoExp"].elements["contratacaoExp:valorMNFixoID"].value.replaceAll(".","").replace(",","."));
	var valorMaior = valorMNFixoID + 1.00;
	var valorMenor = valorMNFixoID - 1.00;
	if (valorMN == valorMaior) {
		document.forms["contratacaoExp"].elements["contratacaoExp:valorMNID"].value = valorMN;
	} else if (valorMN == valorMenor) {
		document.forms["contratacaoExp"].elements["contratacaoExp:valorMNID"].value = valorMN;
	} else {
		document.forms["contratacaoExp"].elements["contratacaoExp:valorMNID"].value = valorMNFixoID;
	}
}

function limpaPreFixado(){
	document.forms["monitorarContratoImp"].elements["monitorarContratoImp:bonificacaoPreComplementarID"].value = "";
}

function limpaPosFixado(){
	document.forms["monitorarContratoImp"].elements["monitorarContratoImp:detalhePosFixadoID"].value = "";
}

function calcAdiant(){
	var pcAdtFix = parseFloat(document.forms["contratacaoExp"].elements["contratacaoExp:pcAdtaFixID"].value.replaceAll(".","").replace(",","."));
	var pcAdt = parseFloat(document.forms["contratacaoExp"].elements["contratacaoExp:pcAdtaID"].value.replaceAll(".","").replace(",","."));
	var valorME = parseFloat(document.forms["contratacaoExp"].elements["contratacaoExp:valorMEID"].value.replaceAll(".","").replace(",","."));
	var valorTX = parseFloat(document.forms["contratacaoExp"].elements["contratacaoExp:taxaID"].value.replaceAll(".","").replace(",","."));
	var vlAdt = parseFloat(document.forms["contratacaoExp"].elements["contratacaoExp:vlAdiantamentoFixID"].value.replaceAll(".","").replace(",","."));
	if (pcAdt > pcAdtFix){
		document.forms["contratacaoExp"].elements["contratacaoExp:pcAdtaID"].value = pcAdtFix;
	} else {
		vlAdt = String((((valorME*valorTX)*pcAdt)/100).truncate(2)).replaceAll(".",",").formataNumero(2);
		document.forms["contratacaoExp"].elements["contratacaoExp:vlAdiantamentoID"].value = vlAdt;
	}
}

function calcPcAdiant(){
	var vlAdtaFix = parseFloat(document.forms["contratacaoExp"].elements["contratacaoExp:vlAdiantamentoFixID"].value.replaceAll(".","").replace(",","."));
	var vlAdta = parseFloat(document.forms["contratacaoExp"].elements["contratacaoExp:vlAdiantamentoID"].value.replaceAll(".","").replace(",","."));
	var valorME = parseFloat(document.forms["contratacaoExp"].elements["contratacaoExp:valorMEID"].value.replaceAll(".","").replace(",","."));
	var valorTX = parseFloat(document.forms["contratacaoExp"].elements["contratacaoExp:taxaID"].value.replaceAll(".","").replace(",","."));
	var tempV = (vlAdta*100).truncate(2);
	var pcAdt = parseFloat(document.forms["contratacaoExp"].elements["contratacaoExp:pcAdtaFixID"].value.replaceAll(".","").replace(",","."));
	if (vlAdta > vlAdtaFix){
		if(!isNaN(vlAdtaFix)) vlAdtaFix = "0,00";
		document.forms["contratacaoExp"].elements["contratacaoExp:pcAdtaID"].value = vlAdtaFix;
	} else {
		pcAdt = String((tempV/(valorME*valorTX)).truncate(2)).replaceAll(".",",").formataNumero(2);
		if(!isNaN(pcAdt)) pcAdt = "0,00";
		document.forms["contratacaoExp"].elements["contratacaoExp:pcAdtaID"].value = pcAdt;
	}
}

function calcAdiantValorContrato(){
	var vlAdtFix = parseFloat(document.forms["contratacaoExp"].elements["contratacaoExp:vlPrevAdiantID"].value.replaceAll(".","").replace(",","."));
	var pcAdtFix = parseFloat(document.forms["contratacaoExp"].elements["contratacaoExp:pcAdtaFixID"].value.replaceAll(".","").replace(",","."));
	var valorME = parseFloat(document.forms["contratacaoExp"].elements["contratacaoExp:valorMEID"].value.replaceAll(".","").replace(",","."));
	var valorTX = parseFloat(document.forms["contratacaoExp"].elements["contratacaoExp:taxaID"].value);
	
	var vlAdt = (((valorME*valorTX)*pcAdtFix)/100).truncate(2);

	if (vlAdt > vlAdtFix){
		if(isNaN(valorME)) vlAdtFix = "";
		document.forms["contratacaoExp"].elements["contratacaoExp:vlAdiantID"].value = String((vlAdt).truncate(2)).replaceAll(".",",").formataNumero(2);
	} else {
		if(isNaN(valorME)) vlAdt = "";
		document.forms["contratacaoExp"].elements["contratacaoExp:vlAdiantID"].value = String((vlAdt).truncate(2)).replaceAll(".",",").formataNumero(2);
	}
}

function calcAdiantValorCambial(){
	var vlAdtFix = parseFloat(document.forms["contratacaoExp"].elements["contratacaoExp:vlMNID"].value.replaceAll(".","").replace(",","."));
	var pcAdtFix = parseFloat(document.forms["contratacaoExp"].elements["contratacaoExp:pcAdtaFixID"].value.replaceAll(".","").replace(",","."));
	var valorME = parseFloat(document.forms["contratacaoExp"].elements["contratacaoExp:vlMEID"].value.replaceAll(".","").replace(",","."));
	var valorTX = parseFloat(document.forms["contratacaoExp"].elements["contratacaoExp:taxaID"].value);
	
	var vlAdt = (((valorME*valorTX)*pcAdtFix)/100).truncate(2);

	if (vlAdt > vlAdtFix){
		if(isNaN(valorME)) vlAdtFix = "";
		document.forms["contratacaoExp"].elements["contratacaoExp:vlMNID"].value = String((vlAdt).truncate(2)).replaceAll(".",",").formataNumero(2);
	} else {
		if(isNaN(valorME)) vlAdt = "";
		document.forms["contratacaoExp"].elements["contratacaoExp:vlMNID"].value = String((vlAdt).truncate(2)).replaceAll(".",",").formataNumero(2);
	}
}

function calculaValorComag(){
	var valorComag = new Number(document.forms["complementarMensagemSwift"].elements["complementarMensagemSwift:valorComagContratoID"].value.replaceAll(".","").replace(",","."));
	var valorDespesa = new Number(document.forms["complementarMensagemSwift"].elements["complementarMensagemSwift:valorDespesaID"].value.replaceAll(".","").replace(",","."));

	if (valorComag > 0){
		if (valorDespesa <= valorComag){
			valorComag = (valorComag - valorDespesa).toFixed(2);
		} else {
			valorDespesa = document.forms["complementarMensagemSwift"].elements["complementarMensagemSwift:valorComagContratoID"].value;
			document.forms["complementarMensagemSwift"].elements["complementarMensagemSwift:valorDespesaID"].value = valorDespesa;
			valorComag = (valorComag - valorDespesa).toFixed(2);
			if(isNaN(valorComag)) {
				valorComag = 0,00;
				valorComag.toFixed(2);
			}
		}
	}
	
	document.forms["complementarMensagemSwift"].elements["complementarMensagemSwift:valorComagID"].value = valorComag;
}


function calcTotalLote(){
	
	var vlTotal = new Number();

     for ( var i = 0; i < 50; i++) {
		
		if(document.getElementById("transfLoteOp:tableOpLote:" + i + ":checkboxID") != null && document.getElementById("transfLoteOp:tableOpLote:" + i + ":checkboxID").checked == true){

				var vlTemp = new Number(parseFloat(document.forms["transfLoteOp"].elements["transfLoteOp:tableOpLote:" + i + ":vlBaixar"].value.replaceAll(".","").replace(",",".")));
				if(!isNaN(vlTemp)){
				  vlTotal = (vlTotal + vlTemp).truncate(2);
				}  
		}
	}

     document.forms["transfLoteOp"].elements["transfLoteOp:vlTotalLoteID"].value = String((vlTotal).truncate(2)).replaceAll(".",",").formataNumero(2);
     
}

function AparecerDiv(){ 
	var div = "manipulada";  
    document.getElementById(div).style.display = "block";  
}  

function OcultarDiv(){    
	var div = "manipulada";  
    document.getElementById(div).style.display = "none";  
}


function validateKey (evt){
	var tecla=window.event.keyCode;
	var ctrl=window.event.ctrlKey;
    if (evt.keyCode == '17'){   
        return false;
    }
    
    if (ctrl && tecla==86){
    	return false;
    }
    
    return true;
}

function fileUploadForm(formulario){
	
	var iFrame  = parent.document.getElementById(formulario+':informacoesAdicionaisNaLista:uploadFrame');
	
	var page =(iFrame.contentWindow || iFrame.contentDocument);
	var retorno = false;
	if (page.document){
		var form = page.document.getElementById('fileUploadForm');
		for(cont = 0; cont<form.elements.length; cont++){
			if( form.elements[cont].type == 'file'){			
				form.elements[cont].onchange =  function(){autoUpload();};				
				form.elements[cont].click();	
				form.submit();
				retorno = true;
				break;			
			}
		}	
	}	
	return retorno;
} 

function autoUpload(formulario){
	var iFrame  = parent.document.getElementById(formulario + ':informacoesAdicionaisNaLista:uploadFrame');  
	var page =(iFrame.contentWindow || iFrame.contentDocument);
	var retorno = false;
	if (page.document){
		var form = page.document.getElementById('fileUploadForm');
		for(cont = 0; cont<form.elements.length; cont++){
			if( form.elements[cont].type == 'file'&& form.elements[cont].value != ''){	
				form.elements[cont].onchange =  function(){};	
				retorno = true;
				break;			
			}
		}
		if (retorno){
			form.submit();
		}
	}	
	
	return retorno;
} 

function disableOnpaste(event){
	var tecla = String.fromCharCode(event.keyCode).toLowerCase();

	  if (event.ctrlKey && (tecla == "c" || tecla == "v")) {
	  window.event ? event.returnValue = false : event.preventDefault();
	 return false
	  }
}

function checkMaxLength(obj, maxLength, evento){


	if(obj.value.length > maxLength){
		obj.value = obj.value.substring(0,maxLength);
		return false;
	}
	if(obj.value.length == maxLength){
		return false;
	}
	return true;
	//return length < maxLength;
}

function tamanhoMaximo(textAreaField, limit) {
    var ta = textAreaField;
    
    if (ta.value.length >= limit) {
        ta.value = ta.value.substring(0, limit);
    }
}


function atualizaTaxaAdm(campo,tipo){
	var edt = document.getElementById(campo);
	edt.value = '';	
	edt.style.display = 'none'
	if(tipo=='V'){
		edt.maxLength = 14;
		edt.size = 17;
		edt.style.display = '';
	}	
	if(tipo=='P'){
		edt.maxLength = 6;
		edt.size = 7;
		edt.style.display = '';
	}
}

function habilitaPagamentoAnt(combo,campo1,campo2){
	if(combo == 'F' ){
		if (campo1 == '0' && campo2 == '0'){
		document.getElementById(combo).disabled = false;
		}else{
			document.getElementById(combo).disabled = true;
		}
	}else{
		document.getElementById(combo).disabled = true;
	}
	
}


function valorMonetario5casas(v){
	var valor = v.value;
	valor=valor.replace(/\D/g,""); 
	valor=valor.replace(/(\d{0,5})(\d{0,8})$/,"$1.$2");
	
	v.value = valor;
	return v;
}

function resetarListaCheckBox(form){
	var formulario = document.getElementById(form);
	for(cont = 0; cont<formulario.elements.length; cont++){
		if(formulario.elements[cont].type == 'radio'){	
			formulario.elements[cont].checked = false;			
		}
	}
}

function resetarField(fieldID){
	var field = document.getElementById(fieldID);
	field.textContent = "";
}

function isNumberKey(evt)
{	
	isCtrl = false;
	
    if(window.event) {
        key = window.event.keyCode;    
        if(window.event.ctrlKey)
            isCtrl = true;
        else
            isCtrl = false;
    } else {
//        key = evt.which;     
//        if(evt.ctrlKey)
//            isCtrl = true;
//        else
//            isCtrl = false;
    }	
    if(isCtrl){
    	return false;
    }
    
    var charCode = (evt.which) ? evt.which : event.keyCode;
    //alert(charCode);
    //if ((charCode >= 96 && charCode <= 105)) 
   // 	return true;
    if ((charCode >= 37 && charCode <= 40) || charCode == 46 || charCode == 44 || charCode == 118) 
    	return true;
    if ( charCode > 31 && (charCode < 48 || charCode > 57) )
    	return false;
    if (charCode == 36 || charCode == 35 || charCode == 16|| charCode == 18) 
    	return true;
	//37, 40, 38,39  
 
    
    //if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57) && (charCode < 96 || charCode > 105))
		//return false;

	return true;
}

function isNumber(evt)
{	
	isCtrl = false;
	
    if(window.event) {
        key = window.event.keyCode;     
        if(window.event.ctrlKey)
            isCtrl = true;
        else
            isCtrl = false;
    } 
    
    if(isCtrl){
    	return false;
    }
    
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if ( charCode > 31 && (charCode < 48 || charCode > 57) || (charCode == 86 || charCode == 118 || charCode == 46 || charCode == 44))
    	return false;
    if ((charCode >= 37 && charCode <= 40) || charCode == 44 || charCode == 118) 
    	return true;
    if (charCode == 36 || charCode == 35 || charCode == 16|| charCode == 18) 
    	return true;

	return true;
}


function mascaraNumeroWAM(e, campo) { 

	var teclaOk = true; 
	var keyCode; 
	var strCampo; 

	strCampo = campo.value;

	if (window.event) { 
		keyCode = e.keyCode;
	} else if (e.which) { 
		keyCode = e.which;
	}

	teclaOk = (keyCode >= 48 && keyCode <= 57) || (keyCode == 44) || (keyCode == 127) || (keyCode == 8); 

	if (keyCode == 44)
		teclaOk = (strCampo.indexOf(",") < 0); 

	if (teclaOk) 
		if (keyCode >= 48 && keyCode <= 57) 
			teclaOk = (strCampo.length < 11 && strCampo.indexOf(",") < 0) || (strCampo.indexOf(",") >= 0 && strCampo.length - strCampo.indexOf(",") <= 2); 

	return teclaOk;

}

function excluirLetras(txtValor) {
	strCampo = txtValor.value.replaceAll('.', '');
	
	for (i = 0; i < strCampo.length; i++) {
		if (naoInteiro.test(strCampo.charAt(i))) {
			strCampo = "";
			break;
		}
	}
	
	txtValor.value = strCampo;
}

function campoMonetarioMaximo4chars(txt){
	if(txt.value.length > 4){
		txt.value = txt.value.substring(0,4);
		txt.value = txt.value.replace(',','');
		txt.value = txt.value.replace(/(\d)(\d{2})$/,"$1,$2");
	}
}

function inserirZerosField(campo){
	if(campo.value.length == 0){
		campo.value = "0,00";
	}
}

function formatoFinalWAM(txtValor) {
	var strCampo;

	var possuiLetras = false;
	
	strCampo = txtValor.value;
	for (i = 0; i < strCampo.length; i++) {
		if (letras.test(strCampo.charAt(i))) {
			txtValor.value = "";
			possuiLetras = true;
		}
	}
	
	if(!possuiLetras){
		if (strCampo.indexOf(",") < 0)
			strCampo = strCampo + ",00"; 
		else {
			indexOriginal = strCampo.indexOf(",");
			strCampo = strCampo + "00";
			strCampo = strCampo.substr(0, 3 + indexOriginal); 
		}
		
		if(txtValor.length > txtValor.maxLength){
			for (i = 0; i < strCampo.length; i++) {
				if (letras.test(strCampo.charAt(i))) {
					txtValor.value = "";
					possuiLetras = true;
				}
			}
		}
		txtValor.value = strCampo;
	}
}

function imprimir(form){
	var page = document.getElementById(form); 
	document.getElementById(form + ":htmlTexto").value = page.innerHTML;  
}

function alteraTituloCombo(obj) {
	var indice = obj.selectedIndex;
	obj.title=obj.options[indice].text;
	}

	function alteraTituloText(obj) {
	obj.title=obj.value;
	}

	function dataFiltro(v) {
		v = v.replace(/\D/g, "")
		v = v.replace(/(\d{8})(\d)/, "$1 $2")
		v = v.replace(/(\d{4})(\d)/, "$1/$2")
		v = v.replace(/(\d{2})(\d)/, "$1/$2")
		return v
	}
	
	 function mascara_data(data){ 
         var mydata = ''; 
         mydata = mydata + data; 
         if (mydata.length == 2){ 
             mydata = mydata + '/'; 
             document.forms[0].data.value = mydata; 
         } 
         if (mydata.length == 5){ 
             mydata = mydata + '/'; 
             document.forms[0].data.value = mydata; 
         } 
         if (mydata.length == 10){ 
             verifica_data(); 
         } 
     } 
	 
	 function verifica_data () { 

         dia = (document.forms[0].data.value.substring(0,2)); 
         mes = (document.forms[0].data.value.substring(3,5)); 
         ano = (document.forms[0].data.value.substring(6,10)); 

         situacao = ""; 

         if ((dia < 01)||(dia < 01 || dia > 30) && (  mes == 04 || mes == 06 || mes == 09 || mes == 11 ) || dia > 31) { 
             situacao = "falsa"; 
         } 

         if (mes < 01 || mes > 12 ) { 
             situacao = "falsa"; 
         } 

         if (mes == 2 && ( dia < 01 || dia > 29 || ( dia > 28 && (parseInt(ano / 4) != ano / 4)))) { 
             situacao = "falsa"; 
         } 
 
         if (document.forms[0].data.value == "") { 
             situacao = "falsa"; 
         } 
 
         if (situacao == "falsa") { 
             alert("Data inv�lida!"); 
             document.forms[0].data.focus(); 
         } 
       } 
	 
	 function MaskDate(source) {

			var evt = window.event;
			var keyChar = String.fromCharCode(window.event.keyCode);
			
			if(source != null){
				source.maxLength = 10;
			}
			
			if (("0123456789/").indexOf(keyChar) == -1) {
				evt.returnValue = false;
				return false;
			}

			switch (source.value.length) {
			case 0:
				if (keyChar == "/") {
					evt.returnValue = false;
					return false;
				}
				break;

			case 1:
				if (keyChar == "/") {
					if (source.value == "0") {
						evt.returnValue = false;
						return false;
					} else {
						source.value = "0" + source.value;
					}
				} else if (("456789").indexOf(source.value.charAt(0)) != -1
						|| (source.value.charAt(0) == "3" && keyChar != "0" && keyChar != "1")) {
					if (("01").indexOf(keyChar) != -1) {
						source.value = "0" + source.value + "/";
					} else {
						source.value = "0" + source.value + "/0";
					}
				}
				var dia = parseInt(source.value + keyChar, 10)

				if (dia > 31 || dia < 1) {
					evt.returnValue = false;
					return false;
				}
				break;

			case 2:
				if (keyChar != "/") {
					source.value += "/";
				}

				if (("23456789").indexOf(keyChar) != -1) {
					source.value = source.value.substr(0, 3) + "0";
					
					var dia = parseInt(source.value.substr(0, 2), 10);
					var mes = parseInt(source.value.substr(3, 1) + keyChar, 10);

					if (mes == 4 || mes == 6 || mes == 9 || mes == 11) {
						if (dia == 31) {
							source.value = "30/" + source.value.substr(3, 2);
						}
					}
				}
				break;

			case 3:
				if (keyChar == "/") {
					evt.returnValue = false;
					return false;
				}
				if (("23456789").indexOf(keyChar) != -1) {
					source.value = source.value.substr(0, 3) + "0";

					var dia = parseInt(source.value.substr(0, 2), 10);
					var mes = parseInt(source.value.substr(3, 1) + keyChar, 10);
					if (mes == 4 || mes == 6 || mes == 9 || mes == 11) {
						if (dia == 31) {
							source.value = "30/" + source.value.substr(3, 2);
						}
					}
				}
				break;

			case 4:
				if (keyChar == "/") {
					if (source.value.charAt(source.value.length - 1) == "0") {
						evt.returnValue = false;
						return false;
					} else {
						source.value = (source.value).substr(0, 3) + "0"
								+ source.value.substr(3, 1);
					}
				}

				var dia = parseInt(source.value.substr(0, 2), 10);
				var mes = parseInt(source.value.substr(3, 1) + keyChar, 10);

				if (mes < 1 || mes > 12) {
					evt.returnValue = false;
					return false;
				}
				if (mes == 4 || mes == 6 || mes == 9 || mes == 11) {
					if (dia == 31) {
						source.value = "30/" + source.value.substr(3, 2);
					}
				}
				break;

			case 5:
				var dig5= parseInt(keyChar);
				if (dig5 == 0) {
					evt.returnValue = false;
					return false;
				} else if (dig5 > 2){
					evt.returnValue = false;
					return false;
				}
				
				if (keyChar != "/") {
					source.value += "/";
				}
				break;

			case 6:
			    var dig6 = parseInt(keyChar);
				if (dig6 == 0) {
					evt.returnValue = false;
					return false;
				} else if (dig6 > 2){
					evt.returnValue = false;
					return false;
				}
				
			case 7:
				var dig7 = parseInt(keyChar);
				if (dig7 > 0) {
					evt.returnValue = false;
					return false;
				} 

			case 9:
				if (keyChar == "/") {
					evt.returnValue = false;
					return false;
				}
				var dia = parseInt(source.value.substr(0, 2), 10);
				var mes = parseInt(source.value.substr(3, 2), 10);
				var ano = parseInt(source.value.substr(6) + keyChar, 10)
				
				if (mes == 2) {
					if (dia >= 29) {
						if (ano % 4 != 0) {
							source.value = "28/02/" + source.value.substr(6);
						} else {
							source.value = "29/02/" + source.value.substr(6);
						}
					}
				}
				break;

			default:
				if (keyChar == "/") {
					evt.returnValue = false;
					return false;
				}
			}
		}
		
	 function abrirPopupProposta(){
		 window.open('/pages/planos/abaPlanosConsulta/popupConsultaProposta.iface', 'Consulta Proposta', 'height=225,resizable=no,width=400');
	 }	
	 
	 
	 function somenteNumeros(fld){
		var v = fld.value;
		v = v.replace(/\D/g,"")
		fld.value =  v;	
	}
	 
	 function isDigit(keyEvent) {
		if (document.all)
			var tecla = event.keyCode;
		else if (document.layers)
			var tecla = e.which;
		if (tecla > 47 && tecla < 58)
			return true;
		else {
			if (tecla != 8)
				event.keyCode = 0;
			else
				return true;
		}
	}
	 
	 function valorMonetario22(v) {

			v = v.replace(/\D/g, "") 
			v = v.replace(/(\d)(\d{17})$/, "$1.$2")
			v = v.replace(/(\d)(\d{14})$/, "$1.$2")
			v = v.replace(/(\d)(\d{11})$/, "$1.$2")
			v = v.replace(/(\d)(\d{8})$/, "$1.$2")
			v = v.replace(/(\d)(\d{5})$/, "$1.$2")
			v = v.replace(/(\d)(\d{2})$/, "$1,$2")
			return v
	}
	 
	 function keypressed( obj , e ) {
	     var tecla = ( window.event ) ? e.keyCode : e.which;
	     var texto = obj.value
	     var indexvir = texto.indexOf(",")
	     var indexpon = texto.indexOf(".")
	    
	    if ( tecla == 8 || tecla == 0 )
	        return true;
	    if ( tecla != 44 && tecla != 46 && tecla < 48 || tecla > 57 )
	        return false;
	    if (tecla == 44) { if (indexvir !== -1 || indexpon !== -1) {return false} }
	    if (tecla == 46) { if (indexvir !== -1 || indexpon !== -1) {return false} }
	}
	 
	 function moeda(campo, e)  
	 {  
	    var SeparadorDecimal = ","  
	    var SeparadorMilesimo = "."  
	    var sep = 0;  
	    var key = '';  
	    var i = j = 0;  
	    var len = len2 = 0;  
	    var strCheck = '0123456789';  
	    var aux = aux2 = '';  
	    var whichCode = (window.Event) ? e.which : e.keyCode;  
	       
	     
	    if (whichCode == 13) return true;  
	    key = String.fromCharCode(whichCode);  
	     
	    if (strCheck.indexOf(key) == -1) return true; 
	    len = campo.value.length;  
	    for(i = 0; i < len; i++)  
	   
	        if ((campo.value.charAt(i) != '0') && (campo.value.charAt(i) != SeparadorDecimal)) break;  
	    aux = '';  
	    for(; i < len; i++)  
	   
	        if (strCheck.indexOf(campo.value.charAt(i))!=-1) aux += campo.value.charAt(i);  
	    aux += key;  
	    len = aux.length;  
	   
	    if (len == 0) campo.value = '';  
	    if (len == 1) campo.value = '0'+ SeparadorDecimal + '0' + aux;  
	    if (len == 2) campo.value = '0'+ SeparadorDecimal + aux;  
	    if (len > 2) {  
	        aux2 = '';  
	        for (j = 0, i = len - 3; i >= 0; i--) {  
	            if (j == 3) {  
	                aux2 += SeparadorMilesimo;  
	                j = 0;  
	            }  
	            aux2 += aux.charAt(i);  
	            j++;  
	        }  
	        campo.value = '';  
	        len2 = aux2.length;  
	        for (i = len2 - 1; i >= 0; i--)  
	        campo.value += aux2.charAt(i);  
	        campo.value += SeparadorDecimal + aux.substr(len - 2, len);  
	 }  
	    return false;  
	   
	 }  
	 
	 function onTrocaFoco(campoAtual, proxCampo) {
			
	        var tamanho_max = eval('document.getElementById("formGeral:' + campoAtual + '").maxLength;');
	        var tamanho_atual = eval('document.getElementById("formGeral:' + campoAtual + '").value.length;');
	        
	        if (tamanho_atual == tamanho_max) { 
	               eval('document.getElementById("formGeral:' + proxCampo + '").focus();');
	               eval('document.getElementById("formGeral:' + proxCampo + '").select();');
	        }
	        
	     }
	 

function startSair() {
	document.getElementById("formGeral:btnSair").click();
};

function redirectToPF() {
	document.getElementById("formGeral:btnRedirectToPF").click();
};

function startEncerrarSessao() {
	document.getElementById("formGeral:btnEncerrarSessao").click();
};
function dialog_block(){
	$('.ui-dialog-content').block({ message: null });
};

function dialog_unblock(){
	$('.ui-dialog-content').unblock();
};
function panel_block(id){
	$('#formGeral\\:' + id).block({ message: null });
};

function panel_unblock(id){
	$('#formGeral\\:' + id).unblock();
};
function closeMessage() {
	jQuery(window).ready(function() {
		if(event.keyCode == 13){
			document.getElementById("closeMessage").click();
		}
		else if(event.keyCode == 27){
			document.getElementById("closeMessage").click();
		}
	});
};
function closeMessageLogout() {
	jQuery(window).ready(function() {
		if(event.keyCode == 13){
			document.getElementById("closeMessageLogoutSim").click();
		}
		else if(event.keyCode == 27){
			document.getElementById("closeMessageLogoutNao").click();
		}
	});
};
function closeMessageAction() {
	jQuery(window).ready(function() {
		if(event.keyCode == 13){
			document.getElementById("closeMessageActionSim").click();
		}
		else if(event.keyCode == 27){
			document.getElementById("closeMessageActionNao").click();
		}
	});
};
function redirectURL() {
	document.getElementById("formGeral:redirectURL").click();	
};
function openLoad(){
	if(document.getElementById("formGeral:statusLoading") != undefined && document.getElementById("formGeral:statusLoading") != null){
		PF('statusLoading').show();
	}
};
function closeLoad(){
	if(document.getElementById("formGeral:statusLoading") != undefined && document.getElementById("formGeral:statusLoading") != null){
		PF('statusLoading').hide();			
	}
};
function blockButton(id){
	$(id).block({ message: null });
};
function unblockButton(id){
	$(id).unblock();
};
