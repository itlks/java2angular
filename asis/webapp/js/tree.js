var selected = [];
var qtdTotalFirstLevel = 0;
var qtdFirstLevelExpandidos = 0;
var qtdItensMarcados = 0;
var isTelaAcessoRapido = true;

function marcarAreas(values) {
	for (i = 0; i < values.length; i++) {
		var checkbox = document.getElementById(values[i]);
		checkbox.checked = true;
		show(values[i]);
	}
	expandAreas(values);
}

function adicionarClassTreeviewPlus(){
	$(".button-expandir").removeClass("treeview-min");
	$(".button-expandir").addClass("treeview-plus");
}

function exibirLinkExpandirTodas(){
	var linkExpandir = $('#linkExpadirTodos');
	var linkRetrair = $('#linkEsconderTodos');
	
	linkRetrair.css("display", "none");
	linkExpandir.css("display", "inline");
}

function desmarcarAreas(values) {
	for (i = 0; i < values.length; i++) {
		var checkbox = document.getElementById(values[i]);
		checkbox.checked = false;
		show(values[i]);
	}
	contractAreas(values);
}

function expandAreas(values) {
	for (i = 0; i < values.length; i++) {
		expand(values[i]);
	}
	qtdFirstLevelExpandidos = qtdTotalFirstLevel;

	exibirSeparadores(values);
}

function contractAreas(values) {
	for (i = 0; i < values.length; i++) {
		contract(values[i]);
	}
	qtdFirstLevelExpandidos = 0;

	esconderSeparadores(values);
}

function contract(value) {

	var divsToBeHidden = document.getElementsByName(value + "_div");
	var link = document.getElementById(value + "_link");
	var img = document.getElementById(value + "_img");

	var linkExpand = document.getElementById("expandirLink");
	var linkContract = document.getElementById("contractLink");

	for (var i = 0; i < divsToBeHidden.length; i++) {
		divsToBeHidden[i].style.visibility = 'hidden';
		img.classList.remove("treeview-min");
		img.classList.add("treeview-plus");

		var uls = divsToBeHidden[i].getElementsByTagName("ul")[0];

		uls.classList.remove("opened");
		uls.classList.add("closed");

		if (linkExpand != null || linkContract != null) {
			linkExpand.style.display = '';
			linkContract.style.display = 'none';
		}

	}
}

function expand(value) {

	var divsToBeHidden = document.getElementsByName(value + "_div");
	var link = document.getElementById(value + "_link");
	var img = document.getElementById(value + "_img");

	var linkExpand = document.getElementById("expandirLink");
	var linkContract = document.getElementById("contractLink");

	for (var i = 0; i < divsToBeHidden.length; i++) {
		divsToBeHidden[i].style.visibility = '';
		img.classList.remove("treeview-plus");
		img.classList.add("treeview-min");

		var uls = divsToBeHidden[i].getElementsByTagName("ul")[0];

		uls.classList.remove("closed");
		uls.classList.add("opened");

		if (linkExpand != null || linkContract != null) {
			linkExpand.style.display = 'none';
			linkContract.style.display = '';
		}
	}
}

function expandirAoIniciarTela(value) {

	var divsToBeHidden = document.getElementsByName(value + "_div");
	var link = document.getElementById(value + "_link");
	var img = document.getElementById(value + "_img");

	var linkExpand = document.getElementById("expandirLink");
	var linkContract = document.getElementById("contractLink");

	for (var i = 0; i < divsToBeHidden.length; i++) {
		divsToBeHidden[i].style.visibility = '';
		img.classList.remove("treeview-plus");
		img.classList.add("treeview-min");

		var uls = divsToBeHidden[i].getElementsByTagName("ul")[0];

		uls.classList.remove("closed");
		uls.classList.add("opened");

		exibirSeparadores(value);

		if (linkExpand != null || linkContract != null) {
			linkExpand.style.display = 'none';
			linkContract.style.display = '';
		}
	}
}

