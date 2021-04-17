import Vue from 'vue'
import App from '@/App'
import router from './router/index'
import { BootstrapVue, BootstrapVueIcons, ToastPlugin, BToast } from 'bootstrap-vue'
import 'font-awesome/css/font-awesome.min.css'
import store from '@/store/index'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue-icons.css'
import './assets/style/geral.css'
import Unicon from 'vue-unicons/dist/vue-unicons-vue2.umd'
import { uniRuler, uniWeight, uniUtensils  } from 'vue-unicons/dist/icons'

Vue.component('b-toast', BToast)
Vue.use(ToastPlugin)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Unicon.add([uniRuler, uniWeight, uniUtensils])
Vue.use(Unicon)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')