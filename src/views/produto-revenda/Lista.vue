<template>
  <div class="produto-revenda-component">
    <page-title
      icon="truck-loading"
      :icon-type="2"
      main="Produto Revenda"
      sub="Lista"
      :buttonAdd="true"
      rota="produto-revenda"
    />
    <div class="body">
      <Grid
        :colunas="colunas"
        service="produto-revenda-service"
        rota="produto-revenda"
      />
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
          width: 5,
          field: "id",
          iconFilter: true,
          orderby: 0,
          filter: false,
          type: "number",
        },
        {
          nome: "Codigo",
          width: 10,
          field: "codigo",
          iconFilter: true,
          orderby: 0,
          filter: false,
          type: "text",
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
          nome: "Fornecedor",
          width: 25,
          field: "fornecedorNome",
          iconFilter: true,
          orderby: 0,
          filter: false,
          type: "text",
        },
        {
          nome: "Preço",
          width: 15,
          field: "preco",
          iconFilter: true,
          orderby: 0,
          filter: false,
          type: "money",
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