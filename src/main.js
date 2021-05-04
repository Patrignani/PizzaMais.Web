import Vue from 'vue'
import App from '@/App'
import router from './router/index'
import { BootstrapVue, BootstrapVueIcons, ModalPlugin  } from 'bootstrap-vue'
import 'font-awesome/css/font-awesome.min.css'
import store from '@/store/index'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue-icons.css'
import './assets/style/geral.css'
import Unicon from 'vue-unicons/dist/vue-unicons-vue2.umd'
import { uniChatBubbleUser, uniMinusCircle, uniRuler, uniEdit, uniPlusSquare,uniTrashAlt, uniWeight, uniUtensils, uniArrowCircleDown, uniArrowCircleUp, uniFilter, uniFilterSlash } from 'vue-unicons/dist/icons'
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import money from 'v-money'
import VueMask from 'v-mask'

Vue.use(VueToast);
Vue.use(Loading);
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(ModalPlugin)
Vue.use(money, {precision: 2})
Vue.use(VueMask);
Unicon.add([uniChatBubbleUser, uniMinusCircle, uniRuler, uniEdit, uniPlusSquare, uniTrashAlt, uniWeight, uniUtensils, uniArrowCircleDown, uniArrowCircleUp, uniFilter, uniFilterSlash ])
Vue.use(Unicon)
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')