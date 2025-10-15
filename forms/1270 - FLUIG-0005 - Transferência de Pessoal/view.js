$(document).ready(function () {
  var atividade = getWKNumState();

  Compartilhados.expandePainel(atividade);
  Compartilhados.destacaAprovacoes();
  Compartilhados.destacaParecer();
  Compartilhados.camposObrigatorio();
  Movimentacoes();
  bloqExibeCampos();
  if (atividade !== 41 && $("#cpReaberturaChamado").val() == "") {
    $("#divReabertura").hide();
  }

  if (atividade == "1" || atividade == "0" || atividade == "41") {
    //Empresa e Dpto
    $("#addEmpresa").click(function () {
      var zoomSecao = buscaCentroCusto();
      zoomSecao.Abrir();
    });
    //Colaborador
    $("#addNomCol").click(function () {
      var ZoomCol = ZoomBuscaCol();
      ZoomCol.Abrir();
    });
    //Tp Desligamento
    $("#addTpDesl").click(function () {
      var ZoomTPTDemissao = ZoomBuscaTPTDemissao();
      ZoomTPTDemissao.Abrir();
    });
    //Mt Desligamento
    $("#addMtDesl").click(function () {
      var ZoomMTVDemissao = ZoomBuscaMTVDemissao();
      ZoomMTVDemissao.Abrir();
    });
    //MOtivo mud secao
    $("#addMotivoSecao").click(function () {
      var Coligada = $("#CodColigada").val();
      if (Coligada != "") {
        var ZoomMotSecao = ZoomBuscaMotSecao();
        ZoomMotSecao.Abrir();
      } else {
        window.parent.FLUIGC.message.alert({
          message:
            "Antes de selecionar o motivo, preencha os dados do colaborador!",
          title: "Erro",
          label: "Ok",
        });
      }
    });
    //MOtivo mud salarial
    $("#addMotivoSalario").click(function () {
      var Coligada = $("#CodColigada").val();
      if (Coligada != "") {
        var ZoomMotSalario = ZoomBuscaMotSalario();
        ZoomMotSalario.Abrir();
      } else {
        window.parent.FLUIGC.message.alert({
          message:
            "Antes de selecionar o motivo, preencha os dados do colaborador!",
          title: "Erro",
          label: "Ok",
        });
      }
    });

    //MOtivo mud Funcao
    $("#addMotivoFuncao").click(function () {
      var Coligada = $("#CodColigada").val();
      if (Coligada != "") {
        var ZoomMotFuncao = ZoomBuscaMotFuncao();
        ZoomMotFuncao.Abrir();
      } else {
        window.parent.FLUIGC.message.alert({
          message:
            "Antes de selecionar o motivo, preencha os dados do colaborador!",
          title: "Erro",
          label: "Ok",
        });
      }
    });

    //funcao
    $("#addFuncao").click(function () {
      var Coligada = $("#CodColigada").val();
      if (Coligada != "") {
        var ZoomFuncoes = ZoomBuscaFuncoes();
        ZoomFuncoes.Abrir();
      } else {
        window.parent.FLUIGC.message.alert({
          message:
            "Antes de selecionar a função,preencha os dados do colaborador!",
          title: "Erro",
          label: "Ok",
        });
      }
    });
    //Horario
    $("#addHorario").click(function () {
      var Coligada = $("#CodColigada").val();
      if (Coligada != "") {
        var ZoomHorario = ZoomBuscaHorario();
        ZoomHorario.Abrir();
      } else {
        window.parent.FLUIGC.message.alert({
          message:
            "Antes de selecionar o horario,preencha os dados do colaborador",
          title: "Erro",
          label: "Ok",
        });
      }
    });
    //Ind Horario
    $("#addIndHorario").click(function () {
      var Coligada = $("#CodColigada").val();
      var CodHorário = $("#CpNovoCodHorario").val();

      if (Coligada != "" || CodHorário != "") {
        var ZoomIndHor = ZoomBuscaIndHor();
        ZoomIndHor.Abrir();
      } else {
        window.parent.FLUIGC.message.alert({
          message:
            "Antes de selecionar o indice,preencha os dados do colaborador e do novo horário!",
          title: "Erro",
          label: "Ok",
        });
      }
    });

    //sindicato
    $("#addSindicato").click(function () {
      var Coligada = $("#CodColigada").val();
      if (Coligada != "") {
        var ZoomSindicato = ZoomBuscaSindicato();
        ZoomSindicato.Abrir();
      } else {
        window.parent.FLUIGC.message.alert({
          message:
            "Antes de selecionar o sindicato,preencha os dados do colaborador!",
          title: "Erro",
          label: "Ok",
        });
      }
    });
    //NOVA SECAO
    $("#addSecao").click(function () {
      var Coligada = $("#CodColigada").val();
      if (Coligada != "") {
        var ZoomNovaSecao = ZoomBuscaNovaSecao();
        ZoomNovaSecao.Abrir();
      } else {
        window.parent.FLUIGC.message.alert({
          message:
            "Antes de selecionar a seção,preencha os dados do colaborador!",
          title: "Erro",
          label: "Ok",
        });
      }
    });

    criaDatepickers();

    //BUSCA DATA MUDANCA
    $("#addDtMudanca").click(function () {
      $("#DataMudanca").datepicker("show");
    });

    $(".Valor").maskMoney({ decimal: ",", thousands: "", precision: 2 });
  }
  //Ckb1 NovaSecao Ckb2 NovaFuncao Ckb3 NovoHorario Ckb4 NovoSindicato Ckb5 NovoSalario

  $("#Ckb1").click(function () {
    if ($(this).is(":checked")) {
      $(".NovaSecao").show();
    } else {
      $(".NovaSecao").hide();
      $(".NovaSecao").val("");
    }
  });
  $("#Ckb2").click(function () {
    if ($(this).is(":checked")) {
      $(".NovaFuncao").show();
    } else {
      $(".NovaFuncao").hide();
      $(".NovaFuncao").val("");
    }
  });
  $("#Ckb3").click(function () {
    if ($(this).is(":checked")) {
      $(".NovoHorario").show();
    } else {
      $(".NovoHorario").hide();
      $(".NovoHorario").val("");
    }
  });
  $("#Ckb4").click(function () {
    if ($(this).is(":checked")) {
      $(".NovoSindicato").show();
    } else {
      $(".NovoSindicato").hide();
      $(".NovoSindicato").val("");
    }
  });
  $("#Ckb5").click(function () {
    if ($(this).is(":checked")) {
      $(".NovoSalario").show();
    } else {
      $(".NovoSalario").hide();
      $(".NovoSalario").val("");
    }
  });
});

