function chkCLick() {
  var e = $(this);
  if (!e.hasClass("ui-state-disabled")) {
    b.toggleCheckAll();
  }
} 

function showHide(shID) {
	if (document.getElementById(shID)) {

		if (document.getElementById(shID+'-show').style.display != 'none' && document.getElementById(shID).style.display != 'block' && document.getElementById(shID).style.display != ""  ) {
			document.getElementById(shID).style.display = 'block';
			document.getElementById(shID).className = "aberto";
			document.getElementById(shID+'-show').className = "aberto";
		} else {
			document.getElementById(shID).style.display = 'none';
			document.getElementById(shID+'-show').className = "fechado";
		}
	}
} 

function showHideChild(shID) {
	if (document.getElementById(shID)) {
		if (document.getElementById(shID+'-show').style.display != 'none' && document.getElementById(shID).style.display != 'block' && document.getElementById(shID).style.display != "" ) {
			document.getElementById(shID).style.display = 'block';
			document.getElementById(shID).className = "aberto";
		} else {
			document.getElementById(shID).style.display = 'none';
		}
	}
} 

function showGrid(shID) {
	if (document.getElementById(shID)) {
		if (document.getElementById(shID).style.display != 'block' && document.getElementById(shID).style.display != "" ) {
			document.getElementById(shID).style.display = 'block';
		} else {
			document.getElementById(shID).style.display = 'none';
		}
	}
} 

function changeStyle()
{
	if (document.getElementById("iceModalFrame")){
		
		var x=document.getElementById("iceModalFrame");
		var y=x.contentWindow;
		if (y.document)y=y.document;
		y.body.style.backgroundColor="#000";
		
	}

}

function OnlyNumbers()
{
	/*
	 * * Se for caracter de controle retorna
	 */

	if (event.keyCode < 32)
	{
		event.returnValue = true;
		return;
	}

	/*
	 * * Verifica se foi digitado um número
	 */
	if ((String.fromCharCode(event.keyCode) < '0') || 
		(String.fromCharCode(event.keyCode) > '9'))
		event.returnValue = (false)
	else
		event.returnValue = (true);
}

function CheckMoney(Who, WhoName, NoZeroCheck, NotShowAlert) {
	if(Who.value=='')
		Who.value='0';
	 vWhoN = '';
	 Ok = false;
	 teste = "m�nimo";
	 vWhoN = ZeroLess(JustNumber(Who.value));
	 if (vWhoN.length > 2)
	 {
	  Who.value = ToMoney(vWhoN);
	  Ok = true;
	 } else {
		Who.value = ToMoney(vWhoN)
	 }
	 return Ok;
	}

	// --------------------------------------------------------------------------------------------

	function ZeroLess(What) {
	var
	 i = 0,
	 WhatClean = '',
	 pvJa = false;

	 if (What.length > 3)
	 {
	   for (i = 0; i <= (What.length -1); i++) {
	     if ((What.charAt(i) != '0') || (pvJa))
	     {
	      pvJa = true;
	      WhatClean += What.charAt(i);
	     }
	   }
	 } else {
	   WhatClean = What;
	 }

	 return WhatClean;
	}

	// --------------------------------------------------------------------------------------------

	function ToMoney(What) {
	var
	 i = 0,
	 j = 0,
	 vMod = 0,
	 vWhatMoney = '';

	 if (What.length > 5)
	 {
	   vMod = (What.length - 2) % 3;
	   if (vMod == 0) j = 0;
	   if (vMod == 1) j = 2;
	   if (vMod == 2) j = 1;
	   for (i = 0; (i <= (What.length - 3)); i++) {
	     if (j == 3) {
	       vWhatMoney += '.';
	       j = 0;
	     }
	     vWhatMoney += What.charAt(i);
	     j++;
	   }
	   vWhatMoney = vWhatMoney + ',' + SubStr(What, (What.length - 2), (What.length - 1));
	 }
	 else
	 {
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
	}

	function JustNumber(What) {
		var
		 WhatClean = '';

		 for (var i = 0; (i <= (What.length - 1)); i++) {
			for (var j = 0; ((j <= 9) && (true)); j++) {
			 if (What.charAt(i) == '' + j) {
				WhatClean += What.charAt(i);
				break;
			 }
			}
		 }
		 return WhatClean;
		}
	
	function SubStr(vpText, vpFrom, vpUntil) {
		var
		 vpResult = '',
		 i = 0;

		 for (var i = vpFrom; (i <= vpUntil); i++) {
		   vpResult += vpText.charAt(i);
		 }
		 return vpResult;
		}




	function zera_campos()
	{
	  document.txtNumero.value="";
	  document.txtApelido.value="";
	 
	}




