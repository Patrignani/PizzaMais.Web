<template>
  <div class="ingrediente-component">
    <page-title
      icon="weight"
      icon-type="2"
      main="Ingredientes"
      sub="Cadastro"
    />

    <div class="body">
      <b-card>
        <b-form @submit="onSubmit">
          <b-row class="body-col">
            <b-col sm="1">
              <Input
                labelGroupName="Id"
                inputId="ingrediente-id"
                :value="model.id"
                :disabled="true"
                v-on:input="model.id = $event"
              />
            </b-col>
            <b-col sm="10">
              <Input
                labelGroupName="Descrição"
                inputId="ingrediente-descricao"
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
            <b-col sm="1">
              <b-form-group label="Ativo" label-for="ingredientes-ativo">
                <b-form-checkbox
                  :disabled="!state"
                  v-model="model.ativo"
                  id="ingredientes-ativo"
                  switch
                ></b-form-checkbox>
              </b-form-group>
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

export default {
  components: {
    PageTitle,
    Input,
    ButtonsForm,
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
        ativo: true
      },
      validate: {
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
      this.state = false;

      if (this.validate.descricao.Valid()) {
        this.validate.descricao.isValid = undefined;
        alert(this.validate.descricao.isValid);
      } else {
        this.validate.descricao.isValid = false;
      }
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