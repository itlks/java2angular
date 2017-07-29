/*!
 * Authorization Javascript Module v0.1.1
 * http://avanade.com/
 *
 * Copyright 2017, Avanade Inc
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://avanade.com/license
 *
 * Includes jQuery.js
 * http://jquery.com/
 * Copyright 2011, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Includes EventEmitter v4.1.0 - git.io/ee
 * Oliver Caldwell
 * MIT license
 * 
 * Date: Wed Mar 22 00:46:34 2012 -0700
 */
var ee = new EventEmitter();

var sinteticoAgrupado;
var autorizacaoCorrente;
var tipoAutorizacaoCorrente;
var limiteCash = 2000;
var limiteOnline = 200;
var idAbaAutorizacao;
var dateInicial;
var dateFinal;
var periodoSelecionado;
var selectedList;
var tabAtual;
var periodoSelecionado;
var toAutorize = [];
var alreadyShown = false;

var autorizacoesModule;

(function() {
	var _instance;
	
	autorizacoesModule = function() {
		if(_instance) {
			return _instance; 
		}
		
		_instance = this;
		return _instance;
	}
})();

autorizacoesModule = autorizacoesModule();
	
autorizacoesModule.init = function() {
	tabAtual = $($('.abaInicial')[0]).attr('value');
	consultaPorMudancaDeAba();
}
autorizacoesModule.openMsgErroGenerica = function (tipoErro, msgErro) {
	if (typeof msgErro == 'undefined') {
		msgErro = "Ocorreu um erro no sistema. Por favor, entre em contato com a Superlinha ou fale com o seu gerente.";
	}
	$(".modalMsg").find(".modalLine").text(msgErro);
	if (tipoErro == 1) {
		$(".imgTipoErro").attr(
				"src",
				"/" + window.location.pathname.split("/")[1] + "/images/"
						+ "btnExclamation.png");
	} else {
		$(".imgTipoErro").attr(
				"src",
				"/" + window.location.pathname.split("/")[1] + "/images/"
						+ "btnExcluir.png");
	}
	setTimeout(function() {
		abreMsgAutorizacao();
	}, 1000);
}


autorizacoesModule.openMsgErroContinueConfirmar = function openMsgErroContinueConfirmar(tipoErro) {
	$(".btncontinuemsgConfir").css("display", "block");
	$(".modalMsgConfir").find(".modalLineConfirmar").text(tipoErro);
	$(".imgTipoErroConfirmar").attr(
			"src",
			"/" + window.location.pathname.split("/")[1] + "/images/"
					+ "btnExclamation.png");

	abreMsgAutorizacaoConfirmar();
	try{
		PF('modalMsgAutorizacaoConfirmacao').show();
	} catch(e) {}
}

// Consulta é realizada quando ocorre a mudanca de aba
autorizacoesModule.consultaPorMudancaDeAba = function (tipoErro) {
	var autorizacao;
	limpaPainelAutorizar();
	obterAbaAtual();
	
	switch (tabAtual) {
	case "E":
		autorizacao = tipoDATA_EFETIVACAO;
		break;
	case "I":
		autorizacao = tipoDATA_INCLUSAO;
		break;
	case "P":
		autorizacao = tipoPOR_PRODUTO;
		break;
	case "C":
		autorizacao = tipoPOR_CONTA_CONVENIO;
		break;
	case "R":
		autorizacao = tipoREMESSA;
		break;
	default:
		break;
	}

	var idDataDe = 'formGeral:panelTokens:deDt'
			+ autorizacaoTipo[autorizacao].urlId + '_input';
	var idDataAte = 'formGeral:panelTokens:ateDt'
			+ autorizacaoTipo[autorizacao].urlId + '_input';

	if (typeof dateInicial != "undefined" && typeof dateFinal != "undefined"
			&& tabAtual != "R") {
		document.getElementById(idDataDe).value = dateInicial;
		document.getElementById(idDataAte).value = dateFinal;
	}
	setTimeout(function() {
		montaAutorizacoes(autorizacao);
		if (autorizacao == "remessa") {
			filtrarConvenios();
		}
		closeLoad();
	},1500);
}

autorizacoesModule.limpaPainelAutorizar = function () {
	toAutorize = [];
	$("#msgemVazio").hide();
	$(".pendencias-selecionadas").hide();
}

autorizacoesModule.gerarData = function (strData) {
	var dataNovo = strData.split("/");
	return new Date(dataNovo[2], dataNovo[1] - 1, dataNovo[0]);
}

// Obter as datas selecionadas caso seja "OUTROS PERIODOS"
autorizacoesModule.obterDataSelecionada = function (id) {		
	var idDataInicial = 'formGeral:panelTokens:deDt' + id.replace('#', '')
			+ '_input';
	var idDataFinal = 'formGeral:panelTokens:ateDt' + id.replace('#', '')
			+ '_input';
	dateInicial = document.getElementById(idDataInicial).value;
	dateFinal = document.getElementById(idDataFinal).value;

	return validaDataPeriodo();
}

autorizacoesModule.validaDataPeriodo = function () {
	if (typeof dateInicial == 'undefined' || typeof dateFinal === 'undefined'
			|| dateInicial == "" || dateFinal == "") {
		openMsgErroGenerica(1, "E necessario selecionar a data inicial e final");
		return false;
	}

	if (gerarData(dateFinal) < gerarData(dateInicial)) {
		openMsgErroGenerica(1, "Data Final deve ser superior a data Inicial");
		return false;
	}

	return true;
}

// Obtem a data Atual
autorizacoesModule.obterAbaAtual = function () {	
	tabAtual = $($('.ui-tabs-selected a')[0]).attr('href').toString()
			.split(':')[2];
}

// consultar por Periodo selecionado
autorizacoesModule.consultarPorPeriodoSelecionado = function (periodo, autorizacao) {	
	openLoad();
	toAutorize = [];
	setTimeout(function() {
		periodoSelecionado = periodo;
		if (periodo == 4) {// 4 informa que sao outras datas
			autorizacaoCorrente = autorizacaoTipo[autorizacao];
			if (!obterDataSelecionada(autorizacaoCorrente.urlId)){
				closeLoad();
				return;
			}
		}
		obterAbaAtual();
		montaAutorizacoes(autorizacao); 
		closeLoad();
	},1500);

		
}

autorizacoesModule.filtrarConvenios = function () {
	$("input[id^='formGeral:panelTokens:convenios']").each(function() {
		if (this.checked) {
			$('#div' + this.value).show()
		} else {
			$('#div' + this.value).hide()
		}
	});

	$("#msgemVazio").html("");
	if ($("div[id^=div]:visible").length == 0) {
		$("#msgemVazio")
				.html(
						'<h5>N&atilde;o existe pendência para o período solicitado</h5>');
		$("#msgemVazio").show();
	}
}

/*
 * Mount autorizacoes
 * 
 */
