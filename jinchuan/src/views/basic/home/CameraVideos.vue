<template>
  <div class="container">
    <div class="cursor-pointer" style="position:fixed;z-index:999;top:70%;left:5%;width:20rem;" v-show="isShowTest">
      <button class="cursor-pointer" type="button" style="width:2rem;margin:0.2rem;cursor: pointer !important;" v-for="(v,k) in cameraVideos" :key="k" v-text="v.sn" @click="changeCameraVideos(k)"></button>
    </div>
    <div class="fixed-container">
      <transition name="fade">
        <div class="big-video-container" v-show="currentBigVideoUrl">
          <transition name="scale">
            <div class="big-video-img-box" v-if="isBigVideoScale">
              <div class="big-video-iframe-box">
                <iframe v-if="!currentBigVideoUrl.includes('furnace_thermal')"  :src="currentBigVideoUrl"  frameborder="0" style="width:1800px;height:840px;border-radius:5px;overflow:hidden;" scrolling="no"></iframe>
                <iframe v-if="currentBigVideoUrl.includes('furnace_thermal')"  :src="currentBigVideoUrl"  frameborder="0" style="width:1200px;height:700px;border-radius:5px;overflow:hidden;" scrolling="no"></iframe>
<!--                width:768px;height:576px;-->
                <img src="@/assets/images/home/close-1.png" class="close-big-video-btn cursor-pointer"
                     @click="switchBigVideo(false)">
              </div>


            </div>
          </transition>
        </div>
      </transition>

      <div class="more-videos-container">
        <transition name="more-videos" v-for="(v,k) in moreCamerasDetail" :key="k" appear mode="out-in">
          <div class="more-videos-box" v-if="moreVideosShow">
            <p class="more-video-name" v-text="v.name"></p>
<!--moreVideosShow?v.url:'/images/defalut-video.png'-->
            <div class="more-videos cursor-pointer"
                 :class="currentVideoIndex===k?'video-selected':''">
              <div style="width:100%;height:100%;position: absolute;z-index:99;" @click="switchBigVideo(k)"></div>
              <iframe frameborder="0" style="width:580px;height:320px;border-radius:5px;margin-top:0.5rem;overflow:hidden;display: block;margin: 0 auto;" scrolling="no" :src="v.urls[0]"
              ></iframe>
            </div>

<!--            onerror="javascript:this.src='/images/defalut-video.png'"-->
          </div>
        </transition>

      </div>
    </div>
    <div class="title">
      <slot name="title"></slot>
      <div style="position:relative;z-index:5;width:5rem;height:1rem;" @click="isShowTest=!isShowTest"></div>
      <div class="title-tab">
        <img class="switch-video-btn cursor-pointer" :src="switchImgUrl" alt="" @click="switchMoreVideos(false)">
      </div>
    </div>
    <div class="content" @mouseout="closeAudioCall">

      <div class="audio-call-box">
        <div class="audio-call-bg-box" v-show="isAudioCall">
          <div class="audio-call-text">
            请开始讲话>>>
          </div>
          <img src="@/assets/images/home/audio_call_bg.png" alt="" class="audio-call-bg-img">
        </div>
        <img src="@/assets/images/home/audio_call.png" alt="" class="audio-call-img" @mousedown="audioCall(true)"
             @mouseup="audioCall(false)">
      </div>
      <div class="current-video" :class="currentVideoIndex===-1?'video-selected':''">
        <div style="width:100%;height:100%;position: absolute;z-index:99;" @click="switchBigVideo(-1)"></div>
        <iframe :src="lastVideoUrls[0]"  frameborder="0" style="width:580px;height:320px;border-radius:5px;overflow:hidden;display: block;margin: 0 auto;" scrolling="no"
        ></iframe>
<!--        :src="lastVideoUrls[0]"-->
      </div>

<!---->
    </div>
  </div>
</template>

<script>

