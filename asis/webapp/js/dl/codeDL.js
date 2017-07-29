function initDL() {
	var cli = document.getElementById("formGeral:chaveClient");
	cli.value = DLECC.init();
};

function encryptDL() {

	var serverPublicKey = document.getElementById("formGeral:chaveServer");
	var clientPublicKey = document.getElementById("formGeral:chaveClient");

	var usuario = document.getElementById("formGeral:usuario");
	var hashAcesso = document.getElementById("formGeral:hashAcesso");

	var senhaAcesso = document.getElementById("formGeral:idSenhaAcesso");
	var msgErro = document.getElementById("formGeral:msgErroJavaStript");

	espelharValueHiddenTeclado(senhaAcesso);

	if (validarSenhaAcesso(senhaAcesso, usuario, msgErro)) {
		hashAcesso.value = DLECC.encryptHashPassword(senhaAcesso.value,
				usuario.value.toUpperCase(), serverPublicKey.value);
		senhaAcesso.value = DLECC.encryptToApp(senhaAcesso.value,
				serverPublicKey.value);
	}

};

function espelharValueHiddenTeclado(senhaAcesso) {
	if (document.getElementById("formGeral:senhaAcesso") != null) {
		senhaAcesso.value = document.getElementById("formGeral:senhaAcesso").value
		document.getElementById("formGeral:senhaAcesso").value = "";
	}
}

function espelharValueHidden(senhaEletronica, mobileToken, tokenFisico, qrCode) {
	if (document.getElementById("formGeral:idAssinatura") != null) {
		senhaEletronica.value = document
				.getElementById("formGeral:idAssinatura").value
		document.getElementById("formGeral:idAssinatura").value = "";
	}
	if (document.getElementById("formGeral:panelTokens:idMobileToken") != null) {
		mobileToken.value = document
				.getElementById("formGeral:panelTokens:idMobileToken").value
		document.getElementById("formGeral:panelTokens:idMobileToken").value = "";
	}
	if (document.getElementById("formGeral:panelTokens:idTokenFisico") != null) {
		tokenFisico.value = document
				.getElementById("formGeral:panelTokens:idTokenFisico").value
		document.getElementById("formGeral:panelTokens:idTokenFisico").value = "";
	}
	if (document.getElementById("formGeral:panelTokens:idQrCode") != null) {
		qrCode.value = document
				.getElementById("formGeral:panelTokens:idQrCode").value
		document.getElementById("formGeral:panelTokens:idQrCode").value = "";
	}
}

function encryptSecureDL() {

	var usuario = document.getElementById("formGeral:usuario");
	var serverPublicKey = document.getElementById("formGeral:chaveServer");
	var clientPublicKey = document.getElementById("formGeral:chaveClient");
	var hashSenhaEletronica = document
			.getElementById("formGeral:hashSenhaEletronica");
	var senhaEletronica = document
			.getElementById("formGeral:assinaturaEletronica");
	var mobileToken = document.getElementById("formGeral:mobileToken");
	var tokenFisico = document.getElementById("formGeral:tokenFisico");
	var qrCode = document.getElementById("formGeral:qrCode");
	var msgErro = document.getElementById("formGeral:msgErroJavaStript");

	espelharValueHidden(senhaEletronica, mobileToken, tokenFisico, qrCode);

	if (confereAssinatura(senhaEletronica, msgErro)) {
		if (senhaEletronica != null) {
			if (senhaEletronica.value != "") {
				if (usuario.value != "") {
					hashSenhaEletronica.value = DLECC.encryptHashPassword(
							senhaEletronica.value.toUpperCase(), usuario.value
									.toUpperCase(), serverPublicKey.value);
				}
			}
		}

		if (senhaEletronica != null) {
			if (senhaEletronica.value != "") {
				if (usuario.value != "") {
					senhaEletronica.value = DLECC.encryptToApp(
							senhaEletronica.value, serverPublicKey.value);
				}
			}
		}

		if (mobileToken != null) {
			if (mobileToken.value != "") {
				mobileToken.value = DLECC.encryptToApp(mobileToken.value,
						serverPublicKey.value);
			}
		}

		if (tokenFisico != null) {
			if (tokenFisico.value != "") {
				tokenFisico.value = DLECC.encryptToApp(tokenFisico.value,
						serverPublicKey.value);
			}
		}

		if (qrCode != null) {
			if (qrCode.value != "") {
				qrCode.value = DLECC.encryptToApp(qrCode.value,
						serverPublicKey.value);
			}
		}
	}
};

function enviarHash() {
	var chaveServer = document.getElementById("formGeral:chaveServer").value;
	var stringAberta = getStringHash();
	var stringAssinada = DLECC.sign(stringAberta, chaveServer);

	document.getElementById("formGeral:clientHash").value = stringAssinada;
};

function enviarHashList() {
	var chaveServer = document.getElementById("formGeral:chaveServer").value;
	var stringAberta = getStringHashLista();

	// console.log(stringAberta);
	// console.log("\n\n" + chaveServer);

	var stringAssinada = DLECC.sign(stringAberta, chaveServer);

	// console.log("\n\n" + stringAssinada);

	document.getElementById("formGeral:clientHash").value = stringAssinada;
};

function getStringHash() {
	var inputs = document.getElementById("formGeral").elements;
	var inputsHash = {};
	var size = 0;
	var srtringHash = "";

	for (var i = 0, input; input = inputs[i++];) {
		if (input.id.indexOf("_hash_") != -1) {
			if (input.id == "formGeral:cpfCnpj_hash_3") {
				var cpf = replaceSpecialChars(input);
				var key = input.id.match(/\d+$/);
				inputsHash[parseInt(key)] = cpf;
				size++;
			} else {
				var key = input.id.match(/\d+$/);
				inputsHash[parseInt(key)] = input.value.trim();
				size++;
			}
		}
	}

	for (var i = 1; i <= size; i++) {
		srtringHash += inputsHash[i];
	}

	return srtringHash;
};

function compareKeys(key1, key2) {
	var indices1 = key1.split("_");
	var indices2 = key2.split("_");

	for (var i = 0; i < key1.length - 1; i++) {
		if (parseInt(indices1[i]) < parseInt(indices2[i])) {
			return -1;
		} else if (parseInt(indices1[i]) > parseInt(indices2[i])) {
			return 1;
		}
	}

	return 0;
}

function getStringHashLista() {
	var inputs = document.getElementById("formGeral").elements;
	var keys = [];
	var keysSize = 0;
	var stringHash = "";

	for (var i = 0, input; input = inputs[i++];) {
		if (input.id.indexOf("_hashLista_") != -1) {
			var startIndexKey = input.id.indexOf("_hashLista_") + 11;
			var endIndexKey = input.id.length
			keys[keysSize++] = input.id.substring(startIndexKey, endIndexKey);
		}
	}

	keys.sort(compareKeys);
	var teste;

	for (var j = 0; j < keysSize; j++) {
		for (var i = 0, input; input = inputs[i++];) {
			if (input.id.indexOf("_hashLista_" + keys[j]) != -1) {
				teste += "_hashLista_" + keys[j];
				stringHash += input.value.trim();
			}
		}
	}

	return stringHash;
};

function mtel(v) {
	v = v.value.replace(/D/g, "");
	// v=v.value.replace(/^(d{2})(d)/g,"($1) $2");
	v = v.value.replace(/(\d)(\d{4})$/, "$1-$2");
	return v;
};

function encryptNewPasswordAccessDL() {

	var serverPublicKey = document.getElementById("formGeral:chaveServer");
	var clientPublicKey = document.getElementById("formGeral:chaveClient");

	var usuario = document.getElementById("formGeral:usuario");

	var hashAcesso = document.getElementById("formGeral:hashAcesso");
	var hashAcessoNovo = document.getElementById("formGeral:hashAcessoNovo");

	var senhaAcesso = document.getElementById("formGeral:senhaAcesso");
	var senhaAcessoNova = document.getElementById("formGeral:senhaAcessoNova");
	var senhaAcessoConfirmacao = document
			.getElementById("formGeral:senhaAcessoConfirmacao");
	var msgErro = document.getElementById("formGeral:msgErroJavaStript");

	if (validarSenha(senhaAcesso, senhaAcessoNova, senhaAcessoConfirmacao,
			msgErro)) {
		hashAcesso.value = DLECC.encryptHashPassword(senhaAcesso.value,
				usuario.value.toUpperCase(), serverPublicKey.value);

		hashAcessoNovo.value = DLECC.encryptHashPassword(senhaAcessoNova.value,
				usuario.value.toUpperCase(), serverPublicKey.value);
		usuario.value = '';
		senhaAcesso.value = '';
		senhaAcessoNova.value = '';
		senhaAcessoConfirmacao.value = '';

	}

};

function encryptNewPasswordAccessDLInterno() {

	var serverPublicKey = document.getElementById("formGeral:chaveServer");
	var clientPublicKey = document.getElementById("formGeral:chaveClient");

	var usuario = document.getElementById("formGeral:usuario");

	var hashAcesso = document.getElementById("formGeral:hashAcesso");
	var hashAcessoNovo = document.getElementById("formGeral:hashAcessoNovo");

	var senhaAcesso = document.getElementById("formGeral:senhaAcesso");
	var senhaAcessoNova = document.getElementById("formGeral:senhaAcessoNova");
	var senhaAcessoConfirmacao = document
			.getElementById("formGeral:senhaAcessoConfirmacao");
	var msgErro = document.getElementById("formGeral:msgErroJavaStript");

	if (validarSenha(senhaAcesso, senhaAcessoNova, senhaAcessoConfirmacao,
			msgErro)) {
		hashAcesso.value = DLECC.encryptHashPassword(senhaAcesso.value,
				usuario.value.toUpperCase(), serverPublicKey.value);

		hashAcessoNovo.value = DLECC.encryptHashPassword(senhaAcessoNova.value,
				usuario.value.toUpperCase(), serverPublicKey.value);
		senhaAcesso.value = '';
		senhaAcessoNova.value = '';
		senhaAcessoConfirmacao.value = '';

	}

};

