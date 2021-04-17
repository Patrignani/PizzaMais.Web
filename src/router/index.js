import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Home2 from '../components/home/Home.vue'
import UnidadeMedidaLista from '../components/views/unidade-de-medida/Lista.vue'
import UnidadeMedidaCadastro from '../components/views/unidade-de-medida/Cadastro.vue'
import IngredienteCadastro from '../components/views/ingrediente/Cadastro.vue'
import IngredienteLista from '../components/views/ingrediente/Lista.vue'
import BordaCadastro from '../components/views/borda/Cadastro.vue'
import BordaLista from '../components/views/borda/Lista.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/test',
    name: 'Test',
    component:Home2
  },
  {
    path: '/unidade-de-medida',
    name: 'Unidade de Medida Lista',
    component:UnidadeMedidaLista
  },
  {
    path: '/unidade-de-medida/:id',
    name: 'Unidade de Medida Cadastro',
    component:UnidadeMedidaCadastro
  },
  {
    path: '/ingrediente',
    name: 'Ingrediente Lista',
    component:IngredienteLista
  },
  {
    path: '/ingrediente/:id/:state?',
    name: 'Ingrediente Cadastro',
    component:IngredienteCadastro
  },
  {
    path: '/borda',
    name: 'Borda Lista',
    component:BordaLista
  },
  {
    path: '/borda/:id/:state?',
    name: 'Borda Cadastro',
    component:BordaCadastro
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
