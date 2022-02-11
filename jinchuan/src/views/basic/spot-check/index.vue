<template>
<!--  <transition name="fade">-->
  <div class="container"  v-forbidden-select>
    <!--left-container start  -->
    <div class="left-container" :class="appShow?'container-show-left':'container-hide-left'">
      <div class="base-info-container">
        <div class="container-common-title">
          <p class="container-common-title-text">设备规格</p>
        </div>
        <ul class="base-info-item-box">
          <li class="base-info-item" v-for="(v) in equipmentDetails.base_info_arr" :key="v.id">
            <p class="base-info-item-name" v-text="v.k"></p>
            <p class="base-info-item-text" v-text="v.v"></p>
          </li>
        </ul>
      </div>
      <!-- :class="equipmentBaseInfos.length>0?'container-show-left':'container-hide-left'" -->
      <div class="spot-check-content-container">
        <div class="container-common-title">
          <p class="container-common-title-text">点检记录</p>
        </div>
        <ul class="spot-check-item-box">
          <li class="spot-check-item" v-for="(v,k) in equipmentSpotChecks" :key="k"
              :class="currentSpotCheckIndex==k?'spot-check-item-selected':''"
              @click="changeCurrentSpotCheckIndex(k,v.id)">
            <p class="spot-check-item-name" v-text="v.k"></p>
            <p class="spot-check-item-text" v-if="dailySpotCheckCounts[v.id]&&dailySpotCheckCounts[v.id].length>0">已点检
              <b v-text="dailySpotCheckCounts[v.id].length"></b>次
            </p>
            <p class="spot-check-item-text-not" v-else>未点检</p>

          </li>
        </ul>
      </div>

    </div>
    <!--left-container end  -->

    <!-- right-container start -->
    <div class="right-container" :class="appShow?'container-show-right':'container-hide-right'">

      <div class="filter-container">
        <div class="filter-item">
          <div class="filter-data-title">查询时间：</div>
          <div class="filter-data-box">
            <div class="q-pa-md">
              <q-input filled v-model="start_time" color="teal">
                <template v-slot:append>
                  <div class="filter-time-img-box">
                  </div>
                  <q-popup-proxy transition-show="scale" transition-hide="scale"
                                 anchor="bottom left" ref="start_time">
                    <q-date :emit-immediately='true' v-model="start_time" mask="YYYY-MM-DD" :no-unset="true"
                            style="background:rgba(14, 21,49,1);color:white;" color="timeTop">
                  <!--  @input="closePopup('start_time')"  选择后立即关闭-->

                      <div class="time-popup-proxy-box">
                        <div class="time-popup-proxy-btn" @click="timeToCurrent('start_time')">此刻</div>
                        <div class="time-popup-proxy-btn time-assure-btn" @click="hidePop('start_time')">
                          确定
                          <!--                                                    <q-btn v-close-popup style="position:absolute;background:rgba(0,0,0,0);width:100%;height:100%;top:0;left:0;box-shadow:none;" label=""/>-->
                        </div>
                      </div>

                    </q-date>
                  </q-popup-proxy>
                </template>

              </q-input>
            </div>
            <img class="filter-time-img cursor-pointer" src="@/assets/images/spot-check/calendar.png" alt="">
          </div>
        </div>
      </div>

      <!--  TODO 这个可以抽出一个时间线的组件    -->
      <div class="time-line-container-box" ref="scroll-container-box">

        <!--    time-line-container start    -->
        <div class="time-line-container scroll-bar" ref="scroll-container" :class="!spotCheckDetailShow?'container-show-left':'container-hide-left'">

          <div class="time-item-container" v-for="(v,k) in spotCheckList" :key="'list'+v.id">

            <div class="time-line-time-box">
              <div class="time-line-circle" :style="`background:${v.color};`"></div>
              <div class="time-line-time" v-text="v.created_time" :style="`color:${v.color};`"></div>
            </div>

            <div class="time-line-content-container">
              <div class="time-line-left-line-box">
                <div class="time-line" :style="`background:${v.color};`"></div>
              </div>
              <div class="time-line-content-box" @click="showSpotCheckDetail(k,true)">
                <ul class="content-detail-box cursor-pointer">
                  <li class="detail-item">
                    <p class="detail-item-name">点检人</p>
                    <p class="detail-item-text" v-text="v.user_name"></p>
                  </li>
                  <li class="detail-item detail-item-color-1">
                    <p class="detail-item-name">设备状态</p>
                    <p class="detail-item-text"
                       v-text="v.normal_status==NormalStatus.abnormal?'存在隐患':'正常'"
                       :style="`color:${v.color};`"></p>
                  </li>
                  <li class="detail-item detail-item-color-1">
                    <p class="detail-item-name">是否完成</p>
                    <p class="detail-item-text"
                       v-text="v.finish_status==NormalStatus.abnormal?'未完成':'已完成'">
                    </p>
                  </li>
                  <li class="detail-item detail-item-look">
                    <p class="detail-item-name"></p>
                    <p class="detail-item-text">查看详情</p>
                  </li>
                </ul>

              </div>
            </div>
          </div>

            <EmptyBox v-if="spotCheckList.length===0" content="点检记录为空"/>
            <LoadingBox v-if="spotCheckList.length>0" :content="loadingAll?'已加载全部':'加载中...'"/>
        </div>
        <!--    time-line-container end    -->




      <!-- detail-time-line-container start" -->
      <div class="time-line-container scroll-bar detail-time-line-container"
           :class="spotCheckDetailShow?'container-show-left':'container-hide-left'"
           :style="currentItemKey>-1?'padding-top:3rem;':''">

        <div class="fixed-top-container">
          <img src="@/assets/images/spot-check/return.png" class="detail-close-btn cursor-pointer"
               @click="showSpotCheckDetail(-1,false)"/>
          <div class="father-item-box" v-if="currentItemKey>-1">
            <ul class="father-item-ul">
              <li class="father-item-li">
                <p class="father-item-name">开始时间</p>
                <p class="father-item-text" v-text="spotCheckList[currentItemKey].created_time"></p>
              </li>
              <li class="father-item-li">
                <p class="father-item-name">点检人</p>
                <p class="father-item-text" v-text="spotCheckList[currentItemKey].user_name"></p>
              </li>
              <li class="father-item-li">
                <p class="father-item-name">是否完成</p>
                <p class="father-item-text"
                   v-text="spotCheckList[currentItemKey].finish_status==NormalStatus.abnormal?'未完成':'已完成'">
                </p>
              </li>
            </ul>
          </div>
        </div>


        <div class="time-item-container time-item-detail-container" v-for="(v,k) in spotCheckDetailList"
             :key="v.id">

          <div class="time-line-time-box">
            <div class="time-line-circle" :style="`background:${v.part_status_color};`"></div>
            <div class="time-line-time" v-text="v.created_time"
                 :style="`color:${v.part_status_color};`">
            </div>
          </div>

          <div class="time-line-content-container">
            <div class="time-line-left-line-box">
              <div class="time-line" :style="`background:${v.part_status_color};`"></div>
            </div>
            <div class="time-line-content-box">

              <ul class="content-detail-box">
                <li class="detail-item detail-detail-item">
                  <p class="detail-item-name">点检人</p>
                  <p class="detail-item-text" v-text="v.user_name"></p>
                </li>
                <li class="detail-item detail-detail-item">
                  <p class="detail-item-name">点检部位{{ v.spot_check_id }}</p>
                  <p class="detail-item-text" v-text="v.part_name"></p>
                </li>
                <li class="detail-item">
                  <p class="detail-item-name detail-item-color-1">点检情况</p>
                  <p class="detail-item-text" v-text="v.part_status_text"
                     :style="`color:${v.part_status_color};`"></p>
                </li>
                <li class="detail-item" v-if="v.part_status==NormalStatus.abnormal">
                  <p class="detail-item-name detail-item-color-1">是否整改</p>
                  <p class="detail-item-text" v-text="v.part_review_status_text"
                     :style="`color:${v.review_status_color};`"></p>
                </li>
                <li class="detail-item detail-detail-item" v-if="v.part_status_desc!=''">
                  <p class="detail-item-name" style="align-self: flex-start;">备注</p>
                  <p class="detail-item-text" v-text="v.part_status_desc"></p>
                </li>
                <li class="detail-item detail-img-item" v-if="v.img_urls&&v.img_urls.length>0">
                  <p class=" detail-item-name detail-item-color-1">
                    点检图片</p>
                  <div class="detail-img-box" ref="galley">
                    <div class="detail-img-wrap" v-for="(url,imgk) in v.img_urls" :key="k+''+imgk">
                      {{imgk}}
                      <img class="detail-img cursor-pointer" :src="url" alt=""
                           :data-original="url" @error="removeImg(imgk,k,$event)">
                    </div>
                    <div style="opacity:0;" v-for="(lv,lk) in 2-v.img_urls.length%2" :key="lk" v-show="v.img_urls.length%2!=0">
                    </div>

                  </div>
                </li>
              </ul>

            </div>
          </div>
        </div>
        <EmptyBox v-if="spotCheckDetailList.length===0" content="点检记录为空"/>
      </div>
        <!-- detail-time-line-container end" -->
      </div>
