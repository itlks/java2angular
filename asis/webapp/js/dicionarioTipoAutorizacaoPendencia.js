function isRowDisabled(value, row, index) {
    if (row.hasOwnProperty("flgAutorizarSintetica") && !row.flgAutorizarSintetica) {
        return { disabled: true };
    } else if (typeof row.listaAnaliticaDTO != 'undefined' && row.listaAnaliticaDTO != null){
        var total = row.listaAnaliticaDTO.filter(function(el){
        	if (row.agrupador) {
	           for (var i = 0; i < row.agrupador.length; i++) {
	                if (el[row.agrupador[i]] != row[row.agrupador[i]]) {
	                    return false;
	                }
	            }
            }
            return true;
        });
        var totalNaoAssina = row.listaAnaliticaDTO.filter(function (el) {
            if (row.agrupador) {
	            for (var i = 0; i < row.agrupador.length; i++) {
	                if (el[row.agrupador[i]] == row[row.agrupador[i]] && el.flagPermiteAutorizar != 'S') {
	                    return true;
	                }
	            }
	            return false;
            } else{
                return el.flagPermiteAutorizar != 'S';
            }
        });
        if (total.length == totalNaoAssina.length){
        	return { disabled: true };
        }
    }
}

function isRowDisabledAnalitico(value, row, index) {
	if (row.flagPermiteAutorizar != 'S'){
		return { disabled: true };
	}
}

function detalheFormatter(value, row, index) {
	if(typeof value != 'undefined') {
		return formatCurrency(value) + '<a class="detalhe" href="javascript:void(0)"><img width="16px" height="16px" src="/'+ window.location.pathname.split("/")[1] + '/images/u162.png" class="no-margin-bottom icone-lupa" /></a>';
	}
}

function valorFormatter(value, row, index) {
	if(typeof value != 'undefined') {
		return formatCurrency(value);
	}
}

function formatCurrency(value){
	return value.toFixed(2).toString().replace('.',',').replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
}

function contaFormatter(value, row, index) {
    if(typeof value != 'undefined') {
        var agencia = value.slice(4,8);
        var convenio = parseInt(value.slice(8));
        return agencia + "-" + convenio;
    }
}

window.actionEvents = {
    'click .detalhe': function (e, value, row, index) {
        var currentRow = row.listaAnaliticaDTO[index];
        currentRow["descricaoProduto"] = row.descricaoProduto;
        openLoad();
        $.ajax({
            type: "GET",
            contentType: "application/json; charset=utf-8",
            url: window.location.protocol + "//" + window.location.host + "/" + window.location.pathname.split("/")[1] + "/api/autorizacoesPendenciaDetalheComponent/detalharAutorizacao?analiticaProduto=" + encodeURIComponent(JSON.stringify(currentRow)),
            dataType: "json",
            async: true,
            success: function (data, textStatus, request) {
            	openLoad();
            	openDialogDetalhe();
            },
            error: function (error, textStatus, thrown) {
            	var resultError = error.responseText.split("|");
		    	openMsgErroGenerica(resultError[0], resultError[1]);
            }
        });
        closeLoad();
    }
};

var autorizacaoTipo = {};

var tipoREMESSA = "remessa";
var tipoDATA_EFETIVACAO = "dtEvetivacao";
var tipoDATA_INCLUSAO = "dtInclusao";
var tipoPOR_PRODUTO = "porProduto";
var tipoPOR_CONTA_CONVENIO = "porContaConvenio";

var qtdePENDENCIAS = "qtdePendencias";

