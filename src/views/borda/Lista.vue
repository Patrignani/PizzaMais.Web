<template>
  <div class="borda-component">
    <page-title
      icon="utensils"
      :icon-type="2"
      main="borda"
      sub="Lista"
      :buttonAdd="true"
      rota="borda"
    />
     <div class="body">
      <Grid
        :colunas="colunas"
        service="borda-service"
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
    Grid
  },
   data() {
    return {
      colunas: [
        {
          nome: "Id",
          width: 10,
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
          nome: "Preço",
          width: 25,
          field: "preco",
          iconFilter: true,
          orderby: 0,
          filter: false,
          type: "money",
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