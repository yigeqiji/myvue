/**
 * @Author 张宇辉
 * @Date 2021-04-01 14:06
 * @QQ 1719945567
 * @Function
 */

import Vue from 'vue'

/** 全局注册*/
Vue.directive('imgError',{
    bind(e){
        e.onerror=function(){
            e.src=require('@/assets/images/defalut-video.png')
        }

    },
/*    inserted(e) {
        e.onerror=function (){
            e.src=require('@/assets/images/defalut-video.png')
        }
    },*/
/*    update(e){

        console.log("update imgurl-----",e.src)
        let src=e.src
        e.src=""
        e.src=require('@/assets/images/defalut-video.png')
        e.src=src
        e.onerror=function(){
            e.src=require('@/assets/images/defalut-video.png')
        }

    }*/
})

Vue.directive('VideoImgError',{
        bind(e){
            console.log("imgurl-----",e.src)
/*            let src=e.src
            let img=new Image()
            img.src=src*/
            // e.src=require('@/assets/images/defalut-video.png')
/*            img.onload=function(){
                e.src=src
            }
            img.onerror=function(){
                e.src=require('@/assets/images/defalut-video.png')
            }*/
            e.onerror=function(){
                e.src=require('@/assets/images/defalut-video.png')
            }

        },
    /*    inserted(e) {
            e.onerror=function (){
                e.src=require('@/assets/images/defalut-video.png')
            }
        },*/
    update(e){

/*        console.log("update imgurl-----",e.src)
        let src=e.src
        e.src=""
        e.src=require('@/assets/images/defalut-video.png')
        e.src=src*/
        e.onerror=function(){
            e.src=require('@/assets/images/defalut-video.png')
        }

    }
})