autorizacaoTipo[tipoDATA_EFETIVACAO] = {
    Sintetico: {
    	ShowHeader: true,
    	ShowFooter: true,
    	CssClass: "sintetico",
        Colunas: [
            { field: "itemSelecionado", title: "", sortable: false, checkbox: true, formatter: isRowDisabled },
            { field: "descricaoProduto", title: "Produto", sortable: false, visible: true, footerFormatter: "Total", falign: "right" },
            { field: "quantidadePendencias", title: "Quantidade", sortable: false, visible: true, align: "right", width:"200px", footerFormatter: sumQtdeFormatter },
            { field: "valorPendencias", title: "Valor Total (R$)", sortable: false, visible: true, align: "right", formatter: valorFormatter, footerFormatter: sumFormatter },
            { field: "codigoProduto", title: "", sortable: false, visible: false },
            { field: "flgAutorizarSintetica", title: "", sortable: false, visible: false },
            { field: "tipoPendencia", title: "", sortable: false, visible: false },
            { field: "idSintetica", title: "", sortable: false, visible: false }
        ],
        Agrupar: ["data"]
    },
    Modalidade: {
        ShowHeader: false,
    	ShowFooter: false,
    	CssClass: "modalidade",
        Colunas: [
            { field: 'itemSelecionado', title: '', sortable: false, checkbox: true, formatter: isRowDisabled },
            { field: "descricaoProduto", title: "Produto", sortable: false, visible: false },
            { field: "descricaoOperacao", title: "Produto", sortable: false, visible: true },
            { field: qtdePENDENCIAS, title: 'Quantidade', sortable: false, align: "right", width:"72px" },
            { field: 'valorUsuarioPendencia', title: 'Valor Total (R$)', sortable: false, align: "right", formatter: valorFormatter},
            { field: 'listaAnaliticaDTO', title: '', sortable: false, visible: false },
            { field: "codigoProduto", title: "", sortable: false, visible: false },
            { field: 'parentIndex', title: '', sortable: false, visible: false },
            { field: "flagPermiteAutorizar", title: "", sortable: false, visible: false },
            { field: "descricaoProduto", title: "", sortable: false, visible: false },
            { field: "tipoPendencia", title: "", sortable: false, visible: false }
        ],
        Agrupar: ["descricaoOperacao"],
        Somar: ["valorUsuarioPendencia"]
    },
    PosModalidade: {
        ShowHeader: false,
    	ShowFooter: false,
    	CssClass: "posModalidade",
        Colunas: [
            { field: 'itemSelecionado', title: '', sortable: false, checkbox: true, formatter: isRowDisabled },
            { field: 'dataPagamento', title: 'Data', sortable: false, visible: false },
            { field: "descricaoProduto", title: "Produto", sortable: false, visible: false },
            { field: 'descricaoOperacao', title: 'Produto', sortable: false },
            { field: qtdePENDENCIAS, title: 'Quantidade', sortable: false, align: "right" , width:"72px"},
            { field: 'valorTotal', title: 'Valor Total (R$)', sortable: false, align: "right" , formatter: valorFormatter},
            { field: 'listaAnaliticaDTO', title: '', sortable: false, visible: false },
            { field: 'codigoProduto', title: '', sortable: false, visible: false },
            { field: 'parentIndex', title: '', sortable: false, visible: false },
            { field: "flagPermiteAutorizar", title: "", sortable: false, visible: false },
            { field: "descricaoProduto", title: "", sortable: false, visible: false },
            { field: "tipoPendencia", title: "", sortable: false, visible: false }
        ],
        Agrupar: ["agrupamento"],
        Somar: ["valorUsuarioPendencia"]
    },
    AnaliticoC: {
        ShowHeader: true,
    	ShowFooter: false,
    	CssClass: "analitico",
        Colunas: [
            { field: 'itemSelecionado', title: '', sortable: false, checkbox: true, formatter: isRowDisabledAnalitico },
            { field: 'nomeFavorecidoPendencia', title: 'Favorecido', sortable: false },
            { field: 'contaConvenioAutoriza', title: 'Convênio', sortable: false, formatter: contaFormatter },
            { field: 'contaDebito', title: 'Conta Debito', sortable: false, formatter: contaFormatter },
            { field: 'codigoTransacaoDetalhe', title: 'Compromisso', sortable: false },
            { field: 'qtAssPendente', title: 'Ass. Pen', sortable: false, align: "center" },
            { field: 'valorUsuarioPendencia', title: 'Valor (R$)', sortable: false, align: "right" , formatter: detalheFormatter, events: actionEvents},
            { field: 'listaAnaliticaDTO', title: '', sortable: false, visible: false },
            { field: 'codigoProduto', title: '', sortable: false, visible: false },
            { field: 'parentIndex', title: '', sortable: false, visible: false },
            { field: "flagPermiteAutorizar", title: "", sortable: false, visible: false },
            { field: "descricaoProduto", title: "", sortable: false, visible: false },
            { field: "descricaoOperacao", title: "", sortable: false, visible: false },
            { field: "tipoPendencia", title: "", sortable: false, visible: false }
        ]
    },
    Analitico: {
        ShowHeader: true,
    	ShowFooter: false,
    	CssClass: "analitico",
        Colunas: [
            { field: 'itemSelecionado', title: '', sortable: false, checkbox: true, formatter: isRowDisabledAnalitico },
            { field: 'contaConvenioAutoriza', title: 'Agencia/Conta', sortable: false, formatter: contaFormatter },
            { field: 'descricaoOperacao', title: 'Transação', sortable: false },
            { field: 'qtAssPendente', title: 'Ass. Pen', sortable: false, align: "center" },
            { field: 'valorUsuarioPendencia', title: 'Valor Total (R$)', sortable: false, align: "right" , formatter: detalheFormatter, events: actionEvents},
            { field: 'listaAnaliticaDTO', title: '', sortable: false, visible: false },
            { field: 'codigoProduto', title: '', sortable: false, visible: false },
            { field: 'parentIndex', title: '', sortable: false, visible: false },
            { field: "flagPermiteAutorizar", title: "", sortable: false, visible: false },
            { field: "descricaoProduto", title: "", sortable: false, visible: false },
            { field: "tipoPendencia", title: "", sortable: false, visible: false },
            { field: "erro", title: "", sortable: false, visible: false }
        ]
    },
    descritivo: "Data Efetivação: ",
    urlAnaliticoRequest: window.location.protocol + "//" + window.location.host + "/" + window.location.pathname.split("/")[1] + "/api/autorizacoesPendenciaDataEfetivacaoComponent/listaAnaliticaDataEfetivacao",
    urlId: 'resultadosAutorizacoesDataEfetivacao'
};


