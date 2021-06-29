import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Home2 from '../components/home/Home.vue'
import UnidadeMedidaLista from '../views/unidade-de-medida/Lista.vue'
import UnidadeMedidaCadastro from '../views/unidade-de-medida/Cadastro.vue'
import IngredienteCadastro from '../views/ingrediente/Cadastro.vue'
import IngredienteLista from '../views/ingrediente/Lista.vue'
import BordaCadastro from '../views/borda/Cadastro.vue'
import BordaLista from '../views/borda/Lista.vue'
import FornecedorCadastro from '../views/fornecedor/Cadastro.vue'
import FornecedorLista from '../views/fornecedor/Lista.vue'
import PrdoutoRevendaCadastro from '../views/produto-revenda/Cadastro.vue'
import PrdoutoRevendaLista from '../views/produto-revenda/Lista.vue'
import PizzaCadastro from '../views/pizza/Cadastro.vue'
import PizzaLista from '../views/pizza/Lista.vue'

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
    component: Home2
  },
  {
    path: '/unidade-de-medida',
    name: 'Unidade de Medida Lista',
    component: UnidadeMedidaLista
  },
  {
    path: '/unidade-de-medida/:id/:state?',
    name: 'Unidade de Medida Cadastro',
    component: UnidadeMedidaCadastro
  },
  {
    path: '/ingrediente',
    name: 'Ingrediente Lista',
    component: IngredienteLista
  },
  {
    path: '/ingrediente/:id/:state?',
    name: 'Ingrediente Cadastro',
    component: IngredienteCadastro
  },
  {
    path: '/borda',
    name: 'Borda Lista',
    component: BordaLista
  },
  {
    path: '/borda/:id/:state?',
    name: 'Borda Cadastro',
    component: BordaCadastro
  },
  {
    path: '/fornecedor',
    name: 'Fornecedor Lista',
    component: FornecedorLista
  },
  {
    path: '/fornecedor/:id/:state?',
    name: 'Fornecedor Cadastro',
    component: FornecedorCadastro
  },
  {
    path: '/produto-revenda/:id/:state?',
    name: 'Produto Revenda Cadastro',
    component: PrdoutoRevendaCadastro
  },
  {
    path: '/produto-revenda',
    name: 'Produto Revenda Lista',
    component: PrdoutoRevendaLista
  },
  {
    path: '/pizza/:id/:state?',
    name: 'Pizza Cadastro',
    component: PizzaCadastro
  },
  {
    path: '/pizza',
    name: 'Pizza Lista',
    component: PizzaLista
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
