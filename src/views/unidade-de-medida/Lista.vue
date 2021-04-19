<template>
  <div class="unidade-medida-component">
    <page-title icon="ruler" icon-type="2" main="Unidade de Medida" sub="Lista" />
  <router-link to="unidade-de-medida/1" >aaaa</router-link>
    <div class="body">
     
      <!-- <div class="tabs-component">
        <b-tabs v-model="tabIndex" small card>
          <b-tab title="General"><template /></b-tab>
          <b-tab title="Edit profile">
            I'm the second tab
            <b-card>I'm the card in tab</b-card>
          </b-tab>
          <b-tab title="Premium Plan" disabled>Sibzamini!</b-tab>
          <b-tab title="Info">I'm the last tab</b-tab>
        </b-tabs>
      </div> -->
    </div>
  </div>
</template>

<script>
import PageTitle from "../../components/template/PageTitle";
//import { BTabs } from "bootstrap-vue";

export default {
    components:{
        PageTitle,
     //   BTabs
    }
};
</script>

<style>
</style>