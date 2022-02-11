import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Vconsole from 'vconsole'
Vue.prototype.$vconsole=Vconsole

/*==================
* utils
==================*/
//TODO js的相关工具方法并没有抽离，优先级：低
import moment from "moment"
Vue.prototype.$moment=moment

import {http,apiServers} from "./utils/http"
Vue.prototype.$http=http
Vue.prototype.$apiServers=apiServers

import storage from "./utils/storage"
Vue.prototype.$storage=storage

// import "./utils/interface-ue"
import ue from "./utils/UnrealApi"
Vue.prototype.$ue=ue
/*==================
* plugins
==================*/

import "./assets/sass/main.scss"
import './quasar'
import './echarts'

/*==================
* directives
==================*/
import "./directives/imgOnError"
import "./directives/forbiddenSelect"
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