autorizacoesModule.montaAutorizacoes = function (tipoAutorizacao) {	
	limiteCash = 2000;
	limiteOnline = 200;
	autorizacaoCorrente = null;
	tipoAutorizacaoCorrente = null;
	idAbaAutorizacao = null;
	sinteticoAgrupado = null;
	autorizacaoCorrente = autorizacaoTipo[tipoAutorizacao];
	tipoAutorizacaoCorrente = tipoAutorizacao;
	idAbaAutorizacao = autorizacaoCorrente.urlId;
	var requestJson = {
		"dataInicio" : dateInicial,
		"dataFim" : dateFinal,
		"tipoConsulta" : tabAtual,
		"periodoConsulta" : periodoSelecionado
	};
	var urlGo = window.location.protocol + "//" + window.location.host + "/"
			+ window.location.pathname.split("/")[1]
			+ "/api/autorizacoes/listasintetica";

	callAjax("POST", "application/x-www-form-urlencoded; charset=utf-8",
			"json", false, urlGo, requestJson, inicializar, function(error,
					textStatus, thrown) {
				var resultError = error.responseText.split("|");
				openMsgErroGenerica(resultError[0], resultError[1]);
			}, limpaPainelAutorizar);
	}

autorizacoesModule.inicializar = function (resultadoPendencias) {
	$("#" + idAbaAutorizacao).empty();

	sinteticoAgrupado = groupByColumns(resultadoPendencias,
			autorizacaoCorrente.Sintetico.Agrupar);

	for (var r = 0; r < Object.keys(sinteticoAgrupado).length; r++) {
		var dicId = Object.keys(sinteticoAgrupado)[r];
		var divGroup = $("#" + idAbaAutorizacao).append(
				"<div id='div" + dicId + "'>").find("#div" + dicId);
		divGroup
				.append("<span>" + autorizacaoCorrente.descritivo
						+ descricaoAgrupamento(sinteticoAgrupado[dicId][0])
						+ "</span>");

		var tableId = "sin" + dicId + "_" + idAbaAutorizacao

		divGroup.append("<table id='" + tableId + "'>");
		divGroup.append("<br />");

		sinteticoAgrupado[dicId].forEach(function(itm){
				 itm.idSintetica = {
										ID : dicId,
										Index : r
									};
			});
		
		buildTableSintetico($("#" + tableId), sinteticoAgrupado[dicId], sinteticoAgrupado[dicId][0].idSintetica);

		if ($('#div' + dicId + ' input:not([name=btSelectAll], :disabled)').length == 0) {
			$('#div' + dicId + ' input[name=btSelectAll]').attr('disabled',
					true);
		}
	}
}

autorizacoesModule.descricaoAgrupamento = function (sintetico) {
	return autorizacaoCorrente.Sintetico.Agrupar.map(
			function(agrupador) {
				return agrupador == 'convenio' ? sintetico[agrupador].substr(4,
						4)
						+ ' ' + sintetico[agrupador].substr(8)
						: sintetico[agrupador];
			}).join('<br/>');
}

autorizacoesModule.onSetListaAnaliticoIsDone = function (row, $currentTable, idSintetica, $detail) {
	if (row.tipoPendencia === "C") {
		buildTableModalidadeAnalitico($currentTable, row, true, idSintetica,
				[ idSintetica.Index ]);
	} else {
		buildTableAnalitico($currentTable, row, null, false, idSintetica,
				[ idSintetica.Index ])
	}
	hideCalendar();
	$($detail.closest('table')).bootstrapTable("hideLoading");
	closeLoad();
}

autorizacoesModule.onExpandRowCb = function (index, row, $detail, idSintetica) {
	+openLoad();
	idSintetica.Index = index;
	var $currentTable = $detail.html('<table class="nested-table"></table>')
			.find('table');
	if (!row.listaAnaliticaDTO) {
		setListaAnaliticoDTO(row, index, false, function() {
			ee.emit('onSetListaAnaliticoIsDone', row, $currentTable,
					idSintetica, $detail);
		});
	} else {
		ee.emit('onSetListaAnaliticoIsDone', row, $currentTable, idSintetica,
				$detail);
	}

}

autorizacoesModule.onSetListaAnaliticoIsDone2Check = function (row, $element) {
	onCheckRow(row, $element);
	hideCalendar();
	closeLoad();
}

autorizacoesModule.onCheckCb = function (row, $element, idSintetica) {
	openLoad();
	var index = $element.data('index');
	idSintetica.Index = index;
	row["idSintetica"] = idSintetica;
	
	if (!row.listaAnaliticaDTO) {
		setListaAnaliticoDTO(row, index, false, function() {
			ee.emit('onSetListaAnaliticoIsDone2Check', row, $element);
		});
	} else {
		ee.emit('onSetListaAnaliticoIsDone2Check', row, $element);
	}
}

autorizacoesModule.determinateAllItems = function (dicId, isChecked) {
	for (var i = 0; i < sinteticoAgrupado[dicId].length; i++) {
		if (sinteticoAgrupado[dicId][i].listaAnaliticaDTO != null){
			for (var j = 0; j < sinteticoAgrupado[dicId][i].listaAnaliticaDTO.length; j++) {
				sinteticoAgrupado[dicId][i].listaAnaliticaDTO[j].itemSelecionado = isChecked;
			}
		}
	}
}

autorizacoesModule.onCheckAllIsDone = function (rows) {
	var dicId = getIdAgrupado(rows[0], autorizacaoCorrente.Sintetico.Agrupar);
	determinateAllItems(dicId, true);

	determinateCheckboxes($('table[id^=sin' + dicId + ']').find(
			"table.nested-table input:checkbox"), true);
	+closeLoad();
}

autorizacoesModule.onCheckAllCb = function (rows) {
	+openLoad();
	alreadyShown = false;
	for (var i = 0; i < rows.length; i++) {
		if (!rows[i].listaAnaliticaDTO) {
			setListaAnaliticoDTO(rows[i], i, true, function() {
				ee.emit('onCheckAllIsDone', rows);
			});
		} else {
			ee.emit('onCheckAllIsDone', rows);
			var dicId = getIdAgrupado(rows[0], autorizacaoCorrente.Sintetico.Agrupar);
			var validated = autorizacoesModule.setToAutorize(dicId, i, "sin", null, null, null);
			
			if(validated.errorMessage != "" && !alreadyShown){
				alreadyShown = true;
				autorizacoesModule.openMsgErroContinueConfirmar(validated.errorMessage);
			}
			
			if(!validated.isValid){
				resetCheckbox(dicId, i);
			}
			
			displayAuthorizationButton();
		}
	}
	hideCalendar();
}

autorizacoesModule.onUncheckAllCb = function (rows, $element) {
	var dicId = $element.attr('id').split('_')[0].substring(3);
	determinateAllItems(dicId, false);
	
	for(var i = 0; i < sinteticoAgrupado[dicId].length; i++){
		autorizacoesModule.unsetAutorize(dicId, i, "sin", null, null);
	}

	determinateCheckboxes($('table[id^=sin' + dicId + ']').find('input:checkbox'), false);
	displayAuthorizationButton();
	hideCalendar();
}

