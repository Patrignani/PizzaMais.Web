<template>
  <div class="sub-menu-item" v-if="isSubMenuVisible">
    <div class="items-menu" v-for="item in itens" :key="item.nome" @click="notSubMenu" >
      <router-link :to="item.router" class="item-router">
        <div class="item-menu-nome">
          {{ item.nome }}
        </div>

        <div class="item-menu-descricao">
          {{ item.descricao }}
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { APP } from "../../utils/constants";
export default {
  name: "SubMenu",
  computed: {
    itens() {
      return this.$store.getters[APP.MENU];
    },
    isSubMenuVisible() {
      return this.$store.getters[APP.TOGGLESUBMENU];
    }
  },
   methods: {
    notSubMenu(){
       this.$store.commit(APP.NOTSUBMENU);
    }
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
}

.item-menu-descricao {
  font-size: 13px;
  font-weight: 300;
  opacity: 0.5;
  display: flex;
}

.item-menu-nome {
  font-size: 14px;
  font-weight: 400;
}

.items-menu {
  border-bottom: 1px solid #fff;
  width: 100%;
  padding: 5px;
  margin: 1px;
  display: flex;
  flex-direction: column;
}

.items-menu:hover {
  color: #fff;
  background-color: rgba(0, 0, 0, 0.2);
  cursor: pointer;
}
.item-router {
  text-decoration: none;
  color: #fff;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
.item-router:hover {
  color: #fff;
  text-decoration: none;
}


</style>