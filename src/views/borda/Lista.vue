<template>
  <div class="borda-component">
    <page-title icon="utensils" icon-type="2" main="borda" sub="Lista" />
  </div>
</template>

<script>
import PageTitle from "../../components/template/PageTitle";
export default {
  components: {
    PageTitle,
  },
  mounted(){
    console.log(process.env.VUE_APP_STATE)
    }
};
</script>

<style>
</style>