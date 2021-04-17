<template>
  <div class="body">
    <b-card>
      <b-form>
        <div
          v-for="row in rows"
          :key="row.id"
          class="row-for"
        >
          <b-row class="body-col">
            <div v-for="column in row.columns" :key="column.id" class="row-for">
              <b-col :sm="column.col">
                <Input
                  :labelGroupName="column.component.labelGroupName"
                  :inputId="column.component.inputId"
                  :value="column.component.value"
                  v-on:input="column.component.value = $event"
                  :disabled="column.component.disabled"
                  :validate="{
                    using: column.component.validate.using,
                    state: column.component.validate.state,
                    message: column.component.validate.message,
                  }"
                />
              </b-col>
            </div>
          </b-row>
        </div>
        <div class="buttons">
          <b-button size="lg" variant="primary">Cancelar</b-button>
          <b-button size="lg" variant="primary" @click="save">Salvar</b-button>
        </div>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import Input from "../template/Input";
import { uuid } from "vue-uuid";
export default {
  components: {
    Input,
  },
  props: {
    save: {
      require: false,
      default: () => {},
    },
    cancel: {
      require: false,
      default: () => {},
    },
    rows: {
      type: Array,
      default: () => [
        {
          id: uuid.v1(),
          columns: [
            {
              id: uuid.v1(),
              componentType: "input",
              col: 1,
              component: {},
            },
          ],
        },
      ],
    },
  },
};
</script>

<style>
.body-col {
  align-content: center;
  font-weight: 600;
}

.row-for {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
</style>