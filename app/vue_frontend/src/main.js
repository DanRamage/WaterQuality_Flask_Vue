import Vue from 'vue'
Vue.config.devtools = true;
import App from './App'
//import BootstrapVue from 'bootstrap-vue'
import VueRouter from "vue-router";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'typeface-montserrat/index.css';

import routes from '@/router/routes';
import store from "@/store/store";

Vue.config.productionTip = false;
//Vue.use(BootstrapVue);
Vue.use(VueRouter);

//import VueAnalytics from "vue-analytics";

const router = new VueRouter({
  mode: 'history',
  routes: routes
});

import VueGtag from "vue-gtag";

Vue.use(VueGtag, {
  //config: { id: "UA-16735125-3" }
  config: { id: "UA-3652063-4" },
},router);
/*Vue.use(VueAnalytics, {
  //id: 'UA-16735125-2',
  id: 'UA-16735125-3',
  router
});*/
new Vue({
  router,
  store,
  components: {App},
  template: '<App />',
  render: h => h(App),
}).$mount('#app');
