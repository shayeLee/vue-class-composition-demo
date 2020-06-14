import Vue from 'vue'
import OnevUI from 'onev-ui';
import 'onev-ui/lib/theme-chalk/index.css';
import './styles/index.scss';
import App from './App.vue'
import router from './router'
import { reactiveInstall } from 'vue-class-composition'

Vue.config.productionTip = false

Vue.use(reactiveInstall);
Vue.use(OnevUI);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