autorizacoesModule.buildTableSintetico = function ($el, dados, idSintetica) {	
	$el.addClass(autorizacaoCorrente.Sintetico.CssClass);
	$el.bootstrapTable({
		columns : autorizacaoCorrente.Sintetico.Colunas,
		data : dados,
		detailView : true,
		checkboxHeader : true,
		showHeader : autorizacaoCorrente.Sintetico.ShowHeader,
		showFooter : autorizacaoCorrente.Sintetico.ShowFooter,
		onExpandRow : function(index, row, $detail) {
			onExpandRowCb(index, row, $detail, $.extend({}, idSintetica));
		},
		onPostBody : postBody,
		onCheck : function(row, $element) {
			onCheckCb(row, $element, $.extend({}, idSintetica));
		},
		onCheckAll : function(rows) {
			onCheckAllCb(rows);
		},
		onUncheck: onUncheckRow,
		onUncheckAll: onUncheckAllCb
	});
	$el.bootstrapTable('hideLoading');
}

autorizacoesModule.onExpandRow2BuildTableModalidadeAnalitico = function (index, row, $detail,
		parentIndex, currentGroup, isTipoC, idSintetica) {
	+openLoad();
	var $currentTable = $detail.html('<table class="nested-table"></table>')
			.find('table');

	var currentParentsIndex = []
	for (var i = 0; i < parentIndex.length; i++) {
		currentParentsIndex.push(parentIndex[i]);
	}
	currentParentsIndex.push(index)

	if (tipoAutorizacaoCorrente === tipoREMESSA) {
		buildTablePosModalidadeAnalitico($currentTable, row, currentGroup,
				isTipoC, idSintetica, currentParentsIndex)
	} else {
		buildTableAnalitico($currentTable, row, currentGroup, isTipoC,
				idSintetica, currentParentsIndex);
	}
	$currentTable.bootstrapTable("hideLoading");
	hideCalendar();
	closeLoad();
}

autorizacoesModule.buildTableModalidadeAnalitico = function ($el, row, isTipoC, idSintetica,
		parentIndex) {	
	var currentGroup = autorizacaoCorrente.Modalidade.Agrupar;
	var dataFromParent = [ {
		field : "parentIndex",
		value : $.extend([], parentIndex)
	}, {
		field : "idSintetica",
		value : idSintetica
	}, {
		field : "listaAnaliticaDTO",
		value : row.listaAnaliticaDTO
	}, {
		field : "agrupador",
		value : currentGroup
	}, {
		field : "descricaoProduto",
		value : row.descricaoProduto
	} ];

	var dados = criarDadosTabela(row.listaAnaliticaDTO,
			autorizacaoCorrente.Modalidade, dataFromParent)
	$el.addClass(autorizacaoCorrente.Modalidade.CssClass);
	$el.bootstrapTable({
		columns : autorizacaoCorrente.Modalidade.Colunas,
		data : dados,
		detailView : true,
		checkboxHeader : false,
		showHeader : autorizacaoCorrente.Modalidade.ShowHeader,
		showFooter : autorizacaoCorrente.Modalidade.ShowFooter,
		formatNoMatches : function() {
			return "Nenhum registro foi encontrado.";
		},
		onExpandRow : function(index, row, $detail) {
			onExpandRow2BuildTableModalidadeAnalitico(index, row, $detail,
					parentIndex, currentGroup, isTipoC, idSintetica)
		},
		onPostBody : function(data) {
			$('<span class="fakeCheckbox"></span>').insertAfter(
					'input[type=checkbox]');
		},
		onCheck : onCheckRow,
		onUncheck : onUncheckRow
	});
	$el.bootstrapTable('hideLoading');
	determinateCheckboxes($el.find('input:checkbox'), row.itemSelecionado);
}

autorizacoesModule.onExpandRow2BuildTablePosModalidadeAnalitico = function (index, row, $detail,
		currentGroup, isTipoC, idSintetica, parentIndex) {		
	+openLoad();
	setTimeout(function() {
		var $currentTable = $detail
				.html('<table class="nested-table"></table>').find('table');
		var currentParentsIndex = []
		for (var i = 0; i < parentIndex.length; i++) {
			currentParentsIndex.push(parentIndex[i]);
		}
		currentParentsIndex.push(index)

		buildTableAnalitico($currentTable, row, currentGroup, isTipoC,
				idSintetica, currentParentsIndex, function() {
					hideCalendar();
					closeLoad();
				});
	}, 1500);
}

autorizacoesModule.buildTablePosModalidadeAnalitico = function($el, row, agrupadorPai, isTipoC,
		idSintetica, parentIndex) {
	var currentGroup = agrupadorPai
			.concat(autorizacaoCorrente.PosModalidade.Agrupar);

	var dadosFiltrados = getFilteredData(row, agrupadorPai, false);

	var dataFromParent = [ {
		field : "parentIndex",
		value : $.extend([], parentIndex)
	}, {
		field : "idSintetica",
		value : $.extend({}, idSintetica)
	}, {
		field : "listaAnaliticaDTO",
		value : $.extend([], dadosFiltrados)
	}, {
		field : "agrupador",
		value : $.extend([], currentGroup)
	}, {
		field : "descricaoProduto",
		value : row.descricaoProduto
	} ];

	var dados = criarDadosTabela(dadosFiltrados,
			autorizacaoCorrente.PosModalidade, dataFromParent);
	$el.addClass(autorizacaoCorrente.PosModalidade.CssClass);
	$el.bootstrapTable({
		columns : autorizacaoCorrente.PosModalidade.Colunas,
		data : dados,
		detailView : true,
		checkboxHeader : false,
		showHeader : autorizacaoCorrente.PosModalidade.ShowHeader,
		showFooter : autorizacaoCorrente.PosModalidade.ShowFooter,
		formatNoMatches : function() {
			return "Nenhum registro foi encontrado.";
		},
		onCollapseRow : function() {
			+closeLoad();
			return false;
		},
		onExpandRow : function(index, row, $detail) {
			onExpandRow2BuildTablePosModalidadeAnalitico(index, row, $detail,
					currentGroup, isTipoC, idSintetica, parentIndex)
		},
		onPostBody : function(data) {
			$('<span class="fakeCheckbox"></span>').insertAfter(
					'input[type=checkbox]');
		},
		onCheck : onCheckRow,
		onUncheck : onUncheckRow
	});
	$el.bootstrapTable('hideLoading');
	determinateCheckboxes($el.find('input:checkbox'), row.itemSelecionado);
}

