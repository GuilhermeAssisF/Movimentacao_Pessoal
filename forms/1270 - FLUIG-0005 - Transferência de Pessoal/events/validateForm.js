/*
GESTOR - 7
DIRETOR - 8
CORREÇÃO - 41
ADMISSAO - 74
VALIDA KIT - 97
GERAR KIT - 89
*/
function validateForm(form){

	var atividade = parseInt(getValue("WKNumState"));
	var msg = "";
	var acaoUsuario = getValue("WKCompletTask");
	var Errors = [];
	
	function validaAprovacao(aprovacao, parecer) {
		if (form.getValue(aprovacao) == 0) {
			Errors.push('Aprovação não preenchida');
		}

		if (form.getValue(aprovacao) == 2 && form.getValue(parecer) == '') {
			Errors.push('Parecer não prenchido'); 
		}
	}

	function validaVazio(campo, mensagem) {
		if (form.getValue(campo) == '') {
			Errors.push(mensagem);
		}
	}

	function validaNotSelected(campo, mensagem) {
		if (form.getValue(campo) == '') {
			Errors.push(mensagem);
		}
	}

	var getDtConvertida = function(campo) {
		var dtArray = String(form.getValue(campo)).split('/');
		return new Date(dtArray[2], dtArray[1] - 1, dtArray[0]);
	};
	
	
	validaVazio('Empresa', 'Empresa');
	validaVazio('CentroCC', 'Centro de Custo');
	validaVazio('NomeColaborador', 'Nome do Colaborador');
	validaVazio('DatadaAdmissao', 'Data Admissão');
	validaVazio('CargoCol', 'Cargo');
	validaVazio('MatriculaCod', 'Matrícula');
	validaVazio('Gestor', 'Gestor');
	validaVazio('TipoDesligamento', 'Tipo de Desligamento');
	validaVazio('MotiDesligamento', 'Motivo de Desligamento');
	validaVazio('TpAviso', 'Tipo de Aviso');
	validaVazio('DataAviso', 'Data de Aviso');
	validaVazio('DataDemissao', 'Data de Demissão');
	validaVazio('EPIEPC', 'Possui ficha EPI/EPC');
	validaVazio('DPCentral', 'Enviou ao DP Central');
	
	
	if(		form.getValue("NovoSalario")=="" &&
			form.getValue("TxtCodSind")=="" &&
			form.getValue("CpIndiceCodHorario")=="" &&
			form.getValue("txtNovoCodFuncao")=="" &&
			form.getValue("DesNovaSecao")==""
			
			){
		msg += "É necesssário selecionar uma alteração para iniciar o chamado." + "<br>";	
	}
	
	    
	  
	//Indice novo horário
	if (form.getValue("CpNovoHorario") !="" && form.getValue("CpIndiceCodHorario")==""){
		msg += "Índice Horário." + "<br>";	
	}
	if (form.getValue("NovoSalario") !="" && form.getValue("txtCodMotivoSalario")==""){
		msg += "Motivo da Mudança de Salário." + "<br>";	
	}
	if (form.getValue("txtNovoCodFuncao") !="" && form.getValue("txtCodMotivoFuncao")==""){
		msg += "Motivo da Mudança de Função." + "<br>";	
	}
	if (form.getValue("DesNovaSecao") !="" && form.getValue("txtCodMotivoSecao")==""){
		msg += "Motivo da Mudança de Seção." + "<br>";	
	}
	
	
	 
	
	//gestor
	if (atividade == 7  && (acaoUsuario=="true")) { //GESTOR IMEDIATO
		validaAprovacao('cpAprovacaoGestor', 'cpParecerAprovGestor');
	}
	//diretor
	else if ( atividade==8 && (acaoUsuario=="true")) { //GESTOR IMEDIATO EM ATRASO
		validaAprovacao('cpAprovacaoDiretor', 'cpParecerAprovaDiretor');
	}
	//rh
	else if (atividade == 74 && (acaoUsuario=="true")) { //VALIDAR O KIT
		validaAprovacao('cpAprovacaoRH', 'cpParecerAprovaRH');
	} 
	//reabertura
	else if (atividade == 41 && (acaoUsuario=="true")) { //VALIDAR O KIT
		validaAprovacao('cpReaberturaChamado', 'cpParecerReabertura');
	} 
	else if (atividade == 111 && (acaoUsuario=="true")) { //APROV DIRETOR
		validaAprovacao('cpAprovDir', 'cpParecerDiretor');
	} 

	   
	if (Errors.length) {
	throw Errors[0];
	}



	if (msg != ""){

		throw "<br> ERRO! <br>Campo(s) n&atilde;o informado(s): <br>" + msg;

	}

	

}