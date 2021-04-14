<template>
  <aside class="menu" v-show="isMenuVisible">
    <menu-item :options="options" />
  </aside>
</template>

<script>
import { APP, MENU } from "../../utils/constants";
import MenuItem from "./MenuItem.vue";
export default {
  name: "Menu",
  computed: {
    isMenuVisible() {
      return this.$store.getters[APP.TOGGLEMENU];
    },
  },
  components: { MenuItem },
  data() {
    return {
      options: [
        { icon: "clipboard-plus", text: "Pedido", action: MENU.PEDIDO },
        { icon: "pencil-square", text: "Cadastro", action: MENU.CADASTRO },
        { icon: "gear", text: "Configuração", action: MENU.CONFIGURACAO },
      ],
    };
  },
};
</script>

<style>
.menu {
  grid-area: menu;
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