autorizacaoTipo[tipoDATA_INCLUSAO] = {
		Sintetico: {
	        ShowHeader: true,
	    	ShowFooter: true,
	    	CssClass: "sintetico",
	        Colunas: [
	            { field: 'itemSelecionado', title: '', sortable: false, checkbox: true, formatter: isRowDisabled },
	            { field: "descricaoProduto", title: "Produto", sortable: false, visible: true },
	            { field: "quantidadePendencias", title: "Quantidade", sortable: false, visible: true, align: "right", width:"200px", footerFormatter: sumQtdeFormatter  },
	            { field: "valorPendencias", title: "Valor Total (R$)", sortable: false, visible: true, align: "right", formatter: valorFormatter, footerFormatter: sumFormatter},
	            { field: "codigoProduto", title: "", sortable: false, visible: false },
	            { field: "flgAutorizarSintetica", title: "", sortable: false, visible: false },
	            { field: "tipoPendencia", title: "", sortable: false, visible: false },
	            { field: "idSintetica", title: "", sortable: false, visible: false }
	        ],
	        Agrupar: ["data"]
	    },
	    Modalidade: {
	        ShowHeader: false,
	    	ShowFooter: false,
	    	CssClass: "modalidade",
	        Colunas: [
	            { field: 'itemSelecionado', title: '', sortable: false, checkbox: true, formatter: isRowDisabled },
	            { field: "descricaoOperacao", title: "Produto", sortable: false, visible: true },
	            { field: qtdePENDENCIAS, title: 'Quantidade', sortable: false, align: "right", width: "72px" },
	            { field: 'valorUsuarioPendencia', title: 'Valor Total (R$)', sortable: false, align: "right" , formatter: valorFormatter},
	            { field: 'listaAnaliticaDTO', title: '', sortable: false, visible: false },
	            { field: "codigoProduto", title: "", sortable: false, visible: false },
	            { field: 'parentIndex', title: '', sortable: false, visible: false },
	            { field: "flagPermiteAutorizar", title: "", sortable: false, visible: false },
	            { field: "descricaoProduto", title: "", sortable: false, visible: false },
	            { field: "tipoPendencia", title: "", sortable: false, visible: false }
	        ],
	        Agrupar: ["descricaoOperacao"],
	        Somar: ["valorUsuarioPendencia"]
	    },
	    PosModalidade: {
	        ShowHeader: false,
	    	ShowFooter: false,
	    	CssClass: "posModalidade",
	        Colunas: [
	            { field: 'itemSelecionado', title: '', sortable: false, checkbox: true, formatter: isRowDisabled },
	            { field: 'dataPagamento', title: 'Data', sortable: false, visible: false },
	            { field: 'descricaoOperacao', title: 'Produto', sortable: false },
	            { field: qtdePENDENCIAS, title: 'Quantidade', sortable: false, align: "right", width: "72px" },
	            { field: 'valorUsuarioPendencia', title: 'Valor Total (R$)', sortable: false, align: "right" , formatter: valorFormatter},
	            { field: 'listaAnaliticaDTO', title: '', sortable: false, visible: false },
	            { field: 'codigoProduto', title: '', sortable: false, visible: false },
	            { field: 'parentIndex', title: '', sortable: false, visible: false },
	            { field: "flagPermiteAutorizar", title: "", sortable: false, visible: false },
	            { field: "descricaoProduto", title: "", sortable: false, visible: false },
	            { field: "tipoPendencia", title: "", sortable: false, visible: false }
	        ],
	        Agrupar: ["agrupamento"],
	        Somar: ["valorUsuarioPendencia"]
	    },
	    AnaliticoC: {
	        ShowHeader: true,
	    	ShowFooter: false,
	    	CssClass: "analitico",
	        Colunas: [
	            { field: 'itemSelecionado', title: '', sortable: false, checkbox: true, formatter: isRowDisabledAnalitico },
	            { field: 'nomeFavorecidoPendencia', title: 'Favorecido', sortable: false },
	            { field: 'contaConvenioAutoriza', title: 'Convênio', sortable: false, formatter: contaFormatter },
	            { field: 'contaDebito', title: 'Conta Debito', sortable: false, formatter: contaFormatter },
	            { field: 'codigoTransacaoDetalhe', title: 'Compromisso', sortable: false },
	            { field: 'descricaoOperacao', title: 'Produto', sortable: false },
	            { field: 'qtAssPendente', title: 'Ass. Pen', sortable: false, align: "center" },
	            { field: 'valorUsuarioPendencia', title: 'Valor (R$)', sortable: false, align: "right", formatter: detalheFormatter, events: actionEvents},
	            { field: 'listaAnaliticaDTO', title: '', sortable: false, visible: false },
	            { field: 'codigoProduto', title: '', sortable: false, visible: false },
	            { field: 'parentIndex', title: '', sortable: false, visible: false },
	            { field: "flagPermiteAutorizar", title: "", sortable: false, visible: false },
	            { field: "descricaoProduto", title: "", sortable: false, visible: false },
	            { field: "tipoPendencia", title: "", sortable: false, visible: false }
	        ]
	    },
	    Analitico: {
	        ShowHeader: true,
	    	ShowFooter: false,
	    	CssClass: "analitico",
	        Colunas: [
	            { field: 'itemSelecionado', title: '', sortable: false, checkbox: true, formatter: isRowDisabledAnalitico },
	            { field: 'contaConvenioAutoriza', title: 'Agência/Conta', sortable: false, formatter: contaFormatter },
	            { field: 'descricaoOperacao', title: 'Transação', sortable: false },
	            { field: 'qtAssPendente', title: 'Ass. Pen', sortable: false, align: "center" },
	            { field: 'valorUsuarioPendencia', title: 'Valor Total (R$)', sortable: false, align: "right", formatter: detalheFormatter, events: actionEvents},
	            { field: 'listaAnaliticaDTO', title: '', sortable: false, visible: false },
	            { field: 'codigoProduto', title: '', sortable: false, visible: false },	            
	            { field: 'parentIndex', title: '', sortable: false, visible: false },
	            { field: "flagPermiteAutorizar", title: "", sortable: false, visible: false },
	            { field: "descricaoProduto", title: "", sortable: false, visible: false },
	            { field: "tipoPendencia", title: "", sortable: false, visible: false }
	        ]
	    },
    descritivo: "Data Inclusão: ",
    urlAnaliticoRequest: window.location.protocol + "//" + window.location.host + "/" + window.location.pathname.split("/")[1] + "/api/autorizacoesPendenciaDataInclusaoCompenent/listaAnaliticasInclusao",
    urlId: 'resultadosAutorizacoesDataInclusao'
};