autorizacoesModule.buildTableAnalitico = function($detail, row, agrupadorPai, isTipoC, idSintetica,
		parentIndex, cb) {

	$($detail).prop('id', "analiticoTable");

	var dadosFiltrados = getFilteredData(row, agrupadorPai, false);

	var dataFromParent = [ {
		field : "parentIndex",
		value : parentIndex
	}, {
		field : "idSintetica",
		value : idSintetica
	}, {
		field : "listaAnaliticaDTO",
		value : dadosFiltrados
	}, {
		field : "agrupador",
		value : agrupadorPai
	}, {
		field : "descricaoProduto",
		value : row.descricaoProduto
	} ];

	var dados = criarDadosTabela(dadosFiltrados,
			isTipoC ? autorizacaoCorrente.AnaliticoC
					: autorizacaoCorrente.Analitico, dataFromParent);
	$detail.addClass(isTipoC ? autorizacaoCorrente.AnaliticoC.CssClass
			: autorizacaoCorrente.Analitico.CssClass);
	$detail.bootstrapTable({
		columns : isTipoC ? autorizacaoCorrente.AnaliticoC.Colunas
				: autorizacaoCorrente.Analitico.Colunas,
		data : dados,
		detailView : false,
		checkboxHeader : false,
		showHeader : isTipoC ? autorizacaoCorrente.AnaliticoC.ShowHeader
				: autorizacaoCorrente.Analitico.ShowHeader,
		showFooter : isTipoC ? autorizacaoCorrente.AnaliticoC.ShowFooter
				: autorizacaoCorrente.Analitico.ShowFooter,
		formatNoMatches : function() {
			return "Nenhum registro foi encontrado.";
		},
		onCollapseRow : function() {
			+closeLoad();
			return false;
		},
		onResetView : function() {
			+closeLoad();
		},
		onPostBody : function(data) {
			$('<span class="fakeCheckbox"></span>').insertAfter(
					'input[type=checkbox]');
		},
		onCheck : onCheckRow,
		onUncheck : onUncheckRow
	});
	$detail.bootstrapTable('hideLoading');
	determinateCheckboxes($detail.find('input:checkbox'), row.itemSelecionado);

	if (typeof cb != "undefined" && typeof cb == "function")
		cb();
}

autorizacoesModule.determinateCheckboxes = function($inputs, isChecked) {
	$inputs.removeAttr('indeterminate');
	$inputs.prop('checked', isChecked);
	$inputs.closest('tr')[isChecked ? 'addClass' : 'removeClass']('selected');
}

autorizacoesModule.unsetAutorize = function(id, idx, tableId, row, $element){
	var sintetico = $.extend({}, sinteticoAgrupado[id][idx]);
	var analiticos = [];
	
	var idTabela = 0;
	if(tableId.startsWith('sin')){
		analiticos = $.extend([], sintetico.listaAnaliticaDTO);
	} else {
		for(var i = 0; i < sintetico.listaAnaliticaDTO.length; i++){
			if (tableId.startsWith('ana')) {
				idTabela = i + $element.data('index');
			} else {
				idTabela = i;
			}
			if (row.agrupador) {
				var ignore = false;
				for (var j = 0; j < row.agrupador.length; j++) {
					if (sintetico.listaAnaliticaDTO[i][row.agrupador[j]] != row[row.agrupador[j]]) {
						ignore = true;
						break;
					}
				}
				if (!ignore) {
					analiticos.push($.extend({}, sinteticoAgrupado[id][idx].listaAnaliticaDTO[idTabela]));
					if (tableId.startsWith('ana')) {
						break;
					}
				}
			} else {
				analiticos.push($.extend({}, sinteticoAgrupado[id][idx].listaAnaliticaDTO[idTabela]));
				break;
			}
		}
	}
	
	sintetico.listaAnaliticaDTO = [];
	analiticos = analiticos.filter(function(el){
		return el.flagPermiteAutorizar == 'S' && existsAnalitico(sintetico, el);
	});
	
	var sinteticoIndex = getAllSinteticaIndex(sintetico);
	sinteticoIndex = sinteticoIndex.reverse();
	
	for (var s = 0; s < sinteticoIndex.length; s++){
		var idxSin = sinteticoIndex[s];
		var anaIdx = getAllAnaliticaIndex(idxSin, analiticos);
		anaIdx = anaIdx.reverse();
		for (var j = 0; j < anaIdx.length; j++){
			toAutorize[idxSin].listaAnaliticaDTO.splice(anaIdx[j], 1);
		}
		if(toAutorize[idxSin].listaAnaliticaDTO.length <= 0){
			toAutorize.splice(idxSin, 1);
		}
	}
}

autorizacoesModule.setToAutorize = function(id, idx, tableId, row, $element, listaDTO){
	var sintetico = $.extend({}, sinteticoAgrupado[id][idx]);
	var analiticos = [];
	
	var idTabela = 0;
	if(tableId.startsWith('sin')){
		analiticos = $.extend([], sintetico.listaAnaliticaDTO);
	} else {
		for(var i = 0; i < sintetico.listaAnaliticaDTO.length; i++){
			if (tableId.startsWith('ana')) {
				idTabela = i + $element.data('index');
			} else {
				idTabela = i;
			}
			if (row.agrupador) {
				var ignore = false;
				for (var j = 0; j < row.agrupador.length; j++) {
					if (listaDTO[i][row.agrupador[j]] != row[row.agrupador[j]]) {
						ignore = true;
						break;
					}
				}
				if (!ignore) {
					analiticos.push($.extend({}, sinteticoAgrupado[id][idx].listaAnaliticaDTO[idTabela]));
					if (tableId.startsWith('ana')) {
						break;
					}
				}
			} else {
				analiticos.push($.extend({}, sinteticoAgrupado[id][idx].listaAnaliticaDTO[idTabela]));
				break;
			}
		}
	}
	
	sintetico.listaAnaliticaDTO = [];
	analiticos = analiticos.filter(function(el){
		return el.flagPermiteAutorizar == 'S' && !existsAnalitico(sintetico, el);
	});
	var validated = validateQtyToAutorize(sintetico.tipoPendencia, analiticos.length);
	
	if (validated.isValid){
		if(isSinteticoLastItem(sintetico)){
			var lastIndex = (toAutorize.length - 1);
			for(var j = 0; j < validated.qty; j++){
				analiticos[j].itemSelecionado = true;
				toAutorize[lastIndex].listaAnaliticaDTO.push($.extend({}, analiticos[j]));
			}
		} else {
			toAutorize.push($.extend({}, sintetico));
			var lastIndex = (toAutorize.length - 1);
			for(var j = 0; j < validated.qty; j++){
				analiticos[j].itemSelecionado = true;					
				toAutorize[lastIndex].listaAnaliticaDTO.push($.extend({}, analiticos[j]));
			}
		}
	}
	
	return validated;
}

