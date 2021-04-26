<template>
  <div class="page-title">
    <h1 v-if="icon">
      <unicon v-if="iconType == 2" :name="icon" fill="#49a7c1"></unicon>
      <b-icon v-if="iconType == 1" :icon="icon"></b-icon>{{ main }}
    </h1>
    <h2>{{ sub }}</h2>
  </div>
</template>

<script>
export default {
  name: "PageTitle",
  props: ["icon", "main", "sub", "iconType"],
};
</script>

<style>
.page-title {
  background-color: #fff;
  padding: 0 12px;
  box-shadow: 0px 1px 4px rgb(56, 56, 56);
  position: sticky;
  flex-direction: column;
  color: #49a7c1;
  height: 77px;
}

.page-title h1 {
  margin: 0px;
}

.page-title h2 {
  margin-top: 5px;
  font-size: 1.3rem;
}
</style>