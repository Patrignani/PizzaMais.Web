<template>
  <div id="grid-component" class="grid-component">
    <table id="table-th" class="table-th">
      <thead>
        <tr>
          <th
            class="th-grid"
            v-for="field in fields"
            :key="field.nome"
            :style="trClass(field.width)"
          >
            <div class="th-grid-body">
              <div>{{ field.nome }}</div>
              <div style="display: flex">
                <div class="order">
                  <unicon
                    name="minus-circle"
                    v-if="field.orderby == 0"
                    :fill="iconColor"
                    @click="ordebyClick(field)"
                  ></unicon>
                  <unicon
                    name="arrow-circle-down"
                    v-if="field.orderby == 1"
                    :fill="iconColor"
                    @click="ordebyClick(field)"
                  ></unicon>
                  <unicon
                    name="arrow-circle-up"
                    v-if="field.orderby == 2"
                    :fill="iconColor"
                    @click="ordebyClick(field)"
                  ></unicon>
                </div>
                <div class="filter" v-if="field.filter != undefined">
                  <unicon
                    name="filter"
                    v-if="!field.filter"
                    :fill="iconColor"
                    @click="filterIconClick(field)"
                  ></unicon>

                  <unicon
                    name="filter-slash"
                    v-if="field.filter"
                    :fill="iconColor"
                    @click="filterIconClick(field)"
                  ></unicon>
                </div>
              </div>
            </div>
            <div v-if="field.filter">
              <b-form-input
                size="sm"
                v-if="field.type == 'text' || field.type == 'number'"
                v-model="filtros[field.field]"
                :type="field.type"
                v-on:keyup="filterClick"
              ></b-form-input>

              <b-form-checkbox
                @input="checkBoxChange"
                v-if="field.type == 'bool'"
                v-model="filtros[field.field]"
                switch
              ></b-form-checkbox>

              <money
                v-if="field.type == 'money'"
                v-model="filtros[field.field]"
                v-bind="money"
                class="form-control form-control-sm"
                @keyup.native="filterClick"
              ></money>
            </div>
          </th>
        </tr>
      </thead>
    </table>
    <div id="table-wrapper" class="table">
      <div
        id="scroll-table"
        v-on:scroll.passive="handleScroll"
        :style="scrollBody()"
        class="scroll-table"
      >
        <table class="table">
          <tbody :class="trBodyClass">
            <tr v-for="item in itens" :key="item.id">
              <td :style="tdClass(key)" v-for="(i, key) in item" :key="i">
                {{ formatBody(i, key) }}
              </td>
              <td @click="edit(item.id)" :style="tdClass('editar')">
                <unicon name="edit" fill="#000"></unicon>
              </td>
              <td @click="deletar(item.id)" :style="tdClass('excluir')">
                <unicon name="trash-alt" fill="#000"></unicon>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { APP } from "../../utils/constants";
