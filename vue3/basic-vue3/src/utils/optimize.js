/**
 * @Author 张宇辉
 * @Date 2022-02-23 08:51
 * @QQ 1719945567
 * @Function
 */
export const debounce=(callback,delay=300,...args)=>{
    let t=null;
    return (e)=>{
        clearTimeout(t);
        t=setTimeout(()=>{
            callback.call(this,e,...args);
        },delay);
    }
}
