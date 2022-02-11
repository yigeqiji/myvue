import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFoundPage from "../views/404"
import ForbiddenPage from '../views/403'
import {$dialog} from '../quasar.js'
import store from "../store"
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component:()=>import(/* webpackChunkName: "basicLayout" */ '../layouts/BasicLayout'),
    children:[
        //-----basic
      {
        path:'/',
        redirect:'/basic/home'
      },
      {
        path:'/basic',
        redirect:'/basic/home'
      },
      {
        path:'/basic',
        component:{render:h=>h('router-view')},
        children:[
          {
            path:'/basic/home',
            name:'home',
            component:()=>import(/* webpackChunkName: "dashboard" */ '../views/basic/home')
          },
          {
            path:'/basic/record',
            name:'record',
            component:()=>import(/* webpackChunkName: "dashboard" */ '../views/basic/record')
          },
          {
            path:'/basic/spot-check',
            name:'spot-check',
            component:()=>import(/* webpackChunkName: "dashboard" */ '../views/basic/spot-check')
          },
          {
            path:'/basic/analyse',
            name:'analyse',
            component:()=>import(/* webpackChunkName: "dashboard" */ '../views/basic/analyse')
          },
          {
            path:'/basic/equipment-manager',
            name:'equipment-manager',
            component:()=>import(/* webpackChunkName: "dashboard" */ '../views/basic/equipment-manager')
          },
          {
            path:'/basic/camera-info',
            name:'camera-info',
            component:()=>import(/* webpackChunkName: "dashboard" */ '../views/basic/camera')
          },
          {
            path:'/test',
            name:'video-test',
            component:()=>import(/* webpackChunkName: "dashboard" */ '../views/basic/video_test')
          },
        ]
      }
    ]
  },
  /*403*/
  {
    path:"/403",
    name:"ForbiddenPage",
    component:ForbiddenPage
  },
  /*404*/
  {
    path: "*",
    name:"NotFoundPage",
    component:NotFoundPage
  }

]
const mode="hash"
const router = new VueRouter({
  mode,
  routes
})
router.beforeEach((to,from,next)=>{
  if (['spot-check','camera-info'].indexOf(to.name)!=-1){
    store.commit("setBasicBgShow",true)
    store.commit("setFooterShow",false)
  }else{
    store.commit("setBasicBgShow",false)
    store.commit("setFooterShow",true)

  }

  try {
    if(['home'].indexOf(to.name)!=-1){
      store.commit("setSensorInfoShow",true)
      setTimeout(()=>{
        window.Interface.co(function*(){
          let res=yield window.Interface.SetMinmapVisible(true)
          console.log("ue SetMinmapVisible true-----",res)
        })
      },300)

    }else{
      setTimeout(()=>{
        window.Interface.co(function*(){
          let res=yield window.Interface.SetMinmapVisible(false)
          console.log("ue SetMinmapVisible false-----",res)

        })
      },500)

    }
  }catch (e) {
    $dialog("错误","隐藏ue平面图发生错误---"+e)
    next()
  }


  next()

})
export default router
