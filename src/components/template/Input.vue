<template>
  <div class="input-componennt">
    <b-form-group :label="labelGroupName" :label-for="inputId">
      <b-form-input
        :id="inputId"
        v-model="inputVal"
        :disabled="disabled"
        :state="validate.state"
        :type="type"
        :formatter="format"
      ></b-form-input>
      <b-form-invalid-feedback :state="validate.state" v-if="validate.using">
        {{ validate.message }}
      </b-form-invalid-feedback>
    </b-form-group>
  </div>
</template>

<script>
export default {
  computed: {
    inputVal: {
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
    maxlength: {
      type: Number,
      default: undefined,
    },
    minlength: {
      type: Number,
      default: 0,
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
  methods: {
    format(e) {
      if (this.maxlength) {
        return String(e).substring(this.minlength, this.maxlength)
      }

      return e
    },
  },
};
</script>

<style>
</style>