<template>
  <div class="fornecedor-component">
    <page-title
      icon="chat-bubble-user"
      :icon-type="2"
      main="Fornecedor"
      sub="Lista"
      :buttonAdd="true"
      rota="fornecedor"
    />
    <div class="body">
      <Grid :colunas="colunas" service="fornecedor-service" rota="fornecedor" />
    </div>
  </div>
</template>

<script>
import PageTitle from "../../components/template/PageTitle";
import Grid from "../../components/template/Grid";

export default {
  components: {
    PageTitle,
    Grid,
  },
  data() {
    return {
      colunas: [
        {
          nome: "Id",
          width: 15,
          field: "id",
          iconFilter: true,
          orderby: 0,
          filter: false,
          type: "number",
        },
        {
          nome: "Nome",
          width: 25,
          field: "nome",
          iconFilter: true,
          orderby: 0,
          filter: false,
          type: "text",
        },
        {
          nome: "Tipo do Documento",
          width: 15,
          field: "tipoDocumento",
          fieldText: "tipoDocumentoNome",
          iconFilter: true,
          orderby: 0,
          filter: false,
          type: "option",
          options: [
            { value: 1, text: "CNPJ" },
            { value: 2, text: "CPF" },
          ],
        },
        {
          nome: "Documento",
          width: 25,
          field: "documento",
          iconFilter: true,
          orderby: 0,
          filter: false,
          type: "text",
        },
        {
          nome: "Ativo",
          width: 10,
          field: "ativo",
          type: "bool",
          orderby: 0,
          filter: false,
        },
      ],
    };
  },
};
</script>

<style>
</style>     