autorizacoesModule.onCheckRow = function(row, $element) {
	$element.removeAttr('indeterminate');
	
	var id = row.idSintetica.ID;
	var idx = (row.idSintetica.Index);
	var listaDTO = sinteticoAgrupado[id][idx].listaAnaliticaDTO;
	var tableId = "";
	if (typeof $element.closest('table').attr('id') != 'undefined'){
		tableId = $element.closest('table').attr('id');
	}
	
	var validated = autorizacoesModule.setToAutorize(id, idx, tableId, row, $element, listaDTO);
	
	if (validated.errorMessage != ""){
		autorizacoesModule.openMsgErroContinueConfirmar(validated.errorMessage);
	}
	
	if(!validated.isValid){
		$element.removeAttr('indeterminate');
		$element.removeAttr('checked');
		return;
	}

	// Check/Indeterminate all parents
	var idTabela = 0
	for (var i = 0; i < validated.qty; i++) {
		if (tableId.startsWith('ana')) {
			idTabela = i + $element.data('index');
		} else {
			idTabela = i;
		}
		if (row.agrupador) {
			var ignore = false;
			for (var j = 0; j < row.agrupador.length; j++) {
				if (listaDTO[i][row.agrupador[j]] != row[row.agrupador[j]]) {
					ignore = true;
					break;
				}
			}
			if (!ignore) {
				sinteticoAgrupado[id][idx].listaAnaliticaDTO[idTabela].itemSelecionado = true;
				if (tableId.startsWith('ana')) {
					break;
				}
			}
		} else {
			if (tableId.startsWith('sin')) {
				for (var s = 0; s < listaDTO.length; s++) {
					sinteticoAgrupado[id][idx].listaAnaliticaDTO[s].itemSelecionado = true;
				}
			} else {
				sinteticoAgrupado[id][idx].listaAnaliticaDTO[idTabela].itemSelecionado = true;
				break;
			}
		}
	}

	// marca todos os filhos como selecionados
	determinateCheckboxes($element.parents("tr.selected")
			.next("tr.detail-view").find(
					"table.nested-table input:checkbox:not(:disabled)"), true);

	var $currentTable = $element.closest('table');
	var allParentIndex = row.parentIndex;

	if ($currentTable.attr('id') && $currentTable.attr('id').startsWith('sin')) {
		var headerCount = $currentTable.children('tbody').children(
				'tr:not(tr.detail-view)').length;
		var headerSelected = $currentTable.children('tbody').children(
				'tr.selected:not(tr.detail-view)').length;
		if (headerCount == headerSelected) {
			determinateCheckboxes($currentTable.find('tr input:eq(0)'), true);
		} else {
			$currentTable.find('tr input:eq(0)').removeAttr('checked');
			$currentTable.find('tr input:eq(0)').attr('indeterminate', true);
		}
	} else {
		var allTables = $currentTable.parents('table');
		for (var i = 0; i < allTables.length; i++) {
			var currentParentIndex = allParentIndex[allParentIndex.length - 1
					- i]
			var countTableSelected;
			var countRows;
			if (i > 0) {
				countTableSelected = $(allTables[i - 1]).find(
						'input:checkbox:not(:disabled):checked').length;
				countRows = $(allTables[i - 1]).find(
						'input:checkbox:not(:disabled)').length;
			} else {
				countTableSelected = $currentTable
						.find('input:checkbox:not(:disabled):checked').length;
				countRows = $currentTable.find('input:checkbox:not(:disabled)').length;
			}

			if (countTableSelected == countRows
					&& currentParentIndex != 'undefined'
					&& currentParentIndex != null) {
				if (allTables[i].id.startsWith("sin")) {
					determinateCheckboxes($(allTables[i]).children('tbody')
											.children('tr:not(tr.detail-view):eq(' + currentParentIndex + ')')
											.children('td.bs-checkbox').find('input'),
							true);
					var headerCount = $(allTables[i]).children('tbody').children('tr.selected:not(tr.detail-view)').length;
					var headerSelected = $(allTables[i]).children('tbody')
							.children('tr:not(tr.detail-view)').length;
					if (headerCount == headerSelected) {
						determinateCheckboxes($(allTables[i]).find(
								'tr input:eq(0)'), true);
					} else {
						$(allTables[i]).find('tr input:eq(0)').removeAttr(
								'checked');
						$(allTables[i]).find('tr input:eq(0)').attr(
								'indeterminate', true);
					}
				} else {
					determinateCheckboxes($(allTables[i]).children('tbody')
							.children(
									'tr:not(tr.detail-view):eq('
											+ currentParentIndex + ')')
							.children('td.bs-checkbox').find('input'), true);
				}
			} else {
				if (allTables[i].id.startsWith("sin")) {
					determinateCheckboxes($(allTables[i])
							.find('tr input:eq(0)'), false);
					
					$(allTables[i]).find('tr input:eq(0)').attr('indeterminate', true);
					
					determinateCheckboxes($(allTables[i]).children('tbody')
						.children('tr:not(tr.detail-view):eq(' + currentParentIndex + ')')
						.children('td.bs-checkbox').find('input'), false);
					
					$(allTables[i]).children('tbody')
						.children('tr:not(tr.detail-view):eq(' + currentParentIndex + ')')
						.children('td.bs-checkbox').find('input')
						.attr('indeterminate', true);
				} else {
					determinateCheckboxes($(allTables[i]).children('tbody')
							.children(
									'tr:not(tr.detail-view):eq('
											+ currentParentIndex + ')')
							.children('td.bs-checkbox').find('input'), false);
					$(allTables[i]).find(
							'tr input:eq(' + currentParentIndex + ')').attr(
							'indeterminate', true);
				}
			}
		}
	}
	displayAuthorizationButton();
	hideCalendar();
}

