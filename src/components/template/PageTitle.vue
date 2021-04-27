<template>
  <div class="page-title">
    <div class="info">
      <h1 v-if="useIcon">
        <unicon v-if="iconType == 2" :name="icon" fill="#49a7c1"></unicon>
        <b-icon v-if="iconType == 1" :icon="icon"></b-icon>{{ main }}
      </h1>
      <h2>{{ sub }}</h2>
    </div>
    <div class="botao" v-if="buttonAdd">
      <button class="adicionar" @click="adiconar">Adicionar</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageTitle",
  computed:{
    useIcon(){
        return this.icon != null && this.icon != undefined
      }
  },
  methods:{
    adiconar(){
      this.$router.replace({ path: `/${this.rota}/new` })
    }
  },
  props: {
    icon: {
      type: String,
    },
    main: {
      type: String,
    },
    sub: {
      type: String,
    },
    iconType: {
      type: Number,
      default:0
    },
    buttonAdd: {
      type: Boolean,
      default: false,
    },
    rota: {
      type: String,
    },
  },
};
</script>

<style>
.page-title {
  width: 100%;
  background-color: #fff;
  padding: 0 12px;
  box-shadow: 0px 1px 4px rgb(56, 56, 56);
  position: sticky;
  color: #49a7c1;
  height: 77px;
  display: flex;
}

.info {
  width: 90%;
}

.info h1 {
  margin: 0px;
}

.info h2 {
  margin-top: 5px;
  font-size: 1.3rem;
}

.botao {
  width: 10%;
}

.adicionar {
  color: #fff;
  background-color: #49a7c1;
  border-radius: 5px;
  margin-top: 20px;
  font-size: 25px;
}
</style>