<!-- time-line-container-box end     -->
    </div>
    <!-- right-container end -->
      <div class="bottom-name-container" v-text="equipmentDetails.name">

      </div>

    <div class="back-box cursor-pointer" @click="closeEquipment">
      <img class="back-box-img" src="@/assets/images/device-item-bg.png" alt="">
      <div class="back-box-text">返回主页</div>
    </div>
  </div>
<!--  </transition>-->
</template>

<script>
import EmptyBox from "@/functional/EmptyBox";
import LoadingBox from "@/functional/LoadingBox";
import Viewer from 'viewerjs';
import 'viewerjs/dist/viewer.css';

const NormalStatus = {
  normal: 1,
  abnormal: 2
}
const SpotCheckStatus = {
  normal: 1,
  abnormal: 2
}
export default {
  name: "spot-check",
  components: {EmptyBox,LoadingBox},
  data() {
    return {
      viewer:[],
      viewerOptions: {
        url: 'data-original',
        navbar: false,
        title: false,
        toolbar: {
          oneToOne: true,
          prev: true,
          next: true,
          close: () => {
           this.viewer.forEach(v=>{
             v&&v.hide()
           })
          },
        },
      },

      appShow: false,
      //左侧的点检点选中index
      currentSpotCheckIndex: -1,
      equipment_id: -1,
      start_time: this.getNowFormatDate(),
      equipmentDetails: [],
      equipmentSpotChecks: [],
      dailySpotCheckCounts: {},
      spotCheckList: [],
      currentItemKey: -1,
      spotCheckDetailList: [],

      spotCheckDetailShow: false,

      NormalStatus,
      SpotCheckStatus,

      normalColor: "rgba(27,220,154,1)",
      abnormalColor: "red",

      page:1,
      loadingAll:false,

      scrollContainerHeight:900,
      debounceFlag:null,
    }
  },
  watch: {
/*    start_time: async function (start_time, old) {
      this.currentSpotCheckIndex = -1
      if (start_time != old) {
        this.page=1
        this.currentItemKey = -1
        this.spotCheckDetailShow = false
        // this.spotCheckList=[]
        await this.loadSpotCheckLog({ page:1,start_time })

      }
    }*/
  },

  methods: {
    hidePop(ref) {
      this.currentSpotCheckIndex = -1
        this.page=1
        this.currentItemKey = -1
        this.spotCheckDetailShow = false
        this.spotCheckList=[]
        this.dailySpotCheckCounts=[]
        this.loadingAll=false
       this.loadSpotCheckLog({ page:1,start_time:this.start_time })
      this.$refs[ref].hide()
    },
    timeToCurrent(ref) {
      this[ref] = this.$moment(new Date()).format("YYYY-MM-DD")
      // this.$refs[ref].hide()
      this.hidePop(ref)
    },
    getNowFormatDate() {
      // return "2021-02-18"
      // return "2021-03-15"
      return this.$moment(new Date()).format("YYYY-MM-DD");

    },
    closePopup(ref) {
      this.$refs[ref].hide()
    },
    changeCurrentSpotCheckIndex(index, spot_check_id) {
      if (this.currentSpotCheckIndex == index) {
        return
      }
      this.currentSpotCheckIndex = index
      this.loadFilterListBySpotCheck(spot_check_id)
    },
    removeImg(imgK, k, event) {
      event.currentTarget.parentElement.remove()
      this.spotCheckDetailList[k].img_urls.splice(imgK, 1)
      console.log(imgK, event.currentTarget.parentElement)

    },
    async loadFilterListBySpotCheck(spot_check_id) {
      let ids=this.dailySpotCheckCounts[spot_check_id]&&this.dailySpotCheckCounts[spot_check_id].length>0?this.dailySpotCheckCounts[spot_check_id]:[]
      console.log("ids=====",ids)
      if (ids.length===0){
        this.spotCheckDetailList=[]
        this.$notify("点检点记录为空","left")
        return
      }
      const res = await this.$http.post("equipment/spot_check_log/list", {ids})
      console.log("res----",res)
      if (res) {
        this.currentItemKey = -1
        for (const r of res.data.res) {
          r.part_status_color = r.part_status == NormalStatus.abnormal ? this.abnormalColor : this.normalColor;
          r.review_status_color = r.part_review_status == NormalStatus.abnormal ? this.abnormalColor : this.normalColor;
        }

        this.spotCheckDetailList = res.data.res
        this.spotCheckDetailShow = true
        //解决再次加载 viwer不显示问题
        this.viewer.forEach(v=>{
          v.destroy();
        })
        this.viewer=[]
        this.$nextTick(()=>{
          this.$refs.galley&&this.$refs.galley.forEach(v=>{
            this.viewer.push(new Viewer(v,this.viewerOptions))
          })
        })
      }

    },
    closeEquipment() {
      let _this = this
      _this.appShow = false
      this.$router.push({
        name:"home"
      })
      setTimeout(() => {

        _this.equipment_id = -1
        _this.currentItemKey = -1
        _this.start_time = _this.getNowFormatDate()
        _this.spotCheckList = []
        _this.spotCheckDetailList = []
        _this.equipmentDetails = []
        _this.equipmentSpotChecks = []
        _this.spotCheckDetailShow = false

        // this.$notify("发送给ue方法：CloseDeviceInfo")
        this.$ue.co(function*(){
          yield _this.$ue.CloseDeviceInfo();
        })
        // this.$ue4('OnClick_ShowDeviceBreak');

      }, 300)
    },
    async showSpotCheckDetail(key, show) {

      if (show === true) {
        if (key >= 0) {
          const pid = this.spotCheckList[key].id
          const res = await this.loadSpotCheckLog({pid})
          console.log("res====",res)

          if (res) {
            this.currentItemKey = key
            this.spotCheckDetailList = res
            this.spotCheckDetailShow = true
            this.viewer.forEach(v=>{
              v.destroy();
            })
            this.viewer=[]
            this.$nextTick(()=>{
              this.$refs.galley.forEach(v=>{
                this.viewer.push(new Viewer(v,this.viewerOptions))
              })
            })

          }else{
            this.$notify("点检记录为空")
          }

        }
      } else {
        this.currentSpotCheckIndex = -1
        this.spotCheckDetailShow = false
      }
    },
    async loadEquipmentDetail() {

      const res = await this.$http.get("equipment/info/by/id", {id: this.equipment_id})
      console.log(res)
      if (res) {
        this.equipmentDetails = res
        this.equipmentSpotChecks = res.spot_check_arr
      }


    },
    async loadSpotCheckLog(params={}) {
      // params.is_one_day = true
      params.equipment_id = this.equipment_id
      const res = await this.$http.post("equipment/spot_check_log/list", params)
      console.log("res-=-=-=-",res)
      if(res.data.res.length<15){
        this.loadingAll=true
      }
      if (res.data.res.length>0) {
        if (!params.pid || params.pid == 0) {
          let part_count_arr=res.data.part_count_arr
         Object.keys(part_count_arr).length>0&&Object.keys(part_count_arr).forEach((k)=>{
              part_count_arr[k]=Object.keys(part_count_arr[k])
          })
          console.log(part_count_arr)
          if (this.page===1){
            this.dailySpotCheckCounts = part_count_arr
          }else {
              Object.keys(part_count_arr).forEach((k)=>{
              console.log(part_count_arr[k])
              if(this.dailySpotCheckCounts[k]){
                this.dailySpotCheckCounts[k]=this.dailySpotCheckCounts[k].concat(part_count_arr[k])
              }
            })
          }
        }
        //加载的整次列表
        if (!params.pid || params.pid == 0) {

          if (res.count == 0) {
            this.spotCheckList = []
            return this.spotCheckList
          }

          for (const r of res.data.res) {
            r.color = r.normal_status == NormalStatus.abnormal ? this.abnormalColor : this.normalColor;
          }
          if (this.page==1){
            this.spotCheckList = res.data.res
          }else{
            this.spotCheckList =this.spotCheckList.concat(res.data.res)
          }

        } else {
          for (const r of res.data.res) {
            r.part_status_color = r.part_status == NormalStatus.abnormal ? this.abnormalColor : this.normalColor;
            r.review_status_color = r.part_review_status == NormalStatus.abnormal ? this.abnormalColor : this.normalColor;

          }
          return res.data.res
        }
      }else{
        return null
      }
    },
    debounce(callback,delay=300){
      clearTimeout(this.debounceFlag)
      this.debounceFlag=setTimeout(callback,delay)
    },
    scrollToBottomHandler(){
      this.debounce(()=>{
        let el=this.scrollContainer
        var scrollTop = el.scrollTop; //滑入屏幕上方的高度

        var clientHeight = el.clientHeight; //元素的可视高度
        var scrollHeight = el.scrollHeight; //整个元素的真实高度
        let total = scrollTop + clientHeight
        if(total === scrollHeight){
          this.page++
          let start_time=this.start_time
          let page=this.page
          this.loadSpotCheckLog({start_time,page})
        }
      },300)

    }
  },
  mounted() {
      this.scrollContainer=this.$refs["scroll-container"]
      this.scrollContainerHeight=this.scrollContainer.offsetHeight>0?this.scrollContainer.offsetHeight:900;
      console.log(this.scrollContainerHeight)
      this.scrollContainer.addEventListener('scroll', this.scrollToBottomHandler)
  },
  async created() {

    const equipment_id=this.$route.query.id
    if(!equipment_id || equipment_id===""){
      this.$dialog("error","quipment id is empty",true,()=>{this.$router.push({name:"home"})})

      return
    }
    this.equipment_id = Number(equipment_id)
    this.loadEquipmentDetail()
    this.loadSpotCheckLog({ page:1,start_time: this.start_time })
    setTimeout(()=>{
      this.appShow = true
    },5)
  }
}
</script>

