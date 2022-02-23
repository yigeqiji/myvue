/**
 * @Author 张宇辉
 * @Date 2022-02-23 08:42
 * @QQ 1719945567
 * @Function
 */
import {ref} from "vue";
import {debounce} from "../utils/optimize";

export const useMove=()=>{
    let x=ref(0);
    let y=ref(0);
    const fn=(e,num1)=>{
        console.log(e,num1)
    }
    window.onmousemove=debounce(fn,300,1)
    return {
        x,y
    }
}