function encryptNewAssinaturaEletronicaAccessDL() {

	var serverPublicKey = document.getElementById("formGeral:chaveServer");
	var clientPublicKey = document.getElementById("formGeral:chaveClient");

	var usuario = document.getElementById("formGeral:usuario");

	var HashSenhaEletronica = document.getElementById("formGeral:hashAcesso");
	var HashSenhaEletronicaNova = document
			.getElementById("formGeral:hashAcessoNovo");

	var senhaAcesso = document.getElementById("formGeral:senhaAcesso");
	var senhaAcessoNova = document.getElementById("formGeral:senhaAcessoNova");
	var senhaAcessoConfirmacao = document
			.getElementById("formGeral:senhaAcessoConfirmacao");
	var msgErro = document.getElementById("formGeral:msgErroJavaStript");

	if (validarSenha(senhaAcesso, senhaAcessoNova, senhaAcessoConfirmacao,
			msgErro)) {
		HashSenhaEletronica.value = DLECC.encryptHashPassword(
				senhaAcesso.value, usuario.value.toUpperCase(),
				serverPublicKey.value);

		HashSenhaEletronicaNova.value = DLECC.encryptHashPassword(
				senhaAcessoNova.value, usuario.value.toUpperCase(),
				serverPublicKey.value);
		usuario.value = '';
		senhaAcesso.value = '';
		senhaAcessoNova.value = '';
		senhaAcessoConfirmacao.value = '';

	}

};

function encryptNewAssinaturaEletronicaAndRespostaEletronica() {
	var msgErro = document.getElementById("formGeral:msgErroJavaStript");
	var serverPublicKey = document.getElementById("formGeral:chaveServer");
	var clientPublicKey = document.getElementById("formGeral:chaveClient");

	var usuario = document.getElementById("formGeral:usuario");

	var HashSenhaEletronica = document.getElementById("formGeral:hashAcesso");
	var HashSenhaEletronicaNova = document
			.getElementById("formGeral:hashAcessoNovo");

	var senhaAcesso = document.getElementById("formGeral:senhaAcesso");
	var senhaAcessoNova = document.getElementById("formGeral:senhaAcessoNova");
	var senhaAcessoConfirmacao = document
			.getElementById("formGeral:senhaAcessoConfirmacao");

	var resposta = document.getElementById("formGeral:txtResposta");
	var hashResposta = document.getElementById("formGeral:hashResposta");

	if (resposta != null) {
		if (resposta.value.length >= 8 && resposta.value != "") {
			msgErro.value = '';
			hashResposta.value = DLECC.encryptHashPassword(resposta.value,
					usuario.value.toUpperCase(), serverPublicKey.value);
		} else {
			msgErro.value = "Digite uma frase com pelo menos 8 caracteres para a resposta.";
			senhaAcesso.value = '';
			senhaAcessoNova.value = '';
			senhaAcessoConfirmacao.value = '';
			return false;
		}
	}

	if (senhaAcesso != undefined & senhaAcesso != null) {
		if (validarAssinatura(senhaAcesso, senhaAcessoNova,
				senhaAcessoConfirmacao, msgErro)) {
			HashSenhaEletronica.value = DLECC.encryptHashPassword(
					senhaAcesso.value.toUpperCase(), usuario.value
							.toUpperCase(), serverPublicKey.value);
			HashSenhaEletronicaNova.value = DLECC.encryptHashPassword(
					senhaAcessoNova.value.toUpperCase(), usuario.value
							.toUpperCase(), serverPublicKey.value);
		} else {
			senhaAcesso.value = '';
			senhaAcessoNova.value = '';
			senhaAcessoConfirmacao.value = '';
			if (msgErro.value != "") {
				return false;
			}
		}
	}

	if (validarAssinaturaEletronica(senhaAcessoNova, senhaAcessoConfirmacao,
			msgErro)) {
		HashSenhaEletronicaNova.value = DLECC.encryptHashPassword(
				senhaAcessoNova.value.toUpperCase(), usuario.value
						.toUpperCase(), serverPublicKey.value);
	} else {
		senhaAcessoNova.value = '';
		senhaAcessoConfirmacao.value = '';
	}

	senhaAcesso.value = '';
	senhaAcessoNova.value = '';
	senhaAcessoConfirmacao.value = '';
};

function encryptSolicitarNovaAssinaturaValidacaoPerguntaCNPJ() {
	var cnpj = document.getElementById("formGeral:cnpj");
	var msgErro = document.getElementById("formGeral:msgErroJavaStript");
	var serverPublicKey = document.getElementById("formGeral:chaveServer");
	var clientPublicKey = document.getElementById("formGeral:chaveClient");
	var pergunta = document.getElementById("formGeral:perguntaResposta");

	var usuario = document.getElementById("formGeral:usuario");
	var resposta = document.getElementById("formGeral:txtResposta");
	var hashResposta = document.getElementById("formGeral:hashResposta");

	var HashSenhaEletronica = document.getElementById("formGeral:hashAcesso");
	var HashSenhaEletronicaNova = document
			.getElementById("formGeral:hashAcessoNovo");
	var senhaAcesso = document.getElementById("formGeral:senhaAcesso");
	var senhaAcessoNova = document.getElementById("formGeral:senhaAcessoNova");
	var senhaAcessoConfirmacao = document
			.getElementById("formGeral:senhaAcessoConfirmacao");

	msgErro.value = '';

	if (validarCampoCNPJ(cnpj, msgErro) == false) {
		return false;
	}

	if (pergunta != undefined & pergunta != null) {
		if (validarResposta(resposta, msgErro, false) == false) {
			limparCampos(senhaAcessoNova, senhaAcessoConfirmacao);
			return false;
		} else {
			hashResposta.value = DLECC.encryptHashPassword(resposta.value,
					usuario.value.toUpperCase(), serverPublicKey.value);
		}
	}

	if (senhaAcesso != undefined & senhaAcesso != null) {
		if (validarAssinatura(senhaAcesso, senhaAcessoNova,
				senhaAcessoConfirmacao, msgErro)) {
			HashSenhaEletronica.value = DLECC.encryptHashPassword(
					senhaAcesso.value.toUpperCase(), usuario.value
							.toUpperCase(), serverPublicKey.value);
			HashSenhaEletronicaNova.value = DLECC.encryptHashPassword(
					senhaAcessoNova.value.toUpperCase(), usuario.value
							.toUpperCase(), serverPublicKey.value);
		} else {
			senhaAcesso.value = '';
			limparCampos(senhaAcessoNova, senhaAcessoConfirmacao);
		}
	} else {
		if (validarAssinaturaEletronica(senhaAcessoNova,
				senhaAcessoConfirmacao, msgErro)) {
			HashSenhaEletronicaNova.value = DLECC.encryptHashPassword(
					senhaAcessoNova.value.toUpperCase(), usuario.value
							.toUpperCase(), serverPublicKey.value);
		} else {
			limparCampos(senhaAcessoNova, senhaAcessoConfirmacao);
		}
	}
};

function limparCampos(senhaAcessoNova, senhaAcessoConfirmacao) {
	senhaAcessoNova.value = '';
	senhaAcessoConfirmacao.value = '';
};

function encryptNewAssinaturaEletronicaAccessDLInterna() {

	var msgErro = document.getElementById("formGeral:msgErroJavaStript");
	if (msgErro.value != null && msgErro.value != '')
		return false;

	var serverPublicKey = document.getElementById("formGeral:chaveServer");
	var clientPublicKey = document.getElementById("formGeral:chaveClient");

	var usuario = document.getElementById("formGeral:usuario");

	var HashSenhaEletronica = document.getElementById("formGeral:hashAcesso");
	var HashSenhaEletronicaNova = document
			.getElementById("formGeral:hashAcessoNovo");

	var senhaAcesso = document.getElementById("formGeral:senhaAcesso");
	var senhaAcessoNova = document.getElementById("formGeral:senhaAcessoNova");
	var senhaAcessoConfirmacao = document
			.getElementById("formGeral:senhaAcessoConfirmacao");

	var msgErro = document.getElementById("formGeral:msgErroJavaStript");

	if (senhaAcesso != undefined & senhaAcesso != null) {
		if (validarAssinatura(senhaAcesso, senhaAcessoNova,
				senhaAcessoConfirmacao, msgErro)) {
			HashSenhaEletronica.value = DLECC.encryptHashPassword(
					senhaAcesso.value.toUpperCase(), usuario.value
							.toUpperCase(), serverPublicKey.value);
			HashSenhaEletronicaNova.value = DLECC.encryptHashPassword(
					senhaAcessoNova.value.toUpperCase(), usuario.value
							.toUpperCase(), serverPublicKey.value);
		} else {
			senhaAcesso.value = '';
			senhaAcessoNova.value = '';
			senhaAcessoConfirmacao.value = '';
		}
	} else {
		if (validarAssinaturaEletronica(senhaAcessoNova,
				senhaAcessoConfirmacao, msgErro)) {
			HashSenhaEletronicaNova.value = DLECC.encryptHashPassword(
					senhaAcessoNova.value.toUpperCase(), usuario.value
							.toUpperCase(), serverPublicKey.value);
		} else {
			senhaAcessoNova.value = '';
			senhaAcessoConfirmacao.value = '';
		}
	}
};
// inicio
function encryptAssinaturaEletronica() {
	var msgErro = document.getElementById("formGeral:msgErroJavaStript");
	if (msgErro.value == '') {
		var serverPublicKey = document.getElementById("formGeral:chaveServer");
		var clientPublicKey = document.getElementById("formGeral:chaveClient");

		var usuario = document.getElementById("formGeral:usuario");

		var HashSenhaEletronica = document
				.getElementById("formGeral:hashAcesso");
		var HashSenhaEletronicaNova = document
				.getElementById("formGeral:hashAcessoNovo");

		var senhaAcesso = document.getElementById("formGeral:senhaAcesso");
		var senhaAcessoNova = document
				.getElementById("formGeral:senhaAcessoNova");
		var senhaAcessoConfirmacao = document
				.getElementById("formGeral:senhaAcessoConfirmacao");

		if (validarAssinatura(senhaAcesso, senhaAcessoNova,
				senhaAcessoConfirmacao, msgErro)) {
			if (senhaAcesso != null) {
				HashSenhaEletronica.value = DLECC.encryptHashPassword(
						senhaAcesso.value.toUpperCase(), usuario.value
								.toUpperCase(), serverPublicKey.value);
			}
			HashSenhaEletronicaNova.value = DLECC.encryptHashPassword(
					senhaAcessoNova.value.toUpperCase(), usuario.value
							.toUpperCase(), serverPublicKey.value);
			senhaAcesso.value = '';
			senhaAcessoNova.value = '';
			senhaAcessoConfirmacao.value = '';

		}
	}
};
function validarAssina(senhaAtual, senhaNova, senhaConfirmacao, msg) {
	if (senhaAtual != null) {
		if (senhaAtual.value.length < 6 || senhaAtual.value.length > 8) {
			msg.value = "A Assinatura Eletrônica deve ter no mínimo 6 dígitos.";
			return false;
		}
		if (senhaNova.value == senhaAtual.value) {
			msg.value = "A Assinatura Atual e a Nova Assinatura devem ser diferentes.";
			senhaConfirmacao.value = '';
			senhaNova.value = '';
			return false;
		}
	}

	if (senhaNova.value.length < 6 || senhaNova.value.length > 8
			|| senhaConfirmacao.value.length < 6
			|| senhaConfirmacao.value.length > 8) {
		msg.value = "A Assinatura Eletrônica deve ter no mínimo 6 dígitos.";
		return false;
	}

	if (senhaNova.value != senhaConfirmacao.value) {
		msg.value = "A Nova Assinatura e a Confirmação devem ser iguais.";
		senhaConfirmacao.value = '';
		senhaNova.value = '';

		return false;
	}

	if (!VISr(senhaNova.value)) {
		msg.value = "Sua nova Assinatura não foi aceita por ser considerada de fácil identificação. Procure diversificar ao máximo a utilização dos caracteres com o fim de torná-la mais segura. Por favor digite novamente.";
		senhaConfirmacao.value = '';
		senhaNova.value = '';

		return false;
	}

	msg.value = '';

	return true;
}

