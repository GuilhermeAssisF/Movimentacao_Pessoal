function Abertura(){

    var cpLoginFluig = hAPI.getCardValue('cpLoginFluig');
    var codGestorDestino = hAPI.getCardValue('codGestorDestino');
    var codGestorOrigem = hAPI.getCardValue('codGestorOrigem');
    var ehSecao = hAPI.getCardValue('Ckb1') == "on"; 


	if(cpLoginFluig != codGestorOrigem){
		return "GO";
	}
	else{
		if(ehSecao && cpLoginFluig != codGestorOrigem){
			return "GD"
		}
		else{
			return "RH";
		}
	}

}

function Gestor(){

    var cpLoginFluig = hAPI.getCardValue('cpLoginFluig');
	var codGestorOrigem = hAPI.getCardValue('codGestorOrigem');
    var codGestorDestino = hAPI.getCardValue('codGestorDestino');
    var cpAprovacaoGestor = hAPI.getCardValue('cpAprovacaoGestor'); 
	var ehSecao = hAPI.getCardValue('Ckb1') == "on"; 


	if(cpAprovacaoGestor == "3"){
		return "RE";
	}
	else if(cpAprovacaoGestor == "2"){
		return "CO";
	}
	else{
		if(ehSecao && codGestorOrigem != codGestorDestino){
			return "GD"
		}
		else{
			return "RH";
		}
	}
}

function GestorDestino(){

    var cpAprovacaoDiretor = hAPI.getCardValue('cpAprovacaoDiretor');


	if(cpAprovacaoDiretor == "3"){
		return "RE";
	}
	else if(cpAprovacaoDiretor == "2"){
		return "CO";
	}
	else{
		return "RH";
	}
}