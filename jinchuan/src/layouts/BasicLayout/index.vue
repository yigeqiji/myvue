<template>
  <div class="basic-container">
    <img src="@/assets/images/camera/bg.png" class="basic-container-bg" :class="$store.state.basicBgShow?'basic-container-bg-show':'basic-container-bg-hide'" alt="">
    <Header class="header"/>
    <router-view class="body"/>
    <Footer class="footer"/>
  </div>
</template>

<script>
import Header from "./Header";
import Footer from "./Footer";

export default {
  name: "BasicLayout",
  components: {
    Header, Footer
  },
  methods:{
    //---给ue发送方法示例
/*
    let that=this
    this.$ue.co(function*(){
      yield that.$ue.PlayVideo(url);
    })
    */
    //---接受ue传来的token
    OnLoginSuccess(token){
      if (!token||token===""){
        this.$dialog("error","ue传入的token为空")
        return
      }
      this.$storage.setToken(token)
      // this.$notify("设置token成功")
    },
    //TODO 接受ue的方法 应该放到对应的页面去，不采用state全局存储
    OnChangeSize(size){
      if (!size||size===""){
        this.$dialog("error","ue传入的change size为空")
        return
      }

      console.log(size)
    },
    //点击生产设备
    OnSpawnDeviceClick(equipment_id){
      if (!equipment_id||equipment_id===""){
        this.$dialog("error","ue传入的equipment_id为空")
        return
      }
      this.$router.push({
        name:"spot-check",
        query:{id:equipment_id}
      })
    },
    //点击三维相机
    OnCameraDeviceClick(sn){
      if (!sn||sn===""){
        this.$dialog("error","ue传入的sn为空")
        return
      }
      this.$router.push({
        name:"camera-info",
        query:{sn}
      })
    },
    //巡检相机切换
    OnSwitchVideo(cameras_data){
      // let cameras = JSON.parse(cameras_str)
      let cameras=cameras_data.data

      if (cameras.length<4||!cameras[1].sn||cameras[1].urls.length<2){
        this.$notify("ue传入的相机视频数据不合法")
        return
      }
      console.log("ue cameravideos-----",cameras)
      this.$store.commit("changeCameraVideos",cameras)
    },
    //传感器信息
    OnSceneSensorData(sensor_infos){

      this.$store.commit("changeSensorInfo",sensor_infos)

    },
    //天车电机温度
    OnCraneSensorData(monitor_temp){
      this.$store.commit("changeCraneTemp",monitor_temp)
    }
  },
  created() {
    this.$storage.setToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJXb3Jrc2hvcElEIjoxLCJVc2VySWQiOjQsIlVzZXJOYW1lIjoiamluY2h1YW4wMSIsIk5pY2tOYW1lIjoiIiwiU2FtZVVzZXJLZXkiOiJnaHhZdSIsIlNjb3BlIjowLCJleHAiOjE2MzM0MTgxMjgsImlhdCI6MTYxNzg2NjEyOH0.la93A_UWaROOAuImepMvEGCYzAaELMGXGHZf38kWaN8")
  },
  mounted() {

    this.$ue.OnLoginSuccess.addSubscriber(this.OnLoginSuccess)
    this.$ue.OnChangeSize.addSubscriber(this.OnChangeSize)
    this.$ue.OnSpawnDeviceClick.addSubscriber(this.OnSpawnDeviceClick)
    this.$ue.OnCameraDeviceClick.addSubscriber(this.OnCameraDeviceClick)
    this.$ue.OnSwitchVideo.addSubscriber(this.OnSwitchVideo)
    this.$ue.OnSceneSensorData.addSubscriber(this.OnSceneSensorData)
    this.$ue.OnCraneSensorData.addSubscriber(this.OnCraneSensorData)

  },
  beforeDestroy() {
    this.$ue.OnLoginSuccess.removeSubscriber(this.OnLoginSuccess)
    this.$ue.OnChangeSize.removeSubscriber(this.OnChangeSize)
    this.$ue.OnSpawnDeviceClick.removeSubscriber(this.OnSpawnDeviceClick)
    this.$ue.OnCameraDeviceClick.removeSubscriber(this.OnCameraDeviceClick)
    this.$ue.OnSwitchVideo.removeSubscriber(this.OnSwitchVideo)
    this.$ue.OnSceneSensorData.removeSubscriber(this.OnSceneSensorData)
    this.$ue.OnCraneSensorData.removeSubscriber(this.OnCraneSensorData)

  }
}
</script>

<style lang="scss">
@media screen and (max-width: 2000px){
  html{
    font-size:12px;
  }
  .basic-container{
  }
}
.basic-container {
  width: 100%;
  height: 100%;
  position: relative;

}
.basic-container-bg{
  position: absolute;
  width: 100%;
  height:100%;
  opacity: 0;
  z-index:-1;
}
.basic-container-bg-show{
  transition:all 0.5s ease 0.2s;
  opacity: 1;
  z-index:1;
}
.basic-container-bg-hide{
  transition:all 0.3s ease 0s;
  opacity: 0;
  z-index:-1;
}
.header {
  width:100%;
  position: absolute;
  top: 0;
  left: 0;
  height: $headerHeight;
}

.body {
  width:100%;
  height: (100%-$headerHeight)-$bottomTabHeight;
  position: absolute;
  top: $headerHeight;
  left: 0;
}

.footer {
  width:100%;
  position: absolute;
  bottom: 0;
  height: $bottomTabHeight;
}
</style>