function validarAssinatura(senhaAtual, senhaNova, senhaConfirmacao, msg) {

	if (senhaAtual != null) {
		if (senhaNova.value == senhaAtual.value) {
			msg.value = "A Assinatura Atual e a Nova Assinatura devem ser diferentes.";
			senhaConfirmacao.value = '';
			senhaNova.value = '';
			return false;
		}
		if (senhaAtual.value.length < 6 || senhaAtual.value.length > 8) {
			msg.value = "A Assinatura Eletrônica deve ter no mínimo 6 dígitos.";
			return false;
		}
	}

	if (senhaNova.value.length < 6 || senhaNova.value.length > 8
			|| senhaConfirmacao.value.length < 6
			|| senhaConfirmacao.value.length > 8) {
		msg.value = "A Assinatura Eletrônica deve ter no mínimo 6 dígitos.";
		return false;
	}

	if (senhaNova.value != senhaConfirmacao.value) {
		msg.value = "A Nova Assinatura e a Confirmação devem ser iguais.";
		senhaConfirmacao.value = '';
		senhaNova.value = '';

		return false;
	}

	msg.value = '';

	return true;
};
function encryptValidRespostaPerguntaSecreta() {
	var serverPublicKey = document.getElementById("formGeral:chaveServer");
	var clientPublicKey = document.getElementById("formGeral:chaveClient");
	var msgErro = document.getElementById("formGeral:msgErroJavaStript");

	var usuario = document.getElementById("formGeral:usuario");
	var resposta = document.getElementById("formGeral:txtResposta");
	var hashResposta = document.getElementById("formGeral:hashResposta");
	if (resposta != null) {
		if (resposta.value != "") {
			hashResposta.value = DLECC.encryptHashPassword(resposta.value,
					usuario.value.toUpperCase(), serverPublicKey.value);
			msgErro.value = '';
		} else {
			msgErro.value = "Digite uma frase com pelo menos 8 caracteres para a resposta.";
		}
	} else {
		msgErro.value = '';
	}
}
// fim
function encryptRespostaPerguntaSecreta() {
	var msgErro = document.getElementById("formGeral:msgErroJavaStript");
	var serverPublicKey = document.getElementById("formGeral:chaveServer");
	var clientPublicKey = document.getElementById("formGeral:chaveClient");

	var usuario = document.getElementById("formGeral:usuario");
	var resposta = document.getElementById("formGeral:txtResposta");
	var hashResposta = document.getElementById("formGeral:hashResposta");

	if (resposta != null && resposta.value.length >= 8 && resposta.value != "") {
		msgErro.value = '';
		hashResposta.value = DLECC.encryptHashPassword(resposta.value,
				usuario.value.toUpperCase(), serverPublicKey.value);
	} else {
		msgErro.value = "Digite uma frase com pelo menos 8 caracteres para a resposta.";
		return false;
	}
}

function validarSenhaAcesso(senhaAtual, usuario, msg) {

	if (usuario.value == '') {
		msg.value = "O Nome de Acesso deve ter de 3 a 14 caracteres.";
		usuario.value = '';
		return false;
	}

	if (senhaAtual.value == '') {
		senhaAtual.value = '0';
	}

	msg.value = '';

	return true;
};

function validarAgenciaConta() {

	var txtAgencia = document.getElementById("formGeral:agencia");
	var txtConta = document.getElementById("formGeral:conta");
	var msgErro = document.getElementById("formGeral:msgErroJavaStript");

	if (txtAgencia.value == '' || JustNumber(txtAgencia.value) <= 0) {
		msgErro.value = "Agência inválida. Por favor, verifique os dados digitados.";
		return false;
	}

	preencheZeros(txtAgencia, 4);

	if (txtConta.value == "" || JustNumber(txtConta.value) <= 0) {
		msgErro.value = "Conta inválida. Por favor, verifique os dados digitados.";
		return false;
	}

	txtConta = txtConta.value.replace(" ", "");

	ForAccount(txtAgencia.value, txtConta, msgErro);

};

function ForAccount(agencia, conta, msg) {

	var txtConta = document.getElementById("formGeral:conta");

	if (agencia > 3000) {

		if (conta.length < 9) {
			if (conta.substring(0, 1) == '1' && conta.substring(0, 2) != '13') {
				contaLeft = conta.substring(0, 1);
				contaRight = conta.substring(1, conta.length);
			} else {
				contaLeft = conta.substring(0, 2);
				contaRight = conta.substring(2, conta.length);
			}
			contaLeft = preencheZerosVar(contaLeft, 2);
			contaRight = preencheZerosVar(contaRight, 7);
			conta = contaLeft.toString() + contaRight.toString();

		}

		txtConta.value = conta;

		if (!CheckDigitoBNP(agencia, conta)) {
			msg.value = "Conta inválida. Por favor, verifique os dados digitados.";
			return false;
		}

	} else {

		if (conta.length == 8) {
			if (conta.substring(0, 1) == '1' && conta.substring(0, 2) != '13') {
				contaLeft = conta.substring(0, 1);
				contaRight = conta.substring(1, conta.length);
			} else {
				contaLeft = conta.substring(0, 2);
				contaRight = conta.substring(2, conta.length);
			}
			contaLeft = preencheZerosVar(contaLeft, 2);
			contaRight = preencheZerosVar(contaRight, 7);
			conta = contaLeft.toString() + contaRight.toString();

			txtConta.value = conta;

			if (!CheckDigitoBNP(agencia, conta)) {
				msg.value = "Conta inválida. Por favor, verifique os dados digitados.";
				return false;
			}
		}
	}

	msg.value = '';

	return true;

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
}
function preencheZeros(field, size) {
	while (field.value.length < size)
		field.value = '0' + field.value;
}
function preencheZerosVar(variavel, size) {
	while (variavel.length < size) {
		variavel = '0' + variavel
	}
	return variavel;
}
function CheckDigitoBNP(auxAgencia, auxConta) {
	var auxPeso = new Array("9", "7", "3", "1", "9", "7", "1", "3", "1", "9",
			"7", "3");
	var cont = 0;
	var soma = 0;
	var digito = 0;
	var auxRet = false;
	var auxAgenciaConta = auxAgencia.toString() + auxConta.toString();
	for (cont = 0; cont < 12; cont++) {
		soma = soma
				+ ((auxAgenciaConta.substring(cont, cont + 1) * auxPeso[cont]) % 10);
	}
	digito = (10 - (soma % 10)) % 10;
	if (digito == auxAgenciaConta.substring(12, 13))
		auxRet = true;
	return auxRet;
}

function validarFormAtualizarMaster() {

	var cnpj = document.getElementById("formGeral:userCnpj");
	var cpfTitular = document.getElementById("formGeral:userCpfTitular");
	var cpfUsuario = document.getElementById("formGeral:userCpf");
	var nomeAcesso = document.getElementById("formGeral:nomeAcesso");
	var nomeAcessoConfirma = document
			.getElementById("formGeral:nomeAcessoConfirmacao");
	var senhaAntiga = document.getElementById("formGeral:userPassword");
	var senhaNovaConfirma = document
			.getElementById("formGeral:userPasswordConfirmation");
	var assinaturaConfirma = document
			.getElementById("formGeral:userAssinaturaConfirmacao");
	var pergunta = document.getElementById("formGeral:userQuestion");
	var resposta = document.getElementById("formGeral:userAnswer");
	var senhaNova = document.getElementById("formGeral:userNewPassword");
	var assinatura = document.getElementById("formGeral:userAssinatura");

	var cpfHash = document.getElementById("formGeral:cpfHash");
	var cnpjHash = document.getElementById("formGeral:cnpjHash");
	var senhaAntigaHash = document.getElementById("formGeral:senhaAntigaHash");
	var senhaNovaConfirmaHash = document
			.getElementById("formGeral:senhaNovaConfirmaHash");
	var assinaturaConfirmaHash = document
			.getElementById("formGeral:assinaturaConfirmaHash");
	var perguntaHash = document.getElementById("formGeral:perguntaHash");
	var respostaHash = document.getElementById("formGeral:respostaHash");
	var senhaNovaHash = document.getElementById("formGeral:senhaNovaHash");
	var assinaturaHash = document.getElementById("formGeral:assinaturaHash");

	var tipoContrato = document.getElementById("formGeral:tipoContrato");

	var msg = document.getElementById("formGeral:msgErroJavaStript");

	var serverPublicKey = document.getElementById("formGeral:chaveServer");
	var usuario = document.getElementById("formGeral:usuario");

	if (validarAtualizacaoMaster(cnpj, cpfTitular, cpfUsuario, nomeAcesso,
			nomeAcessoConfirma, senhaNova, senhaNovaConfirma, assinatura,
			assinaturaConfirma, pergunta, resposta, msg)) {
		senhaNovaHash.value = DLECC.encryptHashPassword(senhaNova.value,
				usuario.value.toUpperCase(), serverPublicKey.value);
		senhaNovaConfirmaHash.value = DLECC.encryptHashPassword(
				senhaNovaConfirma.value, usuario.value.toUpperCase(),
				serverPublicKey.value);
		perguntaHash.value = DLECC.encryptToApp(pergunta.value,
				serverPublicKey.value);
		respostaHash.value = DLECC.encryptHashPassword(resposta.value,
				usuario.value.toUpperCase(), serverPublicKey.value);
		if (tipoContrato.value != '1') {
			assinaturaHash.value = DLECC.encryptHashPassword(assinatura.value
					.toUpperCase(), usuario.value.toUpperCase(),
					serverPublicKey.value);

			assinaturaConfirmaHash.value = DLECC.encryptHashPassword(
					assinaturaConfirma.value.toUpperCase(), usuario.value
							.toUpperCase(), serverPublicKey.value);
		}
	}
};

