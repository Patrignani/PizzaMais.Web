<template>
  <div class="ingrediente-component">
    <page-title icon="weight" icon-type="2" main="Ingredientes" sub="Lista" />
     <div class="body">
    <Grid />
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
};
</script>

<style>
</style>