<template>
  <div class="input-componennt">
    <div role="group" class="form-group" :id="id">
      <label for="borda-nome" class="d-block" :id="`${id}-label`">{{
        labelGroupName
      }}</label>
      <div>
        <money
          v-model="inputVal"
          v-bind="money"
          class="form-control"
          :class="[validate.state === false ?  'is-invalid': '']"
          :disabled="disabled"
        ></money>
        <div
          v-if="validate.state === false && validate.using"
          class="d-block invalid-feedback"
        >
          {{ validate.message }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { uuid } from "vue-uuid";
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
    labelGroupName: {
      type: String,
    },
    value: {
      type: Number,
      default: 0,
    },
     disabled: {
      default: false,
    },
    money: {
      type: Object,
      default() {
        return {
          decimal: ",",
          thousands: ".",
          prefix: "R$ ",
          precision: 2,
          masked: false,
        };
      },
    },
  },
  data(){
      return{
          id: uuid.v1(),
      }
  }
};
</script>

<style>
</style>