export default {
  name: "CameraVideos",

  data() {
    return {
      isShowTest:false,
      isAudioCall: false,
      cameraVideosDefault:[{name: "相机加载中",urls:["",""],sn:"1"}, {name: "相机加载中",urls:["",""],sn:"1"}, {name: "相机加载中",urls:["",""],sn:"1"}, {name: "相机加载中",urls:["",""],sn:"1"}, {name: "相机加载中",urls:["",""],sn:"1"}],
      // camerasDetailList: [{name: "相机加载中",urls:[1,2],sn:"1"}, {name: "相机加载中",urls:[1,2],sn:"1"}, {name: "相机加载中",urls:[1,2],sn:"1"}, {name: "相机加载中",urls:[1,2],sn:"1"}, {name: "相机加载中",urls:[1,2],sn:"1"}],
      lastVideoUrls:[],
      moreCamerasDetail:null,
      currentBigVideoUrl: null,
      currentVideoIndex: null,
      switchImgUrl: `${require('@/assets/images/home/open-arrow.png')}`,
      moreVideosShow:false,
      bigVideoShow:false,
      imgSrcTimeOut:null,
      isBigVideoScale:false,

      cameraVideos:[
      ]
    }
  },
  watch:{
    currentBigVideoUrl:function(old,val){
      console.log(old,val,this.moreVideosShow)
      if (!old&&!this.moreVideosShow){
        this.$store.commit("setSensorInfoShow",true)
      }else{

        this.$store.commit("setSensorInfoShow",false)
      }
      if(!old){
        this.isBigVideoScale=false
        return
      }
      if(old!=val){
        this.isBigVideoScale=false
        setTimeout(()=>{
          this.isBigVideoScale=true
        },500)
      }

    },
    moreVideosShow:function(val){
      if (!val&&!this.currentBigVideoUrl){
        this.$store.commit("setSensorInfoShow",true)
      }else{
        this.$store.commit("setSensorInfoShow",false)
      }
    },
    "$store.state.cameraVideos":function(v){
      this.cameraVideosChangeHandler(v)
    }
  },

  computed:{

  },

  methods: {
    changeImgSize(){
/*      var _iframe = document.getElementById('iframe2').contentWindow.document.getElementsByTagName('body')[0]  //get iframe下的id
      _iframe.style.border="1px solid red"
      console.log("------",_iframe)*/
    },
    errorHandler(param){
      alert(param)
    },
    randomNum(minNum,maxNum){

      return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10);

},
    changeCameraVideos(k){
      let cameras=[]
      for (let i = 0; i <4; i++) {
        cameras.push(this.cameraVideos[this.randomNum(0,33)])
      }
      cameras.push(this.cameraVideos[k])
      this.$notify("sn="+this.cameraVideos[k].sn)
      this.$store.commit("changeCameraVideos",cameras)
      // this.cameraVideosChangeHandler(cameras)
    },
    getRandomUrl(url){
      return url+"&id="+Math.ceil(Math.random()*10000)
    },
      cameraVideosChangeHandler(v){
        let val=v?v:this.cameraVideosDefault
        this.moreCamerasDetail=val.slice(0,3)
        this.lastVideoUrls= val[val.length-1].urls
        if (this.isBigVideoScale){
          this.currentBigVideoUrl=this.lastVideoUrls[1]
        }
        this.switchMoreVideos(true)

        // this.$notify("当前相机视频地址："+this.lastVideoUrls[0])
      },
    closeAudioCall(){
      // let cameras = this.$store.state.cameraVideos?this.$store.state.cameraVideos:[{name: "相机加载中",urls:[1,2],sn:"1"}, {name: "相机加载中",urls:[1,2],sn:"1"}, {name: "相机加载中",urls:[1,2],sn:"1"}, {name: "相机加载中",urls:[1,2],sn:"1"}, {name: "相机加载中",urls:[1,2],sn:"1"}]
      this.isAudioCall = false
      let that=this
      this.$ue.co(function*(){
        yield that.$ue.SetTalkStatus(0,false);
      })
    },
    audioCall(isdown) {
      let cameras = this.$store.state.cameraVideos
      if (!cameras||!cameras[cameras.length - 1].sn || cameras[cameras.length - 1].sn == 0) {
          this.$dialog("警告","sn为空")
          this.isAudioCall=false
        return
      }
      this.isAudioCall = !this.isAudioCall
      let that=this
      // this.$notify("发给ue实时喊话sn="+cameras[cameras.length - 1].sn)
      this.$ue.co(function*(){
        yield that.$ue.SetTalkStatus(cameras[cameras.length - 1].sn,isdown);
      })
    },
    switchBigVideo(index) {
      this.currentVideoIndex = index
      if (index === false) {
        this.currentVideoIndex = false
        this.bigVideoShow = false
        this.currentBigVideoUrl=null
  /*      setTimeout(()=>{
          this.$refs['big-video'].src=this.currentBigVideoUrl
        },500)*/
      } else {
        this.bigVideoShow = true

        if (index === -1) {
          this.currentBigVideoUrl = this.lastVideoUrls[1]
          // this.$refs['big-video'].src=this.currentBigVideoUrl
        } else {
          this.currentBigVideoUrl = this.moreCamerasDetail[index].urls[1]
          // this.$refs['big-video'].src=this.currentBigVideoUrl

        }
      }
      document.getElementById("iframe").onload=($event)=>{
        console.log($event)
        this.iframeclick(-1,$event)
      }
    },

    switchMoreVideos(isFlushVideos) {
        if(!isFlushVideos){
          this.moreVideosShow = !this.moreVideosShow
        }
      if (this.moreVideosShow) {
        this.switchImgUrl = `${require('@/assets/images/home/close-arrow.png')}`

/*
          this.$refs['more-videos'].forEach((v)=>{
            let url=v.getAttribute("data-src")+"&id="+Math.ceil(Math.random()*1000)
            console.log("url---",url)
            v.src=url
          })*/
        this.$nextTick(()=>{
          this.changeImgSize()

        })
      } else {
        this.switchImgUrl = `${require('@/assets/images/home/open-arrow.png')}`

/*        clearTimeout(this.imgSrcTimeOut)
        this.imgSrcTimeOut=setTimeout(()=>{
          this.$refs['more-videos'].forEach(v=>{
            v.src=`${require('@/assets/images/defalut-video.png')}`
          })

        },500)*/

      }
    },
    //巡检相机切换
/*    OnSwitchVideo(cameras_data){
      // let cameras = JSON.parse(cameras_str)
      let cameras=cameras_data.data

      if (cameras.length<5||!cameras[4].sn||cameras[4].urls.length<2){
        this.$notify("ue传入的相机视频数据不合法")
        return
      }
      console.log("ue cameravideos-----",cameras)
      this.cameraVideosChangeHandler(cameras)

    },*/

  },
  async created(){
    if (!this.moreCamerasDetail){
      this.cameraVideosChangeHandler(this.$store.state.cameraVideos)
    }
    const res=await this.$http.get("camera/list")
    let cameras=[]
    res.data.forEach(v=>{
      let obj={}
      obj.name=v.scan_location_desc
      obj.sn=v.sn
      obj.urls=v.video_urls
      cameras.push(obj)
    })
    this.cameraVideos=cameras
  },
  mounted() {
  // console.log(document.getElementById('iframe').contentDocument.getElementsByTagName("img"))
    // this.$ue.OnSwitchVideo.addSubscriber(this.OnSwitchVideo)

  },
  beforeDestroy() {
    // this.$ue.OnSwitchVideo.removeSubscriber(this.OnSwitchVideo)
    // clearTimeout(this.imgSrcTimeOut)

  }
}
</script>
<style>
body{
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
<style scoped lang="scss">
//@import "~@/assets/sass/pages/home";
$bigVideoHeight:64.8%;
$moreVideoHeight:27%;
.container {
  @extend %container;
}

.title {
  @extend %title;
}
$contentPaddingTB:0.5rem;
.content {
  @extend %content;
  justify-content: center;
  padding:$contentPaddingTB 0;
}
.title-tab {
  @extend %title-tab;
}
.fixed-container{
  position:fixed;
  width:$leftWidth - ($outerContainerPadding*2);
  top:$headerHeight;
  left: $outerContainerPadding;
  height:100%-$headerHeight;
}
.current-video {
  width: 100%;
  height: 100%;
  border-radius: 0.3rem;
  outline: none;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.audio-call-box {
  position: absolute;
  z-index:9999;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  bottom:$contentPaddingTB;
  padding:1rem;
}

.audio-call-bg-box {
  width:auto;
  height:auto;
  position: absolute;
  left: 3.5rem;
  display: flex;
  align-items: center;
}

.audio-call-text {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  color: #fff;
  z-index:2;
  padding-left: 30%;
}
.audio-call-bg-img {
  width:auto;
  height:2rem;
  transform: rotateY(180deg);
}

.audio-call-img {
  width:4rem;
  height:4rem;
  position: relative;
  z-index: 3;
  border-radius: 50%;
  border: 2px solid transparent;
  cursor: pointer;
}

.audio-call-selected {
  transition: all 0.3s ease;
  border-color: #ccc;
}
.big-video-container {
  width: 100%;
  height: auto;
  padding:0.5rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-image: url(~@/assets/images/home/big-video-bg.png);
  background-size: 100% 100%;
  top:0;
}
.big-video-img-box {
  width: 100%;
  height:100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.big-video-iframe-box{
/*  width:100%;
  height:100%;*/
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position:relative;
  min-width:1800px;
  min-height:840px;
}
.big-video {
  width: 100%;
  height: auto;
  max-height:100%;
  border-radius: 0.4rem;
}
.close-big-video-btn {
  width: 2.5rem;
  height: 2.5rem;
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}
.more-videos-container {
  position:fixed;
  width: 100% - ($outerContainerPadding * 2) - $rightWidth;
  overflow: hidden;
  height:auto;
  //height: (100% - $bigVideoHeight) -$topHeight - $bottomTabHeight;
  display: flex;
  align-items: center;
  justify-content: space-between;
  bottom:$bottomTabHeight;
}
.more-videos-container>* {
  margin: 0;
}
.more-videos-box {
  //min-width: 24%;
  min-width:26%;
  width:auto;
  height: 100%;
  background-image: url(~@/assets/images/home/more-video-bg.png);
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding:0.5rem 1rem;
  position:relative;

}
.more-video-name{
  @extend %middleFontSize;
  color:white;
  height:$homeContainerTopHeight;
  display: flex;
  align-items: center;
}
.more-videos{
  width:100%;
  //height:100% - $homeContainerTopHeight;
  border-radius: 0.4rem;
  position: relative;
  overflow: hidden;
}
.fade-enter,.fade-enter-active,.fade-leave-active{
  transition: all 0.3s ease-in-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.scale-enter,.scale-enter-active,.scale-leave-active{
  transition: all 0.3s ease-in-out;
}
.scale-enter,
.scale-leave-to {
  transform: scale(0.6);
  opacity: 0;
}
.more-videos-enter,.more-videos-enter-active,.more-videos-leave-active  {
  transition: all 0.3s ease-in-out;
}
.more-videos-enter,
.more-videos-leave-to {
  transform: translateX(2rem);
  opacity: 0;
}
</style>
