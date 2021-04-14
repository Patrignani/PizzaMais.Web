import Vue from 'vue'
import App from '@/App'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'font-awesome/css/font-awesome.css'
import store from '@/store/index'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')