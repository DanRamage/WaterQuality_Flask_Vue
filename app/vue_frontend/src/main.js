import Vue from 'vue'
Vue.config.devtools = true;
import App from './App'
//import BootstrapVue from 'bootstrap-vue'
import VueRouter from "vue-router";

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'typeface-montserrat/index.css'

import routes from '@/router/routes'
import store from "@/store/store";

Vue.config.productionTip = false;
//Vue.use(BootstrapVue);
Vue.use(VueRouter);


const router = new VueRouter({
  mode: 'history',
  routes: routes
});

new Vue({
  router,
  store,
  components: {App},
  template: '<App />',
  render: h => h(App),
}).$mount('#app');