var criaDatepickers = function () {
  $("#DataMudanca").datepicker({
    showOn: "button",
    showButtonPanel: "true",
    changeMonth: "true",
    changeYear: "true",
    showOtherMonths: "true",
    selectOtherMonths: "true",
    onSelect: function () {
      $(document).trigger("dataSelecionada");
    },
  });
};

//Ckb1 NovaSecao Ckb2 NovaFuncao Ckb3 NovoHorario Ckb4 NovoSindicato Ckb5 NovoSalario
var Movimentacoes = function () {
  var Cbk1 = $("#Ckb1").val();
  if ($(Cbk1).is(":checked")) {
    $(".NovaSecao").show();
  } else {
    $(".NovaSecao").hide();
  }
  var Cbk2 = $("#Ckb1").val();
  if ($(Cbk2).is(":checked")) {
    $(".NovaFuncao").show();
  } else {
    $(".NovaFuncao").hide();
  }
  var Cbk3 = $("#Ckb1").val();
  if ($(Cbk3).is(":checked")) {
    $(".NovoHorario").show();
  } else {
    $(".NovoHorario").hide();
  }
  var Cbk4 = $("#Ckb1").val();
  if ($(Cbk4).is(":checked")) {
    $(".NovoSindicato").show();
  } else {
    $(".NovoSindicato").hide();
  }
  var Cbk5 = $("#Ckb1").val();
  if ($(Cbk5).is(":checked")) {
    $(".NovoSalario").show();
  } else {
    $(".NovoSalario").hide();
  }
};

var bloqExibeCampos = function () {
  if ($("#CodNovaSecao").val() != "") {
    $(".NovaSecao").show();
  } else {
    $(".NovaSecao").hide();
  }
  if ($("#txtNovoCodFuncao").val() != "") {
    $(".NovaFuncao").show();
  } else {
    $(".NovaFuncao").hide();
  }
  if ($("#CpNovoCodHorario").val() != "") {
    $(".NovoHorario").show();
  } else {
    $(".NovoHorario").hide();
  }
  if ($("#TxtCodSind").val() != "") {
    $(".NovoSindicato").show();
  } else {
    $(".NovoSindicato").hide();
  }
  if ($("#NovoSalario").val() != "") {
    $(".NovoSalario").show();
  } else {
    $(".NovoSalario").hide();
  }
};

