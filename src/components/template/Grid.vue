<template>
  <div>
    <table class="table-th">
      <thead>
        <tr style="border: 1px solid">
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
                    @click="field.filter = !field.filter"
                  ></unicon>

                  <unicon
                    name="filter-slash"
                    v-if="field.filter"
                    :fill="iconColor"
                    @click="field.filter = !field.filter"
                  ></unicon>
                </div>
              </div>
            </div>
            <div v-if="field.filter">
              <b-form-input
                v-if="field.type == 'text' || field.type == 'number'"
                v-model="filtros[field.nome]"
                :type="field.type"
                v-on:keyup="filterClick"
              ></b-form-input>

              <b-form-checkbox
                @input="checkBoxChange"
                v-if="field.type == 'bool'"
                v-model="filtros[field.nome]"
                switch
              ></b-form-checkbox>
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
      >
        <table class="table">
          <tbody :class="trBodyClass">
            <tr v-for="item in itens" :key="item.id">
              <td :style="tdClass(key)" v-for="(i, key) in item" :key="i">
                {{ i }}
              </td>
              <td @click="edit(item.id)" :style="tdClass('editar')">
                <unicon name="edit" fill="#000"></unicon>
              </td>
              <td @click="deletar(item.id)" :style="tdClass('excluir')">
                <unicon name="trash-alt" fill="#000"></unicon>
              </td>
            </tr>
          </tbody>
          <span>{{ gridMessage }}</span>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
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
    async checkBoxChange() {
      this.loadGrid(true);
    },
    ordebyClick(field) {
      if (field.orderby < 2) {
        field.orderby++;
      } else {
        field.orderby = 0;
      }
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

      return `height: ${heigth}px; overflow: auto;border-left:1px solid; border-bottom:1px solid;border-right:1px solid;`;
    },
    tdClass(value) {
      let field = this.fields.find((field) => field.field == value);
      let cursos = "default";

      if (value == "excluir" || value == "editar") cursos = "pointer";

      return `padding: 10px;width:${field.width}%; cursor: ${cursos};`;
    },
    trClass(value) {
      return `padding: 5px; width:${value}%; cursor:default`;
    },
    async filterClick(e) {
      if (e.keyCode === 13) {
        this.loadGrid(true);
      }
    },
    handleScroll() {
      if (this.itens.length > 0) {
        var element = document.getElementById("scroll-table");
        if (element.offsetHeight + element.scrollTop >= element.scrollHeight) {
          alert("end reached");
        }
      }
    },
    async loadGrid(reload = false) {
      let service = require(`../../services/${this.service}`);
      let valores = await service.obterTodos(this.filtros);
      if (valores.status == 200) {
        var data = valores.data;

        if (reload) this.itens = [];

        for (var i = 0; i < data.length; i++) {
          let value = {};
          this.colunas.forEach((element) => {
            if (element.type && element.type === "bool") {
              value[element.field] = data[i][element.field] ? "Sim" : "Não";
            } else {
              value[element.field] = data[i][element.field];
            }
          });
          this.itens.push(value);
        }
      } else {
        this.$toast.error(
          "Ocorreu um erro para carregar os dados. Entre em contato com o administrador do sistema!"
        );
      }
    },
  },
  data() {
    return {
      gridMessage: "Não existe Itens a serem exibidos",
      itens: [],
      filtros: {},
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
  margin-bottom: 1rem;
  color: #212529;
  cursor: default;
}
/* .grid-component table,
td,
th {
  border: 1px solid #dee2e6;
} */

.table-th {
  width: 100%;
}

.th-grid {
  background-color: #49a7c1;
  color: #fff;
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
  border: 1px solid red;
}

.order {
  cursor: pointer;
}

.input-filter {
  align-items: center;
  margin-left: auto;
}
</style>