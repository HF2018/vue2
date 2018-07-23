// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import VueRouter from 'vue-router';
import storeConfig from './vuex/store'
import store from './vuex/store'
import echarts from 'echarts'
import axios from 'axios' // 1、在这里引入axios
Vue.prototype.HOST = "/api"; //全局
Vue.prototype.$axios = axios; // 2、在vue中使用axios
import iView from 'iview';
import 'iview/dist/styles/iview.css';

//在main.js设置全局的请求次数，请求的间隙
// axios.defaults.retry = 4;
// axios.defaults.retryDelay = 1000;

// axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
//   var config = err.config;
//   // If config does not exist or the retry option is not set, reject
//   if (!config || !config.retry) return Promise.reject(err);

//   // Set the variable for keeping track of the retry count
//   config.__retryCount = config.__retryCount || 0;

//   // Check if we've maxed out the total number of retries
//   if (config.__retryCount >= config.retry) {
//     // Reject with the error
//     return Promise.reject(err);
//   }

//   // Increase the retry count
//   config.__retryCount += 1;

//   // Create new promise to handle exponential backoff
//   var backoff = new Promise(function (resolve) {
//     setTimeout(function () {
//       resolve();
//     }, config.retryDelay || 1);
//   });

//   // Return the promise in which recalls axios to retry the request
//   return backoff.then(function () {
//     return axios(config);
//   });
// });

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(iView);
Vue.prototype.$echarts = echarts;


new Vue({
  el: '#app',
  router,
  store, //使用store
  components: {
    App
  },
  template: '<App/>'
})