var buscaCentroCusto = function () {
  var login = $("#cpLoginFluig").val();

  var zoomSecao = new Zoom();

  zoomSecao.FieldsName = ["login"];
  zoomSecao.Id = "IDZoomCentroCusto";
  zoomSecao.DataSet = "DS_FLUIG_0012";
  zoomSecao.Titulo = "Buscar Obra/Departamento";
  zoomSecao.setRawFilters("login", login);
  zoomSecao.Colunas = [
    { title: "Obra/Departamento", name: "SECAO" },
    { title: "Cod.Secao", name: "CODSECAO" },
    { title: "Cod.Coligada", name: "CODCOLIGADA" },
    { title: "COD_GESTOR", name: "COD_GESTOR", display: false },
    { title: "NOME_GESTOR", name: "NOME_GESTOR", display: false },
    { title: "COD_DIRETOR", name: "COD_DIRETOR", display: false },
    { title: "NOME_DIRETOR", name: "NOME_DIRETOR", display: false },
    { title: "Empresa", name: "EMPRESA", display: false },
    { title: "Filial", name: "CODFILIAL", display: false },
  ];

  zoomSecao.Retorno = function (retorno) {
    $("#CentroCC").val(retorno[0]);
    $("#CodCentroCC").val(retorno[1]);
    $("#CodColigada").val(retorno[2]);
    $("#codGestorOrigem").val(retorno[3]);
    $("#Gestor").val(retorno[4]);
    $("#codDiretorOrigem").val(retorno[5]);
    $("#Empresa").val(retorno[7]);
    $("#txtSecOrig").val(retorno[0]);
    $("#CodCentroCC").val(retorno[1]);
    $("#txtCodSecaoOri").val(retorno[1]);
  };

  return zoomSecao;
};

function ZoomBuscaCol() {
  var ZoomCol = new Zoom();
  ZoomCol.FieldsName = new Array("CodCentroCC", "CodColigada");
  ZoomCol.Id = "IDZoomDadosColaborador";
  ZoomCol.DataSet = "DS_FLUIG_0026";
  ZoomCol.Titulo = "Buscar Colaborador";
  ZoomCol.Linhas = [];
  ZoomCol.Renderizado = false;

  ZoomCol.Colunas = [
    { title: "CHAPA", name: "CHAPA" },
    { title: "NOME", name: "NOME" },
    { title: "CARGO", name: "CARGO" },
    { title: "DATAADMISSAO", name: "DATAADMISSAO", display: false },
    { title: "UF_COLIGADA", name: "UF_COLIGADA", display: false },
    { title: "CODFUNCAO", name: "CODFUNCAO", display: false },
    { title: "CODSITUACAO", name: "CODSITUACAO", display: false },
    { title: "CODSECAO", name: "CODSECAO", display: false },
    { title: "FIMPRAZOCONTR", name: "FIMPRAZOCONTR", display: false },
    { title: "CODPESSOA", name: "CODPESSOA", display: false },
    { title: "SALARIO", name: "SALARIO", display: false },
    { title: "DATALIMITEFER", name: "DATALIMITEFER", display: false },
    { title: "CODSINDICATO", name: "CODSINDICATO", display: false },
    { title: "MEMBROCIPA", name: "MEMBROCIPA", display: false },
    { title: "CODTIPO", name: "CODTIPO", display: false },
    { title: "CODCATEGORIA", name: "CODCATEGORIA", display: false },
    { title: "TEMPRAZOCONTR", name: "TEMPRAZOCONTR", display: false },
    { title: "FIMPRAZOCONTR", name: "FIMPRAZOCONTR", display: false },
    { title: "NROFICHAREG", name: "NROFICHAREG", display: false },
    { title: "CODRECEBIMENTO", name: "CODRECEBIMENTO", display: false },
    { title: "SALARIO", name: "SALARIO", display: false },
    { title: "HORARIO", name: "HORARIO", display: false },
    { title: "CODHORARIO", name: "CODHORARIO", display: false },
    { title: "SINDICATO", name: "SINDICATO", display: false },
    { title: "CODSINDICATO", name: "CODSINDICATO", display: false },
    { title: "INDINICIOHOR", name: "INDINICIOHOR", display: false },
  ];

  ZoomCol.Retorno = function (retorno) {
    $("#MatriculaCod").val(retorno[0]);
    $("#TxtChapa").val(retorno[0]);
    $("#NomeColaborador").val(retorno[1]);
    $("#CargoCol").val(retorno[2]);
    $("#DatadaAdmissao").val(retorno[3]);
    $("#CodPessoa").val(retorno[9]);
    $("#TxtNomeCol").val(retorno[1]);
    $("#txtCodFuncao").val(retorno[5]);
    $("#DtLimitFer").val(retorno[11]);
    $("#txtDtAdm").val(retorno[3]);
    $("#txtCodSindicato").val(retorno[12]);
    $("#txtMembCipaCod").val(retorno[13]);
    $("#CodTipo").val(retorno[14]);
    $("#CodCategoria").val(retorno[15]);
    $("#txtSalOrigem").val(retorno[10]);
    $("#TEMPRAZOCONTR").val(retorno[16]);
    $("#FIMPRAZOCONTR").val(retorno[17]);
    $("#NROFICHAREG").val(retorno[18]);
    $("#CODRECEBIMENTO").val(retorno[19]);
    $("#Salario").val(retorno[20]);
    $("#txtCodSindicato").val(retorno[6]);
    $("#DescSindAtual").val(retorno[23]);
    $("#txtCodSindicato").val(retorno[24]);
    $("#DescHoraAtual").val(retorno[21]);
    $("#CodHorAtual").val(retorno[22]);
    $("#IndiceAtual").val(retorno[25]);
  };

  return ZoomCol;
}
//NOVA SEÇÃO

