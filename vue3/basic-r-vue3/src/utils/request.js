/**
 * @Author 张宇辉
 * @Date 2022-02-24 17:22
 * @QQ 1719945567
 * @Function
 */
import axios from "axios"
import store from "@/store";
import router from "@/router";
//2840
export let baseURL="https://mock.boxuegu.com/mock/2840/"
if (process.env.NODE_ENV==="production"){
    baseURL="http://192.168.1.106:18000/"
}else if(process.env.NODE_ENV==="test"){
    baseURL="http://192.168.1.101:18000/"
}
console.log("======node env----",process.env.NODE_ENV)


const profile=store.state.user.profile;
//设置头部携带token
const headers={'Authorization':'Bearer ' + profile.token}
const axiosInstance=axios.create({
    timeout:3000,
    baseURL,
    headers
})
/*请求拦截*/
axiosInstance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

/*响应拦截*/
axiosInstance.interceptors.response.use(function (response) {
/*    // 对响应数据做点什么
    if (!response.data.statusCode||response.data.statusCode!==20000){
        if (response.data.statusCode.toString().indexOf('5000')!==-1){
            //做点什么
        }else{
            //做点什么
        }
        return response.data.message
    }*/
    //未登录
    if(response.status===401){
        //清空用户信息
        store.commit("user/updateProfile")
        //跳转路由，并记录当前路由地址
        let currentEncodeUrl=encodeURIComponent(router.currentRoute.value.fullPath)
        router.push({path:'/login',query:{redirectUrl:currentEncodeUrl}}).then()
    }
    return response;
}, function (err) {
    return Promise.reject(err);
});

const get=(url,params)=>{
    return axiosInstance.get(baseURL+url+"?"+JSON.stringify(params))
}

const post=(url,params)=>{
    return axiosInstance.post(baseURL+url,params)
}

//请求工具整体封装
const request=(url,method,submitData)=>{
    return axiosInstance({
        url,method,
        //可以变化的key值
        [method.toLowerCase()==='get'?'params':'data']:submitData
    })
}

export const http={
    get,post,request
}
