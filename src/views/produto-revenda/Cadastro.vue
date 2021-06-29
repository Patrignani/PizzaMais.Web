<template>
  <div class="produto-revenda-component">
    <page-title
      icon="truck-loading"
      :icon-type="2"
      main="Produto Revenda"
      sub="Cadastro"
    />
    <div class="body">
      <b-card>
        <b-form>
          <b-row class="body-col">
            <b-col sm="1">
              <Input
                labelGroupName="Id"
                inputId="produto-revenda-id"
                :value="model.id"
                :disabled="true"
                v-on:input="model.id = $event"
              />
            </b-col>
            <b-col sm="2">
              <Input
                labelGroupName="Código"
                inputId="produto-revenda-codigo"
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
                inputId="produto-revenda-nome"
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
                inputId="produto-revenda-ativo"
                :disabled="!state"
                :value="model.ativo"
                v-on:checkBox="model.ativo = $event"
              />
            </b-col>
          </b-row>

          <b-row class="body-col">
            <b-col sm="2">
              <Input
                labelGroupName="Quantidade"
                inputId="produto-revenda-quantidade"
                :value="model.quantidade"
                v-on:input="model.quantidade = $event"
                :disabled="!state"
                type="number"
              />
            </b-col>
            <b-col sm="2">
              <InputDropDown
                labelGroupName="Unidade de medida"
                inputId="fornecedor-unidade-medida"
                :value="model.unidadeMedidaId"
                :disabled="!state"
                v-on:input="model.unidadeMedidaId = $event"
                :options="listas.unidadeMedidas"
              />
            </b-col>
            <b-col sm="5">
              <AutoComplete
                labelGroupName="Fornecedor"
                :value="model.fornecedorId"
                v-on:input="model.fornecedorId = $event"
                v-on:inputText="model.fornecedorNome = $event"
                :searchCallBack="searchCallBack"
                :disabled="!state"
                :valueText="model.fornecedorNome"
                :validate="{
                  using: true,
                  state: validate.fornecedorId.isValid,
                  message: validate.fornecedorId.message,
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
import { PAGE } from "../../utils/constants";
import Validator from "../../validators/produto-revenda-validator";
import PageService from "../../services/pageService";
import Checkbox from "../../components/template/Checkbox";
import InputDropDown from "../../components/template/InputDropDown";
import { obterTodos } from "../../services/unidadeMedidaService";
import AutoComplete from "../../components/template/AutoComplete";
import { litarSimplificado } from "../../services/fornecedor-service";
import InputMoney from "../../components/template/InputMoney";

export default {
  components: {
    PageTitle,
    Input,
    ButtonsForm,
    Checkbox,
    InputDropDown,
    AutoComplete,
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
      name: "produto-revenda",
      listas: {
        unidadeMedidas: [],
      },
      pageService: new PageService(this, "produto-revenda-service"),
      model: {
        id: 0,
        nome: "",
        ativo: true,
        codigo: "",
        unidadeMedidaId: null,
        fornecedorId: null,
        fornecedorNome: "",
        preco: 0,
      },
      validate: new Validator(),
    };
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
            texto: x.nome,
            descricao: `${x.tipoDocumentoNome}: ${x.documento}`,
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
        unidadeMedidaId: null,
        fornecedorId: null,
        fornecedorNome: "",
        preco: 0,
      };
    },
  },
  async mounted() {
    let unidadeMedidas = await obterTodos({ ativo: true });
    console.log(unidadeMedidas);
    if (unidadeMedidas.status != 200) {
      this.$toast.error(
        `Ocorreu um erro para carregar as unidades de medida. Entre em contato com o administrador do sistema!`
      );
    } else {
      let data = unidadeMedidas.data;
      this.listas.unidadeMedidas = data.map((x) => {
        return { value: x.id, text: x.sigla };
      });
    }
    await this.pageService.init();
  },
};
</script>

<style>
</style>