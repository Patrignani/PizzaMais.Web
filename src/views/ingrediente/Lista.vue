<template>
  <div class="ingrediente-component">
    <page-title
      icon="weight"
      :iconType="2"
      main="Ingredientes"
      sub="Lista"
      :buttonAdd="true"
      rota="ingrediente"
    />
    <div class="body">
      <Grid
        :colunas="colunas"
        service="ingredienteService"
        rota="ingrediente"
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
          width: 50,
          field: "nome",
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