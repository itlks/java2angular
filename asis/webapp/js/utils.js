function showHide(shID) {
	if (document.getElementById(shID)) {

		if (document.getElementById(shID + '-show').style.display != 'none'
				&& document.getElementById(shID).style.display != 'block'
				&& document.getElementById(shID).style.display != "") {
			document.getElementById(shID).style.display = 'block';
			document.getElementById(shID).className = "aberto";
			document.getElementById(shID + '-show').className = "aberto";
		} else {
			document.getElementById(shID).style.display = 'none';
			document.getElementById(shID + '-show').className = "fechado";
		}
	}
};

function focarCampo(nomeDoCampo) {
	var nomeDoFormCampo = "formGeral:" + nomeDoCampo;

	console.log("ID Pesquisado:" + nomeDoFormCampo);
	var campo = document.getElementById(nomeDoFormCampo);
	if (campo != undefined && campo != null) {
		console.log("Entrou no IF");
		campo.focus();
		console.log("Efetuou o focus()");
	} else {
		console.log("Entrou no ELSE");
	}
};

function showHideChild(shID) {
	if (document.getElementById(shID)) {
		if (document.getElementById(shID + '-show').style.display != 'none'
				&& document.getElementById(shID).style.display != 'block'
				&& document.getElementById(shID).style.display != "") {
			document.getElementById(shID).style.display = 'block';
			document.getElementById(shID).className = "aberto";
		} else {
			document.getElementById(shID).style.display = 'none';
		}
	}
};

function checkLength() {

	$("#formGeral\\:maxChar").text($("#formGeral\\:observacoes").val().length);
}

function showGrid(shID) {
	if (document.getElementById(shID)) {
		if (document.getElementById(shID).style.display != 'block'
				&& document.getElementById(shID).style.display != "") {
			document.getElementById(shID).style.display = 'block';
		} else {
			document.getElementById(shID).style.display = 'none';
		}
	}
}

function changeStyle() {
	if (document.getElementById("iceModalFrame")) {

		var x = document.getElementById("iceModalFrame");
		var y = x.contentWindow;
		if (y.document)
			y = y.document;
		y.body.style.backgroundColor = "#000";
	}
};



function onlyNumbers(e) {
	$(e)
			.keydown(
					function(x) {

						if ($
								.inArray(x.keyCode, [ 46, 8, 9, 27, 13, 110,
										190 ]) !== -1
								||

								(x.keyCode === 65 && (x.ctrlKey === true || x.metaKey === true))
								||

								(x.keyCode >= 35 && x.keyCode <= 40)) {

							return;
						}

						if ((x.shiftKey || (x.keyCode < 48 || x.keyCode > 57))
								&& (x.keyCode < 96 || x.keyCode > 105)) {
							x.preventDefault();
						}
					});
}

function blockNonNumbers(obj, e, allowDecimal, allowNegative) {
	var key;
	var isCtrl = false;
	var keychar;
	var reg;

	if (window.event) {
		key = e.keyCode;
		isCtrl = window.event.ctrlKey
	} else if (e.which) {
		key = e.which;
		isCtrl = e.ctrlKey;
	}

	if (isNaN(key))
		return true;

	keychar = String.fromCharCode(key);


	if (key == 8 || isCtrl) {
		return true;
	}

	reg = /\d/;
	var isFirstN = allowNegative ? keychar == '-'
			&& obj.value.indexOf('-') == -1 : false;
	var isFirstD = allowDecimal ? keychar == ','
			&& obj.value.indexOf(',') == -1 : false;

	return isFirstN || isFirstD || reg.test(keychar);
}

function CheckMoney(Who, WhoName, NoZeroCheck, NotShowAlert) {
	if (Who.value == '')
		Who.value = '0';
	vWhoN = '';
	Ok = false;
	teste = "mínimo";
	vWhoN = ZeroLess(JustNumber(Who.value));
	if (vWhoN.length > 2) {
		Who.value = ToMoney(vWhoN);
		Ok = true;
	} else {
		Who.value = ToMoney(vWhoN)
	}
	return Ok;
}

// --------------------------------------------------------------------------------------------

function ZeroLess(What) {
	var i = 0, WhatClean = '', pvJa = false;

	if (What.length > 3) {
		for (i = 0; i <= (What.length - 1); i++) {
			if ((What.charAt(i) != '0') || (pvJa)) {
				pvJa = true;
				WhatClean += What.charAt(i);
			}
		}
	} else {
		WhatClean = What;
	}

	return WhatClean;
};

