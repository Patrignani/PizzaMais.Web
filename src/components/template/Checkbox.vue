<template>
  <b-form-group :label="labelGroupName" :label-for="inputId">
    <b-form-checkbox
      :disabled="disabled"
      v-model="inputVal"
      :id="inputId"
      switch
    ></b-form-checkbox>
  </b-form-group>
</template>

<script>
export default {
  computed: {
    inputVal: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("checkBox", val);
      },
    },
  },
  props: {
    labelGroupName: String,
    inputId: String,
    disabled: {
      default: false,
    },
    value: {
      default: undefined,
    },
  },
};
</script>

<style>
</style>