import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import state from './store/index'

Vue.config.productionTip = false
Vue.use(Vuex)

new Vue({
  store: new Vuex.Store(state),
  render: h => h(App),
}).$mount('#app')
