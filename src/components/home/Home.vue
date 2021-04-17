<template>
  <div class="home-component">
    <page-title icon="fa fa-home" main="Dashboard" sub="infos" />

   <div class="body">
      <div class="tabs-component">
        <b-tabs v-model="tabIndex" small card>
          <b-tab title="General">{{ $route.params.id }}</b-tab>
          <b-tab title="Edit profile">
            I'm the second tab
            <b-card>I'm the card in tab</b-card>
          </b-tab>
          <b-tab title="Premium Plan" disabled>Sibzamini!</b-tab>
          <b-tab title="Info">I'm the last tab</b-tab>
        </b-tabs>
      </div>
    </div>

    <div class="body">
      
      <b-tabs v-model="tabIndex" small card>
        <b-tab title="General"><template /></b-tab>
        <b-tab title="Edit profile">
          I'm the second tab
          <b-card>I'm the card in tab</b-card>
        </b-tab>
        <b-tab title="Premium Plan" disabled>Sibzamini!</b-tab>
        <b-tab title="Info">I'm the last tab</b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import PageTitle from "../template/PageTitle";
import { BTabs } from "bootstrap-vue";

export default {
  name: "Home",
  components: { PageTitle, BTabs },
  data() {
    return {
      template: "<div></div>",
    };
  },
};
</script>

<style>
.home-component .body {
  padding: 20px;
}
.tabs-component {
  box-shadow: 0px 1px 4px rgb(56, 56, 56);
}
</style>