autorizacaoTipo[tipoPOR_PRODUTO] = {
    Sintetico: {
        ShowHeader: true,
    	ShowFooter: true,
    	CssClass: "sintetico",
        Colunas: [
            { field: 'itemSelecionado', title: '', sortable: false, checkbox: true, formatter: isRowDisabled },
            { field: "data", title: "Data de Efetivação", sortable: false, visible: true },
            { field: "quantidadePendencias", title: "Quantidade", sortable: false, visible: true, align: "right", width:"200px", footerFormatter: sumQtdeFormatter },
            { field: "valorPendencias", title: "Valor Total (R$)", sortable: false, visible: true, align: "right", formatter: valorFormatter, footerFormatter: sumFormatter },
            { field: "codigoProduto", title: "", sortable: false, visible: false },
            { field: "descricaoProduto", title: "", sortable: false, visible: false },
            { field: "flgAutorizarSintetica", title: "", sortable: false, visible: false },
            { field: "tipoPendencia", title: "", sortable: false, visible: false },
            { field: "idSintetica", title: "", sortable: false, visible: false }
        ],
        Agrupar: ["descricaoProduto"]
    },
    Modalidade: {
        ShowHeader: false,
    	ShowFooter: false,
    	CssClass: "modalidade",
        Colunas: [
            { field: 'itemSelecionado', title: '', sortable: false, checkbox: true, formatter: isRowDisabled },
            { field: "descricaoOperacao", title: "", sortable: false, visible: true },
            { field: qtdePENDENCIAS, title: 'Quantidade', sortable: false, align: "right", width:"72px" },
            { field: 'valorUsuarioPendencia', title: 'Valor Total (R$)', sortable: false, align: "right", formatter: valorFormatter },
            { field: 'listaAnaliticaDTO', title: '', sortable: false, visible: false },
            { field: "codigoProduto", title: "", sortable: false, visible: false },
            { field: "flagPermiteAutorizar", title: "", sortable: false, visible: false },
            { field: 'parentIndex', title: '', sortable: false, visible: false },
            { field: "descricaoProduto", title: "", sortable: false, visible: false },
            { field: "tipoPendencia", title: "", sortable: false, visible: false }
        ],
        Agrupar: ["codigoProduto"],
        Somar: ["valorUsuarioPendencia"]
    },
    PosModalidade: {
        ShowHeader: false,
    	ShowFooter: false,
    	CssClass: "posModalidade",
        Colunas: [
        	{ field: 'itemSelecionado', title: '', sortable: false, checkbox: true, formatter: isRowDisabled },
            { field: "descricaoOperacao", title: "", sortable: false, visible: true },
            { field: qtdePENDENCIAS, title: 'Quantidade', sortable: false, align: "right", width:"72px" },
            { field: 'valorUsuarioPendencia', title: 'Valor Total (R$)', sortable: false, align: "right", formatter: valorFormatter },
            { field: 'listaAnaliticaDTO', title: '', sortable: false, visible: false },
            { field: "codigoProduto", title: "", sortable: false, visible: false },
            { field: "flagPermiteAutorizar", title: "", sortable: false, visible: false },
            { field: 'parentIndex', title: '', sortable: false, visible: false },
            { field: "descricaoProduto", title: "", sortable: false, visible: false },
            { field: "tipoPendencia", title: "", sortable: false, visible: false }
        ],
        Agrupar: ["agrupamento"],
        Somar: ["valorUsuarioPendencia"]
    },
    AnaliticoC: {
        ShowHeader: true,
    	ShowFooter: false,
    	CssClass: "analitico",
        Colunas: [
            { field: 'itemSelecionado', title: '', sortable: false, checkbox: true, formatter: isRowDisabledAnalitico },
            { field: 'nomeFavorecidoPendencia', title: 'Favorecido', sortable: false },
            { field: 'contaConvenioAutoriza', title: 'Convênio', sortable: false, formatter: contaFormatter },
            { field: 'contaDebito', title: 'Conta Debito', sortable: false, formatter: contaFormatter },
            { field: 'codigoTransacaoDetalhe', title: 'Compromisso', sortable: false },
            { field: 'qtAssPendente', title: 'Ass. Pen', sortable: false, align: "center" },
            { field: 'valorUsuarioPendencia', title: 'Valor (R$)', sortable: false, align: "right", formatter: detalheFormatter, events: actionEvents },
            { field: 'listaAnaliticaDTO', title: '', sortable: false, visible: false },
            { field: 'codigoProduto', title: '', sortable: false, visible: false },
            { field: 'parentIndex', title: '', sortable: false, visible: false },
            { field: "flagPermiteAutorizar", title: "", sortable: false, visible: false },
            { field: "descricaoProduto", title: "", sortable: false, visible: false },
            { field: "tipoPendencia", title: "", sortable: false, visible: false }
        ]
    },
    Analitico: {
        ShowHeader: true,
    	ShowFooter: false,
    	CssClass: "analitico",
        Colunas: [
            { field: 'itemSelecionado', title: '', sortable: false, checkbox: true, formatter: isRowDisabledAnalitico },
            { field: 'contaConvenioAutoriza', title: 'Agencia/Conta', sortable: false, formatter: contaFormatter },
            { field: 'descricaoOperacao', title: 'Transação', sortable: false },
            { field: 'qtAssPendente', title: 'Ass. Pen', sortable: false, align: "center" },
            { field: 'valorUsuarioPendencia', title: 'Valor Total (R$)', sortable: false, align: "right", formatter: detalheFormatter, events: actionEvents},
            { field: 'codigoProduto', title: '', sortable: false, visible: false },
            { field: 'parentIndex', title: '', sortable: false, visible: false },
            { field: "flagPermiteAutorizar", title: "", sortable: false, visible: false },
            { field: "descricaoProduto", title: "", sortable: false, visible: false },
            { field: "tipoPendencia", title: "", sortable: false, visible: false }
        ]
    },
    descritivo: "",
    urlAnaliticoRequest: window.location.protocol + "//" + window.location.host + "/" + window.location.pathname.split("/")[1] + "/api/autorizacoesPendenciaProdutoComponent/listaAnaliticasProduto",
    urlId: 'resultadosAutorizacoesProduto'
};

