<template>
  <div class="borda-component">
    <page-title icon="utensils" icon-type="2" main="Borda" sub="Lista" />

    <Form :rows="rows" :save="save"></Form>
  </div>
</template>

<script>
import PageTitle from "../../components/template/PageTitle";
import Form from "../../components/template/Form";
export default {
  components: {
    PageTitle,
    Form
  },
  computed: {
    rows() {
      return [
        {
          columns: [
            {
              component: {
                 labelGroupName: "Id",
                inputId:"borda-id",
                value: this.model.id,
                disabled:false,
                validate:{
                  using: false,
                  state:false,
                  message:""
                }
              }
            }
          ]
        }
      ];
    }
  },
    data() {
    return {
      model: {
        id: 0,
        descricao: "",
        valor: 0,
        ativo:true
      },
      validate: {
        descricao: {
          isValid: undefined,
          message: "Campo obrigatório",
          Valid: () => this.model.descricao.length > 1,
        },
      },
      state: true,
      showTop: false,
      message: "",
      variant: "success",
    };
  },
  methods:{
    save(){
      console.log(this.model.id)
    }
  }
};
</script>

<style>
</style>
