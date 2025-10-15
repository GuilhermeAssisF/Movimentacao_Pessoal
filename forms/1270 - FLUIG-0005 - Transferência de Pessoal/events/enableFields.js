/*
GESTOR - 7
DIRETOR - 8
CORREÇÃO - 41
ADMISSAO - 74
VALIDA KIT - 97
GERAR KIT - 89
*/

function enableFields(form){ 

	log.info("INICIO do EnableFields do formulário FLUIG-0003 - DEMISSAO");
	
	var atividade = parseInt(getValue("WKNumState"));
	
	var Campos = new Array(
			//inicio e correcao
		{"campo" : "Empresa","atividade" : "0,1,41"},
		{"campo" : "CentroCC","atividade" : "0,1,41"},
		{"campo" : "NomeColaborador","atividade" : "0,1,41"},
		{"campo" : "CargoCol","atividade" : "0,1,41"},
		{"campo" : "MatriculaCod","atividade" : "0,1,41"},
		{"campo" : "Gestor","atividade" : "0,1,41"},
		{"campo" : "TipoDesligamento","atividade" : "0,1,41"},
		{"campo" : "MotiDesligamento","atividade" : "0,1,41"},
		{"campo" : "TpAviso","atividade" : "0,1,41"},
		{"campo" : "EPIEPC","atividade" : "0,1,41"},
		{"campo" : "DPCentral","atividade" : "0,1,41"},
		{"campo" : "InfoCompl","atividade" : "0,1,41"},
		{"campo" : "cpCheklist","atividade" : "0,1,41"},
		{"campo" : "cpObs","atividade" : "0,1,41"}, 
		{"campo" : "NovoSalario","atividade" : "0,1,41"}, 
		{"campo" : "Ckb1","atividade" : "0,1,41"},
		{"campo" : "Ckb2","atividade" : "0,1,41"},
		{"campo" : "Ckb3","atividade" : "0,1,41"},
		{"campo" : "Ckb4","atividade" : "0,1,41"}, 
		{"campo" : "Ckb5","atividade" : "0,1,41"}, 
		//REABERTURA
		{"campo" : "cpReaberturaChamado","atividade" : "41"},
		{"campo" : "cpParecerReabertura","atividade" : "41"},
		//GESTOR IMEDIATO
		{"campo" : "cpAprovacaoGestor","atividade" : "7"},
		{"campo" : "cpParecercol","atividade" : "7"},
		{"campo" : "cpRespGestor","atividade" : "7"},
		//GESTOR IMEDIATO EM ATRASO
		{"campo" : "cpAprovacaoDiretor","atividade" : "8"},
		{"campo" : "cpParecerAprovaDiretor","atividade" : "8"},
		{"campo" : "cpRespDiretor","atividade" : "8"},
		 //VALIDAR O KIT
		{"campo" : "cpAprovacaoRH","atividade" : "74"},
		{"campo" : "cpParecerAprovaRH","atividade" : "74"},
		{"campo" : "cpRespRH","atividade" : "74"},
		//analista bpo 
		{"campo" : "cpParecerBPO","atividade" : "106"},
		//Aprov Diretoria Origem
		{"campo" : "cpAprovDir","atividade" : "111"},
		{"campo" : "cpParecerDiretor","atividade" : "111"}
	
		
	);

	for (var item in Campos){
		var Campo = Campos[item],
			atividades = Campo["atividade"].split(",");
		
		if(atividades.indexOf(atividade.toString()) >= 0){
			form.setEnabled(Campo["campo"],true);
			
		} else {
			form.setEnabled(Campo["campo"],false);
		}
	}

	log.info("Fim do EnableFields do formulário FLUIG-0003 - DEMISSAO");
	
}



