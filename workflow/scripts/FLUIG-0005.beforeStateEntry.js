var INTEGRACAO = 106; //INTEGRA NA ATIVIDADE 24 DE apos o PROCESSAMENTO DE FERIAS

function beforeStateEntry(sequenceId) {
  if (sequenceId == INTEGRACAO) {
    CadastraAlteracao();
  }
}

function CadastraAlteracao() {
  var retorno = true;
  var xml;

  var formatoInput = new java.text.SimpleDateFormat("dd/MM/yyyy");
  var formatoOutput = new java.text.SimpleDateFormat("yyyy-MM-dd'T'hh:mm:ss");

  var xmlFunc = "";
  var Horarioxml = "";
  var Salarioxml = "";
  var Funcaoxml = "";
  var SecaoXml = "";
  var Horario;
  var Funcao;
  var Sindicato;
  var Indice;
  var Salario;
  var Secao;

  var Chapa = hAPI.getCardValue("TxtChapa");
  var Coligada = hAPI.getCardValue("CodColigada");
  var CodPessoa = hAPI.getCardValue("CodPessoa");
  var HorarioAtual = hAPI.getCardValue("CodHorAtual");
  var NovoHorario = hAPI.getCardValue("CpNovoCodHorario");
  var IndiceAtual = hAPI.getCardValue("IndiceAtual");
  var NovoIndHorario = hAPI.getCardValue("CpIndiceCodHorario");
  var FuncaoAtual = hAPI.getCardValue("txtCodFuncao");
  var NovaFuncao = hAPI.getCardValue("txtNovoCodFuncao");
  var FuncaoNova = hAPI.getCardValue("txtNovoFuncao");
  var SindicatoAtual = hAPI.getCardValue("txtCodSindicato");
  var NovoSindicato = hAPI.getCardValue("TxtCodSind");
  var SalarioAtual = hAPI.getCardValue("Salario");
  var NovoSalario = hAPI.getCardValue("NovoSalario");
  var SecaoAtual = hAPI.getCardValue("CodCentroCC");
  var NovaSecao = hAPI.getCardValue("CodNovaSecao");
  var CodMotivoFuncao = hAPI.getCardValue("txtCodMotivoFuncao");
  var CodMotivoSalario = hAPI.getCardValue("txtCodMotivoSalario");
  var CodMotivoSecao = hAPI.getCardValue("txtCodMotivoSecao");
  var CodFilialDestino = hAPI.getCardValue("CodFilialDestino");
  var JornadaMensal = hAPI.getCardValue("cpJornadaMensal");

  
  

  var DataMudanca = hAPI.getCardValue("DataMudanca");
  if (DataMudanca != "") {
    var DtadmForm = formatoInput.parse(DataMudanca);
    var dtadmFormatado = formatoOutput.format(DtadmForm);
  }

  //verfica horario e indice - ADD NOVO E NOVO IND
  if (NovoHorario != "") {
    var xmlFunc = "";
    Horario = NovoHorario;
    Indice = NovoIndHorario;

    xmlFunc += "	<FopFunc>	";
    xmlFunc += "	<PFunc>	";
    xmlFunc += "	<CODCOLIGADA>" + Coligada + "</CODCOLIGADA>	";
    xmlFunc += "	<CHAPA>" + Chapa + "</CHAPA>	";
    xmlFunc += "	<CODFILIAL>" + CodFilialDestino + "</CODFILIAL>	";
    xmlFunc += "	<CODHORARIO>" + Horario + "</CODHORARIO>	";
    xmlFunc += "	<INDINICIOHOR>" + Indice + "</INDINICIOHOR>	";
    xmlFunc += "	</PFunc>	";
    xmlFunc += "	<PFCOMPL>	";
    xmlFunc += "	<CODCOLIGADA>" + Coligada + "</CODCOLIGADA>	";
    xmlFunc += "	<CHAPA>" + Chapa + "</CHAPA>	";
    xmlFunc += "	</PFCOMPL>	";
    xmlFunc += "	<VPCOMPL>	";
    xmlFunc += "	<CODPESSOA>" + CodPessoa + "</CODPESSOA>	";
    xmlFunc += "	</VPCOMPL>	";
    xmlFunc += "	</FopFunc>	";

    var CONNECT = DatasetFactory.getDataset("ds_connector", null, null, null);
    var USUARIO = CONNECT.getValue(0, "INTEGRADOR");
    var SENHA = CONNECT.getValue(0, "SENHA");
    var NOME_SERVICO = "WSDATASERVER";
    var CAMINHO_SERVICO = "com.totvs.WsDataServer";

    var servico = ServiceManager.getServiceInstance(NOME_SERVICO);

    var serviceHelper = servico.getBean();
    var instancia = servico.instantiate(CAMINHO_SERVICO);

    var ws = instancia.getRMIwsDataServer();

    var authenticatedService = serviceHelper.getBasicAuthenticatedClient(
      ws,
      "com.totvs.IwsDataServer",
      USUARIO,
      SENHA
    );

    log.info("@xmlFunc diz: xmlFunc: " + xmlFunc);

    try {
      var result = authenticatedService.saveRecordEmail(
        "FopFuncData",
        xmlFunc,
        "CODCOLIGADA=1;CODSISTEMA=P",
        "suportesoter@consultoriainterativa.com.br"
      );

      if (result != null && result.indexOf("===") != -1) {
        var msgErro = result.substring(0, result.indexOf("==="));
        throw msgErro;
      } else {
      }
    } catch (e) {
      if (e == null) {
        e = "Erro desconhecido; verifique o log do AppServer";
      }

      var mensagemErro = "Erro na comunicação com o TOTVS TBC: " + e;
      log.error(mensagemErro + " ---> " + xmlFunc);
      throw mensagemErro;
    }

    Horarioxml += "    <PFHstHor>";
    Horarioxml += "    <CODCOLIGADA>" + Coligada + "</CODCOLIGADA>";
    Horarioxml += "    <CHAPA>" + Chapa + "</CHAPA>";
    Horarioxml += "    <DTMUDANCA>" + dtadmFormatado + "</DTMUDANCA>";
    Horarioxml += "    <CODHORARIO>" + NovoHorario + "</CODHORARIO>";
    Horarioxml += "    <INDINICIOHOR>" + Indice + "</INDINICIOHOR>";
    Horarioxml += "    </PFHstHor>";

    log.info("@Horarioxml diz: Horarioxml: " + Horarioxml);

    try {
      var result = authenticatedService.saveRecordEmail(
        "FopHstHorData",
        Horarioxml,
        "CODCOLIGADA=1;CODSISTEMA=P",
        "suportesoter@consultoriainterativa.com.br"
      );

      if (result != null && result.indexOf("===") != -1) {
        var msgErro = result.substring(0, result.indexOf("==="));
        throw msgErro;
      } else {
      }
    } catch (e) {
      if (e == null) {
        e = "Erro desconhecido; verifique o log do AppServer";
      }

      var mensagemErro = "Erro na comunicação com o TOTVS TBC: " + e;
      log.error(mensagemErro + " ---> " + Horarioxml);
      throw mensagemErro;
    }

    log.info("@Horarioxml Cadastro diz: RESULT: " + result);
  }

  if (NovoSindicato != "") {
    var xmlFunc = "";
    Sindicato = NovoSindicato;

    xmlFunc += "	<FopFunc>	";
    xmlFunc += "	<PFunc>	";
    xmlFunc += "	<CODCOLIGADA>" + Coligada + "</CODCOLIGADA>	";
    xmlFunc += "	<CHAPA>" + Chapa + "</CHAPA>	";
    xmlFunc += "	<CODFILIAL>" + CodFilialDestino + "</CODFILIAL>	";
    xmlFunc += "	<CODSINDICATO>" + Sindicato + "</CODSINDICATO>	";
    xmlFunc += "	</PFunc>	";
    xmlFunc += "	<PFCOMPL>	";
    xmlFunc += "	<CODCOLIGADA>" + Coligada + "</CODCOLIGADA>	";
    xmlFunc += "	<CHAPA>" + Chapa + "</CHAPA>	";
    xmlFunc += "	</PFCOMPL>	";
    xmlFunc += "	<VPCOMPL>	";
    xmlFunc += "	<CODPESSOA>" + CodPessoa + "</CODPESSOA>	";
    xmlFunc += "	</VPCOMPL>	";
    xmlFunc += "	</FopFunc>	";

    var CONNECT = DatasetFactory.getDataset("ds_connector", null, null, null);
    var USUARIO = CONNECT.getValue(0, "INTEGRADOR");
    var SENHA = CONNECT.getValue(0, "SENHA");
    var NOME_SERVICO = "WSDATASERVER";
    var CAMINHO_SERVICO = "com.totvs.WsDataServer";

    var servico = ServiceManager.getServiceInstance(NOME_SERVICO);

    var serviceHelper = servico.getBean();
    var instancia = servico.instantiate(CAMINHO_SERVICO);

    var ws = instancia.getRMIwsDataServer();

    var authenticatedService = serviceHelper.getBasicAuthenticatedClient(
      ws,
      "com.totvs.IwsDataServer",
      USUARIO,
      SENHA
    );

    log.info("@xmlFunc diz: xmlFunc: " + xmlFunc);

    try {
      var result = authenticatedService.saveRecordEmail(
        "FopFuncData",
        xmlFunc,
        "CODCOLIGADA=1;CODSISTEMA=P",
        "suportesoter@consultoriainterativa.com.br"
      );

      if (result != null && result.indexOf("===") != -1) {
        var msgErro = result.substring(0, result.indexOf("==="));
        throw msgErro;
      } else {
      }
    } catch (e) {
      if (e == null) {
        e = "Erro desconhecido; verifique o log do AppServer";
      }

      var mensagemErro = "Erro na comunicação com o TOTVS TBC: " + e;
      log.error(mensagemErro + " ---> " + xmlFunc);
      throw mensagemErro;
    }
  }

  if (NovaFuncao != "") {
    var xmlFunc = "";
    Funcao = NovaFuncao;

    xmlFunc += "	<FopFunc>	";
    xmlFunc += "	<PFunc>	";
    xmlFunc += "	<CODCOLIGADA>" + Coligada + "</CODCOLIGADA>	";
    xmlFunc += "	<CHAPA>" + Chapa + "</CHAPA>	";
    xmlFunc += "	<CODFILIAL>" + CodFilialDestino + "</CODFILIAL>	";
    xmlFunc += "	<CODFUNCAO>" + Funcao + "</CODFUNCAO>	";
    xmlFunc += "	</PFunc>	";
    xmlFunc += "	<PFCOMPL>	";
    xmlFunc += "	<CODCOLIGADA>" + Coligada + "</CODCOLIGADA>	";
    xmlFunc += "	<CHAPA>" + Chapa + "</CHAPA>	";
    xmlFunc += "	</PFCOMPL>	";
    xmlFunc += "	<VPCOMPL>	";
    xmlFunc += "	<CODPESSOA>" + CodPessoa + "</CODPESSOA>	";
    xmlFunc += "	</VPCOMPL>	";
    xmlFunc += "	</FopFunc>	";

    var CONNECT = DatasetFactory.getDataset("ds_connector", null, null, null);
    var USUARIO = CONNECT.getValue(0, "INTEGRADOR");
    var SENHA = CONNECT.getValue(0, "SENHA");
    var NOME_SERVICO = "WSDATASERVER";
    var CAMINHO_SERVICO = "com.totvs.WsDataServer";

    var servico = ServiceManager.getServiceInstance(NOME_SERVICO);

    var serviceHelper = servico.getBean();
    var instancia = servico.instantiate(CAMINHO_SERVICO);

    var ws = instancia.getRMIwsDataServer();

    var authenticatedService = serviceHelper.getBasicAuthenticatedClient(
      ws,
      "com.totvs.IwsDataServer",
      USUARIO,
      SENHA
    );

    log.info("@xmlFunc diz: xmlFunc: " + xmlFunc);

    try {
      var result = authenticatedService.saveRecordEmail(
        "FopFuncData",
        xmlFunc,
        "CODCOLIGADA=1;CODSISTEMA=P",
        "suportesoter@consultoriainterativa.com.br"
      );

      if (result != null && result.indexOf("===") != -1) {
        var msgErro = result.substring(0, result.indexOf("==="));
        throw msgErro;
      } else {
      }
    } catch (e) {
      if (e == null) {
        e = "Erro desconhecido; verifique o log do AppServer";
      }

      var mensagemErro = "Erro na comunicação com o TOTVS TBC: " + e;
      log.error(mensagemErro + " ---> " + xmlFunc);
      throw mensagemErro;
    }

    if (CodMotivoFuncao != "") {
      Funcaoxml += "  <PFHstFco>";
      Funcaoxml += "    <CODCOLIGADA>" + Coligada + "</CODCOLIGADA>";
      Funcaoxml += "    <CHAPA>" + Chapa + "</CHAPA>";
      Funcaoxml += "    <DTMUDANCA>" + dtadmFormatado + "</DTMUDANCA>";
      Funcaoxml += "    <MOTIVO>" + CodMotivoFuncao + "</MOTIVO>";
      Funcaoxml += "    <CODFUNCAO>" + NovaFuncao + "</CODFUNCAO>";
      Funcaoxml += "  </PFHstFco>";

      log.info("@Funcaoxml diz: Funcaoxml: " + Funcaoxml);

      try {
        var result = authenticatedService.saveRecordEmail(
          "FopHstFcoData",
          Funcaoxml,
          "CODCOLIGADA=1;CODSISTEMA=P",
          "suportesoter@consultoriainterativa.com.br"
        );

        if (result != null && result.indexOf("===") != -1) {
          var msgErro = result.substring(0, result.indexOf("==="));
          throw msgErro;
        } else {
        }
      } catch (e) {
        if (e == null) {
          e = "Erro desconhecido; verifique o log do AppServer";
        }

        var mensagemErro = "Erro na comunicação com o TOTVS TBC: " + e;
        log.error(mensagemErro + " ---> " + Funcaoxml);
        throw mensagemErro;
      }

      log.info("@Funcaoxml Cadastro diz: RESULT: " + result);
    }
  }

  // --- INÍCIO DO BLOCO DE ALTERAÇÃO DE SALÁRIO ---

  // Verifica se o campo "NovoSalário" foi preenchido no formulário.
  if (NovoSalario != "") {

    var Salario = NovoSalario;
    var xmlFunc = "";
    var Salarioxml = "";

    // --- CONEXÃO COM O WEBSERVICE DO TOTVS RM (realizada apenas uma vez) ---
    var CONNECT = DatasetFactory.getDataset("ds_connector", null, null, null);
    var USUARIO = CONNECT.getValue(0, "INTEGRADOR");
    var SENHA = CONNECT.getValue(0, "SENHA");
    var NOME_SERVICO = "WSDATASERVER";
    var CAMINHO_SERVICO = "com.totvs.WsDataServer";

    var servico = ServiceManager.getServiceInstance(NOME_SERVICO);
    var serviceHelper = servico.getBean();
    var instancia = servico.instantiate(CAMINHO_SERVICO);
    var ws = instancia.getRMIwsDataServer();
    var authenticatedService = serviceHelper.getBasicAuthenticatedClient(
      ws,
      "com.totvs.IwsDataServer",
      USUARIO,
      SENHA
    );

    // --- ETAPA 1: INSERIR O HISTÓRICO SALARIAL (OPERAÇÃO PRIORITÁRIA) ---
    if (CodMotivoSalario != "") {

      // Monta a estrutura do XML para o histórico salarial (PFHSTSAL).
      Salarioxml += "<PFHSTSAL>";
      Salarioxml += " <CODCOLIGADA>" + Coligada + "</CODCOLIGADA>";
      Salarioxml += " <CHAPA>" + Chapa + "</CHAPA>";
      Salarioxml += " <DTMUDANCA>" + dtadmFormatado + "</DTMUDANCA>";
      Salarioxml += " <SALARIO>" + NovoSalario + "</SALARIO>";
      Salarioxml += " <NROSALARIO>1</NROSALARIO>";
      Salarioxml += " <MOTIVO>" + CodMotivoSalario + "</MOTIVO>";
      // Utiliza a variável 'JornadaMensal' preenchida no formulário.
      Salarioxml += "<JORNADACHAR>" + (JornadaMensal/60) + "</JORNADACHAR>";
      // Salarioxml += "<JORNADA>" + JornadaMensal + "</JORNADA>";
      Salarioxml += "</PFHSTSAL>";

      log.info("@Salarioxml diz: Tentando inserir o seguinte histórico: " + Salarioxml);

      try {
        var resultHist = authenticatedService.saveRecordEmail(
          "FopDataHistoricoSalarialWinForm",
          Salarioxml,
          "CODCOLIGADA=1;CODSISTEMA=P",
          "suportesoter@consultoriainterativa.com.br"
        );

        if (resultHist != null && resultHist.indexOf("===") != -1) {
          var msgErro = resultHist.substring(0, resultHist.indexOf("==="));
          throw "Erro ao inserir histórico salarial no RM: " + msgErro;
        }
        log.info("@Salarioxml Cadastro diz: Histórico inserido com sucesso!");

      } catch (e) {
        var mensagemErro = "FALHA CRÍTICA (Histórico Salarial): " + e;
        log.error(mensagemErro + " ---> XML enviado: " + Salarioxml);
        throw mensagemErro;
      }

    } else {
      throw "O Motivo da Mudança de Salário é obrigatório. A alteração foi cancelada.";
    }


    // --- ETAPA 2: ATUALIZAR O CADASTRO PRINCIPAL DO FUNCIONÁRIO ---
    // Esta etapa só é executada se a ETAPA 1 (inserção do histórico) for bem-sucedida.
    xmlFunc += "	<FopFunc>	";
    xmlFunc += "	<PFunc>	";
    xmlFunc += "	<CODCOLIGADA>" + Coligada + "</CODCOLIGADA>	";
    xmlFunc += "	<CHAPA>" + Chapa + "</CHAPA>	";
    xmlFunc += "	<CODFILIAL>" + CodFilialDestino + "</CODFILIAL>	";
    xmlFunc += "	<SALARIO>" + Salario + "</SALARIO>	";
    xmlFunc += "	</PFunc>	";
    xmlFunc += "	<PFCOMPL>	";
    xmlFunc += "	<CODCOLIGADA>" + Coligada + "</CODCOLIGADA>	";
    xmlFunc += "	<CHAPA>" + Chapa + "</CHAPA>	";
    xmlFunc += "	</PFCOMPL>	";
    xmlFunc += "	<VPCOMPL>	";
    xmlFunc += "	<CODPESSOA>" + CodPessoa + "</CODPESSOA>	";
    xmlFunc += "	</VPCOMPL>	";
    xmlFunc += "	</FopFunc>	";

    log.info("@xmlFunc diz: Atualizando cadastro do funcionário com o XML: " + xmlFunc);

    try {
      var resultFunc = authenticatedService.saveRecordEmail(
        "FopFuncData",
        xmlFunc,
        "CODCOLIGADA=1;CODSISTEMA=P",
        "suportesoter@consultoriainterativa.com.br"
      );

      if (resultFunc != null && resultFunc.indexOf("===") != -1) {
        var msgErro = resultFunc.substring(0, resultFunc.indexOf("==="));
        throw "Erro ao atualizar o cadastro principal do funcionário no RM: " + msgErro;
      }
    } catch (e) {
      var mensagemErro = "FALHA CRÍTICA (Cadastro Funcionário): " + e;
      log.error(mensagemErro + " ---> XML enviado: " + xmlFunc);
      throw mensagemErro;
    }
  } // Fim do if (NovoSalario != "")

  // --- FIM DO BLOCO DE ALTERAÇÃO DE SALÁRIO ---

  if (NovaSecao != "") {
    var xmlFunc = "";
    Secao = NovaSecao;

    var CONNECT = DatasetFactory.getDataset("ds_connector", null, null, null);
    var USUARIO = CONNECT.getValue(0, "INTEGRADOR");
    var SENHA = CONNECT.getValue(0, "SENHA");
    var NOME_SERVICO = "WSDATASERVER";
    var CAMINHO_SERVICO = "com.totvs.WsDataServer";

    var servico = ServiceManager.getServiceInstance(NOME_SERVICO);

    var serviceHelper = servico.getBean();
    var instancia = servico.instantiate(CAMINHO_SERVICO);

    var ws = instancia.getRMIwsDataServer();

    var authenticatedService = serviceHelper.getBasicAuthenticatedClient(
      ws,
      "com.totvs.IwsDataServer",
      USUARIO,
      SENHA
    );

    xmlFunc += "	<FopFunc>	";
    xmlFunc += "	<PFunc>	";
    xmlFunc += "	<CODCOLIGADA>" + Coligada + "</CODCOLIGADA>	";
    xmlFunc += "	<CHAPA>" + Chapa + "</CHAPA>	";
    xmlFunc += "	<CODFILIAL>" + CodFilialDestino + "</CODFILIAL>	";
    xmlFunc += "  <CODSECAO>" + Secao + "</CODSECAO> ";
    xmlFunc += "  <DTMUDANCASECAO>" + dtadmFormatado + "</DTMUDANCASECAO>";
    xmlFunc += "  <MOTMUDANCASECAO>" + CodMotivoSecao + "</MOTMUDANCASECAO>";
    xmlFunc += "	</PFunc>	";
    xmlFunc += "	<PFCOMPL>	";
    xmlFunc += "	<CODCOLIGADA>" + Coligada + "</CODCOLIGADA>	";
    xmlFunc += "	<CHAPA>" + Chapa + "</CHAPA>	";
    xmlFunc += "	</PFCOMPL>	";
    xmlFunc += "	<VPCOMPL>	";
    xmlFunc += "	<CODPESSOA>" + CodPessoa + "</CODPESSOA>	";
    xmlFunc += "	</VPCOMPL>	";
    xmlFunc += "	</FopFunc>	";

    log.info("@xmlFunc diz: xmlFunc: " + xmlFunc);

    try {
      var result = authenticatedService.saveRecordEmail(
        "FopFuncData",
        xmlFunc,
        "CODCOLIGADA=1;CODSISTEMA=P",
        "suportesoter@consultoriainterativa.com.br"
      );

      if (result != null && result.indexOf("===") != -1) {
        var msgErro = result.substring(0, result.indexOf("==="));
        throw msgErro;
      } else {
      }
    } catch (e) {
      if (e == null) {
        e = "Erro desconhecido; verifique o log do AppServer";
      }

      var mensagemErro = "Erro na comunicação com o TOTVS TBC: " + e;
      log.error(mensagemErro + " ---> " + xmlFunc);
      throw mensagemErro;
    }

    if (CodMotivoSecao != "") {
      SecaoXml += "    <Pfhstsec>";
      SecaoXml += "    <CODCOLIGADA>" + Coligada + "</CODCOLIGADA>";
      SecaoXml += "    <CHAPA>" + Chapa + "</CHAPA>";
      SecaoXml += "    <DTMUDANCA>" + dtadmFormatado + "</DTMUDANCA>";
      SecaoXml += "    <MOTIVO>" + CodMotivoSecao + "</MOTIVO>";
      SecaoXml += "    <CODSECAO>" + NovaSecao + "</CODSECAO>";
      SecaoXml += "    </Pfhstsec>";

      log.info("@SecaoXml diz: SecaoXml: " + SecaoXml);

      try {
        var result = authenticatedService.saveRecordEmail(
          "FopfhstsecData",
          SecaoXml,
          "CODCOLIGADA=1;CODSISTEMA=P",
          "suportesoter@consultoriainterativa.com.br"
        );

        if (result != null && result.indexOf("===") != -1) {
          var msgErro = result.substring(0, result.indexOf("==="));
          throw msgErro;
        } else {
        }
      } catch (e) {
        if (e == null) {
          e = "Erro desconhecido; verifique o log do AppServer";
        }

        var mensagemErro = "Erro na comunicação com o TOTVS TBC: " + e;
        log.error(mensagemErro + " ---> " + SecaoXml);
        throw mensagemErro;
      }

      log.info("@Horarioxml Cadastro diz: RESULT: " + result);
    }
  }
}
