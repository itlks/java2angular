var BarCode = (function() {
	var options = {
		context : 'body',
		selector : '.barcode',
		onChange : null
	};

	function load(options) {
		$(options.selector, options.context)
				.each(
						function() {
							var _this = $(this);
							if (_this.hasClass('initialized')) {
								return;
							}
							_this.addClass('initialized');

							var $this = $(this);
							var errorModal = null;
							/*
							 * var divMsg = $(this).next(options.barcodeMsg); if
							 * (!divMsg) { console.error('No \"' +
							 * options.barcodeMsg + '\" found.'); return; }
							 */

							var objBarra = $(this);

							function clean() {
								var divMsg = $('#msgErrorBarCode');
								divMsg.html('');
								_this.removeClass('barcode-error');
							}

							function processBarcode() {
								clean();

								var barra = objBarra.val().replace(/\D/g, "")
										.substring(
												0,
												(/^8/.test(objBarra.val()) ? 48
														: 47));

								// Se for Concessionarias/Tributos (Primeiro
								// caracter igual a oito)
								if (/^8/.test(barra)) {
									// mascara para o boleto Concessionaria
									objBarra
											.val(barra
													.replace(
															/(\d{0,12})(\d{0,12})(\d{0,12})(\d{0,12})/gi,
															"$1.$2.$3.$4")
													.replace(/\.*$/, "")
													.substring(0, 51));

									var moeda = barra.substring(2, 3);

									if (barra.length >= 12) {
										if (!ValidarBlocoArrecadacoesACI(barra
												.substring(0, 12), moeda)) {

											var val = objBarra.val().substring(
													0, 12);
											var mensagem = "Confira a digitação do bloco: " + val;
											exibirMensagemValidacao(mensagem);
											return false;
										}
									}
									if (barra.length >= 24) {
										if (!ValidarBlocoArrecadacoesACI(barra
												.substring(12, 24), moeda)) {

											var val = objBarra.val().substring(
													13, 25);
											var mensagem = "Confira a digitação do bloco: " + val;
											exibirMensagemValidacao(mensagem);
											return false;
										}
									}
									if (barra.length >= 36) {
										if (!ValidarBlocoArrecadacoesACI(barra
												.substring(24, 36), moeda)) {

											var val = objBarra.val().substring(
													26, 38);
											var mensagem = "Confira a digitação do bloco: " + val;
											exibirMensagemValidacao(mensagem);
											return false;
										}

									}
									if (barra.length == 48) {
										if (!ValidarBlocoArrecadacoesACI(barra
												.substring(36, 48), moeda)) {

											var mensagem = "Boleto inválido";
											exibirMensagemValidacao(mensagem);
											return false;
										} else {
											return true;
										}
									}
								} else {
									objBarra
											.val(barra
													.replace(
															/(\d{0,5})(\d{0,5})(\d{0,5})(\d{0,6})(\d{0,5})(\d{0,6})(\d{0,1})(\d{0,})/gi,
															"$1.$2.$3.$4.$5.$6.$7.$8")
													.replace(/\.*$/, "")
													.substring(0, 54));

									if (barra.length >= 10) {
										if (!validarModuloDezBoletoACI(barra
												.substring(0, 10))) {

											var val = objBarra.val().substring(
													0, 11);
											var mensagem = "Confira a digitação do bloco: " + val;
											exibirMensagemValidacao(mensagem);
											return false;
										}
									}
									if (barra.length >= 21) {
										if (!validarModuloDezBoletoACI(barra
												.substring(10, 21))) {

											var val = objBarra.val().substring(
													12, 24);
											var mensagem = "Confira a digitação do bloco: " + val;
											exibirMensagemValidacao(mensagem);
											return false;
										}
									}
									if (barra.length >= 32) {
										if (!validarModuloDezBoletoACI(barra
												.substring(21, 32))) {

											var val = objBarra.val().substring(
													25, 37);
											var mensagem = "Confira a digitação do bloco: " + val;
											exibirMensagemValidacao(mensagem);
											return false;
										}
									}
									if (barra.length == 47) {
										if (!validarModuloOnzeBoletoACI(objBarra)) {

											var mensagem = "Boleto inválido";
											exibirMensagemValidacao(mensagem);
											return false;
										} else {
											return true;
										}
									}
								}

								return true;
							}

							/* function Validação Boleto */
							function ValidarBlocoArrecadacoesACI(bloco, moeda) {
								if (moeda == 6 || moeda == 7) {
									if (validarModuloDezArrecadacoesACI(bloco) == false)
										return false;
									else
										return true;
								} else if (moeda == 8 || moeda == 9) {
									if (validarModuloOnzeArrecadacoesACI(bloco) == false)
										return false;
									else
										return true;
								}
							}

							function validarModuloDezArrecadacoesACI(bloco) {
								var digito = bloco.charAt(bloco.length - 1);
								var nProduto;
								var nSoma = 0;

								j = 2;
								for (i = bloco.length - 2; i > -1; i--) {
									nProduto = parseInt(bloco.charAt(i)) * j;

									if (nProduto.toString().length == 1) {
										nSoma = (nSoma + nProduto);
									} else {
										nSoma = (nProduto % 10) + 1 + nSoma;
									}

									if (j == 2)
										j = 1;
									else
										j = 2;
								}

								resto = (nSoma % 10);

								if (resto != 0) {
									resto = (10 - resto);
								}

								if (resto == digito)
									return true;
								else
									return false;
							}

							function validarModuloOnzeArrecadacoesACI(bloco) {
								var digito = bloco.charAt(bloco.length - 1);
								var nSoma = 0;
								var nProduto;
								j = 2;
								for (i = bloco.length - 2; i > -1; i--) {
									nProduto = parseInt(bloco.charAt(i)) * j;
									nSoma = nSoma + nProduto;

									if (++j == 10)
										j = 2;
								}

								resto = (nSoma % 11);

								if (resto <= 1)
									resto = 0;
								else
									resto = (11 - resto);

								if (resto == digito)
									return true;
								else
									return false;
							}

							function validarModuloDezBoletoACI(bloco) {
								var NumeroCaracteres;
								var digito = 0;
								var num = 0;
								var nSoma = 0;
								var resultado = 0;
								var strIPTE = parseInt(bloco, 10);

								NumeroCaracteres = parseInt((bloco.length - 1),
										10);
								digito = parseInt(bloco
										.charAt(bloco.length - 1), 10);

								if (NumeroCaracteres % 2) {
									for (var i = 0; i < NumeroCaracteres; i = i + 2) {
										num = (parseInt(bloco.charAt(i), 10));
										num = (num * 2);
										if (num < 10) {
											nSoma = nSoma + num;
										} else {
											nSoma = (num % 10) + 1 + nSoma;
										}
									}
									for (var x = 1; x < NumeroCaracteres; x = x + 2) {
										nSoma = (nSoma + parseInt(bloco
												.charAt(x), 10));
									}
								} else {
									for (var i = 1; i < NumeroCaracteres; i = i + 2) {
										num = (parseInt(bloco.charAt(i), 10));
										num = (num * 2);
										if (num < 10)
											nSoma = (nSoma + num);
										else {
											nSoma = (num % 10) + 1 + nSoma;
										}
									}
									for (var x = 0; x < NumeroCaracteres; x = x + 2) {
										nSoma = (nSoma + parseInt(bloco
												.charAt(x), 10));
									}
								}

								resultado = (10 - ((parseInt(nSoma, 10) % 10)));
								if (resultado == 10) {
									resultado = 0;
								}
								if (resultado == digito) {
									return true;
								} else {
									return false;
								}
							}

							function validarModuloOnzeBoletoACI(that) {
								var objBarra = $(that);
								var barra = objBarra.val().replace(/\D/g, "");

								var j = 0;
								var i = 0;
								var r = 0;
								var nSuperDigito = barra.substring(32, 33);

								var strIPTE1 = barra.substring(0, 5);
								var strIPTE2 = barra.substring(5, 10);
								var strIPTE3 = barra.substring(10, 15);
								var strIPTE4 = barra.substring(15, 21);
								var strIPTE5 = barra.substring(21, 26);
								var strIPTE6 = barra.substring(26, 32);
								var strIPTE8 = barra.substring(33, 47);

								var strCdBarra = "";
								var nSoma = 0;

								strIPTETemp1 = strIPTE1.substring(0, 4);
								strIPTETemp2 = strIPTE2.substring(0, 4);
								strIPTETemp3 = strIPTE3
										+ strIPTE4.substring(0, 5);
								strIPTETemp4 = strIPTE5
										+ strIPTE6.substring(0, 5);
								strIPTETemp5 = strIPTE8
										+ strIPTE1.substring(4, 5);

								strCdBarra = strIPTETemp1 + strIPTETemp5
										+ strIPTETemp2 + strIPTETemp3
										+ strIPTETemp4;

								j = 2;
								for (i = strCdBarra.length - 1; i > -1; i--) {
									nSoma = nSoma
											+ (parseInt(strCdBarra.charAt(i)) * j);
									if (++j == 10) {
										j = 2;
									}
								}

								r = (nSoma % 11);
								if (r <= 1) {
									nSuperDigitoCalculado = 1;
								} else {
									nSuperDigitoCalculado = (11 - r);
								}

								if (nSuperDigito != nSuperDigitoCalculado) {

									if (strIPTE8.trim() == "") {

										if (nSuperDigito != "0") {
											return true;
										} else {
											return false;
										}
									} else {
										return false;
									}
								} else {
									return true;
								}
							}

							function exibirMensagemValidacao(mensagem) {
								var divMsg = $('#msgErrorBarCode');
								divMsg.html('<p>' + mensagem + '<p>');
								//_this.addClass('barcode-error');
							}

							function fireOnchage() {
								var barcode = objBarra.val();

								var valida = false;
								if (barcode.substring(0, 1) == "8"
										&& barcode.length === 51) {
									valida = true;
								} else if (barcode.length === 54
										|| barcode.length === 55) {
									valida = true;
								}

								if (valida && options.onChange) {
									options.onChange(barcode);
								}
							}

							/*
							 * $this.on('paste', function(e) { var $this =
							 * $(this); function fn() { if (processBarcode()) {
							 * fireOnchage(); }
							 * 
							 * $this.unbind('keyup', fn); }
							 * 
							 * $this.bind('keyup', fn); });
							 */

							$this.keyup(function(event) {
								clean();

								if (processBarcode()) {
									fireOnchage();
								}
							});

							/*
							 * $this.keypress(function(event) { var key =
							 * window.event ? event.keyCode : event.which; if
							 * (event.keyCode == 8 || event.keyCode == 46 ||
							 * event.keyCode == 37 || event.keyCode == 39) {
							 * return true; } else if (key < 48 || key > 57) {
							 * return false; } });
							 */

							if ($this.val()) {
								processBarcode();
							}
						});
	}

	return {
		init : function(opt) {
			opt = $.extend(options, opt);
			load(opt);
		}
	};
})();