function hideDiv(value) {

	var divsToBeHidden = document.getElementsByName(value + "_div");
	var link = document.getElementById(value + "_link");
	var img = document.getElementById(value + "_img");

	var linkExpand = document.getElementById("expandirLink");
	var linkContract = document.getElementById("contractLink");

	var estaExpandindo = false;
	for (var i = 0; i < divsToBeHidden.length; i++) {
		if (divsToBeHidden[i].style.visibility == 'hidden') {
			estaExpandindo = true;
			break;
		} else if (linkExpand != null || linkContract != null) {
			linkExpand.style.display = '';
			linkContract.style.display = 'none';
		}
	}

	if (estaExpandindo) {
		qtdFirstLevelExpandidos++;
	} else {
		if (qtdFirstLevelExpandidos > 0) {
			qtdFirstLevelExpandidos--;
		}
	}

	if (qtdFirstLevelExpandidos == qtdTotalFirstLevel) {
		if (linkExpand != null || linkContract != null) {
			linkExpand.style.display = 'none';
			linkContract.style.display = '';
		}
	}

	for (var i = 0; i < divsToBeHidden.length; i++) {

		if (divsToBeHidden[i].style.visibility == '') {
			divsToBeHidden[i].style.visibility = 'hidden';
			img.classList.remove("treeview-min");
			img.classList.add("treeview-plus");

			var uls = divsToBeHidden[i].getElementsByTagName("ul")[0];

			uls.classList.remove("opened");
			uls.classList.add("closed");

			esconderSeparadores(value);

			/*
			 * if(linkExpand != null || linkContract != null){
			 * linkExpand.style.display = ''; linkContract.style.display =
			 * 'none'; }
			 */

		} else {
			divsToBeHidden[i].style.visibility = '';
			img.classList.remove("treeview-plus");
			img.classList.add("treeview-min");

			var uls = divsToBeHidden[i].getElementsByTagName("ul")[0];

			uls.classList.remove("closed");
			uls.classList.add("opened");

			exibirSeparadores(value);

			/*
			 * if(linkExpand != null || linkContract != null){
			 * linkExpand.style.display = 'none'; linkContract.style.display =
			 * ''; }
			 */
		}
	}
}

function hideDivClickCheckbox(value) {

	var divsToBeHidden = document.getElementsByName(value + "_div");
	var link = document.getElementById(value + "_link");
	var img = document.getElementById(value + "_img");

	var linkExpand = document.getElementById("expandirLink");
	var linkContract = document.getElementById("contractLink");

	var estaExpandindo = false;
	for (var i = 0; i < divsToBeHidden.length; i++) {
		if (divsToBeHidden[i].style.visibility == 'hidden') {
			estaExpandindo = true;
			break;
		}
	}

	if (estaExpandindo) {
		qtdFirstLevelExpandidos++;
	} else {
		if (qtdFirstLevelExpandidos > 0) {
			qtdFirstLevelExpandidos--;
		}
	}

	if (qtdFirstLevelExpandidos == qtdTotalFirstLevel) {
		if (linkExpand != null || linkContract != null) {
			linkExpand.style.display = 'inline';
			linkContract.style.display = 'none';
		}
	}

	checkbox = document.getElementById(value);
	for (var i = 0; i < divsToBeHidden.length; i++) {

		if (!checkbox.checked) {
			divsToBeHidden[i].style.visibility = 'hidden';
			img.classList.remove("treeview-min");
			img.classList.add("treeview-plus");

			var uls = divsToBeHidden[i].getElementsByTagName("ul")[0];

			uls.classList.remove("opened");
			uls.classList.add("closed");

			esconderSeparadores(value);

			/*
			 * if(linkExpand != null || linkContract != null){
			 * linkExpand.style.display = ''; linkContract.style.display =
			 * 'none'; }
			 */

		} else {
			divsToBeHidden[i].style.visibility = '';
			img.classList.remove("treeview-plus");
			img.classList.add("treeview-min");

			var uls = divsToBeHidden[i].getElementsByTagName("ul")[0];

			uls.classList.remove("closed");
			uls.classList.add("opened");

			exibirSeparadores(value);

			/*
			 * if(linkExpand != null || linkContract != null){
			 * linkExpand.style.display = 'none'; linkContract.style.display =
			 * ''; }
			 */
		}
	}
}

function hideDivWithParent(value, parent) {

	var divsToBeHidden = document.getElementsByName(value + "_div");
	var link = document.getElementById(value + "_link");
	var img = document.getElementById(value + "_img");

	for (var i = 0; i < divsToBeHidden.length; i++) {

		if (divsToBeHidden[i].style.visibility == '') {
			divsToBeHidden[i].style.visibility = 'hidden';
			img.classList.remove("treeview-min");
			img.classList.add("treeview-plus");

		} else {
			divsToBeHidden[i].style.visibility = '';
			img.classList.remove("treeview-plus");
			img.classList.add("treeview-min");

		}
	}

	var uls = document.getElementById(value + "_parent").getElementsByTagName(
			"ul")[0];

	if (uls.classList.contains("closed")) {
		uls.classList.remove("closed");
		uls.classList.add("opened");
	} else {
		uls.classList.remove("opened");
		uls.classList.add("closed");
	}
}

