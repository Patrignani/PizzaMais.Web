<template>
  <div class="buttons">
    <b-button
      size="lg"
      variant="primary"
      v-if="state"
      @click="configButtons.cancel"
      >Cancelar</b-button
    >
    <b-button
      size="lg"
      variant="primary"
      v-if="state"
      @click="configButtons.save"
      >Salvar</b-button
    >
    <b-button
      size="lg"
      variant="primary"
      v-if="!state"
      @click="configButtons.back"
      >Voltar</b-button
    >
    <b-button
      size="lg"
      variant="primary"
      v-if="!state"
      @click="configButtons.edit"
      >Editar</b-button
    >

        <b-button
      size="lg"
      variant="primary"
      v-if="!state"
      @click="configButtons.newState"
      >Novo</b-button
    >
  </div>
</template>

<script>

export default {
  props: {
    configButtons: {
      save: Function,
      back: Function,
      edit: Function,
      cancel: Function,
      newState: Function
    },
    state: Boolean,
  },
};
</script>

<style>
.buttons {
  display: flex;
  flex-direction: row-reverse;
  flex-wrap: wrap;
}

.buttons button {
  margin: 20px;
}
</style>