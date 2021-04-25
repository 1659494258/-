import Vue from 'vue'

import 'normalize.css/normalize.css'
// 引入字体图标
import '@/styles/fonts/iconfont.css'

// 引入全局的样式
import '@/styles/index.less'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
// import locale from 'element-ui/lib/locale/lang/zh-CN'
import locale from 'element-ui/lib/locale/lang/en'

import App from './App.vue'

// 导入路由模块
import router from "./router";


Vue.use(ElementUI, {locale});
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