function collapseRow(rowId){
	var categoria = $('#' + rowId.toString());
	
	if(categoria.is(":hidden")){
		this.exibirCategoria(categoria);
	} else{
		this.esconderCategoria(categoria);
	}
	
	this.analisarTrocaDeLinks();
	
	return false;
}

function esconderTodasCategorias(){
	$("#treeTableView > tbody > tr[name=level2]").hide();
	this.adicionarClassTreeviewPlus();
	this.exibirLinkExpandirTodas();
}

function analisarTrocaDeLinks(){
	var possuiCategoriaRetraida = false;
	for(i=0; i<idsLevel1.length; i++){
		if (idsLevel1[i].toString().indexOf("ck_not_treeView") == -1) {
			var categoria = $('#' + idsLevel1[i].toString());
			if(categoria.is(":hidden")){
				possuiCategoriaRetraida = true;
				break;
			}
		}
	}
	
	if(possuiCategoriaRetraida){
		this.exibirLinkExpandirTodas();
	} else{
		this.exibirLinkRetrairTodas();
	}
}

function exibirCategoria(categoria){
	var img = $('#' + categoria.attr("id").toString() + "_img");
	
	categoria.show();
	img.removeClass("treeview-plus");
	img.addClass("treeview-min");
}

function exibirTodasCategorias(){
	$("#treeTableView > tbody > tr").show();
	this.adicionarClassTreeviewMin();
	this.exibirLinkRetrairTodas();
}

function exibirLinkRetrairTodas(){
	var linkExpandir = $('#linkExpadirTodos');
	var linkRetrair = $('#linkEsconderTodos');
	
	linkExpandir.css("display", "none");
	linkRetrair.css("display", "inline");
}

function adicionarClassTreeviewMin(){
	$(".button-expandir").removeClass("treeview-plus");
	$(".button-expandir").addClass("treeview-min");
}

function esconderCategoria(categoria){
	var img = $('#' + categoria.attr("id").toString() + "_img");
	
	categoria.hide();
	img.removeClass("treeview-min");
	img.addClass("treeview-plus");
}

function marcarDesmarcar(value){
	var checkbox = document.getElementById(value);
	var checkboxes = document.getElementsByName(value);

	if (!checkbox.checked) {
		var index = selected.indexOf(checkbox.id);
		if (index > -1) {
			selected.splice(index, 1);
		}
	} else {
		var index = selected.indexOf(checkbox.id);
		if (index < 0) {
			selected.push(checkbox.id);
		}
	}

	for (var i = 0, n = checkboxes.length; i < n; i++) {
		checkboxes[i].checked = checkbox.checked;

		if (checkboxes[i].checked) {
			var chkIndex = selected.indexOf(checkboxes[i].id);
			if (chkIndex < 0) {
				selected.push(checkboxes[i].id);
			}
			contract(checkboxes.id)
		} else {

			var chkIndex = selected.indexOf(checkboxes[i].id);
			if (chkIndex > -1) {
				selected.splice(chkIndex, 1);
			}
			expand(checkboxes.id);
		}

		childrens(checkboxes[i].id);
	}

	if (!isTelaAcessoRapido) {
		if (checkbox.checked) {
			marcarParents(checkbox.id);
		} else {
			if (obterLevel(checkbox.id) > 1) {
				desmarcarParents(checkbox.id);
			}
		}
	}

	selected.sort(function(a, b) {
		return (a - b)
	})
	document.getElementById("formGeral:nodesSelected").value = selected;
}

function marcar(value) {
	var checkbox = document.getElementById(value);
	var checkboxes = document.getElementsByName(value);

	if (!checkbox.checked) {
		var index = selected.indexOf(checkbox.id);
		if (index > -1) {
			selected.splice(index, 1);
		}
	} else {
		var index = selected.indexOf(checkbox.id);
		if (index < 0) {
			selected.push(checkbox.id);
		}
	}

	for (var i = 0, n = checkboxes.length; i < n; i++) {
		checkboxes[i].checked = checkbox.checked;

		if (checkboxes[i].checked) {
			var chkIndex = selected.indexOf(checkboxes[i].id);
			if (chkIndex < 0) {
				selected.push(checkboxes[i].id);
			}
			contract(checkboxes.id)
		} else {

			var chkIndex = selected.indexOf(checkboxes[i].id);
			if (chkIndex > -1) {
				selected.splice(chkIndex, 1);
			}
			expand(checkboxes.id);
		}

		childrens(checkboxes[i].id);
	}

	if (!isTelaAcessoRapido) {
		if (checkbox.checked) {
			marcarParents(checkbox.id);
		} else {
			if (obterLevel(checkbox.id) > 1) {
				desmarcarParents(checkbox.id);
			}
		}
	}

	selected.sort(function(a, b) {
		return (a - b)
	})
	document.getElementById("formGeral:nodesSelected").value = selected;
}