autorizacaoTipo[tipoPOR_CONTA_CONVENIO] = {
    Sintetico: {
        ShowHeader: true,
    	ShowFooter: true,
    	CssClass: "sintetico",
        Colunas: [
            { field: 'itemSelecionado', title: '', sortable: false, checkbox: true, formatter: isRowDisabled },
            { field: "data", title: "Data de Efetivação", sortable: false, visible: true },
            { field: "quantidadePendencias", title: "Quantidade", sortable: false, visible: true, align: "right", width:"200px", footerFormatter: sumQtdeFormatter },
            { field: "valorPendencias", title: "Valor Total (R$)", sortable: false, visible: true, align: "right", formatter: valorFormatter, footerFormatter: sumFormatter },
            { field: "codigoProduto", title: "", sortable: false, visible: false },
            { field: "flgAutorizarSintetica", title: "", sortable: false, visible: false },
            { field: "tipoPendencia", title: "", sortable: false, visible: false },
            { field: "idSintetica", title: "", sortable: false, visible: false }
        ],
        Agrupar: ["descricaoProduto", "convenio"]
    },
    Modalidade: {
        ShowHeader: false,
    	ShowFooter: false,
    	CssClass: "modalidade",
        Colunas: [
            { field: 'itemSelecionado', title: '', sortable: false, checkbox: true, formatter: isRowDisabled },
            { field: "descricaoOperacao", title: "", sortable: false, visible: true },
            { field: qtdePENDENCIAS, title: 'Quantidade', sortable: false, align: "right", width:"72px" },
            { field: 'valorUsuarioPendencia', title: 'Valor Total (R$)', sortable: false, align: "right", formatter: valorFormatter},
            { field: 'listaAnaliticaDTO', title: '', sortable: false, visible: false },
            { field: "codigoProduto", title: "", sortable: false, visible: false },
            { field: 'parentIndex', title: '', sortable: false, visible: false },
            { field: "flagPermiteAutorizar", title: "", sortable: false, visible: false },
            { field: "descricaoProduto", title: "", sortable: false, visible: false },
            { field: "tipoPendencia", title: "", sortable: false, visible: false }
        ],
        Agrupar: ["codigoProduto"],
        Somar: ["valorUsuarioPendencia"]
    },
    PosModalidade: {
        ShowHeader: false,
    	ShowFooter: false,
    	CssClass: "posModalidade",
        Colunas: [
        	{ field: 'itemSelecionado', title: '', sortable: false, checkbox: true, formatter: isRowDisabled },
            { field: "descricaoOperacao", title: "", sortable: false, visible: true },
            { field: qtdePENDENCIAS, title: 'Quantidade', sortable: false, align: "right" , width:"72px"},
            { field: 'valorUsuarioPendencia', title: 'Valor Total (R$)', sortable: false, align: "right", formatter: valorFormatter},
            { field: 'listaAnaliticaDTO', title: '', sortable: false, visible: false },
            { field: "codigoProduto", title: "", sortable: false, visible: false },
            { field: 'parentIndex', title: '', sortable: false, visible: false },
            { field: "flagPermiteAutorizar", title: "", sortable: false, visible: false },
            { field: "descricaoProduto", title: "", sortable: false, visible: false },
            { field: "tipoPendencia", title: "", sortable: false, visible: false }
        ],
        Agrupar: ["agrupamento"],
        Somar: ["valorUsuarioPendencia"]
    },
    AnaliticoC: {
        ShowHeader: true,
    	ShowFooter: false,
    	CssClass: "analitico",
        Colunas: [
            { field: 'itemSelecionado', title: '', sortable: false, checkbox: true, formatter: isRowDisabledAnalitico },
            { field: 'nomeFavorecidoPendencia', title: 'Favorecido', sortable: false },
            { field: 'contaConvenioAutoriza', title: 'Convênio', sortable: false, formatter: contaFormatter },
            { field: 'contaDebito', title: 'Conta Debito', sortable: false, formatter: contaFormatter },
            { field: 'codigoTransacaoDetalhe', title: 'Compromisso', sortable: false },
            { field: 'qtAssPendente', title: 'Ass. Pen', sortable: false, align: "center" },
            { field: 'valorUsuarioPendencia', title: 'Valor (R$)', sortable: false, align: "right", formatter: detalheFormatter, events: actionEvents},
            { field: 'listaAnaliticaDTO', title: '', sortable: false, visible: false },
            { field: 'codigoProduto', title: '', sortable: false, visible: false },
            { field: 'parentIndex', title: '', sortable: false, visible: false },
            { field: "flagPermiteAutorizar", title: "", sortable: false, visible: false },
            { field: "descricaoProduto", title: "", sortable: false, visible: false },
            { field: "tipoPendencia", title: "", sortable: false, visible: false }
        ]
    },
    Analitico: {
        ShowHeader: true,
    	ShowFooter: false,
    	CssClass: "analitico",
        Colunas: [
            { field: 'itemSelecionado', title: '', sortable: false, checkbox: true, formatter: isRowDisabledAnalitico },
            { field: 'contaConvenioAutoriza', title: 'Agencia/Conta', sortable: false, formatter: contaFormatter },
            { field: 'descricaoOperacao', title: 'Transação', sortable: false },
            { field: 'qtAssPendente', title: 'Ass. Pen', sortable: false, align: "center" },
            { field: 'valorUsuarioPendencia', title: 'Valor Total (R$)', sortable: false, align: "right", formatter: detalheFormatter, events: actionEvents},
            { field: 'listaAnaliticaDTO', title: '', sortable: false, visible: false },
            { field: 'codigoProduto', title: '', sortable: false, visible: false },
            { field: 'parentIndex', title: '', sortable: false, visible: false },
            { field: "flagPermiteAutorizar", title: "", sortable: false, visible: false },
            { field: "descricaoProduto", title: "", sortable: false, visible: false },
            { field: "tipoPendencia", title: "", sortable: false, visible: false }
        ]
    },
    descritivo: "",
    urlAnaliticoRequest: window.location.protocol + "//" + window.location.host + "/" + window.location.pathname.split("/")[1] + "/api/autorizacoesPendenciaConvenioComponent/listaAnaliticasConvenio",
    urlId: 'resultadosAutorizacoesConvenio'
};

