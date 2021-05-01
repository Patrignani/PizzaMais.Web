<template>
  <div class="borda-component">
    <page-title icon="utensils" :icon-type="2" main="Borda" sub="Cadastro" />

    <div class="body">
      <b-card>
        <b-form>
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
                labelGroupName="Nome"
                inputId="borda-nome"
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
              <InputMoney
                :value="model.preco"
                v-on:input="model.preco = $event"
                labelGroupName="Preço"
                :disabled="!state"
                :validate="{
                  using: true,
                  state: validate.preco.isValid,
                  message: validate.preco.message,
                }"
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
          <ButtonsForm :configButtons="configButtons" :state="state" />
        </b-form>
      </b-card>
    </div>
  </div>
</template>

<script>
import PageTitle from "../../components/template/PageTitle";
import Input from "../../components/template/Input";
import InputMoney from "../../components/template/InputMoney";
import ButtonsForm from "../../components/template/ButtonsForm";
import Checkbox from "../../components/template/Checkbox";
import PageService from "../../services/pageService";
import validatorBasico from "../../validators/borda-validator";
import { PAGE } from "../../utils/constants";

export default {
  components: {
    PageTitle,
    Input,
    ButtonsForm,
    Checkbox,
    InputMoney,
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
      money: {
        decimal: ",",
        thousands: ".",
        prefix: "R$ ",
        precision: 2,
        masked: false,
      },
      name: "borda",
      pageService: new PageService(this, "borda-service"),
      model: {
        id: 0,
        nome: "",
        preco: 0,
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
        preco: 0,
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