// --------------------------------------------------------------------------------------------

function ToMoney(What) {
	var i = 0, j = 0, vMod = 0, vWhatMoney = '';

	if (What.length > 5) {
		vMod = (What.length - 2) % 3;
		if (vMod == 0)
			j = 0;
		if (vMod == 1)
			j = 2;
		if (vMod == 2)
			j = 1;
		for (i = 0; (i <= (What.length - 3)); i++) {
			if (j == 3) {
				vWhatMoney += '.';
				j = 0;
			}
			vWhatMoney += What.charAt(i);
			j++;
		}
		vWhatMoney = vWhatMoney + ','
				+ SubStr(What, (What.length - 2), (What.length - 1));
	} else {
		if (What.length == 5)
			vWhatMoney = SubStr(What, 0, 2) + ',' + SubStr(What, 3, 4);
		if (What.length == 4)
			vWhatMoney = SubStr(What, 0, 1) + ',' + SubStr(What, 2, 3);
		if (What.length == 3)
			vWhatMoney = What.charAt(0) + ',' + SubStr(What, 1, 2);
		if (What.length == 2)
			vWhatMoney = '0,' + What;
		if (What.length == 1)
			vWhatMoney = '0,0' + What;
	}

	return vWhatMoney;
};



function SubStr(vpText, vpFrom, vpUntil) {
	var vpResult = '', i = 0;

	for (var i = vpFrom; (i <= vpUntil); i++) {
		vpResult += vpText.charAt(i);
	}
	return vpResult;
};


function JustNumber(What) {
	var WhatClean = '';

	for (var i = 0; (i <= (What.length - 1)); i++) {
		for (var j = 0; ((j <= 9) && (true)); j++) {
			if (What.charAt(i) == '' + j) {
				WhatClean += What.charAt(i);
				break;
			}
		}
	}
	return WhatClean;
};

function CheckCGCCPF(Who) {

	vWhoN = JustNumber(Who.value);
	var Ok = false;
	var vTroca;
	
	switch (vWhoN.length) {
	case 9:
		vTroca = SubStr(vWhoN, 0, 7) + '-' + SubStr(vWhoN, 8, 8);
		Who.value = vTroca;
		Ok = true;
		break;
	case 10:
		vTroca = SubStr(vWhoN, 0, 8) + '-' + SubStr(vWhoN, 9, 9);
		Who.value = vTroca;
		Ok = true;
		break;
	case 11:
		vTroca = SubStr(vWhoN, 0, 2) + '.' + SubStr(vWhoN, 3, 5) + '.'
				+ SubStr(vWhoN, 6, 8);
		vTroca += '-' + SubStr(vWhoN, 9, 10);
		Who.value = vTroca;
		Ok = true;
		break;

	case 12:
		vTroca = SubStr(vWhoN, 0, 1) + '.' + SubStr(vWhoN, 2, 9) + '.'
				+ SubStr(vWhoN, 10, 10) + '-' + SubStr(vWhoN, 11, 11);
		Who.value = vTroca;
		Ok = true;
		break;

	case 14:
		vTroca = SubStr(vWhoN, 0, 1) + '.' + SubStr(vWhoN, 2, 4) + '.'
				+ SubStr(vWhoN, 5, 7);
		vTroca += '/' + SubStr(vWhoN, 8, 11) + '-' + SubStr(vWhoN, 12, 13);
		Who.value = vTroca;
		Ok = true;
		break;
	
	default:
		Ok = false;
	}
	return Ok;
}
function maskCpfCnpj(campo, event) {

	var v = campo.value.replace(/[^\d]+/g, '');
	var t = v.length;

	if (event.keyCode != 8 && event.keyCode != 46) {
		var v1 = v2 = v3 = v4 = '';
		if (t <= 11) {

			if (t > 2 && t < 6) {
				campo.value = v.substring(0, 3) + '.' + v.substring(3, t);
			}
			if (t >= 6 && t <= 9) {
				v1 = v.substring(0, 3) + '.' + v.substring(3, 6);
				v2 = '.' + v.substring(6, t);
				campo.value = v1 + v2;
			}
			if (t >= 9) {
				v1 = v.substring(0, 3) + '.' + v.substring(3, 6);
				v2 = '.' + v.substring(6, 9);
				v3 = '-' + v.substring(9, t);
				campo.value = v1 + v2 + v3;
			}

		} else {

			v1 = v.substring(0, 2) + '.' + v.substring(2, 5);
			v2 = '.' + v.substring(5, 8);
			v3 = '/' + v.substring(8, 12);

			if (t > 11) {
				v4 = '-' + v.substring(12, t);
			}

			campo.value = v1 + v2 + v3 + v4;

		}
	} else {
		if (campo.value.length > 11 && campo.value.length <= 14) {
			v1 = v.substring(0, 3) + '.' + v.substring(3, 6);
			v2 = '.' + v.substring(6, 9);
			v3 = '-' + v.substring(9, t);
			campo.value = v1 + v2 + v3;
		}
	}
};

