<template>
  <div class="unidade-medida-component">
    <page-title
      icon="weight"
      :icon-type="2"
      main="Unidade de Medida"
      sub="Cadastro"
    />

    <div class="body">
      <b-card>
        <b-form>
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
                labelGroupName="Nome"
                inputId="unidade-medida-nome"
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
            <b-col sm="3">
              <Input
                labelGroupName="Sigla"
                inputId="unidade-medida-sigla"
                :value="model.sigla"
                v-on:input="model.sigla = $event"
                :disabled="!state"
                :maxlength="3"
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
                inputId="unidade-medidas-ativo"
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
import unidadeMedidaValidator from "../../validators/unidade-medida-validator";
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
      name: "unidade-de-medida",
      pageService: new PageService(this, "unidadeMedidaService"),
      model: {
        id: 0,
        nome: "",
        sigla: "",
        ativo: true,
      },
      validate: new unidadeMedidaValidator(),
    };
  },
  methods: {
    newModel() {
      this.model = {
        id: 0,
        nome: "",
        sigla: "",
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