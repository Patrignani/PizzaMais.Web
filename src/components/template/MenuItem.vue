<template>
  <div class="menu-item">
    <div class="novo-menu" v-for="item in options" :key="item.icon">
      <div class="icon" @click="selectMenu(item.action)">
        <a>
          <b-icon :icon="item.icon" class="bg-info"></b-icon>
        </a>
      </div>
      <div class="text">{{ item.text }}</div>
    </div>
  </div>
</template>

<script>
import { APP } from "../../utils/constants";
export default {
  props: {
    options: {
      type: Array,
      default: () => [{ icon: "", text: "", action: "" }],
    },
  },
  methods: {
    selectMenu(value) {
      this.$store.commit(APP.TOGGLESUBMENU);
      this.$store.commit(value);
    },
  },
};
</script>

<style>
.menu-item {
  width: 100%;
  height: 75px;
  color: #fff;
  display: flex;
  align-items: center;
  display: flex;
  flex-direction: column;
}
.novo-menu:hover {
  color: #fff;
  background-color: rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.novo-menu {
  border-bottom: 1px solid #fff;
  width: 100%;
}

.bg-info {
  margin-left: 15px;
  margin-top: 5px;
  font-size: 40px;
  padding: 5px;
  display: flex;
}

.text {
  text-align: center;
  font-size: 15px;
}
</style>