var childrens = function checkChildrens(value) {

	var checkboxChld = document.getElementById(value);
	var checkboxesChld = document.getElementsByName(value);

	for (var j = 0, x = checkboxesChld.length; j < x; j++) {

		checkboxesChld[j].checked = checkboxChld.checked;

		if (checkboxesChld[j].checked) {
			var chkIndex = selected.indexOf(checkboxesChld[j].id);
			if (chkIndex < 0) {
				selected.push(checkboxesChld[j].id);
			}
		} else {
			var chkIndex = selected.indexOf(checkboxesChld[j].id);
			if (chkIndex > -1) {
				selected.splice(chkIndex, 1);
			}
		}

		checkChildrens(checkboxesChld[j].id);
	}
}

function limparItensMarcados(){
	itensMarcados = [];
	itensMarcadosConcatenados = "";
}

function preencherItensMarcados(){
	var checksMarcados = $(':checkbox:checked');
	
	limparItensMarcados();
	
	itensMarcados = checksMarcados.map(function() {
	    return this.id.toString().replace('_ck','');
	});
	
	for(i=0; i < itensMarcados.length; i++ ){
		itensMarcadosConcatenados = itensMarcadosConcatenados + itensMarcados[i] + ",";
	}
	itensMarcadosConcatenados = itensMarcadosConcatenados.substring(0, itensMarcadosConcatenados.lastIndexOf(","));
	
	document.getElementById("formGeral:nodesSelected").value = itensMarcadosConcatenados;
}

function obterSelectedNodes(){
	preencherItensMarcados();
}

function validaQtdeSelecao(value) {
	var checkbox = document.getElementById(value);
	var index = selected.indexOf(checkbox.id);

	if (checkbox.checked == true) {
		qtdItensMarcados++;
		if (qtdItensMarcados > 6) {
			checkbox.checked = false;
			qtdItensMarcados--;
			PF('msgDezSelecionados').show();
			if (index > -1) {
				selected.splice(index, 1);
				document.getElementById("formGeral:nodesSelected").value = selected;
			}
		}
	} else {
		qtdItensMarcados--;
	}
}

function chkAdm(component) {
	var administrativo = document.getElementById("formGeral:chkAdm");

	administrativo.value = "notChecked";

	if (component.checked) {
		administrativo.value = "";
	}
}

function setarQtdTotalFirstLevel(qtd) {
	qtdTotalFirstLevel = qtd;
}

function obterLevel(id) {
	var retorno = 0;
	if (id.length == 4) {
		retorno = 1;
	} else if (id.length == 9) {
		retorno = 2;
	} else {
		retorno = 3;
	}
	return retorno;
}

function marcarParents(id) {
	var level = obterLevel(id);

	if (level == 3) {
		marcarLevel2(id);
	} else if (level == 2) {
		marcarLevel1(id);
	}
}

function marcarLevel2(id) {
	var idLevel2 = id.substring(0, 9);
	var index = selected.indexOf(idLevel2);
	if (index < 0) {
		marcar(idLevel2);
	}
	expand(idLevel2);

	marcarLevel1(id);
}

function marcarLevel1(id) {
	var idLevel1 = id.substring(0, 4);
	var index = selected.indexOf(idLevel1);
	if (index < 0) {
		marcar(idLevel1);
	}
	expand(idLevel1);
}

function marcar(id) {
	selected.push(id);
	document.getElementById(id).checked = true;
}

function obterParentDireto(id) {
	var retorno = '';
	var level = obterLevel(id);

	if (level == 3) {
		retorno = id.substring(0, 9);
	} else if (level == 2) {
		retorno = id.substring(0, 4);
	}
	return retorno;
}

function desmarcarParents(id) {
	var idPai = obterParentDireto(id);
	var qtdFilhosLevel3 = 0;
	var selecionados = selected.toString().split(",");

	for (i = 0; i < selecionados.length; i++) {
		if (selecionados[i].includes(idPai)) {
			if (selecionados[i].length > 9) {
				qtdFilhosLevel3++;
			}
		}
	}

	if (qtdFilhosLevel3 == 0) {
		var chkIndex = selected.indexOf(idPai);
		if (chkIndex > -1) {
			selected.splice(chkIndex, 1);
		}
		document.getElementById(idPai).checked = false;
	}

	if (obterLevel(idPai) == 2) {
		desmarcarParents(idPai);
	}
}

