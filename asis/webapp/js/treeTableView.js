var itensMarcados = [];
var itensMarcadosConcatenados = "";
var idsLevel1 = new Array();
var estaEmPreenchimento = "";

function obterSelectedNodes(){
	preencherItensMarcados();
}

function marcarDesmarcar(itemId){
	var item = $("input[id='"+itemId.toString()+"']");
	
	if(!item.is(':checked')){
		if(!this.existemNetosMarcados(itemId)){
			this.desmarcarPai(itemId);
		}
		if(this.obterLevel(itemId) == 2){
			this.desmarcarNetos(itemId);
		}
	}else{

		if(item.attr('name') == 4723)
			exibirAlertaCategoriaAdministrativo();
		
		this.marcarPais(itemId);
		
		if(this.obterLevel(itemId) == 2){
			this.marcarNetos(itemId);
		}
	}
}

function marcarDesmarcarTodasCategorias(marcar){
	$(':checkbox').prop('checked', marcar);
	
	if(marcar){
		this.exibirAlertaMarcarTodos();
		this.exibirTodasCategorias();
	}else{
		this.limparItensMarcados();
		this.esconderTodasCategorias();
	}
}

function exibirTodasCategorias(){
	$("#treeTableView > tbody > tr").show();
	this.adicionarClassTreeviewMin();
	this.exibirLinkRetrairTodas();
}

function esconderTodasCategorias(){
	$("#treeTableView > tbody > tr[name=level2]").hide();
	this.adicionarClassTreeviewPlus();
	this.exibirLinkExpandirTodas();
}

function marcarCategoria(categoriaId){
	var checkbox = $('#' + categoriaId.toString());
	var categoria = $('#' + categoriaId.toString().replace('_ck',''));

	if(checkbox.is(":checked")){
		if(checkbox.attr('name') == 4723)
			exibirAlertaCategoriaAdministrativo();
		
		this.marcarFilhos(categoriaId);
		this.exibirCategoria(categoria);
	} else{
		this.desmarcarFilhos(categoriaId);
		this.esconderCategoria(categoria);
	}

	this.analisarTrocaDeLinks();
}

function obterLevel(categoriaId){
	var retorno = 0;
	var id = categoriaId.toString().replace('_ck','');
	
	if(id.length == 4) retorno = 1;
	else if(id.length == 9) retorno = 2;
	else retorno = 3;
	
	return retorno;
}

function marcarFilhos(categoriaId){
	 $("input[name='" + categoriaId.toString().replace('_ck','') + "']").prop('checked', true);
}

function desmarcarFilhos(categoriaId){
	$("input[name='" + categoriaId.toString().replace('_ck','') + "']").prop('checked', false);
}

function marcarNetos(categoriaId){
	var id = categoriaId.toString().substring(0, 9) + ".";
	$("input[id*='" + id + "']").prop('checked', true);
}