<style scoped lang="scss">
.container {
  position: relative;
  overflow: hidden;
}
*{
  @extend %middleFontSize;
}

/* left-container start */
.left-container {
  min-width: 340px;
  min-height: 900px;
  height: 85%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  left: -100%;
  opacity: 0;
  margin-left:$outerContainerPadding;
}

.base-info-container,
.spot-check-content-container {
  width: 100%;
  min-height: 25%;
  padding: 1rem;
  background: rgba(0, 55, 102, 0.5);
  background-image: linear-gradient(rgba(0, 55, 102, 0.1), rgba(0, 55, 102, 0.6));
  box-shadow: 0 0 0.5rem #333;
  border-radius: 0.3rem;
}

.base-info-container {
  min-height: 20%;
  top: 0;
}

.spot-check-content-container {
  bottom: 0;
}

.spot-check-content-container {
  margin-top: 2rem;
}

.container-common-title {
  width: 100%;
  display: flex;
  align-items: flex-start;
  color: #23d0fa;
}
.container-common-title-text{
  @extend %titleFontSize;
}


.base-info-item-box,
.spot-check-item-box {
  margin-top: 1rem;
  width: 100%;
}

.base-info-item,
.spot-check-item {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0.1rem 0.2rem;
  justify-content: space-between;
}