function exibirSeparadoresLevel3(separadores, values) {
	for (var i = 0; i < separadores.length; i++) {
		separadores[i].style.visibility = 'visible';
	}
	naoExibirSeparadoresUltimosFilhos(values);
}

function esconderSeparadoresLevel3(separadores) {
	for (var i = 0; i < separadores.length; i++) {
		separadores[i].style.visibility = 'hidden';
	}
}

function exibirSeparadores(values) {
	values = values.toString().replace('[', '').replace(']', '');
	var idsFirstLevel = values.split(",");
	for (i = 0; i < idsFirstLevel.length; i++) {
		var idFirstLevel = idsFirstLevel[i];
		var separadorLevel1 = document.getElementById(idFirstLevel + '_sep');
		separadorLevel1.style.visibility = 'visible';

		var separadoresLevel3 = document.getElementsByName(idFirstLevel
				+ '_sep');
		exibirSeparadoresLevel3(separadoresLevel3, values);
	}
}

function esconderSeparadores(values) {
	values = values.toString().replace('[', '').replace(']', '');
	var idsFirstLevel = values.split(",");
	for (i = 0; i < idsFirstLevel.length; i++) {
		var idFirstLevel = idsFirstLevel[i];
		var separadorLevel1 = document.getElementById(idFirstLevel + '_sep');
		separadorLevel1.style.visibility = 'hidden';

		var separadoresLevel3 = document.getElementsByName(idFirstLevel
				+ '_sep');
		esconderSeparadoresLevel3(separadoresLevel3);
	}
}

function naoExibirSeparadoresUltimosFilhos(values) {
	var divsUltimosFilhos = [];

	if (values.length == 4) {

		var divs = $("div[id*=" + values + "]");

		if (divs.length >= 3) {
			for (var i = divs.length - 1; i >= divs.length - 3; i--) {
				divsUltimosFilhos.push(divs[i]);
			}
		} else if (divs.length == 2) {
			for (var i = divs.length - 1; i >= divs.length - 2; i--) {
				divsUltimosFilhos.push(divs[i]);
			}
		} else if (divs.length == 1) {
			for (var i = divs.length - 1; i >= divs.length - 1; i--) {
				divsUltimosFilhos.push(divs[i]);
			}
		}

		for (var i = 0; i < divsUltimosFilhos.length; i++) {
			var separador = document.getElementById(divsUltimosFilhos[i].id
					.toString().replace("_parent", "")
					+ "_sep");
			separador.style.visibility = 'hidden';
		}
	}

	else {
		values = values.toString().replace('[', '').replace(']', '');
		var idsFirstLevel = values.split(",");

		for (i = 0; i < idsFirstLevel.length; i++) {

			var divs = $("div[id*=" + idsFirstLevel[i] + "]");

			if (divs.length >= 3) {
				for (var j = divs.length - 1; j >= divs.length - 3; j--) {
					divsUltimosFilhos.push(divs[j]);
				}
			} else if (divs.length == 2) {
				for (var j = divs.length - 1; j >= divs.length - 2; j--) {
					divsUltimosFilhos.push(divs[j]);
				}
			} else if (divs.length == 1) {
				for (var j = divs.length - 1; j >= divs.length - 1; j--) {
					divsUltimosFilhos.push(divs[j]);
				}
			}

			for (var j = 0; j < divsUltimosFilhos.length; j++) {
				var separador = document.getElementById(divsUltimosFilhos[j].id
						.toString().replace("_parent", "")
						+ "_sep");
				separador.style.visibility = 'hidden';
			}
		}
	}
}

function setarTelaAcessoRapido(telaAcessoRapido) {
	isTelaAcessoRapido = telaAcessoRapido;
}

function preencherArrayIdsLevel1(){
	ids = new Array();
	
	$(':checkbox').each(function(){
		ids.push(this.name);
	});
	
	idsLevel1 = ids.filter(function(elem, index, self) {
	    return index == self.indexOf(elem);
	});
}

$(document).ready(function() {
	var nodes = document.getElementById("formGeral:nodesSelected");

	if (nodes != null) {
		selected = nodes.value.split(",");

		for (var i = 0; i < selected.length; i++) {
			if (selected[i] == "" || selected[i] == null) {
				selected.splice(i, 1);
				i--;
			}
		}

		qtdItensMarcados = selected.length;
	}
	preencherArrayIdsLevel1();

});

typeof checkChildrens === 'undefined'