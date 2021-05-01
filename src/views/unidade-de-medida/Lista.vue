<template>
  <div class="unidade-medida-component">
    <page-title
      icon="ruler"
      :icon-type="2"
      main="Unidade de Medida"
      sub="Lista"
      :buttonAdd="true"
      rota="unidade-de-medida"
    />
    <div class="body">
      <Grid
        :colunas="colunas"
        service="unidadeMedidaService"
        rota="unidade-de-medida"
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
          width: 20,
          field: "id",
          iconFilter: true,
          orderby: 0,
          filter: false,
          type: "number",
        },
        {
          nome: "Nome",
          width: 35,
          field: "nome",
          iconFilter: true,
          orderby: 0,
          filter: false,
          type: "text",
        },
        {
          nome: "Sigla",
          width: 15,
          field: "sigla",
          iconFilter: true,
          orderby: 0,
          filter: false,
          type: "text",
        },
        {
          nome: "Ativo",
          width: 20,
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