function maskMoney(obj, showMaskLeaveNull, event) {
	var keyID = (obj.charCode) ? obj.charCode : ((obj.which) ? obj.which
			: obj.keyCode);
	if (event != undefined) {
		if (event.keyCode == 8 || event.keyCode == 46) {
			return;
		}
	} else if (keyID != undefined) {
		if (keyID == 8 || keyID == 46) {
			return;
		}
	}
	// alert("KEYID=" + keyID + "\nObj.charCode=" + obj.charCode + "\nobj.which"
	// + obj.which + "\nobj.keyCode" + obj.keyCode);

	var vlr = '';
	vlr = obj.value;

	if (showMaskLeaveNull === undefined) {
		showMaskLeaveNull = true;
	}

	if (showMaskLeaveNull == false && vlr == '') {
		return;
	}

	if (vlr.indexOf(',') == -1) {
		if (vlr.length > 2) {
			vlr = vlr;
		}
	} else {
		if (vlr.split(',')[1].length == 0) {
			vlr = vlr + '00';
		}
	}

	vlr = JustNumber(ZeroLess(vlr));
	vlr = ToMoney(vlr);

	if (obj.value != vlr)
		obj.value = vlr;
}

function maskMoneyOnBlur(obj) {
	var vlr;
	vlr = obj.value;
	if (vlr.indexOf(',') == -1) {
		vlr = vlr + '00';
	} else {
		if (vlr.split(',')[1].length == 0)
			vlr = vlr + '00';
		else if (vlr.split(',')[vlr.split(',').length - 1].length == 1)
			vlr = vlr + '0';
	}
	vlr = JustNumber(ZeroLess(vlr));
	obj.value = ToMoney(vlr)
}

function maskMoneyWithoutZero(obj) {

	var valor = obj.value + '';
	valor = valor.replace(",", "");
	var i = 0;
	while ((i = valor.indexOf(".", i)) != -1) {
		valor = valor.replace(".", "");
	}

	obj.value = ToMoney(valor);
};

function replaceSpecialAndAccentChars(obj){

	var str = obj.value;
	str = str.replace(new RegExp('[áàâãäÁÀÂÃÄ]', 'gi'), 'A');
	str = str.replace(new RegExp('[éèêëÉÈÊË]', 'gi'), 'E');
	str = str.replace(new RegExp('[íìîïÍÌÎÏ]', 'gi'), 'I');
	str = str.replace(new RegExp('[óòôõöÓÒÔÕÖ]', 'gi'), 'O');
	str = str.replace(new RegExp('[úùûüÚÙÛÜ]', 'gi'), 'U');
	str = str.replace(new RegExp('[çÇ]', 'gi'), 'C');
	str = str.replace(/[^_a-z0-9_ ]/gi, '');
	obj.value = str.toUpperCase();
	return obj.value;
}

function replaceSpecialChars(text) {

	var v = text.value;

	v = v.replace(/[ÃAÁAÀAÂAÄ]/, "A");
	v = v.replace(/[ãaáaàaâaä]/, "a");
	v = v.replace(/[ÉEÈEÊEË]/, "E");
	v = v.replace(/[éeèeêeë]/, "e");
	v = v.replace(/[ÍIÌIÎIÏ]/, "I");
	v = v.replace(/[íiìiîiï]/, "i");
	v = v.replace(/[ÕOÓOÒOÔOÖ]/, "O");
	v = v.replace(/[õoóoòoôoö]/, "o");
	v = v.replace(/[ÚUÙUÜUÛ]/, "U");
	v = v.replace(/[úuùuüuû]/, "u");
	v = v.replace(/[Ç]/, "C");
	v = v.replace(/[ç]/, "c");
	v = v.replace(/[Ñ]/, "N");
	v = v.replace(/[ñ]/, "n");
	v = v.replace(/[_-]/, "");
	v = v.replace(/[-_]/, "");
	v = v.replace(/[_]/, "");
	v = v.replace(/[-]/, "");
	v = v.replace(/[_*]/, "");
	
	v = v.replace(/(?:\r\n|\r|\n)/g, " ");

	text.value = v.replace(/[^_a-z0-9_ ]/gi, '');
	return text.value;
}