export default {
  props: {
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
    rowHouve: {
      type: Boolean,
      default: true,
    },
    iconColor: {
      type: String,
      default: "#fff",
    },
    service: {
      type: String,
    },
    rota: {
      type: String,
    },
    colunas: {
      type: Array,
    },
  },
  computed: {
    trBodyClass() {
      return this.rowHouve ? "tr-body" : "";
    },
    fields() {
      let fields = [];

      for (let i = 0; i < this.colunas.length; i++) {
        fields[i] = this.colunas[i];
      }

      fields.push({
        nome: "Editar",
        width: 5,
        field: "editar",
        icons: false,
      });
      fields.push({
        nome: "Excluir",
        width: 5,
        field: "excluir",
        icons: false,
      });

      return fields;
    },
  },
  methods: {
    formatBody(value, key) {
      let field = this.fields.find((field) => field.field == key);
      if (field.type == "money") value = this.formartCurrency(value);
      if (field.type == "bool") value = value ? "Sim" : "Não";

      return value;
    },
    async checkBoxChange() {
      this.loadGrid(true);
    },
    async filterIconClick(field) {
      field.filter = !field.filter;

      if (field.type == "money") this.filtros[field.field] = 0;
      else this.filtros[field.field] = null;

      if (!field.filter) this.loadGrid(true);
    },
    async ordebyClick(field) {
      if (this.filtros["orderbyAsc"] == undefined)
        this.filtros["orderbyAsc"] = [];
      if (this.filtros["orderbyDesc"] == undefined)
        this.filtros["orderbyDesc"] = [];

      let actionDelete = (field) => {
        this.filtros.orderbyAsc = this.filtros.orderbyAsc.filter(
          (order) => order != field.field
        );
        this.filtros.orderbyDesc = this.filtros.orderbyDesc.filter(
          (order) => order != field.field
        );
      };

      if (field.orderby < 2) {
        field.orderby++;
        actionDelete(field);
        if (field.orderby == 1) this.filtros.orderbyDesc.push(field.field);
        else this.filtros.orderbyAsc.push(field.field);
      } else {
        field.orderby = 0;
        actionDelete(field);
      }

      await this.loadGrid(true);
    },
    async deletar(item) {
      let confirmado = await this.$bvModal.msgBoxConfirm(
        "Deseja realmente deletar esse item?"
      );
      if (confirmado) {
        let service = require(`../../services/${this.service}`);
        let retorno = await service.deletar(item);
        if (retorno.status == 200) {
          await this.loadGrid(true);
          this.$toast.success("Deletado!");
        } else {
          this.$toast.error(
            "Ocorreu um erro. Entre em contato com o administrador do sistema!"
          );
        }
      }
    },
    edit(item) {
      this.$router.replace({ path: `/${this.rota}/${item}/edit` });
    },
    scrollBody() {
      let heightContent = window.screen.availHeight - 60 - 77 - 20;
      let heigth = (heightContent * 69) / 100;

      return `height: ${heigth}px; height-max:${heigth}px;height-min:${heigth}px;`;
    },
    tdClass(value) {
      let field = this.fields.find((field) => field.field == value);
      let cursos = "default";
      let width = this.obterWidth(field.width);

      if (value == "excluir" || value == "editar") cursos = "pointer";

      return `width:${width}px;max-width:${width}px; min-width:${width}px;cursor: ${cursos};`;
    },
    trClass(value) {
      let width = this.obterWidth(value);
      return `width:${width}px;`;
    },
    obterWidth(value) {
      let menu = this.$store.getters[APP.TOGGLEMENU];
      let subMenu = this.$store.getters[APP.TOGGLESUBMENU];
      let widthContent = window.screen.availWidth - 15;

      widthContent -= menu ? 110 : 20;

      if (subMenu) widthContent -= 200;

      let width = (widthContent * value) / 100;

      return width;
    },
    async filterClick(e) {
      if (e.keyCode === 13) {
        await this.loadGrid(true);
      }
    },
    async handleScroll() {
      if (this.itens.length > 0) {
        var element = document.getElementById("scroll-table");
        if (element.offsetHeight + element.scrollTop >= element.scrollHeight) {
          this.filtros.offset += this.filtros.Limit;
          await this.loadGrid();
        }
      }
    },
    async loadGrid(reload = false) {
      let service = require(`../../services/${this.service}`);

      if (reload) this.filtros.offset = 0;

      let valores = await service.obterTodos(this.filtros);
      if (valores.status == 200) {
        var data = valores.data;

        if (reload) this.itens = [];

        for (var i = 0; i < data.length; i++) {
          let value = {};
          this.colunas.forEach((element) => {
            value[element.field] = data[i][element.field];
          });
          this.itens.push(value);
        }
      } else {
        this.$toast.error(
          "Ocorreu um erro para carregar os dados. Entre em contato com o administrador do sistema!"
        );
      }
    },
    formartCurrency(value) {
      var formatter = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      });

      return formatter.format(value);
    },
  },
  data() {
    return {
      gridMessage: "Não existe Itens a serem exibidos",
      itens: [],
      filtros: {
        offset: 0,
        Limit: 50,
      },
    };
  },
  async mounted() {
    await this.loadGrid();
  },
};
</script>

<style>
.grid-component table {
  width: 100%;
  color: #212529;
  cursor: default;
}
.table {
  background-color: #fff;
}
.table td {
  word-wrap: break-word;
  padding: 5px;
}
.table-th {
  width: 100%;
  box-shadow: 0px 0px 8px rgb(56, 56, 56);
}

.th-grid {
  background-color: #49a7c1;
  color: #fff;
  padding: 5px;
  cursor: default;
}

.th-grid-body {
  display: flex;
  flex-direction: row;
  text-align: center;
}

.filter {
  margin-left: auto;
  cursor: pointer;
}

.tr-body :hover {
  color: #fff;
  background-color: rgb(202, 196, 196);
}

#table-wrapper {
  position: relative;
}

#table-wrapper table {
  width: 100%;
}

#table-wrapper table thead th .text {
  position: absolute;
  top: -20px;
  z-index: 2;
  height: 20px;
  width: 35%;
}
.order {
  cursor: pointer;
}
.input-filter {
  align-items: center;
  margin-left: auto;
}
.grid-component {
  font-size: 15px;
}
.scroll-table {
  box-shadow: 0px 0px 8px rgb(56, 56, 56);
  overflow: auto;
}
</style>