function validarAtualizacaoMaster(cnpj, cpfTitular, cpfUsuario, nomeAcesso,
		nomeAcessoConfirma, senhaNova, senhaNovaConfirma, assinatura,
		assinaturaConfirma, pergunta, resposta, msgErro) {
	var showCnpj = document.getElementById("formGeral:showCnpj").value;

	var tipoContrato = document.getElementById("formGeral:tipoContrato");

	if (showCnpj == 'true') {
		if (validarCampoCNPJ(cnpj, msgErro) == false) {
			return false;
		}

	} else {
		if (validarCampoCPF(cpfTitular, msgErro) == false) {
			return false;
		}
	}

	if (cpfUsuario.value == '') {
		msgErro.value = "Por favor digite o CPF do usuário responsável.";
		return false;
	} else {
		if (validarCPF(cpfUsuario.value) == false) {
			msgErro.value = "Informe o CPF no formato válido.";
			return false;
		}
	}

	if (validarSenhaAtualizarMaster(senhaNova, senhaNovaConfirma, msgErro) == false) {
		return false;
	}

	if (validarPerguntar(pergunta, msgErro) == false) {
		return false;
	}

	if (validarResposta(resposta, msgErro, true) == false) {
		return false;
	}

	if (tipoContrato.value != '1') {

		if (validarAssinaturaEletronica(assinatura, assinaturaConfirma, msgErro) == false) {
			return false;
		}
	}

	msgErro.value = '';
	return true;
};

function validarFormAtivacaoMaster() {

	var cnpj = document.getElementById("formGeral:userCnpj");

	var cpfTitular = document.getElementById("formGeral:userCpfTitular");
	var cpfUsuario = document.getElementById("formGeral:userCpf");
	var nomeAcesso = document.getElementById("formGeral:nomeAcesso");
	var nomeAcessoConfirma = document
			.getElementById("formGeral:nomeAcessoConfirmacao");
	var senhaAntiga = document.getElementById("formGeral:userPassword");
	var senhaNovaConfirma = document
			.getElementById("formGeral:userPasswordConfirmation");
	var assinaturaConfirma = document
			.getElementById("formGeral:userAssinaturaConfirmacao");
	var pergunta = document.getElementById("formGeral:userQuestion");
	var resposta = document.getElementById("formGeral:userAnswer");
	var senhaNova = document.getElementById("formGeral:userNewPassword");
	var assinatura = document.getElementById("formGeral:userAssinatura");

	var cpfHash = document.getElementById("formGeral:cpfHash");
	var cnpjHash = document.getElementById("formGeral:cnpjHash");
	var senhaAntigaHash = document.getElementById("formGeral:senhaAntigaHash");
	var senhaNovaConfirmaHash = document
			.getElementById("formGeral:senhaNovaConfirmaHash");
	var assinaturaConfirmaHash = document
			.getElementById("formGeral:assinaturaConfirmaHash");
	var perguntaHash = document.getElementById("formGeral:perguntaHash");
	var respostaHash = document.getElementById("formGeral:respostaHash");
	var senhaNovaHash = document.getElementById("formGeral:senhaNovaHash");
	var assinaturaHash = document.getElementById("formGeral:assinaturaHash");

	var msg = document.getElementById("formGeral:msgErroJavaStript");
	msg.value = '';

	var serverPublicKey = document.getElementById("formGeral:chaveServer");
	var usuario = document.getElementById("formGeral:usuario");

	if (validarSenhaAtivacaoMaster(cnpj, cpfTitular, cpfUsuario, nomeAcesso,
			nomeAcessoConfirma, senhaAntiga, senhaNova, senhaNovaConfirma,
			assinatura, assinaturaConfirma, pergunta, resposta, msg)) {
		senhaNovaHash.value = DLECC.encryptHashPassword(senhaNova.value,
				usuario.value.toUpperCase(), serverPublicKey.value);
		perguntaHash.value = DLECC.encryptToApp(pergunta.value,
				serverPublicKey.value);
		respostaHash.value = DLECC.encryptHashPassword(resposta.value,
				usuario.value.toUpperCase(), serverPublicKey.value);
		if (assinatura != null) {
			assinaturaHash.value = DLECC.encryptHashPassword(assinatura.value
					.toUpperCase(), usuario.value.toUpperCase(),
					serverPublicKey.value);
		}
		senhaAntigaHash.value = DLECC.encryptHashPassword(senhaAntiga.value,
				usuario.value.toUpperCase(), serverPublicKey.value);
		senhaNovaConfirmaHash.value = DLECC.encryptHashPassword(
				senhaNovaConfirma.value, usuario.value.toUpperCase(),
				serverPublicKey.value);
		if (assinaturaConfirma != null) {
			assinaturaConfirmaHash.value = DLECC.encryptHashPassword(
					assinaturaConfirma.value, usuario.value.toUpperCase(),
					serverPublicKey.value);
		}
	}

};

function validarSenhaAtivacaoMaster(cnpj, cpfTitular, cpfUsuario, nomeAcesso,
		nomeAcessoConfirma, senhaAntiga, senhaNova, senhaNovaConfirma,
		assinatura, assinaturaConfirma, pergunta, resposta, msg) {
	var showCnpj = document.getElementById("formGeral:showCnpj").value;
	var showNomeAcesso = document.getElementById("formGeral:showNomeAcesso").value;

	if (showCnpj == 'true') {
		document.getElementById("formGeral:showCnpj").value = showCnpj.trim();
		if (cnpj != undefined && cnpj != null) {
			cnpj.value = cnpj.value.trim();
		}
		if (validarCampoCNPJ(cnpj, msg) == false) {
			return false;
		}

	} else {
		if (validarCampoCPFAtivacaoMaster(cpfTitular, msg) == false) {
			return false;
		}
	}

	if (cpfUsuario.value == '') {
		msg.value = "Por favor digite o CPF do usuário responsável.";
		return false;
	} else {
		if (cpfUsuario != undefined && cpfUsuario != null) {
			cpfUsuario.value = cpfUsuario.value.trim();
		}
		if (validarCPF(cpfUsuario.value) == false) {
			msg.value = "Por favor digite um número de CPF válido.";
			return false;
		}
	}

	if (showNomeAcesso == 'true') {
		if (validarNomeAcesso(nomeAcesso, nomeAcessoConfirma, msg) == false) {
			return false;
		}
	}

	if (validarSenha(senhaAntiga, senhaNova, senhaNovaConfirma, msg) == false) {
		return false;
	}

	if (validarPerguntar(pergunta, msg) == false) {
		return false;
	}

	if (validarResposta(resposta, msg, true) == false) {
		return false;
	}
	if (validarAssinaturaEletronica(assinatura, assinaturaConfirma, msg) == false) {
		return false;
	}
	return true;
};

function validarSenhaAtualizarMaster(senhaNova, senhaConfirmacao, msg) {

	if (senhaNova.value == '') {
		msg.value = "Digite a Senha que será utilizada para acessar a conta corrente.";
		return false;
	}

	if (senhaNova.value.length < 6 || senhaNova.value.length > 8) {
		msg.value = "A senha de acesso deve ter de 6 a 8 caracteres alfanuméricos.";
		return false;
	}

	if (!isValidCharInSenha(senhaNova.value)) {
		msg.value = "A senha de acesso deve ser alfanumérica.\nNão são permitidos caracteres especiais.";
		return false;
	}

	if (!VISr(senhaNova.value)) {
		msg.value = "A Senha não foi aceita por ser considerada de fácil identificação.\nProcure diversificar ao máximo a utilização dos caracteres com o fim de torná-la mais segura. Por favor digite novamente.";
		return false;
	}

	if (senhaNova.value != senhaConfirmacao.value) {
		msg.value = "A Senha de acesso e sua Confirmação devem ser iguais.\nPor favor digite novamente.";
		return false;
	}

	msg.value = '';

	return true;
};

function validarCampoCNPJ(cnpj, msg) {
	if (cnpj.value.trim() == '') {
		msg.value = "Informe o CNPJ no formato solicitado.";
		return false;
	} else {
		if (validarCNPJ(cnpj.value) == false) {
			msg.value = "Informe o CNPJ no formato solicitado.";
			return false;
		}
		if (validaCNPJMaster(cnpj) == false) {
			msg.value = "Informe o CNPJ no formato solicitado.";
			return false;
		}
	}
	return true;
};

function validarCampoCPFAtivacaoMaster(cpf, msg) {
	if (cpf.value.trim() == '') {
		msg.value = "Informe o CPF no formato solicitado.";
		return false;
	} else {
		if (validarCPF(cpf.value) == false) {
			msg.value = "Por favor digite um número de CPF válido.";
			return false;
		}
		if (validaCPFMaster(cpf) == false) {
			msg.value = "Por favor digite um número de CPF válido.";
			return false;
		}
	}

	return true;
};

