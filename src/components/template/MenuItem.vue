<template>
  <div class="menu-item">
    <div class="novo-menu" v-for="item in options" :key="item.icon"  @click="selectMenu(item.action)">
      <div class="icon">
        <a>
          <b-icon :icon="item.icon" class="icon"></b-icon>
        </a>
      </div>
      <div class="text">{{ item.text }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      default: () => [{ icon: "", text: "", action: "" }],
    },
  },
  methods: {
    selectMenu(value) {
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
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently */
}

.icon {
  text-align: center;
  margin-left: 9px;
  font-size: 40px;
  display: flex;
}

.text {
  text-align: center;
  font-size: 15px;
}
</style>