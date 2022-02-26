/**
 * @Author 张宇辉
 * @Date 2022-02-24 11:57
 * @QQ 1719945567
 * @Function
 */
export default {
    namespaced:true,

    state(){
        return {
            list:[]
        }
    },
    mutations:{
        updateList(state,payload){
            state.list=payload
        }
    }
}