autorizacaoTipo[tipoREMESSA] = {
    Sintetico: {
        ShowHeader: true,
    	ShowFooter: true,
    	CssClass: "sintetico",
        Colunas: [
            { field: 'itemSelecionado', title: '', sortable: false, checkbox: true, formatter: isRowDisabled },
            { field: "codigoRemessa", title: "Remessa", sortable: false, visible: true },
            { field: "quantidadePendencias", title: "Quantidade", sortable: false, visible: true, align: "right", width: "200px", footerFormatter: sumQtdeFormatter },
            { field: "valorPendencias", title: "Valor Total (R$)", sortable: false, visible: true, align: "right", formatter: valorFormatter, footerFormatter: sumFormatter },
            { field: "convenio", title: "", sortable: false, visible: false },
            { field: "codigoProduto", title: "", sortable: false, visible: false },
            { field: "flgAutorizarSintetica", title: "", sortable: false, visible: false },
            { field: "tipoPendencia", title: "", sortable: false, visible: false },
            { field: "idSintetica", title: "", sortable: false, visible: false }
        ],
        Agrupar: ["convenio"]
    },
    Modalidade: {
        ShowHeader: false,
    	ShowFooter: false,
    	CssClass: "modalidade",
        Colunas: [
            { field: 'itemSelecionado', title: '', sortable: false, checkbox: true, formatter: isRowDisabled },
            { field: 'dataPagamento', title: 'Data', sortable: false },
            { field: qtdePENDENCIAS, title: 'Quantidade', sortable: false, align: "right", width:"72px" },
            { field: 'valorUsuarioPendencia', title: 'Valor Total (R$)', sortable: false, align: "right", formatter: valorFormatter},
            { field: 'agrupador', title: '', sortable: false, visible: false },
            { field: 'codigoProduto', title: '', sortable: false, visible: false },
            { field: 'parentIndex', title: '', sortable: false, visible: false },
            { field: "flagPermiteAutorizar", title: "", sortable: false, visible: false },
            { field: "descricaoProduto", title: "", sortable: false, visible: false },
            { field: "tipoPendencia", title: "", sortable: false, visible: false }
        ],
        Agrupar: ["dataPagamento"],
        Somar: ["valorUsuarioPendencia"]
    },
    PosModalidade: {
        ShowHeader: false,
    	ShowFooter: false,
    	CssClass: "posModalidade",
        Colunas: [
            { field: 'itemSelecionado', title: '', sortable: false, checkbox: true, formatter: isRowDisabled },
            { field: 'dataPagamento', title: 'Data', sortable: false, visible: false },
            { field: 'descricaoOperacao', title: 'Produto', sortable: false },
            { field: qtdePENDENCIAS, title: 'Quantidade', sortable: false, align: "right" , width:"72px"},
            { field: 'valorUsuarioPendencia', title: 'Valor Total (R$)', sortable: false, align: "right", formatter: valorFormatter},
            { field: 'listaAnaliticaDTO', title: '', sortable: false, visible: false },
            { field: 'agrupador', title: '', sortable: false, visible: false },
            { field: 'codigoProduto', title: '', sortable: false, visible: false },
            { field: 'parentIndex', title: '', sortable: false, visible: false },
            { field: "flagPermiteAutorizar", title: "", sortable: false, visible: false },
            { field: "descricaoProduto", title: "", sortable: false, visible: false },
            { field: "tipoPendencia", title: "", sortable: false, visible: false }
        ],
        Agrupar: ["codigoProduto"],
        Somar: ["valorUsuarioPendencia"]
    },
    AnaliticoC: {
        ShowHeader: true,
    	ShowFooter: false,
    	CssClass: "analitico",
        Colunas: [
            { field: 'itemSelecionado', title: '', sortable: false, checkbox: true, formatter: isRowDisabledAnalitico },
            { field: 'dataPagamento', title: 'Data', sortable: false, visible: false },
            { field: 'nomeFavorecidoPendencia', title: 'Favorecido', sortable: false },
            { field: 'contaConvenioAutoriza', title: 'Convênio', sortable: false, formatter: contaFormatter },
            { field: 'contaDebito', title: 'Conta Debito', sortable: false, formatter: contaFormatter },
            { field: 'codigoTransacaoDetalhe', title: 'Compromisso', sortable: false },
            { field: 'qtAssPendente', title: 'Ass. Pen', sortable: false, align: "center" },
            { field: 'valorUsuarioPendencia', title: 'Valor (R$)', sortable: false, align: "right", formatter: detalheFormatter, events: actionEvents},
            { field: 'listaAnaliticaDTO', title: '', sortable: false, visible: false },
            { field: 'agrupador', title: '', sortable: false, visible: false },
            { field: 'codigoProduto', title: '', sortable: false, visible: false },
            { field: 'parentIndex', title: '', sortable: false, visible: false },
            { field: "flagPermiteAutorizar", title: "", sortable: false, visible: false },
            { field: "descricaoProduto", title: "", sortable: false, visible: false },
            { field: "tipoPendencia", title: "", sortable: false, visible: false }
        ]
    },
    Analitico: {
        ShowHeader: true,
    	ShowFooter: false,
    	CssClass: "analitico",
        Colunas: [
            { field: 'itemSelecionado', title: '', sortable: false, checkbox: true, formatter: isRowDisabledAnalitico },
            { field: 'contaConvenioAutoriza', title: 'Agencia/Conta', sortable: false, formatter: contaFormatter },
            { field: 'descricaoOperacao', title: 'Transação', sortable: false },
            { field: qtdePENDENCIAS, title: 'Quantidade', sortable: false, align: "right" },
            { field: 'valorUsuarioPendencia', title: 'Valor Total (R$)', sortable: false, align: "right", formatter: detalheFormatter, events: actionEvents},
            { field: 'codigoProduto', title: '', sortable: false, visible: false },
            { field: 'parentIndex', title: '', sortable: false, visible: false },
            { field: "flagPermiteAutorizar", title: "", sortable: false, visible: false },
            { field: "descricaoProduto", title: "", sortable: false, visible: false },
            { field: "tipoPendencia", title: "", sortable: false, visible: false }
        ]
    },
    descritivo: "Convenio: ",
    urlAnaliticoRequest: window.location.protocol + "//" + window.location.host + "/" + window.location.pathname.split("/")[1] + "/api/autorizacoesPendenciaRemessaComponent/listaAnaliticasRemessa",
    urlId: 'resultadosAutorizacoesRemessa'
};

function sumFormatter(data) {
	var field = this.field;
	return formatCurrency(data.reduce(function(sum, row) {
			return (sum) + (row[field] || 0);
		}, 0));
}

function sumQtdeFormatter(data) {
	var field = this.field;
	return data.reduce(function(sum, row) {
			return (sum) + (row[field] || 0);
		}, 0);
}

if (!Array.prototype.filter)
{
  Array.prototype.filter = function(fun /*, thisp */)
  {
    "use strict";

    if (this === void 0 || this === null)
      throw new TypeError();

    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun !== "function")
      throw new TypeError();

    var res = [];
    var thisp = arguments[1];
    for (var i = 0; i < len; i++)
    {
      if (i in t)
      {
        var val = t[i]; // in case fun mutates this
        if (fun.call(thisp, val, i, t))
          res.push(val);
      }
    }

    return res;
  };
};
