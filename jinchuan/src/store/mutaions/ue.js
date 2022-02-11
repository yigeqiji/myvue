/**
 * @Author 张宇辉
 * @Date 2021-03-29 16:23
 * @QQ 1719945567
 * @Function
 */


export default {
    changeFlushStatus(state,val){
        state.flushStatus=val
    },
    changeCameraVideos(state,val){
        state.cameraVideos=val
    },
    changeCraneTemp(state,val){
        state.craneTemp=val
    },
    changeSensorInfo(state,val){
        state.sensorInfo=val
    }
}