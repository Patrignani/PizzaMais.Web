<template>
  <div class="pizza">
    <page-title icon="pizza-slice" :icon-type="2" main="Pizza" sub="Cadastro" />
    <div class="body">
      <b-card>
        <b-form>
          <b-row class="body-col">
            <b-col sm="1">
              <Input
                labelGroupName="Id"
                inputId="pizza-id"
                :value="model.id"
                :disabled="true"
                v-on:input="model.id = $event"
              />
            </b-col>
            <b-col sm="1">
              <Input
                labelGroupName="Código"
                inputId="pizza-codigo"
                :value="model.codigo"
                :disabled="!state"
                v-on:input="model.codigo = $event"
                :validate="{
                  using: true,
                  state: validate.codigo.isValid,
                  message: validate.codigo.message,
                }"
              />
            </b-col>
            <b-col sm="7">
              <Input
                labelGroupName="Nome"
                inputId="pizza-nome"
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
                labelGroupName="Valor de venda"
                :disabled="!state"
                :validate="{
                  using: true,
                  state: validate.preco.isValid,
                  message: validate.preco.message,
                }"
              />
            </b-col>
          </b-row>
          <b-row class="body-col">
            <b-col sm="8">
              <InputGridSimple
                :searchCallBack="searchCallBack"
                labelGroupName="Ingredientes"
                inputId="pizza-codigo"
                :value="model.ingredientes"
                :disabled="false"
                v-on:input="model.ingredientes = $event"
                :state="state"
                :validate="{
                  using: true,
                  state: validate.ingredientes.isValid,
                  message: validate.ingredientes.message,
                }"
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
import { PAGE } from "../../utils/constants";
import Validator from "../../validators/pizza-validator";
import InputMoney from "../../components/template/InputMoney";
import ButtonsForm from "../../components/template/ButtonsForm";
import PageService from "../../services/pageService";
import InputGridSimple from "../../components/template/InputGridSimple";
import { litarSimplificado } from "../../services/ingrediente-service";
export default {
  components: {
    PageTitle,
    Input,
    InputMoney,
    ButtonsForm,
    InputGridSimple,
  },
  methods: {
    async searchCallBack(value) {
      let valor = await litarSimplificado({ nome: value, ativo: true });
      if (valor.status != 200) {
        this.$toast.error(
          `Ocorreu um erro para carregar as unidades de medida. Entre em contato com o administrador do sistema!`
        );
      } else {
        return valor.data.map((x) => {
          return {
            valor: x.id,
            texto: x.nome
          };
        });
      }
    },
    newModel() {
      this.model = {
        id: 0,
        nome: "",
        ativo: true,
        codigo: "",
        preco: 0,
        ingredientes: [],
      };
    },
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
      name: "pizza",
      pageService: new PageService(this, "pizza-service"),
      model: {
        id: 0,
        nome: "",
        ativo: true,
        codigo: "",
        preco: 0,
        ingredientes: [],
      },
      validate: new Validator(),
    };
  },
 async created() {
    await this.pageService.init();
    this.$store.commit(PAGE.PAGELOAD, this.name)
  },
};
</script>

<style>
</style>