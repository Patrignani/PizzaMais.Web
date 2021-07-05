<template>
  <div class="input-grid-simple-component">
    <b-form-group :label="labelGroupName" :label-for="inputId">
      <div id="group-input-grid" :style="classDefinition()">
        <div
          v-if="validate.state === false && validate.using"
          class="d-block invalid-feedback"
        >
          {{ validate.message }}
        </div>
        <div class="div-grid">
          <AutoComplete
            :newClass="validateComponent"
            :useFormControl="false"
            labelGroupName=""
            :value="selectedId"
            v-on:input="selectedId = $event"
            v-on:inputText="selectedText = $event"
            :searchCallBack="searchCallBack"
            :disabled="!state"
            :valueText="selectedText"
          />
          <unicon
            id="icon-add-simple-component"
            class="icon-add"
            @click="add"
            name="plus-square"
            fill="#49a7c1"
          ></unicon>
        </div>
      </div>
    </b-form-group>
  </div>
</template>

<script>
import AutoComplete from "./AutoComplete.vue";
import { uuid } from "vue-uuid";
import { PAGE } from "../../utils/constants";

export default {
  components: {
    AutoComplete,
  },
  computed: {
    register() {
      return this.$store.getters[PAGE.BEFORESAVE];
    },
    load() {
      return this.$store.getters[PAGE.PAGELOAD];
    },
    validateComponent() {
      return this.validate.using
        ? this.validate.state === undefined || this.validate.state === true
          ? "input-grid"
          : "input-grid-erro"
        : "input-grid";
    },
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
    height: {
      type: Number,
      default: 200,
    },
    state: {
      type: Boolean,
    },
    labelGroupName: String,
    type: {
      default: "text",
    },
    inputId: String,
    value: {
      type: Array,
      default: () => [{ id: 0, text: "", status: 0 }],
    },
    disabled: {
      default: false,
    },
    searchCallBack: {
      type: Function,
      default: undefined,
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
  data() {
    return {
      selectedText: "",
      selectedId: null,
      historicItens: [],
    };
  },
  methods: {
    classDefinition() {
      return `overflow-y: auto;height: ${this.height}px;`;
    },
    updateStatus(text, status) {
      let objectValue = this.inputVal.filter((x) => x.text == text);
      if (objectValue.length == 1) {
        this.historicItens.push({
          text: text,
          oldValue: objectValue[0].status,
          newValue: status,
          date: new Date(),
        });

        objectValue[0].status = status;
        let index = this.inputVal.findIndex((x) => x.text == text);
        this.inputVal[index] = objectValue[0];
      }
    },
    newLine(text) {
      let id = uuid.v1();

      let deleteIconAction = () => {
        let deleteIcon = document.createElement("div");
        deleteIcon.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#49a7c1"><path d="M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18ZM20,6H16V5a3,3,0,0,0-3-3H11A3,3,0,0,0,8,5V6H4A1,1,0,0,0,4,8H5V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V8h1a1,1,0,0,0,0-2ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm7,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8H17Zm-3-1a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z"></path></svg>';
        deleteIcon.className = "unicon icon-delete";
        deleteIcon.id = `icon-${id}`;
        deleteIcon.onclick = () => {
          let value = document.getElementById(`input-${id}`).value;
          if (value) {
            this.updateStatus(value, 3);
            document.getElementById(id).remove();
          }
        };
        return deleteIcon;
      };

      let newInputAction = () => {
        let newInput = document.createElement("input");
        newInput.className = "input-grid dynamic";
        newInput.disabled = "true";
        newInput.value = text;
        newInput.id = `input-${id}`;
        return newInput;
      };

      let element = document.getElementById("group-input-grid");
      let div = document.createElement("div");
      div.id = id;
      div.className = "div-delete";
      div.append(newInputAction());
      div.append(deleteIconAction());
      element.append(div);
    },
    add() {
      if (this.selectedText) {
        if (
          this.inputVal.findIndex(
            (s) =>
              s?.status == 3 &&
              s?.text?.trim()?.toLowerCase() ==
                this.selectedText?.trim()?.toLowerCase()
          ) >= 0
        ) {
          let itensHistoric = this.historicItens.filter(
            (x) => x.text == this.selectedText
          );
          if (itensHistoric.length == 0) {
            this.updateStatus(this.selectedText, 1);
          } else {
            itensHistoric = itensHistoric.sort((a, b) => a.date - b.date);
            this.updateStatus(this.selectedText, itensHistoric[0].oldValue);
          }

          this.newLine(this.selectedText);
        } else if (
          this.inputVal.findIndex(
            (s) =>
              (s?.status == 1 || s?.status == 0) &&
              s?.text?.trim()?.toLowerCase() ==
                this.selectedText?.trim()?.toLowerCase()
          ) < 0
        ) {
          this.inputVal.push({
            id: this.selectedId,
            text: this.selectedText,
            status: 1,
          });

          this.newLine(this.selectedText);
        }
      }
      this.selectedText = "";
      this.selectedId = null;
    },
    buttonsVisible(state) {
      let valueVisible = state ? "visible" : "hidden";
      document.getElementById("icon-add-simple-component").style.visibility =
        valueVisible;
      let deleteIcon = document.getElementsByClassName("icon-delete");
      if (deleteIcon) {
        deleteIcon.forEach((x) => (x.style.visibility = valueVisible));
      }
    },
  },
  watch: {
    register() {
      this.selectedText = "";
      this.selectedId = null;
    },
    state(newValue) {
      this.buttonsVisible(newValue);
    },
    load() {
      this.selectedText = "";
      this.selectedId = null;

      let element = document.getElementsByClassName("div-delete");
      while (element.length > 0) {
        element[0].remove();
      }

      if (this.inputVal && this.inputVal.length > 0) {
        let createValues = this.inputVal.filter((x) => x.status == 0);
        createValues.forEach((x) => this.newLine(x.text));
        this.buttonsVisible(this.state);
      }
    },
  },
};
</script>

<style>
.input-grid {
  outline: 0;
  border-width: 0 0 1px;
  background-color: #fff;
  border-color: #ced4da;
}

.input-grid-erro {
  outline: 0;
  border-width: 0 0 1px;
  background-color: #fff;
  border-color: red;
}
.input-grid:focus {
  border-color: #80bdff;
  background-color: #fff;
}

.dynamic {
  height: 20px;
  width: 100%;
}

.icon-add {
  cursor: pointer;
  margin-top: 10px;
}

.icon-delete {
  cursor: pointer;
}

.div-delete {
  display: flex;
  align-items: stretch;
}

.div-grid {
  display: flex;
  align-items: stretch;
}
</style>