function desmarcarNetos(categoriaId){
	var id = categoriaId.toString().substring(0, 9) + ".";
	$("input[id*='" + id + "']").prop('checked', false);
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

function exibirCategoria(categoria){
	var img = $('#' + categoria.attr("id").toString() + "_img");
	
	categoria.show();
	img.removeClass("treeview-plus");
	img.addClass("treeview-min");
}

function esconderCategoria(categoria){
	var img = $('#' + categoria.attr("id").toString() + "_img");
	
	categoria.hide();
	img.removeClass("treeview-min");
	img.addClass("treeview-plus");
}

function exibirLinkExpandirTodas(){
	var linkExpandir = $('#linkExpadirTodos');
	var linkRetrair = $('#linkEsconderTodos');
	
	linkRetrair.css("display", "none");
	linkExpandir.css("display", "inline");
}

function exibirLinkRetrairTodas(){
	var linkExpandir = $('#linkExpadirTodos');
	var linkRetrair = $('#linkEsconderTodos');
	
	linkExpandir.css("display", "none");
	linkRetrair.css("display", "inline");
}

function adicionarClassTreeviewPlus(){
	$(".button-expandir").removeClass("treeview-min");
	$(".button-expandir").addClass("treeview-plus");
}

function adicionarClassTreeviewMin(){
	$(".button-expandir").removeClass("treeview-plus");
	$(".button-expandir").addClass("treeview-min");
}

function marcarPais(itemId){
	$("input[id='" + itemId.toString().substring(0,4)+"_ck']").prop('checked', true);
	$("input[id='" + itemId.toString().substring(0,9)+"_ck']").prop('checked', true);
}

function desmarcarPai(itemId){
	var idPaiDireto = itemId.toString().substring(0,9);
	
	$("input[id='"+idPaiDireto+"_ck']").prop('checked', false);
	if(!this.existemPaisMarcados(itemId)){
		this.desmarcarAvo(itemId);
	}
}

function desmarcarAvo(itemId){
	var idAvo = itemId.toString().substring(0,4);
	$("input[id='"+idAvo+"_ck']").prop('checked', false);
}

function existemNetosMarcados(itemId){
	var retorno = false;
	
	var id = itemId.toString().substring(0,10);
	var qtdIrmaosMarcados = $("input[id*='" + id + "']:checked").length;
	
	if(qtdIrmaosMarcados > 0)
		retorno = true;
	
	return retorno;
}

function existemPaisMarcados(itemId){
	var retorno = false;
	
	var id = itemId.toString().substring(0,5);
	
	var qtdIrmaosMarcados = 0;
	$("input[id*='" + id + "']:checked").each(function(index){
		if(obterLevel(this.id) == 2){
			qtdIrmaosMarcados++;
		}
	});

	if(qtdIrmaosMarcados > 0)
		retorno = true;
	
	return retorno;
}

function analisarTrocaDeLinks(){
	var possuiCategoriaRetraida = false;
	for(var i=0; i<idsLevel1.length; i++){
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

function preencherItensMarcados(){
	var checksMarcados = $(':checkbox:checked');
	
	limparItensMarcados();
	
	itensMarcados = checksMarcados.map(function() {
	    return this.id.toString().replace('_ck','');
	});
	
	for(var i=0; i < itensMarcados.length; i++ ){
		itensMarcadosConcatenados = itensMarcadosConcatenados + itensMarcados[i] + ",";
	}
	itensMarcadosConcatenados = itensMarcadosConcatenados.substring(0, itensMarcadosConcatenados.lastIndexOf(","));
	
	document.getElementById("formGeral:nodesSelected").value = itensMarcadosConcatenados;
}

function validaQtdeSelecao(){
	return;
}

function limparItensMarcados(){
	itensMarcados = [];
	itensMarcadosConcatenados = "";
}

function exibirAlertaMarcarTodos(){
	PF('msgMarcarTodos').show();
}

function exibirAlertaCategoriaAdministrativo(){
	PF('msgCategoriaAdminstrativo').show();
}

function preencherArrayIdsLevel1(){
	var ids = new Array();
	
	$(':checkbox').each(function(){
		ids.push(this.name);
	});
	
	idsLevel1 = ids.filter(function(elem, index, self) {
	    return index == self.indexOf(elem);
	});
}

$(document).ready(function (){
	
	limparItensMarcados();
	itensMarcadosConcatenados = document.getElementById("formGeral:nodesSelected").value;
	estaEmPreenchimento = document.getElementById("formGeral:estaEmPreenchimento").value;
	
	if(itensMarcadosConcatenados != null && itensMarcadosConcatenados != undefined){
		itensMarcados = itensMarcadosConcatenados.split(","); 
	}
	
	if(estaEmPreenchimento == "false"){
		$("input:checkbox").prop('checked', false);
	}
	
	for(var i=0; i < itensMarcados.length; i++){
		if(itensMarcados[i].toString().substring(0, 4)){
			exibirCategoria($('#'+itensMarcados[i].substring(0, 4)));
			$("input[id='" + itensMarcados[i] + "_ck" + "']").prop('checked', true);
		}
	}
	
	preencherArrayIdsLevel1();
});
