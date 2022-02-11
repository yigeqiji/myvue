/**
 * @Author 张宇辉
 * @Date 2021-03-27 11:30
 * @QQ 1719945567
 * @Function
 */
const tokenKey="userTOKEN"
const setToken = (value, expire) => {
    if (!expire) {
        expire = 1000 * 3600 * 24 * 30
    }
    let obj = {
        data: value,
        time: Date.now(),
        expire: expire
    };
    //localStorage 设置的值不能为对象,转为json字符串
    localStorage.setItem(tokenKey, JSON.stringify(obj));
}
const getToken = key => {
    let val = localStorage.getItem(key);
    if (!val) {
        return val;
    }
    val = JSON.parse(val);
    if (val.expire === -1) {
        return val.data
    }
    if (Date.now() - val.time > val.expire) {
        localStorage.removeItem(key);
        return null;
    }
    return val.data;
}

export default {tokenKey,setToken,getToken}