function replaceSpecialCharsWithHifen(text) {

	var v = text.value;

	v = v.replace(/[ÃAÁAÀAÂAÄ]/, "A");
	v = v.replace(/[ãaáaàaâaä]/, "a");
	v = v.replace(/[ÉEÈEÊEË]/, "E");
	v = v.replace(/[éeèeêeë]/, "E");
	v = v.replace(/[ÍIÌIÎIÏ]/, "I");
	v = v.replace(/[íiìiîiï]/, "i");
	v = v.replace(/[ÕOÓOÒOÔOÖ]/, "O");
	v = v.replace(/[õoóoòoôoö]/, "o");
	v = v.replace(/[ÚUÙUÜUÛ]/, "U");
	v = v.replace(/[úuùuüuû]/, "u");
	v = v.replace(/[Ç]/, "C");
	v = v.replace(/[ç]/, "c");
	v = v.replace(/[Ñ]/, "N");
	v = v.replace(/[ñ]/, "n");
	v = v.replace(/[_]/, "");
	v = v.replace(/[_*]/, "");
	
	v = v.replace(/(?:\r\n|\r|\n)/g, " ");

	text.value = v.replace(/[^_a-z0-9_ -]/gi, '');
	return text.value;
}

function removeAcento(obj) {
	var str = obj.value;
	str = str.replace(new RegExp('[ãaáaàaâaäÃAÁAÀAÂAÄ]', 'gi'), 'A');
	str = str.replace(new RegExp('[éeèeêeëÉEÈEÊEË]', 'gi'), 'E');
	str = str.replace(new RegExp('[íiìiîiïÍIÌIÎIÏ]', 'gi'), 'I');
	str = str.replace(new RegExp('[õoóoòoôoöÕOÓOÒOÔOÖ]', 'gi'), 'O');
	str = str.replace(new RegExp('[úuùuüuûÚUÙUÜUÛ]', 'gi'), 'U');
	str = str.replace(new RegExp('[çÇ]', 'gi'), 'C');
	str = str.replace(new RegExp('[ñÑ]', 'gi'), 'N');
	str = str.replace(/^\s+|\s+$/g, "");
	obj.value = str.toUpperCase();
	return true;
}

function SomenteNumeros(evtKeyPress) {
	var nTecla;
	var detecta;
	var boolean = false;

	if (window.event) {
		nTecla = window.event.keyCode;
		detecta = 0;
	} else if (evtKeyPress) {
		nTecla = evtKeyPress.which;
		detecta = 1;
	}

	if (detecta == 0) {
		if (nTecla > 47 && nTecla < 58) {
			boolean = true;
		}
	} else {
		if ((nTecla > 47 && nTecla < 58) || (nTecla == 8) || (nTecla == 9)
				|| (nTecla == 37) || (nTecla == 39) || (nTecla == 46)
				|| (nTecla == 0)) {
			boolean = true;
		}
	}

	return boolean;
}

function maskMoneyKeyUp(obj, showMaskLeaveNull) {
	var keyID = (obj.charCode) ? obj.charCode : ((obj.which) ? obj.which
			: obj.keyCode);
	if (keyID == 8) {
		return;
	}
	var vlr = '';
	vlr = obj.value;

	if (showMaskLeaveNull === undefined) {
		showMaskLeaveNull = true;
	}

	if (showMaskLeaveNull == false && vlr == '') {
		return;
	}

	if (vlr.indexOf(',') == -1) {
		vlr = vlr + '00';
	} else {
		if (vlr.split(',')[1].length == 0)
			vlr = vlr + '00';
		else if (vlr.split(',')[vlr.split(',').length - 1].length == 1)
			vlr = vlr + '0';
	}

	vlr = JustNumber(ZeroLess(vlr));
	vlr = ToMoney(vlr)

	if (vlr != obj.value) {
		obj.value = vlr;
	}
}