function validarCampoCPF(cpf, msg) {
	if (cpf.value.trim() == '') {
		msg.value = "Informe o CPF no formato solicitado.";
		return false;
	} else {
		if (validarCPF(cpf.value) == false) {
			msg.value = "Informe o CPF no formato solicitado.";
			return false;
		}
	}

	return true;
};

function validarSenha(senhaAtual, senhaNova, senhaConfirmacao, msg) {

	if (senhaAtual.value == '') {
		msg.value = "Por favor, digite a senha atual.";
		return false;
	}

	if (senhaNova.value == senhaAtual.value) {
		msg.value = "A Senha Atual e a Nova Senha devem ser diferentes.\nPor favor digite novamente.";
		senhaAtual.value = '';
		senhaConfirmacao.value = '';
		senhaNova.value = '';
		return false;
	}

	if (senhaNova.value == '') {
		msg.value = "Digite a Senha que será utilizada para acessar a conta corrente.";
		return false;
	}

	if (senhaNova.value.length < 6 || senhaNova.value.length > 8) {
		msg.value = "A senha de acesso deve ter de 6 a 8 caracteres alfanuméricos.";
		return false;
	}

	if (!isValidCharInSenha(senhaNova.value)) {
		msg.value = "A Senha de Acesso deve ser alfanumérica.\nNão são permitidos caracteres especiais.";
		return false;
	}

	if (!VISr(senhaNova.value)) {
		msg.value = "A Senha não foi aceita por ser considerada de fácil identificação.\nProcure diversificar ao máximo a utilização dos caracteres com o fim de torná-la mais segura. Por favor digite novamente.";
		return false;
	}

	if (senhaConfirmacao.value == '') {
		msg.value = "Informe a confirmação da nova Senha.";
		return false;
	}

	if (senhaNova.value != senhaConfirmacao.value) {
		msg.value = "A Senha de acesso e sua Confirmação devem ser iguais.\nPor favor digite novamente.";
		senhaConfirmacao.value = '';
		senhaNova.value = '';

		return false;
	}

	if (senhaConfirmacao.value == '') {
		msg.value = "Informe a confirmação da nova Senha.";
		return false;
	}

	msg.value = '';

	return true;
};

function validarNomeAcesso(nomeAcesso, nomeAcessoConfirma, msg) {
	if (nomeAcesso.value == '') {
		msg.value = "Por favor, informe o Nome de Acesso.";
		return false;
	}
	if (nomeAcesso.value.length < 3) {
		msg.value = "O Nome de Acesso deve ter de 3 a 14 caracteres. Por favor escolha outro nome.";
		return false;
	}
	if (nomeAcesso.value.trim().toUpperCase() === 'MASTER') {
		msg.value = "O nome MASTER não pode ser utilizado. Por favor escolha outro nome.";
		return false;
	}
	if (nomeAcesso.value != nomeAcessoConfirma.value) {
		msg.value = "O Nome de Acesso e sua Confirmação devem ser iguais. Por favor, digite novamente."
		nomeAcesso.value = '';
		nomeAcessoConfirma.value = '';
		return false;
	}
	if (!isValidCharInNomeAcesso(nomeAcesso.value)) {
		msg.value = "Não é permitida a utilização de caracteres especiais para o cadastramento de NOME. Por favor, digite novamente.";
	}
}

function validarPerguntar(pergunta, msg) {
	if (pergunta.value.length < 15) {
		msg.value = "Digite uma frase com pelo menos 15 caracteres para a pergunta.";
		return false;
	}
	if (pergunta.value.length > 60) {
		msg.value = "A Pergunta não pode exceder 60 caracteres."
		return false;
	}
	if (!isValidCharInPergunta(pergunta.value)) {
		msg.value = "Não é permitida a utilização de caracteres especiais para o cadastramento da pergunta. Por favor, digite novamente."
		return false;
	}
	if (!VPR(pergunta.value)) {
		msg.value = "A Pergunta digitada não foi aceita por ser considerada de fácil identificação.\nProcure diversificar ao máximo a utilização dos caracteres com o fim de torná-la mais segura. Por favor, digite novamente.";
		return false;
	}
}

function validarResposta(resposta, msg, cadastro) {
	if (resposta.value.length < 8) {
		msg.value = "Digite uma frase com pelo menos 8 caracteres para a resposta.";
		return false;
	}
	if (resposta.value.length > 60) {
		msg.value = "A resposta não pode exceder 60 caracteres."
		return false;
	}
	if (!isValidCharInPergunta(resposta.value) && cadastro) {
		msg.value = "Não é permitida a utilização de caracteres especiais para o cadastramento da resposta. Por favor, digite novamente."
		return false;
	}
	if (!VPR(resposta.value) && cadastro) {
		msg.value = "A resposta digitada não foi aceita por ser considerada de fácil identificação.\nProcure diversificar ao máximo a utilização dos caracteres com o fim de torná-la mais segura. Por favor digite novamente.";
		return false;
	}
}

function validarAssinaturaEletronica(assinatura, assinaturaConfirma, msg) {
	if (assinatura != null) {
		if (assinatura.value == '') {
			msg.value = "Digite a assinatura eletrônica.";
			return false;
		}

		if ((assinatura.value.length < 6 || assinatura.value.length > 8)) {
			msg.value = "A Assinatura Eletrônica deve conter no mínimo 6 e no máximo 8 caracteres alfanuméricos."
			return false;
		}
	}
	if (assinaturaConfirma != null) {
		if (assinaturaConfirma.value == '') {
			msg.value = "Por favor, informe a confirmação da assinatura eletrônica.";
			return false;
		}
	}
	if (assinatura != null) {
		if (!IsValidAssinatura(assinatura.value)) {
			msg.value = "Assinatura Eletrônica deve ser alfanumérica.\nNão são permitidos caracteres especiais."
			return false;
		}
		if (assinatura.value != assinaturaConfirma.value) {
			msg.value = "A assinatura eletrônica e sua Confirmação devem ser iguais. Por favor, digite novamente.";
			assinatura.value = '';
			assinaturaConfirma.value = '';
			return false;
		}
		if (!VISr(assinatura.value)) {
			msg.value = "A Assinatura não foi aceita por ser considerada de fácil identificação.\nProcure diversificar ao máximo a utilização dos caracteres com o fim de torná-la mais segura. Por favor digite novamente.";
			return false;
		}
		if (!VIA(assinatura.value)) {
			msg.value = "A Assinatura não foi aceita por ser considerada de fácil identificação.\nProcure diversificar ao máximo a utilização dos caracteres com o fim de torná-la mais segura. Por favor digite novamente.";
			return false;
		}
	}

	return true;
};

function confereAssinatura(senhaAtual, msg) {

	if (senhaAtual.value == '') {
		msg.value = "assinatura_vazio";
		return false;
	}

	if ((senhaAtual.value.length < 4) || (senhaAtual.value.length > 8)) {
		msg.value = "assinatura_size";
		return false;
	}

	if (!IsValidAssinatura(senhaAtual.value)) {
		msg.value = "assinatura_esp";
		return false;
	}

	msg.value = '';

	return true;
};

function isValidChar(What, strFormat) {
	var Ok = new Boolean;

	Ok = false;
	for (var j = 0; j <= (What.length - 1); j++) {
		i = 0;
		Ok = false;
		for (var i = 0; i <= strFormat.length; i++) {
			if (What.charAt(j) == strFormat.charAt(i)) {
				Ok = true;
				break;
			}
		}
		if (!Ok) {
			break;
		}
	}
	return Ok;
};

function isValidCharInSenha(What) {
	var strFormat = 'ABCDEFGHIJKLMNOPQRSTUVXYWZabcdefghijklmnopqrstuvxywz0123456789!@#$%¨^~´`&*()_-+={}[]<>:?,.;/|\ÁÉÍÓÚÀÈÌÒÙÂÊÔÃÕÇÑÜáéíóúàèìòùâêôãõçñü';
	return isValidChar(What, strFormat);
};

function isValidCharInNomeAcesso(What) {
	var strFormat = "	'";
	return isValidChar(What, strFormat);
};

function IsValidAssinatura(What, Validation) {
	var strFormat = "0123456789abcdefghijklmnopqrstuvxywzABCDEFGHIJKLMNOPQRSTUVXYWZ";
	return isValidChar(What, strFormat);
}

function isValidCharInPergunta(What) {
	var strFormat = " ABCDEFGHIJKLMNOPQRSTUVXYWZabcdefghijklmnopqrstuvxywz0123456789!?-+=<>,.;ÁáÉéÍíÓóÚúÀàÂâÊÔôÃãÕõÇçÑÜü'";
	return isValidChar(What, strFormat);
};

function VISr(s) {
	var vQ, S, i, a, a1, a2, a3, a4, d = new Array(8);
	a = 'BANESPA';
	S = s.toUpperCase();
	if (S.indexOf(a) != -1)
		return false;
	for (i = 0; i < S.length; i++) {
		d[i] = S.charAt(i);
	}
	for (i = 0; i < S.length - 3; i++) {
		if ((d[i] == d[i + 1]) && (d[i] == d[i + 2]) && (d[i] == d[i + 3])) {
			return false;
		}
	}
	vQ = 0;
	for (i = 0; i < S.length - 1; i++) {
		if (d[i] == d[i + 1]) {
			if (vQ >= 2)
				return false;
			vQ++;
		}
	}
	vQ = 0;
	for (i = 0; i < S.length - 2; i++) {
		a1 = AscExt(d[i]);
		a2 = AscExt(d[i + 1]);
		a3 = AscExt(d[i + 2]);
		a4 = AscExt(d[i + 3]);
		if ((a1 + 1 == a2) && (a1 + 2 == a3) && (a1 + 3 == a4)) {
			return false;
		}
	}
	for (i = 0; i < S.length - 2; i++) {
		a1 = AscExt(d[i]);
		a2 = AscExt(d[i + 1]);
		a3 = AscExt(d[i + 2]);
		a4 = AscExt(d[i + 3]);
		if ((a1 - 1 == a2) && (a1 - 2 == a3) && (a1 - 3 == a4)) {
			return false;
		}
	}
	return true;
};

