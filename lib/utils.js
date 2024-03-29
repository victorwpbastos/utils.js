/*
*	Utils.js
*	Version: 0.0.1
*	Author: Victor Bastos
*	Repo: http://github.com/victorwpbastos/utils
*/

(function(global) {

	var Utils = {};

	/*
	*	Função para validação de CPF
	*	Params: String cpf
	*	Retorno: true | false
	*/

	Utils.validaCPF = function(cpf) {
		var Resto,
			Soma = 0;

		cpf = cpf.replace(/\D/gi, '');

		if(cpf === '' || cpf.length !== 11) {
			return false;
		}

		if(
			cpf === "00000000000" ||
			cpf === "11111111111" ||
			cpf === "22222222222" ||
			cpf === "33333333333" ||
			cpf === "44444444444" ||
			cpf === "55555555555" ||
			cpf === "66666666666" ||
			cpf === "77777777777" ||
			cpf === "88888888888" ||
			cpf === "99999999999"
			) {
			return false;
		}

		for(i=1; i<=9; i++) {
			Soma = Soma + parseInt(cpf.substring(i-1, i), 10) * (11 - i);
		}

		Resto = (Soma * 10) % 11;

		if((Resto === 10) || (Resto === 11)) {
			Resto = 0;
		}
		if(Resto !== parseInt(cpf.substring(9, 10), 10) ) {
			return false;
		}

		Soma = 0;

		for(i = 1; i <= 10; i++) {
			Soma = Soma + parseInt(cpf.substring(i-1, i), 10) * (12 - i);
		}

		Resto = (Soma * 10) % 11;

		if((Resto === 10) || (Resto === 11)) {
			Resto = 0;
		}

		if(Resto !== parseInt(cpf.substring(10, 11), 10) ) {
			return false;
		}

		return true;
	};

	/*
	*	Função para validação de CNPJ
	*	Params: String cnpj
	*	Retorno: true | false
	*/

	Utils.validaCNPJ = function(cnpj) {
		var tamanho,
			numeros,
			digitos,
			soma,
			pos,
			resultado;

		cnpj = cnpj.replace(/\D/gi,'');

		if(cnpj === '' || cnpj.length !== 14) {
			return false;
		}

		if(
			cnpj == "00000000000000" ||
			cnpj == "11111111111111" ||
			cnpj == "22222222222222" ||
			cnpj == "33333333333333" ||
			cnpj == "44444444444444" ||
			cnpj == "55555555555555" ||
			cnpj == "66666666666666" ||
			cnpj == "77777777777777" ||
			cnpj == "88888888888888" ||
			cnpj == "99999999999999"
			){
			return false;
		}

		tamanho = cnpj.length - 2;

		numeros = cnpj.substring(0,tamanho);

		digitos = cnpj.substring(tamanho);

		soma = 0;

		pos = tamanho - 7;

		for (i = tamanho; i >= 1; i--) {
			soma += numeros.charAt(tamanho - i) * pos--;
			if (pos < 2) {
				pos = 9;
			}

		}

		resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

		if (resultado != digitos.charAt(0)) {
			return false;
		}


		tamanho = tamanho + 1;

		numeros = cnpj.substring(0,tamanho);

		soma = 0;

		pos = tamanho - 7;

		for (i = tamanho; i >= 1; i--) {
			soma += numeros.charAt(tamanho - i) * pos--;
			if (pos < 2) {
				pos = 9;
			}

		}

		resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

		if (resultado != digitos.charAt(1)) {
			return false;
		}

		return true;
	};

	if(typeof define === 'function' && define.amd){ //AMD
		define(function () { return Utils; });
	} else if (typeof module !== 'undefined' && module.exports){ //node
		module.exports = Utils;
	} else { //browser
		global['Utils'] = Utils;
	}

}(this));