<template>
  <div class="grid-component">

  </div>
</template>

<script>
export default {
  computed: {
    trBodyClass() {
      return this.selectedFilter ? "tr-body" : "";
    },
    trClass() {
      return "padding: 8px;";
    },
    tdClass() {
      return "padding: 10px;";
    },
  },
  methods: {
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
          {nome: "first_name", orderby:false, visible:false},
          {nome: "first_name", orderby:false, visible:false},
          {nome: "first_name", orderby:false, visible:false}
      ],
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

.order {
  cursor: pointer;
}

.input-filter {
  align-items: center;
  margin-left: auto;
}
</style>