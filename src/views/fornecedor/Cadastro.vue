<template>
  <div class="fornecedor-component">
    <page-title
      icon="chat-bubble-user"
      :icon-type="2"
      main="Fornecedor"
      sub="Cadastro"
    />
ARRUMNAR PREÇO E DEIXAR GRID GRANDE
    <div class="body">
      <b-card>
        <b-form>
          <b-row class="body-col">
            <b-col sm="2">
              <Input
                labelGroupName="Id"
                inputId="fornecedor-id"
                :value="model.id"
                :disabled="true"
                v-on:input="model.id = $event"
              />
            </b-col>
            <b-col sm="8">
              <Input
                labelGroupName="Nome"
                inputId="fornecedor-nome"
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
            <b-col sm="2">
              <Checkbox
                labelGroupName="Ativo"
                inputId="fornecedor-ativo"
                :disabled="!state"
                :value="model.ativo"
                v-on:checkBox="model.ativo = $event"
              />
            </b-col>
          </b-row>
          <b-row class="body-col">
            <b-col sm="2">
              <InputDropDown
                labelGroupName="Tipo do Documento"
                inputId="fornecedor-tipoDocumento"
                :value="model.tipoDocumento"
                :disabled="!state"
                v-on:input="model.tipoDocumento = $event"
                :options="options"
              />
            </b-col>
            <b-col sm="4">
              <Input
                labelGroupName="Documento"
                inputId="fornecedor-documento"
                :value="model.documento"
                v-on:input="model.documento = $event"
                :disabled="!state"
                :validate="{
                  using: true,
                  state: validate.documento.isValid,
                  message: validate.documento.message,
                }"
                v-mask="cpfCnpj"
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
import validator from "../../validators/fornecedor-validator";
import { PAGE } from "../../utils/constants";
import InputDropDown from "../../components/template/InputDropDown";

export default {
  components: {
    PageTitle,
    Input,
    ButtonsForm,
    Checkbox,
    InputDropDown,
  },
  computed: {
    cpfCnpj() {
      return this.model.tipoDocumento == 1
        ? "##.###.###/####-##"
        : "###.###.###-##";
    },
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
      name: "fornecedor",
      options: [
        { value: 1, text: "CNPJ" },
        { value: 2, text: "CPF" },
      ],
      pageService: new PageService(this, "fornecedor-service"),
      model: {
        id: 0,
        nome: "",
        ativo: true,
        tipoDocumento: 2,
        documento: "",
      },
      validate: new validator(),
    };
  },
  methods: {
    newModel() {
      this.model = {
        id: 0,
        nome: "",
        ativo: true,
        tipoDocumento: 1,
        documento: "",
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