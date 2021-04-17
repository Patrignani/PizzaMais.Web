<template>
  <footer class="footer" @click="notSubMenu">
      <span>Copyrigth <strong>Pizza Mais</strong> 2021</span>
  </footer>
</template>

<script>
import { APP } from "../../utils/constants";
export default {
name:'Footer',
methods:{
    notSubMenu(){
       this.$store.commit(APP.NOTSUBMENU);
    }
  }
}
</script>

<style>
.footer{
    grid-area: footer;
    background-color: #DDD;
    color:#333;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 10px;

}
</style>