function VIA(s) {
	var vQ, S, i, a, a1, a2, a3, a4, d = new Array(8);
	a = 'BANESPA';
	S = s.toUpperCase();
	if (S.indexOf(a) != -1)
		return false;
	for (i = 0; i < S.length; i++) {
		d[i] = S.charAt(i);
	}
	for (i = 0; i < S.length - 3; i++) {
		if ((d[i] == d[i + 1]) && (d[i] == d[i + 2]) && (d[i] == d[i + 3])) {
			return false;
		}
	}
	vQ = 0;
	for (i = 0; i < S.length - 1; i++) {
		if (d[i] == d[i + 1]) {
			if (vQ >= 2)
				return false;
			vQ++;
		}
	}
	vQ = 0;
	for (i = 0; i < S.length; i++) {
		if ((d[i] >= "A") && (d[i] <= "Z"))
			vQ++;
	}
	if (vQ < 2)
		return false;
	for (i = 0; i < S.length - 2; i++) {
		a1 = Asc(d[i]);
		a2 = Asc(d[i + 1]);
		a3 = Asc(d[i + 2]);
		a4 = Asc(d[i + 3]);
		if ((a1 + 1 == a2) && (a1 + 2 == a3) && (a1 + 3 == a4)) {
			return false;
		}
	}
	for (i = 0; i < S.length - 2; i++) {
		a1 = Asc(d[i]);
		a2 = Asc(d[i + 1]);
		a3 = Asc(d[i + 2]);
		a4 = Asc(d[i + 3]);
		if ((a1 - 1 == a2) && (a1 - 2 == a3) && (a1 - 3 == a4)) {
			return false;
		}
	}
	return true;
}

function VPR(s) {
	var vQ, i, a, a1, a2, a3, a4, d = new Array(60);

	for (i = 0; i < s.length; i++) {
		d[i] = s.charAt(i);
	}

	for (i = 0; i < s.length - 3; i++) {
		if ((d[i] == d[i + 1]) && (d[i] == d[i + 2]) && (d[i] == d[i + 3])) {
			return false;
		}
	}

	vQ = 0;

	for (i = 0; i < s.length - 2; i++) {
		if ((d[i] == d[i + 1]) && (d[i] == d[i + 2])) {
			vQ++;
			if (vQ >= 3) {
				return false;
			}
		}
	}

	vQ = 0;

	for (i = 0; i < s.length - 2; i++) {
		a1 = Asc(d[i]);
		a2 = Asc(d[i + 1]);
		a3 = Asc(d[i + 2]);
		a4 = Asc(d[i + 3]);
		if ((a1 + 1 == a2) && (a1 + 2 == a3) && (a1 + 3 == a4)) {
			return false;
		}
	}

	for (i = 0; i < s.length - 2; i++) {
		a1 = Asc(d[i]);
		a2 = Asc(d[i + 1]);
		a3 = Asc(d[i + 2]);
		a4 = Asc(d[i + 3]);
		if ((a1 - 1 == a2) && (a1 - 2 == a3) && (a1 - 3 == a4)) {
			return false;
		}
	}

	return true;
}

function AscExt(string) {
	var symbols = ' !\#$%&()*+-./0123456789:;<=>?@';
	var acentua = 'ÁÉÍÓÚÀÈÌÒÙÂÊÔÃÕÇÑÜáéíóúàèìòùâêôãõçñü'
	var loAZ = "abcdefghijklmnopqrstuvwxyz";
	symbols += loAZ.toUpperCase();
	symbols += "[\\]^_`´¨";
	symbols += loAZ;
	symbols += "{|}~";
	symbols += acentua;
	var loc;
	loc = symbols.indexOf(string);
	if (loc > -1) {
		Ascii_Decimal = 32 + loc;
		return (32 + loc);
	}
	return (0);
};

function Asc(string) {
	var symbols = " !\"#$%&'()*+'-./0123456789:;<=>?@";
	var loAZ = "abcdefghijklmnopqrstuvwxyz";
	symbols += loAZ.toUpperCase();
	symbols += "[\\]^_`";
	symbols += loAZ;
	symbols += "{|}~";
	var loc;
	loc = symbols.indexOf(string);
	if (loc > -1) {
		Ascii_Decimal = 32 + loc;
		return (32 + loc);
	}
	return (0);
}

function gerarEncryptHashAssinaturaOuSenhaNova() {
	var tipoSenha = document.getElementById("formGeral:tipoSenha");
	var tipoContrato = document.getElementById("formGeral:tipoConta");
	var msgErro = document.getElementById("formGeral:msgErroJavaStript");
	msgErro.value = '';

	if (tipoSenha !== undefined && tipoSenha !== null
			&& tipoSenha.value !== '0') {
		if (tipoSenha.value == '6') // Assinatura Eletrônica
		{
			gerarEncryptHashAssinaturaNova();
		} else if (tipoSenha.value == '5') // Senha de Acesso
		{
			gerarEncryptHashSenhaNova();
		} else {
			msgErro.value = 'Tipo senha desconhecido.';
		}
	} else {
		if (tipoContrato !== undefined && tipoContrato !== null
				&& tipoContrato.value !== '1') {
			msgErro.value = 'Selecione uma das opções de senha para alteração.';
		} else {
			gerarEncryptHashSenhaNova();
		}
	}

}

function gerarEncryptHashAssinaturaNova() {

	var serverPublicKey = document.getElementById("formGeral:chaveServer");
	var clientPublicKey = document.getElementById("formGeral:chaveClient");

	var usuario = document.getElementById("formGeral:usuario");

	var assinaturaNova = document.getElementById("formGeral:novaAssinatura");
	var assinaturaConfirmacao = document
			.getElementById("formGeral:confirmacaoAssinatura");

	var hashSenhaEletronicaNova = document
			.getElementById("formGeral:hashSenhaEletronicaNova");
	var msgErro = document.getElementById("formGeral:msgErroJavaStript");

	if (assinaturaNova.value === null || assinaturaNova.value === undefined
			|| assinaturaNova.value.trim() === '') {
		msgErro.value = 'Informe a nova assinatura';
	}

	else if (assinaturaConfirmacao.value === null
			|| assinaturaConfirmacao.value === undefined
			|| assinaturaConfirmacao.value.trim() === '') {
		msgErro.value = 'Informe a confirmação da nova assinatura';
	}

	else if (assinaturaNova.value.length < 6 || assinaturaNova.value.length > 8) {
		msgErro.value = "A assinatura eletrônica deve ter de 6 a 8 caracteres alfanuméricos.";
	}

	else if (!isValidCharInSenha(assinaturaNova.value)) {
		msgErro.value = "A assinatura eletrônica deve ser alfanumérica. Não são permitidos caracteres especiais.";
	}

	else if (!VISr(assinaturaNova.value)) {
		msgErro.value = "Sua nova Assinatura não foi aceita por ser considerada de fácil identificação.\n"
				+ "Procure diversificar ao máximo a utilização dos caracteres com o fim de torná-la mais segura. Por favor digite novamente.";
	} else if (!VIA(assinaturaNova.value)) {
		msgErro.value = "Sua nova Assinatura não foi aceita por ser considerada de fácil identificação.\n"
				+ "Procure diversificar ao máximo a utilização dos caracteres com o fim de torná-la mais segura. Por favor digite novamente.";
	}

	else if (assinaturaNova.value != assinaturaConfirmacao.value) {
		msgErro.value = "A confirmação da assinatura não confere com a assinatura informada.";
	}

	else {
		msgErro.value = '';
		hashSenhaEletronicaNova.value = DLECC.encryptHashPassword(
				assinaturaNova.value.toUpperCase(),
				usuario.value.toUpperCase(), serverPublicKey.value);
	}

};

function gerarEncryptHashSenhaNova() {

	var serverPublicKey = document.getElementById("formGeral:chaveServer");
	var hashAcessoNovo = document.getElementById("formGeral:hashAcessoNovo");
	var usuario = document.getElementById("formGeral:usuario");
	var msgErro = document.getElementById("formGeral:msgErroJavaStript");

	var senhaAcessoNova = document.getElementById("formGeral:senhaAcessoNova");
	var senhaAcessoConfirmacao = document
			.getElementById("formGeral:senhaAcessoConfirmacao");

	var resposta = document.getElementById("formGeral:txtResposta");
	var hashResposta = document.getElementById("formGeral:hashResposta");
	if (resposta != null) {
		if (resposta.value != "") {
			hashResposta.value = DLECC.encryptHashPassword(resposta.value,
					usuario.value.toUpperCase(), serverPublicKey.value);
		} else {
			msgErro.value = "Digite uma frase com pelo menos 8 caracteres para a resposta";
		}
	}

	if (senhaAcessoNova.value === null || senhaAcessoNova.value === undefined
			|| senhaAcessoNova.value === '') {
		msgErro.value = 'Informe a nova senha';
	}

	else if (senhaAcessoConfirmacao.value === null
			|| senhaAcessoConfirmacao.value === undefined
			|| senhaAcessoConfirmacao.value === '') {
		msgErro.value = 'Informe a confirmação da nova senha.';
	}

	else if (senhaAcessoNova.value.length < 6
			|| senhaAcessoNova.value.length > 8) {
		msgErro.value = "A senha de acesso deve ter de 6 a 8 caracteres alfanuméricos.";
	}

	else if (!isValidCharInSenha(senhaAcessoNova.value)) {
		msgErro.value = "A senha de acesso deve ser alfanumérica. Não são permitidos caracteres especiais.";
	}

	else if (!VISr(senhaAcessoNova.value)) {
		msgErro.value = "A Senha não foi aceita por ser considerada de fácil identificação.\nProcure diversificar ao máximo a utilização dos caracteres com o fim de torná-la mais segura. Por favor digite novamente.";
	}

	else if (senhaAcessoNova.value != senhaAcessoConfirmacao.value) {
		msgErro.value = "A confirmação da senha não confere com a senha informada.";
	}

	else {
		msgErro.value = '';
		hashAcessoNovo.value = DLECC.encryptHashPassword(senhaAcessoNova.value,
				usuario.value.toUpperCase(), serverPublicKey.value);
	}
}