autorizacoesModule.onUncheckRow = function(row, $element) {
	// Check/Indeterminate all parents
	var id = row.idSintetica.ID;
	var idx = row.idSintetica.Index;
	
	var tableId = "";
	if (typeof $element.closest('table').attr('id') != 'undefined'){
		tableId = $element.closest('table').attr('id');
	}
	
	
	autorizacoesModule.unsetAutorize(id, idx, tableId, row, $element);
	var idTabela = 0;
	var listaDTO = sinteticoAgrupado[id][idx].listaAnaliticaDTO;
	var isTabelaAnalitica = $element.closest('table').attr('id') != 'undefined'
			&& $element.closest('table').attr('id');
	for (var i = 0; i < listaDTO.length; i++) {
		if (row.agrupador) {
			if (isTabelaAnalitica == 'analiticoTable') {
				idTabela = i + $element.data('index');
			} else {
				idTabela = i;
			}

			var ignore = false;
			for (var j = 0; j < row.agrupador.length; j++) {
				if (listaDTO[i][row.agrupador[j]] != row[row.agrupador[j]]) {
					ignore = true;
					break;
				}
			}
			if (!ignore) {
				sinteticoAgrupado[id][idx].listaAnaliticaDTO[idTabela].itemSelecionado = false;
				if (isTabelaAnalitica) {
					break;
				}
			}
		} else {
			if ($element.closest('table').attr('id')
					&& $element.closest('table').attr('id').startsWith('sin')) {
				for (var s = 0; s < listaDTO.length; s++) {
					sinteticoAgrupado[id][idx].listaAnaliticaDTO[s].itemSelecionado = false;
				}
			} else {
				sinteticoAgrupado[id][idx].listaAnaliticaDTO[$($element).data(
						'index')].itemSelecionado = false;
				break;
			}
		}
	}

	determinateCheckboxes($element, false);
	var nextLine = $element.closest('tr').next();
	if ($(nextLine).attr('class') == 'detail-view') {
		determinateCheckboxes($(nextLine).find('input:checked'), false);
	}

	var $currentTable = $element.closest('table');
	var allParentIndex = row.parentIndex;

	if ($currentTable.attr('id') && $currentTable.attr('id').startsWith('sin')) {
		var headerSelected = $currentTable.children('tbody').children(
				'tr.selected:not(tr.detail-view)').length;
		if (headerSelected == 0) {
			$currentTable.find('tr input:eq(0)').removeAttr('checked');
			$currentTable.find('tr input:eq(0)').removeAttr('indeterminate');
			determinateCheckboxes($currentTable.find('tr input:eq(0)'), false);
		} else {
			$currentTable.find('tr input:eq(0)').removeAttr('checked');
			$currentTable.find('tr input:eq(0)').attr('indeterminate', true);
		}
	} else {
		var allTables = $currentTable.parents('table');
		for (var i = 0; i < allTables.length; i++) {
			var currentParentIndex = allParentIndex[allParentIndex.length - 1
					- i]
			var countTableSelected;
			var countRows;
			if (i > 0) {
				countTableSelected = $(allTables[i - 1]).find(
						'input:checkbox:not(:disabled):checked').length;
			} else {
				countTableSelected = $currentTable
						.find('input:checkbox:not(:disabled):checked').length;
			}

			if (countTableSelected > 0) {
				var $currentInput = $(allTables[i]).children('tbody')
						.children(
								'tr:not(tr.detail-view):eq('
										+ currentParentIndex + ')').children(
								'td.bs-checkbox').find('input');
				determinateCheckboxes($currentInput, false);
				$currentInput.attr('indeterminate', true);
				if (allTables[i].id && allTables[i].id.startsWith("sin")) {
					var headerSelected = $(allTables[i]).children('tbody')
							.children('tr:not(tr.detail-view)').length;
					if (headerSelected > 0) {
						$(allTables[i]).find('tr input:eq(0)').removeAttr(
								'checked');
						$(allTables[i]).find('tr input:eq(0)').attr(
								'indeterminate', true);
					} else {
						determinateCheckboxes($(allTables[i]).find(
								'tr input:eq(0)'), false);
					}
				}
			} else {
				if (allTables[i].id.startsWith("sin")) {
					determinateCheckboxes($(allTables[i])
							.find('tr input:eq(0)'), false);
				}
				determinateCheckboxes($(allTables[i]).children('tbody')
						.children(
								'tr:not(tr.detail-view):eq('
										+ currentParentIndex + ')').children(
								'td.bs-checkbox').find('input'), false);
			}
		}
	}
	displayAuthorizationButton();
	hideCalendar();
}

autorizacoesModule.existeChecado = function(list) {
	return list.some(function(a) {
		return a.itemSelecionado;
	});
}

autorizacoesModule.existeNaoChecado = function(list) {
	return list.some(function(a) {
		return !a.itemSelecionado;
	});
}

autorizacoesModule.groupBy = function(list, attribute) {
	return groupByColumns(list, [ attributes ]);
}

autorizacoesModule.groupByColumns = function(list, attributes) {
	var grouped = {};

	for (var i = 0; i < list.length; i++) {
		var attributeId = getIdAgrupado(list[i], attributes);

		if (!grouped[attributeId]) {
			grouped[attributeId] = [];
		}
		grouped[attributeId].push(list[i]);
	}

	return grouped;
}

autorizacoesModule.sumValue = function(list, fieldName) {
	var sum = 0;

	for (var i = 0; i < list.length; i++) {
		sum += list[i][fieldName];
	}

	return sum;
}

autorizacoesModule.getIdAgrupado = function(row, agrupadores) {
	var id = "";
	for (var i = 0; i < agrupadores.length; i++) {
		id += replaceAll(row[agrupadores[i]].toString().trim().split('/')
				.reverse().join(""), " ", "")
				+ "_";
	}
	return id.slice(0, -1);
}

autorizacoesModule.replaceAll = function(text, old, n) {
	while (text.indexOf(old) > -1) {
		text = text.replace(old, n)
	}
	return text;
}

autorizacoesModule.setListaAnaliticoDTO = function(rowSintetico, index, check, cb) {
	var sinteticoId = getIdAgrupado(rowSintetico,
			autorizacaoCorrente.Sintetico.Agrupar);
	$.ajax({
		type : "POST",
		contentType : "application/json; charset=utf-8",
		url : autorizacaoCorrente.urlAnaliticoRequest,
		dataType : "json",
		data : JSON.stringify(sinteticoAgrupado[sinteticoId][index]),
		async : true,
		success : function(data, textStatus, request) {
			rowSintetico.listaAnaliticaDTO = data;
			sinteticoAgrupado[sinteticoId][index].listaAnaliticaDTO = data;
			if (check){
				var validated = autorizacoesModule.setToAutorize(sinteticoId, index, "sin", null, null, null);
				if(validated.errorMessage != "" && !alreadyShown){
					alreadyShown = true;
					autorizacoesModule.openMsgErroContinueConfirmar(validated.errorMessage);
				}
				if(!validated.isValid){
					resetCheckbox(sinteticoId, index);
				}
				displayAuthorizationButton();
			}
			cb();
		},
		error : function(error, textStatus, thrown) {
			cb();
		}
	});
}

autorizacoesModule.resetCheckbox = function(sinteticoId, index){
	var $tableSin = $('table[id^=sin' + sinteticoId + ']');
	
	$tableSin.find('input:checkbox[name=btSelectAll]').removeAttr('checked');

	$tableSin.children('tbody').children('tr:not(tr.detail-view):gt(' + index + '), tr:not(tr.detail-view):eq(' + index + ')').find('input:checkbox').removeAttr('checked');
	$tableSin.children('tbody').children('tr:not(tr.detail-view):gt(' + index + '), tr:not(tr.detail-view):eq(' + index + ')').find('input:checkbox').removeAttr('indeterminate');
	
	$tableSin.children('tbody').children('tr:not(tr.detail-view):gt(' + index + '), tr:not(tr.detail-view):eq(' + index + ')').next().find('input:checkbox').removeAttr('checked');
	$tableSin.children('tbody').children('tr:not(tr.detail-view):gt(' + index + '), tr:not(tr.detail-view):eq(' + index + ')').next().find('input:checkbox').removeAttr('indeterminate');
	
	if(index > 0){
		$tableSin.find('input:checkbox[name=btSelectAll]').attr('indeterminate', true);
	}
}

