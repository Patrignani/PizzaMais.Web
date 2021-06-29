<template>
  <div class="ingrediente-component">
    <page-title
      icon="weight"
      :icon-type="2"
      main="Ingredientes"
      sub="Cadastro"
    />

    <div class="body">
      <b-card>
        <b-form>
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
                labelGroupName="Nome"
                inputId="ingrediente-nome"
                :value="model.nome"
                v-on:input="model.nome = $event"
                :disabled="!state"
                :validate="{
                  using: true,
                  state: validate.nome.isValid,
                  message: validate.nome.message,
                }"
              />
            </b-col>
            <b-col sm="1">
              <Checkbox
                labelGroupName="Ativo"
                inputId="ingredientes-ativo"
                :disabled="!state"
                :value="model.ativo"
                v-on:checkBox="model.ativo = $event"
              />
            </b-col>
          </b-row>
          <ButtonsForm :configButtons="configButtons" :state="state" />
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
import PageService from "../../services/pageService";
import validatorBasico from "../../validators/basico";
import { PAGE } from "../../utils/constants";

export default {
  components: {
    PageTitle,
    Input,
    ButtonsForm,
    Checkbox,
  },
  computed: {
    configButtons() {
      return this.pageService.configButtons;
    },
    state() {
      let state = this.$store.getters[PAGE.STATE];
      return state == 1 || state == 2;
    },
  },
  data() {
    return {
      name: "ingrediente",
      pageService: new PageService(this, "ingrediente-service"),
      model: {
        id: 0,
        nome: "",
        ativo: true,
      },
      validate: new validatorBasico(),
    };
  },
  methods: {
    newModel() {
      this.model = {
        id: 0,
        nome: "",
        ativo: true,
      };
    },
  },
  async mounted() {
    this.pageService.init();
  },
};
</script>

<style>
</style>