.base-info-item-text {
  max-width: 200px;
  padding-left: 1rem;
}

.spot-check-item {
  border: 1px solid transparent;
  box-sizing: border-box;
  border-radius: 0.3rem;
  cursor: pointer;
}

.spot-check-item-selected {
  transition: all 0.3s ease;
  border-color: rgba(255, 255, 255, 0.5);
  box-shadow: inset 0 0 0.5rem #ccc;
}

.base-info-item > *,
.spot-check-item > * {
  margin: 0;
}

.base-info-item,
.spot-check-item {
  color: #fff;
}

.spot-check-item-text {
  color: #23d0fa;
}

.spot-check-item-text-not {
  color: #ccc;
  margin-left: 2rem;
}

/* left-container end */

.back-box {
  position: absolute;
  width: 18%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  right: 1%;
  bottom: 7%;
  z-index:5;
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

/*==================
* right-container start
==================*/
.right-container {
  width: 18%;
  height: 80%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: -100%;
  opacity: 0;
  margin-right:$outerContainerPadding;
}
.time-line-container-box{
  width:100%;
  height:100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}
.filter-container,
.time-line-container {
  width:100%;
  display: flex;
  align-items: center;
  border-radius: 0.3rem;
}
.filter-container{
  overflow: hidden;
}
.time-line-container {
  margin-top:1rem;
  flex-direction: column;
  height: 100%;
  top: 0;
  left:0;
  padding: 0.8rem;
  overflow-y: scroll;
  position: absolute;
  align-items: flex-start;
  background-image: linear-gradient(rgba(0, 55, 102, 0.3), rgba(0, 55, 102, 0.6));
  //box-shadow: 0 0 0.3rem #333;
}

.detail-time-line-container {
  //padding-top: 10rem;
  //padding-top:3rem;
}

.filter-item {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.35rem;
  position: relative;
  background: #191e3a;
}

.filter-item > * {
  margin: 0;
}

.filter-data-title {
  color: #23beeb;
  @extend %titleFontSize;
}

.filter-data-box {
  position: absolute;
  right: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.filter-time-img-box {
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.q-field__input,
.q-field__native,
.q-field__prefix,
.q-field__suffix {
  color: #fff !important;
  text-align: center;
}

.filter-time-img {
  width: 2rem;
  position: absolute;
  right: 1rem;
  z-index: 10;
}

.filter-time-calendar {
  width: 1.5rem;
  height: auto;
}

.time-item-container {
  width: 100%;
  margin-top: 0.5rem;
}

.time-line-time-box {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.time-line-time-box > * {
  margin: 0;
}

.time-line-circle {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: #f00;
}

.time-line-time {
  margin-left: 1rem;
  color: #f00;
  @extend %titleFontSize;
}

.time-line-content-container {
  width: 100%;
  margin-top: 0.35rem;
  display: flex;
  justify-content: flex-start;
}

.time-line-content-container > * {
  margin: 0;
}

.time-line-left-line-box {
  width: 0.5rem;
  height: inherit;
  border: 1px solid transparent;
}

.time-line {
  width: 60%;
  height: 100%;
  background: #f00;
}

.time-line-content-box {
  width: 100%;
  margin-left: 1rem;
}

.content-detail-box {
  width: 100%;
}

.detail-item {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.3rem 0;
  color: #23beeb;
}

.detail-detail-item {
  color: #fff;
}

.detail-item-color-1 {
  color: #fff;
}

.detail-item > * {
  margin: 0;
}

.detail-item-look .detail-item-text {
  font-weight: 700;
}

.detail-item-name {
  min-width: 4rem;
}

.detail-item-text {
  max-width: 7.5rem;
  text-align: left;
}

.detail-img-item {
  flex-direction: column;
}

.detail-img-item .detail-item-name {
  width: 100%;
  text-align: left;
}

.detail-img-box {
  width: 100%;
  padding: 0.5rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}

.detail-img-wrap {
  width: 45%;
  height: 8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
  border-radius: 0.2rem;
  overflow: hidden;
  margin-top: 0.8rem;
}

.detail-img {
  width: 100%;
}

.fixed-top-container {
  //width: 16.5%;
  //padding-top: 2.3rem;
  //top: 12%;
  //position: fixed;
  //z-index: 10;
  //right:2%;
  width:100%;
}

.father-item-box {
  width: 100%;
  border-radius: 0.2rem;
  box-shadow: 0 0 0.2rem #333;
  background: rgba(0, 55, 102, 0.6);
  padding: 0.5rem;
}

.father-item-li {
  display: flex;
  justify-content: space-between;
  color: #23beeb;
  margin-top: 0.3rem;
}

.father-item-text {
  color: #eee;
}

.father-item-li > * {
  margin: 0;
}

.detail-close-btn {
  width: 2rem;
  display: flex;
  position: fixed;
  right:2%;
  //top: 0.5rem;
  //right: 0.8rem;
  top:13%;
  z-index: 10;
}

/*==================
* 左右盒子过渡效果 start
==================*/
.container-show-left,.container-show-right {
  transition: all 0.3s linear 0s;
  opacity: 1;
  z-index: 2;
}
.container-show-left{
  left:0;
}
.container-show-right{
  right:0;

}
.container-hide-left,.container-hide-right {
  transition: all 0.3s linear 0s;
  opacity: 0;
  z-index: -1;
}
.container-hide-left{
  left: -100%;
}
.container-hide-right{
  left: -100%;
}
/*==================
* 左右盒子过渡效果 end
==================*/

.bottom-name-container{
  position:absolute;
  z-index:5;
  display: flex;
  align-items: center;
  justify-content: center;
  width:100%;
  height:10%;
  bottom:0;
  color:$itemNameColor;
  letter-spacing: 0.5rem;
  //font-weight: 900;
  font-size:2rem;
}

//时间筛选弹出框 确定、此刻按钮 ------start
.time-popup-proxy-box {
  height: 2rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.time-popup-proxy-btn {
  padding: 0.35rem;
  border-radius: 0.2rem;
  cursor: pointer !important;
  position: relative;
}

.time-popup-proxy-btn:hover {
  transition: all 0.3s ease;
  background: #5964b3;
}
//时间筛选弹出框 确定、此刻按钮 ------end
</style>