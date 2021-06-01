import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router'
import store from './store'
import axios from 'axios'
import mavonEditor from 'mavon-editor'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import 'mavon-editor/dist/css/index.css'

import './assets/css/global.css'


Vue.prototype.$axios = axios
Vue.use(ElementUI);
Vue.use(mavonEditor);
Vue.use(VueQuillEditor);
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  var token = localStorage.getItem('token')//存储token
  console.log(to.meta.title)
  if (to.meta.title) {
    document.title = to.meta.title;//路由中设置页面标题
    if (token||to.meta.nacy=='true') {//to.meta.nacy=='true'这里面的nacy就是自己在路由中设置的//不参与token验证的页面参数变量这个变量可以自己定义
          next()
    } else {
      if (to.path == '/login') {
        next()
      } else {
        next('/login')
      }
    }
   }
   else{
     next('/login')
   }
})

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});