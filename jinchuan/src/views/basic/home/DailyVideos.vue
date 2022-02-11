<template>
  <div class="container">
    <div class="title">
      <slot name="title"></slot>
      <div class="title-tab">
        <li class="read-tab-item" v-for="(v,k) in readTabs" :key="k" v-text="v"
            :class="currentTabIndex==k?'read-tab-selected':''" @click="changeCurrentTabIndex(k)"></li>
      </div>
    </div>
    <div class="content">
      <q-carousel
          arrows
          animated
          infinite
          transition-prev="fade"
          transition-next="fade"
          v-model="slideIndex"
          :autoplay="5000"
          class="q-carousel-box"
          @mouseenter="autoplay = false"
          @mouseleave="autoplay = true"
          v-show="historyList.length>0"
          ref="carousel"
      >
<!--                  :autoplay="5000"
-->
        <q-carousel-slide class="q-carousel-slide" :name="k+1" :img-src="v.img_urls[0]" v-for="(v,k) in historyList" :key="k" @click="readVideo(v.video_urls[0],v.id,v.type)">
          <div class="slide-text-box">
            <div class="text-subtitle1" v-text="v.alarm_names"></div>
          </div>
          <img class="daily-video-play-btn" src="@/assets/images/video-play.png" alt="">
        </q-carousel-slide>

      </q-carousel>
<!--      <div class="carousel-control-box">
        <div @click="$refs.carousel.previous()">111</div>
      </div>-->
      <EmptyBox v-if="historyList.length===0" content="数据为空"/>
      <div class="carousel-pagination" v-show="historyList.length>0">
        <div class="pagination-home cursor-pointer" @click="slideIndex=1">首页</div>
        <p class="current-index" v-text="slideIndex"></p>
        <p class="page-center">/</p>
        <p class="total-count" v-text="historyList.length"></p>
        <div class="pagination-end cursor-pointer" @click="slideIndex=historyList.length">尾页</div>
      </div>
    </div>
  </div>
</template>

<script>
import EmptyBox from "@/functional/EmptyBox";

export default {
  name: "DailyVideos",
  components:{
    EmptyBox
  },
  data() {
    return {
      slideIndex: 1,
      autoplay:true,
      currentTabIndex: 0,
      readTabs: [
        "全部", "未查看", "已查看"
      ],
      historyList: [],
      nHistoryList: [],
      rHistoryList: [],
      allHistoryList: [],
    }
  },
  methods: {
    test(){
      alert(111)
    },
    changeCurrentTabIndex(k, isForce) {
      if (this.currentTabIndex == k && !isForce) {
        return
      }
      if (!isForce) {
        this.slideIndex = 1
      }

      this.currentTabIndex = k
      switch (k) {
        case 0:
          this.historyList = this.allHistoryList;
          break;
        case 1:
          this.historyList = this.nHistoryList
          break;

        case 2:
          this.historyList = this.rHistoryList
          break;
      }
    },
    async loadCurrentDayHistoryList(isInterval) {
      const is_current_day = true
      const page = -1

      let _this = this
      let nHistoryList = []
      let rHistoryList = []
      let allHistoryList = []
      const res = await this.$http.post(this.$apiServers.home.dailyHistoryVideos.api, {is_current_day, page,isInterval})
      console.log("-=-==res",res)
      const data = res.data
      if (res && res.count > 0) {
        for (const v of data) {
          v.alarm_names = ""
          if (v.img_urls && v.video_urls) {
            allHistoryList.push(v)
            if (v.type != 1) {
              nHistoryList.push(v)
            } else {
              rHistoryList.push(v)
            }
          v.alarm_names=v.alarm_arr.sort((a,b)=>{return b.level-a.level})[0].content
          /*  for (const k in v.alarm_arr) {
              if (k >= 2) {
                break
              }
              v.alarm_names += v.alarm_arr[k].content + " "
            }*/
          }


        }
        _this.rHistoryList = rHistoryList
        _this.nHistoryList = nHistoryList
        _this.allHistoryList = allHistoryList
        _this.changeCurrentTabIndex(_this.currentTabIndex, true)

      }
      clearInterval(_this.loadSetinterval)
      _this.loadSetinterval = setInterval(() => {
        _this.loadCurrentDayHistoryList(true)
        // location.reload();
      }, 1000 * 60)

    },
    async readVideo(url, id, typ) {

      if (!url || !id) {
        return
      }
      let that=this
      this.$ue.co(function*(){
        yield that.$ue.PlayVideo(url);
      })
      // this.$notify("发送给ue方法PlayVideo")
      if (typ == 1 || this.currentTabIndex == 2) {
        return
      }
      const type = 1
      //TODO 这个接口可以直接返回新的数据 或者 所有已读状态和未读状态暂存前端，切换页面或者一定时间进行更新
      const res = await this.$http.post("storage/update/by/id", {id, type})
      if (res === "ok") {

        this.loadCurrentDayHistoryList()
      }
    }

  },
  mounted() {
    this.loadCurrentDayHistoryList()
  },
  beforeDestroy() {
    clearInterval(this.loadSetinterval)
  }
}
</script>

<style scoped lang="scss">
$contentPaddingTB:0.5rem;
//@import "~@/assets/sass/pages/home";
.container {
  @extend %container;
}

.title {
  @extend %title;
}
.title-tab {
  @extend %title-tab;
}

.content {
  @extend %content;
  justify-content: center;
  padding:$contentPaddingTB 0;
}
.carousel-control-box{
  position:absolute;
  top:0;
  left:0;
  border:1px solid red;
  width:100%;
  height:100%;
}
.daily-video-play-btn{
  width:5rem;
  position: absolute;
}
.q-carousel-box{
  width:100%;
  height:100%;
  background:rgba(0,0,0,0.3);
  border-radius: 0.5rem;
  overflow: hidden;
}
.q-carousel-slide{
  display: flex;
  align-items: center;
  justify-content: center;
  background-repeat: no-repeat;
  //轮播图片大小 TODO 这样会有拉伸或压缩
  background-size: 100% 100%;

}

$pageBottomPosition:1.5rem;

.slide-text-box{
  position:absolute;
  width:100%;
  height:2rem;
  display: flex;
  align-items: center;
  padding-left:1rem;
  color:white;
  bottom:$pageBottomPosition - $contentPaddingTB;
  margin:0;
}
.carousel-pagination {
  width: 100%;
  height:2rem;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom:$pageBottomPosition;
}
.pagination-home,.pagination-end{
  padding:0 0.5rem;
  //border:1px solid white;
  border-radius: 0.3rem;
  box-shadow: inset 0 0 10px #333;
}
.pagination-home:hover,.pagination-end:hover{
  box-shadow: inset 0 0 10px #eee;

}
.carousel-pagination>* {
  margin: 0;
  color: #fff;
}
.page-center {
  padding: 0 0.5rem;
}
.current-index {
  font-weight: 900;
  font-size: 16px;
  padding-left:0.5rem;
}
.total-count {
  font-size: 16px;
  padding-right:0.5rem;

}

.read-tab-item {
  @extend %middleFontSize;
  color: white;
  padding: 0.2rem;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 0.2rem;
}

.read-tab-selected {
  border-color: rgba(3, 40, 85, 1);
  background: rgba(3, 40, 85, 0.5);
  color: $titleColor;
}
</style>