autorizacoesModule.criarDadosTabela = function(listaDados, tipoTabela, dataFromParent) {
	var dadosAgrupados = $.extend([], listaDados);
	if (tipoTabela.Agrupar) {
		dadosAgrupados = groupByColumns(dadosAgrupados, tipoTabela.Agrupar);
	}

	var headers = [];
	var colunas = tipoTabela.Colunas;

	// percorre todos os itens agrupados para exibir na tela
	for (var j = 0; j < Object.keys(dadosAgrupados).length; j++) {
		var dados = dadosAgrupados[Object.keys(dadosAgrupados)[j]];
		var header = {};
		// cria o objeto conforme os par�metro do dicion�rio
		for (var k = 0; k < colunas.length; k++) {
			var coluna = colunas[k].field;
			if (tipoTabela.Somar && tipoTabela.Somar.indexOf(coluna) >= 0) {
				header[coluna] = sumValue(dados, coluna);
			} else if (coluna == qtdePENDENCIAS) {
				header[coluna] = dados.length;
			} else {
				header[coluna] = dados[0] ? dados[0][coluna] : dados[coluna];
			}
		}
		headers.push(header);
	}
	for (var i = 0; i < headers.length; i++) {
		for (var j = 0; j < dataFromParent.length; j++) {
			headers[i][dataFromParent[j].field] = dataFromParent[j].value;
		}
	}
	return headers;
}

autorizacoesModule.hasObject = function(list, item) {
	var result = list.filter(function(el) {
		for (var i = 0; i < Object.getOwnPropertyNames(item).length; i++) {
			if (el[Object.getOwnPropertyNames(item)[i]] != item[Object
					.getOwnPropertyNames(item)[i]]) {
				return false;
			}
		}
		return true;
	});
	return result.length > 0;
}

autorizacoesModule.getFilteredData = function(row, groupedByColumns, checkFlagAssina) {
	var filteredData = row.listaAnaliticaDTO.filter(function(el) {
		if (checkFlagAssina && el.flagPermiteAutorizar != 'S') {
			return false;
		}
		if (groupedByColumns != null && groupedByColumns.length > 0) {
			for (var i = 0; i < groupedByColumns.length; i++) {
				if (el[groupedByColumns[i]] != row[groupedByColumns[i]]) {
					return false;
				}
			}
		}
		return true;
	});
	return filteredData;
}

autorizacoesModule.displayAuthorizationButton = function() {
	$(".pendencias-selecionadas").hide();

	var totalPendencias = getAutorizeLength();
	var totalValor = getAutorizeValue();

	$('span[id*=quantidadePendenciaSelecionadas]').text(totalPendencias);
	$('span[id*=valorTotalPendenciaSelecionadas]').text(
			formatCurrency(totalValor));

	$(".pendencias-selecionadas").toggle(totalPendencias > 0);
}

autorizacoesModule.autorizarAnaliticas = function() {
	var listToSend = [];
	for (var i = 0; i < toAutorize.length; i++){
		if(listToSend.length == 0){
			listToSend.push($.extend({}, toAutorize[i]));
		} else {
			var wasFound = false;
			for(var j = 0; j < listToSend.length; j++){
				if(isSinteticoEqual(toAutorize[i], listToSend[j])){
					listToSend[j].listaAnaliticaDTO.push.apply(listToSend[j].listaAnaliticaDTO, $.extend([], toAutorize[i].listaAnaliticaDTO));
					wasFound = true;
					break;
				}
			}
			if(!wasFound){
				listToSend.push($.extend({}, toAutorize[i]));
			}
		}
	}
	
	$.each(listToSend, function(){
		$.each(this.listaAnaliticaDTO, function(){
			this.itemSelecionado = true;
		});
	});

	var paraAutorizar = {
		index : tabAtual,
		listaSintetica : listToSend
	};

	$.ajax({
		type : "POST",
		contentType : "application/json; charset=utf-8",
		url : window.location.protocol + "//" + window.location.host + "/"
				+ window.location.pathname.split("/")[1]
				+ '/api/autorizacoesPendencia/autorizar',
		data : JSON.stringify(paraAutorizar),
		async : false,
		success : function(jqXHR, textStatus, response) {
			window.location.href = 'confirmacaoAutorizacoesPendencias.xhtml';
		},
		error : function(error, textStatus, thrown) {
			var resultError = error.responseText.split("|");
			openMsgErroGenerica(resultError[0], resultError[1]);
		}
	});
}

autorizacoesModule.getSelectedSintetica = function() {
	var selectedDataReturn = [];
	for (var r = 0; r < Object.keys(sinteticoAgrupado).length; r++) {
		var dicId = Object.keys(sinteticoAgrupado)[r];
		for (var i = 0; i < sinteticoAgrupado[dicId].length; i++) {
			var currentSintetico = {};
			var sinteticoFromAgrupado = sinteticoAgrupado[dicId][i];
			for ( var attr in sinteticoFromAgrupado) {
				currentSintetico[attr] = sinteticoFromAgrupado[attr];
			}
			currentSintetico.listaAnaliticaDTO = [];
			if (typeof sinteticoFromAgrupado.listaAnaliticaDTO != 'undefined'
					&& sinteticoFromAgrupado.listaAnaliticaDTO != null) {
				for (var j = 0; j < sinteticoFromAgrupado.listaAnaliticaDTO.length; j++) {
					if (sinteticoFromAgrupado.listaAnaliticaDTO[j].itemSelecionado
							&& sinteticoFromAgrupado.listaAnaliticaDTO[j].flagPermiteAutorizar == 'S') {
						currentSintetico.listaAnaliticaDTO
								.push(sinteticoFromAgrupado.listaAnaliticaDTO[j]);
					}
				}
				if (currentSintetico.listaAnaliticaDTO.length > 0) {
					selectedDataReturn.push(currentSintetico);
				}
			}
		}
	}

	return selectedDataReturn;
}

autorizacoesModule.hideCalendar = function() {
	$('.painelCalendario').hide();
}

autorizacoesModule.postBody = function(data) {
	$('<span class="fakeCheckbox"></span>').insertAfter('input[type=checkbox]');
}

if (!String.prototype.startsWith) {
	String.prototype.startsWith = function(searchString, position) {
		position = position || 0;
		return this.indexOf(searchString, position) === position;
	};
};

