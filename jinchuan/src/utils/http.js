/**
 * @Author 张宇辉
 * @Date 2021-03-23 12:58
 * @QQ 1719945567
 */
import axios from "axios";
import {$warnNotify,$warnDialog,Loading} from '../quasar.js'
// let dialogInstance;
import storage from './storage'
var baseURL="http://192.168.1.101:18000/"
if (process.env.NODE_ENV==="production"){
    baseURL="http://192.168.1.106:18000/"
}else if(process.env.NODE_ENV==="test"){
    baseURL="http://192.168.1.101:18000/"
}
console.log("======node env----",process.env.NODE_ENV)
const _loadApiServerConfig=(api)=>{
    return {api}
}

const apiServers={
    home:{
        dailyPieChart:_loadApiServerConfig("alarm/history/pie/zone/stats"),
        dailyHistoryVideos:_loadApiServerConfig("alarm/history/list")


    }

}

//const baseURL="http://sunjeovn.xyz:18000/"
import qs from "qs"
const headers={'Authorization':'Bearer ' + storage.getToken(storage.tokenKey)}
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
    // 对响应数据做点什么
    if (!response.data.statusCode||response.data.statusCode!=20000){
        if (response.data.statusCode.toString().indexOf('5000')!==-1){
            $warnDialog("参数错误",response.data.message)
        }else{
            $warnDialog("警告",response.data.message)
        }
        // Dialog.create({title:"警告",message:response.data.message,persistent:true})
        return response.data.message
    }
    return response.data.data;
}, function (err) {
    Loading.hide()

    let isNotify=true
    //是否需要弹窗，首页饼图定时器请求的数据，只有第一次弹出失败的弹窗
    if (err.config.data&&err.config.data.isInterval){
        isNotify=false
    }
    if (isNotify){
        $warnNotify(`服务异常：${err}`)

    }
    return Promise.reject(err);
});

const get=function(url,params){
    return axiosInstance.get(baseURL+url+"?"+qs.stringify(params))
}

const post=function(url,params){
    return axiosInstance.post(baseURL+url,params)
}
const download=function(params,type){
    let url="http://localhost:9999/file/download"
    if(type===1){
        params.api_url=baseURL+params.api_url
    }
    return axiosInstance.get(url+"?"+qs.stringify(params))
}
const http={
    get,post,download
}
export {http,apiServers}