function onlyNumbersGare(text) {

	var v = text.value;
	text.value = v.replace(/[^0-9]./gi, "");
}

function apenasNumerosGare(num){
	var number = /[^0-9.]/;
	number.lastIndex = 0;
	var campo = num;
	if(number.test(campo.value))
		campo.value = "";
	
}

function validateQty(event) {
    var key = window.event ? event.keyCode : event.which;

if (event.keyCode == 8 || event.keyCode == 46
 || event.keyCode == 37 || event.keyCode == 39) {
    return true;
}
else if ( key < 48 || key > 57 ) {
    return false;
}
else return true;
};

function stringToUpperCase(text) {
	text.value = text.value.toUpperCase();
}

function mascaraData(campo, event) {

	if (event.keyCode != 8 && event.keyCode != 9) {

		var v = campo.value.replace(/[^\d]+/g, '');
		var t = v.length;

		if (t < 8) {
			if (t > 2 && t < 4) {
				campo.value = v.substring(0, 2) + '/' + v.substring(2, t);
			}
			if (t > 4) {
				campo.value = v.substring(0, 2) + '/' + v.substring(2, 4) + '/'
						+ v.substring(4, t);
			}
		} else {

			campo.value = v.substring(0, 2) + '/' + v.substring(2, 4) + '/'
					+ v.substring(4, 8);
		}
	}

}

function adjustPositionning(sourceElement, dialog, offSetX) {
	var x = sourceElement.offset().left - dialog.width() + offSetX;
	var y = sourceElement.offset().top + sourceElement.height() + 30;
	dialog.offset({
		top : y,
		left : x
	});
}
function adjustPositionningHome(sourceElement, dialog, offSetX, offSetY) {
	var x = sourceElement.offset().left - dialog.width() + offSetX;
	var y = sourceElement.offset().top + sourceElement.height() + offSetY;
	dialog.offset({
		top : y,
		left : x
	});
}

function adjustPositionning2(sourceElement, dialog, offSetX) {
	var x = sourceElement.offset().left - dialog.width() + offSetX;
	var y = sourceElement.offset().top + sourceElement.height() - 24;
	dialog.offset({
		top : y,
		left : x
	});
}

function adjustPositionningRight(sourceElement, dialog, offSetX) {
	var x = sourceElement.offset().left + sourceElement.width() + offSetX;
	var y = sourceElement.offset().top;
	dialog.offset({
		top : y,
		left : x
	});
}


function focusField() {
	var col = document.getElementsByTagName('INPUT');
	document.getElementById("formGeral:idFormGeral").focus()
	var nav = window.navigator.userAgent.toLowerCase();

	for (var i = 0; i < col.length; i++) {

		var elem = col[i]
		if (elem.id.indexOf('formGeral:') >= 0) {
			if (!elem.disabled && elem.type != "checkbox"
					&& (elem.value == "0" || elem.value == "")) {
				if (elem.id != "") {
					document.getElementById(elem.id).focus();
					if (nav.indexOf("msie") != -1
							|| nav.indexOf("rv:11.0") != -1) {
						window.scrollBy(0, 250);
					}
					break;
				}
			}
		}
	}
}

function leftPad(str, lenght) {
	  var adicionar = lenght - str.length;
	  for (var i = 0; i < adicionar; i++) str = '0' + str;
	  return str.slice(0, (adicionar - 1)) + '-' + str.slice(-1);
}

/***
 * Para uso em detranSpTaxasPreenchimentoDados.xhtml
 */
function taxasDetranEncriptarCpfCnpj() {
    var serverPublicKey = document.getElementById("formGeral:chaveServer");
    var clientPublicKey = document.getElementById("formGeral:chaveClient");
    var identificadorCripto = document.getElementById("formGeral:identificadorCripto");
    var identificador = document.getElementById("formGeral:identificadorCpfCnpj");
    if (identificador === null) {
    	identificador = document.getElementById("formGeral:identificador");
    }
    identificadorCripto.value = DLECC.encryptToApp(identificador.value, serverPublicKey.value);
}
// --------------------------------------------------------------------------------------------

$(document).ready(function() {
	$('#subir').click(function() {
		$('html, body').animate({
			scrollTop : 0
		}, 'slow');
		return false;

	});

	$(".numberOnly").mask("9999999999999999999");
});
