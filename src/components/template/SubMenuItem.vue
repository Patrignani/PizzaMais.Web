<template>
  <div class="sub-menu-item" v-if="isSubMenuVisible">
    <div class="items-menu" v-for="item in itens" :key="item.nome">
      {{ item.nome }}
    </div>
  </div>
</template>

<script>
import { MENU, APP } from "../../utils/constants";
export default {
  name: "SubMenu",
  computed: {
    itens() {
      return this.$store.getters[MENU.MENU];
    },
    isSubMenuVisible() {
      return this.$store.getters[APP.TOGGLESUBMENU];
    },
  },
};
</script>

<style>
.sub-menu-item {
  grid-area: submenu;
  background-image: linear-gradient(
    to right top,
    #8493aa,
    #808da7,
    #7c87a3,
    #7a819f,
    #777b9b
  );
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
</style>