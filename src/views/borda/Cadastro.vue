<template>
  <div class="borda-component">
    <page-title icon="utensils" icon-type="2" main="Borda" sub="Cadastro" />

    <b-alert
      v-model="showTop"
      class="position-fixed fixed-bottom m-0 rounded-0"
      style="z-index: 2000"
      :variant="variant"
      dismissible
    >
      {{ message }}
    </b-alert>

    <div class="body">
      <b-card>
        <b-form @submit="onSubmit">
          <b-row class="body-col">
            <b-col sm="1">
              <Input
                labelGroupName="Id"
                inputId="borda-id"
                :value="model.id"
                :disabled="true"
                v-on:input="model.id = $event"
              />
            </b-col>
            <b-col sm="7">
              <Input
                labelGroupName="Descrição"
                inputId="borda-descricao"
                :value="model.descricao"
                v-on:input="model.descricao = $event"
                :disabled="!state"
                :validate="{
                  using: true,
                  state: validate.descricao.isValid,
                  message: validate.descricao.message,
                }"
              />
            </b-col>
            <b-col sm="3">
              <Input
                labelGroupName="Valor"
                inputId="borda-valor"
                :value="model.valor"
                v-on:input="model.valor = $event"
                :disabled="!state"
                type="number"
              />
            </b-col>
            <b-col sm="1">
              <Checkbox
                labelGroupName="Ativo"
                inputId="borda-ativo"
                :disabled="!state"
                :value="model.ativo"
                v-on:checkBox="model.ativo = $event"
              />
            </b-col>
          </b-row>
          <ButtonsForm :configButtons="configButtons" />
        </b-form>
      </b-card>
    </div>
  </div>
</template>

<script>
import PageTitle from "../../components/template/PageTitle";
import Input from "../../components/template/Input";
import ButtonsForm from "../../components/template/ButtonsForm";
import Checkbox from "../../components/template/Checkbox";

export default {
  components: {
    PageTitle,
    Input,
    ButtonsForm,
    Checkbox,
  },
  computed: {
    configButtons() {
      return {
        save: () => {
          this.onSubmit();
        },
        back: () => {
          this.$router.go(-1);
        },
        edit: () => {
          this.state = true;
        },
        cancel: () => {
          if (this.model.id == 0) {
            this.$router.go(-1);
          } else {
            this.state = false;
          }
        },
        state: this.state,
      };
    },
  },
  data() {
    return {
      model: {
        id: 0,
        descricao: "",
        valor: 0,
        ativo: true,
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
  methods: {
    onSubmit() {
      this.message = "Salvo com sucesso!";
      this.showTop = true;

      setTimeout(() => (this.showTop = false), 1500);

      this.state = false;
      this.validate.descricao.isValid = this.validate.descricao.Valid();

      if (this.validate.descricao.isValid) console.log("Ok");
    },
  },
  created() {
    if (this.$route.params.id && this.$route.params.id != "new")
      this.model.id = parseInt(this.$route.params.id);

    if (this.$route.params.state != "edit") this.state = false;
  },
};
</script>

<style>
</style>