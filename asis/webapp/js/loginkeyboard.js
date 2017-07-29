	var focusField="";
	var functionToExecute="";
	var acento='';
	var imgsTeclado=new Array();
	var tCurrent;
	var tNormal 	= 0;
	var tShift		= 1;
	var tCaps 		= 2;
	var tCapsShift 	= 3;
	var enterKey	= 49;
	var bsKey		= 50;
	var capsKey		= 51;
	var shiftKey	= 52;
	var spaceKey	= 53;
	var backSlashKey= 54;
	var chrNormal	= "'1234567890-=qwertyuiop´[asdfghjklç~]zxcvbnm,.;/";
	var chrCaps		= "'1234567890-=QWERTYUIOP´[ASDFGHJKLÇ~]ZXCVBNM,.;/";
	var chrShift	= '"!@#$%¨&*()_+QWERTYUIOP`{ASDFGHJKLÇ^}ZXCVBNM<>:?';
	var tCurrent	= tNormal;
	var chrCurrent	= chrNormal;
	var restore		= false;
	var msgErro;
	
	function SetImagensKeyboard(imgNormal,imgShift,imgCaps,imgCapsShift){imgsTeclado[tNormal]=new Image();imgsTeclado[tNormal].src=imgNormal;imgsTeclado[tShift]=new Image();imgsTeclado[tShift].src=imgShift;imgsTeclado[tCaps]=new Image();imgsTeclado[tCaps].src=imgCaps;imgsTeclado[tCapsShift]=new Image();imgsTeclado[tCapsShift].src=imgCapsShift;}
	function mClick(n){
		var c='';	var cs='';var caretPos;
		msgErro = document.getElementById("formGeral:msgErroTecladoVirtual");
		msgErro.value = '';
		if (n==shiftKey){
			restore	= true;
			if (tCurrent==tNormal){document.forms[0].VirtualKeyboard.src=imgsTeclado[tShift].src;chrCurrent=chrShift;tCurrent=tShift;}
			else if (tCurrent==tShift){document.forms[0].VirtualKeyboard.src=imgsTeclado[tNormal].src;chrCurrent=chrNormal;tCurrent=tNormal;}
			else if (tCurrent==tCaps){document.forms[0].VirtualKeyboard.src=imgsTeclado[tCapsShift].src;chrCurrent=chrShift;tCurrent=tCapsShift;}
			else if (tCurrent==tCapsShift){document.forms[0].VirtualKeyboard.src=imgsTeclado[tCaps].src;chrCurrent=chrCaps;tCurrent=tCaps;}
			else{restore=false;document.forms[0].VirtualKeyboard.src=imgsTeclado[tNormal].src;chrCurrent=chrNormal;tCurrent=tNormal;}
			return(true);
		}
		if (n==capsKey){
			if (tCurrent==tNormal){document.forms[0].VirtualKeyboard.src=imgsTeclado[tCaps].src;chrCurrent=chrCaps;tCurrent=tCaps;}
			else if (tCurrent==tCaps){document.forms[0].VirtualKeyboard.src=imgsTeclado[tNormal].src;chrCurrent=chrNormal;tCurrent=tNormal;}
			else if (tCurrent==tShift){document.forms[0].VirtualKeyboard.src=imgsTeclado[tCapsShift].src;chrCurrent=chrShift;tCurrent=tCapsShift;}
			else if (tCurrent==tCapsShift){document.forms[0].VirtualKeyboard.src=imgsTeclado[tShift].src;chrCurrent=chrShift;tCurrent=tShift;}
			else{document.forms[0].VirtualKeyboard.src=imgsTeclado[tNormal].src;chrCurrent=chrNormal;tCurrent=tNormal;}
			return(true);
		}
		if (n==enterKey){if(functionToExecute != ""){eval(functionToExecute);return;}}
		if (focusField==""){msgErro.value = "Por favor selecione (clique) um dos campos, Usuário ou Senha.";onEnviar();return false;}
		if (focusField.name=='formGeral:senhaAcesso' && focusField.value.length==8 && acento==''){return(false);}
		if (n==spaceKey){if(acento.length > 0){insertAt(focusField,acento);acento='';}else{insertAt(focusField,' ');}}
		else if (n==bsKey){delPosition(focusField);}
		else if (n==backSlashKey){
			if (chrCurrent==chrShift){c='|';}
			else{c=String.fromCharCode('92');}
			focusField.focus();
			document.selection.createRange().text=c;
		}else{
			c=chrCurrent.charAt(n);cs=c;
			if(acento.length > 0){
				switch (acento){
					case '~': if(c=='A'){cs='Ã';}else if(c=='a'){cs='ã';}else if(c=='O'){cs='Õ';}else if(c=='o'){cs='õ';}else if(c=='N'){cs='Ñ';}else if(c=='n'){cs='ñ';}break;
					case '`': if(c=='A'){cs='À';}else if(c=='a'){cs='à';}else if(c=='E'){cs='È';}else if(c=='e'){cs='è';}else if(c=='I'){cs='Ì';}else if(c=='i'){cs='ì';}else if(c=='O'){cs='Ò';}else if(c=='o'){cs='ò';}else if(c=='U'){cs='Ù';}else if(c=='u'){cs='ù';}break;
					case '^': if(c=='A'){cs='Â';}else if(c=='a'){cs='â';}else if(c=='E'){cs='Ê';}else if(c=='e'){cs='ê';}else if(c=='O'){cs='Ô';}else if(c=='o'){cs='ô';}break;
					case '¨': if(c=='U'){cs='Ü';}else if(c=='u'){cs='ü';}break;
					case "´": if(c=='A'){cs='Á';}else if(c=='a'){cs='á';}else if(c=='E'){cs='É';}else if(c=='e'){cs='é';}else if(c=='I'){cs='Í';}else if(c=='i'){cs='í';}else if(c=='O'){cs='Ó';}else if(c=='o'){cs='ó';}else if(c=='U'){cs='Ú';}else if(c=='u'){cs='ú';}
					}
				if (cs==c){insertAt(focusField, acento)}
				insertAt(focusField, cs);acento='';
			}else{
				if((c=='~') || (c=='^') || (c=='´') || (c=="`") || (c=='¨')){acento=c;}
				else{acento='';insertAt(focusField, c);}
			}
		}
		if (restore){restore=false;if (tCurrent==tCapsShift){document.forms[0].VirtualKeyboard.src=imgsTeclado[tCaps].src;chrCurrent=chrCaps;tCurrent=tCaps;}else{document.forms[0].VirtualKeyboard.src=imgsTeclado[tNormal].src;chrCurrent=chrNormal;tCurrent=tNormal;}}
		if (focusField.name=='formGeral:usuario' && focusField.value.length >= 14 && acento==''){fClick(document.getElementById("formGeral:senhaAcesso"));focusField.focus();return(false);}return(true);
	}
	function onTecla(evt){var theKey;
		if ("NETSCAPE" != window.navigator.appName.toUpperCase()){theKey=event.keyCode;}else{theKey=evt.which;}if (theKey==13){if (evt.type=="keydown"){if (focusField.name=='formGeral:senhaAcesso'){onEnviar();return true;}else{document.getElementById("formGeral:senhaAcesso").focus();return false;}}else{return false;}}
		if (theKey==9){focusField="";}
		if (UsoTecladoLiberado=='S'){return true;}else{if(theKey==0||theKey==8||theKey==9||theKey==20||theKey==33||theKey==34||theKey==35||theKey==36||theKey==37||theKey==39||theKey==46){return true;}else{return false;}}
	}
	function limparSenha(){document.getElementById("formGeral:senhaAcesso").value="";fClick(document.getElementById("formGeral:senhaAcesso"));SetFocus();}
	function SetFocus(){document.getElementById("formGeral:senhaAcesso").focus();return;}
	function fClick(Field){exibeMensagem = document.getElementById("formGeral:exibeMensagemErro");msgErro = document.getElementById("formGeral:msgErroTecladoVirtual"); msgErro.value = '';focusField=Field;if(focusField.id=='formGeral:senhaAcesso'){functionToExecute='onEnviar()';}else{functionToExecute='SetFocus()';}return(true);}
	function insertAt(obj, text){
		if(document.selection) {
			obj.focus();var orig=obj.value;var range=document.selection.createRange();if(range.parentElement() != obj){return false;} range.text=text;var actual=tmp=obj.value;
			for(var k=0;k < orig.length;k++){if(orig.charAt(k) != actual.charAt(k)){break;}}
			start=0;
			for(var index=0; index <= k; index = start + 1){tmp = tmp.replace(text, "");start=actual.indexOf(text,index);}
		}else{if(obj.selectionStart >= 0){var start=obj.selectionStart;	var end=obj.selectionEnd;obj.value=obj.value.substr(0, start) + text + obj.value.substr(end, obj.value.length);}}
		if(start != null) {setTo(obj, start + text.length);}else{obj.value += text;}
	}
	function setTo(obj, pos){if(obj.createTextRange) {var range=obj.createTextRange();range.move('character', pos);range.select();}else if(obj.selectionStart){obj.focus();obj.setSelectionRange(pos, pos);}}
	function getPosition (ctrl){var CaretPos=0;if (document.selection){ctrl.focus();var Sel=document.selection.createRange();Sel.moveStart('character', -ctrl.value.length);CaretPos=Sel.text.length;}else if (ctrl.selectionStart || ctrl.selectionStart=='0')CaretPos=ctrl.selectionStart;return(CaretPos);}
	function delPosition (ctrl){caretPos=getPosition(ctrl);if (caretPos > 0){if (ctrl.selectionStart || ctrl.selectionStart=='0'){ctrl.value=ctrl.value.substr(0, caretPos-1) + ctrl.value.substr(caretPos);	ctrl.focus();ctrl.setSelectionRange(caretPos, caretPos);}else{var objRange=ctrl.createTextRange();objRange.move("character", caretPos-1);objRange.expand("character");objRange.execCommand("Delete");}}}

	function onEnviar() {
		document.getElementById("formGeral:btnEntrar").click();
   }