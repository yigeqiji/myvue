/**
 * @Author 张宇辉
 * @Date 2022-02-24 11:54
 * @QQ 1719945567
 * @Function
 */

const emptyProfile={
    id: '',
    avatar: '',
    nickname: '',
    account: '',
    mobile: '',
    token: ''
}
export default {
    namespaced:true,
    state(){
        return {
            //用户信息
            profile: {
                id: '',
                avatar: '',
                nickname: '默认',
                account: '默认账户',
                mobile: '',
                token: '111'
            },
        }
    },
    mutations:{
        updateProfile(state,payload=emptyProfile){
            state.profile=payload
        }
    }
}