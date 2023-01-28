import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Toast from 'vue-toasted'
import 'material-design-icons-iconfont'

Vue.config.productionTip = false
Vue.use(Toast, {
  duration: 3000,
  position: 'top-center'
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
