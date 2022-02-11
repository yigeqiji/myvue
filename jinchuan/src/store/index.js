import Vue from 'vue'
import Vuex from 'vuex'
import ueState from './state/ue'
import ueMutations from './mutaions/ue'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ...ueState,
    ueApi:"",
    basicBgShow:false,
    footerShow:true,
    sensorInfoShow:true,
  },
  mutations: {
    ...ueMutations,
    setUeApi(state,data){
      state.ueApi=data
    },
    setBasicBgShow(state,isShow){
      state.basicBgShow=isShow
    },
    setFooterShow(state,isShow){
      state.footerShow=isShow
    },
    setSensorInfoShow(state,isShow){
      state.sensorInfoShow=isShow
    }
  },
  actions: {
  },
  modules: {
  }
})
