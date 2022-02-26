import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

/*==================
* css重置样式及公共样式
==================*/
import "normalize.css"
import "@/assets/styles/common.less"

createApp(App).use(store).use(router).mount('#app')
