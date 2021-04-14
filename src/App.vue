<template>
  <div id="app" :class="[isMenuVisible 
  ? isSubMenuVisible 
    ? 'hide-menu-submenu' 
    : ''
  : 'hide-menu']">
    <Header title="Pizza Mais" :hideToggle="false" />
    <Menu />
    <SubMenuItem />
    <Content />
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/template/Header";
import Menu from "@/components/template/Menu";
import Content from "@/components/template/Content";
import Footer from "@/components/template/Footer";
import SubMenuItem from "@/components/template/SubMenuItem";
import { APP } from "./utils/constants";
export default {
  name: "App",
  components: {
    Header,
    Menu,
    Footer,
    Content,
    SubMenuItem
  },
  computed: {
    isMenuVisible() {
      return this.$store.getters[APP.TOGGLEMENU];
    },
    isSubMenuVisible(){
       return this.$store.getters[APP.TOGGLESUBMENU];
    }
  }
};
</script>

<style>
* {
  font-family: "lato", "sans-serif";
}

body {
  margin: 0;
}

#app {
  -webkit-font-smoothing: antialiased;
  -mox-osx-font-smoothing: grayscale;
  height: 100vh;
  display: grid;
  grid-template-rows: 60px 1fr 40px;
  grid-template-columns: 88px 1fr;
  grid-template-areas:
    "header header"
    "menu content"
    "menu footer";
}

#app.hide-menu {
  grid-template-areas:
    "header header"
    "content content"
    "footer footer";
}

#app.hide-menu-submenu {
   -webkit-font-smoothing: antialiased;
  -mox-osx-font-smoothing: grayscale;
  height: 100vh;
  display: grid;
  grid-template-rows: 60px 1fr 40px;
  grid-template-columns: 88px 215px 1fr;
  grid-template-areas:
    "header header header"
    "menu submenu content"
    "menu submenu footer";
}
</style>