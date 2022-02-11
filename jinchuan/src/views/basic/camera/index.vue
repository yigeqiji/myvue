<template>
<div class="container" v-forbidden-select>

  <div class="left-container" :class="containerShow?'left-container-show':'left-container-hide'">
    <img src="@/assets/images/camera/lr-bg.png" alt="" class="left-container-bg">
    <div class="left-content-container content-container">
      <div class="content-title">设备规格</div>
      <div class="info-container">
        <ul class="info-ul">
          <li class="info-li" v-for="(v,k) in infoItems" :key="k">
            <div class="info-item" v-text="v.item"></div>
            <div class="info-value" v-text="info[v.valueKey]"></div>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <div class="center-container" :class="containerShow?'center-container-show':'center-container-hide'">
    <img class="camera-video-img" :src="info.video_url" alt="" v-img-error>
  </div>

  <div class="right-container" :class="containerShow?'right-container-show':'right-container-hide'">
    <img src="@/assets/images/camera/lr-bg.png" alt="" class="right-container-bg">
    <div class="right-content-container content-container">
      <div class="content-title">违规统计</div>
      <div class="info-container">
        <ul class="info-ul">
          <li class="info-li right-info-li" v-for="(v,k) in alarmInfos" :key="k">
            <div class="info-item" v-text="v.content"></div>
            <div class="info-value">{{v.count}} 次</div>
          </li>
        </ul>
      </div>

    </div>
  </div>
  <transition name="fade">
  <div class="bottom-name-container" v-text="info.scan_location_desc">

  </div>
  </transition>

  <transition name="fade">

  <div class="back-box cursor-pointer" @click="closeCamera">
    <img class="back-box-img" src="@/assets/images/device-item-bg.png" alt="">
    <div class="back-box-text">返回主页</div>
  </div>
  </transition>

</div>
</template>

<script>
export default {
  name: "index",
  data(){
    return{
      containerShow:false,
      sn:1,
      infoItems:[{item:"相机名称",valueKey:"scan_location_desc"},{item:"监控区域",valueKey:"scan_area"},{item:"监控类型",valueKey:"duty_str"},{item:"相机状态",valueKey:"status_str"}],
      info: {},

      alarmInfos:[],
    }
  },
  methods:{
    closeCamera(){
      this.containerShow=false
      let that=this
      setTimeout(()=>{
        // this.$notify("发送给ue方法：CloseDeviceInfo")
        this.$ue.co(function*(){
          yield that.$ue.CloseDeviceInfo();
        })
        this.$router.push({name:"home"})
      },300)

    },
    async loadCameraInfo(){
      const res=await this.$http.get("camera/info/by/sn",{sn:this.sn})
      res.status_str=res.status===1?'正常':'下线';
      this.info=res
    },
    async loadCameraAlarm(){
      const res=await this.$http.post("alarm/history/stats/by/sn",{sn:String(this.sn)})
      console.log(res)
      this.alarmInfos=res.alarm_infos
    }
  },
  created() {
    const sn=this.$route.query.sn
    if(!sn || sn===""){
      this.$dialog("error","sn is empty",true,()=>{this.$router.push({name:"home"})})

      return
    }
    this.sn =sn
    this.loadCameraInfo()
    this.loadCameraAlarm()
    setTimeout(()=>{
      this.containerShow = true
    },5)

  }
}
</script>

<style scoped lang="scss">

.back-box {
  position: absolute;
  width: 18%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  right: 1%;
  bottom: 3.5%;
  z-index:2;
}

.back-box-img {
  width: 50%;
  position: absolute;
}

.back-box-text {
  color: #fff;
  position: relative;
  z-index: 2;
  @extend %titleFontSize;
}

.container{
  position:relative;
  overflow: hidden;
  display: flex;
  align-items: flex-start;
  justify-content: center;

}
.left-container,.right-container{
/*  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;*/
  width:16%;
  position: absolute;
  opacity: 0;
  top:0;
}
.left-container-bg,.right-container-bg{
  width:100%;
}
.left-container{
  left: -100%;

}
.right-container{
  right:-100%;
}
.content-container{
  position:absolute;
  top:0;
  width:100%;
  height:100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.content-title{
  width:100%;
  display: flex;
  height:8%;
  align-items: center;
  justify-content: center;
  @extend %bigFontSize;
  color:$itemNameColor;
}

.center-container{

  overflow: hidden;
  width:60%;
  height:70%;
  //min-height:70%;
  //background:rgba(101,164,200,0.9);
  margin-top:2rem;
  padding:1.5rem 2.5rem;
  background: url(~@/assets/images/home/more-video-bg.png) no-repeat;
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
/*  border:0.5rem solid rgba(88,199,241,1);
  box-shadow:0 0 1.5rem rgba(88,199,241,1);*/
  opacity: 0;
  position:relative;
}


.left-container-show,.right-container-show,.center-container-show {
  transition: all 0.3s ease;
  opacity: 1;
  z-index: 2;
}
.center-container-show{
  transition: all 0.3s ease 0.5s;
}
.left-container-show{
  left: $outerContainerPadding;
}
.right-container-show{
  right: $outerContainerPadding;

}
.left-container-hide,.right-container-hide,.center-container-hide {
  transition: all 0.2s ease 0s;
  opacity: 0;
  z-index: -1;
}
.left-container-hide{
  left: -100%;
}
.right-container-hide{
  left: -100%;
}
.center-container-bg{
  width:100%;
}

.camera-video-img{
  width:100%;
  height:100%;
  border-radius: 0.5rem;
}
.info-container{
  width:100%;
  padding:1rem 1.5rem;
}
.info-ul{
}
.info-li{
  display: flex;
  align-items: center;
}
.right-info-li{
  justify-content: space-between;
}
.info-li:not(:first-child){
  margin-top:1rem;
}
.info-item{
  width:auto;
  white-space: nowrap;
  min-width:6rem;
  @extend %titleFontSize;
  color:$itemNameColor;
  height:100%;
  align-self: flex-start;
}
.info-value{
  @extend %middleFontSize;
  color:white;
}


.bottom-name-container{
  position:absolute;
  z-index:5;
  display: flex;
  align-items: center;
  justify-content: center;
  width:auto;
  height:10%;
  bottom:0;
  color:$itemNameColor;
  letter-spacing: 0.5rem;
  //font-weight: 900;
  font-size:2rem;
}
</style>