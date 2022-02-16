import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path:"/",
    component:()=>import(/* webpackChunkName: "basicLayout" */ '../layouts/basic-layout'),
    redirect:"/basic/home",
    children:[
      {
        path:"basic",
        component:{render:h=>h('router-view')},
        redirect:"/basic/home",
        children:[
/*          {
            path:"/",
            redirect:"/basic/home"
          },*/
          {
            path:"home",
            name:'home',
            component:()=>import(/* webpackChunkName: "dashboard" */ '../views/basic/home')
          },
          {
            path:"user",
            name:'user',
            component:()=>import(/* webpackChunkName: "dashboard" */ '../views/basic/user')
          }
        ]
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