function ZoomBuscaNovaSecao() {
  var ZoomNovaSecao = new Zoom();

  ZoomNovaSecao.FieldsName = new Array("CodCentroCC", "CodColigada");
  ZoomNovaSecao.Id = "IDZoomNovaSecao";
  ZoomNovaSecao.DataSet = "DS_FLUIG_0040";
  ZoomNovaSecao.Titulo = "Buscar Obra/Departamento";
  ZoomNovaSecao.Colunas = [
    { title: "Obra/Departamento", name: "SECAO" },
    { title: "Cod.Secao", name: "CODSECAO" },
    { title: "Cod.Coligada", name: "CODCOLIGADA" },
    { title: "COD_GESTOR", name: "COD_GESTOR", display: false },
    { title: "NOME_GESTOR", name: "NOME_GESTOR", display: false },
    { title: "COD_DIRETOR", name: "COD_DIRETOR", display: false },
    { title: "NOME_DIRETOR", name: "NOME_DIRETOR", display: false },
    { title: "Empresa", name: "EMPRESA", display: false },
    { title: "CODCOLIGADA", name: "CODCOLIGADA", display: false },
    { title: "ESTADO", name: "ESTADO", display: false },
    { title: "CIDADE", name: "CIDADE", display: false },
    { title: "CODFILIAL", name: "CODFILIAL", display: false },
  ];

  ZoomNovaSecao.Retorno = function (retorno) {
    $("#DesNovaSecao").val(retorno[0]);
    $("#CodNovaSecao").val(retorno[1]);
    $("#codGestorDestino").val(retorno[3]);
    $("#cpNovoGestor").val(retorno[4]);
    $("#CodFilialDestino").val(retorno[11]);
  };

  return ZoomNovaSecao;
}

function ZoomBuscaFuncoes() {
  var ZoomFuncoes = new Zoom();
  ZoomFuncoes.FieldsName = new Array("CodColigada");
  ZoomFuncoes.Id = "IDbuscaFuncoes";
  ZoomFuncoes.DataSet = "DS_FLUIG_0015";
  ZoomFuncoes.Titulo = "Buscar Funcoes";
  ZoomFuncoes.Linhas = [];
  ZoomFuncoes.Renderizado = false;

  ZoomFuncoes.Colunas = [
    { title: "Descricao.", name: "FUNCAO" },
    { title: "Codigo", name: "CODIGO" },
  ];
  ZoomFuncoes.Retorno = function (retorno) {
    $("#txtNovoFuncao").val(retorno[0]);
    $("#txtNovoCodFuncao").val(retorno[1]);
  };

  return ZoomFuncoes;
}
function ZoomBuscaHorario() {
  var ZoomHorario = new Zoom();
  ZoomHorario.FieldsName = new Array("CodColigada");
  ZoomHorario.Id = "IDbuscaHorario";
  ZoomHorario.DataSet = "DS_FLUIG_0018";
  ZoomHorario.Titulo = "Buscar Horario";
  ZoomHorario.Linhas = [];
  ZoomHorario.Renderizado = false;

  ZoomHorario.Colunas = [
    { title: "Descricao.", name: "DESCRICAO" },
    { title: "Codigo", name: "CODIGO" },
  ];
  ZoomHorario.Retorno = function (retorno) {
    $("#CpNovoHorario").val(retorno[0]);
    $("#CpNovoCodHorario").val(retorno[1]);
  };

  return ZoomHorario;
}