function encryptUsuarioMasterFinalizaContratoDL() {

	var serverPublicKey = document.getElementById("formGeral:chaveServer");
	var clientPublicKey = document.getElementById("formGeral:chaveClient");

	var nomeAcesso = document.getElementById("formGeral:nomeAcesso");
	var senhaAcessoNova = document.getElementById("formGeral:senhaAcessoNova");
	var senhaAcessoConfirmacao = document
			.getElementById("formGeral:senhaAcessoConfirmacao");

	var hashAcessoNovo = document.getElementById("formGeral:hashAcessoNovo");

	var msgErro = document.getElementById("formGeral:msgErroJavaStript");
	msgErro.value = '';

	if (nomeAcesso.value === null || nomeAcesso.value === ''
			|| nomeAcesso.value === undefined) {
		msgErro.value = "Por favor, informe o nome de acesso.";

	} else if (nomeAcesso.value.length < 3 || nomeAcesso.value.length > 14) {
		msgErro.value = "O Nome de Acesso deve ter de 3 a 14 caracteres. Por favor escolha outro nome.";

	} else if (nomeAcesso.value === 'MASTER') {
		msgErro.value = "O nome MASTER não pode ser utilizado. Por favor escolha outro nome.";

	} else if (!IsValidAssinatura(nomeAcesso.value)) {
		msgErro.value = "Não é permitida a utilização de caracteres especiais para o cadastramento de NOME. Por favor, digite novamente.";

	} else if (senhaAcessoNova.value === null
			|| senhaAcessoNova.value === undefined
			|| senhaAcessoNova.value === '') {
		msgErro.value = 'Por favor, informe a senha de acesso.';

	}

	else if (senhaAcessoNova.value.length < 6
			|| senhaAcessoNova.value.length > 8) {
		msgErro.value = "A senha de acesso deve ter de 6 a 8 caracteres alfanuméricos.";
	}

	else if (!isValidCharInSenha(senhaAcessoNova.value)) {
		msgErro.value = "A senha de acesso deve ser alfanumérica. Não são permitidos caracteres especiais.";
	}

	else if (!VISr(senhaAcessoNova.value)) {
		msgErro.value = "A Senha não foi aceita por ser considerada de fácil identificação.\nProcure diversificar ao máximo a utilização dos caracteres com o fim de torná-la mais segura. Por favor digite novamente.";
	}

	else if (senhaAcessoConfirmacao.value === null
			|| senhaAcessoConfirmacao.value === undefined
			|| senhaAcessoConfirmacao.value === '') {
		msgErro.value = 'Informe a confirmação da nova senha.';
	}

	else if (senhaAcessoNova.value != senhaAcessoConfirmacao.value) {
		msgErro.value = "A confirmação da senha não confere com a senha informada.";

	} else {
		hashAcessoNovo.value = DLECC.encryptHashPassword(senhaAcessoNova.value,
				nomeAcesso.value.toUpperCase(), serverPublicKey.value);
		senhaAcessoNova.value = '';
		senhaAcessoConfirmacao.value = '';
	}
}

function encryptNomeAcessoPasswordDL() {

	var serverPublicKey = document.getElementById("formGeral:chaveServer");
	var clientPublicKey = document.getElementById("formGeral:chaveClient");

	var usuario = document.getElementById("formGeral:nomeAcesso");
	var nomeAcesso = document.getElementById("formGeral:nomeAcesso");
	var senhaAcessoNova = document.getElementById("formGeral:senhaAcessoNova");
	var senhaAcessoConfirmacao = document
			.getElementById("formGeral:senhaAcessoConfirmacao");
	var msgErro = document.getElementById("formGeral:msgErroJavaStript");
	var hashAcessoNovo = document.getElementById("formGeral:hashAcessoNovo");

	msgErro.value = '';

	if (senhaAcessoNova.value === null || senhaAcessoNova.value === undefined
			|| senhaAcessoNova.value === '') {
		msgErro.value = 'Por favor, informe a senha de acesso.';
	}

	else if (senhaAcessoConfirmacao.value === null
			|| senhaAcessoConfirmacao.value === undefined
			|| senhaAcessoConfirmacao.value === '') {
		msgErro.value = 'Informe a confirmação da nova senha';
	}

	else if (senhaAcessoNova.value.length < 6
			|| senhaAcessoNova.value.length > 8) {
		msgErro.value = "A senha de acesso deve ter de 6 a 8 caracteres alfanuméricos.";
	}

	else if (!isValidCharInSenha(senhaAcessoNova.value)) {
		msgErro.value = "A senha de acesso deve ser alfanumérica. Não são permitidos caracteres especiais.";
	}

	else if (!VISr(senhaAcessoNova.value)) {
		msgErro.value = "A Senha não foi aceita por ser considerada de fácil identificação.\nProcure diversificar ao máximo a utilização dos caracteres com o fim de torná-la mais segura. Por favor digite novamente.";
	}

	else if (senhaAcessoNova.value != senhaAcessoConfirmacao.value) {
		msgErro.value = "A confirmação da senha não confere com a senha informada.";

	} else if (nomeAcesso.value === null || nomeAcesso.value === ''
			|| nomeAcesso.value === undefined) {
		msgErro.value = "Por favor, informe o nome de acesso.";

	} else if (nomeAcesso.value.length < 3 || nomeAcesso.value.length > 14) {
		msgErro.value = "O Nome de Acesso deve ter de 3 a 14 caracteres. Por favor escolha outro nome.";
	} else if (nomeAcesso.value.trim().toUpperCase() === 'MASTER') {
		msgErro.value = "O nome MASTER não pode ser utilizado. Por favor escolha outro nome.";
	} else if (!IsValidAssinatura(nomeAcesso.value)) {
		msgErro.value = "Não é permitida a utilização de caracteres especiais para o cadastramento de NOME. Por favor, digite novamente.";
	} else {
		hashAcessoNovo.value = DLECC.encryptHashPassword(senhaAcessoNova.value,
				usuario.value.toUpperCase(), serverPublicKey.value);
		senhaAcessoNova.value = '';
		senhaAcessoConfirmacao.value = '';
	}

	function validaCNPJ() {

		if (!checkFormat(document.frmAssinatura.txtCampo1.value,
				'99.999.999/9999-99')) {
			if (!checkFormat(document.frmAssinatura.txtCampo1.value,
					'99999999999999')) {
				alert('Informe o CNPJ no formato solicitado.');
				document.frmAssinatura.txtCampo1.focus();
				return false;
			}
		} else if (!checkFormat(document.frmAssinatura.txtCampo1.value,
				'999.999.999-99')) {
			if (!checkFormat(document.frmAssinatura.txtCampo1.value,
					'99999999999')) {
				alert('Informe o CPF no formato solicitado.');
				document.frmAssinatura.txtCampo1.focus();
				return false;
			}
		}
		document.frmAssinatura.txtCNPJ.value = stripCharsNotInBag(
				document.frmAssinatura.txtCampo1.value, digits);
		return true;
	}

};

function validaCNPJMaster(documento) {

	var digits = '0123456789';

	if (!checkFormat(documento.value, '99.999.999/9999-99')) {
		if (!checkFormat(documento.value, '99999999999999')) {
			return false;
		}
	}

	stripCharsNotInBag(documento.value, digits);
	return true;
};

function validaCPFMaster(documento) {

	var digits = '0123456789';

	if (!checkFormat(documento.value, '999.999.999-99')) {
		if (!checkFormat(documento.value, '99999999999')) {
			return false;
		}
	}

	stripCharsNotInBag(documento.value, digits);
	return true;
};

function stripCharsNotInBag(s, bag) {
	var i;
	var returnString = "";

	for (i = 0; i < s.length; i++) {
		var c = s.charAt(i);
		if (bag.indexOf(c) != -1)
			returnString += c;
	}

	return returnString;
};

function checkFormat(strValor, strFormat) {
	var isOk = true;

	isOk = (strValor.length == strFormat.length);

	if (isOk) {
		for (var i = 0; i < strFormat.length && isOk; i++) {
			switch (strFormat.charAt(i)) {
			case '9':
				isOk = isDigit(strValor.charAt(i));
				break;

			case 'A':
				isOk = isLetter(strValor.charAt(1));
				break;

			case '#':
				isOk = (isDigit(strValor.charAt(i)) || isLetter(strValor
						.charAt(i)));
				break;

			default:
				isOk = (strValor.charAt(i) == strFormat.charAt(i));
				break;
			}
		}
	}
	return isOk;
}

function isDigit(c) {
	return ((c >= "0") && (c <= "9"))
}

function isLetter(c) {
	return (((c >= "a") && (c <= "z")) || ((c >= "A") && (c <= "Z")))
}

