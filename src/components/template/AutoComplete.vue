<template>
  <div class="autocomplete-component">
    <div role="group" class="form-group">
      <label for="borda-nome" class="d-block">{{ labelGroupName }}</label>
      <div class="autocomplete">
        <input
          v-model="textVal"
          :disabled="disabled"
          id="autocomplete-input"
          type="text"
          autocomplete="off"
          :class="classDefinition"
        />
      </div>
      <div
        v-if="validate.state === false && validate.using"
        class="d-block invalid-feedback"
      >
        {{ validate.message }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    classDefinition() {
      let value = this.useFormControl ? "form-control" : "";
      (value +=
        this.validate.state === false && this.validate.using
          ? " is-invalid"
          : ""),
        (value += this.newClass ? ` ${this.newClass}` : "");
      return value;
    },
    inputVal: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
    textVal: {
      get() {
        return this.valueText;
      },
      set(val) {
        this.$emit("inputText", val);
      },
    },
  },
  props: {
    newClass: {
      type: String,
      default: null,
    },
    useFormControl: {
      type: Boolean,
      default: true,
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
    labelGroupName: {
      type: String,
    },
    disabled: {
      default: false,
    },
    value: {
      default: undefined,
    },
    valueText: {
      default: undefined,
    },
    options: [],
    searchCallBack: {
      type: Function,
      default: undefined,
    },
    getCallBack: {
      type: Function,
      default: undefined,
    },
  },
  data() {
    return {
      model: [],
    };
  },
  methods: {
    delay(callback, ms) {
      var timer = 0;
      return function () {
        var context = this,
          args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
          callback.apply(context, args);
        }, ms || 0);
      };
    },
    autocomplete(inp) {
      let self = this;
      var currentFocus;
      inp.addEventListener(
        "input",
        this.delay(async function () {
          var elementDiv,
            b,
            i,
            val = this.value;

          self.inputVal = null;

          if (self.searchCallBack)
            self.model = await self.searchCallBack(this.value);

          closeAllLists();
          if (!val) {
            return false;
          }
          currentFocus = -1;
          elementDiv = document.createElement("DIV");
          elementDiv.setAttribute("id", this.id + "autocomplete-list");
          elementDiv.setAttribute("class", "autocomplete-items");

          this.parentNode.appendChild(elementDiv);

          for (i = 0; i < self.model.length; i++) {
            if (
              self.model[i].texto.substr(0, val.length).toUpperCase() ==
              val.toUpperCase()
            ) {
              b = document.createElement("DIV");
              b.setAttribute("id", self.model[i].valor);
              b.innerHTML =
                "<strong>" +
                self.model[i].texto.substr(0, val.length) +
                "</strong>";
              b.innerHTML +=
                "<span class='texto'>" +
                self.model[i].texto.substr(val.length) +
                "</span><br>";
              if (self.model[i].descricao)
                b.innerHTML +=
                  "<span class='descricao'>" +
                  self.model[i].descricao +
                  "</span>";

              b.innerHTML +=
                "<input type='hidden' id='" +
                self.model[i].valor +
                "' value='" +
                self.model[i].texto +
                "'>";
              b.addEventListener("click", function () {
                let inputElement = this.getElementsByTagName("input")[0];
                self.textVal = inputElement.value;
                inp.id = inputElement.id;
                self.inputVal = inputElement.id;
                closeAllLists();
              });
              elementDiv.appendChild(b);
            }
          }
        }, 500)
      );

      inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) {
          //up
          /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
      });
      function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = x.length - 1;
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
      }
      function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
          x[i].classList.remove("autocomplete-active");
        }
      }
      function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
          if (elmnt != x[i] && elmnt != inp) {
            x[i].parentNode.removeChild(x[i]);
          }
        }
      }
      /*execute a function when someone clicks in the document:*/
      document.addEventListener("click", function (e) {
        closeAllLists(e.target);
      });
    },
  },
  async mounted() {
    this.model = this.options;
    this.autocomplete(document.getElementById("autocomplete-input"));
  },
};
</script>

<style>
.autocomplete-component {
  width: 100%;
}

.autocomplete-component input {
  width: 100%;
}

/*the container must be positioned relative:*/
.autocomplete {
  width: 100%;
  position: relative;
  display: inline-block;
}

.autocomplete-items {
  position: absolute;
  border: 1px solid #d4d4d4;
  border-bottom: none;
  border-top: none;
  z-index: 99;
  /*position the autocomplete items to be the same width as the container:*/
  top: 100%;
  left: 0;
  right: 0;
  overflow: auto;
  max-height: 230px;
}

.autocomplete-items div {
  cursor: pointer;
  background-color: #fff;
  border-bottom: 1px solid #d4d4d4;
  text-align: center;
}

.texto {
  font-size: 16px;
}

.descricao {
  font-size: 10px;
  color: gray;
}
/*when hovering an item:*/
.autocomplete-items div:hover {
  background-color: #e9e9e9;
}
</style>