// These are the callback functions.
autorizacoesModule.loadListaAnaliticoDTOIsDone = function(data) {
	var dicId = getIdAgrupado(rows[0], autorizacaoCorrente.Sintetico.Agrupar);
	for (var j = 0; j < sinteticoAgrupado[dicId][0].listaAnaliticaDTO.length; j++) {
		sinteticoAgrupado[dicId][0].listaAnaliticaDTO[j].itemSelecionado = true;
	}

	/*
	 * var childrenLines = $('table[id=sin'+ dicId+']').find("table.nested-table
	 * input:checkbox"); $(childrenLines).each(function () {
	 * $(this).attr('indeterminate', false);
	 * $($(this).closest('table')).bootstrapTable('checkNoTrigger',
	 * $(this).data('index')); });
	 */

	displayAuthorizationButton();
	hideCalendar();
	closeLoad();
}

// Auxiliary
/*
 * Ajax closure auxiliary -please, do not replicate when is possible just a only
 * one!
 * 
 */
autorizacoesModule.callAjax = function(method, contentType, dataType, isAsync, urlGo, requestJson,
		callbackSuccess, callbackError, callbackComplete) {
	$.ajax({
		type : method,
		contentType : contentType,
		url : urlGo,
		dataType : dataType,
		data : requestJson,
		async : isAsync,
		success : function(data, textStatus, request) {
			callbackSuccess(data);
		},
		error : function(error, textStatus, thrown) {
			callbackError(error, textStatus, thrown);
		},
		complete : function() {
			callbackComplete();
		}
	});
}

autorizacoesModule.getAutorizeLength = function(){
	var listSize = 0;
	for (var i = 0; i < toAutorize.length; i++){
		listSize += toAutorize[i].listaAnaliticaDTO.length;
	}
	return listSize;
}

autorizacoesModule.getAutorizeValue = function(){
	var totalValue = 0;
	for (var i = 0; i < toAutorize.length; i++){
		totalValue += sumValue(toAutorize[i].listaAnaliticaDTO, "valorUsuarioPendencia");
	}
	return totalValue;
}

autorizacoesModule.isSinteticoLastItem = function(currentSintetico){
	if(toAutorize.length == 0){
		return false;
	}
    var lastItemIndex = (toAutorize.length - 1);
    var isEqual = true;
    
    for(var prop in currentSintetico){
          if(prop != "listaAnaliticaDTO" && currentSintetico[prop] != toAutorize[lastItemIndex][prop]){
        	  isEqual = false;
              break;
          }
    }
    
    return isEqual;
}

autorizacoesModule.isSinteticoEqual = function (s1, s2){
	var isEqual = true;    
    for(var prop in s1){
          if(prop != "listaAnaliticaDTO" &&
        	 prop != "itemSelecionado" &&
        	 prop != "idSintetica" &&
        	 s1[prop] != s2[prop]){
        	  isEqual = false;
              break;
          }
    }    
    return isEqual;
}

autorizacoesModule.isAnaliticoEqual = function (a1, a2){
	var isEqual = true;    
    for(var prop in a1){
          if(prop != "itemSelecionado" && prop != "timeStamp" &&
        	 a1[prop] != a2[prop])
          {
        	  isEqual = false;
              break;
          }
    }    
    return isEqual;
}

autorizacoesModule.getAllSinteticaIndex = function(sintetico){
	var allIndex = [];
	
	for (var i = 0; i < toAutorize.length; i++){
		if(isSinteticoEqual(toAutorize[i], sintetico)){
			allIndex.push(i);
		}
	}
	
	return allIndex;
}

autorizacoesModule.getAllAnaliticaIndex = function(sinIdx, lstAnalitico){
	var allIndex = [];
	
	for (var i = 0; i < toAutorize[sinIdx].listaAnaliticaDTO.length; i++){
		for (var j = 0; j < lstAnalitico.length; j++){
			if(isAnaliticoEqual(toAutorize[sinIdx].listaAnaliticaDTO[i], lstAnalitico[j])){
				allIndex.push(i);
			}
		}
	}
	
	return allIndex;
}

autorizacoesModule.existsAnalitico = function (sintetico, analitico){
	var exists = false;
	for (var i = 0; i < toAutorize.length; i++){
		if(isSinteticoEqual(toAutorize[i], sintetico)){
			var items = toAutorize[i].listaAnaliticaDTO.filter(function(el){
				return isAnaliticoEqual(analitico, el);
			});
			if (items.length > 0){
				exists = true;
				break;
			}
		}
	}
	return exists;
}

autorizacoesModule.validateQtyToAutorize = function(tipoPendenciaAtual, qtde) {
	if(tipoAutorizacaoCorrente == tipoREMESSA){
		return { isValid: true, errorMessage: "", qty: qtde};
	}
	
	var difType = false;	
	var currentSize = getAutorizeLength()
	
	var hasOnline = toAutorize.filter(function(el){
		return el.tipoPendencia == "O";
	}).length > 0;
	
	var hasCash = toAutorize.filter(function(el){
		return el.tipoPendencia != "O";
	}).length > 0;
	
	if(hasOnline && hasCash) {
		difType = true;
	} else if(hasOnline && tipoPendenciaAtual != "O") {
		difType = true;
	} else if(hasCash && tipoPendenciaAtual == "O") {
		difType = true;
	}
	
	var total = 2000;
	if(hasOnline || tipoPendenciaAtual == "O"){
		total = 200;
	}
	
	var msg = {
			OnlyOne: "A quantidade máxima para a seleção é de {0} transações.",
			Both: "Caro cliente, caso você queira autorizar somente transações de Pagamento a Fornecedores e/ou Folha de pagamento,"
				+ "você podera seleciona até 2.000 transações por vez. Caso contrário, selecione no máximo 200 transações por vez.",
			Exceeds: "\n\nApenas a(s) primeira(s) {0} foram selecionada(s)"
	};
	
	var retorno = { isValid: true, errorMessage: "", qty: qtde};
	var showMessage = (currentSize >= total || (currentSize + qtde) > total);
	
	if(difType && showMessage){
		retorno.errorMessage = msg.Both;
	} else if (showMessage){
		retorno.errorMessage = msg.OnlyOne.replace('{0}', total);
	}
		
	if(currentSize >= total){
		retorno.isValid = false;
		retorno.qty = 0;
	} else if ((currentSize + qtde) > total){
		retorno.qty = total - currentSize; 
		retorno.errorMessage += msg.Exceeds.replace('{0}', retorno.qty);
	}
	
	return retorno;
}

// Consulta realizada pelo click do menu principal
$(document).ready(function() {
	autorizacoesModule.init();
	
	$("#btnAutorizar").click( function() {
		autorizacoesModule.autorizarAnaliticas();
	});

// Add some listeners.
ee.addListener('onSetListaAnaliticoIsDone', autorizacoesModule.onSetListaAnaliticoIsDone);
ee.addListener('onSetListaAnaliticoIsDone2Check', autorizacoesModule.onSetListaAnaliticoIsDone2Check);
ee.addListener('onCheckAllIsDone', autorizacoesModule.onCheckAllIsDone);
ee.addListener('onUnCheckAllIsDone', autorizacoesModule.onUnCheckAllIsDone);

	
});

