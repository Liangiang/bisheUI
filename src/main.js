// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from "axios";
// 将 axios 改写为 Vue 的原型属性,使在其它的组件中可以使用 axios
Vue.prototype.$axios = axios;
//  axios 并不能 use,结合 Vuex，封装一个 aciton
import VueAxios from "vue-axios";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import iView from "iview";
import "iview/dist/styles/iview.css";
import "./assets/css/basic.css"; /*引入公共css样式*/
//import "@/permission";
import "jquery";
//全局引入
Vue.use(ElementUI);//ElementUI
Vue.use(iView);//后台样式（ui）
Vue.use(VueAxios, axios);//与后台接口连接的相当于（ajax）

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
