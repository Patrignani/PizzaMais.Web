<template>
  <div>
    <table class="table-th">
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
              <div style="display:flex" v-if="field.icons">
              <div class="order">
                <unicon
                  name="arrow-circle-down"
                  v-if="field.orderby"
                  :fill="color"
                  @click="field.orderby = !field.orderby"
                ></unicon>
                <unicon
                  name="arrow-circle-up"
                  v-if="!field.orderby"
                  :fill="color"
                  @click="field.orderby = !field.orderby"
                ></unicon>
              </div>
              <div class="filter">
                <unicon
                  name="filter"
                  v-if="!field.visible"
                  :fill="color"
                  @click="field.visible = !field.visible"
                ></unicon>

                <unicon
                  name="filter-slash"
                  v-if="field.visible"
                  :fill="color"
                  @click="field.visible = !field.visible"
                ></unicon>
              </div>
              </div>
            </div>

            <div v-if="field.visible">
              <input
                class="input-filter"
                type="text"
                v-on:keyup="filterClick"
              />
            </div>
          </th>
        </tr>
      </thead>
    </table>
    <div id="table-wrapper" class="table">
      <div :style="scrollBody()">
        <table class="table">
          <tbody :class="trBodyClass">
            <tr v-for="item in items" :key="item.id">
              <td :style="tdClass(key)" v-for="(i, key) in item" :key="i">
                {{ i }}
              </td>
              

            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    trBodyClass() {
      return this.selectedFilter ? "tr-body" : "";
    },
  },
  methods: {
    scrollBody() {
      let heightContent = window.screen.availHeight - 60 - 77 - 20;
      let heigth = (heightContent * 69) / 100;

      return `height: ${heigth}px; overflow: auto;border:1px solid;`;
    },
    tdClass(value) {
      let field = this.fields.find((field) => field.field == value);

      return `padding: 10px;width:${field.width}%;`;
    },
    trClass(value) {
      return `padding: 8px; width:${value}%;`;
    },
    filterClick(e) {
      if (e.keyCode === 13) {
        alert("Enter was pressed");
      } else if (e.keyCode === 50) {
        alert("@ was pressed");
      }
    },
  },
  data() {
    return {
      selectedFilter: true,
      color: "#fff",
      orderby: true,
      visible: false,
      fields: [
        {
          nome: "first_name",
          orderby: false,
          visible: false,
          width: 37,
          field: "age",
          icons:true
        },
        {
          nome: "first_name",
          orderby: false,
          visible: false,
          width: 37,
          field: "first_name",
           icons:true
        },
        {
          nome: "first_name",
          orderby: false,
          visible: false,
          width: 18,
          field: "last_name",
           icons:true
        },
          {
          nome: "Editar",
          width: 5,
          field: "editar",
           icons:false
        },
          {
          nome: "Excluir",
          width: 5,
          field: "excluir",
           icons:false
        }
      ],
      items: [
        { age: 40, first_name: "Dickerson", last_name: "Macdonald"},
        { age: 21, first_name: "Larsen", last_name: "Shaw" },
        { age: 89, first_name: "Geneva", last_name: "Wilson" },
        { age: 40, first_name: "Dickerson", last_name: "Macdonald" },
        { age: 21, first_name: "Larsen", last_name: "Shaw" },
        { age: 89, first_name: "Geneva", last_name: "Wilson" },
        { age: 40, first_name: "Dickerson", last_name: "Macdonald" },
        { age: 21, first_name: "Larsen", last_name: "Shaw" },
        { age: 89, first_name: "Geneva", last_name: "Wilson" },
        { age: 40, first_name: "Dickerson", last_name: "Macdonald" },
        { age: 21, first_name: "Larsen", last_name: "Shaw" },
        { age: 89, first_name: "Geneva", last_name: "Wilson" },
        { age: 40, first_name: "Dickerson", last_name: "Macdonald" },
        { age: 21, first_name: "Larsen", last_name: "Shaw" },
        { age: 89, first_name: "Geneva", last_name: "Wilson" },
        { age: 40, first_name: "Dickerson", last_name: "Macdonald" },
        { age: 21, first_name: "Larsen", last_name: "Shaw" },
        { age: 89, first_name: "Geneva", last_name: "Wilson" },
        { age: 40, first_name: "Dickerson", last_name: "Macdonald" },
        { age: 21, first_name: "Larsen", last_name: "Shaw" },
        { age: 89, first_name: "Geneva", last_name: "Wilson" },
        { age: 40, first_name: "Dickerson", last_name: "Macdonald" },
        { age: 21, first_name: "Larsen", last_name: "Shaw" },
        { age: 89, first_name: "Geneva", last_name: "Wilson" },
        { age: 40, first_name: "Dickerson", last_name: "Macdonald" },
        { age: 21, first_name: "Larsen", last_name: "Shaw" },
        { age: 89, first_name: "Geneva", last_name: "Wilson" },
        { age: 40, first_name: "Dickerson", last_name: "Macdonald" },
        { age: 21, first_name: "Larsen", last_name: "Shaw" },
        { age: 89, first_name: "Geneva", last_name: "Wilson" },
        { age: 40, first_name: "Dickerson", last_name: "Macdonald" },
        { age: 21, first_name: "Larsen", last_name: "Shaw" },
        { age: 89, first_name: "Geneva", last_name: "Wilson" },
        { age: 40, first_name: "Dickerson", last_name: "Macdonald" },
        { age: 21, first_name: "Larsen", last_name: "Shaw" },
        { age: 89, first_name: "Geneva", last_name: "Wilson" },
        { age: 40, first_name: "Dickerson", last_name: "Macdonald" },
        { age: 21, first_name: "Larsen", last_name: "Shaw" },
        { age: 89, first_name: "Geneva", last_name: "Wilson" },
        { age: 40, first_name: "Dickerson", last_name: "Macdonald" },
        { age: 21, first_name: "Larsen", last_name: "Shaw" },
        { age: 89, first_name: "Geneva", last_name: "Wilson" },
        { age: 40, first_name: "Dickerson", last_name: "Macdonald" },
        { age: 21, first_name: "Larsen", last_name: "Shaw" },
        { age: 89, first_name: "Geneva", last_name: "Wilson" },
        { age: 40, first_name: "Dickerson", last_name: "Macdonald" },
        { age: 21, first_name: "Larsen", last_name: "Shaw" },
        { age: 89, first_name: "Geneva", last_name: "Wilson" },
        { age: 40, first_name: "Dickerson", last_name: "Macdonald" },
        { age: 21, first_name: "Larsen", last_name: "Shaw" },
        { age: 89, first_name: "Geneva", last_name: "Wilson" },
        { age: 40, first_name: "Dickerson", last_name: "Macdonald" },
        { age: 21, first_name: "Larsen", last_name: "Shaw" },
        { age: 89, first_name: "Geneva", last_name: "Wilson" },
        { age: 40, first_name: "Dickerson", last_name: "Macdonald" },
        { age: 21, first_name: "Larsen", last_name: "Shaw" },
        { age: 89, first_name: "Geneva", last_name: "Wilson" },
        { age: 40, first_name: "Dickerson", last_name: "Macdonald" },
        { age: 21, first_name: "Larsen", last_name: "Shaw" },
        { age: 89, first_name: "Geneva", last_name: "Wilson" },
        { age: 40, first_name: "Dickerson", last_name: "Macdonald" },
        { age: 21, first_name: "Larsen", last_name: "Shaw" },
        { age: 89, first_name: "Geneva", last_name: "Wilson" },
        { age: 40, first_name: "Dickerson", last_name: "Macdonald" },
        { age: 21, first_name: "Larsen", last_name: "Shaw" },
        { age: 89, first_name: "Geneva", last_name: "Wilson" },
        { age: 40, first_name: "Dickerson", last_name: "Macdonald" },
        { age: 21, first_name: "Larsen", last_name: "Shaw" },
        { age: 89, first_name: "Geneva", last_name: "Wilson" },
        { age: 40, first_name: "Dickerson", last_name: "Macdonald" },
        { age: 21, first_name: "Larsen", last_name: "Shaw" },
        { age: 89, first_name: "Geneva", last_name: "Wilson" },
        { age: 40, first_name: "Dickerson", last_name: "Macdonald" },
        { age: 21, first_name: "Larsen", last_name: "Shaw" },
        { age: 89, first_name: "Geneva", last_name: "Wilson" },
      ],
    };
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
.grid-component table,
td,
th {
  border: 1px solid #dee2e6;
}

.table-th {
  width: 100%;
  border: 2px solid;
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
  cursor: pointer;
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