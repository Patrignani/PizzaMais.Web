<template>
  <div class="unidade-medida-component">
    <page-title
      icon="ruler"
      icon-type="2"
      main="Unidade de Medida"
      sub="Cadastro"
    />

    <div class="body">
      <b-card>
        <b-form @submit="onSubmit">
          <b-row class="body-col">
            <b-col sm="1">
              <Input
                labelGroupName="Id"
                inputId="unidade-medida-id"
                :value="model.id"
                :disabled="true"
                v-on:input="model.id = $event"
              />
            </b-col>
            <b-col sm="7">
              <Input
                labelGroupName="Descrição"
                inputId="unidade-medida-descricao"
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
                labelGroupName="Sigla"
                inputId="unidade-medida-sigla"
                :value="model.sigla"
                v-on:input="model.sigla = $event"
                :disabled="!state"
                :validate="{
                  using: true,
                  state: validate.sigla.isValid,
                  message: validate.sigla.message,
                }"
              />
            </b-col>
            <b-col sm="1">
              <Checkbox
                labelGroupName="Ativo"
                inputId="unidade-medida-ativo"
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
        sigla: "",
        descricao: "",
        ativo: true,
      },
      validate: {
        sigla: {
          isValid: undefined,
          message: "Campo obrigatório",
          Valid: () => this.model.sigla.length > 1,
        },
        descricao: {
          isValid: undefined,
          message: "Campo obrigatório",
          Valid: () => this.model.descricao.length > 1,
        },
      },
      state: true,
    };
  },
  methods: {
    onSubmit() {
      console.log(this.model.ativo);
      //   this.state = false;
      //   this.validate.sigla.isValid = this.validate.sigla.Valid();
      //   this.validate.descricao.isValid = this.validate.descricao.Valid();

      //   if (this.validate.sigla.isValid && this.validate.descricao.isValid)
      //     console.log("Ok");
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