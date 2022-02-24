/**
 * @Author 张宇辉
 * @Date 2022-02-24 11:54
 * @QQ 1719945567
 * @Function
 */
export default {
    namespaced:true,
    state(){
        return {
            //用户信息
            profile:{
                id:'',
                avatar:'',
                nickname:'默认',
                account:'',
                mobile:'',
                token:''
            }
        }
    },
    mutations:{
        updateProfile(state,payload){
            state.profile=payload
        }
    }
}