function ZoomBuscaIndHor() {
  var ZoomIndHor = new Zoom();
  ZoomIndHor.FieldsName = new Array("CodColigada", "CpNovoCodHorario");
  ZoomIndHor.Id = "IDbuscaIndHor";
  ZoomIndHor.DataSet = "DS_FLUIG_0023";
  ZoomIndHor.Titulo = "Buscar IndHor";
  ZoomIndHor.Linhas = [];
  ZoomIndHor.Renderizado = false;

  ZoomIndHor.Colunas = [
    { title: "Descricao.", name: "DESCRICAO" },
    { title: "Codigo", name: "INDINICIOHOR" },
  ];

  ZoomIndHor.Retorno = function (retorno) {
    $("#CpIndiceHorario").val(retorno[0]);
    $("#CpIndiceCodHorario").val(retorno[1]);
  };

  return ZoomIndHor;
}

function ZoomBuscaSindicato() {
  var ZoomSindicato = new Zoom();
  ZoomSindicato.FieldsName = new Array("CodColigada");
  ZoomSindicato.Id = "IDbuscaSindicato";
  ZoomSindicato.DataSet = "DS_FLUIG_0019";
  ZoomSindicato.Titulo = "Buscar Sindicato";
  ZoomSindicato.Linhas = [];
  ZoomSindicato.Renderizado = false;

  ZoomSindicato.Colunas = [
    { title: "Descricao.", name: "NOME" },
    { title: "Codigo", name: "CODIGO" },
  ];
  ZoomSindicato.Retorno = function (retorno) {
    $("#CpSindicato").val(retorno[0]);
    $("#TxtCodSind").val(retorno[1]);
  };

  return ZoomSindicato;
}

function ZoomBuscaMotSalario() {
  var ZoomMotSalario = new Zoom();
  ZoomMotSalario.FieldsName = new Array("CodColigada");
  ZoomMotSalario.Id = "IDZoomMotSalario";
  ZoomMotSalario.DataSet = "DS_FLUIG_0044";
  ZoomMotSalario.Titulo = "Buscar Salario";
  ZoomMotSalario.Linhas = [];
  ZoomMotSalario.Renderizado = false;

  ZoomMotSalario.Colunas = [
    { title: "Codigo", name: "CODIGO" },
    { title: "Motivo", name: "MOTIVO" },
  ];
  ZoomMotSalario.Retorno = function (retorno) {
    $("#txtCodMotivoSalario").val(retorno[0]);
    $("#txtMotivoSalario").val(retorno[1]);
  };

  return ZoomMotSalario;
}

function ZoomBuscaMotFuncao() {
  var ZoomMotFuncao = new Zoom();
  ZoomMotFuncao.FieldsName = new Array("CodColigada");
  ZoomMotFuncao.Id = "IDZoomMotFuncao";
  ZoomMotFuncao.DataSet = "DS_FLUIG_0045";
  ZoomMotFuncao.Titulo = "Buscar Funcao";
  ZoomMotFuncao.Linhas = [];
  ZoomMotFuncao.Renderizado = false;

  ZoomMotFuncao.Colunas = [
    { title: "Codigo", name: "CODIGO" },
    { title: "Motivo", name: "MOTIVO" },
  ];
  ZoomMotFuncao.Retorno = function (retorno) {
    $("#txtCodMotivoFuncao").val(retorno[0]);
    $("#txtMotivoFuncao").val(retorno[1]);
  };

  return ZoomMotFuncao;
}
function ZoomBuscaMotSecao() {
  var ZoomMotSecao = new Zoom();
  ZoomMotSecao.FieldsName = new Array("CodColigada");
  ZoomMotSecao.Id = "IDZoomMotFuncao";
  ZoomMotSecao.DataSet = "DS_FLUIG_0046";
  ZoomMotSecao.Titulo = "Buscar Funcao";
  ZoomMotSecao.Linhas = [];
  ZoomMotSecao.Renderizado = false;

  ZoomMotSecao.Colunas = [
    { title: "Codigo", name: "CODIGO" },
    { title: "Motivo", name: "MOTIVO" },
  ];
  ZoomMotSecao.Retorno = function (retorno) {
    $("#txtCodMotivoSecao").val(retorno[0]);
    $("#txtMotivoSecao").val(retorno[1]);
  };

  return ZoomMotSecao;
}
