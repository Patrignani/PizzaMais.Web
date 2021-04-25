<template>
  <div class="grid-component">
    <b-table
      :items="items"
      :fields="fields"
      head-variant="light"
      hover
      responsive="sm"
    >
      <template #cell(Editar)="row">
        <b-button size="sm" @click="row.toggleDetails" variant="primary" >
          <unicon name="edit" fill="#fff"></unicon>
        </b-button>
      </template>

            <template #cell(Excluir)="row">
        <b-button size="sm" @click="row.toggleDetails" variant="primary" >
          <unicon name="trash-alt" fill="#fff"></unicon>
        </b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedFilter: true,
      color: "#fff",
      orderby: true,
      visible: false,
      fields: ["first_name", "age", "last_name", "Editar", "Excluir"],
      items: [
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

.order {
  cursor: pointer;
}

.input-filter {
  align-items: center;
  margin-left: auto;
}

.edit-button{
  background-color:  #28a745
}
</style>