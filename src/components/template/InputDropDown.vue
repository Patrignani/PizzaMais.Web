<template>
  <div class="input-dropdown-componennt">
    <b-form-group :label="labelGroupName" :label-for="inputId">
      <b-form-select
        :id="inputId"
        :disabled="disabled"
        :state="validate.state"
        v-model="selected"
        :options="options"
      ></b-form-select>

      <b-form-invalid-feedback :state="validate.state" v-if="validate.using">
        {{ validate.message }}
      </b-form-invalid-feedback>
    </b-form-group>
  </div>
</template>

<script>
export default {
  computed: {
    selected: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
  props: {
    labelGroupName: String,
    type: {
      default: "text",
    },
    inputId: String,
    value: {
      default: undefined,
    },
    disabled: {
      default: false,
    },
    options: {
      type: Array,
      default: () => [{ value: "", text: "" }],
    },
    validate: {
      type: Object,
      default() {
        return {
          using: false,
          state: undefined,
          message: "",
        };
      },
    },
  },
};
</script>

<style>
</style>