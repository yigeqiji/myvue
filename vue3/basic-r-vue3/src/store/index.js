import { createStore } from 'vuex'
import user from "@/store/modules/user";
import category from "@/store/modules/category";
import cart from "@/store/modules/cart";

export default createStore({
  modules:{
    cart,
    user,
    category
  }
})