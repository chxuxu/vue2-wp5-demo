import Vue from 'vue';
import ElementUI from 'element-ui';
import Vuex from 'vuex';
import 'element-ui/lib/theme-chalk/index.css';
// //import '../assets/css/reset.css'
import Root from "./Root.vue";
import VueRouter from 'vue-router';
import routers from "./routers";
import {createStore} from "./store";
Vue.use(VueRouter)
Vue.use(ElementUI);
Vue.use(Vuex);
new Vue({
  render: h => h(Root),
  router:routers,
  store:createStore()
}).$mount('#root');
console.log(111111111);