<template>
  <div class="content" @click="notSubMenu">
      <router-view></router-view>
  </div>
</template>

<script>
import { APP } from "../../utils/constants";
export default {
  name: "Content",
  methods:{
    notSubMenu(){
       this.$store.commit(APP.NOTSUBMENU);
    }
  }
};
</script>

<style>
.content {
  grid-area: content;
  background-color: #efefef;
}
</style>