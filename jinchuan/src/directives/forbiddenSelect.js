/**
 * @Author 张宇辉
 * @Date 2021-04-07 14:12
 * @QQ 1719945567
 * @Function
 */

import Vue from "vue"

Vue.directive("forbidden-select",{
    bind(e){
        e.setAttribute("onselectstart","return false;")
        e.setAttribute("unselectable","on")

    }
})