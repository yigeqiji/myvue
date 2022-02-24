import { createStore } from 'vuex'
import user from "@/store/modules/user";
import category from "@/store/modules/category";
import cart from "@/store/modules/cart";
import createPersistedState from "vuex-persistedstate"
export default createStore({
  modules:{
    cart,
    user,
    category
  },
  plugins:[createPersistedState({
    key:'basic-r-vue3',
    paths:['user','cart']
  })]
})