function encryptNomeAcessoAssinaturaPasswordDL() {

	var serverPublicKey = document.getElementById("formGeral:chaveServer");
	var clientPublicKey = document.getElementById("formGeral:chaveClient");

	var nomeAcesso = document.getElementById("formGeral:nomeAcesso");
	var senhaAcessoNova = document.getElementById("formGeral:senhaAcesso");
	var senhaAcessoConfirmacao = document
			.getElementById("formGeral:senhaAcessoConfirmacao");
	var hashSenhaAcesso = document.getElementById("formGeral:senhaNovaHash");

	var assinaturaNova = document.getElementById("formGeral:novaAssinatura");

	var assinaturaConfirmacao = document
			.getElementById("formGeral:confirmacaoAssinatura");
	var assinaturaHash = document.getElementById("formGeral:assinaturaHash");

	var msgErro = document.getElementById("formGeral:msgErroJavaStript");
	msgErro.value = '';

	if (senhaAcessoNova.value === null || senhaAcessoNova.value === undefined
			|| senhaAcessoNova.value === '') {
		msgErro.value = "Preencha o campo 'Senha de Acesso'.";
	}

	else if (senhaAcessoNova.value.length < 6
			|| senhaAcessoNova.value.length > 8) {
		msgErro.value = "A senha de acesso deve ter de 6 a 8 caracteres alfanuméricos.";
	}

	else if (senhaAcessoConfirmacao.value === null
			|| senhaAcessoConfirmacao.value === undefined
			|| senhaAcessoConfirmacao.value === '') {
		msgErro.value = "Preencha o campo 'Confirmação de Senha de Acesso'";
	}

	else if (senhaAcessoNova.value != senhaAcessoConfirmacao.value) {
		msgErro.value = 'A Senha de Acesso e sua Confirmação devem ser iguais.\nPor favor digite novamente.';
	}

	else if (!isValidCharInSenha(senhaAcessoNova.value)) {
		msgErro.value = "A Senha de Acesso deve ser alfanumérica. Não são permitidos caracteres especiais.";
	}

	else if (!VISr(senhaAcessoNova.value)) {
		msgErro.value = "A Senha de Acesso não foi aceita por ser considerada de fácil identificação.\nProcure diversificar ao máximo a utilização dos caracteres com o fim de torná-la mais segura. Por favor, digite novamente.";
	} else if (senhaAcessoNova.value != senhaAcessoConfirmacao.value) {
		msgErro.value = "A confirmação da senha não confere com a senha informada.";

	} else if (nomeAcesso.value === null || nomeAcesso.value === ''
			|| nomeAcesso.value === undefined) {
		msgErro.value = "Por favor, informe o nome de acesso.";

	} else if (nomeAcesso.value.length < 3 || nomeAcesso.value.length > 14) {
		msgErro.value = "O Nome de Acesso deve ter de 3 a 14 caracteres. Por favor escolha outro nome.";
	} else if (nomeAcesso.value.trim().toUpperCase() === 'MASTER') {
		msgErro.value = "O nome MASTER não pode ser utilizado. Por favor escolha outro nome.";
	} else if (!IsValidAssinatura(nomeAcesso.value)) {
		msgErro.value = "Não é permitida a utilização de caracteres especiais para o cadastramento de NOME. Por favor, digite novamente.";
	} else if (assinaturaNova != null) {
		if (!VISr(assinaturaNova.value)) {
			msgErro.value = "A Assinatura Eletrônica não foi aceita por ser considerada de fácil identificação.\nProcure diversificar ao máximo a utilização dos caracteres com o fim de torná-la mais segura. Por favor, digite novamente.";
		}

		else if (assinaturaNova.value === null
				|| assinaturaNova.value === undefined
				|| assinaturaNova.value.trim() === '') {
			msgErro.value = "Preecha o campo 'Assinatura Eletrônica'.";
		}

		else if (assinaturaConfirmacao.value === null
				|| assinaturaConfirmacao.value === undefined
				|| assinaturaConfirmacao.value.trim() === '') {
			msgErro.value = "Preencha o campo Confirmação de 'Assinatura Eletrônica'.";
		}

		else if (assinaturaNova.value.length < 6
				|| assinaturaNova.value.length > 8) {
			msgErro.value = "A assinatura eletrônica deve ter de 6 a 8 caracteres alfanuméricos.";
		}

		else if (!isValidCharInSenha(assinaturaNova.value)) {
			msgErro.value = "A assinatura eletrônica deve ser alfanumérica. Não são permitidos caracteres especiais.";
		}

		else if (!VISr(assinaturaNova.value)) {
			msgErro.value = "Sua nova Assinatura não foi aceita por ser considerada de fácil identificação.\n"
					+ "Procure diversificar ao máximo a utilização dos caracteres com o fim de torná-la mais segura. Por favor digite novamente.";
		} else if (!VIA(assinaturaNova.value)) {
			msgErro.value = "Sua nova Assinatura não foi aceita por ser considerada de fácil identificação.\n"
					+ "Procure diversificar ao máximo a utilização dos caracteres com o fim de torná-la mais segura. Por favor digite novamente.";
		}

		else if (assinaturaNova.value != assinaturaConfirmacao.value) {
			msgErro.value = "A confirmação da assinatura não confere com a assinatura informada.";
		}

	}
	if (senhaAcessoNova != null && senhaAcessoNova.value != '') {
		hashSenhaAcesso.value = DLECC.encryptHashPassword(
				senhaAcessoNova.value, nomeAcesso.value.toUpperCase(),
				serverPublicKey.value);
	}
	if (assinaturaNova != null && assinaturaNova.value != '') {
		assinaturaHash.value = DLECC.encryptHashPassword(assinaturaNova.value
				.toUpperCase(), nomeAcesso.value.toUpperCase(),
				serverPublicKey.value);
	}

	senhaAcessoNova.value = ''
	senhaAcessoConfirmacao.value = ''
	assinaturaNova.value = ''
	assinaturaConfirmacao.value = ''
};

function encryptDadosTokenAtivar() {
	var serverPublicKey = document.getElementById("formGeral:chaveServer");
	var clientPublicKey = document.getElementById("formGeral:chaveClient");

	var senhaGeradaToken = document
			.getElementById("formGeral:senhaGeradaToken");
	var numeroSerieToken = document
			.getElementById("formGeral:numeroSerieToken");

	var hashSenha = document.getElementById("formGeral:hashSenha");
	var hashNumeroSerie = document.getElementById("formGeral:hashNumeroSerie");

	hashSenha.value = DLECC.encryptToApp(senhaGeradaToken.value,
			serverPublicKey.value);
	hashNumeroSerie.value = DLECC.encryptToApp(numeroSerieToken.value,
			serverPublicKey.value);

	senhaGeradaToken.value = '';
	numeroSerieToken.value = '';
}

function validarCNPJ(CGC) {
	with (Math) {
		w = 0;
		Resp1 = "";
		Resp2 = "";
		CGCFinal = "";
		VtCGC = new CriaArray(CGC.length);
		for (var i = 0; i < CGC.length; i++) {
			if ((CGC.charAt(i) == "0") || (CGC.charAt(i) == "1")
					|| (CGC.charAt(i) == "2") || (CGC.charAt(i) == "3")
					|| (CGC.charAt(i) == "4") || (CGC.charAt(i) == "5")
					|| (CGC.charAt(i) == "6") || (CGC.charAt(i) == "7")
					|| (CGC.charAt(i) == "8") || (CGC.charAt(i) == "9")) {
				VtCGC[w] = parseFloat(CGC.charAt(i));
				w++;
				CGCFinal = CGCFinal + parseFloat(CGC.charAt(i));
			}
		}
		Soma1 = (VtCGC[0] * 5) + (VtCGC[1] * 4) + (VtCGC[2] * 3)
				+ (VtCGC[3] * 2) + (VtCGC[4] * 9) + (VtCGC[5] * 8)
				+ (VtCGC[6] * 7) + (VtCGC[7] * 6) + (VtCGC[8] * 5)
				+ (VtCGC[9] * 4) + (VtCGC[10] * 3) + (VtCGC[11] * 2) + 0.0001;
		Divisao1 = Soma1 / 11;
		RestoParc1 = (Divisao1 - floor(Divisao1)) * 11;
		Resto1 = floor(RestoParc1);

		Soma2 = (VtCGC[0] * 6) + (VtCGC[1] * 5) + (VtCGC[2] * 4)
				+ (VtCGC[3] * 3) + (VtCGC[4] * 2) + (VtCGC[5] * 9)
				+ (VtCGC[6] * 8) + (VtCGC[7] * 7) + (VtCGC[8] * 6)
				+ (VtCGC[9] * 5) + (VtCGC[10] * 4) + (VtCGC[11] * 3)
				+ (VtCGC[12] * 2) + 0.0001;
		Divisao2 = Soma2 / 11;
		RestoParc2 = (Divisao2 - floor(Divisao2)) * 11;
		Resto2 = floor(RestoParc2);

		if (((Resto1 == 0) || (Resto1 == 1)) && (VtCGC[12] == 0)) {
			Resp1 = "V";
		} else {
			Digito1 = 11 - Resto1;
			if ((Digito1 == VtCGC[12]) && (Resto1 > 1)) {
				Resp1 = "V";
			}
		}

		if (((Resto2 == 0) || (Resto2 == 1)) && (VtCGC[13] == 0)) {
			Resp2 = "V";
		} else {
			Digito2 = 11 - Resto2;
			if ((Digito2 == VtCGC[13]) && (Resto2 > 1)) {
				Resp2 = "V";
			}
		}

		if ((Resp1 == "V") && (Resp2 == "V")) {
			return true;
		} else {
			return false;
		}
	}
}

function CriaArray(n) {
	this.length = n
	for (var i = 1; i <= n; i++) {
		this[i] = ""
	}
}

function formataCPF(numCpf) {

	var exp = /\.|\-|\D/g;
	var cpf;
	var aux;
	var cpfFim = "";
	var novoCpf = new Array(13)
	var auxCpf = new Array(11)
	var i = 0
	var c = 0
	cpf = numCpf.replace(exp, "");

	if (cpf.length == 11) {
		for (i = 0; i < 11; i++) {
			auxCpf[i] = cpf.substring(i, i + 1);
			novoCpf[i] = auxCpf[i]
		}

		for (i = 0; i <= 13; i++) {
			if (i > 4) {
				novoCpf[i] = auxCpf[c];
			}
			if (i == 3 || i == 7 || i == 11) {
				aux = novoCpf[i];
				if (i == 11) {
					novoCpf[i] = '-';
				} else {
					novoCpf[i] = '.';
				}
				novoCpf[i + 1] = aux;
				c--;
			}
			cpfFim = cpfFim + novoCpf[i];
			c++;
		}
		return cpfFim;
	} else {
		return "0000000000000"
	}
}

function validarCPF(numCpf) {

	var objCpf = new Object();
	var cpfdig = 0;
	var cpfInteiro = 0;
	var exp = /\.|\-/g;

	objCpf = formataCPF(numCpf);

	if (objCpf.substring(11, 12) == '-') {
		cpf = objCpf.replace(exp, "");
	} else {
		return false;
	}

	if (cpf.length < 11 || cpf.length > 11) {
		return false;
	}
	cpfdig = cpf.substring(0, 9) + CalculoCpf(cpf, 9);
	cpfInteiro = cpfdig + CalculoCpf(cpfdig, 10);

	for (var i = 0; i < 10; i++) {
		var c = i.toString();
		if (cpfInteiro == (c + c + c + c + c + c + c + c + c + c + c)) {
			return false;
		}
	}
	if (cpfInteiro == cpf) {
		return true;
	}

	return false;
}

function CalculoCpf(valCpf, dig) {

	var cpf = new Array(10);
	var soma = 0;
	var resto = 0;

	for (var i = 0; i < dig; i++) {
		cpf[i] = valCpf.substring(i, i + 1);
		soma += parseInt(cpf[i]) * ((dig + 1) - i);
	}
	resto = soma % 11;

	if (resto < 2) {
		dig = 0;
	} else {
		dig = 11 - resto;
	}
	return dig;
};